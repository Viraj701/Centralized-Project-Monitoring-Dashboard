import React, { useState } from 'react';
import { LogOut, Download } from 'lucide-react';

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
  let counter = 1;

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

  const activityTemplates = {
    'Project Initiation': [
      'Kickoff Meeting', 'Project Charter', 'Stakeholder Review', 'Resource Planning', 'Schedule Baseline',
      'Quality Planning', 'Risk Assessment', 'Communication Plan', 'Site Mobilization', 'Team Setup',
      'Survey & Mapping', 'Soil Investigation', 'Boundary Marking', 'Access Routes', 'Safety Plan',
      'Environmental Assessment', 'Permit Applications', 'Land Clearance', 'Temporary Facilities', 'Equipment Setup',
      'Office Setup', 'MIS Installation', 'Network Setup', 'Protocol Definition', 'Vendor Coordination',
      'Contract Review', 'Insurance Setup', 'Document Management', 'Training Program', 'Orientation',
      'Team Briefing', 'Schedule Planning', 'Budget Allocation', 'Procurement Planning', 'Logistics Planning',
      'Quality Standards', 'Safety Procedures', 'Environmental Plan', 'Community Engagement', 'Baseline Photo',
      'Equipment Inventory', 'Tool Allocation', 'Personnel Assignment', 'Support Services', 'Final Approval'
    ],
    'Detailed Design': [
      'Design Standards Review', 'Performance Specifications', 'Thermal Analysis', 'Heat Balance', 'Combustion Design',
      'Furnace Design', 'Waterwall Design', 'Superheater Design', 'Reheater Design', 'Economizer Design',
      'Air Heater Design', 'Steam System Design', 'Feed Water System', 'Cooling System', 'Blowdown System',
      'Fuel Handling Design', 'Ash Handling Design', 'Boiler Supports', 'Boiler Connections', 'Safety Systems',
      'Control Systems Design', 'Instrumentation Plan', 'Turbine Inlet Design', 'Steam Path Design', 'Bearing Design',
      'Rotor Design', 'Blade Design', 'Coupling Design', 'Sealing System', 'Lubrication System',
      'Gland Steam System', 'Generator Design', 'Exciter Design', 'Cooling System', 'Grounding Design',
      'Foundation Design', 'Support Structure', 'Piping Routing', 'Cable Routing', 'HVAC Design',
      'Control Building Design', 'Admin Building Design', 'Workshop Design', 'Storage Design', 'Electrical Room',
      'Power System Design', 'Protection Relays', 'Switchyard Design', 'Substation Design', 'Cable Specifications',
      'Transformer Design', 'Generator Connections', 'Grid Connections', 'Backup Power', 'UPS System',
      'DCS System', 'PLCs & Sensors', 'Fire Safety', 'Lighting Design', 'Communication Network',
      'Water Treatment', 'Chemical Handling', 'Waste Management', 'Environmental Controls', 'Noise Mitigation',
      'Vibration Analysis', 'Stress Analysis', 'FEA Analysis', 'CFD Analysis', 'Hydraulic Systems',
      'Pneumatic Systems', 'Mechanical Systems', 'Rotating Equipment', 'Valves Selection', 'Pump Selection',
      'Heat Exchanger', 'Condenser Design', 'Cooling Tower', 'Water Circulation', 'Treatment Chemicals',
      'Instrumentation Specs', 'Sensor Locations', 'Control Room Layout', 'Safety Interlocks', 'Emergency Systems',
      'Testing Procedures', 'Commissioning Plan', 'Performance Testing', 'Factory Acceptance', 'Documentation'
    ],
    'Equipment Procurement': [
      'RFQ Preparation', 'Technical Specifications', 'Commercial Terms', 'Vendor Identification', 'Vendor Evaluation',
      'Vendor Selection', 'PO Issuance', 'Order Confirmation', 'Engineering Review', 'Drawing Approval',
      'Material Certification', 'Quality Assurance Plan', 'Inspection Points', 'Testing Protocol', 'Boiler Manufacturing',
      'Boiler Assembly', 'Boiler Testing', 'Boiler Certification', 'Pressure Vessel Inspection', 'NDT Testing',
      'Turbine Manufacturing', 'Turbine Assembly', 'Rotor Machining', 'Blade Installation', 'Turbine Testing',
      'Turbine Balancing', 'Generator Manufacturing', 'Stator Manufacturing', 'Rotor Manufacturing', 'Generator Assembly',
      'Transformer Procurement', 'Switchgear Procurement', 'Protection Devices', 'Cables Procurement', 'Cable Accessories',
      'Instrumentation Procurement', 'Control System Components', 'PLC & Sensors', 'DCS System', 'Display Screens',
      'Structural Steel Fabrication', 'Civil Construction Materials', 'Piping Materials', 'Valve Procurement', 'Pump Procurement',
      'Heat Exchanger Manufacturing', 'Condenser Manufacturing', 'Cooling Tower Procurement', 'Pumping Equipment', 'Filtration Equipment',
      'Electrical Equipment', 'Power Distribution', 'Lighting Equipment', 'HVAC Equipment', 'Fire Safety Equipment',
      'Furniture & Fixtures', 'Office Equipment', 'Communication Equipment', 'Laboratory Equipment', 'Safety Equipment',
      'Tools & Equipment', 'Consumables Planning', 'Spare Parts Planning', 'Logistics Planning', 'Shipping Coordination',
      'Port Clearance', 'Insurance Coordination', 'Customs Clearance', 'Documentation Prep', 'Factory Testing',
      'Certificate Preparation', 'Quality Records', 'Packing & Labeling', 'Transportation', 'Delivery Coordination',
      'On-site Inspection', 'Receiving Verification', 'Storage Planning', 'Inventory Management', 'Material Handling',
      'Preservation & Protection', 'Environmental Controls', 'Security Measures', 'Documentation Filing', 'Backup Equipment',
      'Contingency Planning', 'Alternative Suppliers', 'Expediting Shipments', 'Progress Tracking', 'Vendor Communication',
      'Payment Processing', 'Invoice Verification', 'Warranty Claims', 'Performance Guarantees', 'Final Acceptance'
    ],
    'Civil Works': [
      'Site Preparation', 'Boundary Demarcation', 'Access Road Development', 'Temporary Facilities', 'Dewatering System',
      'Foundation Excavation', 'Soil Testing', 'Foundation Design Finalization', 'Borehole Drilling', 'Soil Stabilization',
      'Concrete Foundation', 'Reinforcement Steel', 'Form Work', 'Concrete Pouring', 'Curing Process',
      'Foundation Leveling', 'Waterproofing', 'Anchor Bolts Installation', 'Foundation Inspection', 'Final Approval',
      'Building Frame', 'Column Construction', 'Beam Installation', 'Floor Slabs', 'Roof Structure',
      'Wall Construction', 'Exterior Walls', 'Interior Walls', 'Partition Walls', 'Opening Provisions',
      'Door & Window Frames', 'Glass Installation', 'Door Installation', 'Hardware Installation', 'Finishing Works',
      'Flooring', 'Ceiling Installation', 'Painting', 'Tiles Installation', 'Final Finishing',
      'Electrical Conduit Installation', 'Cable Trays', 'Lighting Installation', 'Power Distribution', 'Grounding',
      'HVAC Ductwork', 'Piping Installation', 'Valve Installation', 'Insulation', 'Testing & Commissioning',
      'Water Supply System', 'Drainage System', 'Sewage System', 'Treatment System', 'Pumping System',
      'Waste Management System', 'Recycling System', 'Environmental Controls', 'Monitoring Systems', 'Final Testing',
      'Control Room Construction', 'Equipment Foundation', 'Console Installation', 'Display Installation', 'CCTV Setup',
      'Fire Safety System', 'Sprinkler Installation', 'Fire Extinguishers', 'Emergency Lighting', 'Exit Signs',
      'Safety Equipment', 'Ladders & Handrails', 'Protective Structures', 'Warning Systems', 'Safety Showers',
      'Administrative Building', 'Office Layout', 'Furniture Installation', 'Equipment Setup', 'IT Infrastructure',
      'Workshop Building', 'Tool Storage', 'Work Benches', 'Equipment Storage', 'Material Handling',
      'Store Room', 'Inventory Racks', 'Climate Control', 'Security System', 'Organization',
      'Canteen Facility', 'Kitchen Equipment', 'Dining Area', 'Sanitation', 'Waste Management',
      'Medical Room', 'First Aid Equipment', 'Stretcher', 'Oxygen Supply', 'Emergency Call System',
      'Parking Area', 'Road Markings', 'Lighting', 'Drainage', 'Maintenance',
      'Compound Fencing', 'Gate Installation', 'Guard Posts', 'Security Measures', 'Final Inspection'
    ],
    'Boiler Erection U1': [
      'Boiler Arrival Inspection', 'Unloading & Positioning', 'Foundation Preparation', 'Boiler Placement', 'Alignment Check',
      'Drum Installation', 'Waterwall Assembly Start', 'Waterwall Tubing', 'Tube Connections', 'Tube Welding',
      'Superheater Assembly', 'Reheater Assembly', 'Economizer Assembly', 'Air Heater Assembly', 'Header Connections',
      'Burner Installation', 'Fuel Nozzles', 'Air Nozzles', 'Ignition System', 'Flame Monitoring',
      'Soot Blowing System', 'Cleaning Balls', 'Blowing Air Supply', 'Blowing Controls', 'Testing System',
      'Boiler Support Installation', 'Expansion Joints', 'Suspension System', 'Guides & Stops', 'Load Cell Installation',
      'Instrumentation Installation', 'Temperature Sensors', 'Pressure Sensors', 'Level Transmitters', 'Flow Meters',
      'Safety Valve Installation', 'Relief Valves', 'Check Valves', 'Isolation Valves', 'Control Valves',
      'Piping Installation', 'Main Steam Pipe', 'Hot Reheat Pipe', 'Cold Reheat Pipe', 'Feed Water Pipe',
      'Blowdown Piping', 'Drain Piping', 'Vent Piping', 'Bypass Piping', 'Testing Connections',
      'Boiler Insulation', 'Lagging Installation', 'Expansion Seals', 'Heat Loss Minimization', 'Safety Barriers',
      'Boiler Cleaning', 'Internal Inspection', 'Corrosion Check', 'Debris Removal', 'Final Cleaning',
      'Pressure Test', 'Hydrostatic Testing', 'Pneumatic Testing', 'Leak Detection', 'Documentation',
      'NDT Inspection', 'Radiography', 'Ultrasonic Testing', 'Dye Penetrant Testing', 'Visual Inspection',
      'Boiler Performance Testing', 'Cold Run Test', 'Hot Run Test', 'Load Testing', 'Safety Systems Test',
      'Control System Integration', 'PLC Programming', 'Safety Interlocks', 'Alarm Settings', 'System Testing',
      'Commissioning Preparation', 'Final Documentation', 'Operating Manual', 'Spare Parts Kit', 'Tools Supply'
    ],
    'Boiler Erection U2': [
      'Boiler U2 Arrival', 'Unloading & Positioning', 'Foundation Prep', 'Placement', 'Alignment',
      'Drum Installation', 'Waterwall Assembly', 'Tubing Work', 'Connections', 'Welding',
      'Superheater Install', 'Reheater Install', 'Economizer Install', 'Air Heater Install', 'Headers',
      'Burner Setup', 'Fuel Nozzles', 'Air Nozzles', 'Ignition', 'Monitoring',
      'Soot Blower Install', 'Balls', 'Air Supply', 'Controls', 'Testing',
      'Support Installation', 'Expansion Joints', 'Suspension', 'Guides', 'Load Cells',
      'Instrumentation', 'Temp Sensors', 'Pressure Sensors', 'Level Trans', 'Flow Meters',
      'Safety Valves', 'Relief Valves', 'Check Valves', 'Isolation Valves', 'Control Valves',
      'Piping Installation', 'Main Steam', 'Hot Reheat', 'Cold Reheat', 'Feed Water',
      'Blowdown', 'Drains', 'Vents', 'Bypass', 'Testing',
      'Insulation Work', 'Lagging', 'Seals', 'Loss Min', 'Barriers',
      'Cleaning', 'Internal Insp', 'Corrosion', 'Debris', 'Final Clean',
      'Pressure Testing', 'Hydrostatic', 'Pneumatic', 'Leak Detect', 'Docs',
      'NDT Inspection', 'Radiography', 'Ultrasonic', 'Dye Penetrant', 'Visual',
      'Performance Test', 'Cold Run', 'Hot Run', 'Load Test', 'Safety Test'
    ],
    'Turbine Erection U1': [
      'Turbine Arrival', 'Unloading', 'Pedestal Prep', 'Positioning', 'Alignment Setup',
      'Foundation Inspection', 'Bolt Holes Check', 'Bearing Pedestals', 'Coupling Pedestals', 'Generator Pedestal',
      'Coupling Installation', 'Alignment Procedure', 'Tolerance Check', 'Safety Guard', 'Lubrication System',
      'Rotor Installation', 'Key Installation', 'Scaling Gland', 'Rotor Seals', 'Rotor Speeds',
      'Stator Installation', 'Generator Stator', 'Cooling System', 'Ventilation', 'Bearing Temperature',
      'Bearing Installation', 'Journal Bearing', 'Thrust Bearing', 'Oil Supply', 'Cooling Oil Flow',
      'Sealing System', 'Gland Seal Ring', 'Seal Steam Supply', 'Seal Steam Condensate', 'Drain System',
      'Turbine Instrumentation', 'Vibration Sensors', 'Temperature Sensors', 'Pressure Sensors', 'Speed Sensors',
      'Piping & Valves', 'Steam Supply Pipe', 'Exhaust Pipe', 'Condensate Return', 'Drain Valves',
      'Control System', 'Governing System', 'Automatic Controls', 'Governor Testing', 'Response Time',
      'Lubrication System', 'Oil Storage', 'Oil Supply Pump', 'Oil Filter', 'Oil Cooler',
      'Cooling System', 'Water Supply', 'Water Circulation', 'Heat Exchanger', 'Temperature Control',
      'Protective Devices', 'Overspeed Protection', 'Thrust Bearing Watch', 'Rotor Warp Alert', 'Vibration Alert',
      'Insulation System', 'Thermal Insulation', 'Acoustic Insulation', 'Vibration Damping', 'Expansion Allowance',
      'Generator Testing', 'Megohm Test', 'Insulation Resistance', 'Hi-pot Test', 'Field Winding Test',
      'Excitation System', 'Exciter Installation', 'AVR Setup', 'Field Winding', 'Cooling System',
      'Commissioning', 'Slow Roll Test', 'Synchronization Check', 'Load Acceptance', 'Final Approval'
    ],
    'Turbine Erection U2': [
      'Turbine U2 Arrival', 'Unload', 'Pedestal Prep', 'Position', 'Align',
      'Found Check', 'Bolt Holes', 'Pedestals', 'Coupling Ped', 'Generator Ped',
      'Coupling Install', 'Align', 'Tolerance', 'Guard', 'Lube',
      'Rotor Install', 'Key', 'Scaling', 'Seals', 'Speeds',
      'Stator Install', 'Generator', 'Cooling', 'Ventilation', 'Bearing Temp',
      'Bearing Install', 'Journal', 'Thrust', 'Oil Supply', 'Oil Flow',
      'Sealing', 'Gland Ring', 'Seal Steam', 'Condensate', 'Drain',
      'Instrumentation', 'Vibration', 'Temperature', 'Pressure', 'Speed',
      'Piping', 'Steam', 'Exhaust', 'Condensate', 'Drain',
      'Control', 'Governing', 'Auto Controls', 'Governor Test', 'Response',
      'Lubrication', 'Oil Storage', 'Pump', 'Filter', 'Cooler',
      'Cooling', 'Water', 'Circulation', 'Exchanger', 'Control',
      'Protection', 'Overspeed', 'Thrust Watch', 'Rotor Warp', 'Vibration',
      'Insulation', 'Thermal', 'Acoustic', 'Damping', 'Expansion',
      'Generator Test', 'Megohm', 'Insulation', 'Hi-pot', 'Winding'
    ],
    'Electrical Systems': [
      'Switchyard Layout', 'Cable Routing', 'Equipment Positioning', 'Grounding Design', 'Lightning Protection',
      'Main Transformer Installation', 'Transformer Positioning', 'Oil Cooling System', 'Temperature Monitoring', 'Protection System',
      'Generator Connections', 'Main Leads', 'Neutral Connection', 'Earth Connection', 'Terminal Connections',
      'Circuit Breaker Installation', 'Main Breaker', 'Feeder Breakers', 'Protection Relays', 'Tripping Circuits',
      'Disconnect Switches', 'Main Disconnects', 'Isolating Switches', 'Manual Operation', 'Safety Interlocks',
      'Surge Protection', 'Lightning Arresters', 'Surge Suppressors', 'Grounding Connections', 'Testing',
      'Cable Installation', 'Underground Cables', 'Cable Trenches', 'Cable Supports', 'Labeling System',
      'Cable Termination', 'Termination Kits', 'Connection Points', 'Insulation Check', 'Continuity Test',
      'DCS & Controls', 'Main PLC Installation', 'Field PLC Installation', 'Sensors Connection', 'Actuators Connection',
      'Control Wiring', 'Signal Cables', 'Power Cables', 'Fiber Optics', 'Network Cables',
      'Emergency Power', 'UPS Installation', 'Battery Backup', 'Power Conditioning', 'Load Testing',
      'Lighting System', 'Main Lighting', 'Emergency Lighting', 'Signal Lights', 'Control Room Lights',
      'Communication System', 'Telephone Network', 'Intercom System', 'Public Address', 'Data Network',
      'HVAC System', 'Main Units', 'Ductwork', 'Dampers', 'Controls',
      'Fire Safety System', 'Fire Alarm', 'Sprinklers', 'Extinguishers', 'Emergency Procedures',
      'Grounding System', 'Earth Conductors', 'Equipment Grounding', 'System Grounding', 'Testing',
      'Testing & Commissioning', 'Insulation Testing', 'Continuity Testing', 'Load Testing', 'Functional Testing'
    ],
    'Commissioning U1': [
      'Commissioning Team Mobilization', 'Team Training', 'Procedures Review', 'Safety Briefing', 'Checklist Preparation',
      'Plant Walkdown', 'Visual Inspection', 'Pressure Test', 'Leak Detection', 'Cleanliness Check',
      'Cold Run Test', 'Equipment Operation', 'Control Testing', 'Safety Interlocks', 'Alarms Testing',
      'Hot Run Test', 'Boiler Lighting', 'Steam Generation', 'Pressure Build-up', 'Temperature Control',
      'Initial Synchronization', 'Grid Connection Prep', 'Voltage Matching', 'Frequency Matching', 'Phase Matching',
      'Grid Synchronization', 'Circuit Breaker Operation', 'Load Acceptance', 'Stability Check', 'Protection Test',
      'Performance Testing', 'Heat Rate Measurement', 'Efficiency Testing', 'Fuel Consumption', 'Emissions Monitoring',
      'Safety System Test', 'Emergency Shutdown', 'Safety Valves', 'Protective Devices', 'Interlocks Verification',
      'Control System Test', 'Automatic Control', 'Manual Control', 'Load Control', 'Parameter Adjustment',
      'Auxiliary System Test', 'Cooling Water System', 'Lubrication System', 'Fuel Supply System', 'Compressed Air',
      'Environmental Monitoring', 'Emissions Test', 'Noise Level', 'Vibration Level', 'Water Quality',
      'Documentation Preparation', 'Operating Procedures', 'Maintenance Procedures', 'Emergency Procedures', 'Training Materials',
      'Staff Training', 'Operator Training', 'Maintenance Training', 'Safety Training', 'Certification',
      'Final Inspection', 'Visual Inspection', 'Documentation Review', 'Performance Review', 'Regulatory Approval',
      'Hand-over Preparation', 'Final Documentation', 'Spare Parts Supply', 'Tools Supply', 'Reference Materials'
    ],
    'Commissioning U2': [
      'Team Mobilization U2', 'Training', 'Procedures', 'Safety', 'Checklist',
      'Walkdown U2', 'Inspection', 'Pressure', 'Leaks', 'Cleanliness',
      'Cold Run U2', 'Operation', 'Control', 'Interlocks', 'Alarms',
      'Hot Run U2', 'Lighting', 'Steam', 'Pressure', 'Temperature',
      'Sync U2', 'Grid Prep', 'Voltage', 'Frequency', 'Phase',
      'Grid Sync U2', 'Breaker', 'Load', 'Stability', 'Protection',
      'Performance Test U2', 'Heat Rate', 'Efficiency', 'Fuel', 'Emissions',
      'Safety Test U2', 'Shutdown', 'Valves', 'Devices', 'Interlocks',
      'Control Test U2', 'Auto', 'Manual', 'Load', 'Parameters',
      'Auxiliary Test U2', 'Cooling', 'Lubrication', 'Fuel', 'Air',
      'Environmental U2', 'Emissions', 'Noise', 'Vibration', 'Water',
      'Documentation U2', 'Procedures', 'Maintenance', 'Emergency', 'Training',
      'Training U2', 'Operators', 'Maintenance', 'Safety', 'Cert'
    ],
    'Performance Testing U1': [
      'Test Planning', 'Test Procedures', 'Acceptance Criteria', 'Data Collection', 'Test Schedule',
      'Baseline Performance', 'Heat Rate Test', 'Efficiency Test', 'Load Variation', 'Fuel Analysis',
      'Environmental Compliance', 'Emissions Monitoring', 'Stack Gas Analysis', 'Particulate Monitoring', 'SO2/NOx Levels',
      'Water System Performance', 'Cooling Water Test', 'Water Quality', 'Treatment System', 'Discharge Quality',
      'Safety System Verification', 'All Safeties', 'Test Results', 'Corrective Actions', 'Final Approval'
    ],
    'Performance Testing U2': [
      'Test Plan U2', 'Procedures', 'Criteria', 'Data', 'Schedule',
      'Baseline U2', 'Heat Rate', 'Efficiency', 'Load', 'Fuel',
      'Environmental U2', 'Emissions', 'Gas Analysis', 'Particulate', 'SO2/NOx',
      'Water U2', 'Cooling', 'Quality', 'Treatment', 'Discharge',
      'Safety U2', 'All Safeties', 'Results', 'Actions', 'Approval'
    ],
  };

  for (const [phase, phaseInfo] of Object.entries(phaseData)) {
    const templates = activityTemplates[phase] || [];
    for (let i = 1; i <= phaseInfo.items; i++) {
      const template = templates[i % templates.length] || `Activity ${i}`;
      activities.push({
        id: `${phaseInfo.code}.${i}`,
        name: `${template}`,
        phase: phase,
        start: `M${Math.floor(i / 10)}`,
        end: `M${Math.floor(i / 5)}`,
        status: 'Not Started',
        progress: 0,
        actualStart: '',
        actualEnd: ''
      });
      counter++;
    }
  }

  return activities;
}

const L3_ACTIVITIES = generateAllActivities();

console.log(`Total activities loaded: ${L3_ACTIVITIES.length}`);

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
        <p className="text-center text-sm text-gray-500 mb-6">547 L3 Activities Loaded</p>
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

function GanttChartTab() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">📊 PROJECT GANTT CHART</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
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
            <p>Showing activities | ✅ {completedCount} completed | 🔄 {inProgressCount} in progress</p>
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
  const [tab, setTab] = useState('activities');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Project Dashboard</h1>
            <p className="text-sm text-gray-600">{user.role} | 547 L3 Activities Ready</p>
          </div>
          <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700">
            <LogOut size={18} className="inline mr-2" /> Logout
          </button>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 flex gap-0">
          {[{ id: 'activities', label: '📋 L3 Activities (547)' }, { id: 'gantt', label: '📈 Gantt Chart' }].map(t => (
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
