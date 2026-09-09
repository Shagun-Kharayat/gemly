PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK(role IN ('procurement_officer', 'compliance_officer', 'auditor', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS firms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firm_name TEXT NOT NULL,
  masked_gstin TEXT NOT NULL,
  category TEXT NOT NULL,
  incorporation_year INTEGER NOT NULL CHECK(incorporation_year > 1900),
  reliability_score INTEGER NOT NULL CHECK(reliability_score BETWEEN 0 AND 100),
  debarment_status TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS bids (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  public_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('Verified', 'Needs Review', 'High Risk')),
  compliance_score INTEGER NOT NULL CHECK(compliance_score BETWEEN 0 AND 100),
  masked_identity_state TEXT NOT NULL CHECK(masked_identity_state IN ('Masked during blind evaluation', 'Identity visible')),
  assigned_officer_id INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (assigned_officer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS compliance_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bid_id INTEGER NOT NULL,
  check_name TEXT NOT NULL,
  source TEXT NOT NULL,
  result TEXT NOT NULL,
  confidence INTEGER NOT NULL CHECK(confidence BETWEEN 0 AND 100),
  explanation TEXT NOT NULL,
  checked_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (bid_id) REFERENCES bids(id)
);

CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bid_id INTEGER NOT NULL,
  document_name TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('Verified', 'Needs Review', 'High Risk')),
  confidential BOOLEAN NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (bid_id) REFERENCES bids(id)
);

CREATE TABLE IF NOT EXISTS officer_actions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bid_id INTEGER NOT NULL,
  officer_id INTEGER NOT NULL,
  action_type TEXT NOT NULL CHECK(action_type IN ('APPROVE', 'REQUEST_CLARIFICATION', 'FLAG')),
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (bid_id) REFERENCES bids(id),
  FOREIGN KEY (officer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor TEXT NOT NULL,
  event_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TEXT NOT NULL DEFAULT (datetime('now')),
  previous_event_hash TEXT NOT NULL,
  current_event_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);
CREATE INDEX IF NOT EXISTS idx_compliance_checks_bid ON compliance_checks(bid_id);
CREATE INDEX IF NOT EXISTS idx_documents_bid ON documents(bid_id);
CREATE INDEX IF NOT EXISTS idx_officer_actions_bid ON officer_actions(bid_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);

INSERT OR IGNORE INTO users (id, name, email, role) VALUES
  (1, 'Aman Verma', 'aman.verma@gov.in', 'procurement_officer'),
  (2, 'Priya Nair', 'priya.nair@gov.in', 'compliance_officer'),
  (3, 'Rohit Singh', 'rohit.singh@gov.in', 'auditor');

INSERT OR IGNORE INTO firms (id, firm_name, masked_gstin, category, incorporation_year, reliability_score, debarment_status) VALUES
  (1, 'Apex Infrastructure Pvt. Ltd.', '27AABCA*****4L2', 'Class I', 2014, 86, 'No active debarment record found'),
  (2, 'Bluebrook Civil Works', '29XYZAB*****7K1', 'Class II', 2011, 68, 'No active debarment record found'),
  (3, 'Northline Energy Systems', '07QWERX*****9M3', 'Class I', 2017, 74, 'No active debarment record found');

INSERT OR IGNORE INTO bids (id, public_id, title, status, compliance_score, masked_identity_state, assigned_officer_id) VALUES
  (1, 'BID-4Q19M', 'Road maintenance and drainage works', 'Needs Review', 68, 'Masked during blind evaluation', 1),
  (2, 'BID-9X72K', 'Street lighting network modernization', 'High Risk', 54, 'Masked during blind evaluation', 2),
  (3, 'BID-2L88D', 'Water treatment plant extension', 'Verified', 94, 'Masked during blind evaluation', 1);

INSERT OR IGNORE INTO compliance_checks (id, bid_id, check_name, source, result, confidence, explanation) VALUES
  (1, 1, 'GST and tax compliance', 'Official GST portal', 'Needs review', 74, 'GST return filing is incomplete and needs reconciliation against the latest filing period.'),
  (2, 1, 'OEM authorization', 'Supplier package', 'Needs review', 68, 'Authorization document is present but lacks the latest manufacturer seal and renewed validity.'),
  (3, 2, 'Debarment search', 'Official debarment registry', 'High risk', 92, 'The firm has inconsistent declarations in the debarment and address records and requires manual review.'),
  (4, 2, 'Business identity validation', 'Government registry', 'High risk', 81, 'Document metadata and registered address patterns show partial similarity to another entity under review.'),
  (5, 3, 'Technical specifications', 'Technical evaluation committee', 'Verified', 95, 'Specification checklist passed with minor formatting issues only.'),
  (6, 3, 'Document intelligence', 'AI-assisted validation', 'Verified', 91, 'All required documents are complete and match the bid requirements.' );

INSERT OR IGNORE INTO documents (id, bid_id, document_name, status, confidential) VALUES
  (1, 1, 'GST registration certificate', 'Needs Review', 1),
  (2, 1, 'OEM authorization', 'High Risk', 1),
  (3, 1, 'Bank guarantee', 'Needs Review', 1),
  (4, 2, 'PAN and Aadhaar proof', 'High Risk', 1),
  (5, 2, 'Debarment search record', 'High Risk', 1),
  (6, 3, 'Technical compliance dossier', 'Verified', 0),
  (7, 3, 'Tax compliance certificate', 'Verified', 0);

INSERT OR IGNORE INTO officer_actions (id, bid_id, officer_id, action_type, reason) VALUES
  (1, 1, 1, 'REQUEST_CLARIFICATION', 'Missing latest GST return and manufacturer authorization stamps need validation.'),
  (2, 2, 2, 'FLAG', 'High-risk pattern match with additional debarment verification required before award.');

INSERT OR IGNORE INTO audit_log (id, actor, event_type, entity_type, entity_id, details, timestamp, previous_event_hash, current_event_hash) VALUES
  (1, 'system', 'SEED_DATABASE', 'system', 'gemly', '{"note":"Initial seed for demo environment."}', datetime('now'), 'GENESIS', 'hash_seed_001'),
  (2, 'Aman Verma', 'REQUEST_CLARIFICATION', 'bid', 'BID-4Q19M', '{"reason":"Missing latest GST return and manufacturer authorization stamps need validation."}', datetime('now'), 'hash_seed_001', 'hash_seed_002'),
  (3, 'Priya Nair', 'FLAG', 'bid', 'BID-9X72K', '{"reason":"High-risk pattern match with additional debarment verification required before award."}', datetime('now'), 'hash_seed_002', 'hash_seed_003');
