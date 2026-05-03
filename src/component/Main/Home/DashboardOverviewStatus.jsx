import React from 'react';

const stats = [
  {
    title: 'Total Users',
    value: '1,209',
    change: '+12% From Last Month',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Active Subscriptions',
    value: '$28,900',
    change: '+12% From Last Month',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Monthly Revenue',
    value: '892',
    change: '+12% From Last Month',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: 'Conversion Rate',
    value: '24.5%',
    change: '+12% From Last Month',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const DashboardOverviewStatus = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="relative bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl px-5 py-5 overflow-hidden"
        >
          {/* Subtle gloss overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-2xl" />

          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <span className="text-[13px] font-normal text-[#8a8a8e] tracking-wide">
              {stat.title}
            </span>
            <span className="text-[#4a4a4e]">{stat.icon}</span>
          </div>

          {/* Value */}
          <p className="font-mono text-[28px] font-medium text-[#f0f0f2] tracking-tight leading-none mb-2">
            {stat.value}
          </p>

          {/* Change */}
          <div className="flex items-center gap-1 text-[11.5px] text-[#3db87a]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardOverviewStatus;