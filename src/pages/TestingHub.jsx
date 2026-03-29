import { useState, useMemo } from 'react'
import { Search, CheckCircle2, XCircle, Clock, MinusCircle } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import Badge from '../components/Badge'
import { TEST_CASES } from '../data/mockData'

const MODULES = ['All', 'HCM', 'Student', 'Financials', 'Integration']
const STATUS_OPTS = ['', 'Pass', 'Fail', 'In Progress', 'Not Started']

const STATUS_ICON = {
  Pass:          <CheckCircle2 size={14} className="text-emerald-500" />,
  Fail:          <XCircle size={14} className="text-red-500" />,
  'In Progress': <Clock size={14} className="text-blue-500" />,
  'Not Started': <MinusCircle size={14} className="text-slate-300" />,
}

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'

function StatCard({ label, value, color, icon }) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm ring-1 ${color}`}>
      <div className="flex items-center gap-2 mb-1">{icon}<span className="text-xs font-semibold text-slate-500">{label}</span></div>
      <p className="text-3xl font-extrabold text-slate-900">{value}</p>
    </div>
  )
}

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-xl ring-1 ring-slate-200 px-3 py-2.5 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map(p => <p key={p.name} style={{ color: p.fill }}>{p.name}: <strong>{p.value}</strong></p>)}
    </div>
  )
}

export default function TestingHub() {
  const [moduleFil, setModuleFil] = useState('All')
  const [statusFil, setStatusFil] = useState('')
  const [search, setSearch]       = useState('')
  const [cycle, setCycle]         = useState('SIT')

  const filtered = useMemo(() =>
    TEST_CASES.filter(t =>
      (moduleFil === 'All' || t.module === moduleFil) &&
      (!statusFil || t.status === statusFil) &&
      (!search || t.testName.toLowerCase().includes(search.toLowerCase()) || t.area.toLowerCase().includes(search.toLowerCase()))
    ),
  [moduleFil, statusFil, search])

  const globalStats = useMemo(() => {
    const pass  = TEST_CASES.filter(t => t.status === 'Pass').length
    const fail  = TEST_CASES.filter(t => t.status === 'Fail').length
    const ip    = TEST_CASES.filter(t => t.status === 'In Progress').length
    const ns    = TEST_CASES.filter(t => t.status === 'Not Started').length
    const exec  = pass + fail + ip
    const rate  = exec > 0 ? Math.round((pass / exec) * 100) : 0
    return { pass, fail, ip, ns, exec, rate, total: TEST_CASES.length }
  }, [])

  const moduleChart = useMemo(() =>
    ['HCM','Student','Financials','Integration'].map(mod => {
      const t = TEST_CASES.filter(x => x.module === mod)
      return {
        name: mod,
        Pass:        t.filter(x => x.status === 'Pass').length,
        Fail:        t.filter(x => x.status === 'Fail').length,
        'In Prog':   t.filter(x => x.status === 'In Progress').length,
        'Not Started':t.filter(x => x.status === 'Not Started').length,
      }
    }),
  [])

  // Defect summary
  const defects = TEST_CASES.filter(t => t.defects && t.defects.length > 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Testing Hub</h1>
          <p className="text-sm text-slate-500 mt-0.5">SIT Cycle 1 — System Integration Testing · March 2026</p>
        </div>
        <div className="flex gap-1 bg-white rounded-xl ring-1 ring-slate-200 p-1 shadow-sm">
          {['SIT','UAT'].map(c => (
            <button
              key={c}
              onClick={() => setCycle(c)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${cycle === c ? 'bg-blue-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {cycle === 'UAT' ? (
        <div className="bg-white rounded-2xl p-12 text-center ring-1 ring-slate-200 shadow-sm">
          <Clock size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-lg font-bold text-slate-700">UAT Not Yet Started</p>
          <p className="text-sm text-slate-400 mt-1">UAT Kickoff is scheduled for May 1, 2026. Business testers will be assigned upon UAT planning kickoff on April 10.</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            <StatCard label="Total Test Cases"  value={globalStats.total} color="ring-slate-200"   icon={<MinusCircle size={15} className="text-slate-400" />} />
            <StatCard label="Pass"             value={globalStats.pass}  color="ring-emerald-200" icon={<CheckCircle2 size={15} className="text-emerald-500" />} />
            <StatCard label="Fail"             value={globalStats.fail}  color="ring-red-200"     icon={<XCircle size={15} className="text-red-500" />} />
            <StatCard label="In Progress"      value={globalStats.ip}   color="ring-blue-200"    icon={<Clock size={15} className="text-blue-500" />} />
            <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-blue-200 col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-500">Pass Rate</span>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{globalStats.rate}%</p>
              <p className="text-xs text-slate-400 mt-1">{globalStats.exec} of {globalStats.total} executed</p>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-sm font-bold text-slate-800 mb-4">Test Coverage by Module</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={moduleChart} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="Pass"         stackId="a" fill="#22c55e" radius={[0,0,0,0]} />
                <Bar dataKey="Fail"         stackId="a" fill="#ef4444" />
                <Bar dataKey="In Prog"      stackId="a" fill="#3b82f6" />
                <Bar dataKey="Not Started"  stackId="a" fill="#e2e8f0" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-4 mt-2">
              {[['Pass','#22c55e'],['Fail','#ef4444'],['In Progress','#3b82f6'],['Not Started','#e2e8f0']].map(([l,c]) => (
                <div key={l} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c }} />{l}
                </div>
              ))}
            </div>
          </div>

          {/* Linked defects */}
          {defects.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-red-100">
              <h2 className="text-sm font-bold text-red-700 mb-3">Linked Defects ({defects.length} test cases with open defects)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[600px]">
                  <thead>
                    <tr className="bg-red-50 text-red-400 uppercase tracking-wide text-[10px]">
                      <th className="text-left px-4 py-2.5">Test Case</th>
                      <th className="text-left px-3 py-2.5">Module / Area</th>
                      <th className="text-left px-3 py-2.5">Status</th>
                      <th className="text-left px-3 py-2.5">Defect Ref</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-red-50">
                    {defects.map(t => (
                      <tr key={t.id} className="hover:bg-red-50/50">
                        <td className="px-4 py-2.5">
                          <p className="font-semibold text-slate-700">{t.testName}</p>
                          <p className="text-slate-400">{t.id}</p>
                        </td>
                        <td className="px-3 py-2.5">
                          <Badge label={t.module} />
                          <span className="ml-1.5 text-slate-500">{t.area}</span>
                        </td>
                        <td className="px-3 py-2.5"><Badge label={t.status} /></td>
                        <td className="px-3 py-2.5">
                          {t.defects.map(d => (
                            <span key={d} className="inline-block bg-red-100 text-red-700 font-mono text-[10px] rounded px-1.5 py-0.5 mr-1">{d}</span>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Filter bar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-1 bg-white rounded-xl ring-1 ring-slate-200 p-1 shadow-sm">
              {MODULES.map(m => (
                <button
                  key={m}
                  onClick={() => setModuleFil(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${moduleFil === m ? 'bg-blue-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {m}
                </button>
              ))}
            </div>
            <select
              className="text-sm rounded-xl border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={statusFil}
              onChange={e => setStatusFil(e.target.value)}
            >
              <option value="">All Statuses</option>
              {STATUS_OPTS.filter(Boolean).map(s => <option key={s}>{s}</option>)}
            </select>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="pl-8 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                placeholder="Search test cases…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="text-xs text-slate-400">{filtered.length} results</span>
          </div>

          {/* Test case table */}
          <div className="bg-white rounded-2xl ring-1 ring-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Test Case ID', 'Test Name', 'Module / Area', 'Priority', 'Status', 'Tester', 'Executed', 'Defects'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-10 text-slate-400">No test cases match the selected filters.</td></tr>
                  ) : filtered.map(t => (
                    <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">{t.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {STATUS_ICON[t.status]}
                          <span className="font-medium text-slate-800">{t.testName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge label={t.module} />
                        <span className="ml-1.5 text-slate-500">{t.area}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap"><Badge label={t.priority} /></td>
                      <td className="px-4 py-3 whitespace-nowrap"><Badge label={t.status} /></td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{t.tester ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{fmt(t.executedDate)}</td>
                      <td className="px-4 py-3">
                        {t.defects.length > 0 ? (
                          t.defects.map(d => (
                            <span key={d} className="inline-block bg-red-100 text-red-700 font-mono text-[10px] rounded px-1.5 py-0.5 mr-1">{d}</span>
                          ))
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
