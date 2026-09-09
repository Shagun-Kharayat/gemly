const translation = {
  en: {
    appTitle: 'GeMLY',
    subtitle: 'Compliance Workspace',
    highContrast: 'High contrast',
    languageToggle: 'हि हिंदी',
    overview: 'Overview',
    bids: 'Bids',
    verificationQueue: 'Verification Queue',
    firmIntegrity: 'Firm Integrity',
    alerts: 'Alerts',
    auditTrail: 'Audit Trail',
    complianceRules: 'Compliance Rules',
    totalBids: 'Total Bids',
    verified: 'Verified',
    needsReview: 'Needs Review',
    highRisk: 'High Risk',
    priorityQueue: 'Priority Queue',
    commonFailureTrends: 'Common Failure Trends',
    review: 'Review',
    riskLevel: 'Risk Level',
    issue: 'Issue',
    score: 'Score',
    login: 'Officer login',
    email: 'Email',
    otp: 'OTP',
    submit: 'Continue',
    requestOtp: 'Request OTP',
    verifyOtp: 'Verify OTP',
    dashboardTitle: 'Procurement Officer Dashboard',
    bidReviewTitle: 'Bid Compliance Review Workspace',
    anonymousProfile: 'Anonymous bidder profile',
    documentList: 'Uploaded document list',
    documentStatus: 'Document status',
    maskedNote: 'Confidential data remains masked.',
    aiChecklist: 'AI-assisted compliance checklist',
    scoreLabel: 'Compliance or risk score',
    whyScore: 'Why this score?',
    approve: 'Approve for review',
    requestClarification: 'Request clarification',
    flag: 'Flag for investigation',
    downloadAudit: 'Download audit report',
    reason: 'Written reason',
    submitAction: 'Submit decision',
    toast: 'Officer action recorded in the tamper-evident audit trail.',
    auditTitle: 'Audit Trail',
    firmTitle: 'Firm Integrity',
    fairnessNotice: 'Official verified facts are separated from AI risk signals. A firm is never labelled corrupt based only on pattern similarity.',
    potentialRelatedEntity: 'Potential related entity — human review required.',
    placeholder: 'This section is under development.'
  },
  hi: {
    appTitle: 'GeMLY',
    subtitle: 'अनुपालन कार्यस्थान',
    highContrast: 'उच्च विपरीत',
    languageToggle: 'EN English',
    overview: 'अवलोकन',
    bids: 'बिड्स',
    verificationQueue: 'सत्यापन कतार',
    firmIntegrity: 'फर्म अखंडता',
    alerts: 'अलर्ट',
    auditTrail: 'ऑडिट ट्रेल',
    complianceRules: 'अनुपालन नियम',
    totalBids: 'कुल बिड्स',
    verified: 'सत्यापित',
    needsReview: 'समीक्षा आवश्यक',
    highRisk: 'उच्च जोखिम',
    priorityQueue: 'प्राथमिकता कतार',
    commonFailureTrends: 'सामान्य विफलता रुझान',
    review: 'समीक्षा',
    riskLevel: 'जोखिम स्तर',
    issue: 'समस्या',
    score: 'स्कोर',
    login: 'अधिकारी लॉगिन',
    email: 'ईमेल',
    otp: 'OTP',
    submit: 'जारी रखें',
    requestOtp: 'OTP अनुरोध करें',
    verifyOtp: 'OTP सत्यापित करें',
    dashboardTitle: 'प्रोक्योरमेंट ऑफिसर डैशबोर्ड',
    bidReviewTitle: 'बिड अनुपालन समीक्षा कार्यक्षेत्र',
    anonymousProfile: 'गोपनीय बोलीदाता प्रोफ़ाइल',
    documentList: 'अपलोडेड दस्तावेज़ सूची',
    documentStatus: 'दस्तावेज़ स्थिति',
    maskedNote: 'गोपनीय डेटा मास्क रहता है।',
    aiChecklist: 'एआई-सहायता अनुपालन चेकलिस्ट',
    scoreLabel: 'अनुपालन या जोखिम स्कोर',
    whyScore: 'यह स्कोर क्यों?',
    approve: 'समीक्षा के लिए स्वीकृत करें',
    requestClarification: 'स्पष्टीकरण का अनुरोध करें',
    flag: 'जांच के लिए फ्लैग करें',
    downloadAudit: 'ऑडिट रिपोर्ट डाउनलोड करें',
    reason: 'लिखित कारण',
    submitAction: 'निर्णय जमा करें',
    toast: 'अधिकारी की कार्रवाई टेम्पर-एविडेंट ऑडिट ट्रेल में दर्ज की गई।',
    auditTitle: 'ऑडिट ट्रेल',
    firmTitle: 'फर्म अखंडता',
    fairnessNotice: 'अधिकृत सत्यापित तथ्यों को एआई जोखिम संकेतों से अलग रखा जाता है। केवल पैटर्न समानता के आधार पर फर्म को भ्रष्ट नहीं माना जाता है।',
    potentialRelatedEntity: 'संभावित संबंधित इकाई — मानवीय समीक्षा आवश्यक।',
    placeholder: 'यह अनुभाग विकासाधीन है।'
  }
};

const state = {
  lang: 'en',
  highContrast: false,
  activeScreen: 'overview',
  dashboard: null,
  bids: [],
  selectedBid: null,
  audit: [],
  firmIntegrity: null,
  user: null,
  toast: '',
};

const appEl = document.getElementById('app');

function renderLogin() {
  appEl.innerHTML = `
    <div class="login-screen">
      <div class="login-card">
        <div class="brand-wrap" style="justify-content: center; margin-bottom: 20px;">
          <div class="logo-mark" aria-hidden="true"></div>
          <div>
            <div class="brand-title">${translation[state.lang].appTitle}</div>
            <div class="brand-subtitle">${translation[state.lang].subtitle}</div>
          </div>
        </div>
        <h2 style="margin: 0 0 18px; text-align:center;">${translation[state.lang].login}</h2>
        <div class="form-grid">
          <label>
            ${translation[state.lang].email}
            <input id="emailInput" type="email" value="aman.verma@gov.in" />
          </label>
          <label>
            ${translation[state.lang].otp}
            <input id="otpInput" type="text" inputmode="numeric" maxlength="6" value="123456" />
          </label>
        </div>
        <div class="login-actions">
          <button class="primary-btn" id="verifyBtn">${translation[state.lang].verifyOtp}</button>
          <button class="secondary-btn" id="requestOtpBtn">${translation[state.lang].requestOtp}</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('requestOtpBtn').addEventListener('click', async () => {
    const email = document.getElementById('emailInput').value.trim();
    const response = await fetch('/api/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    showToast(data.message || 'OTP requested');
    if (data.otp) {
      document.getElementById('otpInput').value = data.otp;
    }
  });

  document.getElementById('verifyBtn').addEventListener('click', async () => {
    const email = document.getElementById('emailInput').value.trim();
    const otp = document.getElementById('otpInput').value.trim();

    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });

    const data = await response.json();
    if (!data.success) {
      showToast(data.message || 'Verification failed');
      return;
    }

    state.user = data.user;
    loadDashboard();
  });
}

function showToast(message) {
  state.toast = message;
  const toast = document.querySelector('.toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.remove('hidden');
  } else {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }
}

function renderSidebar() {
  const navItems = [
    { key: 'overview', label: translation[state.lang].overview },
    { key: 'bids', label: translation[state.lang].bids },
    { key: 'verificationQueue', label: translation[state.lang].verificationQueue },
    { key: 'firmIntegrity', label: translation[state.lang].firmIntegrity },
    { key: 'alerts', label: translation[state.lang].alerts },
    { key: 'auditTrail', label: translation[state.lang].auditTrail },
    { key: 'complianceRules', label: translation[state.lang].complianceRules },
  ];

  return `
    <aside class="sidebar" aria-label="Sidebar navigation">
      <div class="brand-wrap">
        <div class="logo-mark" aria-hidden="true"></div>
        <div>
          <div class="brand-title">${translation[state.lang].appTitle}</div>
          <div class="brand-subtitle">${translation[state.lang].subtitle}</div>
        </div>
      </div>
      <nav class="nav-list">
        ${navItems.map((item) => `
          <button class="nav-button ${state.activeScreen === item.key ? 'active' : ''}" data-screen="${item.key}">
            ${item.label}
          </button>
        `).join('')}
      </nav>
      <div class="sidebar-foot">
        <strong>Bid integrity</strong>
        <span>Case ID: BID-9X72K</span>
      </div>
    </aside>
  `;
}

async function loadDashboard() {
  const dashboardResponse = await fetch('/api/dashboard');
  const dashboardData = await dashboardResponse.json();
  state.dashboard = dashboardData;

  const bidsResponse = await fetch('/api/bids');
  const bidData = await bidsResponse.json();
  state.bids = bidData.bids;

  renderApp();
}

async function loadBidDetail(publicId) {
  const response = await fetch(`/api/bids/${publicId}`);
  const data = await response.json();
  state.selectedBid = data;
  state.activeScreen = 'bids';
  renderApp();
}

async function loadAuditTrail() {
  const response = await fetch('/api/audit');
  const data = await response.json();
  state.audit = data.auditEvents;
  renderApp();
}

async function loadFirmIntegrity() {
  const response = await fetch('/api/firms/1/integrity');
  const data = await response.json();
  state.firmIntegrity = data;
  renderApp();
}

async function submitAction(publicId, action, reason) {
  const response = await fetch(`/api/bids/${publicId}/actions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, reason, officerName: state.user?.name || 'Aman Verma' })
  });

  const data = await response.json();
  showToast(data.message || translation[state.lang].toast);

  if (data.success) {
    await loadDashboard();
    if (state.activeScreen === 'auditTrail') {
      await loadAuditTrail();
    }
  }
}

function renderOverview() {
  if (!state.dashboard) {
    return '<div class="placeholder-box">Loading dashboard…</div>';
  }

  const metrics = [
    { label: 'totalBids', value: state.dashboard.totalBids, cls: 'navy', footer: 'Updated 10 mins ago' },
    { label: 'verified', value: state.dashboard.verifiedBids, cls: 'green', footer: 'Current eligible bids' },
    { label: 'needsReview', value: state.dashboard.needsReviewBids, cls: 'amber', footer: 'Pending manual review' },
    { label: 'highRisk', value: state.dashboard.highRiskBids, cls: 'red', footer: 'Escalated for review' },
  ];

  const queue = [...(state.dashboard.priorityQueue || [])].sort((a, b) => {
    const order = { 'High Risk': 0, 'Needs Review': 1, Verified: 2 };
    return order[a.status] - order[b.status];
  });

  return `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="eyebrow">${translation[state.lang].overview}</p>
          <h1 class="page-title">${translation[state.lang].dashboardTitle}</h1>
        </div>
      </header>

      <section class="metrics-grid">
        ${metrics.map((m) => `
          <div class="metric-card ${m.cls}">
            <span class="metric-label">${translation[state.lang][m.label]}</span>
            <div class="metric-value"><strong>${m.value}</strong></div>
            <div class="metric-sub">${m.footer}</div>
          </div>
        `).join('')}
      </section>

      <section class="content-grid">
        <div class="card">
          <div class="card-header">
            <h2>${translation[state.lang].priorityQueue}</h2>
          </div>
          <table class="priority-table">
            <thead>
              <tr>
                <th>${translation[state.lang].bids}</th>
                <th>${translation[state.lang].riskLevel}</th>
                <th>${translation[state.lang].issue}</th>
                <th>${translation[state.lang].score}</th>
                <th>${translation[state.lang].review}</th>
              </tr>
            </thead>
            <tbody>
              ${queue.map((bid) => {
                const chipClass = bid.status === 'High Risk' ? 'high' : bid.status === 'Needs Review' ? 'review' : 'verified';
                const chipText = bid.status === 'High Risk' ? 'High Risk' : bid.status === 'Needs Review' ? 'Needs Review' : 'Verified';
                return `
                  <tr>
                    <td class="bid-id">${bid.publicId}</td>
                    <td><span class="status-chip ${chipClass}">${chipText}</span></td>
                    <td>Missing GST return or customer document validation</td>
                    <td class="score-badge">${bid.complianceScore}</td>
                    <td><button class="review-link" data-bid="${bid.publicId}">Review</button></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <div class="card">
          <div class="card-header">
            <h2>${translation[state.lang].commonFailureTrends}</h2>
          </div>
          <ul class="trend-list">
            <li class="trend-item"><span>Missing GST return</span><span class="trend-tag">22%</span></li>
            <li class="trend-item"><span>Invalid or expired document</span><span class="trend-tag">18%</span></li>
            <li class="trend-item"><span>Missing OEM authorization</span><span class="trend-tag">16%</span></li>
          </ul>
        </div>
      </section>

      <section class="card privacy-panel">
        <div class="inline-summary">
          <div class="lock-icon" aria-hidden="true">🔒</div>
          <div>
            <h3>Confidential Bid Vault</h3>
            <p>Bidder identity is hidden during early evaluation. Personal data, prices, bank information, signatures, and confidential attachments are masked by default. Officers receive only need-to-know access. All data-access requests are logged.</p>
          </div>
        </div>
        <div class="micro-grid">
          <div class="info-row"><span>Random case allocation</span><strong>On</strong></div>
          <div class="info-row"><span>Conflict-of-interest declaration</span><strong>Required</strong></div>
          <div class="info-row"><span>Two-person override</span><strong>Enabled</strong></div>
          <div class="info-row"><span>Tamper-evident audit trail</span><strong>Recorded</strong></div>
        </div>
      </section>
    </div>
  `;
}

function renderBidReview() {
  if (!state.selectedBid) {
    return '<div class="placeholder-box">Select a bid to begin review.</div>';
  }

  const checklist = [
    { label: 'Identity and business verification', status: 'Verified' },
    { label: 'GST and tax compliance', status: 'Needs review' },
    { label: 'MSME or Startup status', status: 'Needs review' },
    { label: 'Technical specifications', status: 'Verified' },
    { label: 'OEM authorization', status: 'High risk' },
    { label: 'Official debarment search', status: 'Verified' },
    { label: 'Document intelligence', status: 'Needs review' }
  ];

  return `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="eyebrow">${translation[state.lang].bids}</p>
          <h1 class="page-title">${translation[state.lang].bidReviewTitle}</h1>
        </div>
      </header>

      <div class="audit-layout">
        <div class="column-panel">
          <div class="profile-card">
            <div class="profile-header">
              <h3>${translation[state.lang].anonymousProfile}</h3>
              <span class="status-chip neutral">${state.selectedBid.publicId}</span>
            </div>
            <ul class="object-list">
              <li class="object-item"><span>${translation[state.lang].documentList}</span><strong>${state.selectedBid.documents.length}</strong></li>
              <li class="object-item"><span>${translation[state.lang].documentStatus}</span><strong>3 pending</strong></li>
              <li class="object-item"><span>${translation[state.lang].maskedNote}</span><strong>Masked</strong></li>
            </ul>
          </div>
        </div>

        <div class="column-panel">
          <div class="profile-card">
            <div class="profile-header">
              <h3>${translation[state.lang].aiChecklist}</h3>
            </div>
            <ul class="checklist">
              ${checklist.map((item) => {
                const variant = item.status === 'Verified' ? 'verified' : item.status === 'Needs review' ? 'review' : 'high';
                return `
                  <li>
                    <span class="checkmark" aria-hidden="true">✓</span>
                    <div>
                      <strong>${item.label}</strong>
                      <div class="small-label"><span class="status-chip ${variant}">${item.status}</span></div>
                    </div>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>
        </div>

        <div class="column-panel">
          <div class="score-card">
            <div class="small-label">${translation[state.lang].scoreLabel}</div>
            <div class="score-ring"><span>${state.selectedBid.complianceScore}</span></div>
            <div class="risk-box">
              <strong>${translation[state.lang].whyScore}</strong>
              <p>Document validity and tax compliance are partly satisfied, but OEM authorization and GST return records require additional confirmation before final approval.</p>
            </div>
            <div class="action-stack" style="margin-top: 16px;">
              <button class="action-btn approve" data-action="APPROVE">${translation[state.lang].approve}</button>
              <button class="action-btn request" data-action="REQUEST_CLARIFICATION">${translation[state.lang].requestClarification}</button>
              <button class="action-btn flag" data-action="FLAG">${translation[state.lang].flag}</button>
              <button class="ghost-btn" type="button">${translation[state.lang].downloadAudit}</button>
            </div>
            <div class="form-grid" style="margin-top: 16px;">
              <label>
                ${translation[state.lang].reason}
                <textarea id="decisionReason" rows="3" placeholder="Add reason for the decision"></textarea>
              </label>
              <button class="primary-btn" id="submitDecisionBtn">${translation[state.lang].submitAction}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAuditTrail() {
  if (!state.audit || !state.audit.length) {
    return '<div class="placeholder-box">Loading audit trail…</div>';
  }

  return `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="eyebrow">${translation[state.lang].auditTrail}</p>
          <h1 class="page-title">${translation[state.lang].auditTitle}</h1>
        </div>
      </header>
      <div class="card">
        <table class="audit-table">
          <thead>
            <tr>
              <th>Actor</th>
              <th>Event</th>
              <th>Entity</th>
              <th>Details</th>
              <th>Time</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            ${state.audit.map((event) => `
              <tr>
                <td>${event.actor}</td>
                <td>${event.eventType}</td>
                <td>${event.entityType}: ${event.entityId}</td>
                <td>${event.details.reason || JSON.stringify(event.details)}</td>
                <td>${new Date(event.timestamp).toLocaleString()}</td>
                <td>${event.currentEventHash.slice(0, 12)}...</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderFirmIntegrity() {
  if (!state.firmIntegrity) {
    return '<div class="placeholder-box">Loading firm integrity profile…</div>';
  }

  return `
    <div class="page">
      <header class="page-header">
        <div>
          <p class="eyebrow">${translation[state.lang].firmIntegrity}</p>
          <h1 class="page-title">${translation[state.lang].firmTitle}</h1>
        </div>
      </header>
      <div class="integrity-grid">
        <div class="firm-card">
          <div class="firm-header">
            <div>
              <p class="small-label">Firm name</p>
              <h2 class="firm-name">${state.firmIntegrity.firmName}</h2>
            </div>
            <span class="status-chip verified">Eligible</span>
          </div>
          <div class="firm-meta">
            <div class="meta-box"><div class="small-label">GSTIN</div><strong>${state.firmIntegrity.maskedGstin}</strong></div>
            <div class="meta-box"><div class="small-label">Incorporation year</div><strong>${state.firmIntegrity.incorporationYear}</strong></div>
            <div class="meta-box"><div class="small-label">Category</div><strong>${state.firmIntegrity.category}</strong></div>
            <div class="meta-box"><div class="small-label">Reliability score</div><strong>${state.firmIntegrity.reliabilityScore}/100</strong></div>
            <div class="meta-box"><div class="small-label">Eligibility status</div><strong>Eligible</strong></div>
            <div class="meta-box"><div class="small-label">Last verified</div><strong>12 Aug 2026</strong></div>
            <div class="meta-box"><div class="small-label">Debarment status</div><strong>${state.firmIntegrity.debarmentStatus}</strong></div>
            <div class="meta-box"><div class="small-label">Contract history</div><strong>4 records</strong></div>
          </div>
          <div class="card" style="margin-top: 18px;">
            <div class="card-header">
              <h3>Past contract history</h3>
            </div>
            <table class="audit-table">
              <thead>
                <tr>
                  <th>Contract ID</th>
                  <th>Department</th>
                  <th>Delivery</th>
                  <th>Quality</th>
                </tr>
              </thead>
              <tbody>
                ${state.firmIntegrity.contractHistory.map((row) => `
                  <tr>
                    <td>${row.contractId}</td>
                    <td>${row.procuringDepartment}</td>
                    <td>${row.deliveryPerformance}</td>
                    <td>${row.qualityOutcome}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="firm-card">
          <div class="card-header">
            <h3>Associated Entity Risk Map</h3>
          </div>
          <div class="risk-map">
            ${state.firmIntegrity.riskSignals.map((signal) => `
              <div class="signal-item">
                <strong>${signal.signal}</strong>
                <span class="status-chip review">${signal.status}</span>
              </div>
            `).join('')}
            <div class="alert-box">${translation[state.lang].fairnessNotice}</div>
            <div class="alert-box" style="background: var(--red-soft); border-color: rgba(201,61,61,0.25); color: var(--red);">${translation[state.lang].potentialRelatedEntity}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPlaceholder(titleKey) {
  return `<div class="page"><header class="page-header"><div><p class="eyebrow">${translation[state.lang].overview}</p><h1 class="page-title">${translation[state.lang][titleKey]}</h1></div></header><div class="placeholder-box">${translation[state.lang].placeholder}</div></div>`;
}

function renderScreen() {
  if (!state.user) {
    return renderLogin();
  }

  switch (state.activeScreen) {
    case 'overview':
      return renderOverview();
    case 'bids':
      return renderBidReview();
    case 'verificationQueue':
      return renderBidReview();
    case 'firmIntegrity':
      return renderFirmIntegrity();
    case 'alerts':
      return renderPlaceholder('alerts');
    case 'auditTrail':
      return renderAuditTrail();
    case 'complianceRules':
      return renderPlaceholder('complianceRules');
    default:
      return renderOverview();
  }
}

function renderApp() {
  if (!state.user) {
    renderLogin();
    return;
  }

  document.body.classList.toggle('high-contrast', state.highContrast);
  document.documentElement.lang = state.lang;
  appEl.innerHTML = `
    <div class="app-shell">
      ${renderSidebar()}
      <main class="main-panel">
        <header class="topbar">
          <div class="control-group">
            <button class="toggle-button" id="contrastToggle">${translation[state.lang].highContrast}</button>
          </div>
          <div class="control-group">
            <button class="toggle-button" id="langToggle">${translation[state.lang].languageToggle}</button>
          </div>
        </header>
        ${renderScreen()}
      </main>
    </div>
  `;

  document.getElementById('contrastToggle').addEventListener('click', () => {
    state.highContrast = !state.highContrast;
    renderApp();
  });

  document.getElementById('langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'hi' : 'en';
    renderApp();
  });

  document.querySelectorAll('.nav-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const next = button.dataset.screen;
      state.activeScreen = next;
      if (next === 'auditTrail') {
        await loadAuditTrail();
      }
      if (next === 'firmIntegrity') {
        await loadFirmIntegrity();
      }
      if (next === 'bids' || next === 'verificationQueue') {
        if (!state.selectedBid && state.bids.length) {
          await loadBidDetail(state.bids[0].public_id);
        } else {
          renderApp();
        }
      } else {
        renderApp();
      }
    });
  });

  document.querySelectorAll('.review-link').forEach((button) => {
    button.addEventListener('click', () => {
      loadBidDetail(button.dataset.bid);
    });
  });

  const actionButtons = document.querySelectorAll('[data-action]');
  actionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.action;
      const reason = document.getElementById('decisionReason')?.value || 'Manual assessment recorded by officer.';
      submitAction(state.selectedBid.publicId, action, reason);
    });
  });

  const submitDecisionBtn = document.getElementById('submitDecisionBtn');
  if (submitDecisionBtn) {
    submitDecisionBtn.addEventListener('click', () => {
      const reason = document.getElementById('decisionReason')?.value || 'Manual assessment recorded by officer.';
      submitAction(state.selectedBid.publicId, 'APPROVE', reason);
    });
  }
}

renderApp();
