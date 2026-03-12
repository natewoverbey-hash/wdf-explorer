# Workflow Data Fabric Healthcare Explorer

Interactive exploration tool for ServiceNow Workflow Data Fabric capabilities, tailored for Healthcare Life Sciences Provider conversations.

## What's Inside

| Section | Description |
|---------|-------------|
| **The Data Fabric** | Seven WDF components with clickable detail cards, verified metrics, and capability breakdowns |
| **Healthcare Use Cases** | Five healthcare scenarios with before/after comparisons and quantified value drivers |
| **Discovery Navigator** | Seven guided questions that score and surface the most relevant WDF opportunities |

## Metric Defensibility

All metrics use a badge system to ensure defensibility:
- **Verified Benchmark** (green solid) — From published product documentation or confirmed tests
- **Target Outcome** (amber outline) — From ServiceNow internal benchmarks — framed as targets
- **Customer Proof Point** (green outline) — From named customer stories with published results
- **Strategic** (purple outline) — Forward-looking positioning (AI readiness, agentic workflows)

## Deploy via GitHub Web UI → Vercel

### Step 1: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it `wdf-healthcare-explorer` (or similar)
3. Set to **Public** or **Private**
4. Click **Create repository**

### Step 2: Upload Files via GitHub Web UI
1. On your new repo page, click **"uploading an existing file"** link (or drag-and-drop)
2. Upload ALL files from this project, maintaining this exact structure:

```
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── (empty, but include folder)
└── src/
    ├── main.jsx
    ├── App.jsx
    └── WdfExplorer.jsx
```

**Important:** Upload the `src/` folder contents by navigating into `src/` in GitHub first, then uploading those 3 files. Same for `public/`.

3. Commit the upload

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..." → Project**
3. Import your `wdf-healthcare-explorer` repository
4. Vercel auto-detects Vite — default settings are correct:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**
6. In ~60 seconds you'll have a live URL like `wdf-healthcare-explorer.vercel.app`

### Step 4: Share
- Send the Vercel URL directly to customers or SCs
- Works on desktop and mobile
- No login required

## Usage Modes

1. **Seller-Led Meeting** — Walk customer through The Data Fabric → relevant Use Case → Discovery
2. **Self-Service Link** — Send URL for independent exploration
3. **SC/Seller Enablement** — Use internally to learn WDF components and healthcare positioning

## Sources & Attribution

- WDF Solution Brief (SSC, Mar 2026)
- WDF Use Cases Deck (SSC, Feb 2026)
- WDF + data.world Solution Brief (SSC, Oct 2025)
- WDF Customer Stories (SSC, Nov 2025)
- ServiceNow Corporate Narrative (2026)
- Customer Proof Points: Elara Caring (Healthcare), DXC Technology, USI Insurance, Georgian College

## Brand Standards

- **Infinite Blue:** #032D42
- **Wasabi Green:** #63DF4E
- **Typography:** System fonts (Segoe UI / SF Pro Display fallback)
- **Glass container styling** on dark gradient backgrounds
