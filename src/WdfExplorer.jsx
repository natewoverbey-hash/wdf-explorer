import { useState, useEffect, useRef } from "react";

// ─── COLOR SYSTEM ───
const C = {
  infiniteBlue: "#032D42",
  deepBlue: "#021E2E",
  navyDark: "#01141F",
  wasabiGreen: "#63DF4E",
  wasabiDim: "#4BB83E",
  white: "#FFFFFF",
  gray100: "#F0F4F7",
  gray200: "#D1DAE0",
  gray400: "#8A9EAB",
  gray600: "#4A6070",
  amber: "#F5A623",
  amberDim: "#D4901F",
  purple: "#9B6FE8",
  teal: "#3ECFCF",
};

// ─── INLINE SVG ICONS ───
const Icons = {
  hub: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  zeroCopy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="2" y="3" width="8" height="7" rx="1" />
      <rect x="14" y="14" width="8" height="7" rx="1" />
      <path d="M10 6.5h4M14 6.5v8M10 17.5h-4M10 17.5v-8" strokeDasharray="3 2" />
    </svg>
  ),
  rpa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="15" cy="10" r="1.5" />
      <path d="M9 15h6" />
      <path d="M8 2v2M16 2v2" />
    </svg>
  ),
  stream: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
      <path d="M2 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity="0.5" />
      <path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity="0.5" />
    </svg>
  ),
  knowledge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <circle cx="12" cy="6" r="3" />
      <circle cx="5" cy="18" r="3" />
      <circle cx="19" cy="18" r="3" />
      <path d="M10.5 8.5L6.5 15.5M13.5 8.5l4 7" />
      <path d="M8 18h8" />
    </svg>
  ),
  content: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h5" />
    </svg>
  ),
  mcp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="3" y="8" width="6" height="8" rx="1" />
      <rect x="15" y="8" width="6" height="8" rx="1" />
      <path d="M9 12h6" />
      <path d="M12 5v3M12 16v3" />
      <circle cx="12" cy="4" r="1" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  ),
  patient: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M12 11v4M10 13h4" />
    </svg>
  ),
  auth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  supply: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="1" y="6" width="7" height="7" rx="1" />
      <rect x="9" y="13" width="7" height="7" rx="1" />
      <rect x="16" y="3" width="7" height="7" rx="1" />
      <path d="M8 9h1M16 16h1M12 13V10h4" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  legacy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8h2M7 11h4" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  catalog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8M8 11h5" />
      <circle cx="16" cy="14" r="2" />
      <path d="M18 16l1.5 1.5" />
    </svg>
  ),
  nav: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
      <circle cx="12" cy="12" r="10" />
      <path d="M16.24 7.76l-6.48 2.76-2.76 6.48 6.48-2.76z" />
    </svg>
  ),
};

// ─── BADGE COMPONENT ───
const Badge = ({ type, small }) => {
  const styles = {
    verified: { bg: C.wasabiGreen, color: C.navyDark, label: "Verified Benchmark", border: "none" },
    target: { bg: "transparent", color: C.amber, label: "Target Outcome", border: `1.5px solid ${C.amber}` },
    proof: { bg: "transparent", color: C.wasabiGreen, label: "Customer Proof Point", border: `1.5px solid ${C.wasabiGreen}` },
    strategic: { bg: "transparent", color: C.purple, label: "Strategic", border: `1.5px solid ${C.purple}` },
  };
  const s = styles[type];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: small ? "2px 8px" : "3px 10px",
      borderRadius: 20, fontSize: small ? 10 : 11, fontWeight: 600,
      backgroundColor: s.bg, color: s.color, border: s.border,
      letterSpacing: 0.3, whiteSpace: "nowrap",
    }}>
      {type === "verified" && <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.navyDark }} />}
      {type === "target" && <span style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${C.amber}` }} />}
      {type === "proof" && <span style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${C.wasabiGreen}` }} />}
      {type === "strategic" && <span style={{ width: 6, height: 6, borderRadius: "50%", border: `1.5px solid ${C.purple}` }} />}
      {s.label}
    </span>
  );
};

// ─── DATA: WDF COMPONENTS (JOURNEY) ───
const journeyStages = [
  {
    id: "ihub",
    name: "Integration Hub",
    icon: Icons.hub,
    short: "Pre-built connectors to 450+ enterprise systems",
    detail: "Bidirectional data flow and workflow automation with Epic, Cerner, SAP, Workday, Salesforce, and hundreds more. 200+ out-of-the-box spokes with AI-powered spoke generation.",
    metrics: [
      { value: "450+", label: "System Connectors", badge: "verified" },
      { value: "70%", label: "Integration TCO Reduction", badge: "verified" },
      { value: "3×", label: "Faster Implementation", badge: "verified" },
    ],
    color: C.wasabiGreen,
  },
  {
    id: "catalog",
    name: "Data Catalog",
    icon: Icons.catalog,
    short: "Organize, govern, and contextualize enterprise data",
    detail: "A unified data catalog that adds active metadata, enforces governance policies, and provides lineage — so information is easy to find, trust, understand, and share. Powered by data.world, it transforms raw information into actionable insights with embedded semantics and business context, making data AI-ready.",
    metrics: [
      { value: "10×", label: "Faster Data Discovery (data.world)", badge: "verified" },
      { value: "4.2×", label: "Insight Accuracy via Explainable Governance", badge: "verified" },
      { value: "Unified", label: "Metadata & Lineage Tracking", badge: "verified" },
    ],
    color: "#48C9B0",
  },
  {
    id: "zerocopy",
    name: "Zero Copy",
    icon: Icons.zeroCopy,
    short: "Query external data without moving it",
    detail: "Access data from Snowflake, Databricks, BigQuery, and ERP systems directly within ServiceNow. Data stays where it lives — no duplication, no brittle ETL pipelines. Critical for HIPAA compliance: less data movement = less risk.",
    metrics: [
      { value: "Zero", label: "Data Duplication Required", badge: "verified" },
      { value: "Real-time", label: "Cross-System Queries", badge: "verified" },
      { value: "Reduced", label: "HIPAA Exposure Surface", badge: "strategic" },
    ],
    color: C.teal,
  },
  {
    id: "stream",
    name: "StreamConnect",
    icon: Icons.stream,
    short: "Real-time event streaming via Kafka",
    detail: "High-volume, low-latency data flows between ServiceNow and external systems. Real-time alerts for authorization status changes, device shipment updates, sensor data, and continuous data sync.",
    metrics: [
      { value: "Real-time", label: "Event Processing", badge: "verified" },
      { value: "Kafka", label: "Native Integration", badge: "verified" },
      { value: "Continuous", label: "Data Synchronization", badge: "verified" },
    ],
    color: C.amber,
  },
  {
    id: "rpa",
    name: "RPA Hub",
    icon: Icons.rpa,
    short: "Automate legacy systems without APIs",
    detail: "Bridge gaps where modern APIs don't exist. Screen scraping, data entry, form filling across legacy pharmacy, radiology, and lab systems. No multi-year modernization project needed.",
    metrics: [
      { value: "4,000", label: "Calls Deflected (USI)", badge: "proof" },
      { value: "92%", label: "First Contact Resolution (Georgian)", badge: "proof" },
      { value: "$75K", label: "Annual Savings (Georgian)", badge: "proof" },
    ],
    color: "#E85D75",
  },
  {
    id: "content",
    name: "Content Connectors",
    icon: Icons.content,
    short: "Unstructured content from SharePoint, Confluence",
    detail: "Connect to document repositories, wikis, and knowledge bases. Bring surgical protocols, formularies, care guidelines, and clinical documentation into ServiceNow workflows with AI-powered search.",
    metrics: [
      { value: "Unified", label: "Search Experience", badge: "verified" },
      { value: "AI-Powered", label: "Knowledge Retrieval", badge: "verified" },
      { value: "Scalable", label: "Content Federation", badge: "strategic" },
    ],
    color: "#7B8CDE",
  },
  {
    id: "graph",
    name: "Knowledge Graph",
    icon: Icons.knowledge,
    short: "Map relationships across enterprise data",
    detail: "Gives AI agents contextual understanding of how systems, people, and processes connect. Maps patient → surgery → device → surgeon → insurance → pharmacy relationships so AI can reason across the full care journey.",
    metrics: [
      { value: "Contextual", label: "AI Reasoning", badge: "strategic" },
      { value: "Entity", label: "Relationship Mapping", badge: "verified" },
      { value: "15 min", label: "vs Multi-Day Analysis (AI Data Explorer)", badge: "verified" },
    ],
    color: C.purple,
  },
  {
    id: "mcp",
    name: "MCP & A2A",
    icon: Icons.mcp,
    short: "Agent-to-Agent protocols for AI orchestration",
    detail: "Model Context Protocol and Agent-to-Agent protocols enable AI agents to access and reason across all connected data sources. The bridge from connected data to autonomous workflows.",
    metrics: [
      { value: "Any", label: "AI Model Integration", badge: "verified" },
      { value: "Cross-System", label: "Agent Orchestration", badge: "strategic" },
      { value: "Autonomous", label: "Workflow Execution", badge: "strategic" },
    ],
    color: "#4ECDC4",
  },
];

// ─── DATA: HEALTHCARE USE CASES ───
const useCases = [
  {
    id: "patient-journey",
    title: "Patient Journey Orchestration",
    subtitle: "The Hip Replacement Story",
    icon: Icons.patient,
    color: C.wasabiGreen,
    components: ["Integration Hub", "Knowledge Graph", "Data Catalog", "StreamConnect"],
    before: {
      headline: "Every handoff is a black hole",
      points: [
        "Patient calls and gets bounced: surgical scheduling → insurance auth line → medical device team",
        "EHR (Epic/Cerner), scheduling, insurance, supply chain (SAP), HR (Workday) all disconnected",
        "No agent — human or AI — has the complete picture across all systems",
        "Post-discharge coordination with home health, pharmacy, and device tracking falls through cracks",
        "Average patient makes 8+ calls across departments for a single surgical episode",
      ],
    },
    after: {
      headline: "Unified context across every system",
      points: [
        "iHub Spokes connect Epic, Cerner, SAP, Workday bidirectionally — single pane of glass",
        "Knowledge Graph maps patient → surgery → device → surgeon → insurance → pharmacy relationships",
        "StreamConnect delivers real-time alerts when auth status changes or device shipment updates arrive",
        "Any agent (human or AI) sees the complete, real-time context across every system",
        "Proactive updates replace reactive phone tag — patient informed before they need to call",
      ],
    },
    metrics: [
      { value: "400K", label: "Hours of Care Optimized/Month (Elara Caring)", badge: "proof" },
      { value: "1 Day", label: "Onboarding vs Weeks (Elara Caring)", badge: "proof" },
      { value: "15%", label: "Target Decrease in Incidents Worked", badge: "target" },
    ],
  },
  {
    id: "prior-auth",
    title: "Prior Authorization & Insurance",
    subtitle: "The #1 Administrative Burden",
    icon: Icons.auth,
    color: C.amber,
    components: ["Integration Hub", "StreamConnect", "RPA Hub"],
    before: {
      headline: "Fax machines and phone trees",
      points: [
        "Prior auth is the single largest administrative burden in US healthcare",
        "Staff manually log into payer portals, fax forms, make follow-up calls — per patient, per procedure",
        "Authorization status trapped in payer systems — care teams checking manually every few hours",
        "Denials discovered late, delaying surgeries and creating revenue cycle gaps",
        "Average prior auth takes 2+ days; complex cases take weeks",
      ],
    },
    after: {
      headline: "Real-time payer connectivity",
      points: [
        "iHub Spokes connect to payer systems bidirectionally — submit and receive auth status automatically",
        "StreamConnect pushes real-time authorization updates the moment payer systems respond",
        "RPA handles legacy payer portals that don't have modern APIs — screen automation fills forms",
        "Automated denial detection triggers escalation workflows before delays compound",
        "Staff freed from portal-checking to focus on patient care coordination",
      ],
    },
    metrics: [
      { value: "10%", label: "Target Decrease in Avg Working Time per Case", badge: "target" },
      { value: "4,000", label: "Calls Deflected via RPA (USI)", badge: "proof" },
      { value: "70%", label: "Integration TCO Reduction", badge: "verified" },
    ],
  },
  {
    id: "supply-chain",
    title: "Supply Chain & ERP Visibility",
    subtitle: "Surgical Device Procurement",
    icon: Icons.supply,
    color: C.teal,
    components: ["Zero Copy for ERP", "Integration Hub"],
    before: {
      headline: "Surgical teams are blind to SAP",
      points: [
        "Surgeons schedule procedures without visibility into whether the implant/device is available",
        "Procurement teams live in SAP — clinical teams live in Epic — neither sees the other",
        "Device backorders discovered day-of, forcing surgical rescheduling",
        "Manual reconciliation between clinical need and supply chain status",
        "Expired or recalled devices not flagged in real-time across systems",
      ],
    },
    after: {
      headline: "ERP data inside clinical workflows",
      points: [
        "Zero Copy for ERP queries SAP procurement status natively — no data extraction needed",
        "Surgical scheduling workflows automatically validate device availability before confirming",
        "Real-time implant tracking from vendor order through sterilization to OR delivery",
        "Recall and expiration alerts flow directly into clinical workflows for immediate action",
        "Procurement KPIs visible without logging into SAP separately",
      ],
    },
    metrics: [
      { value: "8%", label: "Target Decrease in Procurement Requests", badge: "target" },
      { value: "10%", label: "Target Decrease in Invoice Processing Time", badge: "target" },
      { value: "Zero", label: "Data Duplication Required", badge: "verified" },
    ],
  },
  {
    id: "clinical-ai",
    title: "Clinical Knowledge & AI Context",
    subtitle: "AI Agents with Full Care Context",
    icon: Icons.ai,
    color: C.purple,
    components: ["External Content Connectors", "Knowledge Graph", "Data Catalog", "MCP & A2A"],
    before: {
      headline: "AI agents answer without context",
      points: [
        "Clinical protocols, formularies, and guidelines live in SharePoint, Confluence, document systems",
        "AI chatbots can summarize but can't access organization-specific care standards",
        "Nurses and staff manually search across 5+ document repositories for the right protocol",
        "AI recommendations based on generic training data — not your hospital's specific guidelines",
        "No connection between patient context and clinical knowledge base",
      ],
    },
    after: {
      headline: "Context-aware AI that acts on clinical knowledge",
      points: [
        "External Content Connectors bring protocols, formularies, and guidelines into ServiceNow",
        "Knowledge Graph contextualizes: this patient + this condition + your hospital's specific protocol",
        "MCP/A2A enables AI agents to reason across connected clinical data sources",
        "AI agents reference your formulary when recommending post-op medications — not generic lists",
        "Unified search across all clinical knowledge — staff find the right protocol in seconds",
      ],
    },
    metrics: [
      { value: "15 min", label: "vs Multi-Day Analysis (AI Data Explorer)", badge: "verified" },
      { value: "99.85%", label: "Process Analysis Time Reduction (DXC)", badge: "proof" },
      { value: "Contextual", label: "AI Grounding in Enterprise Data", badge: "strategic" },
    ],
  },
  {
    id: "legacy-integration",
    title: "Legacy System Integration",
    subtitle: "Bridging Systems That Predate APIs",
    icon: Icons.legacy,
    color: "#E85D75",
    components: ["RPA Hub", "Integration Hub"],
    before: {
      headline: "Legacy systems are integration dead ends",
      points: [
        "Every health system has pharmacy, radiology, or lab systems from the 1990s–2000s",
        "No REST APIs, no webhooks — just terminal screens and file drops",
        "Staff manually re-key data between legacy systems and modern platforms",
        "Multi-year modernization projects keep getting deprioritized and underfunded",
        "Data errors from manual transcription create patient safety risks",
      ],
    },
    after: {
      headline: "Automate the legacy gap today",
      points: [
        "RPA bots interact with legacy screens — data entry, form filling, status checks — automatically",
        "No rip-and-replace needed — bridge the gap while modernization plans mature",
        "Integration Hub orchestrates workflows that span both modern APIs and legacy RPA bots",
        "Error rates drop as manual re-keying is eliminated",
        "Deploy in weeks, not years — immediate ROI while preserving existing system investments",
      ],
    },
    metrics: [
      { value: ">30%", label: "MTTR Reduction (DXC)", badge: "proof" },
      { value: "26%", label: "Incident Volume Reduction in 3 Months (DXC)", badge: "proof" },
      { value: "3×", label: "Faster Integration Implementation", badge: "verified" },
    ],
  },
];

// ─── DATA: DISCOVERY QUESTIONS ───
const discoveryQuestions = [
  {
    id: "q1",
    question: "How many external systems does your organization currently integrate with ServiceNow (or plan to)?",
    options: [
      { label: "1–5 systems", score: { "patient-journey": 1, "prior-auth": 1, "supply-chain": 1, "clinical-ai": 0, "legacy-integration": 0 } },
      { label: "6–15 systems", score: { "patient-journey": 2, "prior-auth": 2, "supply-chain": 1, "clinical-ai": 1, "legacy-integration": 1 } },
      { label: "16–30 systems", score: { "patient-journey": 3, "prior-auth": 2, "supply-chain": 2, "clinical-ai": 2, "legacy-integration": 2 } },
      { label: "30+ systems", score: { "patient-journey": 3, "prior-auth": 3, "supply-chain": 3, "clinical-ai": 3, "legacy-integration": 3 } },
    ],
  },
  {
    id: "q2",
    question: "How is your EHR system (Epic, Cerner, etc.) integrated with other operational systems today?",
    options: [
      { label: "Primarily manual / file-based (HL7 batch, CSV exports)", score: { "patient-journey": 3, "prior-auth": 2, "supply-chain": 1, "clinical-ai": 1, "legacy-integration": 3 } },
      { label: "Point-to-point interfaces (custom-built)", score: { "patient-journey": 2, "prior-auth": 2, "supply-chain": 1, "clinical-ai": 1, "legacy-integration": 1 } },
      { label: "Integration engine (Rhapsody, MuleSoft, etc.)", score: { "patient-journey": 2, "prior-auth": 1, "supply-chain": 1, "clinical-ai": 1, "legacy-integration": 0 } },
      { label: "Modern FHIR APIs with real-time data exchange", score: { "patient-journey": 1, "prior-auth": 1, "supply-chain": 0, "clinical-ai": 1, "legacy-integration": 0 } },
    ],
  },
  {
    id: "q3",
    question: "What is your biggest challenge with prior authorization workflows?",
    options: [
      { label: "Manual portal logins and fax-based submissions", score: { "patient-journey": 1, "prior-auth": 3, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 2 } },
      { label: "No real-time visibility into authorization status", score: { "patient-journey": 2, "prior-auth": 3, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 1 } },
      { label: "Denials discovered too late, delaying procedures", score: { "patient-journey": 2, "prior-auth": 3, "supply-chain": 1, "clinical-ai": 0, "legacy-integration": 0 } },
      { label: "This isn't a major pain point for us currently", score: { "patient-journey": 0, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 0 } },
    ],
  },
  {
    id: "q4",
    question: "Do your clinical or surgical teams have visibility into supply chain / ERP procurement status?",
    options: [
      { label: "No — they log into SAP (or similar) separately, if at all", score: { "patient-journey": 1, "prior-auth": 0, "supply-chain": 3, "clinical-ai": 0, "legacy-integration": 1 } },
      { label: "Limited — periodic reports or manual status checks", score: { "patient-journey": 1, "prior-auth": 0, "supply-chain": 2, "clinical-ai": 0, "legacy-integration": 0 } },
      { label: "Some integration exists but it's not real-time", score: { "patient-journey": 1, "prior-auth": 0, "supply-chain": 2, "clinical-ai": 0, "legacy-integration": 0 } },
      { label: "Well-integrated with real-time visibility", score: { "patient-journey": 0, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 0 } },
    ],
  },
  {
    id: "q5",
    question: "Do you have legacy systems (pharmacy, radiology, lab) that lack modern APIs?",
    options: [
      { label: "Yes — significant number of critical legacy systems", score: { "patient-journey": 2, "prior-auth": 1, "supply-chain": 1, "clinical-ai": 0, "legacy-integration": 3 } },
      { label: "A few — but they're bottlenecks in key workflows", score: { "patient-journey": 1, "prior-auth": 1, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 3 } },
      { label: "Minimal — most systems have been modernized", score: { "patient-journey": 0, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 1 } },
      { label: "None — all systems have API access", score: { "patient-journey": 0, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 0 } },
    ],
  },
  {
    id: "q6",
    question: "Are you deploying (or planning to deploy) AI agents that need cross-system context to operate?",
    options: [
      { label: "Yes — actively deploying AI agents now", score: { "patient-journey": 3, "prior-auth": 2, "supply-chain": 1, "clinical-ai": 3, "legacy-integration": 1 } },
      { label: "Planning for next 12 months", score: { "patient-journey": 2, "prior-auth": 1, "supply-chain": 1, "clinical-ai": 3, "legacy-integration": 1 } },
      { label: "Exploring — early conversations", score: { "patient-journey": 1, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 2, "legacy-integration": 0 } },
      { label: "Not currently on our roadmap", score: { "patient-journey": 0, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 0 } },
    ],
  },
  {
    id: "q7",
    question: "Where do clinical protocols, formularies, and care guidelines live in your organization?",
    options: [
      { label: "Scattered across SharePoint, Confluence, network drives, EHR", score: { "patient-journey": 1, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 3, "legacy-integration": 0 } },
      { label: "Centralized in one system but not connected to workflows", score: { "patient-journey": 0, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 2, "legacy-integration": 0 } },
      { label: "Embedded in EHR but not accessible outside it", score: { "patient-journey": 1, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 2, "legacy-integration": 0 } },
      { label: "Well-organized and integrated into operational workflows", score: { "patient-journey": 0, "prior-auth": 0, "supply-chain": 0, "clinical-ai": 0, "legacy-integration": 0 } },
    ],
  },
];

// ─── SECTION NAVIGATION ───
const sections = [
  { id: "journey", label: "The Data Fabric" },
  { id: "usecases", label: "Use Cases" },
  { id: "discovery", label: "Discovery Navigator" },
];

// ─── MAIN COMPONENT ───
export default function WdfExplorer() {
  const [activeSection, setActiveSection] = useState("journey");
  const [activeStage, setActiveStage] = useState(null);
  const [activeUseCase, setActiveUseCase] = useState(null);
  const [discoveryStep, setDiscoveryStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // ─── DISCOVERY SCORING ───
  const computeScores = () => {
    const totals = {};
    useCases.forEach(uc => { totals[uc.id] = 0; });
    Object.values(answers).forEach(option => {
      Object.entries(option.score).forEach(([ucId, pts]) => {
        totals[ucId] = (totals[ucId] || 0) + pts;
      });
    });
    const max = Math.max(...Object.values(totals), 1);
    return useCases
      .map(uc => ({ ...uc, score: totals[uc.id] || 0, pct: Math.round(((totals[uc.id] || 0) / max) * 100) }))
      .sort((a, b) => b.score - a.score);
  };

  const handleAnswer = (qId, option) => {
    const next = { ...answers, [qId]: option };
    setAnswers(next);
    if (discoveryStep < discoveryQuestions.length - 1) {
      setTimeout(() => setDiscoveryStep(discoveryStep + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 400);
    }
  };

  const resetDiscovery = () => {
    setAnswers({});
    setDiscoveryStep(0);
    setShowResults(false);
  };

  // ─── STYLES ───
  const glassCard = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    backdropFilter: "blur(12px)",
  };

  const pageStyle = {
    minHeight: "100vh",
    background: `linear-gradient(135deg, ${C.navyDark} 0%, ${C.infiniteBlue} 40%, ${C.deepBlue} 100%)`,
    color: C.white,
    fontFamily: "'Segoe UI', 'SF Pro Display', -apple-system, sans-serif",
    overflow: "hidden",
  };

  return (
    <div style={pageStyle}>
      {/* ─── HEADER ─── */}
      <header style={{
        padding: "32px 24px 20px", textAlign: "center",
        borderBottom: `1px solid rgba(255,255,255,0.06)`,
        background: "rgba(0,0,0,0.15)",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: C.wasabiGreen, marginBottom: 8, fontWeight: 600 }}>
          ServiceNow Healthcare
        </div>
        <h1 style={{
          fontSize: "clamp(24px, 5vw, 38px)", fontWeight: 700, margin: "0 0 8px",
          background: `linear-gradient(135deg, ${C.white} 0%, ${C.wasabiGreen} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
        }}>
          Workflow Data Fabric Explorer
        </h1>
        <p style={{ color: C.gray400, fontSize: 14, maxWidth: 600, margin: "0 auto 20px", lineHeight: 1.5 }}>
          Connect, contextualize, and control enterprise data — powering AI agents and workflows across the patient journey
        </p>

        {/* NAV TABS */}
        <div style={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600, letterSpacing: 0.3,
              transition: "all 0.25s ease",
              background: activeSection === s.id ? C.wasabiGreen : "rgba(255,255,255,0.06)",
              color: activeSection === s.id ? C.navyDark : C.gray200,
            }}>
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* ─── SECTION 1: THE DATA FABRIC JOURNEY ─── */}
      {activeSection === "journey" && (
        <div style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>The Data Fabric</h2>
            <p style={{ color: C.gray400, fontSize: 13 }}>
              Eight interconnected capabilities that make enterprise data AI-ready
            </p>
          </div>

          {/* STAGE CARDS */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}>
            {journeyStages.map((stage, i) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(activeStage?.id === stage.id ? null : stage)}
                style={{
                  ...glassCard,
                  padding: 20, cursor: "pointer", textAlign: "left",
                  transition: "all 0.3s ease",
                  border: activeStage?.id === stage.id
                    ? `1.5px solid ${stage.color}`
                    : "1px solid rgba(255,255,255,0.08)",
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  opacity: mounted ? 1 : 0,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ color: stage.color, flexShrink: 0 }}>{stage.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>{stage.name}</div>
                </div>
                <div style={{ fontSize: 13, color: C.gray400, lineHeight: 1.5 }}>{stage.short}</div>
              </button>
            ))}
          </div>

          {/* EXPANDED DETAIL */}
          {activeStage && (
            <div style={{
              ...glassCard, marginTop: 20, padding: 28,
              border: `1px solid ${activeStage.color}30`,
              animation: "fadeSlideIn 0.3s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ color: activeStage.color }}>{activeStage.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{activeStage.name}</h3>
              </div>
              <p style={{ color: C.gray200, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                {activeStage.detail}
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {activeStage.metrics.map((m, i) => (
                  <div key={i} style={{
                    ...glassCard, padding: "14px 18px", flex: "1 1 160px", minWidth: 160,
                  }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: activeStage.color, marginBottom: 4 }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: 11, color: C.gray400, marginBottom: 8 }}>{m.label}</div>
                    <Badge type={m.badge} small />
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: C.gray600, marginTop: 16, fontStyle: "italic" }}>
                Target outcomes based on ServiceNow internal benchmarks and expert guidance. Actual results vary by environment.
              </div>
            </div>
          )}

          {/* BADGE LEGEND */}
          <div style={{
            ...glassCard, marginTop: 24, padding: 16,
            display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center",
          }}>
            <Badge type="verified" />
            <Badge type="target" />
            <Badge type="proof" />
            <Badge type="strategic" />
          </div>
        </div>
      )}

      {/* ─── SECTION 2: USE CASES ─── */}
      {activeSection === "usecases" && (
        <div style={{ padding: "32px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Healthcare Use Cases</h2>
            <p style={{ color: C.gray400, fontSize: 13 }}>
              Real-world scenarios grounded in the patient experience — click to explore before vs. after
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}>
            {useCases.map((uc, i) => (
              <button
                key={uc.id}
                onClick={() => setActiveUseCase(uc)}
                style={{
                  ...glassCard, padding: 24, cursor: "pointer", textAlign: "left",
                  transition: "all 0.3s ease",
                  transform: mounted ? "translateY(0)" : "translateY(20px)",
                  opacity: mounted ? 1 : 0,
                  transitionDelay: `${i * 80}ms`,
                }}
                onMouseEnter={e => e.currentTarget.style.border = `1px solid ${uc.color}50`}
                onMouseLeave={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${uc.color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    color: uc.color,
                  }}>
                    {uc.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{uc.title}</div>
                    <div style={{ fontSize: 11, color: C.gray400 }}>{uc.subtitle}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                  {uc.components.map(c => (
                    <span key={c} style={{
                      fontSize: 10, padding: "3px 8px", borderRadius: 6,
                      background: "rgba(255,255,255,0.06)", color: C.gray200,
                    }}>{c}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {uc.metrics.slice(0, 2).map((m, j) => (
                    <div key={j} style={{ flex: 1 }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: uc.color }}>{m.value}</div>
                      <div style={{ fontSize: 10, color: C.gray400, lineHeight: 1.3 }}>{m.label.split("(")[0].trim()}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: 14, fontSize: 12, color: uc.color,
                  display: "flex", alignItems: "center", gap: 6, fontWeight: 600,
                }}>
                  Explore Before → After {Icons.arrow}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ─── USE CASE MODAL ─── */}
      {activeUseCase && (
        <div
          onClick={() => setActiveUseCase(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: `linear-gradient(180deg, ${C.infiniteBlue} 0%, ${C.navyDark} 100%)`,
              borderRadius: 20, border: `1px solid ${activeUseCase.color}30`,
              maxWidth: 900, width: "100%", maxHeight: "90vh", overflowY: "auto",
              padding: 32, position: "relative",
            }}
          >
            {/* CLOSE */}
            <button onClick={() => setActiveUseCase(null)} style={{
              position: "absolute", top: 16, right: 16, background: "none",
              border: "none", color: C.gray400, cursor: "pointer", padding: 4,
            }}>
              {Icons.close}
            </button>

            {/* HEADER */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${activeUseCase.color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: activeUseCase.color,
              }}>
                {activeUseCase.icon}
              </div>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{activeUseCase.title}</h3>
                <div style={{ fontSize: 13, color: C.gray400 }}>{activeUseCase.subtitle}</div>
              </div>
            </div>

            {/* COMPONENTS */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {activeUseCase.components.map(c => (
                <span key={c} style={{
                  fontSize: 11, padding: "4px 12px", borderRadius: 8,
                  background: `${activeUseCase.color}15`, color: activeUseCase.color,
                  fontWeight: 600,
                }}>{c}</span>
              ))}
            </div>

            {/* BEFORE / AFTER */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              {/* BEFORE */}
              <div style={{
                ...glassCard, padding: 20,
                borderLeft: `3px solid #E85D75`,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#E85D75", fontWeight: 700, marginBottom: 8 }}>
                  TODAY
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#E85D75", marginBottom: 12 }}>
                  {activeUseCase.before.headline}
                </div>
                {activeUseCase.before.points.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: C.gray200, lineHeight: 1.5 }}>
                    <span style={{ color: "#E85D75", flexShrink: 0, marginTop: 2 }}>✕</span>
                    {p}
                  </div>
                ))}
              </div>

              {/* AFTER */}
              <div style={{
                ...glassCard, padding: 20,
                borderLeft: `3px solid ${C.wasabiGreen}`,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.wasabiGreen, fontWeight: 700, marginBottom: 8 }}>
                  WITH WDF
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.wasabiGreen, marginBottom: 12 }}>
                  {activeUseCase.after.headline}
                </div>
                {activeUseCase.after.points.map((p, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, fontSize: 13, color: C.gray200, lineHeight: 1.5 }}>
                    <span style={{ color: C.wasabiGreen, flexShrink: 0, marginTop: 1 }}>{Icons.check}</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* METRICS */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
              {activeUseCase.metrics.map((m, i) => (
                <div key={i} style={{
                  ...glassCard, padding: "14px 18px", flex: "1 1 180px",
                }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: activeUseCase.color, marginBottom: 4 }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: 11, color: C.gray400, marginBottom: 8, lineHeight: 1.3 }}>{m.label}</div>
                  <Badge type={m.badge} small />
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, color: C.gray600, fontStyle: "italic" }}>
              Target outcomes based on ServiceNow internal benchmarks and expert guidance. Actual results vary by environment.
            </div>
          </div>
        </div>
      )}

      {/* ─── SECTION 3: DISCOVERY NAVIGATOR ─── */}
      {activeSection === "discovery" && (
        <div style={{ padding: "32px 24px", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ color: C.wasabiGreen, marginBottom: 8 }}>{Icons.nav}</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Discovery Navigator</h2>
            <p style={{ color: C.gray400, fontSize: 13 }}>
              Answer 7 questions to identify your highest-priority WDF opportunities
            </p>
          </div>

          {!showResults ? (
            <>
              {/* PROGRESS */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", fontSize: 11,
                  color: C.gray400, marginBottom: 8,
                }}>
                  <span>Question {discoveryStep + 1} of {discoveryQuestions.length}</span>
                  <span>{Math.round(((discoveryStep) / discoveryQuestions.length) * 100)}% complete</span>
                </div>
                <div style={{
                  height: 4, borderRadius: 2, background: "rgba(255,255,255,0.08)",
                }}>
                  <div style={{
                    height: "100%", borderRadius: 2, background: C.wasabiGreen,
                    width: `${(discoveryStep / discoveryQuestions.length) * 100}%`,
                    transition: "width 0.4s ease",
                  }} />
                </div>
              </div>

              {/* QUESTION */}
              <div style={{ ...glassCard, padding: 28 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, lineHeight: 1.5 }}>
                  {discoveryQuestions[discoveryStep].question}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {discoveryQuestions[discoveryStep].options.map((opt, i) => {
                    const isSelected = answers[discoveryQuestions[discoveryStep].id] === opt;
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(discoveryQuestions[discoveryStep].id, opt)}
                        style={{
                          padding: "14px 18px", borderRadius: 12, cursor: "pointer",
                          border: isSelected ? `1.5px solid ${C.wasabiGreen}` : "1px solid rgba(255,255,255,0.1)",
                          background: isSelected ? `${C.wasabiGreen}15` : "rgba(255,255,255,0.03)",
                          color: C.white, fontSize: 14, textAlign: "left",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: "50%",
                            border: isSelected ? `2px solid ${C.wasabiGreen}` : "2px solid rgba(255,255,255,0.2)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                          }}>
                            {isSelected && <div style={{
                              width: 10, height: 10, borderRadius: "50%", background: C.wasabiGreen,
                            }} />}
                          </div>
                          {opt.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BACK BUTTON */}
              {discoveryStep > 0 && (
                <button onClick={() => setDiscoveryStep(discoveryStep - 1)} style={{
                  marginTop: 16, padding: "10px 20px", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.1)", background: "transparent",
                  color: C.gray200, cursor: "pointer", fontSize: 13,
                }}>
                  ← Previous
                </button>
              )}
            </>
          ) : (
            /* ─── RESULTS ─── */
            <div>
              <div style={{ ...glassCard, padding: 24, marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                  Your WDF Opportunity Map
                </div>
                <p style={{ color: C.gray400, fontSize: 13, marginBottom: 0 }}>
                  Ranked by alignment with your responses — highest priority first
                </p>
              </div>

              {computeScores().map((uc, i) => (
                <div key={uc.id} style={{
                  ...glassCard, padding: 20, marginBottom: 12,
                  borderLeft: `3px solid ${uc.color}`,
                  opacity: uc.score === 0 ? 0.4 : 1,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, display: "flex",
                        alignItems: "center", justifyContent: "center",
                        background: `${uc.color}15`, color: uc.color, fontSize: 14, fontWeight: 800,
                      }}>
                        #{i + 1}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700 }}>{uc.title}</div>
                        <div style={{ fontSize: 11, color: C.gray400 }}>{uc.subtitle}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: uc.color }}>{uc.pct}%</div>
                      <div style={{ fontSize: 10, color: C.gray400 }}>Match</div>
                    </div>
                  </div>

                  {/* SCORE BAR */}
                  <div style={{
                    height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", marginBottom: 12,
                  }}>
                    <div style={{
                      height: "100%", borderRadius: 3, background: uc.color,
                      width: `${uc.pct}%`, transition: "width 0.6s ease",
                    }} />
                  </div>

                  {/* COMPONENTS */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {uc.components.map(c => (
                      <span key={c} style={{
                        fontSize: 10, padding: "2px 8px", borderRadius: 6,
                        background: "rgba(255,255,255,0.06)", color: C.gray200,
                      }}>{c}</span>
                    ))}
                  </div>

                  {/* TOP METRIC */}
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {uc.metrics.slice(0, 2).map((m, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Badge type={m.badge} small />
                        <span style={{ fontSize: 12, color: C.gray200 }}>
                          <strong style={{ color: uc.color }}>{m.value}</strong> {m.label.split("(")[0].trim()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* OPEN USE CASE */}
                  <button
                    onClick={() => { setActiveUseCase(uc); }}
                    style={{
                      marginTop: 12, padding: "8px 16px", borderRadius: 8,
                      border: `1px solid ${uc.color}40`, background: `${uc.color}10`,
                      color: uc.color, cursor: "pointer", fontSize: 12, fontWeight: 600,
                    }}
                  >
                    View Full Before → After
                  </button>
                </div>
              ))}

              <div style={{
                fontSize: 11, color: C.gray600, fontStyle: "italic",
                textAlign: "center", marginTop: 16, marginBottom: 12,
              }}>
                Value projections based on ServiceNow benchmarks. An evaluation of Workflow Data Fabric in your environment will quantify actual impact.
              </div>

              <div style={{ textAlign: "center", marginTop: 16 }}>
                <button onClick={resetDiscovery} style={{
                  padding: "12px 24px", borderRadius: 10,
                  border: "none", background: C.wasabiGreen, color: C.navyDark,
                  cursor: "pointer", fontSize: 14, fontWeight: 700,
                }}>
                  Retake Assessment
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: "24px 24px 32px", textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        marginTop: 40,
      }}>
        <div style={{ fontSize: 11, color: C.gray600, maxWidth: 700, margin: "0 auto", lineHeight: 1.6 }}>
          <strong style={{ color: C.gray400 }}>Safe Harbor Statement:</strong> This presentation contains forward-looking statements about ServiceNow products and services.
          These statements involve risks and uncertainties that could cause actual results to differ materially. Forward-looking statements
          are based on current expectations and assumptions. ServiceNow disclaims any obligation to update these statements. Not all features
          or capabilities described may be currently available. Purchase decisions should be made based on currently available features.
        </div>
        <div style={{ fontSize: 10, color: C.gray600, marginTop: 12 }}>
          © {new Date().getFullYear()} ServiceNow, Inc. All rights reserved. ServiceNow and the ServiceNow logo are trademarks of ServiceNow, Inc.
        </div>
      </footer>

      {/* ─── GLOBAL ANIMATION STYLE ─── */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        button:hover { filter: brightness(1.05); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
