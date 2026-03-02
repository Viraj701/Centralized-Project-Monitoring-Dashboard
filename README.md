# Centralized Project Monitoring Dashboard

A comprehensive, real-time project tracking and monitoring solution for the **2x660 MW Supercritical Thermal Power Plant** project in Nagpur, Maharashtra.

## 📋 Project Overview

This repository contains:
- **3-Level Schedule Hierarchy** (L1, L2, L3) with 547+ activities
- **Interactive Progress Tracking Dashboard** with team authentication
- **Real-time Gantt Charts** and performance visualizations
- **Complete Deployment Guides** and documentation

**Project Details:**
- **Type:** Greenfield Supercritical Coal Thermal Power Plant
- **Capacity:** 2 × 660 MW = 1,320 MW Total
- **Location:** Nagpur, Maharashtra, India
- **Contractor:** BHEL (Bharat Heavy Electricals Limited)
- **Duration:** 44 Months
- **Budget:** ₹1,235 Crores
- **Unit-1 COD Target:** Month 37
- **Unit-2 COD Target:** Month 41

---

## 📂 Repository Structure

```
centralized-project-monitoring-dashboard/
│
├── schedules/
│   ├── L1_SCHEDULE_2x660MW_THERMAL_PLANT.txt
│   │   └── Executive-level master schedule (50 major phases)
│   │
│   ├── L2_DETAILED_SCHEDULE.txt
│   │   └── Detailed schedule (195 sub-activities, 2-4 weeks each)
│   │
│   └── L3_DETAILED_SCHEDULE.txt
│       └── Granular schedule (547 daily work packages, 1-20 days each)
│
├── dashboard/
│   ├── progress_dashboard.jsx
│   │   └── Main React dashboard component with authentication
│   │
│   ├── L1_GanttChart_Interactive.jsx
│   │   └── Interactive Gantt chart visualization
│   │
│   ├── package.json
│   │   └── Node.js dependencies configuration
│   │
│   └── .env.example
│       └── Environment variables template
│
├── docs/
│   ├── DASHBOARD_DEPLOYMENT_GUIDE.txt
│   │   └── Step-by-step deployment instructions (4 methods)
│   │
│   ├── DASHBOARD_QUICK_START.txt
│   │   └── User guide and feature overview
│   │
│   ├── COMPLETE_PROJECT_DELIVERY_SUMMARY.txt
│   │   └── What's included and next steps
│   │
│   └── 00_START_HERE.txt
│       └── Project overview and getting started guide
│
├── .gitignore
│   └── Git ignore rules (node_modules, .env, etc.)
│
├── README.md
│   └── This file - project documentation
│
└── LICENSE
    └── Project license (MIT recommended)
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16+ and npm installed
- GitHub account
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/centralized-project-monitoring-dashboard.git
cd centralized-project-monitoring-dashboard/dashboard
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run Locally

```bash
npm run dev
```

Access at: `http://localhost:5173`

### Step 4: Deploy to Vercel (Production)

```bash
npm install -g vercel
vercel
```

Get your public URL: `https://your-dashboard.vercel.app`

---

## 📊 Dashboard Features

### Overview Tab
- **Overall Project Progress** - Visual gauge showing % completion
- **Budget Status** - Spending vs. budget comparison
- **Team Size** - Active resources tracking
- **Project Duration** - Current/Total months
- **Phase Progress Chart** - Planned vs. actual durations
- **Budget Analysis** - Cost tracking by phase
- **Completion Pie Chart** - Phase-by-phase breakdown

### Daily Tracking Tab
- **Activity Logging Form** - Log daily work with details
- **Recent Activities List** - Last 7 days of work
- **Progress Tracking** - % completion per activity
- **Time Tracking** - Planned vs. actual hours
- **Status Indicators** - Completed/In Progress/Pending

### Phase Details Tab
- **All 8 Project Phases** displayed with metrics
- **Status Tracking** - Current phase status
- **Resource Allocation** - People assigned
- **Budget Tracking** - Spent vs. allocated
- **Visual Progress Bars** - Completion percentage

### Milestones Tab
- **Critical Project Milestones** table
- **Planned vs. Actual Dates** tracking
- **Unit-1 COD Target** - Month 37
- **Unit-2 COD Target** - Month 41
- **Status Indicators** - On track/Behind/Completed

---

## 🔐 Authentication

### Demo Credentials (For Testing)

```
Team Lead / Project Manager
├─ Email: team@project.com
├─ Password: Project@2024
└─ Access: Full dashboard access

Site Engineer
├─ Email: engineer@project.com
├─ Password: Engineer@2024
└─ Access: View + Log activities

Contractor (e.g., BHEL)
├─ Email: contractor@project.com
├─ Password: Contractor@2024
└─ Access: View + Log own activities
```

### Production Setup

For production, implement one of:
- **Firebase Authentication** (Recommended)
- **Auth0** (Enterprise)
- **JWT with Node.js Backend**

See `docs/DASHBOARD_DEPLOYMENT_GUIDE.txt` for detailed instructions.

---

## 📅 Schedule Overview

### Project Timeline: 44 Months

| Phase | Duration | Timeline | Status |
|-------|----------|----------|--------|
| Initiation | 2M | 0-2 | Entry |
| Design Engineering | 18M | 0-18 | Major Gate |
| Equipment Procurement | 24M | 0-24 | Long-lead |
| Civil Works | 22M | 2-24 | Infrastructure |
| Boiler Erection (U1) | 14M | 10-24 | Assembly |
| Turbine Erection (U1) | 10M | 18-28 | Assembly |
| Commissioning (U1) | 6M | 28-34 | Operations |
| **Performance Test (U1)** | **3M** | **34-37** | **→ Unit-1 COD ✅** |
| Commissioning (U2) | 6M | 32-38 | Operations |
| **Performance Test (U2)** | **3M** | **38-41** | **→ Unit-2 COD ✅** |

### Critical Milestones

- **Month 18:** Design Engineering Complete
- **Month 24:** Equipment Delivery & Civil Works Complete
- **Month 28:** Unit-1 Boiler & Turbine Erection Complete
- **Month 34:** Unit-1 Grid Synchronization
- **Month 37:** ✅ **UNIT-1 COD (Commercial Operation Date)**
- **Month 38:** Unit-2 Grid Synchronization
- **Month 41:** ✅ **UNIT-2 COD (Commercial Operation Date)**

---

## 💾 Deployment Options

### Option 1: Vercel (Recommended) - FREE
```bash
npm install -g vercel
vercel
```
- ✅ Fastest deployment (5 minutes)
- ✅ Free tier includes 100GB
- ✅ Auto-deploys on git push
- ✅ Custom domain support

### Option 2: Netlify - FREE
```bash
npm install -g netlify-cli
netlify deploy
```
- ✅ Simple one-click deployment
- ✅ Continuous deployment from Git
- ✅ Free tier generous

### Option 3: GitHub Pages - FREE
```bash
npm run build
npm install -g gh-pages
npm run deploy
```
- ✅ No server needed
- ✅ Version control integrated

### Option 4: Railway.app - FREE Tier
- Simple deployment interface
- Supports backend & database (future)
- Free tier: 5GB disk, $5 credits/month

**👉 Recommendation:** Use **Vercel** for best experience

---

## 📈 Data Management

### Option 1: Browser Storage (Current)
- Data saved in browser localStorage
- Persists across sessions on same device
- Not shared between devices

### Option 2: Google Sheets Integration (Recommended for Teams)
```javascript
// Update progress_dashboard.jsx with:
const sheetId = "YOUR_GOOGLE_SHEET_ID";
const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

fetch(url)
  .then(res => res.text())
  .then(data => {
    // Parse CSV and update dashboard
  });
```

### Option 3: Firebase Realtime Database (Advanced)
- Real-time sync across team
- Automatic backup
- Mobile offline access
- Free Spark plan available

### Option 4: REST API Integration (Production)
- Connect to backend database
- Comprehensive data management
- Advanced analytics

See `docs/DASHBOARD_DEPLOYMENT_GUIDE.txt` for detailed setup.

---

## 📊 Data Structure

### Daily Activity Format
```json
{
  "id": 1,
  "date": "2026-03-03",
  "phase": "Design Engineering",
  "activity": "Boiler Furnace Design - Heat Balance",
  "plannedHours": 8,
  "actualHours": 7.5,
  "progress": 85,
  "assignee": "Raj Kumar (Senior Engineer)",
  "status": "In Progress",
  "notes": "Heat balance 85% complete. FEA analysis next."
}
```

### Phase Progress Format
```json
{
  "id": 2,
  "name": "Detailed Design Engineering",
  "plannedDuration": 18,
  "actualDuration": 5,
  "status": "In Progress",
  "completion": 28,
  "resources": 32,
  "budget": 45000000,
  "spent": 12600000
}
```

---

## 🛠 Technology Stack

### Frontend
- **React 18** - UI component library
- **Recharts** - Chart library (bar, pie, line charts)
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling (via CDN)

### Deployment
- **Vercel** - Hosting platform
- **GitHub** - Version control
- **Node.js** - Runtime environment

### Optional (For Production)
- **Firebase** - Authentication & Database
- **Google Sheets API** - Data integration
- **Slack API** - Notifications
- **PDF.js** - PDF generation

---

## 📋 Usage Guide

### For Project Manager
1. **Daily:** Log activities in "Daily Tracking" tab
2. **Weekly:** Review "Overview" tab for KPIs
3. **Monthly:** Generate reports from "Phase Details" tab
4. **Critical:** Monitor milestones in "Milestones" tab

### For Site Engineer
1. **Daily:** Log work activities with hours & progress
2. **Weekly:** Review phase progress
3. **Issues:** Add notes for blockers

### For Contractor
1. **Daily:** Update own activities
2. **Weekly:** Track deliverable progress
3. **Monthly:** Prepare performance reports

### For Executives
1. **Monthly:** Review "Overview" dashboard
2. **Gate Reviews:** Check "Milestones" tab
3. **Reporting:** Export charts for presentations

---

## 🔄 Workflow

### Daily Process (5 minutes)
```
1. Team member logs in
2. Clicks "Daily Tracking" tab
3. Fills activity form:
   - Activity name
   - Phase selection
   - Planned hours
   - Actual hours
   - Progress %
   - Notes
4. Clicks "Log Activity"
5. Activity appears in recent list (instant!)
6. Charts auto-update
```

### Weekly Review (30 minutes)
```
1. Project Manager opens "Overview" tab
2. Reviews KPI cards
3. Analyzes charts:
   - Phase Progress
   - Budget Status
   - Team Utilization
4. Discusses with team
5. Documents decisions
```

### Monthly Report (1 hour)
```
1. Pull data from dashboard
2. Take screenshots of charts
3. Create presentation:
   - Overall progress
   - Budget variance
   - Schedule variance
   - Risk status
4. Present to stakeholders
5. Archive for records
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env.local` file:

```env
# Dashboard Configuration
VITE_APP_TITLE="Centralized Project Monitoring Dashboard"
VITE_APP_SUBTITLE="2x660 MW Thermal Power Plant"

# Optional: Firebase (for production)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional: Google Sheets Integration
VITE_GOOGLE_SHEET_ID=your_sheet_id
VITE_GOOGLE_API_KEY=your_api_key

# Optional: Slack Integration
VITE_SLACK_WEBHOOK_URL=your_webhook_url
```

### Add Team Members (in progress_dashboard.jsx)

```javascript
const TEAM_CREDENTIALS = {
  'team@project.com': { password: 'Project@2024', role: 'Team Lead' },
  'engineer@project.com': { password: 'Engineer@2024', role: 'Site Engineer' },
  'contractor@project.com': { password: 'Contractor@2024', role: 'Contractor' },
  // Add more users here
  'newuser@project.com': { password: 'NewPassword@2024', role: 'Engineer' },
};
```

---

## 📚 Documentation Files

### schedules/
- **L1_SCHEDULE_2x660MW_THERMAL_PLANT.txt** - Executive summary (50 phases)
- **L2_DETAILED_SCHEDULE.txt** - Project team level (195 activities)
- **L3_DETAILED_SCHEDULE.txt** - Daily operations (547 work packages)

### docs/
- **00_START_HERE.txt** - Quick overview of entire project
- **DASHBOARD_DEPLOYMENT_GUIDE.txt** - Complete deployment instructions
- **DASHBOARD_QUICK_START.txt** - User guide and feature walkthrough
- **COMPLETE_PROJECT_DELIVERY_SUMMARY.txt** - Full project summary

---

## 🚨 Critical Path Activities

The schedule is tight with ZERO FLOAT on critical path:

1. **Design Engineering** (0-18M) → Sets procurement specs
2. **Equipment Procurement** (0-24M) → Long-lead items critical
3. **Civil Works** (2-24M) → Foundation for erection
4. **Boiler Erection** (10-24M) → Sequential assembly
5. **Turbine Erection** (18-28M) → Parallel with boiler
6. **Commissioning** (28-41M) → Sequential per unit
7. **Performance Testing** (34-41M) → Final COD approval

**Any delay cascades to Unit-1 COD (Month 37) and Unit-2 COD (Month 41)**

---

## 📊 Key Performance Indicators (KPIs)

### Schedule Metrics
- Overall Project Progress: Target 100% at Month 41
- Schedule Performance Index (SPI): Target ≥ 0.95
- Milestone Achievement Rate: Target 100%

### Budget Metrics
- Budget Spent: ₹1,235 Cr total
- Cost Performance Index (CPI): Target ≥ 0.95
- Budget Variance: Target <5%

### Quality Metrics
- FAT Success Rate: Target 100%
- Defect Rate: Target <1 per 1,000 items
- Rework Cost: Target <2% of phase budget

### Resource Metrics
- Peak Team Size: 60+ people (Months 12-20)
- Utilization Rate: Target >85%
- Training Completion: Target 100% before commissioning

---

## 🔒 Security Features

✅ **Authentication:** Password-protected login
✅ **Authorization:** Role-based access control
✅ **HTTPS:** Encrypted data in transit
✅ **Privacy:** Team-only access (no public data)
✅ **Backup:** Data persistence with localStorage
✅ **Audit Trail:** Activity logging (future enhancement)

### Security Best Practices

1. **Change default passwords** immediately
2. **Use HTTPS only** (Vercel provides auto-HTTPS)
3. **Enable two-factor authentication** on GitHub
4. **Rotate credentials** monthly
5. **Restrict access** to team members only
6. **Regular backups** to Google Drive/cloud storage
7. **Monitor access logs** for unauthorized attempts

---

## 🐛 Troubleshooting

### Dashboard Not Loading
```
1. Check internet connection
2. Clear browser cache (Ctrl+Shift+Del)
3. Try different browser
4. Check Vercel deployment status
```

### Login Fails
```
1. Verify email/password correct
2. Check caps lock
3. Try resetting credentials in code
4. Verify environment variables set
```

### Data Not Saving
```
1. Check if localStorage enabled
2. Clear cache & cookies
3. Try incognito window
4. Check browser console for errors (F12)
```

### Mobile View Broken
```
1. Check Vercel build logs
2. Test on different phone
3. Clear phone cache
4. Try WiFi instead of mobile data
```

---

## 🚀 Future Enhancements

### Phase 2 (Month 2)
- Photo uploads (progress documentation)
- File attachments (reports, designs)
- Email notifications (daily summaries)
- PDF export (project reports)
- Google Sheets sync (real-time updates)

### Phase 3 (Month 3)
- Comments & collaboration (team discussion)
- Slack integration (status alerts)
- Risk tracking (risk register)
- Resource Gantt chart (resource planning)
- Budget forecasting (trend analysis)

### Phase 4 (Month 6)
- Mobile app (native iOS/Android)
- Offline mode (work without internet)
- Advanced analytics (predictions)
- Audit trail (complete history)
- API documentation (third-party integration)

---

## 📞 Support & Contact

### Documentation
- 📖 See `docs/` folder for detailed guides
- 📋 Check `schedules/` for project timelines
- 💻 Review dashboard code for technical details

### GitHub Issues
- 🐛 Report bugs on GitHub Issues
- ✨ Request features with detailed descriptions
- 💬 Discuss improvements in Discussions

### Email Support
- For technical questions: `support@project.com`
- For schedule inquiries: `pm@project.com`
- For deployment help: `devops@project.com`

### Team Slack Channel
- #project-dashboard (daily updates)
- #project-schedule (timeline discussions)
- #project-commissioning (commissioning topics)

---

## 📜 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🎯 Project Statistics

| Metric | Value |
|--------|-------|
| Total Duration | 44 Months |
| Total Budget | ₹1,235 Crores |
| Peak Team Size | 60+ people |
| Total Activities (L3) | 547 |
| Detailed Activities (L2) | 195 |
| Major Phases (L1) | 50 |
| Unit Capacity | 2 × 660 MW |
| Total Capacity | 1,320 MW |
| Critical Path Float | 0 days |
| Unit-1 COD Target | Month 37 |
| Unit-2 COD Target | Month 41 |

---

## ✅ Project Success Criteria

**Schedule:** Both units reach COD on time  
**Budget:** Final cost ≤ ₹1,235 Cr (±10% contingency)  
**Quality:** Zero critical defects, 100% FAT success  
**Safety:** Zero lost-time accidents, LTIFR < 0.5  
**Team:** >90% dashboard adoption, >85% stakeholder satisfaction  

---

## 🙏 Acknowledgments

- **BHEL** - Main contractor & technology partner
- **Project Team** - Dedicated professionals
- **Stakeholders** - Continuous support & guidance
- **Open Source Community** - React, Recharts, Lucide

---

## 📝 Last Updated

- **Date:** March 2026
- **Version:** 1.0
- **Status:** Production Ready

---

## 🚀 Let's Get Started!

1. **Clone:** `git clone https://github.com/YOUR-USERNAME/centralized-project-monitoring-dashboard.git`
2. **Install:** `npm install`
3. **Run:** `npm run dev`
4. **Deploy:** Follow `docs/DASHBOARD_DEPLOYMENT_GUIDE.txt`
5. **Share:** Send dashboard URL to your team

**Happy Project Management! 🎉**

---

**For detailed setup instructions, see `docs/DASHBOARD_DEPLOYMENT_GUIDE.txt`**

**For feature overview, see `docs/DASHBOARD_QUICK_START.txt`**

**For project overview, see `docs/00_START_HERE.txt`**
