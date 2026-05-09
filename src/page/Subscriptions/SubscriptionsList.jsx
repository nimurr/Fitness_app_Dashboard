import React, { useState } from 'react';
import {
  FiUser, FiMail, FiPhone, FiGlobe, FiCreditCard,
  FiCalendar, FiX, FiEye,
  FiHash, FiSearch, FiChevronLeft, FiChevronRight, FiRefreshCw
} from 'react-icons/fi';
import { useGetAllSubscriberListQuery } from '../../redux/features/plan/plan';

const PAGE_SIZE = 5;

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold border
    ${status === 'active'
      ? 'bg-emerald-900/30 text-emerald-400 border-emerald-700/30'
      : 'bg-[#2a2a2c] text-[#666] border-[#333]'}`}>
    {status === 'active' ? 'Active' : 'Inactive'}
  </span>
);

const PlanBadge = ({ plan }) => (
  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-700/20 text-red-400 border border-red-700/30 capitalize">
    {plan}
  </span>
);

/* ── Avatar Fallback ── */
const Avatar = ({ name }) => {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'NA';
  return (
    <div className="w-8 h-8 rounded-lg bg-red-700/30 flex items-center justify-center shrink-0">
      <span className="text-red-400 text-xs font-bold">{initials}</span>
    </div>
  );
};

/* ── View Modal ── */
const ViewModal = ({ user, onClose }) => {
  if (!user) return null;

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : 'N/A';

  const rows = [
    { icon: FiUser,       label: 'Name',             value: user.userName },
    { icon: FiMail,       label: 'Email',             value: user.email },
    { icon: FiPhone,      label: 'Phone',             value: user.phone },
    { icon: FiCreditCard, label: 'Billing Cycle',     value: user.billingCycle },
    { icon: FiHash,       label: 'Price Paid',        value: user.pricePaid },
    { icon: FiGlobe,      label: 'Payment Provider',  value: user.paymentProvider },
    { icon: FiCalendar,   label: 'Start Date',        value: formatDate(user.startDate) },
    { icon: FiCalendar,   label: 'End Date',          value: formatDate(user.endDate) },
    { icon: FiRefreshCw,  label: 'Auto Renew',        value: user.autoRenew ? 'Yes' : 'No' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Banner */}
        <div className="relative h-20 bg-gradient-to-r from-red-900/50 to-[#1c1c1e]">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center
              justify-center text-[#666] hover:text-white hover:bg-[#3a3a3c] transition-colors"
          >
            <FiX size={14} />
          </button>
          <div className="absolute -bottom-7 left-5">
            <div className="w-14 h-14 rounded-xl border-2 border-red-700 bg-red-700/30 flex items-center justify-center shadow-xl">
              <span className="text-red-400 text-lg font-bold">
                {user.userName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-10 px-5 pb-1">
          <h3 className="text-base font-semibold text-[#f0f0f2]">{user.userName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={user.status} />
            <span className="text-[#444] text-xs">·</span>
            <span className="text-[#555] text-xs capitalize">{user.billingCycle} plan</span>
          </div>
        </div>

        <div className="mx-5 my-3 border-t border-[#252527]" />

        <div className="px-5 pb-5 flex flex-col gap-2.5">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 bg-[#252527] rounded-xl px-4 py-3">
              <div className="w-7 h-7 rounded-lg bg-red-700/20 flex items-center justify-center shrink-0">
                <Icon size={13} className="text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[#555] text-[10px] uppercase tracking-wider">{label}</p>
                <p className="text-[#f0f0f2] text-sm font-medium truncate capitalize">{value}</p>
              </div>
            </div>
          ))}
          <button
            onClick={onClose}
            className="mt-2 w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Skeleton Loader ── */
const SkeletonRow = () => (
  <div className="flex items-center border-b border-[#252527] animate-pulse">
    {Array.from({ length: 7 }).map((_, i) => (
      <div key={i} className="flex-1 px-4 py-4 border-r border-[#252527] last:border-r-0">
        <div className="h-4 bg-[#252527] rounded-lg w-3/4" />
      </div>
    ))}
  </div>
);

/* ── Main Page ── */
const SubscriptionsList = () => {
  const { data: subdata, isLoading, isError } = useGetAllSubscriberListQuery();
  const fullData = subdata?.data || [];

  const [search, setSearch] = useState('');
  const [currentPage, setPage] = useState(1);
  const [viewUser, setViewUser] = useState(null);

  const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : 'N/A';

  const filtered = fullData.filter(u =>
    u.userName?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const cols = ['No', 'Username', 'Email', 'Phone Number', 'Billing Cycle', 'Price Paid', 'End Date', 'Status', 'Action'];

  return (
    <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#f0f0f2]">Subscription List</h1>
          <p className="text-sm text-[#555] mt-0.5">{fullData.length} total subscribers</p>
        </div>
        <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
          px-4 py-2.5 focus-within:border-red-700 transition-colors w-full sm:w-64">
          <FiSearch size={15} className="text-[#555] shrink-0" />
          <input
            type="text"
            placeholder="Search name or email…"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="bg-transparent text-sm text-[#ccc] placeholder-[#444] focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl overflow-hidden">

        {/* Header Row */}
        <div className="flex items-center border-b-2 border-red-700">
          {cols.map((col, i) => (
            <div key={col}
              className={`flex-1 px-4 py-4 text-sm font-medium text-[#f0f0f2] tracking-wide whitespace-nowrap
                ${i < cols.length - 1 ? 'border-r border-[#2a2a2c]' : ''}`}>
              {col}
            </div>
          ))}
        </div>

        {/* Loading */}
        {isLoading && Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonRow key={i} />)}

        {/* Error */}
        {isError && (
          <div className="py-20 text-center text-red-400 text-sm">
            Failed to load subscribers. Please try again.
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && paginated.length === 0 && (
          <div className="py-20 text-center text-[#444] text-sm">No subscribers found.</div>
        )}

        {/* Rows */}
        {!isLoading && !isError && paginated.map((row, ri) => (
          <div key={row._id}
            className={`flex items-center hover:bg-[#222224] transition-colors duration-150
              ${ri < paginated.length - 1 ? 'border-b border-[#252527]' : ''}`}>

            {/* No */}
            <div className="flex-1 px-4 py-4 text-sm text-[#555] border-r border-[#252527]">
              {String((currentPage - 1) * PAGE_SIZE + ri + 1).padStart(2, '0')}
            </div>

            {/* Username */}
            <div className="flex-1 px-4 py-4 border-r border-[#252527] flex items-center gap-2.5 min-w-0">
              <Avatar name={row.userName} />
              <span className="text-sm text-[#f0f0f2] font-medium truncate">{row.userName}</span>
            </div>

            {/* Email */}
            <div className="flex-1 px-4 py-4 text-sm text-[#aaa] border-r border-[#252527] truncate">
              {row.email}
            </div>

            {/* Phone */}
            <div className="flex-1 px-4 py-4 text-sm text-[#aaa] border-r border-[#252527] whitespace-nowrap">
              {row.phone || 'N/A'}
            </div>

            {/* Billing Cycle */}
            <div className="flex-1 px-4 py-4 border-r border-[#252527]">
              <PlanBadge plan={row.billingCycle} />
            </div>

            {/* Price Paid */}
            <div className="flex-1 px-4 py-4 text-sm text-[#aaa] border-r border-[#252527] whitespace-nowrap">
              {row.pricePaid || 'N/A'}
            </div>

            {/* End Date */}
            <div className="flex-1 px-4 py-4 text-sm text-[#aaa] border-r border-[#252527] whitespace-nowrap">
              {formatDate(row.endDate)}
            </div>

            {/* Status */}
            <div className="flex-1 px-4 py-4 border-r border-[#252527]">
              <StatusBadge status={row.status} />
            </div>

            {/* Action - View Only */}
            <div className="flex-1 px-4 py-4 flex items-center justify-center">
              <button
                onClick={() => setViewUser(row)}
                className="w-8 h-8 rounded-lg bg-[#252527] flex items-center justify-center
                  text-[#888] hover:bg-blue-700/30 hover:text-blue-400 transition-all duration-200"
              >
                <FiEye size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 px-1">
        <span className="text-sm text-[#666]">
          Showing {paginated.length} of {filtered.length} users
        </span>
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage(p => p - 1)}
            className="w-9 h-9 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] flex items-center justify-center
              text-[#aaa] disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40
              hover:text-red-400 transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]"
          >
            <FiChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p <= 7)
            .map(p => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-xl text-sm transition-all
                  ${p === currentPage
                    ? 'bg-red-700 text-white font-semibold'
                    : 'bg-[#1c1c1e] border border-[#2a2a2c] text-[#aaa] hover:border-red-700/40 hover:text-red-400'}`}>
                {p}
              </button>
            ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setPage(p => p + 1)}
            className="w-9 h-9 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] flex items-center justify-center
              text-[#aaa] disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40
              hover:text-red-400 transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* View Modal */}
      {viewUser && <ViewModal user={viewUser} onClose={() => setViewUser(null)} />}
    </div>
  );
};

export default SubscriptionsList;