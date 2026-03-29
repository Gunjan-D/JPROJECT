import { useRef } from 'react'
import { Printer, FileBarChart2 } from 'lucide-react'
import Badge from '../components/Badge'
import {
  PROJECT_INFO, MILESTONES, INITIAL_RISKS, INITIAL_ISSUES,
  INITIAL_ASSUMPTIONS, INITIAL_DEPENDENCIES, TEST_CASES, INITIAL_MEETINGS,
} from '../data/mockData'

const today = new Date('2026-03-28')
const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

function SectionTitle({ children }) {
  return (
    <div className="flex items-center gap-2 mt-8 mb-3">
      <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
      <h2 className="text-[11px] font-extrabold text-blue-700 uppercase tracking-widest whitespace-nowrap">{children}</h2>
      <div className="flex-1 h-0.5 bg-gradient-to-l from-blue-600 to-transparent rounded-full" />
    </div>
  )
}

function RAGBadge({ status }) {
  const map = {
    GREEN: 'bg-emerald-500',
    AMBER: 'bg-amber-400',
    RED:   'bg-red-500',
  }
  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full flex-shrink-0 ${map[status] ?? 'bg-slate-300'}`} />
      <span className={`text-xs font-bold ${status === 'GREEN' ? 'text-emerald-700' : status === 'AMBER' ? 'text-amber-700' : 'text-red-700'}`}>{status}</span>
    </div>
  )
}

export default function StatusReport() {
  const printRef = useRef()

  function handlePrint() {
    window.print()
  }

  // Computed stats
  const completedM  = MILESTONES.filter(m => m.status === 'Completed').length
  const delayedM    = MILESTONES.filter(m => m.status === 'Delayed').length
  const openIssues  = INITIAL_ISSUES.filter(i => i.status !== 'Resolved')
  const openRisks   = INITIAL_RISKS.filter(r => r.status === 'Open')
  const critIssues  = openIssues.filter(i => i.severity === 'Critical')

  const passT  = TEST_CASES.filter(t => t.status === 'Pass').length
  const failT  = TEST_CASES.filter(t => t.status === 'Fail').length
  const execT  = TEST_CASES.filter(t => t.status !== 'Not Started').length
  const passRate = execT > 0 ? Math.round((passT / execT) * 100) : 0

  const daysLeft = Math.ceil((new Date(PROJECT_INFO.goLiveDate) - today) / 86400000)

  const upcomingMeetings = INITIAL_MEETINGS.filter(m => m.status === 'Scheduled').slice(0, 3)
  const openActions = INITIAL_MEETINGS
    .flatMap(m => m.actionItems)
    .filter(a => a.status !== 'Completed')

  // Workstream statuses
  const workstreamStatus = [
    {
      name: 'HCM', rag: 'AMBER',
      summary: 'Payroll retro-pay defect (Critical) open with Workday Support (WD-SUPP-2847). Safari benefits UI defect open (Medium). Core HR and Recruiting test cases on track.',
      openIssues: INITIAL_ISSUES.filter(i => i.workstream === 'HCM' && i.status !== 'Resolved').length,
    },
    {
      name: 'Student', rag: 'AMBER',
      summary: 'Financial Aid module integration delayed (~3 weeks). FA disbursement workflow missing approval step (High). Transfer credit import defect in remediation.',
      openIssues: INITIAL_ISSUES.filter(i => i.workstream === 'Student' && i.status !== 'Resolved').length,
    },
    {
      name: 'Financials', rag: 'GREEN',
      summary: 'Procurement, AP, and Budget test cases all pass. Month-end close testing in progress. No open defects.',
      openIssues: INITIAL_ISSUES.filter(i => i.workstream === 'Financials' && i.status !== 'Resolved').length,
    },
    {
      name: 'Data Migration', rag: 'GREEN',
      summary: 'Mock 1 complete at 95.4% pass rate. Banner data remediation in progress (target: April 10). Mock 2 scheduled for April 19.',
      openIssues: 0,
    },
    {
      name: 'Technology / Integration', rag: 'GREEN',
      summary: 'SSO authentication resolved. HCM-Payroll sync passing. Banner course catalog sync in progress. Carrier 834 testing scheduled SIT Cycle 2.',
      openIssues: 0,
    },
  ]

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between no-print">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Status Report</h1>
          <p className="text-sm text-slate-500 mt-0.5">Auto-generated · Week Ending {fmt(today)}</p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200"
        >
          <Printer size={16} /> Print / Export PDF
        </button>
      </div>

      {/* Report document */}
      <div ref={printRef} className="bg-white rounded-2xl shadow-lg ring-1 ring-slate-200 overflow-hidden">
        {/* Document header */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-8 py-7 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileBarChart2 size={20} className="text-blue-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Weekly Project Status Report</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight leading-snug">{PROJECT_INFO.program}</h1>
              <p className="text-blue-300 mt-1 text-sm">{PROJECT_INFO.client}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-slate-400 uppercase tracking-wide">Week Ending</p>
              <p className="text-lg font-bold">{fmt(today)}</p>
              <p className="text-xs text-slate-400 mt-2 uppercase tracking-wide">Overall Status</p>
              <div className="mt-1">
                <span className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 rounded-full px-3 py-1 text-sm font-bold ring-1 ring-amber-400/30">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {PROJECT_INFO.overallStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Key facts row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/10">
            {[
              { label: 'Project Manager', value: PROJECT_INFO.pm },
              { label: 'Executive Sponsor', value: 'Dr. Richard Hayes' },
              { label: 'Go-Live Target',   value: fmt(PROJECT_INFO.goLiveDate) },
              { label: 'Days to Go-Live',  value: `${daysLeft} days` },
            ].map(f => (
              <div key={f.label}>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">{f.label}</p>
                <p className="text-sm font-semibold text-white mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* Executive summary */}
          <SectionTitle>Executive Summary</SectionTitle>
          <div className="bg-slate-50 rounded-xl px-5 py-4 text-sm text-slate-700 leading-relaxed ring-1 ring-slate-200">
            <p>
              The Workday ERP implementation is tracking at overall <strong>AMBER</strong> status for the week ending {fmt(today)}.
              The project is currently in <strong>SIT Cycle 1</strong> with <strong>{Math.round((execT / TEST_CASES.length) * 100)}%</strong> of
              test cases executed and a pass rate of <strong>{passRate}%</strong>. 
              The HCM and Student workstreams carry the highest risk, with a critical payroll defect
              (WD-SUPP-2847) open with Workday Support and the Financial Aid module integration
              approximately <strong>3 weeks behind schedule</strong>.
              The Financials and Data workstreams are GREEN. The team is tracking toward a
              July 1, 2026 go-live with <strong>{daysLeft} days</strong> remaining.
            </p>
            <p className="mt-2">
              <strong>Key concern:</strong> SME availability during UAT (May–June) has been escalated to the
              Steering Committee and is awaiting formal resource commitment letters from department heads.
            </p>
          </div>

          {/* KPI table */}
          <SectionTitle>Key Metrics — Week {fmt(today)}</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Milestones Done',   value: `${completedM}/${MILESTONES.length}`, sub: `${Math.round((completedM/MILESTONES.length)*100)}%`, rag: 'AMBER' },
              { label: 'Delayed Milestones',value: delayedM,  sub: 'M006 Student FA', rag: delayedM > 0 ? 'AMBER' : 'GREEN' },
              { label: 'Open Issues',       value: openIssues.length, sub: `${critIssues.length} critical`, rag: critIssues.length > 0 ? 'RED' : 'AMBER' },
              { label: 'Open Risks',        value: openRisks.length, sub: 'High: 4', rag: 'AMBER' },
              { label: 'Test Pass Rate',    value: `${passRate}%`, sub: `${passT} pass / ${failT} fail`, rag: passRate >= 80 ? 'GREEN' : 'AMBER' },
              { label: 'Days to Go-Live',   value: daysLeft, sub: '1-Jul-2026', rag: daysLeft < 60 ? 'RED' : 'AMBER' },
            ].map(k => (
              <div key={k.label} className="bg-white rounded-xl p-3 ring-1 ring-slate-200 text-center">
                <p className="text-2xl font-extrabold text-slate-900">{k.value}</p>
                <p className="text-[10px] font-semibold text-slate-500 mt-0.5">{k.label}</p>
                <div className="mt-1.5"><RAGBadge status={k.rag} /></div>
                <p className="text-[10px] text-slate-400 mt-1">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Workstream status */}
          <SectionTitle>Workstream Status</SectionTitle>
          <div className="ring-1 ring-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-32">Workstream</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-20">Status</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Summary</th>
                  <th className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-16">Issues</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {workstreamStatus.map(ws => (
                  <tr key={ws.name} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-700">{ws.name}</td>
                    <td className="px-4 py-3.5"><RAGBadge status={ws.rag} /></td>
                    <td className="px-4 py-3.5 text-slate-600 leading-relaxed">{ws.summary}</td>
                    <td className="px-4 py-3.5">
                      <span className={`font-bold ${ws.openIssues > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                        {ws.openIssues > 0 ? ws.openIssues : '✓'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Accomplishments */}
          <SectionTitle>Accomplishments This Week</SectionTitle>
          <ul className="space-y-2">
            {[
              'SIT Cycle 1 test execution reached 78% completion — 29 of 37 test cases executed.',
              'Defects I003 (SSO Student Portal) and I007 (Budget Report Cache) resolved and verified.',
              'Data Migration Mock 1 completed with 95.4% pass rate — above 95% target.',
              'Workday PS bi-weekly check-in confirmed FA integration on track for April 5.',
              'Change Management: 3 additional Payroll process workshops scheduled for April.',
              'Banner DBA team committed to data remediation completion by April 10.',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Key risks */}
          <SectionTitle>Top Risks & Issues Requiring Attention</SectionTitle>
          <div className="space-y-2">
            {[...openRisks.slice(0, 3), ...openIssues.filter(i => i.severity === 'Critical' || i.severity === 'High').slice(0, 3)].map(item => (
              <div key={item.id} className={`rounded-xl px-4 py-3 ring-1 text-xs ${
                item.severity === 'Critical' || item.riskScore >= 6 ? 'bg-red-50 ring-red-200' :
                'bg-amber-50 ring-amber-200'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-slate-400">{item.id}</span>
                  {'severity' in item ? <Badge label={item.severity} /> : <Badge label={`Score ${item.riskScore}`} />}
                  <span className="font-bold text-slate-800">{item.title}</span>
                </div>
                <p className="text-slate-600">{item.description}</p>
                <p className="text-slate-500 mt-1"><strong>Mitigation:</strong> {item.mitigationPlan}</p>
              </div>
            ))}
          </div>

          {/* Next 2 weeks */}
          <SectionTitle>Actions & Upcoming Next 2 Weeks</SectionTitle>
          <div className="space-y-2">
            {[
              { date: '2026-03-31', item: 'Workday Support hotfix expected for WD-SUPP-2847 (Retro-pay defect)', owner: 'Workday Support' },
              { date: '2026-04-01', item: 'Change Management & Training Planning meeting', owner: 'GD Project Coordinator' },
              { date: '2026-04-02', item: 'Receive WD38 update impact analysis from Workday PS', owner: 'Workday PS' },
              { date: '2026-04-05', item: 'Student FA integration configuration complete (milestone M006 revised target)', owner: 'David Torres' },
              { date: '2026-04-10', item: 'UAT Planning Kickoff — business tester assignments finalized', owner: 'GD Project Coordinator' },
              { date: '2026-04-10', item: 'Banner data remediation completion (892 records)', owner: 'Tom Bradley (Banner DBA)' },
              { date: '2026-04-15', item: 'SIT Cycle 1 Exit — all test cases executed', owner: 'Robert Kim' },
              { date: '2026-04-19', item: 'Data Migration Mock 2 execution window', owner: 'Jennifer Lee' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="flex-shrink-0 text-right text-slate-400 w-20 font-medium">{fmt(a.date)}</span>
                <div className="w-0.5 h-full bg-slate-200 flex-shrink-0 self-stretch" />
                <div className="flex-1">
                  <p className="text-slate-700 font-medium">{a.item}</p>
                  <p className="text-slate-400 mt-0.5">Owner: {a.owner}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Open action items from meetings */}
          {openActions.length > 0 && (
            <>
              <SectionTitle>Open Meeting Action Items</SectionTitle>
              <div className="ring-1 ring-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Action Item</th>
                      <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-32">Owner</th>
                      <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-28">Due Date</th>
                      <th className="text-left px-3 py-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-24">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {openActions.map((a, i) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="px-4 py-2.5 text-slate-700">{a.item}</td>
                        <td className="px-3 py-2.5 text-slate-500">{a.owner}</td>
                        <td className="px-3 py-2.5 text-slate-500">{fmt(a.dueDate)}</td>
                        <td className="px-3 py-2.5"><Badge label={a.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
            <p>Prepared by: {PROJECT_INFO.pm} · {fmt(today)}</p>
            <p>{PROJECT_INFO.client} · {PROJECT_INFO.name} · CONFIDENTIAL</p>
            <p>Page 1 of 1</p>
          </div>
        </div>
      </div>
    </div>
  )
}
