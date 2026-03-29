import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2, AlertTriangle, FlaskConical, Rocket,
  TrendingUp, TrendingDown, Minus, ArrowRight,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar,
} from 'recharts'
import {
  PROJECT_INFO, MILESTONES, INITIAL_RISKS, INITIAL_ISSUES,
  INITIAL_ASSUMPTIONS, INITIAL_DEPENDENCIES, TEST_CASES,
  INITIAL_MEETINGS, PROGRESS_CHART,
} from '../data/mockData'
import Badge from '../components/Badge'

// ── helpers ──────────────────────────────────────────────────
const today = new Date('2026-03-28')

function daysBetween(dateStr) {
  return Math.ceil((new Date(dateStr) - today) / 86400000)
}

function fmt(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── KPI Card ─────────────────────────────────────────────────
function KPICard({ title, value, sub, icon: Icon, color, trend, onClick }) {
  const palette = {
    blue:   { bg: 'bg-blue-600',   light: 'bg-blue-50',   text: 'text-blue-600'  },
    green:  { bg: 'bg-emerald-600',light: 'bg-emerald-50',text: 'text-emerald-600'},
    amber:  { bg: 'bg-amber-500',  light: 'bg-amber-50',  text: 'text-amber-600' },
    red:    { bg: 'bg-red-500',    light: 'bg-red-50',    text: 'text-red-600'   },
    purple: { bg: 'bg-violet-600', light: 'bg-violet-50', text: 'text-violet-600'},
  }
  const p = palette[color] ?? palette.blue
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-500' : 'text-slate-400'

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1 leading-none">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1.5">{sub}</p>}
        </div>
        <div className={`w-11 h-11 rounded-xl ${p.light} ${p.text} flex items-center justify-center flex-shrink-0`}>
          <Icon size={22} />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5">
        <TrendIcon size={13} className={trendColor} />
        <p className="text-xs text-slate-500">{sub ?? 'View details →'}</p>
      </div>
    </div>
  )
}

// ── Chart tooltip ─────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-xl ring-1 ring-slate-200 px-3 py-2.5 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  )
}

// ── Component ────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate()

  const stats = useMemo(() => {
    const completedM = MILESTONES.filter(m => m.status === 'Completed').length
    const delayedM   = MILESTONES.filter(m => m.status === 'Delayed').length
    const openIssues = INITIAL_ISSUES.filter(i => i.status !== 'Resolved').length
    const critIssues = INITIAL_ISSUES.filter(i => i.status !== 'Resolved' && i.severity === 'Critical').length
    const passedT    = TEST_CASES.filter(t => t.status === 'Pass').length
    const failedT    = TEST_CASES.filter(t => t.status === 'Fail').length
    const execT      = TEST_CASES.filter(t => t.status !== 'Not Started').length
    const passRate   = execT > 0 ? Math.round((passedT / execT) * 100) : 0
    const daysLeft   = daysBetween(PROJECT_INFO.goLiveDate)
    const openRisks  = INITIAL_RISKS.filter(r => r.status === 'Open').length
    const openAssumAtRisk = INITIAL_ASSUMPTIONS.filter(a => a.status === 'At Risk').length
    const openDepAtRisk   = INITIAL_DEPENDENCIES.filter(d => d.status === 'At Risk').length
    return { completedM, delayedM, openIssues, critIssues, passedT, failedT, execT, passRate, daysLeft, openRisks, openAssumAtRisk, openDepAtRisk }
  }, [])

  // RAID pie
  const raidPie = [
    { name: 'Open Risks',     value: INITIAL_RISKS.filter(r => r.status === 'Open').length,      color: '#ef4444' },
    { name: 'Open Issues',    value: INITIAL_ISSUES.filter(i => i.status === 'Open' || i.status === 'In Progress').length, color: '#f97316' },
    { name: 'At-Risk Assump', value: stats.openAssumAtRisk, color: '#eab308' },
    { name: 'At-Risk Deps',   value: stats.openDepAtRisk,   color: '#3b82f6' },
  ].filter(d => d.value > 0)

  // Test bar
  const testBar = ['HCM', 'Student', 'Financials', 'Integration'].map(mod => {
    const t = TEST_CASES.filter(x => x.module === mod)
    return {
      name: mod,
      Pass:       t.filter(x => x.status === 'Pass').length,
      Fail:       t.filter(x => x.status === 'Fail').length,
      'In Progress': t.filter(x => x.status === 'In Progress').length,
      'Not Started': t.filter(x => x.status === 'Not Started').length,
    }
  })

  const recentIssues = INITIAL_ISSUES.filter(i => i.status !== 'Resolved').slice(0, 4)
  const upcomingMeetings = INITIAL_MEETINGS.filter(m => m.status === 'Scheduled').slice(0, 3)
  const upcomingMilestones = MILESTONES.filter(m => m.status === 'Not Started' || m.status === 'In Progress' || m.status === 'Delayed').slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Project Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {PROJECT_INFO.client} · {PROJECT_INFO.program} · As of {fmt(today)}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-sm ring-1 ring-slate-200">
          <span className="text-xs text-slate-500">Overall Status</span>
          <Badge label={PROJECT_INFO.overallStatus} />
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Milestones Complete"
          value={`${MILESTONES.filter(m => m.status === 'Completed').length}/${MILESTONES.length}`}
          sub={`${stats.delayedM} delayed · ${Math.round((MILESTONES.filter(m => m.status === 'Completed').length / MILESTONES.length) * 100)}% done`}
          icon={CheckCircle2}
          color="green"
          trend="up"
          onClick={() => navigate('/milestones')}
        />
        <KPICard
          title="Open Issues & Risks"
          value={stats.openIssues + stats.openRisks}
          sub={`${stats.critIssues} critical · ${stats.openRisks} open risks`}
          icon={AlertTriangle}
          color={stats.critIssues > 0 ? 'red' : 'amber'}
          trend={stats.critIssues > 0 ? 'down' : 'up'}
          onClick={() => navigate('/raid-log')}
        />
        <KPICard
          title="SIT Test Pass Rate"
          value={`${stats.passRate}%`}
          sub={`${stats.passedT} pass · ${stats.failedT} fail · ${TEST_CASES.filter(t => t.status === 'Not Started').length} not started`}
          icon={FlaskConical}
          color={stats.passRate >= 80 ? 'blue' : 'amber'}
          trend={stats.passRate >= 80 ? 'up' : 'down'}
          onClick={() => navigate('/testing')}
        />
        <KPICard
          title="Days to Go-Live"
          value={stats.daysLeft}
          sub={`Target: ${fmt(PROJECT_INFO.goLiveDate)}`}
          icon={Rocket}
          color={stats.daysLeft < 60 ? 'red' : stats.daysLeft < 100 ? 'amber' : 'purple'}
          trend="down"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Progress area chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Milestone Progress Over Time</h2>
              <p className="text-xs text-slate-400">Cumulative milestones completed vs delayed</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={PROGRESS_CHART} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="grad-completed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad-delayed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f97316" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="completed" name="Completed" stroke="#3b82f6" strokeWidth={2} fill="url(#grad-completed)" dot={{ r: 3, fill: '#3b82f6' }} />
              <Area type="monotone" dataKey="delayed" name="Delayed" stroke="#f97316" strokeWidth={2} fill="url(#grad-delayed)" dot={{ r: 3, fill: '#f97316' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* RAID pie */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-slate-800">Open RAID Items</h2>
            <p className="text-xs text-slate-400">Risks · Issues · Assumptions · Dependencies</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={raidPie} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {raidPie.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {raidPie.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="flex-1 text-slate-600">{d.name}</span>
                <span className="font-bold text-slate-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test coverage bar + tables row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Test coverage bar */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-slate-800">SIT Test Coverage by Module</h2>
            <p className="text-xs text-slate-400">Test case execution status breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={testBar} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="Pass"        stackId="a" fill="#22c55e" radius={[0,0,0,0]} />
              <Bar dataKey="Fail"        stackId="a" fill="#ef4444" radius={[0,0,0,0]} />
              <Bar dataKey="In Progress" stackId="a" fill="#3b82f6" radius={[0,0,0,0]} />
              <Bar dataKey="Not Started" stackId="a" fill="#e2e8f0" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-3">
            {[['Pass','#22c55e'],['Fail','#ef4444'],['In Progress','#3b82f6'],['Not Started','#e2e8f0']].map(([label,color]) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming milestones */}
        <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Upcoming Milestones</h2>
              <p className="text-xs text-slate-400">Active & scheduled</p>
            </div>
            <button onClick={() => navigate('/milestones')} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
              All <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {upcomingMilestones.map(m => (
              <div key={m.id} className="flex items-start gap-2.5">
                <Badge label={m.status} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{m.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Due {fmt(m.dueDate)} · {m.owner.split(' ')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row — open issues + upcoming meetings */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Open issues */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-800">Open Issues</h2>
            <button onClick={() => navigate('/raid-log')} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
              Manage <ArrowRight size={12} />
            </button>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-400 uppercase tracking-wide text-[10px]">
                <th className="text-left px-5 py-2.5 font-medium">Issue</th>
                <th className="text-left px-3 py-2.5 font-medium">Severity</th>
                <th className="text-left px-3 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentIssues.map(i => (
                <tr key={i.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-slate-700 truncate max-w-[220px]">{i.title}</p>
                    <p className="text-slate-400 truncate">{i.owner}</p>
                  </td>
                  <td className="px-3 py-3"><Badge label={i.severity} /></td>
                  <td className="px-3 py-3"><Badge label={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming meetings */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-800">Upcoming Meetings</h2>
            <button onClick={() => navigate('/meetings')} className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1">
              All <ArrowRight size={12} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {upcomingMeetings.map(m => (
              <div key={m.id} className="px-5 py-3.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{m.title}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {fmt(m.date)} · {m.time} · {m.duration} min · {m.location}
                    </p>
                  </div>
                  <Badge label={m.type === 'Steering Committee' ? 'High' : 'Low'} />
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {m.agenda.slice(0, 2).map((a, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-500 rounded-full px-2 py-0.5 truncate max-w-[180px]">{a}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
