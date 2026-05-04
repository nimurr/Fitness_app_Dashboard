
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiCheckCircle, FiXCircle, FiStar, FiCalendar, FiList, FiDollarSign, FiHash } from 'react-icons/fi';
import { useGetAllPlansQuery } from '../../redux/features/plan/plan';

const PAGE_SIZE = 5;

/* ── Helpers ── */
const getLocalized = (field, locale = 'en-US') => {
  if (!field) return '—';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    return field[locale] || field['en'] || Object.values(field)[0] || '—';
  }
  return String(field);
};

/* ── Tag ── */
const Tag = ({ label, color = 'neutral' }) => {
  const styles = {
    red: 'bg-red-700/20 text-red-400 border-red-700/30',
    green: 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30',
    amber: 'bg-amber-700/20 text-amber-400 border-amber-700/30',
    blue: 'bg-blue-700/20 text-blue-400 border-blue-700/30',
    neutral: 'bg-[#2a2a2c] text-[#888] border-[#333]',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${styles[color] || styles.neutral}`}>
      {label}
    </span>
  );
};

/* ── Status Badge ── */
const StatusBadge = ({ active }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border
    ${active
      ? 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30'
      : 'bg-[#2a2a2c] text-[#555] border-[#333]'
    }`}>
    {active
      ? <FiCheckCircle size={10} />
      : <FiXCircle size={10} />
    }
    {active ? 'Active' : 'Inactive'}
  </span>
);

/* ── Plan Detail Modal ── */
const PlanModal = ({ plan, onClose }) => {
  if (!plan) return null;

  const planName = getLocalized(plan.name);
  const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
  const yearlyPrice = plan.pricing?.yearly?.amount ?? plan.pricing?.yearly?.price ?? '—';
  const currency = plan.pricing?.monthly?.currency ?? 'USD';

  const sections = [
    {
      icon: FiHash,
      label: 'Slug',
      value: plan.slug,
    },
    {
      icon: FiCalendar,
      label: 'Meals / Month',
      value: plan.limits?.mealsPerMonth ?? '—',
    },
    {
      icon: FiCalendar,
      label: 'Meals / Week',
      value: plan.limits?.mealsPerWeek ?? '—',
    },
    {
      icon: FiDollarSign,
      label: 'Monthly Price',
      value: `${currency} ${monthlyPrice}`,
    },
    {
      icon: FiDollarSign,
      label: 'Yearly Price',
      value: `${currency} ${yearlyPrice}`,
    },
  ];

  const features = Array.isArray(plan.features)
    ? plan.features.map((f, i) => ({
        id: i,
        label: getLocalized(f),
      }))
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="relative h-20 bg-gradient-to-r from-red-900/50 via-[#1c1c1e] to-[#1c1c1e]">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #cc1a1a 0%, transparent 60%)' }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center
              justify-center text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors"
          >
            <FaTimes size={11} />
          </button>
          {/* Plan icon */}
          <div className="absolute -bottom-7 left-5">
            <div className="w-14 h-14 rounded-xl border-2 border-red-700 bg-red-700/20
              flex items-center justify-center shadow-xl">
              <FiStar size={22} className="text-red-400" />
            </div>
          </div>
        </div>

        {/* Name + badges */}
        <div className="pt-10 px-5 pb-1 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[#f0f0f2] font-semibold text-base">{planName}</h3>
            <p className="text-[#555] text-[11px] mt-0.5 uppercase tracking-widest">{plan.slug}</p>
          </div>
          <div className="flex flex-col items-end gap-1 mt-1">
            <StatusBadge active={plan.isActive} />
            {plan.isPopular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
                font-semibold border bg-amber-700/20 text-amber-400 border-amber-700/30">
                <FiStar size={10} /> Popular
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 my-3 border-t border-[#252527]" />

        {/* Info sections */}
        <div className="px-5 flex flex-col gap-2.5">
          {sections.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-[#252527] rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
                  <Icon size={12} className="text-red-400" />
                </div>
                <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">
                  {label}
                </span>
              </div>
              <p className="text-[#f0f0f2] text-sm font-medium pl-8">{value}</p>
            </div>
          ))}

          {/* Features */}
          {features.length > 0 && (
            <div className="bg-[#252527] rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
                  <FiList size={12} className="text-red-400" />
                </div>
                <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">
                  Features
                </span>
              </div>
              <div className="pl-8 flex flex-col gap-1.5">
                {features.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <FiCheckCircle size={11} className="text-emerald-400 shrink-0" />
                    <span className="text-[#ccc] text-[11px]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pb-5 mt-3">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
              text-white text-sm font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Page ── */
const MealPlan = () => {
  const { data, isLoading } = useGetAllPlansQuery();
  const allPlans = data?.data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = allPlans.filter(p =>
    getLocalized(p.name).toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const cols = ['#', 'Plan Name', 'Status', 'Popular', 'Meals/Month', 'Meals/Week', 'Pricing', 'Details'];

  return (
    <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#f0f0f2]">Meal Plans</h1>
          <p className="text-[#555] text-sm mt-0.5">Manage subscription plans & dietary limits</p>
        </div>
        <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
          px-3 py-2 focus-within:border-red-700 transition-colors w-full sm:w-56">
          <FiStar size={14} className="text-[#555] shrink-0" />
          <input
            type="text"
            placeholder="Search plan…"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-sm text-[#ccc] placeholder-[#444] focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl overflow-hidden">

        {/* Header row */}
        <div className="flex items-center border-b-2 border-red-700">
          {cols.map((col, i) => (
            <div
              key={col}
              className={`flex-1 px-4 py-4 text-xs font-medium text-[#f0f0f2] tracking-wide
                ${i < cols.length - 1 ? 'border-r border-[#2a2a2c]' : ''}`}
            >
              {col}
            </div>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="py-16 text-center text-[#444] text-sm">Loading plans…</div>
        )}

        {/* Empty */}
        {!isLoading && paginated.length === 0 && (
          <div className="py-16 text-center text-[#444] text-sm">No plans found.</div>
        )}

        {/* Data rows */}
        {!isLoading && paginated.map((plan, ri) => {
          const planName = getLocalized(plan.name);
          const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price;
          const yearlyCurrency = plan.pricing?.monthly?.currency ?? 'USD';

          return (
            <div
              key={plan._id}
              className={`flex items-center hover:bg-[#222224] transition-colors duration-150
                ${ri < paginated.length - 1 ? 'border-b border-[#252527]' : ''}`}
            >
              {/* # */}
              <div className="flex-1 px-4 py-4 text-sm text-[#555] border-r border-[#252527]">
                {(currentPage - 1) * PAGE_SIZE + ri + 1}
              </div>

              {/* Plan Name */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-700/20 flex items-center justify-center shrink-0">
                    <FiStar size={13} className="text-red-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-[#f0f0f2] font-medium truncate">{planName}</p>
                    <p className="text-[10px] text-[#555] truncate">{plan.slug}</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <StatusBadge active={plan.isActive} />
              </div>

              {/* Popular */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                {plan.isPopular
                  ? <Tag label="Popular" color="amber" />
                  : <span className="text-[#444] text-[10px]">—</span>
                }
              </div>

              {/* Meals/Month */}
              <div className="flex-1 px-4 py-4 text-sm text-[#ccc] border-r border-[#252527]">
                {plan.limits?.mealsPerMonth ?? '—'}
              </div>

              {/* Meals/Week */}
              <div className="flex-1 px-4 py-4 text-sm text-[#ccc] border-r border-[#252527]">
                {plan.limits?.mealsPerWeek ?? '—'}
              </div>

              {/* Pricing */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                {monthlyPrice != null
                  ? (
                    <div>
                      <p className="text-sm text-[#f0f0f2] font-medium">
                        {yearlyCurrency} {monthlyPrice}
                      </p>
                      <p className="text-[10px] text-[#555]">/ month</p>
                    </div>
                  )
                  : <span className="text-[#444] text-[10px]">—</span>
                }
              </div>

              {/* Action */}
              <div className="flex-1 px-4 py-4 flex justify-center">
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="px-3 py-1.5 rounded-lg bg-red-700/20 border border-red-700/30
                    text-red-400 text-[10px] font-semibold hover:bg-red-700 hover:text-white
                    transition-all duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 px-1">
        <span className="text-sm text-[#666]">
          Showing {paginated.length} of {filtered.length} plans
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="text-sm px-1 text-[#aaa] disabled:text-[#444] disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p <= 6)
            .map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-[32px] h-[32px] rounded-full text-sm transition-all
                  ${p === currentPage
                    ? 'bg-red-700 text-white font-semibold'
                    : 'text-[#aaa] hover:text-white'
                  }`}
              >
                {p}
              </button>
            ))}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
            className="text-sm px-1 text-[#aaa] disabled:text-[#444] disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </div>
  );
};

export default MealPlan;