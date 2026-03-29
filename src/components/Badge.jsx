const VARIANTS = {
  // Milestone / task status
  Completed:     'bg-emerald-100 text-emerald-700 ring-emerald-200',
  'In Progress': 'bg-blue-100 text-blue-700 ring-blue-200',
  'Not Started': 'bg-slate-100 text-slate-500 ring-slate-200',
  Delayed:       'bg-orange-100 text-orange-700 ring-orange-200',
  Blocked:       'bg-red-100 text-red-700 ring-red-200',

  // RAID status
  Open:          'bg-red-100 text-red-700 ring-red-200',
  Monitoring:    'bg-amber-100 text-amber-700 ring-amber-200',
  Closed:        'bg-emerald-100 text-emerald-700 ring-emerald-200',
  Resolved:      'bg-emerald-100 text-emerald-700 ring-emerald-200',
  Valid:         'bg-emerald-100 text-emerald-700 ring-emerald-200',
  'At Risk':     'bg-orange-100 text-orange-700 ring-orange-200',
  Invalid:       'bg-slate-100 text-slate-500 ring-slate-200',
  'On Track':    'bg-emerald-100 text-emerald-700 ring-emerald-200',

  // Test status
  Pass:          'bg-emerald-100 text-emerald-700 ring-emerald-200',
  Fail:          'bg-red-100 text-red-700 ring-red-200',

  // Meeting
  Scheduled:     'bg-blue-100 text-blue-700 ring-blue-200',

  // Health / RAG
  GREEN:         'bg-emerald-100 text-emerald-700 ring-emerald-200',
  AMBER:         'bg-amber-100 text-amber-700 ring-amber-200',
  RED:           'bg-red-100 text-red-700 ring-red-200',

  // Severity
  Critical:      'bg-red-100 text-red-700 ring-red-200',
  High:          'bg-orange-100 text-orange-700 ring-orange-200',
  Medium:        'bg-amber-100 text-amber-700 ring-amber-200',
  Low:           'bg-slate-100 text-slate-500 ring-slate-200',

  // Priority
  P1:            'bg-red-100 text-red-700 ring-red-200',
  P2:            'bg-amber-100 text-amber-700 ring-amber-200',
  P3:            'bg-slate-100 text-slate-500 ring-slate-200',

  // Workstream
  HCM:          'bg-violet-100 text-violet-700 ring-violet-200',
  Student:      'bg-sky-100 text-sky-700 ring-sky-200',
  Financials:   'bg-teal-100 text-teal-700 ring-teal-200',
  Technical:    'bg-slate-200 text-slate-700 ring-slate-300',
  Data:         'bg-indigo-100 text-indigo-700 ring-indigo-200',
  All:          'bg-gray-100 text-gray-600 ring-gray-200',
  Integration:  'bg-cyan-100 text-cyan-700 ring-cyan-200',
};

export default function Badge({ label, className = '' }) {
  const style = VARIANTS[label] ?? 'bg-slate-100 text-slate-500 ring-slate-200';
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style} ${className}`}
    >
      {label}
    </span>
  );
}
