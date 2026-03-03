import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LogOut } from 'lucide-react';

const TEAM_CREDENTIALS = {
  'team@project.com': { password: 'Project@2024', role: 'Team Lead' },
  'engineer@project.com': { password: 'Engineer@2024', role: 'Site Engineer' },
  'contractor@project.com': { password: 'Contractor@2024', role: 'Contractor' },
};

const PHASES_DATA = [
  { name: 'Initiation', start: 0, end: 2, color: '#10b981' },
  { name: 'Design', start: 0, end: 18, color: '#3b82f6' },
  { name: 'Procurement', start: 0, end: 24, color: '#f59e0b' },
  { name: 'Civil Works', start: 2, end: 24, color: '#8b5cf6' },
  { name: 'Boiler U1', start: 10, end: 24, color: '#ec4899' },
  { name: 'Turbine U1', start: 18, end: 28, color: '#ef4444' },
  { name: 'Electrical', start: 18, end: 32, color: '#06b6d4' },
  { name: 'Commission U1', start: 28, end: 34, color: '#14b8a6' },
  { name: 'Boiler U2', start: 14, end: 28, color: '#ec4899' },
  { name: 'Turbine U2', start: 22, end: 32, color: '#ef4444' },
  { name: 'Commission U2', start: 32, end: 38, color: '#14b8a6' },
  { name: 'Testing U1', start: 34, end: 37, color: '#f97316' },
  { name: 'Testing U2', start: 38, end: 41, color: '#f97316' },
];

// GENERATE ALL 547 L3 ACTIVITIES
function generateAllActivities() {
  const activities = [];
  const phaseData = {
    'Project Initiation': { items: 45, code: '1' },
    'Detailed Design': { items: 85, code: '2' },
    'Equipment Procurement': { items: 92, code: '3' },
    'Civil Works': { items: 78, code: '4' },
    'Boiler Erection U1': { items: 55, code: '5' },
    'Boiler Erection U2': { items: 52, code: '5.2' },
    'Turbine Erection U1': { items: 48, code: '6' },
    'Turbine Erection U2': { items: 45, code: '6.2' },
    'Electrical Systems': { items: 62, code: '7' },
    'Commissioning U1': { items: 42, code: '8' },
    'Commissioning U2': { items: 40, code: '8.2' },
    'Performance Testing U1': { items: 28, code: '9' },
    'Performance Testing U2': { items: 24, code: '9.2' },
  };

  const activityNames = [
    'Planning', 'Design', 'Review', 'Approval', 'Setup', 'Installation', 'Testing', 'Verification',
    'Assembly', 'Integration', 'Inspection', 'Analysis', 'Report', 'Documentation', 'Training',
    'Preparation', 'Execution', 'Monitoring', 'Quality Check', 'Final Sign-off'
  ];

  for (const [phase, phaseInfo] of Object.entries(phaseData)) {
    for (let i = 1; i <= phaseInfo.items; i++) {
      const name = activityNames[(i * 7) % activityNames.length];
      activities.push({
        id: `${phaseInfo.code}.${i}`,
        name: `${name} - ${phase.split(' ')[0]}`,
        phase: phase,
        start: `M${Math.floor(i / 10)}`,
        end: `M${Math.floor(i / 5)}`,
        status: 'Not Started',
        progress: 0,
        actualStart: '',
        actualEnd: ''
      });
    }
  }

  return activities;
}

const L3_ACTIVITIES = generateAllActivities();

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = TEAM_CREDENTIALS[email];
    if (user && user.password === password) {
      onLogin({ email, role: user.role });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">Dashboard</h1>
        <p className="text-gray-600 text-center mb-4">2x660 MW Thermal Plant</p>
        <p className="text-center text-sm text-gray-500 mb-6">547 L3 Activities | Gantt Chart | Statistics</p>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </div>
        <div className="mt-6 text-sm text-gray-600 border-t pt-4">
          <p className="font-bold mb-2">Demo Credentials:</p>
          <p>📧 team@project.com</p>
          <p>🔐 Project@2024</p>
        </div>
      </div>
    </div>
  );
}

function StatisticsTab({ activities }) {
  const completedCount = activities.filter(a => a.status === 'Completed').length;
  const inProgressCount = activities.filter(a => a.status === 'In Progress').length;
  const notStartedCount = activities.filter(a => a.status === 'Not Started').length;
  const totalCount = activities.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  // Chart data
  const statusChartData = [
    { name: 'Completed', value: completedCount, fill: '#10b981' },
    { name: 'In Progress', value: inProgressCount, fill: '#3b82f6' },
    { name: 'Not Started', value: notStartedCount, fill: '#d1d5db' },
  ];

  const phaseCountData = [
    { name: 'Initiation', count: 45 },
    { name: 'Design', count: 85 },
    { name: 'Procurement', count: 92 },
    { name: 'Civil Works', count: 78 },
    { name: 'Boiler U1', count: 55 },
    { name: 'Boiler U2', count: 52 },
    { name: 'Turbine U1', count: 48 },
    { name: 'Turbine U2', count: 45 },
    { name: 'Electrical', count: 62 },
    { name: 'Commission U1', count: 42 },
    { name: 'Commission U2', count: 40 },
    { name: 'Testing U1', count: 28 },
    { name: 'Testing U2', count: 24 },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-bold">Total Activities</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{totalCount}</p>
          <p className="text-xs text-gray-500 mt-1">All L3 activities</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-bold">Completed</p>
          <p className="text-4xl font-bold text-green-600 mt-2">{completedCount}</p>
          <p className="text-xs text-gray-500 mt-1">{Math.round((completedCount/totalCount)*100)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-bold">In Progress</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{inProgressCount}</p>
          <p className="text-xs text-gray-500 mt-1">{Math.round((inProgressCount/totalCount)*100)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-bold">Not Started</p>
          <p className="text-4xl font-bold text-gray-600 mt-2">{notStartedCount}</p>
          <p className="text-xs text-gray-500 mt-1">{Math.round((notStartedCount/totalCount)*100)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-bold">Overall Progress</p>
          <p className="text-4xl font-bold text-orange-600 mt-2">{overallProgress}%</p>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${overallProgress}%` }}></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Activities by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Activities by Phase */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Activities by Phase</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={phaseCountData}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Phase Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Phase</th>
                <th className="px-4 py-3 text-right font-bold">Activities</th>
                <th className="px-4 py-3 text-right font-bold">% of Total</th>
                <th className="px-4 py-3 text-left font-bold">Visual</th>
              </tr>
            </thead>
            <tbody>
              {phaseCountData.map((phase, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold text-gray-800">{phase.name}</td>
                  <td className="px-4 py-3 text-right font-bold">{phase.count}</td>
                  <td className="px-4 py-3 text-right">{Math.round((phase.count/totalCount)*100)}%</td>
                  <td className="px-4 py-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(phase.count/totalCount)*100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function GanttChartTab() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">📊 PROJECT GANTT CHART</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left font-bold w-32">Phase</th>
              <th className="text-center font-bold">Timeline (44 Months)</th>
            </tr>
          </thead>
          <tbody>
            {PHASES_DATA.map((phase, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-bold text-gray-800">{phase.name}</td>
                <td className="px-4 py-3">
                  <div className="relative bg-gray-100 rounded h-8 flex items-center" style={{ width: '1320px', minWidth: '600px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: `${(phase.start / 44) * 100}%`,
                        width: `${((phase.end - phase.start) / 44) * 100}%`,
                        backgroundColor: phase.color,
                        height: '100%',
                        borderRadius: '4px',
                        opacity: 0.8,
                        border: `2px solid ${phase.color}`,
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '8px',
                      }}
                    >
                      <span className="text-white text-xs font-bold">M{phase.start}-M{phase.end}</span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="font-bold mb-2">🎯 Key Milestones:</p>
        <p className="text-sm">Month 18: Design ✓ | Month 24: Equipment ✓ | Month 37: Unit-1 COD ✅ | Month 41: Unit-2 COD ✅</p>
      </div>
    </div>
  );
}

function ActivitiesTab() {
  const [filterPhase, setFilterPhase] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState(L3_ACTIVITIES);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ actualStart: '', actualEnd: '', progress: 0, status: 'Not Started' });
  const [sortBy, setSortBy] = useState('id');

  const phases = ['All', ...new Set(activities.map(a => a.phase))];
  const statuses = ['All', 'Not Started', 'In Progress', 'Completed'];

  let filtered = activities.filter(a => 
    (filterPhase === 'All' || a.phase === filterPhase) &&
    (filterStatus === 'All' || a.status === filterStatus) &&
    (a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.includes(searchTerm))
  );

  if (sortBy === 'progress') {
    filtered.sort((a, b) => b.progress - a.progress);
  }

  const handleLog = (id) => {
    const activity = activities.find(a => a.id === id);
    setSelectedId(id);
    setFormData({
      actualStart: activity.actualStart,
      actualEnd: activity.actualEnd,
      progress: activity.progress,
      status: activity.status,
    });
    setShowForm(true);
  };

  const handleSave = () => {
    setActivities(activities.map(a => a.id === selectedId ? { ...a, ...formData } : a));
    setShowForm(false);
    alert('✅ Activity saved successfully!');
  };

  const completedCount = activities.filter(a => a.status === 'Completed').length;
  const inProgressCount = activities.filter(a => a.status === 'In Progress').length;

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📋 L3 SCHEDULE ACTIVITIES</h2>
          <div className="text-right text-sm text-gray-600">
            <p className="font-bold text-lg text-blue-600">{filtered.length} / {activities.length}</p>
            <p>✅ {completedCount} | 🔄 {inProgressCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold mb-2">Phase</label>
            <select value={filterPhase} onChange={(e) => setFilterPhase(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              {phases.map(p => <option key={p} value={p}>{p === 'All' ? 'All Phases' : p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Sort</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
              <option value="id">By ID</option>
              <option value="progress">By Progress</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="overflow-x-auto border rounded max-h-96 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-bold">ID</th>
                <th className="px-4 py-3 text-left font-bold">Activity Name</th>
                <th className="px-4 py-3 text-left font-bold">Phase</th>
                <th className="px-4 py-3 text-left font-bold">Status</th>
                <th className="px-4 py-3 text-left font-bold">Progress</th>
                <th className="px-4 py-3 text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-t hover:bg-blue-50">
                  <td className="px-4 py-3 font-bold text-xs font-mono">{a.id}</td>
                  <td className="px-4 py-3 text-sm">{a.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{a.phase.substring(0, 15)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      a.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      a.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-12 bg-gray-200 rounded h-2">
                      <div className="bg-blue-600 h-2 rounded" style={{ width: `${a.progress}%` }}></div>
                    </div>
                    <span className="text-xs">{a.progress}%</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => handleLog(a.id)} className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-blue-700">Log</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-2">Showing {filtered.length} of {activities.length} activities</p>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Log Activity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Start Date</label>
                <input type="date" value={formData.actualStart} onChange={(e) => setFormData({ ...formData, actualStart: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">End Date</label>
                <input type="date" value={formData.actualEnd} onChange={(e) => setFormData({ ...formData, actualEnd: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Progress: {formData.progress}%</label>
                <input type="range" min="0" max="100" value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-bold">Cancel</button>
                <button onClick={handleSave} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Dashboard({ user, onLogout }) {
  const [tab, setTab] = useState('statistics');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Project Dashboard</h1>
            <p className="text-sm text-gray-600">{user.role} | 547 L3 Activities | Statistics | Gantt</p>
          </div>
          <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 flex items-center gap-2">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex gap-0 flex-wrap">
          {[
            { id: 'statistics', label: '📊 Statistics' }, 
            { id: 'activities', label: '📋 L3 Activities (547)' }, 
            { id: 'gantt', label: '📈 Gantt Chart' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-4 font-bold border-b-2 transition ${
                tab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {tab === 'statistics' && <StatisticsTab activities={L3_ACTIVITIES} />}
        {tab === 'activities' && <ActivitiesTab />}
        {tab === 'gantt' && <GanttChartTab />}
      </main>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  return isLoggedIn && user ? (
    <Dashboard user={user} onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <LoginPage onLogin={(u) => {
      setUser(u);
      setIsLoggedIn(true);
    }} />
  );
}
