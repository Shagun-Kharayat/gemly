import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const API_BASE = '/api';

const translations = {
  en: {
    appTitle: 'GeMLY',
    subtitle: 'Compliance Workspace',
    overview: 'Overview',
    bids: 'Bids',
    verificationQueue: 'Verification Queue',
    firmIntegrity: 'Firm Integrity',
    alerts: 'Alerts',
    auditTrail: 'Audit Trail',
    complianceRules: 'Compliance Rules',
    languageToggle: 'हि हिंदी',
    highContrast: 'High contrast',
    totalBids: 'Total Bids',
    verified: 'Verified',
    needsReview: 'Needs Review',
    highRisk: 'High Risk',
    priorityQueue: 'Priority Queue',
    commonFailureTrends: 'Common Failure Trends',
    viewBid: 'Review',
    complianceScore: 'Compliance score',
    reviewButton: 'Review',
    firmName: 'Firm name',
    gstin: 'GSTIN',
    incorporation: 'Incorporation year',
    category: 'Category',
    reliabilityScore: 'Reliability score',
    eligibility: 'Current eligibility status',
    lastVerified: 'Last verified date',
    debarment: 'Official restriction or debarment status',
    decisionHistory: 'Past contract history',
    associatedEntityRisk: 'Associated Entity Risk Map',
    riskSignalRegistered: 'Registered-address similarity',
    riskSignalDocuments: 'Document-template similarity',
    riskSignalDirector: 'Common director check',
    fairnessRule: 'Verified official facts are distinguished from AI risk signals. A firm is never marked corrupt on pattern alone.',
    potentialRelatedEntity: 'Potential related entity — human review required.',
    privacyTitle: 'Confidential Bid Vault',
    privacyText: 'Bidder identity is hidden during early evaluation. Personal data, prices, bank information, signatures, and confidential attachments are masked by default. Officers receive only need-to-know access. All data-access requests are logged.',
    fairnessSafeguards: 'Fairness safeguards',
    randomAllocation: 'Random case allocation',
    conflictDisclosure: 'Conflict-of-interest declaration',
    twoPersonOverride: 'Two-person override for high-risk decisions',
    tamperEvidence: 'Tamper-evident audit trail',
    bidReviewTitle: 'Bid Compliance Review Workspace',
    anonymousProfile: 'Anonymous bidder profile',
    documentList: 'Uploaded document list',
    documentStatus: 'Document status',
    maskedNote: 'Confidential data remains masked in this workspace.',
    aiChecklist: 'AI-assisted compliance checklist',
    identityBusiness: 'Identity and business verification',
    gstTax: 'GST and tax compliance',
    msmeStatus: 'MSME or Startup status',
    technicalSpecs: 'Technical specifications',
    oemAuthorization: 'OEM authorization',
    officialDebarment: 'Official debarment search',
    docIntelligence: 'Document intelligence',
    scoreLabel: 'Compliance or risk score',
    whyScore: 'Why this score?',
    approveReview: 'Approve for review',
    requestClarification: 'Request clarification',
    flagInvestigation: 'Flag for investigation',
    downloadAudit: 'Download audit report',
    toastAction: 'Officer action recorded in the tamper-evident audit trail.',
    placeholder: 'This section is under development.',
    overviewTitle: 'Procurement Officer Dashboard',
    priorityListTitle: 'Priority queue',
    queueSub: 'High-risk and review-required cases are prioritised first.',
    statusVerified: 'Verified',
    statusReview: 'Needs review',
    statusHigh: 'High risk',
    statusNeutral: 'In review',
    riskLevel: 'Risk level',
    issues: 'Issue',
    review: 'Review',
    score: 'Score',
    monitor: 'Monitoring',
    lastUpdated: 'Updated 10 mins ago',
    all: 'All',
    emptyState: 'No active entries',
  },
  hi: {
    appTitle: 'GeMLY',
    subtitle: 'अनुपालन कार्यस्थान',
    overview: 'अवलोकन',
    bids: 'बिड्स',
    verificationQueue: 'सत्यापन कतार',
    firmIntegrity: 'फर्म अखंडता',
    alerts: 'अलर्ट',
    auditTrail: 'ऑडिट ट्रेल',
    complianceRules: 'अनुपालन नियम',
    languageToggle: 'EN English',
    highContrast: 'उच्च विपरीत',
    totalBids: 'कुल बिड्स',
    verified: 'सत्यापित',
    needsReview: 'समीक्षा आवश्यक',
    highRisk: 'उच्च जोखिम',
    priorityQueue: 'प्राथमिकता कतार',
    commonFailureTrends: 'सामान्य विफलता रुझान',
    viewBid: 'समीक्षा करें',
    complianceScore: 'अनुपालन स्कोर',
    reviewButton: 'समीक्षा',
    firmName: 'फर्म का नाम',
    gstin: 'GSTIN',
    incorporation: 'समावेश वर्ष',
    category: 'श्रेणी',
    reliabilityScore: 'विश्वसनीयता स्कोर',
    eligibility: 'वर्तमान योग्यता स्थिति',
    lastVerified: 'अंतिम सत्यापन तिथि',
    debarment: 'अधिकारिक प्रतिबंध या निषेध स्थिति',
    decisionHistory: 'पिछला अनुबंध इतिहास',
    associatedEntityRisk: 'संबद्ध इकाई जोखिम मानचित्र',
    riskSignalRegistered: 'पंजीकृत पता समानता',
    riskSignalDocuments: 'दस्तावेज़-टेम्पलेट समानता',
    riskSignalDirector: 'सामान्य निदेशक जांच',
    fairnessRule: 'सत्यापित आधिकारिक तथ्य और एआई जोखिम संकेतों को अलग रखा जाता है। केवल पैटर्न के आधार पर किसी फर्म को भ्रष्ट नहीं माना जाता है।',
    potentialRelatedEntity: 'संभावित संबंधित इकाई — मानवीय समीक्षा आवश्यक।',
    privacyTitle: 'गोपनीय बिड वॉल्ट',
    privacyText: 'प्रारंभिक मूल्यांकन के दौरान बोलीदाता की पहचान छुपी रहती है। व्यक्तिगत डेटा, कीमत, बैंक जानकारी, हस्ताक्षर और गोपनीय अटैचमेंट डिफ़ॉल्ट रूप से मास्क किए जाते हैं। अधिकारियों को केवल आवश्यकता-आधारित एक्सेस मिलता है। सभी डेटा एक्सेस अनुरोध लॉग किए जाते हैं।',
    fairnessSafeguards: 'निष्पक्षता सुरक्षा',
    randomAllocation: 'यादृच्छिक केस आवंटन',
    conflictDisclosure: 'रूढ़िवादी हित उद्घोषणा',
    twoPersonOverride: 'उच्च जोखिम निर्णयों के लिए दो-व्यक्ति ओवरराइड',
    tamperEvidence: 'टेम्पर-एविडेंट ऑडिट ट्रेल',
    bidReviewTitle: 'बिड अनुपालन समीक्षा कार्यक्षेत्र',
    anonymousProfile: 'गोपनीय बोलीदाता प्रोफ़ाइल',
    documentList: 'अपलोडेड दस्तावेज़ सूची',
    documentStatus: 'दस्तावेज़ स्थिति',
    maskedNote: 'इस कार्यक्षेत्र में गोपनीय डेटा मास्क रहता है।',
    aiChecklist: 'एआई-सहायता अनुपालन चेकलिस्ट',
    identityBusiness: 'पहचान और व्यवसाय सत्यापन',
    gstTax: 'GST और कर अनुपालन',
    msmeStatus: 'MSME या स्टार्टअप स्थिति',
    technicalSpecs: 'तकनीकी विशिष्टताएँ',
    oemAuthorization: 'OEM प्राधिकरण',
    officialDebarment: 'अधिकृत डिबारमेंट खोज',
    docIntelligence: 'दस्तावेज़ इंटेलिजेंस',
    scoreLabel: 'अनुपालन या जोखिम स्कोर',
    whyScore: 'यह स्कोर क्यों?',
    approveReview: 'समीक्षा के लिए स्वीकृत करें',
    requestClarification: 'स्पष्टीकरण का अनुरोध करें',
    flagInvestigation: 'जांच के लिए फ्लैग करें',
    downloadAudit: 'ऑडिट रिपोर्ट डाउनलोड करें',
    toastAction: 'अधिकारी की कार्रवाई टेम्पर-एविडेंट ऑडिट ट्रेल में दर्ज की गई।',
    placeholder: 'यह अनुभाग विकासाधीन है।',
    overviewTitle: 'प्रोक्योरमेंट ऑफिसर डैशबोर्ड',
    priorityListTitle: 'प्राथमिकता सूची',
    queueSub: 'उच्च जोखिम और समीक्षा-आवश्यक मामले पहले लाए जाते हैं।',
    statusVerified: 'सत्यापित',
    statusReview: 'समीक्षा आवश्यक',
    statusHigh: 'उच्च जोखिम',
    statusNeutral: 'समीक्षा में',
    riskLevel: 'जोखिम स्तर',
    issues: 'समस्या',
    review: 'समीक्षा',
    score: 'स्कोर',
    monitor: 'निगरानी',
    lastUpdated: '10 मिनट पहले अपडेट किया गया',
    all: 'सभी',
    emptyState: 'कोई सक्रिय प्रविष्टि नहीं',
  },
};

const sampleBids = [
  { id: 'BID-9X72K', status: 'high', issue: 'Expired GST certificate', score: 48 },
  { id: 'BID-4Q19M', status: 'review', issue: 'OEM authorization pending', score: 72 },
  { id: 'BID-7H34P', status: 'verified', issue: 'Document package complete', score: 92 },
  { id: 'BID-2L88D', status: 'high', issue: 'Debarment check unresolved', score: 41 },
  { id: 'BID-3M47T', status: 'review', issue: 'Missing GST return', score: 68 },
  { id: 'BID-6P12R', status: 'verified', issue: 'Technical compliance valid', score: 94 },
];

const metricData = [
  { labelKey: 'totalBids', value: 126, status: 'navy', textKey: 'lastUpdated' },
  { labelKey: 'verified', value: 78, status: 'green', textKey: 'all' },
  { labelKey: 'needsReview', value: 34, status: 'amber', textKey: 'queueSub' },
  { labelKey: 'highRisk', value: 14, status: 'red', textKey: 'riskLevel' },
];

const sidebarItems = [
  { key: 'overview', labelKey: 'overview' },
  { key: 'bids', labelKey: 'bids' },
  { key: 'verificationQueue', labelKey: 'verificationQueue' },
  { key: 'firmIntegrity', labelKey: 'firmIntegrity' },
  { key: 'alerts', labelKey: 'alerts' },
  { key: 'auditTrail', labelKey: 'auditTrail' },
  { key: 'complianceRules', labelKey: 'complianceRules' },
];

const documentList = [
  { name: 'GST registration certificate', status: 'verified' },
  { name: 'PAN and incorporation proof', status: 'verified' },
  { name: 'MSME certificate', status: 'needs-review' },
  { name: 'OEM authorization', status: 'high-risk' },
];

const checklistItems = [
  { labelKey: 'identityBusiness', status: 'verified' },
  { labelKey: 'gstTax', status: 'review' },
  { labelKey: 'msmeStatus', status: 'review' },
  { labelKey: 'technicalSpecs', status: 'verified' },
  { labelKey: 'oemAuthorization', status: 'high' },
  { labelKey: 'officialDebarment', status: 'verified' },
  { labelKey: 'docIntelligence', status: 'review' },
];

function Sidebar({ activeScreen, onSelect, lang }) {
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="brand-wrap">
        <div className="logo-mark" aria-hidden="true" />
        <div>
          <div className="brand-title">{translations[lang].appTitle}</div>
          <div className="brand-subtitle">{translations[lang].subtitle}</div>
        </div>
      </div>

      <nav className="nav-list" aria-label="Primary navigation">
        {sidebarItems.map(({ key, labelKey }) => (
          <button
            key={key}
            type="button"
            className={`nav-button ${activeScreen === key ? 'active' : ''}`}
            onClick={() => onSelect(key)}
            aria-label={translations[lang][labelKey]}
          >
            {translations[lang][labelKey]}
          </button>
        ))}
      </nav>

      <div className="sidebar-foot">
        <strong>Bid integrity</strong>
        <span>Case ID: BID-9X72K</span>
      </div>
    </aside>
  );
}

function Metric({ label, value, status, footerText, lang }) {
  return (
    <div className={`metric-card ${status}`}>
      <span className="metric-label">{translations[lang][label]}</span>
      <div className="metric-value">
        <strong>{value}</strong>
      </div>
      <div className="metric-sub">{translations[lang][footerText]}</div>
    </div>
  );
}

function Chip({ variant, children }) {
  return <span className={`status-chip ${variant}`}>{children}</span>;
}

function OverviewPage({ lang, dashboard, onReview, onAction }) {
  const queue = (dashboard?.priorityQueue || sampleBids).map((bid) => ({
    id: bid.publicId || bid.id,
    status: bid.status === 'High Risk' ? 'high' : bid.status === 'Needs Review' ? 'review' : 'verified',
    issue: bid.title || bid.issue || 'Compliance follow-up required',
    score: bid.complianceScore ?? bid.score ?? 0,
  }));

  const orderedBids = [...queue].sort((a, b) => {
    const order = { high: 0, review: 1, verified: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{translations[lang].overview}</p>
          <h1 className="page-title">{translations[lang].overviewTitle}</h1>
        </div>
      </header>

      <section className="metrics-grid" aria-label="Dashboard summary">
        {metricData.map((metric, index) => {
          const values = [
            dashboard?.totalBids ?? 126,
            dashboard?.verifiedBids ?? 78,
            dashboard?.needsReviewBids ?? 34,
            dashboard?.highRiskBids ?? 14,
          ];

          return (
            <Metric
              key={metric.labelKey}
              label={metric.labelKey}
              value={values[index]}
              status={metric.status}
              footerText={metric.textKey}
              lang={lang}
            />
          );
        })}
      </section>

      <section className="content-grid">
        <div className="card">
          <div className="card-header">
            <h2>{translations[lang].priorityQueue}</h2>
            <span className="small-label">{translations[lang].queueSub}</span>
          </div>

          <table className="priority-table" aria-label="Priority queue table">
            <thead>
              <tr>
                <th>{translations[lang].bids}</th>
                <th>{translations[lang].riskLevel}</th>
                <th>{translations[lang].issues}</th>
                <th>{translations[lang].score}</th>
                <th>{translations[lang].review}</th>
              </tr>
            </thead>
            <tbody>
              {orderedBids.map((bid) => (
                <tr key={bid.id}>
                  <td className="bid-id">{bid.id}</td>
                  <td>
                    <Chip variant={bid.status === 'high' ? 'high' : bid.status === 'review' ? 'review' : 'verified'}>
                      {bid.status === 'high'
                        ? translations[lang].statusHigh
                        : bid.status === 'review'
                          ? translations[lang].statusReview
                          : translations[lang].statusVerified}
                    </Chip>
                  </td>
                  <td>{bid.issue}</td>
                  <td className="score-badge">{bid.score}</td>
                  <td>
                    <button className="review-link" type="button" onClick={() => onReview(bid.id)}>
                      {translations[lang].reviewButton}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>{translations[lang].commonFailureTrends}</h2>
          </div>
          <ul className="trend-list">
            <li className="trend-item">
              <span>Missing GST return</span>
              <span className="trend-tag">22%</span>
            </li>
            <li className="trend-item">
              <span>Invalid or expired document</span>
              <span className="trend-tag">18%</span>
            </li>
            <li className="trend-item">
              <span>Missing OEM authorization</span>
              <span className="trend-tag">16%</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="card privacy-panel">
        <div className="inline-summary">
          <div className="lock-icon" aria-hidden="true">🔒</div>
          <div>
            <h3>{translations[lang].privacyTitle}</h3>
            <p>{translations[lang].privacyText}</p>
          </div>
        </div>

        <div className="micro-grid">
          <div className="info-row">
            <span>{translations[lang].randomAllocation}</span>
            <strong>On</strong>
          </div>
          <div className="info-row">
            <span>{translations[lang].conflictDisclosure}</span>
            <strong>Required</strong>
          </div>
          <div className="info-row">
            <span>{translations[lang].twoPersonOverride}</span>
            <strong>Enabled</strong>
          </div>
          <div className="info-row">
            <span>{translations[lang].tamperEvidence}</span>
            <strong>Recorded</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

function BidReviewPage({ lang, bid, onAction }) {
  const actionToast = (msg) => onAction(msg);
  const score = bid?.complianceScore ?? 68;
  const documents = bid?.documents || [];
  const checks = bid?.complianceChecks || checklistItems.map((item) => ({ check_name: translations[lang][item.labelKey], result: item.status }));

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{translations[lang].bids}</p>
          <h1 className="page-title">{translations[lang].bidReviewTitle}</h1>
        </div>
      </header>

      <div className="audit-layout">
        <div className="column-panel">
          <div className="profile-card">
            <div className="profile-header">
              <h3>{translations[lang].anonymousProfile}</h3>
              <Chip variant="neutral">{bid?.publicId || 'BID-9X72K'}</Chip>
            </div>
            <ul className="object-list">
              <li className="object-item"><span>{translations[lang].documentList}</span><strong>{documents.length || 6}</strong></li>
              <li className="object-item"><span>{translations[lang].documentStatus}</span><strong>{documents.filter((d) => d.status !== 'Verified').length || 3} pending</strong></li>
              <li className="object-item"><span>{translations[lang].maskedNote}</span><strong>Masked</strong></li>
            </ul>
          </div>
        </div>

        <div className="column-panel">
          <div className="checklist-card">
            <div className="profile-header">
              <h3>{translations[lang].aiChecklist}</h3>
            </div>
            <ul className="checklist">
              {checks.map((item, index) => {
                const label = item.check_name || item.labelKey || translations[lang][checklistItems[index]?.labelKey || 'identityBusiness'];
                const result = item.result || checklistItems[index]?.status || 'review';
                const chip = result === 'Verified' || result === 'verified' ? 'verified' : result === 'Needs Review' || result === 'review' ? 'review' : 'high';
                return (
                  <li key={`${label}-${index}`}>
                    <span className="checkmark" aria-hidden="true">✓</span>
                    <div>
                      <strong>{label}</strong>
                      <div className="small-label"><span className={`status-chip ${chip}`}>{result === 'Verified' || result === 'verified' ? translations[lang].statusVerified : result === 'High Risk' || result === 'high' ? translations[lang].statusHigh : translations[lang].statusReview}</span></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="column-panel">
          <div className="score-card">
            <div className="score-panel">
              <div>
                <div className="small-label">{translations[lang].scoreLabel}</div>
                <div className="score-ring"><span>{score}</span></div>
              </div>
              <div className="risk-box">
                <strong>{translations[lang].whyScore}</strong>
                <p>{bid?.explanationSummary || 'Document validity and tax compliance are partially satisfied, but OEM authorization and GST return records require additional confirmation.'}</p>
              </div>
              <div className="action-stack">
                <button className="action-btn approve" type="button" onClick={() => actionToast(translations[lang].toastAction)}>{translations[lang].approveReview}</button>
                <button className="action-btn request" type="button" onClick={() => actionToast(translations[lang].toastAction)}>{translations[lang].requestClarification}</button>
                <button className="action-btn flag" type="button" onClick={() => actionToast(translations[lang].toastAction)}>{translations[lang].flagInvestigation}</button>
                <button className="ghost-btn" type="button" onClick={() => actionToast(translations[lang].toastAction)}>{translations[lang].downloadAudit}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrityPage({ lang }) {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{translations[lang].firmIntegrity}</p>
          <h1 className="page-title">{translations[lang].firmIntegrity}</h1>
        </div>
      </header>

      <div className="integrity-grid">
        <div className="firm-card">
          <div className="firm-header">
            <div>
              <p className="small-label">{translations[lang].firmName}</p>
              <h2 className="firm-name">Apex Infrastructure Pvt. Ltd.</h2>
            </div>
            <Chip variant="verified">Verified</Chip>
          </div>

          <div className="firm-meta">
            <div className="meta-box">
              <div className="small-label">{translations[lang].gstin}</div>
              <strong>27AABCA*****4L2</strong>
            </div>
            <div className="meta-box">
              <div className="small-label">{translations[lang].incorporation}</div>
              <strong>2014</strong>
            </div>
            <div className="meta-box">
              <div className="small-label">{translations[lang].category}</div>
              <strong>Class I</strong>
            </div>
            <div className="meta-box">
              <div className="small-label">{translations[lang].reliabilityScore}</div>
              <strong>86/100</strong>
            </div>
            <div className="meta-box">
              <div className="small-label">{translations[lang].eligibility}</div>
              <strong>Eligible</strong>
            </div>
            <div className="meta-box">
              <div className="small-label">{translations[lang].lastVerified}</div>
              <strong>12 Aug 2026</strong>
            </div>
            <div className="meta-box">
              <div className="small-label">{translations[lang].debarment}</div>
              <strong>None</strong>
            </div>
            <div className="meta-box">
              <div className="small-label">{translations[lang].decisionHistory}</div>
              <strong>4 contracts</strong>
            </div>
          </div>

          <div className="card" style={{ marginTop: '18px' }}>
            <div className="card-header">
              <h3>{translations[lang].decisionHistory}</h3>
            </div>
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Contract ID</th>
                  <th>Department</th>
                  <th>Performance</th>
                  <th>Quality</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CT-2025-118</td>
                  <td>CPWD</td>
                  <td>92%</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>CT-2024-042</td>
                  <td>Urban Development</td>
                  <td>89%</td>
                  <td>Good</td>
                </tr>
                <tr>
                  <td>CT-2023-301</td>
                  <td>Health Services</td>
                  <td>86%</td>
                  <td>Consistent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="firm-card">
          <div className="card-header">
            <h3>{translations[lang].associatedEntityRisk}</h3>
          </div>
          <div className="risk-map">
            <div className="signal-item">
              <strong>{translations[lang].riskSignalRegistered}</strong>
              <Chip variant="review">Watchlist</Chip>
            </div>
            <div className="signal-item">
              <strong>{translations[lang].riskSignalDocuments}</strong>
              <Chip variant="review">Watchlist</Chip>
            </div>
            <div className="signal-item">
              <strong>{translations[lang].riskSignalDirector}</strong>
              <Chip variant="review">Watchlist</Chip>
            </div>
            <div className="alert-box">{translations[lang].fairnessRule}</div>
            <div className="alert-box" style={{ background: 'var(--red-soft)', borderColor: 'rgba(201, 61, 61, 0.25)', color: 'var(--red)' }}>
              {translations[lang].potentialRelatedEntity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ lang, titleKey }) {
  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">{translations[lang].overview}</p>
          <h1 className="page-title">{translations[lang][titleKey]}</h1>
        </div>
      </header>
      <div className="placeholder-box">{translations[lang].placeholder}</div>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState('en');
  const [activeScreen, setActiveScreen] = useState('overview');
  const [highContrast, setHighContrast] = useState(false);
  const [toast, setToast] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);
  const [firmIntegrity, setFirmIntegrity] = useState(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.toggle('high-contrast', highContrast);
  }, [lang, highContrast]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch(`${API_BASE}/dashboard`);
        const data = await response.json();
        setDashboard(data);
        if (data?.priorityQueue?.length) {
          setSelectedBid(null);
          fetch(`${API_BASE}/bids/${data.priorityQueue[0].publicId}`)
            .then((res) => res.json())
            .then((bidData) => setSelectedBid(bidData))
            .catch(() => {});
        }
      } catch (error) {
        setDashboard({
          totalBids: 126,
          verifiedBids: 78,
          needsReviewBids: 34,
          highRiskBids: 14,
          priorityQueue: sampleBids.map((bid) => ({
            publicId: bid.id,
            title: bid.issue,
            status: bid.status === 'high' ? 'High Risk' : bid.status === 'review' ? 'Needs Review' : 'Verified',
            complianceScore: bid.score,
          })),
        });
      }
    };

    const loadFirmIntegrity = async () => {
      try {
        const response = await fetch(`${API_BASE}/firms/1/integrity`);
        const data = await response.json();
        setFirmIntegrity(data);
      } catch (error) {
        setFirmIntegrity({
          firmName: 'Apex Infrastructure Pvt. Ltd.',
          maskedGstin: '27AABCA*****4L2',
          reliabilityScore: 86,
          incorporationYear: 2014,
          category: 'Class I',
          debarmentStatus: 'No active debarment record found',
          contractHistory: [
            { contractId: 'CT-2025-118', procuringDepartment: 'CPWD', deliveryPerformance: '92%', qualityOutcome: 'High' },
            { contractId: 'CT-2024-042', procuringDepartment: 'Urban Development', deliveryPerformance: '89%', qualityOutcome: 'Good' },
          ],
          riskSignals: [
            { signal: 'Registered-address similarity', status: 'Medium confidence signal' },
            { signal: 'Document-template similarity', status: 'Medium confidence signal' },
            { signal: 'Common director check', status: 'Medium confidence signal' },
          ],
        });
      }
    };

    loadDashboard();
    loadFirmIntegrity();
  }, []);

  const openBidReview = async (bidId) => {
    try {
      const response = await fetch(`${API_BASE}/bids/${bidId}`);
      const data = await response.json();
      setSelectedBid(data);
      setActiveScreen('bids');
    } catch (error) {
      setToast('Bid review unavailable right now.');
    }
  };

  const submitAction = async (bidId, action, reason) => {
    try {
      const response = await fetch(`${API_BASE}/bids/${bidId}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reason, officerName: 'Aman Verma' }),
      });
      const data = await response.json();
      setToast(data.message || translations[lang].toastAction);
      if (data.success) {
        const dashboardResponse = await fetch(`${API_BASE}/dashboard`);
        const nextDashboard = await dashboardResponse.json();
        setDashboard(nextDashboard);
      }
    } catch (error) {
      setToast('Could not record the officer action.');
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'overview':
        return <OverviewPage dashboard={dashboard} lang={lang} onReview={openBidReview} onAction={(msg) => setToast(msg)} />;
      case 'bids':
        return <BidReviewPage bid={selectedBid} lang={lang} onAction={(msg) => setToast(msg)} />;
      case 'verificationQueue':
        return <BidReviewPage bid={selectedBid} lang={lang} onAction={(msg) => setToast(msg)} />;
      case 'firmIntegrity':
        return <IntegrityPage lang={lang} firm={firmIntegrity} />;
      case 'alerts':
        return <PlaceholderPage lang={lang} titleKey="alerts" />;
      case 'auditTrail':
        return <PlaceholderPage lang={lang} titleKey="auditTrail" />;
      case 'complianceRules':
        return <PlaceholderPage lang={lang} titleKey="complianceRules" />;
      default:
        return <OverviewPage dashboard={dashboard} lang={lang} onReview={openBidReview} onAction={(msg) => setToast(msg)} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar activeScreen={activeScreen} onSelect={setActiveScreen} lang={lang} />

      <main className="main-panel">
        <header className="topbar" aria-label="Application controls">
          <div className="header-group">
            <button
              type="button"
              className="toggle-button"
              aria-label={translations[lang].highContrast}
              onClick={() => setHighContrast((value) => !value)}
            >
              {translations[lang].highContrast}
            </button>
          </div>

          <div className="control-group">
            <button
              type="button"
              className="toggle-button"
              aria-label="Switch language"
              onClick={() => setLang((prev) => (prev === 'en' ? 'hi' : 'en'))}
            >
              {translations[lang].languageToggle}
            </button>
          </div>
        </header>

        {renderScreen()}
      </main>

      {toast && <div className="toast" aria-live="polite">{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
