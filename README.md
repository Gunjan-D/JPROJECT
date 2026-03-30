# Workday Project Coordination Hub

A full-featured **Project Management Dashboard** built to coordinate a real-world Workday ERP implementation for a higher education institution designed as a portfolio demonstration.

**Website Live:** https://gunjan-d.github.io/JPROJECT/

---

## What This Project Demonstrates

Every feature maps directly to a responsibility in the job description:

| Job Requirement | Feature in This App |
|---|---|
| Track project milestones & deliverables | **Milestones Tracker** — phase-grouped timeline with progress bars |
| Maintain RAID logs (Risks, Assumptions, Issues, Dependencies) | **RAID Log** — full CRUD with filters and modals |
| Coordinate meetings & minutes | **Meetings Manager** — scheduling, agenda, minutes, action items |
| Support SIT/UAT testing cycles | **Testing Hub** — test case tracker with defect linking |
| Generate project status reports | **Auto Status Report** — printable RAG report with KPIs |
| Dashboard overview | **Dashboard** — live KPIs, Recharts, upcoming milestones |

---

## Project Scenario

**Client:** State University System  
**Program:** Workday HCM + Student — Go-Live July 1, 2026  
**Current Phase:** SIT (System Integration Testing) — Cycle 1  
**Modules:** Core HR, Payroll, Benefits, Recruiting, Student Admissions, Student Records, Financial Aid, Financials

---

## Running the App

### Prerequisites
- Node.js 18+ installed

### Steps
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to:
# http://localhost:5173
```

---

## Application Pages

### 1. Dashboard
- **KPI Cards**: Milestones completed, open risks/issues, SIT pass rate, days to go-live
- **Area Chart**: Project milestone progress over time (Sep 2025 → present)
- **Pie Chart**: Open RAID items breakdown (risks, issues, assumptions, dependencies)
- **Bar Chart**: SIT test coverage by module (HCM, Student, Financials, Integration)
- **Live Tables**: Open issues + upcoming meetings

### 2. RAID Log *(Full CRUD)*
- **Tabs**: Risks · Assumptions · Issues · Dependencies
- **Add / Edit / Delete** any item via modal forms
- **Filter** by status and workstream; **search** by title or description
- Realistic data: 7 risks, 8 issues, 5 assumptions, 5 dependencies

### 3. Milestones Tracker
- **Phase progress bars** for all 7 phases: Initiation → Design → Build → Data → Testing → UAT → Go-Live
- **Timeline view** grouped by phase with visual indicators (green/blue/orange/gray dots)
- **Filter** by phase and status
- 15 realistic milestones across the full project lifecycle

### 4. Testing Hub *(SIT / UAT)*
- **Summary stats**: Total, Pass, Fail, In Progress, pass rate percentage
- **Module bar chart**: Coverage across HCM, Student, Financials, Integration
- **Defect linking**: Test cases with linked defect ticket references highlighted
- **Module tabs + status filter + search** for 37 test cases
- UAT tab shows a "not yet started" state (planned May 1 kickoff)

### 5. Meetings Manager
- **Upcoming / Past meeting tabs**
- **Expandable cards** showing attendees, agenda, meeting minutes, and action items
- **Open action items banner** — surfaces outstanding follow-ups at the top
- **Add Meeting modal** with full form (title, type, date, attendees, agenda)

### 6. Status Report *(Print-Ready)*
- Auto-generated **formal project status report** in document layout
- Dark gradient header with overall RAG status
- **Executive Summary**, **KPI table**, **Workstream Status table** (with RAG per workstream)
- Accomplishments, Top Risks/Issues, 2-week action plan, open meeting actions
- **Print / Export PDF** button using `window.print()` — styles hide UI chrome

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Charts | Recharts 2 |
| Icons | Lucide React |
| Routing | React Router DOM 6 |

---

## Project Structure

```
src/
├── data/
│   └── mockData.js          # All project data (milestones, RAID, tests, meetings)
├── components/
│   ├── Layout.jsx            # Sidebar + top nav shell
│   ├── Badge.jsx             # Reusable status/priority badges
│   └── Modal.jsx             # Accessible modal dialog
└── pages/
    ├── Dashboard.jsx         # Main overview with charts
    ├── RAIDLog.jsx           # RAID log with full CRUD
    ├── Milestones.jsx        # Project milestone timeline
    ├── TestingHub.jsx        # SIT/UAT test tracker
    ├── Meetings.jsx          # Meeting coordinator
    └── StatusReport.jsx      # Printable status report
```

---

##  About

This project is a self-initiated simulation designed to demonstrate familiarity with Workday implementation lifecycles and higher education project coordination workflows. All data, scenarios, and workflows used are hypothetical and do not involve any real organizational data, systems, or confidential information.
This project demonstrates hands-on familiarity with Workday implementation lifecycle, higher education project coordination workflows, and the tooling (RAID logs, status reporting, testing coordination).
/////////////////////////////////////////////////////////////////////
