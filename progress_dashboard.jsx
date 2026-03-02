import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Menu, X, LogOut, Plus, Edit2, CheckCircle, AlertCircle, Clock, TrendingUp } from 'lucide-react';

// ============================================================================
// PROGRESS TRACKING DASHBOARD - SECURE TEAM VERSION
// 2x660 MW Thermal Power Plant Project
// ============================================================================

// Mock authentication (in production, use Firebase, Auth0, or similar)
const TEAM_CREDENTIALS = {
  'team@project.com': { password: 'Project@2024', role: 'Team Lead' },
  'engineer@project.com': { password: 'Engineer@2024', role: 'Site Engineer' },
  'contractor@project.com': { password: 'Contractor@2024', role: 'Contractor' },
};

// Daily Progress Data Structure
const INITIAL_PROJECT_DATA = {
  projectName: '2x660 MW Supercritical Thermal Power Plant',
  location: 'Nagpur, Maharashtra',
  contractor: 'BHEL',
  totalDuration: 44,
  currentMonth: 3,
  phases: [
    {
      id: 1,
      name: 'Project Initiation & Mobilization',
      plannedDuration: 2,
      actualDuration: 2.5,
      plannedStart: 0,
      actualStart: 0,
      status: 'Completed',
      completion: 100,
      resources: 12,
      budget: 5000000,
      spent: 5200000,
    },
    {
      id: 2,
      name: 'Detailed Design Engineering',
      plannedDuration: 18,
      actualDuration: 5,
      plannedStart: 0,
      actualStart: 0,
      status: 'In Progress',
      completion: 28,
      resources: 32,
      budget: 45000000,
      spent: 12600000,
    },
    {
      id: 3,
      name: 'Equipment Procurement',
      plannedDuration: 24,
      actualDuration: 3,
      plannedStart: 0,
      actualStart: 0,
      status: 'In Progress',
      completion: 15,
      resources: 18,
      budget: 850000000,
      spent: 127500000,
    },
    {
      id: 4,
      name: 'Civil Works & Infrastructure',
      plannedDuration: 22,
      actualDuration: 0,
      plannedStart: 2,
      actualStart: 2,
      status: 'Not Started',
      completion: 0,
      resources: 0,
      budget: 125000000,
      spent: 0,
    },
    {
      id: 5,
      name: 'Boiler Erection - Unit 1',
      plannedDuration: 14,
      actualDuration: 0,
      plannedStart: 10,
      actualStart: 10,
      status: 'Not Started',
      completion: 0,
      resources: 0,
      budget: 75000000,
      spent: 0,
    },
    {
      id: 6,
      name: 'Turbine-Generator Erection - Unit 1',
      plannedDuration: 10,
      actualDuration: 0,
      plannedStart: 18,
      actualStart: 18,
      status: 'Not Started',
      completion: 0,
      resources: 0,
      budget: 95000000,
      spent: 0,
    },
    {
      id: 7,
      name: 'Commissioning - Unit 1',
      plannedDuration: 6,
      actualDuration: 0,
      plannedStart: 28,
      actualStart: 28,
      status: 'Not Started',
      completion: 0,
      resources: 0,
      budget: 25000000,
      spent: 0,
    },
    {
      id: 8,
      name: 'Performance Testing & COD - Unit 1',
      plannedDuration: 3,
      actualDuration: 0,
      plannedStart: 34,
      actualStart: 34,
      status: 'Not Started',
      completion: 0,
      resources: 0,
      budget: 15000000,
      spent: 0,
    },
  ],
  dailyActivities: [
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      phase: 'Detailed Design Engineering',
      activity: 'Boiler Furnace Design - Heat Balance Calculation',
      plannedHours: 8,
      actualHours: 7.5,
      progress: 85,
      assignee: 'Raj Kumar (Senior Design Engineer)',
      status: 'In Progress',
      notes: 'Heat balance calculations 85% complete. FEA analysis scheduled for next phase.',
    },
    {
      id: 2,
      date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0],
      phase: 'Detailed Design Engineering',
      activity: 'Turbine Design - Rotor Dynamics Analysis',
      plannedHours: 8,
      actualHours: 8,
      progress: 100,
      assignee: 'Priya Singh (Turbine Design Lead)',
      status: 'Completed',
      notes: 'Rotor dynamics analysis completed. Critical speed identified at 4200 RPM.',
    },
    {
      id: 3,
      date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0],
      phase: 'Equipment Procurement',
      activity: 'Boiler Vendor - Technical Bid Evaluation',
      plannedHours: 8,
      actualHours: 9,
      progress: 100,
      assignee: 'Vikram Patel (Procurement Manager)',
      status: 'Completed',
      notes: 'BHEL bid evaluated. Technical compliance confirmed. Commercial negotiation in progress.',
    },
  ],
  keyMilestones: [
    { id: 1, name: 'Design Engineering Complete', plannedDate: '2026-06-30', actualDate: null, status: 'In Progress' },
    { id: 2, name: 'Equipment Orders Placed', plannedDate: '2026-02-28', actualDate: '2026-03-05', status: 'Completed' },
    { id: 3, name: 'Civil Works Start', plannedDate: '2026-05-01', actualDate: null, status: 'Pending' },
    { id: 4, name: 'Boiler Erection Start', plannedDate: '2026-10-01', actualDate: null, status: 'Pending' },
    { id: 5, name: 'Unit-1 COD', plannedDate: '2029-01-31', actualDate: null, status: 'Pending' },
  ],
};

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('overview');
  const [projectData, setProjectData] = useState(INITIAL_PROJECT_DATA);
  const [newDailyActivity, setNewDailyActivity] = useState(null);

  // Calculate overall project metrics
  const totalBudget = projectData.phases.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projectData.phases.reduce((sum, p) => sum + p.spent, 0);
  const overallCompletion = Math.round(
    projectData.phases.reduce((sum, p) => sum + p.completion, 0) / projectData.phases.length
  );
  const totalResources = projectData.phases.reduce((sum, p) => sum + p.resources, 0);

  // Prepare data for charts
  const phaseProgressData = projectData.phases.map(p => ({
    name: p.name.substring(0, 15) + '...',
    planned: p.plannedDuration,
    actual: p.actualDuration,
  }));

  const budgetData = projectData.phases.map(p => ({
    name: p.name.substring(0, 12),
    spent: p.spent / 1000000,
    budget: p.budget / 1000000,
  }));

  const completionData = projectData.phases.map(p => ({
    name: p.name.substring(0, 12),
    value: p.completion,
  }));

  const handleAddDailyActivity = () => {
    if (newDailyActivity) {
      setProjectData(prev => ({
        ...prev,
        dailyActivities: [newDailyActivity, ...prev.dailyActivities],
      }));
      setNewDailyActivity(null);
    }
  };

  // ========================================================================
  // OVERVIEW TAB
  // ========================================================================
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overall Progress</p>
              <p className="text-3xl font-bold text-blue-600">{overallCompletion}%</p>
            </div>
            <TrendingUp className="text-blue-600" size={32} />
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${overallCompletion}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Project Duration</p>
              <p className="text-3xl font-bold text-green-600">{projectData.currentMonth}/{projectData.totalDuration}M</p>
            </div>
            <Clock className="text-green-600" size={32} />
          </div>
          <p className="text-xs text-gray-500 mt-2">Months Elapsed / Total</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Budget Status</p>
              <p className="text-3xl font-bold text-orange-600">
                {((totalSpent / totalBudget) * 100).toFixed(0)}%
              </p>
            </div>
            <AlertCircle className="text-orange-600" size={32} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ₹{(totalSpent / 100000000).toFixed(1)}Cr / ₹{(totalBudget / 100000000).toFixed(1)}Cr
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Team Size</p>
              <p className="text-3xl font-bold text-purple-600">{totalResources}</p>
            </div>
            <CheckCircle className="text-purple-600" size={32} />
          </div>
          <p className="text-xs text-gray-500 mt-2">Active Resources</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase Progress Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Phase Progress (Planned vs Actual)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={phaseProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" fill="#3b82f6" name="Planned (months)" />
              <Bar dataKey="actual" fill="#ef4444" name="Actual (months)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Overall Completion Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Completion Status by Phase</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={completionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {completionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Budget Tracking */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Budget Tracking by Phase</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis label={{ value: 'Cost (Crores)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value) => `₹${value}Cr`} />
            <Legend />
            <Bar dataKey="spent" fill="#ef4444" name="Spent" />
            <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  // ========================================================================
  // DAILY TRACKING TAB
  // ========================================================================
  const DailyTrackingTab = () => (
    <div className="space-y-6">
      {/* Add New Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Log Daily Activity</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Activity name"
            value={newDailyActivity?.activity || ''}
            onChange={(e) => setNewDailyActivity({ ...newDailyActivity, activity: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select
            value={newDailyActivity?.phase || ''}
            onChange={(e) => setNewDailyActivity({ ...newDailyActivity, phase: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Phase</option>
            {projectData.phases.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
          <textarea
            placeholder="Notes (optional)"
            value={newDailyActivity?.notes || ''}
            onChange={(e) => setNewDailyActivity({ ...newDailyActivity, notes: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="3"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Planned Hours"
              value={newDailyActivity?.plannedHours || ''}
              onChange={(e) => setNewDailyActivity({ ...newDailyActivity, plannedHours: parseInt(e.target.value) })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Actual Hours"
              value={newDailyActivity?.actualHours || ''}
              onChange={(e) => setNewDailyActivity({ ...newDailyActivity, actualHours: parseInt(e.target.value) })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handleAddDailyActivity}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Log Activity
          </button>
        </div>
      </div>

      {/* Daily Activities List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold text-gray-800">Recent Activities</h3>
        </div>
        <div className="divide-y">
          {projectData.dailyActivities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-500">{activity.date}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      activity.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      activity.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mt-2">{activity.activity}</h4>
                  <p className="text-sm text-gray-600 mt-1">Phase: {activity.phase}</p>
                  <p className="text-sm text-gray-600">Assignee: {activity.assignee}</p>
                  {activity.notes && <p className="text-sm text-gray-600 mt-2 italic">{activity.notes}</p>}
                </div>
                <div className="ml-4 text-right">
                  <div className="text-2xl font-bold text-blue-600">{activity.progress}%</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {activity.actualHours}h / {activity.plannedHours}h
                  </div>
                </div>
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${activity.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ========================================================================
  // PHASE DETAILS TAB
  // ========================================================================
  const PhaseDetailsTab = () => (
    <div className="space-y-4">
      {projectData.phases.map((phase) => (
        <div key={phase.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800">{phase.name}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className={`font-bold ${
                    phase.status === 'Completed' ? 'text-green-600' :
                    phase.status === 'In Progress' ? 'text-blue-600' :
                    'text-gray-400'
                  }`}>{phase.status}</p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-bold">{phase.actualDuration}/{phase.plannedDuration}M</p>
                </div>
                <div>
                  <p className="text-gray-500">Resources</p>
                  <p className="font-bold">{phase.resources} people</p>
                </div>
                <div>
                  <p className="text-gray-500">Budget Used</p>
                  <p className="font-bold">₹{(phase.spent / 100000000).toFixed(1)}Cr</p>
                </div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <div className="text-3xl font-bold text-blue-600">{phase.completion}%</div>
              <p className="text-xs text-gray-500 mt-1">Complete</p>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full"
              style={{ width: `${phase.completion}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  // ========================================================================
  // MILESTONES TAB
  // ========================================================================
  const MilestonesTab = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Milestone</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Planned Date</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Actual Date</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {projectData.keyMilestones.map((milestone) => (
            <tr key={milestone.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">{milestone.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{milestone.plannedDate}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{milestone.actualDate || '—'}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`font-bold px-3 py-1 rounded-full text-xs ${
                  milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {milestone.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Progress Dashboard</h1>
            <p className="text-sm text-gray-600">{projectData.projectName}</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white p-4 space-y-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-800">{user.email}</div>
            <div className="px-4 py-2 text-xs text-gray-500">{user.role}</div>
            <button
              onClick={onLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'daily', label: 'Daily Tracking', icon: '📅' },
              { id: 'phases', label: 'Phase Details', icon: '📈' },
              { id: 'milestones', label: 'Milestones', icon: '🎯' },
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
        {currentView === 'daily' && <DailyTrackingTab />}
        {currentView === 'phases' && <PhaseDetailsTab />}
        {currentView === 'milestones' && <MilestonesTab />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <p>2x660 MW Supercritical Thermal Power Plant | Progress Tracking Dashboard</p>
          <p className="text-gray-400 text-xs mt-1">Nagpur, Maharashtra | BHEL Contractor</p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
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