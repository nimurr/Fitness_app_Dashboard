
// import React, { useState } from 'react';
// import { FaTimes } from 'react-icons/fa';
// import { FiCheckCircle, FiXCircle, FiStar, FiCalendar, FiList, FiDollarSign, FiHash } from 'react-icons/fi';
// import { useCreateMealPlanMutation, useGetAllPlansQuery } from '../../redux/features/plan/plan';

// const PAGE_SIZE = 5;

// /* ── Helpers ── */
// const getLocalized = (field, locale = 'en-US') => {
//   if (!field) return '—';
//   if (typeof field === 'string') return field;
//   if (typeof field === 'object') {
//     return field[locale] || field['en'] || Object.values(field)[0] || '—';
//   }
//   return String(field);
// };

// /* ── Tag ── */
// const Tag = ({ label, color = 'neutral' }) => {
//   const styles = {
//     red: 'bg-red-700/20 text-red-400 border-red-700/30',
//     green: 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30',
//     amber: 'bg-amber-700/20 text-amber-400 border-amber-700/30',
//     blue: 'bg-blue-700/20 text-blue-400 border-blue-700/30',
//     neutral: 'bg-[#2a2a2c] text-[#888] border-[#333]',
//   };
//   return (
//     <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${styles[color] || styles.neutral}`}>
//       {label}
//     </span>
//   );
// };

// /* ── Status Badge ── */
// const StatusBadge = ({ active }) => (
//   <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border
//     ${active
//       ? 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30'
//       : 'bg-[#2a2a2c] text-[#555] border-[#333]'
//     }`}>
//     {active
//       ? <FiCheckCircle size={10} />
//       : <FiXCircle size={10} />
//     }
//     {active ? 'Active' : 'Inactive'}
//   </span>
// );

// /* ── Plan Detail Modal ── */
// const PlanModal = ({ plan, onClose }) => {
//   if (!plan) return null;

//   const planName = getLocalized(plan.name);
//   const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
//   const yearlyPrice = plan.pricing?.yearly?.amount ?? plan.pricing?.yearly?.price ?? '—';
//   const currency = plan.pricing?.monthly?.currency ?? 'USD';

//   const sections = [
//     {
//       icon: FiHash,
//       label: 'Slug',
//       value: plan.slug,
//     },
//     {
//       icon: FiCalendar,
//       label: 'Meals / Month',
//       value: plan.limits?.mealsPerMonth ?? '—',
//     },
//     {
//       icon: FiCalendar,
//       label: 'Meals / Week',
//       value: plan.limits?.mealsPerWeek ?? '—',
//     },
//     {
//       icon: FiDollarSign,
//       label: 'Monthly Price',
//       value: `${currency} ${monthlyPrice}`,
//     },
//     {
//       icon: FiDollarSign,
//       label: 'Yearly Price',
//       value: `${currency} ${yearlyPrice}`,
//     },
//   ];

//   const features = Array.isArray(plan.features)
//     ? plan.features.map((f, i) => ({
//       id: i,
//       label: getLocalized(f),
//     }))
//     : [];

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
//         onClick={e => e.stopPropagation()}
//       >
//         {/* Header banner */}
//         <div className="relative h-20 bg-gradient-to-r from-red-900/50 via-[#1c1c1e] to-[#1c1c1e]">
//           <div
//             className="absolute inset-0 opacity-10"
//             style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #cc1a1a 0%, transparent 60%)' }}
//           />
//           <button
//             onClick={onClose}
//             className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center
//               justify-center text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors"
//           >
//             <FaTimes size={11} />
//           </button>
//           {/* Plan icon */}
//           <div className="absolute -bottom-7 left-5">
//             <div className="w-14 h-14 rounded-xl border-2 border-red-700 bg-red-700/20
//               flex items-center justify-center shadow-xl">
//               <FiStar size={22} className="text-red-400" />
//             </div>
//           </div>
//         </div>

//         {/* Name + badges */}
//         <div className="pt-10 px-5 pb-1 flex items-start justify-between gap-2">
//           <div>
//             <h3 className="text-[#f0f0f2] font-semibold text-base">{planName}</h3>
//             <p className="text-[#555] text-[11px] mt-0.5 uppercase tracking-widest">{plan.slug}</p>
//           </div>
//           <div className="flex flex-col items-end gap-1 mt-1">
//             <StatusBadge active={plan.isActive} />
//             {plan.isPopular && (
//               <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
//                 font-semibold border bg-amber-700/20 text-amber-400 border-amber-700/30">
//                 <FiStar size={10} /> Popular
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="mx-5 my-3 border-t border-[#252527]" />

//         {/* Info sections */}
//         <div className="px-5 flex flex-col gap-2.5">
//           {sections.map(({ icon: Icon, label, value }) => (
//             <div key={label} className="bg-[#252527] rounded-xl px-4 py-3">
//               <div className="flex items-center gap-2 mb-1.5">
//                 <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
//                   <Icon size={12} className="text-red-400" />
//                 </div>
//                 <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">
//                   {label}
//                 </span>
//               </div>
//               <p className="text-[#f0f0f2] text-sm font-medium pl-8">{value}</p>
//             </div>
//           ))}

//           {/* Features */}
//           {features.length > 0 && (
//             <div className="bg-[#252527] rounded-xl px-4 py-3">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
//                   <FiList size={12} className="text-red-400" />
//                 </div>
//                 <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">
//                   Features
//                 </span>
//               </div>
//               <div className="pl-8 flex flex-col gap-1.5">
//                 {features.map(({ id, label }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     <FiCheckCircle size={11} className="text-emerald-400 shrink-0" />
//                     <span className="text-[#ccc] text-[11px]">{label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="px-5 pb-5 mt-3">
//           <button
//             onClick={onClose}
//             className="w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
//               text-white text-sm font-semibold"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ── Main Page ── */
// const MealPlan = () => {
//   const { data, isLoading } = useGetAllPlansQuery();
//   const allPlans = data?.data ?? [];

//   const [createMealPlan] = useCreateMealPlanMutation();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [search, setSearch] = useState('');

//   const filtered = allPlans.filter(p =>
//     getLocalized(p.name).toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
//   const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

//   const cols = ['#', 'Plan Name', 'Status', 'Popular', 'Meals/Month', 'Meals/Week', 'Pricing', 'Details'];

//   return (
//     <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-xl font-semibold text-[#f0f0f2]">Meal Plans</h1>
//           <p className="text-[#555] text-sm mt-0.5">Manage subscription plans & dietary limits</p>
//         </div>
//         <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
//           px-3 py-2 focus-within:border-red-700 transition-colors w-full sm:w-56">
//           <FiStar size={14} className="text-[#555] shrink-0" />
//           <input
//             type="text"
//             placeholder="Search plan…"
//             value={search}
//             onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
//             className="bg-transparent text-sm text-[#ccc] placeholder-[#444] focus:outline-none w-full"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl overflow-hidden">

//         {/* Header row */}
//         <div className="flex items-center border-b-2 border-red-700">
//           {cols.map((col, i) => (
//             <div
//               key={col}
//               className={`flex-1 px-4 py-4 text-xs font-medium text-[#f0f0f2] tracking-wide
//                 ${i < cols.length - 1 ? 'border-r border-[#2a2a2c]' : ''}`}
//             >
//               {col}
//             </div>
//           ))}
//         </div>

//         {/* Loading */}
//         {isLoading && (
//           <div className="py-16 text-center text-[#444] text-sm">Loading plans…</div>
//         )}

//         {/* Empty */}
//         {!isLoading && paginated.length === 0 && (
//           <div className="py-16 text-center text-[#444] text-sm">No plans found.</div>
//         )}

//         {/* Data rows */}
//         {!isLoading && paginated.map((plan, ri) => {
//           const planName = getLocalized(plan.name);
//           const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price;
//           const yearlyCurrency = plan.pricing?.monthly?.currency ?? 'USD';

//           return (
//             <div
//               key={plan._id}
//               className={`flex items-center hover:bg-[#222224] transition-colors duration-150
//                 ${ri < paginated.length - 1 ? 'border-b border-[#252527]' : ''}`}
//             >
//               {/* # */}
//               <div className="flex-1 px-4 py-4 text-sm text-[#555] border-r border-[#252527]">
//                 {(currentPage - 1) * PAGE_SIZE + ri + 1}
//               </div>

//               {/* Plan Name */}
//               <div className="flex-1 px-4 py-4 border-r border-[#252527]">
//                 <div className="flex items-center gap-2.5">
//                   <div className="w-8 h-8 rounded-lg bg-red-700/20 flex items-center justify-center shrink-0">
//                     <FiStar size={13} className="text-red-400" />
//                   </div>
//                   <div className="min-w-0">
//                     <p className="text-sm text-[#f0f0f2] font-medium truncate">{planName}</p>
//                     <p className="text-[10px] text-[#555] truncate">{plan.slug}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Status */}
//               <div className="flex-1 px-4 py-4 border-r border-[#252527]">
//                 <StatusBadge active={plan.isActive} />
//               </div>

//               {/* Popular */}
//               <div className="flex-1 px-4 py-4 border-r border-[#252527]">
//                 {plan.isPopular
//                   ? <Tag label="Popular" color="amber" />
//                   : <span className="text-[#444] text-[10px]">—</span>
//                 }
//               </div>

//               {/* Meals/Month */}
//               <div className="flex-1 px-4 py-4 text-sm text-[#ccc] border-r border-[#252527]">
//                 {plan.limits?.mealsPerMonth ?? '—'}
//               </div>

//               {/* Meals/Week */}
//               <div className="flex-1 px-4 py-4 text-sm text-[#ccc] border-r border-[#252527]">
//                 {plan.limits?.mealsPerWeek ?? '—'}
//               </div>

//               {/* Pricing */}
//               <div className="flex-1 px-4 py-4 border-r border-[#252527]">
//                 {monthlyPrice != null
//                   ? (
//                     <div>
//                       <p className="text-sm text-[#f0f0f2] font-medium">
//                         {yearlyCurrency} {monthlyPrice}
//                       </p>
//                       <p className="text-[10px] text-[#555]">/ month</p>
//                     </div>
//                   )
//                   : <span className="text-[#444] text-[10px]">—</span>
//                 }
//               </div>

//               {/* Action */}
//               <div className="flex-1 px-4 py-4 flex justify-center">
//                 <button
//                   onClick={() => setSelectedPlan(plan)}
//                   className="px-3 py-1.5 rounded-lg bg-red-700/20 border border-red-700/30
//                     text-red-400 text-[10px] font-semibold hover:bg-red-700 hover:text-white
//                     transition-all duration-200"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Footer */}
//       <div className="flex items-center justify-between mt-5 px-1">
//         <span className="text-sm text-[#666]">
//           Showing {paginated.length} of {filtered.length} plans
//         </span>
//         <div className="flex items-center gap-2">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(p => p - 1)}
//             className="text-sm px-1 text-[#aaa] disabled:text-[#444] disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1)
//             .filter(p => p <= 6)
//             .map(p => (
//               <button
//                 key={p}
//                 onClick={() => setCurrentPage(p)}
//                 className={`w-[32px] h-[32px] rounded-full text-sm transition-all
//                   ${p === currentPage
//                     ? 'bg-red-700 text-white font-semibold'
//                     : 'text-[#aaa] hover:text-white'
//                   }`}
//               >
//                 {p}
//               </button>
//             ))}
//           <button
//             disabled={currentPage === totalPages || totalPages === 0}
//             onClick={() => setCurrentPage(p => p + 1)}
//             className="text-sm px-1 text-[#aaa] disabled:text-[#444] disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
//     </div>
//   );
// };

// export default MealPlan;


import React, { useState } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { FiCheckCircle, FiXCircle, FiStar, FiCalendar, FiList, FiDollarSign, FiHash, FiTrash2, FiPlusCircle } from 'react-icons/fi';
import { useCreateMealPlanMutation, useGetAllPlansQuery } from '../../redux/features/plan/plan';

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
    {active ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
    {active ? 'Active' : 'Inactive'}
  </span>
);

/* ── Shared Input Styles ── */
const inputCls = `w-full bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl px-3 py-2.5 text-sm
  text-[#f0f0f2] placeholder-[#444] focus:outline-none focus:border-red-700 transition-colors`;

const labelCls = `block text-[10px] text-[#555] uppercase tracking-widest font-medium mb-1.5`;

/* ── Toggle Switch ── */
const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center justify-between cursor-pointer">
    <span className="text-sm text-[#ccc]">{label}</span>
    <div
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0
        ${checked ? 'bg-red-700' : 'bg-[#2a2a2c]'}`}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
        ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </div>
  </label>
);

/* ── Create Plan Modal ── */
const EMPTY_FEATURE = () => ({ key: '', label: '', included: true });

const INITIAL_FORM = {
  name: '',
  slug: '',
  pricing: { monthly: { price: '' }, yearly: { price: '' } },
  limits: { mealsPerWeek: '', mealsPerMonth: '' },
  features: [EMPTY_FEATURE()],
  isPopular: false,
  isActive: true,
};

const CreatePlanModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [createMealPlan, { isLoading }] = useCreateMealPlanMutation();

  /* ── Field helpers ── */
  const set = (path, value) => {
    setForm(prev => {
      const next = structuredClone(prev);
      const keys = path.split('.');
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys[keys.length - 1]] = value;
      return next;
    });
    if (errors[path]) setErrors(e => { const n = { ...e }; delete n[path]; return n; });
  };

  const autoSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  /* ── Features ── */
  const addFeature = () => setForm(p => ({ ...p, features: [...p.features, EMPTY_FEATURE()] }));
  const removeFeature = (i) => setForm(p => ({ ...p, features: p.features.filter((_, idx) => idx !== i) }));
  const setFeature = (i, field, value) =>
    setForm(p => {
      const features = [...p.features];
      features[i] = { ...features[i], [field]: value };
      return { ...p, features };
    });

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.slug.trim()) e.slug = 'Slug is required';
    if (form.pricing.monthly.price === '') e['pricing.monthly.price'] = 'Required';
    if (form.pricing.yearly.price === '') e['pricing.yearly.price'] = 'Required';
    if (form.limits.mealsPerWeek === '') e['limits.mealsPerWeek'] = 'Required';
    if (form.limits.mealsPerMonth === '') e['limits.mealsPerMonth'] = 'Required';
    form.features.forEach((f, i) => {
      if (!f.label.trim()) e[`feature_label_${i}`] = 'Label required';
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (!validate()) return;
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      pricing: {
        monthly: { price: parseFloat(form.pricing.monthly.price) },
        yearly: { price: parseFloat(form.pricing.yearly.price) },
      },
      limits: {
        mealsPerWeek: parseInt(form.limits.mealsPerWeek),
        mealsPerMonth: parseInt(form.limits.mealsPerMonth),
      },
      features: form.features.map(f => ({
        key: f.key || f.label.toLowerCase().replace(/\s+/g, '_'),
        label: f.label.trim(),
        included: f.included,
      })),
      isPopular: form.isPopular,
      isActive: form.isActive,
    };

    try {
      await createMealPlan(payload).unwrap();
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Create plan failed:', err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-lg shadow-2xl
          flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2c] shrink-0">
          <div>
            <h3 className="text-[#f0f0f2] font-semibold text-base">Create New Plan</h3>
            <p className="text-[#555] text-[11px] mt-0.5">Fill in the details to add a subscription plan</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center justify-center
              text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors"
          >
            <FaTimes size={11} />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5 flex-1
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2a2a2c]">

          {/* Basic Info */}
          <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-4">
            <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Basic Info</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Plan Name *</label>
                <input
                  className={`${inputCls} ${errors.name ? 'border-red-700' : ''}`}
                  placeholder="e.g. Elite"
                  value={form.name}
                  onChange={e => {
                    set('name', e.target.value);
                    if (!form.slug || form.slug === autoSlug(form.name)) {
                      set('slug', autoSlug(e.target.value));
                    }
                  }}
                />
                {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className={labelCls}>Slug *</label>
                <input
                  className={`${inputCls} ${errors.slug ? 'border-red-700' : ''}`}
                  placeholder="e.g. elite"
                  value={form.slug}
                  onChange={e => set('slug', autoSlug(e.target.value))}
                />
                {errors.slug && <p className="text-red-400 text-[10px] mt-1">{errors.slug}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Toggle
                label="Active"
                checked={form.isActive}
                onChange={v => set('isActive', v)}
              />
              <Toggle
                label="Mark as Popular"
                checked={form.isPopular}
                onChange={v => set('isPopular', v)}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
            <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Pricing (USD)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Monthly Price *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={`${inputCls} pl-7 ${errors['pricing.monthly.price'] ? 'border-red-700' : ''}`}
                    placeholder="20.99"
                    value={form.pricing.monthly.price}
                    onChange={e => set('pricing.monthly.price', e.target.value)}
                  />
                </div>
                {errors['pricing.monthly.price'] && (
                  <p className="text-red-400 text-[10px] mt-1">{errors['pricing.monthly.price']}</p>
                )}
              </div>
              <div>
                <label className={labelCls}>Yearly Price *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={`${inputCls} pl-7 ${errors['pricing.yearly.price'] ? 'border-red-700' : ''}`}
                    placeholder="200"
                    value={form.pricing.yearly.price}
                    onChange={e => set('pricing.yearly.price', e.target.value)}
                  />
                </div>
                {errors['pricing.yearly.price'] && (
                  <p className="text-red-400 text-[10px] mt-1">{errors['pricing.yearly.price']}</p>
                )}
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
            <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Meal Limits</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Meals / Week *</label>
                <input
                  type="number"
                  min="0"
                  className={`${inputCls} ${errors['limits.mealsPerWeek'] ? 'border-red-700' : ''}`}
                  placeholder="4"
                  value={form.limits.mealsPerWeek}
                  onChange={e => set('limits.mealsPerWeek', e.target.value)}
                />
                {errors['limits.mealsPerWeek'] && (
                  <p className="text-red-400 text-[10px] mt-1">{errors['limits.mealsPerWeek']}</p>
                )}
              </div>
              <div>
                <label className={labelCls}>Meals / Month *</label>
                <input
                  type="number"
                  min="0"
                  className={`${inputCls} ${errors['limits.mealsPerMonth'] ? 'border-red-700' : ''}`}
                  placeholder="12"
                  value={form.limits.mealsPerMonth}
                  onChange={e => set('limits.mealsPerMonth', e.target.value)}
                />
                {errors['limits.mealsPerMonth'] && (
                  <p className="text-red-400 text-[10px] mt-1">{errors['limits.mealsPerMonth']}</p>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Features</p>
              <button
                onClick={addFeature}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                  bg-red-700/20 border border-red-700/30 text-red-400 text-[10px] font-semibold
                  hover:bg-red-700 hover:text-white transition-all"
              >
                <FiPlusCircle size={11} /> Add Feature
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {form.features.map((feature, i) => (
                <div key={i} className="bg-[#1c1c1e] rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {/* Label */}
                    <div className="flex-1">
                      <input
                        className={`${inputCls} ${errors[`feature_label_${i}`] ? 'border-red-700' : ''}`}
                        placeholder="Feature label (e.g. AI Nutrition Balance)"
                        value={feature.label}
                        onChange={e => setFeature(i, 'label', e.target.value)}
                      />
                      {errors[`feature_label_${i}`] && (
                        <p className="text-red-400 text-[10px] mt-1">{errors[`feature_label_${i}`]}</p>
                      )}
                    </div>
                    {/* Included toggle */}
                    <button
                      onClick={() => setFeature(i, 'included', !feature.included)}
                      title={feature.included ? 'Included' : 'Not included'}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors
                        ${feature.included
                          ? 'bg-emerald-700/20 text-emerald-400 border border-emerald-700/30'
                          : 'bg-[#2a2a2c] text-[#555] border border-[#333]'
                        }`}
                    >
                      <FiCheckCircle size={13} />
                    </button>
                    {/* Remove */}
                    {form.features.length > 1 && (
                      <button
                        onClick={() => removeFeature(i)}
                        className="w-7 h-7 rounded-lg bg-red-700/10 border border-red-700/20
                          flex items-center justify-center text-red-500 hover:bg-red-700/30 transition-colors shrink-0"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </div>
                  {/* Key (optional) */}
                  <input
                    className={`${inputCls} text-[11px] text-[#666]`}
                    placeholder="Key (optional, e.g. ai_nutrition) — auto-generated if left blank"
                    value={feature.key}
                    onChange={e => setFeature(i, 'key', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-[#2a2a2c] flex items-center gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#252527] border border-[#2a2a2c]
              text-[#888] text-sm font-semibold hover:text-white hover:bg-[#2a2a2c] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
              text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating…
              </>
            ) : (
              <>
                <FaPlus size={11} /> Create Plan
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Plan Detail Modal ── */
const PlanModal = ({ plan, onClose }) => {
  if (!plan) return null;

  const planName = getLocalized(plan.name);
  const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
  const yearlyPrice = plan.pricing?.yearly?.amount ?? plan.pricing?.yearly?.price ?? '—';
  const currency = plan.pricing?.monthly?.currency ?? 'USD';

  const sections = [
    { icon: FiHash, label: 'Slug', value: plan.slug },
    { icon: FiCalendar, label: 'Meals / Month', value: plan.limits?.mealsPerMonth ?? '—' },
    { icon: FiCalendar, label: 'Meals / Week', value: plan.limits?.mealsPerWeek ?? '—' },
    { icon: FiDollarSign, label: 'Monthly Price', value: `${currency} ${monthlyPrice}` },
    { icon: FiDollarSign, label: 'Yearly Price', value: `${currency} ${yearlyPrice}` },
  ];

  const features = Array.isArray(plan.features)
    ? plan.features.map((f, i) => ({
      id: i,
      label: f?.label ?? getLocalized(f),
      included: f?.included ?? true,
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
        <div className="relative h-20 bg-gradient-to-r from-red-900/50 via-[#1c1c1e] to-[#1c1c1e]">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #cc1a1a 0%, transparent 60%)' }} />
          <button onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center
              justify-center text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors">
            <FaTimes size={11} />
          </button>
          <div className="absolute -bottom-7 left-5">
            <div className="w-14 h-14 rounded-xl border-2 border-red-700 bg-red-700/20
              flex items-center justify-center shadow-xl">
              <FiStar size={22} className="text-red-400" />
            </div>
          </div>
        </div>

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

        <div className="mx-5 my-3 border-t border-[#252527]" />

        <div className="px-5 flex flex-col gap-2.5">
          {sections.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-[#252527] rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
                  <Icon size={12} className="text-red-400" />
                </div>
                <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">{label}</span>
              </div>
              <p className="text-[#f0f0f2] text-sm font-medium pl-8">{value}</p>
            </div>
          ))}

          {features.length > 0 && (
            <div className="bg-[#252527] rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
                  <FiList size={12} className="text-red-400" />
                </div>
                <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">Features</span>
              </div>
              <div className="pl-8 flex flex-col gap-1.5">
                {features.map(({ id, label, included }) => (
                  <div key={id} className="flex items-center gap-2">
                    {included
                      ? <FiCheckCircle size={11} className="text-emerald-400 shrink-0" />
                      : <FiXCircle size={11} className="text-[#555] shrink-0" />
                    }
                    <span className={`text-[11px] ${included ? 'text-[#ccc]' : 'text-[#555]'}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pb-5 mt-3">
          <button onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
              text-white text-sm font-semibold">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Page ── */
const MealPlan = () => {
  const { data, isLoading, refetch } = useGetAllPlansQuery();
  const allPlans = data?.data ?? [];

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
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

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
            px-3 py-2 focus-within:border-red-700 transition-colors w-full sm:w-52">
            <FiStar size={14} className="text-[#555] shrink-0" />
            <input
              type="text"
              placeholder="Search plan…"
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              className="bg-transparent text-sm text-[#ccc] placeholder-[#444] focus:outline-none w-full"
            />
          </div>

          {/* Create button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-700
              hover:bg-red-600 transition-colors text-white text-sm font-semibold shrink-0"
          >
            <FaPlus size={11} />
            Create New Plan
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto ">
        {/* Table */}
        <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl min-w-[1000px]">

          <div className="flex items-center border-b-2 border-red-700">
            {cols.map((col, i) => (
              <div key={col}
                className={`flex-1 px-4 py-4 text-xs font-medium text-[#f0f0f2] tracking-wide
                ${i < cols.length - 1 ? 'border-r border-[#2a2a2c]' : ''}`}>
                {col}
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="py-16 text-center text-[#444] text-sm">Loading plans…</div>
          )}
          {!isLoading && paginated.length === 0 && (
            <div className="py-16 text-center text-[#444] text-sm">No plans found.</div>
          )}

          {!isLoading && paginated.map((plan, ri) => {
            const planName = getLocalized(plan.name);
            const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price;
            const yearlyCurrency = plan.pricing?.monthly?.currency ?? 'USD';

            return (
              <div key={plan._id}
                className={`flex items-center hover:bg-[#222224] transition-colors duration-150
                ${ri < paginated.length - 1 ? 'border-b border-[#252527]' : ''}`}>

                <div className="flex-1 px-4 py-4 text-sm text-[#555] border-r border-[#252527]">
                  {(currentPage - 1) * PAGE_SIZE + ri + 1}
                </div>

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

                <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                  <StatusBadge active={plan.isActive} />
                </div>

                <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                  {plan.isPopular
                    ? <Tag label="Popular" color="amber" />
                    : <span className="text-[#444] text-[10px]">—</span>
                  }
                </div>

                <div className="flex-1 px-4 py-4 text-sm text-[#ccc] border-r border-[#252527]">
                  {plan.limits?.mealsPerMonth ?? '—'}
                </div>

                <div className="flex-1 px-4 py-4 text-sm text-[#ccc] border-r border-[#252527]">
                  {plan.limits?.mealsPerWeek ?? '—'}
                </div>

                <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                  {monthlyPrice != null ? (
                    <div>
                      <p className="text-sm text-[#f0f0f2] font-medium">{yearlyCurrency} {monthlyPrice}</p>
                      <p className="text-[10px] text-[#555]">/ month</p>
                    </div>
                  ) : <span className="text-[#444] text-[10px]">—</span>}
                </div>

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
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between mt-5 px-1">
        <span className="text-sm text-[#666]">
          Showing {paginated.length} of {filtered.length} plans
        </span>
        <div className="flex items-center gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
            className="text-sm px-1 text-[#aaa] disabled:text-[#444] disabled:cursor-not-allowed">
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p <= 6)
            .map(p => (
              <button key={p} onClick={() => setCurrentPage(p)}
                className={`w-[32px] h-[32px] rounded-full text-sm transition-all
                  ${p === currentPage ? 'bg-red-700 text-white font-semibold' : 'text-[#aaa] hover:text-white'}`}>
                {p}
              </button>
            ))}
          <button disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
            className="text-sm px-1 text-[#aaa] disabled:text-[#444] disabled:cursor-not-allowed">
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      {showCreateModal && (
        <CreatePlanModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
};

export default MealPlan;