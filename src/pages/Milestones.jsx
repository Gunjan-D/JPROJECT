import { useState, useMemo } from 'react'
import { CheckCircle2, Clock, AlertTriangle, Circle } from 'lucide-react'
import Badge from '../components/Badge'
import { MILESTONES } from '../data/mockData'

const PHASES = ['Initiation', 'Design', 'Build', 'Data', 'Testing', 'UAT', 'Go-Live']
const PHASE_COLORS = {
  Initiation: 'bg-slate-400',
  Design:     'bg-violet-500',
  Build:      'bg-blue-500',
  Data:       'bg-indigo-500',
  Testing:    'bg-orange-500',
  UAT:        'bg-amber-500',
  'Go-Live':  'bg-emerald-500',
}
const PHASE_LIGHT = {
  Initiation: 'bg-slate-100 text-slate-600 ring-slate-200',
  Design:     'bg-violet-100 text-violet-700 ring-violet-200',
  Build:      'bg-blue-100 text-blue-700 ring-blue-200',
  Data:       'bg-indigo-100 text-indigo-700 ring-indigo-200',
  Testing:    'bg-orange-100 text-orange-700 ring-orange-200',
  UAT:        'bg-amber-100 text-amber-700 ring-amber-200',
  'Go-Live':  'bg-emerald-100 text-emerald-700 ring-emerald-200',
}

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

function StatusIcon({ status }) {
  if (status === 'Completed')   return <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
  if (status === 'In Progress') return <Clock size={18} className="text-blue-500 flex-shrink-0" />
  if (status === 'Delayed')     return <AlertTriangle size={18} className="text-orange-500 flex-shrink-0" />
  return <Circle size={18} className="text-slate-300 flex-shrink-0" />
}

export default function Milestones() {
  const [phaseFilter, setPhaseFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = useMemo(() => {
    let d = MILESTONES
    if (phaseFilter)  d = d.filter(m => m.phase === phaseFilter)
    if (statusFilter) d = d.filter(m => m.status === statusFilter)
    return d
  }, [phaseFilter, statusFilter])

  const byPhase = useMemo(() => {
    const groups = {}
    PHASES.forEach(p => {
      groups[p] = MILESTONES.filter(m => m.phase === p)
    })
    return groups
  }, [])

  const overall = {
    total:     MILESTONES.length,
    completed: MILESTONES.filter(m => m.status === 'Completed').length,
    inProgress:MILESTONES.filter(m => m.status === 'In Progress').length,
    delayed:   MILESTONES.filter(m => m.status === 'Delayed').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Milestones</h1>
        <p className="text-sm text-slate-500 mt-0.5">Project timeline · Sep 2025 – Jul 2026</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Milestones', value: overall.total,      color: 'bg-slate-50  text-slate-700  ring-slate-200' },
          { label: 'Completed',        value: overall.completed,  color: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
          { label: 'In Progress',      value: overall.inProgress, color: 'bg-blue-50   text-blue-700   ring-blue-200' },
          { label: 'Delayed',          value: overall.delayed,    color: 'bg-orange-50  text-orange-700 ring-orange-200' },
        ].map(c => (
          <div key={c.label} className={`rounded-xl px-4 py-3 ring-1 ${c.color}`}>
            <p className="text-2xl font-extrabold">{c.value}</p>
            <p className="text-xs font-semibold mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Phase progress bars */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-sm font-bold text-slate-800 mb-4">Progress by Phase</h2>
        <div className="space-y-3">
          {PHASES.map(phase => {
            const items = byPhase[phase] ?? []
            const done  = items.filter(m => m.status === 'Completed').length
            const pct   = items.length > 0 ? Math.round((done / items.length) * 100) : 0
            return (
              <div key={phase} className="flex items-center gap-4">
                <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ring-1 w-24 text-center flex-shrink-0 ${PHASE_LIGHT[phase]}`}>{phase}</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${PHASE_COLORS[phase]} rounded-full transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-24 text-right flex-shrink-0">
                  {done}/{items.length} · <strong>{pct}%</strong>
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <select
          className="text-sm rounded-xl border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={phaseFilter}
          onChange={e => setPhaseFilter(e.target.value)}
        >
          <option value="">All Phases</option>
          {PHASES.map(p => <option key={p}>{p}</option>)}
        </select>
        <select
          className="text-sm rounded-xl border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          {['Completed','In Progress','Not Started','Delayed'].map(s => <option key={s}>{s}</option>)}
        </select>
        <span className="text-xs text-slate-400">{filtered.length} milestones</span>
      </div>

      {/* Timeline list — grouped by phase */}
      <div className="space-y-8">
        {PHASES.map(phase => {
          const items = filtered.filter(m => m.phase === phase)
          if (items.length === 0) return null
          return (
            <div key={phase}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`w-3 h-3 rounded-full ${PHASE_COLORS[phase]}`} />
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{phase}</h2>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="relative pl-6 space-y-0">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200" />
                {items.map((m, idx) => (
                  <div key={m.id} className="relative flex items-start gap-4 pb-5 last:pb-0">
                    {/* Dot */}
                    <div className={`absolute left-[-20px] mt-1 w-4 h-4 rounded-full border-2 border-white shadow flex items-center justify-center flex-shrink-0 ${
                      m.status === 'Completed'   ? 'bg-emerald-500' :
                      m.status === 'In Progress' ? 'bg-blue-500'    :
                      m.status === 'Delayed'     ? 'bg-orange-500'  : 'bg-slate-300'
                    }`} />

                    {/* Card */}
                    <div className={`flex-1 bg-white rounded-xl p-4 shadow-sm ring-1 transition-shadow hover:shadow-md ${
                      m.status === 'Delayed' ? 'ring-orange-200' : 'ring-slate-200'
                    }`}>
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold text-slate-400">{m.id}</span>
                            <Badge label={m.status} />
                            <Badge label={m.workstream} />
                          </div>
                          <p className="text-sm font-bold text-slate-800 mt-1.5">{m.name}</p>
                          {m.notes && <p className="text-xs text-slate-500 mt-1 italic">{m.notes}</p>}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">
                            {m.status === 'Completed' ? 'Completed' : 'Due'}
                          </p>
                          <p className={`text-sm font-semibold ${m.status === 'Delayed' ? 'text-orange-600' : 'text-slate-700'}`}>
                            {fmt(m.completedDate ?? m.dueDate)}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">{m.owner}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
