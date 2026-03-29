import { useState } from 'react'
import {
  CalendarDays, Clock, MapPin, Users, ChevronDown, ChevronUp,
  Plus, CheckCircle2, Circle, Pencil,
} from 'lucide-react'
import Badge from '../components/Badge'
import Modal from '../components/Modal'
import { INITIAL_MEETINGS } from '../data/mockData'

const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'
const today = new Date('2026-03-28')

const TYPE_COLOR = {
  'Steering Committee': 'bg-violet-100 text-violet-700 ring-violet-200',
  'Working Session':    'bg-blue-100 text-blue-700 ring-blue-200',
  'Vendor Session':     'bg-teal-100 text-teal-700 ring-teal-200',
  'Planning':           'bg-amber-100 text-amber-700 ring-amber-200',
}

function MeetingCard({ meeting, onEditAction }) {
  const [expanded, setExpanded] = useState(false)
  const isPast = meeting.status === 'Completed'

  return (
    <div className={`bg-white rounded-2xl ring-1 shadow-sm transition-shadow hover:shadow-md ${isPast ? 'ring-slate-200' : 'ring-blue-200'}`}>
      {/* Header */}
      <div
        className="px-5 py-4 cursor-pointer flex items-start gap-4"
        onClick={() => setExpanded(x => !x)}
      >
        {/* Date block */}
        <div className={`flex-shrink-0 w-12 rounded-xl text-center py-1.5 ${isPast ? 'bg-slate-100' : 'bg-blue-600'}`}>
          <p className={`text-[10px] font-bold uppercase ${isPast ? 'text-slate-400' : 'text-blue-200'}`}>
            {new Date(meeting.date).toLocaleString('en-US', { month: 'short' })}
          </p>
          <p className={`text-xl font-extrabold leading-none ${isPast ? 'text-slate-600' : 'text-white'}`}>
            {new Date(meeting.date).getDate()}
          </p>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ring-1 ${TYPE_COLOR[meeting.type] ?? 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
              {meeting.type}
            </span>
            <Badge label={meeting.status} />
          </div>
          <p className="text-sm font-bold text-slate-800 mt-1.5">{meeting.title}</p>
          <div className="flex items-center flex-wrap gap-3 mt-1.5 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Clock size={12} />{meeting.time} · {meeting.duration} min</span>
            <span className="flex items-center gap-1"><MapPin size={12} />{meeting.location}</span>
            <span className="flex items-center gap-1"><Users size={12} />{meeting.attendees.length} attendees</span>
          </div>
        </div>

        {/* Expand */}
        <div className="flex-shrink-0 mt-1">
          {expanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
        </div>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 py-4 space-y-4">
          {/* Attendees */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Attendees</p>
            <div className="flex flex-wrap gap-1.5">
              {meeting.attendees.map((a, i) => (
                <span key={i} className="text-xs bg-slate-100 text-slate-600 rounded-full px-2.5 py-1 font-medium">{a}</span>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Agenda</p>
            <ol className="space-y-1.5">
              {meeting.agenda.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-[11px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* Minutes */}
          {meeting.minutes && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Meeting Minutes</p>
              <p className="text-sm text-slate-600 bg-slate-50 rounded-xl px-4 py-3 leading-relaxed">{meeting.minutes}</p>
            </div>
          )}

          {/* Action items */}
          {meeting.actionItems.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Action Items ({meeting.actionItems.length})
              </p>
              <div className="space-y-2">
                {meeting.actionItems.map((ai, i) => (
                  <div key={i} className={`flex items-start gap-2 px-3 py-2.5 rounded-xl text-xs ${ai.status === 'Completed' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                    {ai.status === 'Completed'
                      ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      : <Circle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    }
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-700 font-medium">{ai.item}</p>
                      <p className="text-slate-400 mt-0.5">Owner: {ai.owner} · Due: {fmt(ai.dueDate)}</p>
                    </div>
                    <Badge label={ai.status} className="flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Add Meeting Form ──────────────────────────────────────────
const INPUT = 'w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'

function AddMeetingForm({ onSave, onClose }) {
  const [d, setD] = useState({
    title: '', type: 'Working Session', date: '', time: '10:00 AM',
    duration: 60, location: 'Microsoft Teams', organizer: 'GD Project Coordinator',
    attendeesText: '', agendaText: '', status: 'Scheduled',
  })
  const u = (k, v) => setD(p => ({ ...p, [k]: v }))

  function handleSubmit() {
    const meeting = {
      id: `MTG${Date.now()}`,
      title: d.title, type: d.type, date: d.date, time: d.time,
      duration: Number(d.duration), location: d.location, organizer: d.organizer,
      attendees: d.attendeesText.split('\n').map(s => s.trim()).filter(Boolean),
      agenda: d.agendaText.split('\n').map(s => s.trim()).filter(Boolean),
      status: d.status, actionItems: [], minutes: null,
    }
    onSave(meeting)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Meeting Title</label>
          <input className={INPUT} value={d.title} onChange={e => u('title', e.target.value)} placeholder="e.g. SIT Cycle 2 Kickoff" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Type</label>
          <select className={INPUT} value={d.type} onChange={e => u('type', e.target.value)}>
            {['Steering Committee','Working Session','Vendor Session','Planning','Training'].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Date</label>
          <input type="date" className={INPUT} value={d.date} onChange={e => u('date', e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Time</label>
          <input className={INPUT} value={d.time} onChange={e => u('time', e.target.value)} placeholder="e.g. 10:00 AM" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Duration (min)</label>
          <input type="number" className={INPUT} value={d.duration} onChange={e => u('duration', e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Location / Meeting Link</label>
          <input className={INPUT} value={d.location} onChange={e => u('location', e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Attendees (one per line)</label>
          <textarea className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none" rows={4} value={d.attendeesText} onChange={e => u('attendeesText', e.target.value)} placeholder="GD Project Coordinator&#10;Robert Kim&#10;Workday PS: John Mitchell" />
        </div>
        <div className="col-span-2">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Agenda Items (one per line)</label>
          <textarea className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none" rows={4} value={d.agendaText} onChange={e => u('agendaText', e.target.value)} placeholder="Project Status Update&#10;Risk Review&#10;Open Issues Triage" />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button onClick={onClose} className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">Cancel</button>
        <button onClick={handleSubmit} className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium">Schedule Meeting</button>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function Meetings() {
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS)
  const [view, setView]         = useState('upcoming') // 'upcoming' | 'past'
  const [addOpen, setAddOpen]   = useState(false)

  const upcoming = meetings.filter(m => m.status === 'Scheduled')
  const past     = meetings.filter(m => m.status === 'Completed')
  const shown    = view === 'upcoming' ? upcoming : past

  const allActions = past.flatMap(m => m.actionItems)
  const openActions = allActions.filter(a => a.status !== 'Completed')

  function handleAdd(m) {
    setMeetings(prev => [m, ...prev])
    setAddOpen(false)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Meetings</h1>
          <p className="text-sm text-slate-500 mt-0.5">Schedule · Agenda · Minutes · Action Items</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-200"
        >
          <Plus size={16} /> Schedule Meeting
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Upcoming',          value: upcoming.length, color: 'ring-blue-200 text-blue-700' },
          { label: 'Completed',         value: past.length,     color: 'ring-emerald-200 text-emerald-700' },
          { label: 'Open Action Items', value: openActions.length, color: openActions.length > 0 ? 'ring-orange-200 text-orange-700' : 'ring-slate-200 text-slate-700' },
          { label: 'Total Attendees',   value: [...new Set(meetings.flatMap(m => m.attendees))].length, color: 'ring-violet-200 text-violet-700' },
        ].map(c => (
          <div key={c.label} className={`bg-white rounded-xl p-4 shadow-sm ring-1 ${c.color}`}>
            <p className={`text-2xl font-extrabold ${c.color.includes('orange') ? 'text-orange-700' : ''}`}>{c.value}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Open action items */}
      {openActions.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-4 ring-1 ring-amber-200">
          <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">
            {openActions.length} Open Action Item{openActions.length !== 1 ? 's' : ''} Requiring Follow-up
          </p>
          <div className="space-y-2">
            {openActions.map((ai, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <Circle size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-slate-700 font-medium">{ai.item}</p>
                  <p className="text-slate-400">Owner: {ai.owner} · Due: {fmt(ai.dueDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab toggle */}
      <div className="flex items-center gap-1 bg-white rounded-xl ring-1 ring-slate-200 p-1 shadow-sm w-fit">
        {['upcoming','past'].map(v => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-colors ${view === v ? 'bg-blue-600 text-white shadow' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {v} {v === 'upcoming' ? `(${upcoming.length})` : `(${past.length})`}
          </button>
        ))}
      </div>

      {/* Meeting list */}
      <div className="space-y-3">
        {shown.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center ring-1 ring-slate-200">
            <CalendarDays size={40} className="text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No {view} meetings found.</p>
          </div>
        ) : shown.map(m => (
          <MeetingCard key={m.id} meeting={m} />
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        title="Schedule New Meeting"
        maxWidth="max-w-2xl"
      >
        <AddMeetingForm onSave={handleAdd} onClose={() => setAddOpen(false)} />
      </Modal>
    </div>
  )
}
