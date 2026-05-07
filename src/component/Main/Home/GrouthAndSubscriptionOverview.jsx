// import React from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
//   ResponsiveContainer, PieChart, Pie, Cell
// } from 'recharts';
// import { useGetSubscriptionTierQuery } from '../../../redux/features/dashboard/dashboard';

// const lineData = [
//   { month: 'Jan', revenue: 800, users: 20 },
//   { month: 'Feb', revenue: 2100, users: 42 },
//   { month: 'Mar', revenue: 1600, users: 60 },
//   { month: 'Apr', revenue: 1200, users: 75 },
//   { month: 'May', revenue: 1000, users: 95 },
//   { month: 'Jun', revenue: 1300, users: 90 },
//   { month: 'Jul', revenue: 900, users: 70 },
//   { month: 'Aug', revenue: 400, users: 75 },
// ];

// const tierData = [
//   { name: 'Starter', value: 45, color: '#cc1a1a' },
//   { name: 'Pro', value: 45, color: '#7a0000' },
//   { name: 'Elite', value: 10, color: '#e8a0a0' },
// ];

// const bloodData = [
//   { type: 'O', label: 'Type O', users: 82 },
//   { type: 'A', label: 'Type A', users: 67 },
//   { type: 'B', label: 'Type B', users: 54 },
//   { type: 'AB', label: 'Type AB', users: 32 },
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-red-700 rounded-lg px-4 py-3 text-white text-sm shadow-2xl leading-relaxed">
//         <p className="font-bold mb-1">{label}</p>
//         <p>Revenue: ${payload[0]?.value?.toLocaleString()}</p>
//         <p>User: {payload[1]?.value}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const CustomDot = (props) => {
//   const { cx, cy, payload } = props;
//   if (payload.month === 'Feb') {
//     return <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#cc1a1a" strokeWidth={2} />;
//   }
//   return null;
// };

// const CustomDotUser = (props) => {
//   const { cx, cy, payload } = props;
//   if (payload.month === 'Feb') {
//     return <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#aaa" strokeWidth={2} />;
//   }
//   return null;
// };

// const GrouthAndSubscriptionOverview = () => {
//   const { data } = useGetSubscriptionTierQuery();
//   const fullSub = data?.data?.subscriptionsByPlan

//   console.log(fullSub)

//   return (
//     <div className="flex gap-4 p-5 items-start">

//       {/* Left – Line Chart */}
//       <div className="flex-1 bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl p-6">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-[#f0f0f2] font-semibold text-base">
//             Revenue &amp; Growth Trend
//           </span>
//           <div className="flex items-center gap-5 text-xs text-[#aaaaaa]">
//             <span className="flex items-center gap-1.5">
//               <span className="inline-block w-6 h-0.5 bg-red-700 rounded" />
//               Revenue
//             </span>
//             <span className="flex items-center gap-1.5">
//               <span className="inline-block w-6 h-0.5 bg-[#888888] rounded" />
//               User
//             </span>
//           </div>
//         </div>
//         <p className="text-[#666666] text-xs mb-5">
//           Monthly Revenue And User Acquisition Over The Last 6 Months
//         </p>

//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={lineData} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
//             <CartesianGrid stroke="#2a2a2c" strokeDasharray="0" vertical={false} />
//             <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
//             <YAxis yAxisId="left" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false}
//               domain={[0, 4500]} ticks={[0, 1000, 2000, 4000]} />
//             <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666', fontSize: 11 }}
//               axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 50, 75, 100]} />
//             <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#555', strokeDasharray: '4 4', strokeWidth: 1 }} />
//             <Line yAxisId="left" type="monotone" dataKey="revenue"
//               stroke="#cc1a1a" strokeWidth={2.5} dot={<CustomDot />} activeDot={{ r: 5, fill: '#cc1a1a' }} />
//             <Line yAxisId="right" type="monotone" dataKey="users"
//               stroke="#888" strokeWidth={2.5} dot={<CustomDotUser />} activeDot={{ r: 5, fill: '#aaa' }} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Right Column */}
//       <div className="w-72 flex flex-col gap-4">

//         {/* Subscription Tier */}
//         <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl p-5">
//           <p className="text-[#f0f0f2] font-semibold text-sm mb-4">Subscription Tier</p>
//           <div className="flex items-center gap-4">
//             <PieChart width={110} height={110}>
//               <Pie data={tierData} cx={50} cy={50}
//                 innerRadius={32} outerRadius={50} dataKey="value" strokeWidth={0}>
//                 {tierData.map((entry, i) => (
//                   <Cell key={i} fill={entry.color} />
//                 ))}
//               </Pie>
//             </PieChart>
//             <div className="flex flex-col gap-3 flex-1">
//               {tierData.map((t) => (
//                 <div key={t.name} className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <span
//                       className="inline-block w-3 h-3 rounded-sm"
//                       style={{ background: t.color }}
//                     />
//                     <span className="text-[#cccccc] text-xs">{t.name}</span>
//                   </div>
//                   <span className="text-[#888888] text-xs">{t.value}%</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Blood Type Breakdown */}
//         <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl p-5">
//           <p className="text-[#f0f0f2] font-semibold text-sm mb-4">Blood Type Breakdown</p>
//           <div className="flex flex-col gap-2">
//             {bloodData.map((b) => (
//               <div key={b.type}
//                 className="flex items-center justify-between bg-[#252527] rounded-xl px-3.5 py-2.5">
//                 <div className="flex items-center gap-2.5">
//                   <span className="w-7 h-7 rounded-lg bg-red-700 flex items-center justify-center
//                     text-[10px] font-bold text-white shrink-0">
//                     {b.type}
//                   </span>
//                   <span className="text-[#cccccc] text-xs">{b.label}</span>
//                 </div>
//                 <span className="text-[#f0f0f2] text-xs font-semibold">{b.users} Users</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default GrouthAndSubscriptionOverview;


import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { useGetBloodTypesGropsQuery, useGetRechartStatusQuery, useGetSubscriptionTierQuery } from '../../../redux/features/dashboard/dashboard';

const lineData = [
  { month: 'Jan', revenue: 800, users: 20 },
  { month: 'Feb', revenue: 2100, users: 42 },
  { month: 'Mar', revenue: 1600, users: 60 },
  { month: 'Apr', revenue: 1200, users: 75 },
  { month: 'May', revenue: 1000, users: 95 },
  { month: 'Jun', revenue: 1300, users: 90 },
  { month: 'Jul', revenue: 900, users: 70 },
  { month: 'Aug', revenue: 400, users: 75 },
];

const TIER_COLORS = ['#cc1a1a', '#7a0000', '#e8a0a0'];

const bloodData = [
  { type: 'O', label: 'Type O', users: 82 },
  { type: 'A', label: 'Type A', users: 67 },
  { type: 'B', label: 'Type B', users: 54 },
  { type: 'AB', label: 'Type AB', users: 32 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-red-700 rounded-lg px-4 py-3 text-white text-sm shadow-2xl leading-relaxed">
        <p className="font-bold mb-1">{label}</p>
        <p>Revenue: ${payload[0]?.value?.toLocaleString()}</p>
        <p>User: {payload[1]?.value}</p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (payload.month === 'Feb') {
    return <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#cc1a1a" strokeWidth={2} />;
  }
  return null;
};

const CustomDotUser = (props) => {
  const { cx, cy, payload } = props;
  if (payload.month === 'Feb') {
    return <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#aaa" strokeWidth={2} />;
  }
  return null;
};

const GrouthAndSubscriptionOverview = () => {
  const { data } = useGetSubscriptionTierQuery();
  const fullSub = data?.data?.subscriptionsByPlan;

  const { data: blood } = useGetBloodTypesGropsQuery();
  const bloodTypes = blood?.data;

  const { data: rechartData } = useGetRechartStatusQuery()
  const revenuewAndGrouth = rechartData?.data

  console.log(revenuewAndGrouth)


  const tierData = React.useMemo(() => {
    if (!fullSub?.length) return [];
    return fullSub.map((item, i) => ({
      name: item.planName,
      value: item.percentage,
      color: TIER_COLORS[i] ?? '#555555',
    }));
  }, [fullSub]);

  return (
    <div className="flex gap-4 p-5 items-start">

      {/* Left – Line Chart */}
      <div className="flex-1 bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[#f0f0f2] font-semibold text-base">
            Revenue &amp; Growth Trend
          </span>
          <div className="flex items-center gap-5 text-xs text-[#aaaaaa]">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-6 h-0.5 bg-red-700 rounded" />
              Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-6 h-0.5 bg-[#888888] rounded" />
              User
            </span>
          </div>
        </div>
        <p className="text-[#666666] text-xs mb-5">
          Monthly Revenue And User Acquisition Over The Last 6 Months
        </p>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenuewAndGrouth} margin={{ top: 20, right: 40, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#2a2a2c" strokeDasharray="0" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false}
              domain={[0, 4500]} ticks={[0, 1000, 2000, 4000]} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#666', fontSize: 11 }}
              axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 50, 75, 100]} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#555', strokeDasharray: '4 4', strokeWidth: 1 }} />
            <Line yAxisId="left" type="monotone" dataKey="revenue"
              stroke="#cc1a1a" strokeWidth={2.5} dot={<CustomDot />} activeDot={{ r: 5, fill: '#cc1a1a' }} />
            <Line yAxisId="right" type="monotone" dataKey="users"
              stroke="#888" strokeWidth={2.5} dot={<CustomDotUser />} activeDot={{ r: 5, fill: '#aaa' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Right Column */}
      <div className="w-72 flex flex-col gap-4">

        {/* Subscription Tier */}
        <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl p-5">
          <p className="text-[#f0f0f2] font-semibold text-sm mb-4">Subscription Tier</p>
          <div className="flex items-center gap-4">
            <PieChart width={110} height={110}>
              <Pie
                data={tierData.length ? tierData : [{ value: 1, color: '#2a2a2c' }]}
                cx={50} cy={50}
                innerRadius={32} outerRadius={50}
                dataKey="value" strokeWidth={0}
              >
                {(tierData.length ? tierData : [{ color: '#2a2a2c' }]).map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="flex flex-col gap-3 flex-1">
              {bloodTypes?.map((t) => (
                <div key={t.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-sm"
                      style={{ background: t.color }}
                    />
                    <span className="text-[#cccccc] text-xs">{t.bloodGroup}</span>
                  </div>
                  <span className="text-[#888888] text-xs">{t.totalUsers}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blood Type Breakdown */}
        <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl p-5">
          <p className="text-[#f0f0f2] font-semibold text-sm mb-4">Blood Type Breakdown</p>
          <div className="flex flex-col gap-2">
            {bloodData.map((b) => (
              <div key={b.type}
                className="flex items-center justify-between bg-[#252527] rounded-xl px-3.5 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-red-700 flex items-center justify-center
                    text-[10px] font-bold text-white shrink-0">
                    {b.type}
                  </span>
                  <span className="text-[#cccccc] text-xs">{b.label}</span>
                </div>
                <span className="text-[#f0f0f2] text-xs font-semibold">{b.users} Users</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GrouthAndSubscriptionOverview;