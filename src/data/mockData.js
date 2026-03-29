// ============================================================
// All application data — simulates a live Workday HCM + Student
// implementation project at a higher education institution.
// ============================================================

export const PROJECT_INFO = {
  name: 'Workday ERP Implementation',
  client: 'State University System',
  program: 'Workday Student & HCM — Go-Live 2026',
  phase: 'SIT — System Integration Testing',
  startDate: '2025-09-01',
  goLiveDate: '2026-07-01',
  pm: 'GD Project Coordinator',
  sponsor: 'Dr. Richard Hayes, VP Finance & Operations',
  modules: ['HCM Core', 'Payroll', 'Benefits', 'Recruiting', 'Student Admissions', 'Student Records', 'Financial Aid'],
  overallStatus: 'AMBER',
  completionPct: 62,
  teamSize: 24,
};

// ─── MILESTONES ──────────────────────────────────────────────
export const MILESTONES = [
  { id: 'M001', name: 'Project Kickoff & Charter Sign-off', phase: 'Initiation', workstream: 'All', dueDate: '2025-09-15', completedDate: '2025-09-14', status: 'Completed', owner: 'GD Project Coordinator', notes: 'Charter signed by all executive sponsors.' },
  { id: 'M002', name: 'Business Process Review Complete', phase: 'Design', workstream: 'All', dueDate: '2025-10-31', completedDate: '2025-10-29', status: 'Completed', owner: 'Michael Chen', notes: 'All 47 business processes documented and approved.' },
  { id: 'M003', name: 'Design Decisions & Configurations Finalized', phase: 'Design', workstream: 'All', dueDate: '2025-11-30', completedDate: '2025-11-28', status: 'Completed', owner: 'Michael Chen', notes: '' },
  { id: 'M004', name: 'HCM Core Configuration Complete', phase: 'Build', workstream: 'HCM', dueDate: '2026-01-15', completedDate: '2026-01-17', status: 'Completed', owner: 'Lisa Park', notes: '2 days late due to org structure complexity.' },
  { id: 'M005', name: 'Payroll & Benefits Configuration Complete', phase: 'Build', workstream: 'HCM', dueDate: '2026-01-31', completedDate: '2026-02-03', status: 'Completed', owner: 'Lisa Park', notes: 'Benefits plan setup required additional iteration.' },
  { id: 'M006', name: 'Student Module Configuration Complete', phase: 'Build', workstream: 'Student', dueDate: '2026-02-14', completedDate: null, status: 'Delayed', owner: 'David Torres', notes: 'Financial Aid integration still in progress. Revised target: Apr 5.' },
  { id: 'M007', name: 'Data Migration Mock 1 — Validation Complete', phase: 'Data', workstream: 'All', dueDate: '2026-02-28', completedDate: '2026-02-27', status: 'Completed', owner: 'Jennifer Lee', notes: '95.4% data pass rate achieved in Mock 1.' },
  { id: 'M008', name: 'SIT Cycle 1 — Entry', phase: 'Testing', workstream: 'All', dueDate: '2026-03-01', completedDate: '2026-03-01', status: 'Completed', owner: 'Robert Kim', notes: '' },
  { id: 'M009', name: 'SIT Cycle 1 — Exit', phase: 'Testing', workstream: 'All', dueDate: '2026-03-28', completedDate: null, status: 'In Progress', owner: 'Robert Kim', notes: 'Currently 78% of test cases executed. 1 critical defect open.' },
  { id: 'M010', name: 'SIT Cycle 2 — Complete', phase: 'Testing', workstream: 'All', dueDate: '2026-04-25', completedDate: null, status: 'Not Started', owner: 'Robert Kim', notes: '' },
  { id: 'M011', name: 'UAT Kickoff', phase: 'UAT', workstream: 'All', dueDate: '2026-05-01', completedDate: null, status: 'Not Started', owner: 'GD Project Coordinator', notes: '' },
  { id: 'M012', name: 'UAT Sign-off Complete', phase: 'UAT', workstream: 'All', dueDate: '2026-06-01', completedDate: null, status: 'Not Started', owner: 'Robert Kim', notes: '' },
  { id: 'M013', name: 'Data Migration Mock 3 — Dress Rehearsal', phase: 'Data', workstream: 'All', dueDate: '2026-06-10', completedDate: null, status: 'Not Started', owner: 'Jennifer Lee', notes: '' },
  { id: 'M014', name: 'Go-Live Readiness Assessment', phase: 'Go-Live', workstream: 'All', dueDate: '2026-06-20', completedDate: null, status: 'Not Started', owner: 'GD Project Coordinator', notes: '' },
  { id: 'M015', name: '🚀 Go-Live — Workday Live!', phase: 'Go-Live', workstream: 'All', dueDate: '2026-07-01', completedDate: null, status: 'Not Started', owner: 'GD Project Coordinator', notes: '' },
];

// ─── RISKS ───────────────────────────────────────────────────
export const INITIAL_RISKS = [
  { id: 'R001', title: 'Financial Aid module integration delay', description: 'Complex integration with legacy Banner FA system causing configuration delays. Risk of pushing SIT/UAT schedule.', category: 'Schedule', probability: 'High', impact: 'High', riskScore: 9, status: 'Open', owner: 'David Torres', mitigationPlan: 'Engaged Workday PS FA specialist. Added 2-week buffer to SIT Cycle 1 exit.', raisedDate: '2026-02-10', targetDate: '2026-04-05', workstream: 'Student' },
  { id: 'R002', title: 'Change resistance from Payroll staff', description: 'Payroll team expressed significant resistance to new processes. Risk of low adoption at go-live.', category: 'People', probability: 'Medium', impact: 'High', riskScore: 6, status: 'Open', owner: 'GD Project Coordinator', mitigationPlan: 'Scheduled 3 additional payroll process workshops. Engaging Change Management lead.', raisedDate: '2026-01-20', targetDate: '2026-05-01', workstream: 'HCM' },
  { id: 'R003', title: 'Data quality issues in legacy Banner system', description: 'Initial data extract revealed 12% of employee records with missing or inconsistent data fields.', category: 'Data', probability: 'High', impact: 'Medium', riskScore: 6, status: 'Open', owner: 'Jennifer Lee', mitigationPlan: 'Data cleansing sprint underway. Legacy system data stewards assigned. Target <5% error rate.', raisedDate: '2026-01-28', targetDate: '2026-04-15', workstream: 'All' },
  { id: 'R004', title: 'Key SME unavailability during UAT', description: 'Registrar and Financial Aid SMEs have competing priorities during UAT window (May–June).', category: 'Resource', probability: 'Medium', impact: 'High', riskScore: 6, status: 'Open', owner: 'GD Project Coordinator', mitigationPlan: 'Escalated to Steering Committee. Requesting formal resource commitment letters from department heads.', raisedDate: '2026-02-15', targetDate: '2026-04-01', workstream: 'Student' },
  { id: 'R005', title: 'Workday bi-annual update (WD38) during cutover', description: 'Workday scheduled update WD38 falls near go-live window. Could introduce unexpected changes.', category: 'Technical', probability: 'Low', impact: 'High', riskScore: 3, status: 'Open', owner: 'Robert Kim', mitigationPlan: 'Coordinating with Workday CSM to review WD38 impact. Regression testing plan in progress.', raisedDate: '2026-03-01', targetDate: '2026-06-01', workstream: 'All' },
  { id: 'R006', title: '3rd-party benefits carrier connectivity not tested', description: 'E2E file transmission to BCBS, VSP, and Delta Dental carriers not yet tested in integration environment.', category: 'Technical', probability: 'Medium', impact: 'Medium', riskScore: 4, status: 'Open', owner: 'Lisa Park', mitigationPlan: 'Scheduled carrier integration testing in SIT Cycle 2. Carrier contacts identified.', raisedDate: '2026-02-20', targetDate: '2026-04-20', workstream: 'HCM' },
  { id: 'R007', title: 'Budget overrun due to post-design scope additions', description: 'Two new integration requirements added after design approval may require budget reallocation.', category: 'Budget', probability: 'Medium', impact: 'Medium', riskScore: 4, status: 'Monitoring', owner: 'GD Project Coordinator', mitigationPlan: 'Change request submitted. Awaiting Steering Committee approval. Contingency reserve identified.', raisedDate: '2026-03-05', targetDate: '2026-04-05', workstream: 'All' },
];

// ─── ISSUES ──────────────────────────────────────────────────
export const INITIAL_ISSUES = [
  { id: 'I001', title: 'Payroll retro-pay calculation producing incorrect results', description: 'Retro-pay for employees with mid-period rate changes producing incorrect amounts in SIT.', severity: 'Critical', status: 'In Progress', owner: 'Lisa Park', assignee: 'Workday Support', raisedDate: '2026-03-05', targetDate: '2026-03-31', resolvedDate: null, workstream: 'HCM', ticketRef: 'WD-SUPP-2847', notes: 'Workday support case raised. Hotfix expected by March 30.' },
  { id: 'I002', title: 'Transfer credit records failing import', description: 'Transfer credit hours from legacy system not mapping to Workday academic record structure correctly.', severity: 'High', status: 'In Progress', owner: 'David Torres', assignee: 'David Torres', raisedDate: '2026-03-08', targetDate: '2026-04-05', resolvedDate: null, workstream: 'Student', ticketRef: 'IMP-STU-041', notes: 'Root cause identified — academic unit mapping table needs updating.' },
  { id: 'I003', title: 'SSO authentication failing for student portal users', description: 'Single sign-on with university ADFS failing intermittently for student accounts only.', severity: 'High', status: 'Resolved', owner: 'Robert Kim', assignee: 'IT Security', raisedDate: '2026-03-03', targetDate: '2026-03-15', resolvedDate: '2026-03-14', workstream: 'Technical', ticketRef: 'IMP-TECH-019', notes: 'ADFS claim rules updated. Re-tested across 50 student accounts — resolved.' },
  { id: 'I004', title: 'FA disbursement workflow missing Director approval step', description: 'Financial Aid disbursement business process missing required Director of Financial Aid approval per policy.', severity: 'High', status: 'Open', owner: 'David Torres', assignee: 'David Torres', raisedDate: '2026-03-10', targetDate: '2026-03-28', resolvedDate: null, workstream: 'Student', ticketRef: 'IMP-STU-052', notes: 'BPD configuration change in progress.' },
  { id: 'I005', title: 'Benefits enrollment page broken in Safari v17+', description: 'Open enrollment page fails to render in Safari — form fields overlap, submit button not visible.', severity: 'Medium', status: 'Open', owner: 'Lisa Park', assignee: 'Dev Team', raisedDate: '2026-03-12', targetDate: '2026-04-01', resolvedDate: null, workstream: 'HCM', ticketRef: 'IMP-HCM-078', notes: 'CSS fix in development. Interim workaround: use Chrome or Edge.' },
  { id: 'I006', title: 'Org chart truncates beyond 3 org levels', description: 'Workday org chart view truncates departments with more than 3 reporting levels.', severity: 'Medium', status: 'Open', owner: 'Lisa Park', assignee: 'Lisa Park', raisedDate: '2026-03-15', targetDate: '2026-04-10', resolvedDate: null, workstream: 'HCM', ticketRef: 'IMP-HCM-083', notes: 'Investigating tenant configuration settings with Workday PS.' },
  { id: 'I007', title: 'Budget check report showing stale data (24hr lag)', description: 'Budget check report showing prior-day data. Cache refresh interval too long.', severity: 'Low', status: 'Resolved', owner: 'Amy Wilson', assignee: 'Amy Wilson', raisedDate: '2026-03-06', targetDate: '2026-03-20', resolvedDate: '2026-03-19', workstream: 'Financials', ticketRef: 'IMP-FIN-022', notes: 'Report cache interval reduced from 24h to 15min.' },
  { id: 'I008', title: 'New hire checklist missing IT access request task', description: 'New hire onboarding business process does not include IT system access request task per HR policy.', severity: 'Medium', status: 'Resolved', owner: 'Lisa Park', assignee: 'Lisa Park', raisedDate: '2026-03-01', targetDate: '2026-03-10', resolvedDate: '2026-03-09', workstream: 'HCM', ticketRef: 'IMP-HCM-061', notes: 'Onboarding checklist updated and reviewed by HR SME.' },
];

// ─── ASSUMPTIONS ─────────────────────────────────────────────
export const INITIAL_ASSUMPTIONS = [
  { id: 'A001', title: 'Banner system available for scheduled data extractions', description: 'Banner system will be available every Sunday 2–6 AM for data extraction throughout project duration.', status: 'Valid', owner: 'Jennifer Lee', raisedDate: '2025-09-15', reviewDate: '2026-04-01', workstream: 'Data', impact: 'If invalid: data migration timeline must be revised.' },
  { id: 'A002', title: 'Business SMEs available 50% time during UAT', description: 'Business subject matter experts from each functional area will be available 50% time during UAT phase.', status: 'At Risk', owner: 'GD Project Coordinator', raisedDate: '2025-09-15', reviewDate: '2026-03-28', workstream: 'All', impact: 'If invalid: UAT timeline extends by 3–4 weeks.' },
  { id: 'A003', title: 'No major changes to Workday Student FA module pre go-live', description: 'No major Workday updates requiring re-configuration of Student FA module before go-live.', status: 'Valid', owner: 'David Torres', raisedDate: '2025-10-01', reviewDate: '2026-05-01', workstream: 'Student', impact: 'If invalid: 4–6 weeks re-configuration effort.' },
  { id: 'A004', title: 'Network infrastructure upgrade complete before go-live', description: 'IT committed to completing 10Gb fiber network upgrade before go-live date.', status: 'Valid', owner: 'Robert Kim', raisedDate: '2025-10-15', reviewDate: '2026-06-01', workstream: 'Technical', impact: 'If invalid: performance degradation risk at go-live.' },
  { id: 'A005', title: 'University fiscal year start aligns with go-live (July 1)', description: 'Workday go-live July 1 aligns with fiscal year start, minimizing parallel-run complexity.', status: 'Valid', owner: 'Amy Wilson', raisedDate: '2025-09-30', reviewDate: '2026-06-15', workstream: 'Financials', impact: 'If invalid: go-live must be pushed to August 1.' },
];

// ─── DEPENDENCIES ────────────────────────────────────────────
export const INITIAL_DEPENDENCIES = [
  { id: 'D001', title: 'Campus network infrastructure upgrade (IT)', description: 'IT must complete 10Gb campus network upgrade before performance testing can execute.', type: 'Internal', status: 'On Track', owner: 'Robert Kim', dependentTeam: 'IT Infrastructure', dueDate: '2026-04-15', workstream: 'Technical', impact: 'Blocks performance testing and cutover readiness.' },
  { id: 'D002', title: 'Benefits carrier sandbox environment access', description: 'BCBS, VSP, and Delta Dental must provide sandbox environments for integration testing.', type: 'External', status: 'At Risk', owner: 'Lisa Park', dependentTeam: 'Benefits Carriers', dueDate: '2026-04-01', workstream: 'HCM', impact: 'Blocks SIT Cycle 2 benefits integration testing.' },
  { id: 'D003', title: 'State payroll tax tables (RI DOR) Q3 2026', description: 'RI DOR must publish 2026 Q3 withholding tables before payroll parallel run.', type: 'External', status: 'On Track', owner: 'Lisa Park', dependentTeam: 'Rhode Island DOR', dueDate: '2026-05-15', workstream: 'HCM', impact: 'Blocks payroll parallel run if delayed.' },
  { id: 'D004', title: 'Banner team data remediation (12% error records)', description: 'Banner DBA team must remediate employee data errors before Mock 2 migration.', type: 'Internal', status: 'On Track', owner: 'Jennifer Lee', dependentTeam: 'Banner DBA Team', dueDate: '2026-04-10', workstream: 'Data', impact: 'Blocks Mock 2 data migration execution.' },
  { id: 'D005', title: 'Workday Learning module contract (Phase 2)', description: 'Procurement must execute contract for Workday Learning add-on (Phase 2 handoff decision needed).', type: 'Internal', status: 'Completed', owner: 'GD Project Coordinator', dependentTeam: 'Procurement', dueDate: '2026-02-28', workstream: 'All', impact: 'Decision made: Learning module deferred to Phase 2.' },
];

// ─── TEST CASES ──────────────────────────────────────────────
export const TEST_CASES = [
  // HCM
  { id: 'TC-HCM-001', module: 'HCM', area: 'Core HR', testName: 'Create / Edit Employee Record', priority: 'P1', status: 'Pass', tester: 'Lisa Park', executedDate: '2026-03-05', defects: [] },
  { id: 'TC-HCM-002', module: 'HCM', area: 'Core HR', testName: 'Terminate Employee — with Severance', priority: 'P1', status: 'Pass', tester: 'Lisa Park', executedDate: '2026-03-05', defects: [] },
  { id: 'TC-HCM-003', module: 'HCM', area: 'Core HR', testName: 'Position Management — Create & Edit Position', priority: 'P1', status: 'Pass', tester: 'Michael Chen', executedDate: '2026-03-06', defects: [] },
  { id: 'TC-HCM-004', module: 'HCM', area: 'Core HR', testName: 'Org Chart Navigation (5+ levels deep)', priority: 'P2', status: 'Fail', tester: 'Michael Chen', executedDate: '2026-03-15', defects: ['IMP-HCM-083'] },
  { id: 'TC-HCM-005', module: 'HCM', area: 'Payroll', testName: 'Run Biweekly Regular Payroll', priority: 'P1', status: 'Pass', tester: 'Lisa Park', executedDate: '2026-03-08', defects: [] },
  { id: 'TC-HCM-006', module: 'HCM', area: 'Payroll', testName: 'Off-cycle Payroll Run', priority: 'P1', status: 'Pass', tester: 'Lisa Park', executedDate: '2026-03-09', defects: [] },
  { id: 'TC-HCM-007', module: 'HCM', area: 'Payroll', testName: 'Retro-pay — Mid-period Rate Change', priority: 'P1', status: 'Fail', tester: 'Lisa Park', executedDate: '2026-03-05', defects: ['WD-SUPP-2847'] },
  { id: 'TC-HCM-008', module: 'HCM', area: 'Benefits', testName: 'Open Enrollment — Employee Self-Service', priority: 'P1', status: 'Fail', tester: 'Amy Wilson', executedDate: '2026-03-12', defects: ['IMP-HCM-078'] },
  { id: 'TC-HCM-009', module: 'HCM', area: 'Benefits', testName: 'Benefits Carrier File Generation (834)', priority: 'P1', status: 'Not Started', tester: null, executedDate: null, defects: [] },
  { id: 'TC-HCM-010', module: 'HCM', area: 'Benefits', testName: 'Life Event — Add New Dependent', priority: 'P2', status: 'Pass', tester: 'Amy Wilson', executedDate: '2026-03-16', defects: [] },
  { id: 'TC-HCM-011', module: 'HCM', area: 'Recruiting', testName: 'Create Job Requisition', priority: 'P1', status: 'Pass', tester: 'Michael Chen', executedDate: '2026-03-10', defects: [] },
  { id: 'TC-HCM-012', module: 'HCM', area: 'Recruiting', testName: 'Candidate Application → Offer Flow', priority: 'P1', status: 'Pass', tester: 'Michael Chen', executedDate: '2026-03-11', defects: [] },
  { id: 'TC-HCM-013', module: 'HCM', area: 'Onboarding', testName: 'New Hire Onboarding Checklist Completion', priority: 'P1', status: 'Pass', tester: 'Lisa Park', executedDate: '2026-03-01', defects: [] },
  { id: 'TC-HCM-014', module: 'HCM', area: 'Reporting', testName: 'Headcount by Department Report', priority: 'P2', status: 'Pass', tester: 'Michael Chen', executedDate: '2026-03-18', defects: [] },
  { id: 'TC-HCM-015', module: 'HCM', area: 'Reporting', testName: 'Payroll Audit Report', priority: 'P1', status: 'In Progress', tester: 'Lisa Park', executedDate: null, defects: [] },
  // Student
  { id: 'TC-STU-001', module: 'Student', area: 'Admissions', testName: 'Online Application Submission', priority: 'P1', status: 'Pass', tester: 'David Torres', executedDate: '2026-03-06', defects: [] },
  { id: 'TC-STU-002', module: 'Student', area: 'Admissions', testName: 'Application Review & Admission Decision Workflow', priority: 'P1', status: 'Pass', tester: 'David Torres', executedDate: '2026-03-07', defects: [] },
  { id: 'TC-STU-003', module: 'Student', area: 'Records', testName: 'Student Course Registration & Enrollment', priority: 'P1', status: 'Pass', tester: 'Jennifer Lee', executedDate: '2026-03-08', defects: [] },
  { id: 'TC-STU-004', module: 'Student', area: 'Records', testName: 'Transfer Credit Import', priority: 'P1', status: 'Fail', tester: 'Jennifer Lee', executedDate: '2026-03-08', defects: ['IMP-STU-041'] },
  { id: 'TC-STU-005', module: 'Student', area: 'Records', testName: 'Grade Entry & Transcript Generation', priority: 'P1', status: 'In Progress', tester: 'David Torres', executedDate: null, defects: [] },
  { id: 'TC-STU-006', module: 'Student', area: 'Financial Aid', testName: 'FAFSA Data Import & Aid Packaging', priority: 'P1', status: 'Not Started', tester: null, executedDate: null, defects: [] },
  { id: 'TC-STU-007', module: 'Student', area: 'Financial Aid', testName: 'Financial Aid Disbursement Workflow', priority: 'P1', status: 'Fail', tester: 'David Torres', executedDate: '2026-03-10', defects: ['IMP-STU-052'] },
  { id: 'TC-STU-008', module: 'Student', area: 'Financial Aid', testName: 'Return of Title IV (R2T4) Calculation', priority: 'P1', status: 'Not Started', tester: null, executedDate: null, defects: [] },
  { id: 'TC-STU-009', module: 'Student', area: 'Student Accounts', testName: 'Tuition Billing Calculation', priority: 'P1', status: 'Pass', tester: 'Amy Wilson', executedDate: '2026-03-14', defects: [] },
  { id: 'TC-STU-010', module: 'Student', area: 'Student Accounts', testName: 'Payment Plan Setup & Management', priority: 'P2', status: 'Pass', tester: 'Amy Wilson', executedDate: '2026-03-16', defects: [] },
  // Financials
  { id: 'TC-FIN-001', module: 'Financials', area: 'Procurement', testName: 'Create Purchase Requisition', priority: 'P1', status: 'Pass', tester: 'Amy Wilson', executedDate: '2026-03-04', defects: [] },
  { id: 'TC-FIN-002', module: 'Financials', area: 'Procurement', testName: 'Purchase Order Approval Workflow', priority: 'P1', status: 'Pass', tester: 'Amy Wilson', executedDate: '2026-03-05', defects: [] },
  { id: 'TC-FIN-003', module: 'Financials', area: 'Accounts Payable', testName: 'Supplier Invoice Processing', priority: 'P1', status: 'Pass', tester: 'Jennifer Lee', executedDate: '2026-03-07', defects: [] },
  { id: 'TC-FIN-004', module: 'Financials', area: 'Accounts Payable', testName: 'Payment Run — ACH', priority: 'P1', status: 'Pass', tester: 'Jennifer Lee', executedDate: '2026-03-10', defects: [] },
  { id: 'TC-FIN-005', module: 'Financials', area: 'Budget', testName: 'Budget Check Report', priority: 'P2', status: 'Pass', tester: 'Amy Wilson', executedDate: '2026-03-19', defects: [] },
  { id: 'TC-FIN-006', module: 'Financials', area: 'General Ledger', testName: 'Month-End Close Process', priority: 'P1', status: 'In Progress', tester: 'Amy Wilson', executedDate: null, defects: [] },
  { id: 'TC-FIN-007', module: 'Financials', area: 'Grants', testName: 'Grant Award Setup & Tracking', priority: 'P1', status: 'Not Started', tester: null, executedDate: null, defects: [] },
  // Integration
  { id: 'TC-INT-001', module: 'Integration', area: 'HCM-Payroll', testName: 'HCM to Payroll Data Sync', priority: 'P1', status: 'Pass', tester: 'Robert Kim', executedDate: '2026-03-06', defects: [] },
  { id: 'TC-INT-002', module: 'Integration', area: 'SSO', testName: 'SSO Authentication — Faculty / Staff', priority: 'P1', status: 'Pass', tester: 'Robert Kim', executedDate: '2026-03-14', defects: [] },
  { id: 'TC-INT-003', module: 'Integration', area: 'SSO', testName: 'SSO Authentication — Student Portal', priority: 'P1', status: 'Pass', tester: 'Robert Kim', executedDate: '2026-03-14', defects: [] },
  { id: 'TC-INT-004', module: 'Integration', area: 'Banner', testName: 'Banner Course Catalog Sync (EIB)', priority: 'P1', status: 'In Progress', tester: 'Robert Kim', executedDate: null, defects: [] },
  { id: 'TC-INT-005', module: 'Integration', area: 'Benefits', testName: 'BCBS Carrier File — 834 Transmission', priority: 'P1', status: 'Not Started', tester: null, executedDate: null, defects: [] },
];

// ─── MEETINGS ─────────────────────────────────────────────────
export const INITIAL_MEETINGS = [
  {
    id: 'MTG001', title: 'Weekly Project Steering Committee', type: 'Steering Committee',
    date: '2026-03-28', time: '10:00 AM', duration: 60, location: 'Microsoft Teams',
    organizer: 'GD Project Coordinator',
    attendees: ['GD Project Coordinator', 'Dr. Richard Hayes (VP Finance)', 'Dr. Carol White (Provost)', 'Michael Chen', 'VP IT James Brown'],
    status: 'Scheduled',
    agenda: ['Project Status Update — Week 29', 'Budget Review Phase 3', 'Risk Escalation: R001 FA Integration Delay', 'UAT Resource Commitment Request'],
    actionItems: [],
    minutes: null,
  },
  {
    id: 'MTG002', title: 'SIT Cycle 1 — Daily Defect Triage', type: 'Working Session',
    date: '2026-03-27', time: '9:00 AM', duration: 30, location: 'Microsoft Teams',
    organizer: 'Robert Kim',
    attendees: ['Robert Kim', 'Lisa Park', 'David Torres', 'Amy Wilson', 'Jennifer Lee'],
    status: 'Completed',
    agenda: ['Review new defects (yesterday)', 'Update defect status & priority', 'Blockers and escalations'],
    actionItems: [
      { item: 'Lisa Park: Follow up with Workday Support on WD-SUPP-2847 by EOD', owner: 'Lisa Park', dueDate: '2026-03-27', status: 'Completed' },
      { item: 'David Torres: Complete IMP-STU-052 BPD configuration fix by March 28', owner: 'David Torres', dueDate: '2026-03-28', status: 'Open' },
    ],
    minutes: 'Triage covered 6 open defects. 2 closed (I003, I007). Critical defect WD-SUPP-2847 escalated to Workday Support with P1 priority. David Torres confirmed FA workflow configuration fix in progress for March 28 completion.',
  },
  {
    id: 'MTG003', title: 'Workday PS Bi-Weekly Functional Check-In', type: 'Vendor Session',
    date: '2026-03-26', time: '2:00 PM', duration: 90, location: 'Microsoft Teams',
    organizer: 'GD Project Coordinator',
    attendees: ['GD Project Coordinator', 'Robert Kim', 'Lisa Park', 'David Torres', 'Workday PSA John Mitchell', 'Workday PSA Karen Yee'],
    status: 'Completed',
    agenda: ['Workday PS status update', 'WD38 update impact assessment', 'Financial Aid integration progress', 'Outstanding configuration Q&A'],
    actionItems: [
      { item: 'Workday PS: Provide WD38 release notes impact analysis by April 2', owner: 'Workday PS', dueDate: '2026-04-02', status: 'Open' },
      { item: 'Robert Kim: Schedule regression testing room booking for WD38', owner: 'Robert Kim', dueDate: '2026-04-05', status: 'Open' },
      { item: 'Karen Yee: Share FA integration best practices document', owner: 'Karen Yee (Workday)', dueDate: '2026-03-30', status: 'Open' },
    ],
    minutes: 'Workday PS confirmed WD38 scheduled for May 15. PS to provide impact analysis by April 2. FA integration on track for April 5 completion. 3 open config questions resolved during session. Payroll retro-pay defect reviewed — hotfix expected by March 30.',
  },
  {
    id: 'MTG004', title: 'Data Migration Working Group', type: 'Working Session',
    date: '2026-03-25', time: '11:00 AM', duration: 60, location: 'Conference Room A / Teams',
    organizer: 'Jennifer Lee',
    attendees: ['Jennifer Lee', 'Robert Kim', 'Banner DBA Tom Bradley', 'Amy Wilson'],
    status: 'Completed',
    agenda: ['Mock 1 results walkthrough', 'Data error remediation progress', 'Mock 2 planning and scheduling'],
    actionItems: [
      { item: 'Tom Bradley: Complete employee data remediation by April 10', owner: 'Tom Bradley', dueDate: '2026-04-10', status: 'Open' },
      { item: 'Jennifer Lee: Schedule Mock 2 migration window for April 19', owner: 'Jennifer Lee', dueDate: '2026-04-01', status: 'Open' },
    ],
    minutes: 'Mock 1 achieved 95.4% pass rate (18,342 / 19,231 records). Remaining failures traced to missing supervisor hierarchy (382 records) and duplicate cost center codes (507 records). Banner team committed to full remediation by April 10.',
  },
  {
    id: 'MTG005', title: 'Change Management & Training Planning', type: 'Working Session',
    date: '2026-04-01', time: '1:00 PM', duration: 90, location: 'Microsoft Teams',
    organizer: 'GD Project Coordinator',
    attendees: ['GD Project Coordinator', 'HR Director Maria Lopez', 'Training Lead Chris Wang', 'Lisa Park', 'David Torres'],
    status: 'Scheduled',
    agenda: ['Training curriculum review', 'Schedule for UAT tester training', 'Go-live communication plan', 'Payroll change resistance mitigation'],
    actionItems: [],
    minutes: null,
  },
  {
    id: 'MTG006', title: 'UAT Planning Kickoff', type: 'Planning',
    date: '2026-04-10', time: '10:00 AM', duration: 120, location: 'Main Campus — Building A, Room 201',
    organizer: 'GD Project Coordinator',
    attendees: ['GD Project Coordinator', 'Robert Kim', 'HR Director Maria Lopez', 'Registrar Dr. Susan Park', 'FA Director Mark Davis', 'Finance Director Amy Wilson'],
    status: 'Scheduled',
    agenda: ['UAT scope, objectives, and success criteria', 'Business tester role assignments', 'UAT test case walkthrough by workstream', 'UAT schedule and milestones', 'Escalation process and defect management'],
    actionItems: [],
    minutes: null,
  },
];

// ─── PROJECT PROGRESS CHART DATA ─────────────────────────────
export const PROGRESS_CHART = [
  { month: 'Sep 25', completed: 2, delayed: 0 },
  { month: 'Oct 25', completed: 5, delayed: 0 },
  { month: 'Nov 25', completed: 7, delayed: 0 },
  { month: 'Dec 25', completed: 8, delayed: 0 },
  { month: 'Jan 26', completed: 10, delayed: 0 },
  { month: 'Feb 26', completed: 11, delayed: 1 },
  { month: 'Mar 26', completed: 12, delayed: 1 },
];
