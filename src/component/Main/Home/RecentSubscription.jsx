import React, { useState } from 'react';

const allData = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1).padStart(2, '0'),
  username: 'Tasmia Hassan Shabonty',
  email: 'Tasmia@Gmail.Com',
  previousPlan: 'Starter',
  updatedPlan: 'Elite',
  updateDate: '2025-03-12',
  updateTime: '09:30 AM',
}));

const ROWS_PER_PAGE = 3;

const cols = [
  { label: 'No',            key: 'id'           },
  { label: 'Username',      key: 'username'      },
  { label: 'Email',         key: 'email'         },
  { label: 'Previous Plan', key: 'previousPlan'  },
  { label: 'Updated Plan',  key: 'updatedPlan'   },
  { label: 'Update Date',   key: 'date'          },
  { label: 'Action',        key: 'action'        },
];

const ActionIcon = () => (
  <div className="w-9 h-9 rounded-lg bg-[#2a2a2c] flex items-center justify-center
    cursor-pointer transition-colors duration-200 hover:bg-[#3a3a3c]">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="#f0f0f2" strokeWidth="1.8" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#f0f0f2" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="18" cy="18" r="4" fill="#1c1c1e" stroke="#f0f0f2" strokeWidth="1.5" />
      <path d="M18 16v2l1 1" stroke="#f0f0f2" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  </div>
);

const Cell = ({ last = false, center = false, children }) => (
  <div className={`
    flex-1 px-4 py-4 text-xs text-[#f0f0f2]
    ${!last ? 'border-r border-[#252527]' : ''}
    ${center ? 'flex justify-center items-center' : ''}
  `}>
    {children}
  </div>
);

const PagBtn = ({ label, active, text, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      text-xs rounded-full transition-all duration-200 font-sans
      ${text
        ? `px-1 bg-transparent ${disabled ? 'text-[#444] cursor-not-allowed' : 'text-[#aaa] cursor-pointer'}`
        : `w-[34px] h-[34px] ${active ? 'bg-red-700 text-white font-semibold' : 'bg-transparent text-[#aaa]'}`
      }
    `}
  >
    {label}
  </button>
);

const RecentSubscription = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allData.length / ROWS_PER_PAGE);
  const paginated = allData.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const showing = Math.min(
    ROWS_PER_PAGE,
    allData.length - (currentPage - 1) * ROWS_PER_PAGE
  );

  return (
    <div className="p-5 text-[#f0f0f2]">

      {/* Title */}
      <h2 className="text-xl font-semibold mb-5 text-[#f0f0f2]">
        Recent Subscription Upgrades
      </h2>

      {/* Table */}
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center border-b-2 border-red-700 bg-[#1c1c1e]">
          {cols.map((col, i) => (
            <div
              key={col.key}
              className={`
                flex-1 px-4 py-4 text-xs font-medium text-[#f0f0f2] tracking-wide
                ${i < cols.length - 1 ? 'border-r border-[#2a2a2c]' : ''}
              `}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginated.map((row, ri) => (
          <div
            key={ri}
            className={`
              flex items-center transition-colors duration-150 hover:bg-[#222224]
              ${ri < paginated.length - 1 ? 'border-b border-[#252527]' : ''}
            `}
          >
            <Cell><span className="text-[#aaaaaa]">{row.id}</span></Cell>
            <Cell>{row.username}</Cell>
            <Cell><span className="text-[#cccccc]">{row.email}</span></Cell>
            <Cell>{row.previousPlan}</Cell>
            <Cell>{row.updatedPlan}</Cell>
            <Cell>
              <span className="text-[#cccccc] leading-relaxed block">{row.updateDate}</span>
              <span className="text-[#888888] text-[11px]">{row.updateTime}</span>
            </Cell>
            <Cell center last>
              <ActionIcon />
            </Cell>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 px-1">
        <span className="text-xs text-[#666666]">
          Showing {showing} Of {allData.length} Users
        </span>

        <div className="flex items-center gap-2">
          <PagBtn
            label="Prev" text
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p <= 5)
            .map(p => (
              <PagBtn
                key={p} label={p}
                active={p === currentPage}
                onClick={() => setCurrentPage(p)}
              />
            ))}
          <PagBtn
            label="Next" text
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>

    </div>
  );
};

export default RecentSubscription;