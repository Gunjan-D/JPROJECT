import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ShieldAlert,
  ListChecks,
  FlaskConical,
  CalendarDays,
  FileBarChart2,
  Activity,
  Bell,
  ChevronRight,
} from 'lucide-react'
import { PROJECT_INFO, INITIAL_ISSUES, INITIAL_RISKS } from '../data/mockData'

const NAV = [
  { path: '/dashboard',    label: 'Dashboard',      icon: LayoutDashboard },
  { path: '/raid-log',     label: 'RAID Log',        icon: ShieldAlert },
  { path: '/milestones',   label: 'Milestones',      icon: ListChecks },
  { path: '/testing',      label: 'Testing Hub',     icon: FlaskConical },
  { path: '/meetings',     label: 'Meetings',        icon: CalendarDays },
  { path: '/status-report',label: 'Status Report',   icon: FileBarChart2 },
]

const openIssues = INITIAL_ISSUES.filter(i => i.status !== 'Resolved').length
const openRisks  = INITIAL_RISKS.filter(r => r.status === 'Open').length

const BADGES = {
  '/raid-log': openIssues + openRisks,
}

const STATUS_COLOR = { GREEN: 'bg-emerald-400', AMBER: 'bg-amber-400', RED: 'bg-red-500' }

export default function Layout() {
  const location = useLocation()
  const activeNav = NAV.find(n => location.pathname.startsWith(n.path))

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* ── Sidebar ── */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-slate-900 overflow-y-auto scrollbar-thin">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
              <Activity size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight tracking-tight">Project Hub</p>
              <p className="text-slate-400 text-xs mt-0.5">Workday Implementation</p>
            </div>
          </div>
        </div>

        {/* Project card */}
        <div className="mx-3 mt-4 px-4 py-3 rounded-xl bg-slate-800 ring-1 ring-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${STATUS_COLOR[PROJECT_INFO.overallStatus]}`} />
            <span className="text-xs font-semibold text-slate-300">
              Overall: <span className="text-white">{PROJECT_INFO.overallStatus}</span>
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium leading-snug">{PROJECT_INFO.client}</p>
          <p className="text-xs text-slate-500 mt-0.5">{PROJECT_INFO.phase}</p>
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Completion</span>
              <span className="text-slate-300 font-semibold">{PROJECT_INFO.completionPct}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${PROJECT_INFO.completionPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pt-4 pb-2 space-y-0.5">
          {NAV.map(({ path, label, icon: Icon }) => {
            const badgeCount = BADGES[path]
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`
                }
              >
                <Icon size={17} className="flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {badgeCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {badgeCount}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              GD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">GD Project Coordinator</p>
              <p className="text-xs text-slate-400 truncate">GD Project Coordinator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-slate-400 font-medium">State University</span>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="font-semibold text-slate-800">{activeNav?.label ?? 'Dashboard'}</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden sm:block text-right">
              <p className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Current Phase</p>
              <p className="text-sm font-semibold text-blue-600">{PROJECT_INFO.phase}</p>
            </div>
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <Bell size={18} className="text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
