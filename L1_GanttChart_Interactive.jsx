import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function L1ScheduleGantt() {
  const [expandedPhase, setExpandedPhase] = useState(null);

  const phases = [
    {
      id: 1,
      name: "1. PROJECT INITIATION & MOBILIZATION",
      duration: 2,
      startMonth: 0,
      endMonth: 2,
      color: "bg-blue-500",
      type: "major",
      subphases: [
        { name: "Team mobilization & site setup", duration: 1, startMonth: 0 },
        { name: "Project baseline & planning", duration: 1, startMonth: 1 }
      ]
    },
    {
      id: 2,
      name: "2. DETAILED DESIGN ENGINEERING",
      duration: 18,
      startMonth: 0,
      endMonth: 18,
      color: "bg-purple-500",
      type: "major",
      subphases: [
        { name: "DED for Boiler system", duration: 16, startMonth: 0 },
        { name: "DED for Turbine & Auxiliaries", duration: 16, startMonth: 1 },
        { name: "DED for Balance of Plant", duration: 14, startMonth: 2 },
        { name: "Design completion & approval", duration: 2, startMonth: 16 }
      ]
    },
    {
      id: 3,
      name: "3. EQUIPMENT PROCUREMENT",
      duration: 24,
      startMonth: 0,
      endMonth: 24,
      color: "bg-orange-500",
      type: "major",
      subphases: [
        { name: "Long-lead item ordering (Boiler)", duration: 22, startMonth: 0 },
        { name: "Turbine-Generator ordering", duration: 20, startMonth: 2 },
        { name: "Transformer & switchyard equipment", duration: 14, startMonth: 8 },
        { name: "Equipment delivery at site", duration: 2, startMonth: 22 }
      ]
    },
    {
      id: 4,
      name: "4. CIVIL WORKS & INFRASTRUCTURE",
      duration: 22,
      startMonth: 2,
      endMonth: 24,
      color: "bg-green-500",
      type: "major",
      subphases: [
        { name: "Foundation preparation & piling", duration: 4, startMonth: 2 },
        { name: "Structural steel erection", duration: 6, startMonth: 6 },
        { name: "Boiler house & turbine hall construction", duration: 8, startMonth: 6 },
        { name: "Water treatment & cooling systems", duration: 6, startMonth: 10 },
        { name: "Electrical & control room building", duration: 4, startMonth: 14 },
        { name: "Coal handling plant & ash disposal", duration: 8, startMonth: 12 }
      ]
    },
    {
      id: 5,
      name: "5. BOILER ERECTION (Unit-1)",
      duration: 14,
      startMonth: 10,
      endMonth: 24,
      color: "bg-red-500",
      type: "major",
      subphases: [
        { name: "Furnace & pressure parts assembly", duration: 8, startMonth: 10 },
        { name: "Superheater & reheater erection", duration: 4, startMonth: 14 },
        { name: "Boiler peripherals & dampers", duration: 3, startMonth: 18 },
        { name: "Boiler testing & inspection", duration: 2, startMonth: 21 }
      ]
    },
    {
      id: 6,
      name: "6. BOILER ERECTION (Unit-2)",
      duration: 14,
      startMonth: 14,
      endMonth: 28,
      color: "bg-red-600",
      type: "major",
      subphases: [
        { name: "Furnace & pressure parts assembly", duration: 8, startMonth: 14 },
        { name: "Superheater & reheater erection", duration: 4, startMonth: 20 },
        { name: "Boiler peripherals & dampers", duration: 3, startMonth: 24 },
        { name: "Boiler testing & inspection", duration: 2, startMonth: 27 }
      ]
    },
    {
      id: 7,
      name: "7. TURBINE-GENERATOR ERECTION (Unit-1)",
      duration: 10,
      startMonth: 18,
      endMonth: 28,
      color: "bg-indigo-500",
      type: "major",
      subphases: [
        { name: "Turbine rotor & casing assembly", duration: 4, startMonth: 18 },
        { name: "Generator stator assembly", duration: 3, startMonth: 19 },
        { name: "Coupling & bearing installation", duration: 2, startMonth: 22 },
        { name: "Turbine testing", duration: 1, startMonth: 27 }
      ]
    },
    {
      id: 8,
      name: "8. TURBINE-GENERATOR ERECTION (Unit-2)",
      duration: 10,
      startMonth: 22,
      endMonth: 32,
      color: "bg-indigo-600",
      type: "major",
      subphases: [
        { name: "Turbine rotor & casing assembly", duration: 4, startMonth: 22 },
        { name: "Generator stator assembly", duration: 3, startMonth: 23 },
        { name: "Coupling & bearing installation", duration: 2, startMonth: 26 },
        { name: "Turbine testing", duration: 1, startMonth: 31 }
      ]
    },
    {
      id: 9,
      name: "9. ELECTRICAL & CONTROL SYSTEMS INSTALLATION",
      duration: 14,
      startMonth: 18,
      endMonth: 32,
      color: "bg-yellow-600",
      type: "major",
      subphases: [
        { name: "HV switchyard installation", duration: 6, startMonth: 18 },
        { name: "Control room panel & DCS installation", duration: 6, startMonth: 20 },
        { name: "Cable routing & termination", duration: 6, startMonth: 21 },
        { name: "Instrument installation & calibration", duration: 4, startMonth: 24 }
      ]
    },
    {
      id: 10,
      name: "10. PRE-COMMISSIONING ACTIVITIES",
      duration: 4,
      startMonth: 28,
      endMonth: 32,
      color: "bg-cyan-500",
      type: "major",
      subphases: [
        { name: "System flushing & cleaning", duration: 2, startMonth: 28 },
        { name: "Equipment testing & FAT", duration: 2, startMonth: 30 }
      ]
    },
    {
      id: 11,
      name: "11. COMMISSIONING (Unit-1)",
      duration: 6,
      startMonth: 28,
      endMonth: 34,
      color: "bg-lime-600",
      type: "major",
      subphases: [
        { name: "Cold & heat run tests", duration: 2, startMonth: 28 },
        { name: "Boiler light-up & steam generation", duration: 2, startMonth: 30 },
        { name: "Turbine turning & low-speed operation", duration: 1, startMonth: 32 },
        { name: "Synchronization & grid connection", duration: 1, startMonth: 33 }
      ]
    },
    {
      id: 12,
      name: "12. COMMISSIONING (Unit-2)",
      duration: 6,
      startMonth: 32,
      endMonth: 38,
      color: "bg-lime-700",
      type: "major",
      subphases: [
        { name: "Cold & heat run tests", duration: 2, startMonth: 32 },
        { name: "Boiler light-up & steam generation", duration: 2, startMonth: 34 },
        { name: "Turbine turning & low-speed operation", duration: 1, startMonth: 36 },
        { name: "Synchronization & grid connection", duration: 1, startMonth: 37 }
      ]
    },
    {
      id: 13,
      name: "13. PERFORMANCE TESTING & COD (Unit-1)",
      duration: 3,
      startMonth: 34,
      endMonth: 37,
      color: "bg-emerald-600",
      type: "major",
      subphases: [
        { name: "Loading up to 50% MCR", duration: 1, startMonth: 34 },
        { name: "Loading up to 75% MCR", duration: 1, startMonth: 35 },
        { name: "Loading up to 100% MCR & COD", duration: 1, startMonth: 36 }
      ]
    },
    {
      id: 14,
      name: "14. PERFORMANCE TESTING & COD (Unit-2)",
      duration: 3,
      startMonth: 38,
      endMonth: 41,
      color: "bg-emerald-700",
      type: "major",
      subphases: [
        { name: "Loading up to 50% MCR", duration: 1, startMonth: 38 },
        { name: "Loading up to 75% MCR", duration: 1, startMonth: 39 },
        { name: "Loading up to 100% MCR & COD", duration: 1, startMonth: 40 }
      ]
    }
  ];

  const totalDuration = 44;
  const monthLabels = Array.from({ length: 45 }, (_, i) => i);

  const getBarWidth = (duration) => `${(duration / totalDuration) * 100}%`;
  const getBarLeftPosition = (startMonth) => `${(startMonth / totalDuration) * 100}%`;

  const togglePhase = (id) => {
    setExpandedPhase(expandedPhase === id ? null : id);
  };

  return (
    <div className="w-full bg-white p-6 font-sans">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          L1 MASTER SCHEDULE - 2x660 MW SUPERCRITICAL THERMAL POWER PLANT
        </h1>
        <p className="text-gray-600 text-lg">
          <strong>Technology:</strong> Supercritical Coal | <strong>Contractor:</strong> BHEL | 
          <strong> Total Duration:</strong> 44 Months (3.67 Years)
        </p>
      </div>

      {/* Legend */}
      <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
        <h3 className="font-bold mb-3 text-gray-700">Project Phases:</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Initiation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span>Design Engineering</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Procurement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Civil Works</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Boiler Erection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-500 rounded"></div>
            <span>Turbine-Gen Erection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-lime-600 rounded"></div>
            <span>Commissioning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-600 rounded"></div>
            <span>Performance Testing & COD</span>
          </div>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="border border-gray-300 rounded overflow-x-auto">
        {/* Month Headers */}
        <div className="flex sticky top-0 bg-gray-50 border-b border-gray-300">
          <div className="w-80 flex-shrink-0 border-r border-gray-300 p-2 font-bold text-sm bg-gray-100"></div>
          <div className="flex">
            {monthLabels.map((month) => (
              <div
                key={month}
                className="flex-shrink-0 w-12 h-8 border-r border-gray-200 text-xs flex items-center justify-center font-semibold text-gray-600 bg-gray-50"
              >
                {month}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {phases.map((phase) => (
          <div key={phase.id}>
            {/* Main Phase Row */}
            <div className="flex hover:bg-gray-50">
              <div className="w-80 flex-shrink-0 border-r border-gray-300 p-3 text-sm font-semibold text-gray-800 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100"
                   onClick={() => togglePhase(phase.id)}>
                <span>{phase.name}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {expandedPhase === phase.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </div>
              <div className="flex flex-1 relative h-12 border-l border-gray-200">
                <div
                  className={`${phase.color} absolute top-1 bottom-1 rounded opacity-85 hover:opacity-100 transition-opacity flex items-center justify-start pl-2 text-white text-xs font-bold`}
                  style={{
                    left: getBarLeftPosition(phase.startMonth),
                    width: getBarWidth(phase.duration),
                    minWidth: "80px"
                  }}
                >
                  {phase.duration}M
                </div>
              </div>
            </div>

            {/* Subphases */}
            {expandedPhase === phase.id && phase.subphases.map((sub, idx) => (
              <div key={idx} className="flex bg-white border-t border-gray-200">
                <div className="w-80 flex-shrink-0 border-r border-gray-300 p-2 pl-8 text-xs text-gray-700 bg-white">
                  {sub.name}
                </div>
                <div className="flex flex-1 relative h-10 border-l border-gray-200">
                  <div
                    className="bg-gray-400 absolute top-1 bottom-1 rounded opacity-60 flex items-center justify-start pl-1 text-white text-xs"
                    style={{
                      left: getBarLeftPosition(sub.startMonth),
                      width: getBarWidth(sub.duration)
                    }}
                  >
                    {sub.duration}M
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Key Milestones */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-bold text-lg text-gray-800 mb-3">KEY MILESTONES</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Month 0:</strong> Project Kickoff</div>
          <div><strong>Month 18:</strong> Design Engineering Complete</div>
          <div><strong>Month 24:</strong> Equipment Delivery Complete</div>
          <div><strong>Month 24:</strong> Civil Works Completion</div>
          <div><strong>Month 28:</strong> Boiler Erection (Unit-1) Complete</div>
          <div><strong>Month 32:</strong> Boiler Erection (Unit-2) Complete</div>
          <div><strong>Month 28:</strong> Turbine Erection (Unit-1) Complete</div>
          <div><strong>Month 32:</strong> Turbine Erection (Unit-2) Complete</div>
          <div><strong>Month 34:</strong> Unit-1 Synchronization & Grid Connection</div>
          <div><strong>Month 38:</strong> Unit-2 Synchronization & Grid Connection</div>
          <div><strong>Month 37:</strong> Unit-1 COD (Commercial Operation Date)</div>
          <div><strong>Month 41:</strong> Unit-2 COD (Commercial Operation Date)</div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="mt-8">
        <h3 className="font-bold text-lg text-gray-800 mb-3">PHASE SUMMARY</h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-300 p-2 text-left">Phase</th>
              <th className="border border-gray-300 p-2 text-center">Duration (Months)</th>
              <th className="border border-gray-300 p-2 text-center">Start Month</th>
              <th className="border border-gray-300 p-2 text-center">End Month</th>
            </tr>
          </thead>
          <tbody>
            {phases.map((phase) => (
              <tr key={phase.id} className="hover:bg-gray-100 border-b border-gray-300">
                <td className="border border-gray-300 p-2">{phase.name}</td>
                <td className="border border-gray-300 p-2 text-center font-semibold">{phase.duration}</td>
                <td className="border border-gray-300 p-2 text-center">{phase.startMonth}</td>
                <td className="border border-gray-300 p-2 text-center">{phase.endMonth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Critical Path */}
      <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-500">
        <h3 className="font-bold text-lg text-red-800 mb-2">CRITICAL PATH</h3>
        <p className="text-sm text-gray-700 mb-2">
          The critical path (schedule-driving activities) for this project:
        </p>
        <ol className="text-sm text-gray-700 list-decimal pl-5 space-y-1">
          <li>Design Engineering (18 months) → Sets baseline for procurement</li>
          <li>Equipment Procurement (24 months) → Long-lead items (Boiler, Turbine)</li>
          <li>Civil Works (22 months) → Foundation to building completion</li>
          <li>Boiler Erection (14 months each) → Sequential after civil works</li>
          <li>Turbine Erection (10 months each) → Overlapping with boiler erection</li>
          <li>Commissioning (6 months each) → Sequential, Unit-1 then Unit-2</li>
        </ol>
      </div>

      {/* Footer */}
      <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600">
        <p><strong>Note:</strong> This is an L1 (Master) Schedule showing major phases. Actual execution will depend on design completion, 
        equipment delivery, weather, regulatory approvals, and site conditions. Schedule assumes no major delays.</p>
        <p className="mt-2"><strong>Unit-1 COD: Month 37 (approx. 37 months from project start)</strong></p>
        <p><strong>Unit-2 COD: Month 41 (approx. 41 months from project start)</strong></p>
      </div>
    </div>
  );
}
