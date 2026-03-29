import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import RAIDLog from './pages/RAIDLog'
import Milestones from './pages/Milestones'
import TestingHub from './pages/TestingHub'
import Meetings from './pages/Meetings'
import StatusReport from './pages/StatusReport'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="raid-log" element={<RAIDLog />} />
        <Route path="milestones" element={<Milestones />} />
        <Route path="testing" element={<TestingHub />} />
        <Route path="meetings" element={<Meetings />} />
        <Route path="status-report" element={<StatusReport />} />
      </Route>
    </Routes>
  )
}
