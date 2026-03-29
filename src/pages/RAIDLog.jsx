import { useState, useMemo } from 'react'
import {
  Plus, Pencil, Trash2, Search, Filter,
  ShieldAlert, AlertCircle, BookOpen, Link2,
} from 'lucide-react'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import {
  INITIAL_RISKS, INITIAL_ISSUES, INITIAL_ASSUMPTIONS, INITIAL_DEPENDENCIES,
} from '../data/mockData'

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

const TABS = [
  { key: 'risks',        label: 'Risks',        icon: ShieldAlert,  color: 'text-red-500' },
  { key: 'issues',       label: 'Issues',        icon: AlertCircle,  color: 'text-orange-500' },
  { key: 'assumptions',  label: 'Assumptions',   icon: BookOpen,     color: 'text-amber-500' },
  { key: 'dependencies', label: 'Dependencies',  icon: Link2,        color: 'text-blue-500' },
]

// ── Reusable field ────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}

const INPUT = 'w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
const TEXTAREA = `${INPUT} resize-none`

// ── Risk form ─────────────────────────────────────────────────
function RiskForm({ initial, onSave, onClose }) {
  const [d, setD] = useState(initial ?? {
    title: '', description: '', category: 'Schedule', probability: 'Medium', impact: 'Medium',
    riskScore: 4, status: 'Open', owner: '', mitigationPlan: '', raisedDate: '', targetDate: '', workstream: 'All',
  })
  const u = (k, v) => setD(prev => ({ ...prev, [k]: v }))
  return (
    <div className="space-y-4">
      <Field label="Title"><input className={INPUT} value={d.title} onChange={e => u('title', e.target.value)} /></Field>
      <Field label="Description"><textarea className={TEXTAREA} rows={3} value={d.description} onChange={e => u('description', e.target.value)} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category">
          <select className={INPUT} value={d.category} onChange={e => u('category', e.target.value)}>
            {['Schedule','People','Data','Resource','Technical','Budget'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Workstream">
          <select className={INPUT} value={d.workstream} onChange={e => u('workstream', e.target.value)}>
            {['All','HCM','Student','Financials','Technical','Data'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Probability">
          <select className={INPUT} value={d.probability} onChange={e => u('probability', e.target.value)}>
            {['Low','Medium','High'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Impact">
          <select className={INPUT} value={d.impact} onChange={e => u('impact', e.target.value)}>
            {['Low','Medium','High'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Risk Score (1–9)">
          <input type="number" min={1} max={9} className={INPUT} value={d.riskScore} onChange={e => u('riskScore', e.target.value)} />
        </Field>
        <Field label="Status">
          <select className={INPUT} value={d.status} onChange={e => u('status', e.target.value)}>
            {['Open','Monitoring','Closed'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Owner"><input className={INPUT} value={d.owner} onChange={e => u('owner', e.target.value)} /></Field>
        <Field label="Target Date"><input type="date" className={INPUT} value={d.targetDate} onChange={e => u('targetDate', e.target.value)} /></Field>
      </div>
      <Field label="Mitigation Plan">
        <textarea className={TEXTAREA} rows={3} value={d.mitigationPlan} onChange={e => u('mitigationPlan', e.target.value)} />
      </Field>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button onClick={() => onSave(d)} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">Save Risk</button>
      </div>
    </div>
  )
}

// ── Issue form ────────────────────────────────────────────────
function IssueForm({ initial, onSave, onClose }) {
  const [d, setD] = useState(initial ?? {
    title: '', description: '', severity: 'Medium', status: 'Open',
    owner: '', assignee: '', raisedDate: '', targetDate: '', resolvedDate: null,
    workstream: 'All', ticketRef: '', notes: '',
  })
  const u = (k, v) => setD(prev => ({ ...prev, [k]: v }))
  return (
    <div className="space-y-4">
      <Field label="Title"><input className={INPUT} value={d.title} onChange={e => u('title', e.target.value)} /></Field>
      <Field label="Description"><textarea className={TEXTAREA} rows={3} value={d.description} onChange={e => u('description', e.target.value)} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Severity">
          <select className={INPUT} value={d.severity} onChange={e => u('severity', e.target.value)}>
            {['Critical','High','Medium','Low'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={INPUT} value={d.status} onChange={e => u('status', e.target.value)}>
            {['Open','In Progress','Resolved'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Owner"><input className={INPUT} value={d.owner} onChange={e => u('owner', e.target.value)} /></Field>
        <Field label="Assignee"><input className={INPUT} value={d.assignee} onChange={e => u('assignee', e.target.value)} /></Field>
        <Field label="Workstream">
          <select className={INPUT} value={d.workstream} onChange={e => u('workstream', e.target.value)}>
            {['All','HCM','Student','Financials','Technical','Data'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Ticket Ref"><input className={INPUT} value={d.ticketRef} onChange={e => u('ticketRef', e.target.value)} /></Field>
        <Field label="Raised Date"><input type="date" className={INPUT} value={d.raisedDate} onChange={e => u('raisedDate', e.target.value)} /></Field>
        <Field label="Target Date"><input type="date" className={INPUT} value={d.targetDate} onChange={e => u('targetDate', e.target.value)} /></Field>
      </div>
      <Field label="Notes / Actions">
        <textarea className={TEXTAREA} rows={3} value={d.notes} onChange={e => u('notes', e.target.value)} />
      </Field>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button onClick={() => onSave(d)} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">Save Issue</button>
      </div>
    </div>
  )
}

// ── Assumption form ───────────────────────────────────────────
function AssumptionForm({ initial, onSave, onClose }) {
  const [d, setD] = useState(initial ?? {
    title: '', description: '', status: 'Valid', owner: '',
    raisedDate: '', reviewDate: '', workstream: 'All', impact: '',
  })
  const u = (k, v) => setD(prev => ({ ...prev, [k]: v }))
  return (
    <div className="space-y-4">
      <Field label="Title"><input className={INPUT} value={d.title} onChange={e => u('title', e.target.value)} /></Field>
      <Field label="Description"><textarea className={TEXTAREA} rows={3} value={d.description} onChange={e => u('description', e.target.value)} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Status">
          <select className={INPUT} value={d.status} onChange={e => u('status', e.target.value)}>
            {['Valid','At Risk','Invalid'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Workstream">
          <select className={INPUT} value={d.workstream} onChange={e => u('workstream', e.target.value)}>
            {['All','HCM','Student','Financials','Technical','Data'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Owner"><input className={INPUT} value={d.owner} onChange={e => u('owner', e.target.value)} /></Field>
        <Field label="Review Date"><input type="date" className={INPUT} value={d.reviewDate} onChange={e => u('reviewDate', e.target.value)} /></Field>
      </div>
      <Field label="Impact if Invalid">
        <textarea className={TEXTAREA} rows={2} value={d.impact} onChange={e => u('impact', e.target.value)} />
      </Field>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button onClick={() => onSave(d)} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">Save Assumption</button>
      </div>
    </div>
  )
}

// ── Dependency form ───────────────────────────────────────────
function DependencyForm({ initial, onSave, onClose }) {
  const [d, setD] = useState(initial ?? {
    title: '', description: '', type: 'Internal', status: 'On Track',
    owner: '', dependentTeam: '', dueDate: '', workstream: 'All', impact: '',
  })
  const u = (k, v) => setD(prev => ({ ...prev, [k]: v }))
  return (
    <div className="space-y-4">
      <Field label="Title"><input className={INPUT} value={d.title} onChange={e => u('title', e.target.value)} /></Field>
      <Field label="Description"><textarea className={TEXTAREA} rows={3} value={d.description} onChange={e => u('description', e.target.value)} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Type">
          <select className={INPUT} value={d.type} onChange={e => u('type', e.target.value)}>
            {['Internal','External'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select className={INPUT} value={d.status} onChange={e => u('status', e.target.value)}>
            {['On Track','At Risk','Completed','Blocked'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Owner"><input className={INPUT} value={d.owner} onChange={e => u('owner', e.target.value)} /></Field>
        <Field label="Dependent Team"><input className={INPUT} value={d.dependentTeam} onChange={e => u('dependentTeam', e.target.value)} /></Field>
        <Field label="Workstream">
          <select className={INPUT} value={d.workstream} onChange={e => u('workstream', e.target.value)}>
            {['All','HCM','Student','Financials','Technical','Data'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="Due Date"><input type="date" className={INPUT} value={d.dueDate} onChange={e => u('dueDate', e.target.value)} /></Field>
      </div>
      <Field label="Downstream Impact">
        <textarea className={TEXTAREA} rows={2} value={d.impact} onChange={e => u('impact', e.target.value)} />
      </Field>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button onClick={() => onSave(d)} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">Save Dependency</button>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function RAIDLog() {
  const [tab, setTab]       = useState('risks')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterWS, setFilterWS]         = useState('')

  const [risks, setRisks]               = useState(INITIAL_RISKS)
  const [issues, setIssues]             = useState(INITIAL_ISSUES)
  const [assumptions, setAssumptions]   = useState(INITIAL_ASSUMPTIONS)
  const [dependencies, setDependencies] = useState(INITIAL_DEPENDENCIES)

  const [modal, setModal]   = useState(null) // { mode: 'add'|'edit', item }
  const [confirm, setConfirm] = useState(null) // { id }

  const dataMap = { risks, issues, assumptions, dependencies }
  const setMap  = { risks: setRisks, issues: setIssues, assumptions: setAssumptions, dependencies: setDependencies }

  const activeData = useMemo(() => {
    let d = dataMap[tab]
    if (search)       d = d.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || (i.description ?? '').toLowerCase().includes(search.toLowerCase()))
    if (filterStatus) d = d.filter(i => i.status === filterStatus)
    if (filterWS)     d = d.filter(i => i.workstream === filterWS)
    return d
  }, [tab, search, filterStatus, filterWS, risks, issues, assumptions, dependencies])

  // Status options per tab
  const statusOpts = {
    risks:        ['Open','Monitoring','Closed'],
    issues:       ['Open','In Progress','Resolved'],
    assumptions:  ['Valid','At Risk','Invalid'],
    dependencies: ['On Track','At Risk','Completed','Blocked'],
  }

  function nextId(arr) {
    const prefix = tab === 'risks' ? 'R' : tab === 'issues' ? 'I' : tab === 'assumptions' ? 'A' : 'D'
    return `${prefix}${String(arr.length + 1).padStart(3, '0')}`
  }

  function handleSave(item) {
    const set = setMap[tab]
    if (modal.mode === 'add') {
      set(prev => [...prev, { ...item, id: nextId(prev) }])
    } else {
      set(prev => prev.map(x => x.id === item.id ? item : x))
    }
    setModal(null)
  }

  function handleDelete(id) {
    setMap[tab](prev => prev.filter(x => x.id !== id))
    setConfirm(null)
  }

  // Summary counts
  const counts = {
    risks:        { total: risks.length,        open: risks.filter(r => r.status === 'Open').length },
    issues:       { total: issues.length,       open: issues.filter(i => i.status !== 'Resolved').length },
    assumptions:  { total: assumptions.length,  open: assumptions.filter(a => a.status === 'At Risk').length },
    dependencies: { total: dependencies.length, open: dependencies.filter(d => d.status === 'At Risk' || d.status === 'Blocked').length },
  }

  function renderForm(initial) {
    if (tab === 'risks')        return <RiskForm initial={initial}       onSave={handleSave} onClose={() => setModal(null)} />
    if (tab === 'issues')       return <IssueForm initial={initial}      onSave={handleSave} onClose={() => setModal(null)} />
    if (tab === 'assumptions')  return <AssumptionForm initial={initial} onSave={handleSave} onClose={() => setModal(null)} />
    return <DependencyForm initial={initial} onSave={handleSave} onClose={() => setModal(null)} />
  }

  // Column definitions per tab
  function renderRow(item) {
    if (tab === 'risks') return (
      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
        <td className="px-4 py-3.5">
          <p className="text-xs font-semibold text-slate-400">{item.id}</p>
          <p className="text-sm font-medium text-slate-800 mt-0.5">{item.title}</p>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.category} /></td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.probability} /></td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.impact} /></td>
        <td className="px-4 py-3.5">
          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${item.riskScore >= 6 ? 'bg-red-100 text-red-700' : item.riskScore >= 4 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
            {item.riskScore}
          </span>
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.status} /></td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.workstream} /></td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{item.owner}</td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{fmt(item.targetDate)}</td>
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setModal({ mode: 'edit', item })} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setConfirm({ id: item.id })} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        </td>
      </tr>
    )
    if (tab === 'issues') return (
      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
        <td className="px-4 py-3.5">
          <p className="text-xs font-semibold text-slate-400">{item.id} · {item.ticketRef}</p>
          <p className="text-sm font-medium text-slate-800 mt-0.5">{item.title}</p>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.severity} /></td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.status} /></td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.workstream} /></td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{item.owner}</td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{item.assignee}</td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{fmt(item.targetDate)}</td>
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setModal({ mode: 'edit', item })} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setConfirm({ id: item.id })} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        </td>
      </tr>
    )
    if (tab === 'assumptions') return (
      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
        <td className="px-4 py-3.5">
          <p className="text-xs font-semibold text-slate-400">{item.id}</p>
          <p className="text-sm font-medium text-slate-800 mt-0.5">{item.title}</p>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.status} /></td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.workstream} /></td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{item.owner}</td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{fmt(item.reviewDate)}</td>
        <td className="px-4 py-3.5 text-xs text-slate-500 max-w-[220px]">
          <p className="line-clamp-2">{item.impact}</p>
        </td>
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setModal({ mode: 'edit', item })} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setConfirm({ id: item.id })} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        </td>
      </tr>
    )
    // dependencies
    return (
      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors group">
        <td className="px-4 py-3.5">
          <p className="text-xs font-semibold text-slate-400">{item.id}</p>
          <p className="text-sm font-medium text-slate-800 mt-0.5">{item.title}</p>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{item.description}</p>
        </td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.type} /></td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.status} /></td>
        <td className="px-4 py-3.5 whitespace-nowrap"><Badge label={item.workstream} /></td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{item.owner}</td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{item.dependentTeam}</td>
        <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">{fmt(item.dueDate)}</td>
        <td className="px-4 py-3.5">
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setModal({ mode: 'edit', item })} className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600"><Pencil size={14} /></button>
            <button onClick={() => setConfirm({ id: item.id })} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        </td>
      </tr>
    )
  }

  function renderHeaders() {
    if (tab === 'risks') return ['ID / Title', 'Category', 'Probability', 'Impact', 'Score', 'Status', 'Workstream', 'Owner', 'Target Date', '']
    if (tab === 'issues') return ['ID / Title', 'Severity', 'Status', 'Workstream', 'Owner', 'Assignee', 'Target Date', '']
    if (tab === 'assumptions') return ['ID / Title', 'Status', 'Workstream', 'Owner', 'Review Date', 'Impact if Invalid', '']
    return ['ID / Title', 'Type', 'Status', 'Workstream', 'Owner', 'Dependent Team', 'Due Date', '']
  }

  const tabLabels = { risks: 'Risk', issues: 'Issue', assumptions: 'Assumption', dependencies: 'Dependency' }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">RAID Log</h1>
          <p className="text-sm text-slate-500 mt-0.5">Risks · Assumptions · Issues · Dependencies — live register</p>
        </div>
        <button
          onClick={() => setModal({ mode: 'add', item: null })}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors"
        >
          <Plus size={16} /> Add {tabLabels[tab]}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {TABS.map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => { setTab(key); setSearch(''); setFilterStatus(''); setFilterWS('') }}
            className={`text-left bg-white rounded-xl p-4 ring-1 transition-all ${
              tab === key ? 'ring-blue-500 shadow-md' : 'ring-slate-200 hover:ring-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon size={16} className={color} />
              <span className="text-xs font-semibold text-slate-600">{label}</span>
            </div>
            <p className="text-2xl font-extrabold text-slate-900">{counts[key].total}</p>
            <p className="text-xs text-slate-400 mt-0.5">{counts[key].open} active / at-risk</p>
          </button>
        ))}
      </div>

      {/* Tab + filters */}
      <div className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          {TABS.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => { setTab(key); setSearch(''); setFilterStatus(''); setFilterWS('') }}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                tab === key
                  ? 'border-blue-600 text-blue-600 bg-blue-50/40'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon size={15} className={tab === key ? 'text-blue-600' : color} />
              {label}
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab === key ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                {counts[key].total}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50/60">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            <select
              className="text-sm rounded-lg border border-slate-200 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOpts[tab].map(s => <option key={s}>{s}</option>)}
            </select>
            <select
              className="text-sm rounded-lg border border-slate-200 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              value={filterWS}
              onChange={e => setFilterWS(e.target.value)}
            >
              <option value="">All Workstreams</option>
              {['All','HCM','Student','Financials','Technical','Data'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <p className="text-xs text-slate-400 ml-auto">{activeData.length} record{activeData.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {renderHeaders().map((h, i) => (
                  <th key={i} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activeData.length === 0 ? (
                <tr><td colSpan={10} className="text-center py-12 text-slate-400 text-sm">No records found.</td></tr>
              ) : activeData.map(item => renderRow(item))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.mode === 'add' ? `Add New ${tabLabels[tab]}` : `Edit ${tabLabels[tab]}`}
        maxWidth="max-w-3xl"
      >
        {modal && renderForm(modal.item)}
      </Modal>

      {/* Delete confirm */}
      <Modal isOpen={!!confirm} onClose={() => setConfirm(null)} title="Confirm Delete" maxWidth="max-w-sm">
        <p className="text-sm text-slate-600 mb-6">Are you sure you want to delete this item? This cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button onClick={() => setConfirm(null)} className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
          <button onClick={() => handleDelete(confirm.id)} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium">Delete</button>
        </div>
      </Modal>
    </div>
  )
}
