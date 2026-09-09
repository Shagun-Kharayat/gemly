const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

// Security note for production rollout:
// - Use an approved government identity provider and secure HTTP-only session cookies.
// - Enforce rate limiting, MFA or real OTP delivery, and role-based access control.
// - Keep all sensitive data encrypted at rest, validate uploads, and enable malware scanning.
// - Use HTTPS, secret management, immutable audit storage, and strong backup policies before production deployment.

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'gemly.db');
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');

function initializeDatabase() {
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schemaSql);
}

function hashChain(prevHash, payload) {
  return crypto.createHash('sha256').update(`${prevHash}:${JSON.stringify(payload)}`).digest('hex');
}

function appendAuditEvent({ actor, eventType, entityType, entityId, details }) {
  const lastRow = db.prepare('SELECT current_event_hash FROM audit_log ORDER BY id DESC LIMIT 1').get();
  const previousEventHash = lastRow ? lastRow.current_event_hash : 'GENESIS';
  const timestamp = new Date().toISOString();
  const payload = { actor, eventType, entityType, entityId, details, timestamp, previousEventHash };
  const currentEventHash = hashChain(previousEventHash, payload);

  db.prepare(
    `INSERT INTO audit_log (actor, event_type, entity_type, entity_id, details, timestamp, previous_event_hash, current_event_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(actor, eventType, entityType, entityId, JSON.stringify(details), timestamp, previousEventHash, currentEventHash);

  return {
    actor,
    eventType,
    entityType,
    entityId,
    details,
    timestamp,
    previousEventHash,
    currentEventHash,
  };
}

function getPublicBid(id) {
  return db.prepare('SELECT * FROM bids WHERE public_id = ?').get(id);
}

function normalizeStatus(status) {
  const map = {
    APPROVE: 'Verified',
    REQUEST_CLARIFICATION: 'Needs Review',
    FLAG: 'High Risk',
  };
  return map[status] || 'Needs Review';
}

initializeDatabase();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/auth/request-otp', (req, res) => {
  const { email } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  // Local dev only: accepts OTP 123456 to keep the demo browser flow simple.
  // Production must use an approved government identity provider, secure HTTP-only cookies,
  // rate limiting, MFA, and role-based access control.
  return res.json({
    success: true,
    message: 'OTP sent for development testing.',
    otp: '123456',
    warning: 'Production must use a government identity provider, real OTP delivery, and MFA.',
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { email, otp } = req.body || {};

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
  }

  if (String(otp) !== '123456') {
    return res.status(401).json({ success: false, message: 'Invalid OTP.' });
  }

  const user = db.prepare('SELECT id, name, email, role FROM users WHERE email = ?').get(email);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  appendAuditEvent({
    actor: user.name,
    eventType: 'LOGIN',
    entityType: 'user',
    entityId: String(user.id),
    details: { email: user.email, role: user.role },
  });

  return res.json({
    success: true,
    message: 'OTP verified successfully.',
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

app.get('/api/dashboard', (req, res) => {
  const bids = db.prepare('SELECT * FROM bids ORDER BY CASE status WHEN "High Risk" THEN 0 WHEN "Needs Review" THEN 1 ELSE 2 END, compliance_score ASC').all();

  const totalBids = bids.length;
  const verifiedBids = bids.filter((bid) => bid.status === 'Verified').length;
  const needsReviewBids = bids.filter((bid) => bid.status === 'Needs Review').length;
  const highRiskBids = bids.filter((bid) => bid.status === 'High Risk').length;

  const priorityQueue = bids.map((bid) => ({
    publicId: bid.public_id,
    title: bid.title,
    status: bid.status,
    complianceScore: bid.compliance_score,
    maskedIdentityState: bid.masked_identity_state,
  }));

  res.json({
    totalBids,
    verifiedBids,
    needsReviewBids,
    highRiskBids,
    priorityQueue,
  });
});

app.get('/api/bids', (req, res) => {
  const bids = db.prepare(
    'SELECT id, public_id, title, status, compliance_score, masked_identity_state, assigned_officer_id FROM bids ORDER BY CASE status WHEN "High Risk" THEN 0 WHEN "Needs Review" THEN 1 ELSE 2 END, compliance_score ASC'
  ).all();

  res.json({ bids });
});

app.get('/api/bids/:publicId', (req, res) => {
  const bid = getPublicBid(req.params.publicId);

  if (!bid) {
    return res.status(404).json({ success: false, message: 'Bid not found.' });
  }

  const documents = db.prepare(
    'SELECT id, document_name, status, confidential FROM documents WHERE bid_id = ? ORDER BY id ASC'
  ).all(bid.id);

  const complianceChecks = db.prepare(
    'SELECT id, check_name, source, result, confidence, explanation, checked_at FROM compliance_checks WHERE bid_id = ? ORDER BY id ASC'
  ).all(bid.id);

  appendAuditEvent({
    actor: 'system',
    eventType: 'VIEW_BID',
    entityType: 'bid',
    entityId: bid.public_id,
    details: { title: bid.title, viewedBy: 'Procurement officer' },
  });

  res.json({
    publicId: bid.public_id,
    title: bid.title,
    status: bid.status,
    complianceScore: bid.compliance_score,
    maskedIdentityState: bid.masked_identity_state,
    documents,
    complianceChecks,
    verificationSources: complianceChecks.map((check) => check.source),
    confidenceScores: complianceChecks.map((check) => ({ label: check.check_name, score: check.confidence })),
    explanationSummary: 'The bid remains masked during early evaluation, and only need-to-know information is displayed to officers.',
    privacyNotice: 'Masked during blind evaluation. Personal data, bank details, PAN/Aadhaar portions, pricing, signatures, and confidential attachments remain hidden.',
  });
});

app.post('/api/bids/:publicId/actions', (req, res) => {
  const { action, reason, officerName } = req.body || {};
  const bid = getPublicBid(req.params.publicId);

  if (!bid) {
    return res.status(404).json({ success: false, message: 'Bid not found.' });
  }

  if (!['APPROVE', 'REQUEST_CLARIFICATION', 'FLAG'].includes(action)) {
    return res.status(400).json({ success: false, message: 'Valid action is required.' });
  }

  if (!reason || !String(reason).trim()) {
    return res.status(400).json({ success: false, message: 'A written reason is required.' });
  }

  const officer = db.prepare('SELECT id, name FROM users WHERE name = ? LIMIT 1').get(officerName || 'Aman Verma');
  if (!officer) {
    return res.status(404).json({ success: false, message: 'Officer record not found.' });
  }

  const nextStatus = normalizeStatus(action);

  db.prepare('UPDATE bids SET status = ? WHERE public_id = ?').run(nextStatus, bid.public_id);
  db.prepare(
    'INSERT INTO officer_actions (bid_id, officer_id, action_type, reason) VALUES (?, ?, ?, ?)'
  ).run(bid.id, officer.id, action, String(reason).trim());

  appendAuditEvent({
    actor: officer.name,
    eventType: action,
    entityType: 'bid',
    entityId: bid.public_id,
    details: { reason: String(reason).trim(), resultingStatus: nextStatus },
  });

  return res.json({
    success: true,
    message: 'Officer action recorded in the tamper-evident audit trail.',
    bid: { publicId: bid.public_id, status: nextStatus },
  });
});

app.get('/api/audit', (req, res) => {
  const events = db.prepare(
    'SELECT actor, event_type, entity_type, entity_id, details, timestamp, previous_event_hash, current_event_hash FROM audit_log ORDER BY id DESC'
  ).all();

  const serialized = events.map((event) => ({
    actor: event.actor,
    eventType: event.event_type,
    entityType: event.entity_type,
    entityId: event.entity_id,
    details: JSON.parse(event.details),
    timestamp: event.timestamp,
    previousEventHash: event.previous_event_hash,
    currentEventHash: event.current_event_hash,
  }));

  res.json({ auditEvents: serialized });
});

app.get('/api/firms/:id/integrity', (req, res) => {
  const firm = db.prepare('SELECT * FROM firms WHERE id = ?').get(Number(req.params.id));
  if (!firm) {
    return res.status(404).json({ success: false, message: 'Firm not found.' });
  }

  const contractHistory = [
    { contractId: 'CT-2025-118', procuringDepartment: 'CPWD', deliveryPerformance: '92%', qualityOutcome: 'High' },
    { contractId: 'CT-2024-042', procuringDepartment: 'Urban Development', deliveryPerformance: '89%', qualityOutcome: 'Good' },
    { contractId: 'CT-2023-301', procuringDepartment: 'Health Services', deliveryPerformance: '86%', qualityOutcome: 'Consistent' },
  ];

  const riskSignals = [
    { signal: 'Registered-address similarity', status: 'Medium confidence signal', source: 'AI assisted pattern review', verdict: 'Potential related entity — human review required.' },
    { signal: 'Document-template similarity', status: 'Medium confidence signal', source: 'AI assisted pattern review', verdict: 'Potential related entity — human review required.' },
    { signal: 'Common director check', status: 'Medium confidence signal', source: 'AI assisted pattern review', verdict: 'Potential related entity — human review required.' },
  ];

  const officialFacts = [
    { label: 'Debarment status', value: firm.debarment_status, classification: 'Verified fact' },
    { label: 'Incorporation year', value: firm.incorporation_year, classification: 'Verified fact' },
    { label: 'Reliability score', value: `${firm.reliability_score}/100`, classification: 'Verified fact' },
  ];

  res.json({
    id: firm.id,
    firmName: firm.firm_name,
    maskedGstin: firm.masked_gstin,
    reliabilityScore: firm.reliability_score,
    incorporationYear: firm.incorporation_year,
    category: firm.category,
    eligibilityStatus: 'Eligible',
    lastVerifiedDate: '2026-08-12',
    debarmentStatus: firm.debarment_status,
    officialFacts,
    contractHistory,
    riskSignals,
    fairnessNote: 'Official verified facts and AI risk signals are displayed separately. A firm is not treated as corrupt based only on pattern similarity.',
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`GeMLY server is running on http://localhost:${PORT}`);
});
