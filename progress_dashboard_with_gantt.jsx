import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, X, LogOut, Plus, Edit2, CheckCircle, AlertCircle, Clock, TrendingUp, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================================================
// ENHANCED DASHBOARD WITH GANTT CHART & L3 ACTIVITIES
// 2x660 MW Thermal Power Plant Project
// ============================================================================

const TEAM_CREDENTIALS = {
  'team@project.com': { password: 'Project@2024', role: 'Team Lead' },
  'engineer@project.com': { password: 'Engineer@2024', role: 'Site Engineer' },
  'contractor@project.com': { password: 'Contractor@2024', role: 'Contractor' },
};

// ============================================================================
// PROJECT PHASES DATA FOR GANTT CHART
// ============================================================================

const PROJECT_PHASES = [
  { id: 1, name: 'Project Initiation & Mobilization', startMonth: 0, endMonth: 2, actualStart: 0, actualEnd: 2, status: 'Completed', color: '#10b981', progress: 100 },
  { id: 2, name: 'Detailed Design Engineering', startMonth: 0, endMonth: 18, actualStart: 0, actualEnd: 5, status: 'In Progress', color: '#3b82f6', progress: 28 },
  { id: 3, name: 'Equipment Procurement', startMonth: 0, endMonth: 24, actualStart: 0, actualEnd: 3, status: 'In Progress', color: '#f59e0b', progress: 15 },
  { id: 4, name: 'Civil Works & Infrastructure', startMonth: 2, endMonth: 24, actualStart: 2, actualEnd: 2, status: 'Not Started', color: '#8b5cf6', progress: 0 },
  { id: 5, name: 'Boiler Erection - Unit 1', startMonth: 10, endMonth: 24, actualStart: 10, actualEnd: 10, status: 'Not Started', color: '#ec4899', progress: 0 },
  { id: 6, name: 'Boiler Erection - Unit 2', startMonth: 14, endMonth: 28, actualStart: 14, actualEnd: 14, status: 'Not Started', color: '#ec4899', progress: 0 },
  { id: 7, name: 'Turbine-Generator Erection - Unit 1', startMonth: 18, endMonth: 28, actualStart: 18, actualEnd: 18, status: 'Not Started', color: '#ef4444', progress: 0 },
  { id: 8, name: 'Turbine-Generator Erection - Unit 2', startMonth: 22, endMonth: 32, actualStart: 22, actualEnd: 22, status: 'Not Started', color: '#ef4444', progress: 0 },
  { id: 9, name: 'Electrical & Control Systems', startMonth: 18, endMonth: 32, actualStart: 18, actualEnd: 18, status: 'Not Started', color: '#06b6d4', progress: 0 },
  { id: 10, name: 'Commissioning - Unit 1', startMonth: 28, endMonth: 34, actualStart: 28, actualEnd: 28, status: 'Not Started', color: '#14b8a6', progress: 0 },
  { id: 11, name: 'Commissioning - Unit 2', startMonth: 32, endMonth: 38, actualStart: 32, actualEnd: 32, status: 'Not Started', color: '#14b8a6', progress: 0 },
  { id: 12, name: 'Performance Testing & COD - Unit 1', startMonth: 34, endMonth: 37, actualStart: 34, actualEnd: 34, status: 'Not Started', color: '#f97316', progress: 0 },
  { id: 13, name: 'Performance Testing & COD - Unit 2', startMonth: 38, endMonth: 41, actualStart: 38, actualEnd: 38, status: 'Not Started', color: '#f97316', progress: 0 },
];

const KEY_MILESTONES = [
  { month: 18, label: 'Design Complete', color: '#3b82f6' },
  { month: 24, label: 'Equipment Delivery', color: '#f59e0b' },
  { month: 28, label: 'U1 Erection Done', color: '#ef4444' },
  { month: 32, label: 'U2 Erection Done', color: '#ef4444' },
  { month: 34, label: 'U1 Sync', color: '#10b981' },
  { month: 37, label: 'Unit-1 COD ✅', color: '#059669', isCritical: true },
  { month: 38, label: 'U2 Sync', color: '#10b981' },
  { month: 41, label: 'Unit-2 COD ✅', color: '#059669', isCritical: true },
];

// ============================================================================
// L3 ACTIVITIES DATA
// ============================================================================

const L3_ACTIVITIES = [
  { id: '1.1.1.1', phase: 'Project Initiation & Mobilization', activity: 'Stakeholder Meeting & Project Briefing', plannedStart: 'Month 0', plannedEnd: 'Month 0', duration: '3 days', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '1.1.1.2', phase: 'Project Initiation & Mobilization', activity: 'Document Meeting Minutes & Action Items', plannedStart: 'Month 0', plannedEnd: 'Month 0', duration: '1 day', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '2.1.1.1', phase: 'Detailed Design Engineering', activity: 'Design Standards & Codes Review', plannedStart: 'Month 0', plannedEnd: 'Month 0', duration: '2 days', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '2.1.1.2', phase: 'Detailed Design Engineering', activity: 'Performance Specification Review', plannedStart: 'Month 0', plannedEnd: 'Month 0', duration: '2 days', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '2.1.2.1', phase: 'Detailed Design Engineering', activity: 'Coal Combustion Analysis', plannedStart: 'Month 0', plannedEnd: 'Month 1', duration: '2 days', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '3.1.1.1', phase: 'Equipment Procurement', activity: 'Finalize RFQ Technical Document', plannedStart: 'Month 0', plannedEnd: 'Month 0', duration: '1 day', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '3.1.2.1', phase: 'Equipment Procurement', activity: 'Vendor Technical Assessment', plannedStart: 'Month 0', plannedEnd: 'Month 1', duration: '2 days', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '4.1.1.1', phase: 'Civil Works & Infrastructure', activity: 'Foundation Layout & Marking', plannedStart: 'Month 2', plannedEnd: 'Month 2', duration: '3 days', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '4.1.1.2', phase: 'Civil Works & Infrastructure', activity: 'Excavation - Boiler House', plannedStart: 'Month 2', plannedEnd: 'Month 2', duration: '5 days', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
  { id: '5.1.1.1', phase: 'Boiler Erection - Unit 1', activity: 'Boiler Foundation Preparation', plannedStart: 'Month 10', plannedEnd: 'Month 10', duration: '2 days', actualStart: null, actualEnd: null, progress: 0, status: 'Not Started', assignee: '' },
];

// ============================================================================
// GANTT CHART COMPONENT
// ============================================================================

function GanttChart() {
  const totalMonths = 44;
  const monthWidth = 30;
  const [expandedPhase, setExpandedPhase] = useState(null);

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Project Gantt Chart</h3>
      
      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Not Started</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-4 bg-red-600"></div>
          <span>Critical Milestone</span>
        </div>
      </div>

      {/* Gantt Timeline */}
      <div className="overflow-x-auto border rounded-lg">
        <div style={{ minWidth: `${60 + totalMonths * monthWidth}px` }}>
          {/* Month Header */}
          <div className="flex bg-gray-100 border-b sticky top-0 z-20">
            <div style={{ width: '250px' }} className="border-r p-2 font-bold text-sm bg-gray-200">Phase Name</div>
            <div className="flex" style={{ width: `${totalMonths * monthWidth}px` }}>
              {Array.from({ length: totalMonths }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: `${monthWidth}px` }}
                  className="border-r text-center text-xs font-bold text-gray-600 p-1"
                >
                  {i % 3 === 0 ? `M${i}` : ''}
                </div>
              ))}
            </div>
          </div>

          {/* Phase Rows */}
          {PROJECT_PHASES.map((phase) => (
            <div key={phase.id} className="flex border-b hover:bg-blue-50">
              {/* Phase Name */}
              <div
                style={{ width: '250px' }}
                className="border-r p-3 text-sm font-bold text-gray-800 bg-gray-50 flex items-center"
              >
                <div className="flex-1">{phase.name}</div>
              </div>

              {/* Gantt Bar */}
              <div className="flex" style={{ width: `${totalMonths * monthWidth}px`, position: 'relative' }}>
                {/* Planned Duration */}
                <div
                  style={{
                    marginLeft: `${phase.startMonth * monthWidth}px`,
                    width: `${(phase.endMonth - phase.startMonth) * monthWidth}px`,
                    backgroundColor: phase.color,
                    opacity: 0.3,
                    borderLeft: `3px solid ${phase.color}`,
                  }}
                  className="h-12 border-r flex items-center justify-center relative"
                >
                  <span className="text-xs font-bold text-gray-700 absolute">
                    {phase.endMonth - phase.startMonth}M
                  </span>
                </div>

                {/* Actual Duration Overlay */}
                {phase.actualStart !== null && (
                  <div
                    style={{
                      marginLeft: `${phase.actualStart * monthWidth - phase.startMonth * monthWidth}px`,
                      width: `${(phase.actualEnd - phase.actualStart) * monthWidth}px`,
                      backgroundColor: phase.color,
                      opacity: 0.8,
                      height: '50%',
                      top: '25%',
                      position: 'absolute',
                      border: `2px solid ${phase.color}`,
                    }}
                  />
                )}
              </div>

              {/* Status Badge */}
              <div className="p-3 w-24 flex items-center justify-center">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    phase.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : phase.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {phase.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Legend */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-bold text-gray-800 mb-2">📌 Key Milestones:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {KEY_MILESTONES.map((milestone, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                style={{
                  width: milestone.isCritical ? '6px' : '4px',
                  height: '16px',
                  backgroundColor: milestone.color,
                }}
                className="rounded"
              />
              <span className="text-sm font-semibold text-gray-700">
                Month {milestone.month}: {milestone.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gantt Info */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p>
          <strong>Light bars:</strong> Planned duration | <strong>Dark bars:</strong> Actual progress
        </p>
        <p>
          <strong>Unit-1 COD Target:</strong> Month 37 | <strong>Unit-2 COD Target:</strong> Month 41
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// LOGIN COMPONENT
// ============================================================================
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const user = TEAM_CREDENTIALS[email];
    if (user && user.password === password) {
      onLogin({ email, role: user.role });
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Project Dashboard</h1>
          <p className="text-gray-600">2x660 MW Thermal Power Plant</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@project.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600 mb-1">📧 team@project.com | 🔐 Project@2024</p>
          <p className="text-xs text-gray-600 mb-1">📧 engineer@project.com | 🔐 Engineer@2024</p>
          <p className="text-xs text-gray-600">📧 contractor@project.com | 🔐 Contractor@2024</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================
function Dashboard({ user, onLogout }) {
  const [currentView, setCurrentView] = useState('overview');
  const [activities, setActivities] = useState(L3_ACTIVITIES);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filterPhase, setFilterPhase] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showActivityForm, setShowActivityForm] = useState(false);
  
  const [activityForm, setActivityForm] = useState({
    actualStart: '',
    actualEnd: '',
    progress: 0,
    status: 'Not Started',
    assignee: '',
    notes: ''
  });

  const phases = ['All', ...new Set(activities.map(a => a.phase))];
  const statuses = ['All', 'Not Started', 'In Progress', 'Completed'];

  const filteredActivities = activities.filter(activity => {
    const matchPhase = filterPhase === 'All' || activity.phase === filterPhase;
    const matchStatus = filterStatus === 'All' || activity.status === filterStatus;
    const matchSearch = activity.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       activity.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchPhase && matchStatus && matchSearch;
  });

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
    setActivityForm({
      actualStart: activity.actualStart || '',
      actualEnd: activity.actualEnd || '',
      progress: activity.progress,
      status: activity.status,
      assignee: activity.assignee || '',
      notes: ''
    });
    setShowActivityForm(true);
  };

  const handleSaveActivity = () => {
    if (!selectedActivity) return;

    setActivities(activities.map(a => 
      a.id === selectedActivity.id 
        ? {
            ...a,
            actualStart: activityForm.actualStart,
            actualEnd: activityForm.actualEnd,
            progress: parseInt(activityForm.progress),
            status: activityForm.status,
            assignee: activityForm.assignee
          }
        : a
    ));

    setShowActivityForm(false);
    setSelectedActivity(null);
    alert('✅ Activity updated successfully!');
  };

  const completedActivities = activities.filter(a => a.status === 'Completed').length;
  const inProgressActivities = activities.filter(a => a.status === 'In Progress').length;
  const notStartedActivities = activities.filter(a => a.status === 'Not Started').length;
  const overallProgress = Math.round((completedActivities / activities.length) * 100);

  // ========================================================================
  // OVERVIEW TAB
  // ========================================================================
  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Overall Progress</p>
          <p className="text-3xl font-bold text-blue-600">{overallProgress}%</p>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${overallProgress}%` }}></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Activities Completed</p>
          <p className="text-3xl font-bold text-green-600">{completedActivities}</p>
          <p className="text-xs text-gray-500 mt-2">of {activities.length} total</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">In Progress</p>
          <p className="text-3xl font-bold text-orange-600">{inProgressActivities}</p>
          <p className="text-xs text-gray-500 mt-2">Active activities</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Not Started</p>
          <p className="text-3xl font-bold text-gray-600">{notStartedActivities}</p>
          <p className="text-xs text-gray-500 mt-2">Pending</p>
        </div>
      </div>

      {/* Gantt Chart on Overview */}
      <GanttChart />
    </div>
  );

  // ========================================================================
  // GANTT CHART TAB
  // ========================================================================
  const GanttTab = () => <GanttChart />;

  // ========================================================================
  // L3 ACTIVITIES TAB
  // ========================================================================
  const DailyTrackingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 L3 Schedule Activities</h3>
        
        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phase</label>
            <select
              value={filterPhase}
              onChange={(e) => setFilterPhase(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {phases.map(phase => (
                <option key={phase} value={phase}>{phase}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Activity</label>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by activity name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Activities</p>
            <p className="text-2xl font-bold text-blue-600">{filteredActivities.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">{filteredActivities.filter(a => a.status === 'Completed').length}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-orange-600">{filteredActivities.filter(a => a.status === 'In Progress').length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Not Started</p>
            <p className="text-2xl font-bold text-gray-600">{filteredActivities.filter(a => a.status === 'Not Started').length}</p>
          </div>
        </div>

        {/* Activities Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Activity ID</th>
                <th className="px-4 py-3 text-left font-bold">Activity Name</th>
                <th className="px-4 py-3 text-left font-bold">Phase</th>
                <th className="px-4 py-3 text-left font-bold">Status</th>
                <th className="px-4 py-3 text-left font-bold">Progress</th>
                <th className="px-4 py-3 text-left font-bold">Start</th>
                <th className="px-4 py-3 text-left font-bold">End</th>
                <th className="px-4 py-3 text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((activity) => (
                <tr key={activity.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs font-bold">{activity.id}</td>
                  <td className="px-4 py-3 text-sm">{activity.activity}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{activity.phase.substring(0, 20)}...</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-12 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{activity.progress}%</span>
                  </td>
                  <td className="px-4 py-3 text-xs">{activity.actualStart || '-'}</td>
                  <td className="px-4 py-3 text-xs">{activity.actualEnd || '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleSelectActivity(activity)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-bold"
                    >
                      Log
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Logging Form Modal */}
      {showActivityForm && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Log Activity: {selectedActivity.id}
            </h3>

            <div className="space-y-4">
              {/* Activity Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-800">{selectedActivity.activity}</p>
                <p className="text-sm text-gray-600">Phase: {selectedActivity.phase}</p>
                <p className="text-sm text-gray-600">Planned: {selectedActivity.plannedStart} to {selectedActivity.plannedEnd}</p>
              </div>

              {/* Actual Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Actual Start Date</label>
                <input
                  type="date"
                  value={activityForm.actualStart}
                  onChange={(e) => setActivityForm({ ...activityForm, actualStart: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Actual End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Actual End Date</label>
                <input
                  type="date"
                  value={activityForm.actualEnd}
                  onChange={(e) => setActivityForm({ ...activityForm, actualEnd: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Progress % */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Progress (%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={activityForm.progress}
                  onChange={(e) => setActivityForm({ ...activityForm, progress: e.target.value })}
                  className="w-full"
                />
                <div className="text-center text-lg font-bold text-blue-600">{activityForm.progress}%</div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={activityForm.status}
                  onChange={(e) => setActivityForm({ ...activityForm, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <input
                  type="text"
                  placeholder="Name or email"
                  value={activityForm.assignee}
                  onChange={(e) => setActivityForm({ ...activityForm, assignee: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowActivityForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveActivity}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                >
                  Save Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Progress Dashboard</h1>
            <p className="text-sm text-gray-600">{user.role}</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-0 flex-wrap">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'gantt', label: 'Gantt Chart', icon: '📈' },
              { id: 'daily', label: 'L3 Activities', icon: '📋' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`px-6 py-4 font-medium whitespace-nowrap border-b-2 transition ${
                  currentView === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'overview' && <OverviewTab />}
        {currentView === 'gantt' && <GanttTab />}
        {currentView === 'daily' && <DailyTrackingTab />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>2x660 MW Thermal Power Plant | Progress Dashboard with Gantt Chart</p>
          <p className="text-gray-400 text-xs mt-1">L3 Activities + Visual Timeline + Real-time Tracking</p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return isAuthenticated && currentUser ? (
    <Dashboard user={currentUser} onLogout={handleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}
