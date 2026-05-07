// // import React, { useState } from 'react';
// // import { FaTimes, FaPlus } from 'react-icons/fa';
// // import {
// //   FiCheckCircle, FiXCircle, FiStar, FiCalendar,
// //   FiList, FiDollarSign, FiHash, FiTrash2, FiPlusCircle, FiSearch
// // } from 'react-icons/fi';
// // import { useCreateMealPlanMutation, useDeletePlanSubMutation, useGetAllPlansQuery } from '../../redux/features/plan/plan';

// // const PAGE_SIZE = 6;

// // /* ── Helpers ── */
// // const getLocalized = (field, locale = 'en-US') => {
// //   if (!field) return '—';
// //   if (typeof field === 'string') return field;
// //   if (typeof field === 'object') {
// //     return field[locale] || field['en'] || Object.values(field)[0] || '—';
// //   }
// //   return String(field);
// // };

// // /* ── Shared Input Styles ── */
// // const inputCls = `w-full bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl px-3 py-2.5 text-sm
// //   text-[#f0f0f2] placeholder-[#444] focus:outline-none focus:border-red-700 transition-colors`;
// // const labelCls = `block text-[10px] text-[#555] uppercase tracking-widest font-medium mb-1.5`;

// // /* ── Toggle Switch ── */
// // const Toggle = ({ checked, onChange, label }) => (
// //   <label className="flex items-center justify-between cursor-pointer">
// //     <span className="text-sm text-[#ccc]">{label}</span>
// //     <div
// //       onClick={() => onChange(!checked)}
// //       className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0
// //         ${checked ? 'bg-red-700' : 'bg-[#2a2a2c]'}`}
// //     >
// //       <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
// //         ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
// //     </div>
// //   </label>
// // );

// // /* ── Plan Card ── */
// // const PlanCard = ({ plan, onViewDetails }) => {
// //   const planName = getLocalized(plan.name);
// //   const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
// //   const yearlyPrice = plan.pricing?.yearly?.amount ?? plan.pricing?.yearly?.price ?? '—';
// //   const currency = plan.pricing?.monthly?.currency ?? 'USD';
// //   const features = Array.isArray(plan.features)
// //     ? plan.features.map((f, i) => ({
// //       id: i,
// //       label: f?.label ?? getLocalized(f),
// //       included: f?.included ?? true,
// //     }))
// //     : [];

// //   return (
// //     <div className={`relative bg-[#1c1c1e] border rounded-2xl p-7 flex flex-col gap-5
// //       transition-all duration-200 hover:border-red-700/40 hover:-translate-y-0.5
// //       ${plan.isPopular ? 'border-red-700/50' : 'border-[#2a2a2c]'}`}>

// //       {/* Popular badge */}
// //       {plan.isPopular && (
// //         <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
// //           <span className="px-4 py-1.5 rounded-full bg-red-700 text-white text-xs font-bold
// //             tracking-wider shadow-lg shadow-red-900/40">
// //             POPULAR
// //           </span>
// //         </div>
// //       )}

// //       {/* Header: name + status */}
// //       <div className="flex items-start justify-between gap-2">
// //         <div>
// //           <div className="flex items-center gap-2.5 mb-1">
// //             <div className="w-8 h-8 rounded-lg bg-red-700/20 flex items-center justify-center shrink-0">
// //               <FiStar size={14} className="text-red-400" />
// //             </div>
// //             <h3 className="text-[#f0f0f2] font-semibold text-lg">{planName}</h3>
// //           </div>
// //           <p className="text-[#555] text-[10px] uppercase tracking-widest pl-10">{plan.slug}</p>
// //           <div className="w-8 h-0.5 bg-red-700 rounded mt-2 ml-10" />
// //         </div>
// //         {/* Active badge */}
// //         <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
// //           font-semibold border shrink-0
// //           ${plan.isActive
// //             ? 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30'
// //             : 'bg-[#2a2a2c] text-[#555] border-[#333]'}`}>
// //           {plan.isActive
// //             ? <FiCheckCircle size={10} />
// //             : <FiXCircle size={10} />}
// //           {plan.isActive ? 'Active' : 'Inactive'}
// //         </span>
// //       </div>

// //       {/* Meal Limits */}
// //       <div className="grid grid-cols-2 gap-2">
// //         <div className="bg-[#252527] rounded-xl px-3 py-2.5 flex items-center gap-2">
// //           <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
// //             <FiCalendar size={11} className="text-red-400" />
// //           </div>
// //           <div>
// //             <p className="text-[9px] text-[#555] uppercase tracking-widest">Per Week</p>
// //             <p className="text-sm text-[#f0f0f2] font-semibold">
// //               {plan.limits?.mealsPerWeek ?? '—'}
// //             </p>
// //           </div>
// //         </div>
// //         <div className="bg-[#252527] rounded-xl px-3 py-2.5 flex items-center gap-2">
// //           <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
// //             <FiCalendar size={11} className="text-red-400" />
// //           </div>
// //           <div>
// //             <p className="text-[9px] text-[#555] uppercase tracking-widest">Per Month</p>
// //             <p className="text-sm text-[#f0f0f2] font-semibold">
// //               {plan.limits?.mealsPerMonth ?? '—'}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Features */}
// //       {features.length > 0 && (
// //         <ul className="flex flex-col gap-2 flex-1">
// //           {features.map(({ id, label, included }) => (
// //             <li key={id} className="flex items-start gap-2.5">
// //               <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5
// //                 ${included ? 'bg-red-700/20' : 'bg-[#252527]'}`}>
// //                 {included
// //                   ? <FiCheckCircle size={11} className="text-red-400" />
// //                   : <FiXCircle size={11} className="text-[#444]" />}
// //               </div>
// //               <span className={`text-sm leading-relaxed ${included ? 'text-[#aaa]' : 'text-[#444] line-through'}`}>
// //                 {label}
// //               </span>
// //             </li>
// //           ))}
// //         </ul>
// //       )}

// //       {/* Pricing */}
// //       <div className="border-t border-[#252527] pt-5 flex items-end justify-between">
// //         <div>
// //           <div className="flex items-end gap-1">
// //             <span className="text-red-400 text-base font-semibold mb-1">{currency}</span>
// //             <span className="text-[#f0f0f2] text-4xl font-bold leading-none">{monthlyPrice}</span>
// //             <span className="text-[#555] text-sm mb-1.5 ml-1">/ mo</span>
// //           </div>
// //           <p className="text-[10px] text-[#555] mt-0.5">
// //             {currency} {yearlyPrice} / year
// //           </p>
// //         </div>
// //         <div className='flex items-center  justify-end gap-3'>
// //           <button className='px-4 py-1 border rounded-lg border-red-700/40 bg-red-500 text-white transition-all duration-200'>
// //             Delete
// //           </button>
// //           {/* View Details */}
// //           <button
// //             onClick={() => onViewDetails(plan)}
// //             className="px-4 py-2 rounded-xl bg-[#252527] border border-[#2a2a2c] text-[#aaa]
// //             text-xs font-semibold hover:border-red-700/40 hover:text-red-400 transition-all duration-200"
// //           >
// //             View Details
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ── Plan Detail Modal ── */
// // const PlanModal = ({ plan, onClose }) => {
// //   if (!plan) return null;

// //   const planName = getLocalized(plan.name);
// //   const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
// //   const yearlyPrice = plan.pricing?.yearly?.amount ?? plan.pricing?.yearly?.price ?? '—';
// //   const currency = plan.pricing?.monthly?.currency ?? 'USD';

// //   const sections = [
// //     { icon: FiHash, label: 'Slug', value: plan.slug },
// //     { icon: FiCalendar, label: 'Meals / Month', value: plan.limits?.mealsPerMonth ?? '—' },
// //     { icon: FiCalendar, label: 'Meals / Week', value: plan.limits?.mealsPerWeek ?? '—' },
// //     { icon: FiDollarSign, label: 'Monthly Price', value: `${currency} ${monthlyPrice}` },
// //     { icon: FiDollarSign, label: 'Yearly Price', value: `${currency} ${yearlyPrice}` },
// //   ];

// //   const features = Array.isArray(plan.features)
// //     ? plan.features.map((f, i) => ({
// //       id: i,
// //       label: f?.label ?? getLocalized(f),
// //       included: f?.included ?? true,
// //     }))
// //     : [];

// //   return (
// //     <div
// //       className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
// //       onClick={onClose}
// //     >
// //       <div
// //         className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl
// //           overflow-hidden max-h-[90vh] flex flex-col"
// //         onClick={e => e.stopPropagation()}
// //       >
// //         {/* Banner */}
// //         <div className="relative h-20 bg-gradient-to-r from-red-900/50 via-[#1c1c1e] to-[#1c1c1e] shrink-0">
// //           <div className="absolute inset-0 opacity-10"
// //             style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #cc1a1a 0%, transparent 60%)' }} />
// //           <button onClick={onClose}
// //             className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center
// //               justify-center text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors">
// //             <FaTimes size={11} />
// //           </button>
// //           <div className="absolute -bottom-7 left-5">
// //             <div className="w-14 h-14 rounded-xl border-2 border-red-700 bg-red-700/20
// //               flex items-center justify-center shadow-xl">
// //               <FiStar size={22} className="text-red-400" />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Name + badges */}
// //         <div className="pt-10 px-5 pb-1 flex items-start justify-between gap-2 shrink-0">
// //           <div>
// //             <h3 className="text-[#f0f0f2] font-semibold text-base">{planName}</h3>
// //             <p className="text-[#555] text-[11px] mt-0.5 uppercase tracking-widest">{plan.slug}</p>
// //           </div>
// //           <div className="flex flex-col items-end gap-1 mt-1">
// //             <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border
// //               ${plan.isActive
// //                 ? 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30'
// //                 : 'bg-[#2a2a2c] text-[#555] border-[#333]'}`}>
// //               {plan.isActive ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
// //               {plan.isActive ? 'Active' : 'Inactive'}
// //             </span>
// //             {plan.isPopular && (
// //               <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
// //                 font-semibold border bg-amber-700/20 text-amber-400 border-amber-700/30">
// //                 <FiStar size={10} /> Popular
// //               </span>
// //             )}
// //           </div>
// //         </div>

// //         <div className="mx-5 my-3 border-t border-[#252527] shrink-0" />

// //         {/* Scrollable content */}
// //         <div className="px-5 flex flex-col gap-2.5 overflow-y-auto flex-1">
// //           {sections.map(({ icon: Icon, label, value }) => (
// //             <div key={label} className="bg-[#252527] rounded-xl px-4 py-3">
// //               <div className="flex items-center gap-2 mb-1.5">
// //                 <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
// //                   <Icon size={12} className="text-red-400" />
// //                 </div>
// //                 <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">{label}</span>
// //               </div>
// //               <p className="text-[#f0f0f2] text-sm font-medium pl-8">{value}</p>
// //             </div>
// //           ))}

// //           {features.length > 0 && (
// //             <div className="bg-[#252527] rounded-xl px-4 py-3">
// //               <div className="flex items-center gap-2 mb-2">
// //                 <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
// //                   <FiList size={12} className="text-red-400" />
// //                 </div>
// //                 <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">Features</span>
// //               </div>
// //               <div className="pl-8 flex flex-col gap-1.5">
// //                 {features.map(({ id, label, included }) => (
// //                   <div key={id} className="flex items-center gap-2">
// //                     {included
// //                       ? <FiCheckCircle size={11} className="text-emerald-400 shrink-0" />
// //                       : <FiXCircle size={11} className="text-[#555] shrink-0" />}
// //                     <span className={`text-[11px] ${included ? 'text-[#ccc]' : 'text-[#555]'}`}>{label}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         <div className="px-5 pb-5 mt-3 shrink-0">
// //           <button onClick={onClose}
// //             className="w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
// //               text-white text-sm font-semibold">
// //             Close
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ── Create Plan Modal ── */
// // const EMPTY_FEATURE = () => ({ key: '', label: '', included: true });
// // const INITIAL_FORM = {
// //   name: '', slug: '',
// //   pricing: { monthly: { price: '' }, yearly: { price: '' } },
// //   limits: { mealsPerWeek: '', mealsPerMonth: '' },
// //   features: [EMPTY_FEATURE()],
// //   isPopular: false, isActive: true,
// // };

// // const CreatePlanModal = ({ onClose, onSuccess }) => {
// //   const [form, setForm] = useState(INITIAL_FORM);
// //   const [errors, setErrors] = useState({});
// //   const [createMealPlan, { isLoading }] = useCreateMealPlanMutation();

// //   const [deletePlan] = useDeletePlanSubMutation();

// //   const set = (path, value) => {
// //     setForm(prev => {
// //       const next = structuredClone(prev);
// //       const keys = path.split('.');
// //       let ref = next;
// //       for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
// //       ref[keys[keys.length - 1]] = value;
// //       return next;
// //     });
// //     if (errors[path]) setErrors(e => { const n = { ...e }; delete n[path]; return n; });
// //   };

// //   const autoSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
// //   const addFeature = () => setForm(p => ({ ...p, features: [...p.features, EMPTY_FEATURE()] }));
// //   const removeFeature = (i) => setForm(p => ({ ...p, features: p.features.filter((_, idx) => idx !== i) }));
// //   const setFeature = (i, field, value) =>
// //     setForm(p => {
// //       const features = [...p.features];
// //       features[i] = { ...features[i], [field]: value };
// //       return { ...p, features };
// //     });

// //   const validate = () => {
// //     const e = {};
// //     if (!form.name.trim()) e.name = 'Name is required';
// //     if (!form.slug.trim()) e.slug = 'Slug is required';
// //     if (form.pricing.monthly.price === '') e['pricing.monthly.price'] = 'Required';
// //     if (form.pricing.yearly.price === '') e['pricing.yearly.price'] = 'Required';
// //     if (form.limits.mealsPerWeek === '') e['limits.mealsPerWeek'] = 'Required';
// //     if (form.limits.mealsPerMonth === '') e['limits.mealsPerMonth'] = 'Required';
// //     form.features.forEach((f, i) => {
// //       if (!f.label.trim()) e[`feature_label_${i}`] = 'Label required';
// //     });
// //     setErrors(e);
// //     return Object.keys(e).length === 0;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validate()) return;
// //     const payload = {
// //       name: form.name.trim(),
// //       slug: form.slug.trim(),
// //       pricing: {
// //         monthly: { price: parseFloat(form.pricing.monthly.price) },
// //         yearly: { price: parseFloat(form.pricing.yearly.price) },
// //       },
// //       limits: {
// //         mealsPerWeek: parseInt(form.limits.mealsPerWeek),
// //         mealsPerMonth: parseInt(form.limits.mealsPerMonth),
// //       },
// //       features: form.features.map(f => ({
// //         key: f.key || f.label.toLowerCase().replace(/\s+/g, '_'),
// //         label: f.label.trim(),
// //         included: f.included,
// //       })),
// //       isPopular: form.isPopular,
// //       isActive: form.isActive,
// //     };
// //     try {
// //       await createMealPlan(payload).unwrap();
// //       onSuccess?.();
// //       onClose();
// //     } catch (err) {
// //       console.error('Create plan failed:', err);
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
// //       onClick={onClose}>
// //       <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-lg shadow-2xl
// //           flex flex-col max-h-[90vh]"
// //         onClick={e => e.stopPropagation()}>

// //         {/* Header */}
// //         <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2c] shrink-0">
// //           <div>
// //             <h3 className="text-[#f0f0f2] font-semibold text-base">Create New Plan</h3>
// //             <p className="text-[#555] text-[11px] mt-0.5">Fill in the details to add a subscription plan</p>
// //           </div>
// //           <button onClick={onClose}
// //             className="w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center justify-center
// //               text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors">
// //             <FaTimes size={11} />
// //           </button>
// //         </div>

// //         {/* Body */}
// //         <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5 flex-1">

// //           {/* Basic Info */}
// //           <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-4">
// //             <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Basic Info</p>
// //             <div className="grid grid-cols-2 gap-3">
// //               <div>
// //                 <label className={labelCls}>Plan Name *</label>
// //                 <input className={`${inputCls} ${errors.name ? 'border-red-700' : ''}`}
// //                   placeholder="e.g. Elite" value={form.name}
// //                   onChange={e => {
// //                     set('name', e.target.value);
// //                     if (!form.slug || form.slug === autoSlug(form.name))
// //                       set('slug', autoSlug(e.target.value));
// //                   }} />
// //                 {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
// //               </div>
// //               <div>
// //                 <label className={labelCls}>Slug *</label>
// //                 <input className={`${inputCls} ${errors.slug ? 'border-red-700' : ''}`}
// //                   placeholder="e.g. elite" value={form.slug}
// //                   onChange={e => set('slug', autoSlug(e.target.value))} />
// //                 {errors.slug && <p className="text-red-400 text-[10px] mt-1">{errors.slug}</p>}
// //               </div>
// //             </div>
// //             <div className="flex flex-col gap-3">
// //               <Toggle label="Active" checked={form.isActive} onChange={v => set('isActive', v)} />
// //               <Toggle label="Mark as Popular" checked={form.isPopular} onChange={v => set('isPopular', v)} />
// //             </div>
// //           </div>

// //           {/* Pricing */}
// //           <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
// //             <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Pricing (USD)</p>
// //             <div className="grid grid-cols-2 gap-3">
// //               {[
// //                 { label: 'Monthly Price *', path: 'pricing.monthly.price', placeholder: '20.99' },
// //                 { label: 'Yearly Price *', path: 'pricing.yearly.price', placeholder: '200' },
// //               ].map(({ label, path, placeholder }) => (
// //                 <div key={path}>
// //                   <label className={labelCls}>{label}</label>
// //                   <div className="relative">
// //                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">$</span>
// //                     <input type="number" min="0" step="0.01"
// //                       className={`${inputCls} pl-7 ${errors[path] ? 'border-red-700' : ''}`}
// //                       placeholder={placeholder}
// //                       value={path.split('.').reduce((o, k) => o?.[k], form)}
// //                       onChange={e => set(path, e.target.value)} />
// //                   </div>
// //                   {errors[path] && <p className="text-red-400 text-[10px] mt-1">{errors[path]}</p>}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Limits */}
// //           <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
// //             <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Meal Limits</p>
// //             <div className="grid grid-cols-2 gap-3">
// //               {[
// //                 { label: 'Meals / Week *', path: 'limits.mealsPerWeek', placeholder: '4' },
// //                 { label: 'Meals / Month *', path: 'limits.mealsPerMonth', placeholder: '12' },
// //               ].map(({ label, path, placeholder }) => (
// //                 <div key={path}>
// //                   <label className={labelCls}>{label}</label>
// //                   <input type="number" min="0"
// //                     className={`${inputCls} ${errors[path] ? 'border-red-700' : ''}`}
// //                     placeholder={placeholder}
// //                     value={path.split('.').reduce((o, k) => o?.[k], form)}
// //                     onChange={e => set(path, e.target.value)} />
// //                   {errors[path] && <p className="text-red-400 text-[10px] mt-1">{errors[path]}</p>}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Features */}
// //           <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
// //             <div className="flex items-center justify-between">
// //               <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Features</p>
// //               <button onClick={addFeature}
// //                 className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
// //                   bg-red-700/20 border border-red-700/30 text-red-400 text-[10px] font-semibold
// //                   hover:bg-red-700 hover:text-white transition-all">
// //                 <FiPlusCircle size={11} /> Add Feature
// //               </button>
// //             </div>
// //             <div className="flex flex-col gap-2">
// //               {form.features.map((feature, i) => (
// //                 <div key={i} className="bg-[#1c1c1e] rounded-xl p-3 flex flex-col gap-2">
// //                   <div className="flex items-center gap-2">
// //                     <div className="flex-1">
// //                       <input className={`${inputCls} ${errors[`feature_label_${i}`] ? 'border-red-700' : ''}`}
// //                         placeholder="Feature label (e.g. AI Nutrition Balance)"
// //                         value={feature.label}
// //                         onChange={e => setFeature(i, 'label', e.target.value)} />
// //                       {errors[`feature_label_${i}`] && (
// //                         <p className="text-red-400 text-[10px] mt-1">{errors[`feature_label_${i}`]}</p>
// //                       )}
// //                     </div>
// //                     <button onClick={() => setFeature(i, 'included', !feature.included)}
// //                       className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors
// //                         ${feature.included
// //                           ? 'bg-emerald-700/20 text-emerald-400 border border-emerald-700/30'
// //                           : 'bg-[#2a2a2c] text-[#555] border border-[#333]'}`}>
// //                       <FiCheckCircle size={13} />
// //                     </button>
// //                     {form.features.length > 1 && (
// //                       <button onClick={() => removeFeature(i)}
// //                         className="w-7 h-7 rounded-lg bg-red-700/10 border border-red-700/20
// //                           flex items-center justify-center text-red-500 hover:bg-red-700/30 transition-colors shrink-0">
// //                         <FiTrash2 size={12} />
// //                       </button>
// //                     )}
// //                   </div>
// //                   <input className={`${inputCls} text-[11px] text-[#666]`}
// //                     placeholder="Key (optional) — auto-generated if blank"
// //                     value={feature.key}
// //                     onChange={e => setFeature(i, 'key', e.target.value)} />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="px-6 py-4 border-t border-[#2a2a2c] flex items-center gap-3 shrink-0">
// //           <button onClick={onClose}
// //             className="flex-1 py-2.5 rounded-xl bg-[#252527] border border-[#2a2a2c]
// //               text-[#888] text-sm font-semibold hover:text-white transition-colors">
// //             Cancel
// //           </button>
// //           <button onClick={handleSubmit} disabled={isLoading}
// //             className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
// //               text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
// //             {isLoading ? (
// //               <>
// //                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
// //                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
// //                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
// //                 </svg>
// //                 Creating…
// //               </>
// //             ) : (
// //               <><FaPlus size={11} /> Create Plan</>
// //             )}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ── Main Page ── */
// // const Subscriptions = () => {
// //   const { data, isLoading, refetch } = useGetAllPlansQuery();
// //   const allPlans = data?.data ?? [];

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [selectedPlan, setSelectedPlan] = useState(null);
// //   const [showCreateModal, setShowCreateModal] = useState(false);
// //   const [search, setSearch] = useState('');

// //   const filtered = allPlans.filter(p =>
// //     getLocalized(p.name).toLowerCase().includes(search.toLowerCase())
// //   );
// //   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
// //   const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

// //   return (
// //     <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

// //       {/* Header */}
// //       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
// //         <div>
// //           <h1 className="text-2xl font-semibold text-[#f0f0f2]">Meal Plans</h1>
// //           <p className="text-sm text-[#555] mt-1">Manage subscription plans & dietary limits</p>
// //         </div>

// //         <div className="flex items-center gap-3">
// //           {/* Search */}
// //           <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
// //             px-4 py-2.5 focus-within:border-red-700 transition-colors w-56">
// //             <FiSearch size={15} className="text-[#555] shrink-0" />
// //             <input type="text" placeholder="Search plan…" value={search}
// //               onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
// //               className="bg-transparent text-sm text-[#ccc] placeholder-[#444] focus:outline-none w-full" />
// //           </div>

// //           {/* Create button */}
// //           <button onClick={() => setShowCreateModal(true)}
// //             className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-600
// //               text-white text-sm font-semibold transition-colors shadow-lg shadow-red-900/30 whitespace-nowrap">
// //             <FaPlus size={13} /> Create New Plan
// //           </button>
// //         </div>
// //       </div>

// //       {/* Loading */}
// //       {isLoading && (
// //         <div className="flex items-center justify-center py-24 text-[#444] text-sm gap-3">
// //           <svg className="animate-spin w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none">
// //             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
// //             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
// //           </svg>
// //           Loading plans…
// //         </div>
// //       )}

// //       {/* Empty */}
// //       {!isLoading && filtered.length === 0 && (
// //         <div className="flex flex-col items-center justify-center py-24 gap-4">
// //           <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2c] flex items-center justify-center">
// //             <FiList size={24} className="text-[#444]" />
// //           </div>
// //           <p className="text-[#444] text-base">No plans found. Create your first plan.</p>
// //         </div>
// //       )}

// //       {/* Cards Grid */}
// //       {!isLoading && paginated.length > 0 && (
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
// //           {paginated.map(plan => (
// //             <PlanCard key={plan._id} plan={plan} onViewDetails={setSelectedPlan} />
// //           ))}
// //         </div>
// //       )}

// //       {/* Pagination */}
// //       {!isLoading && totalPages > 1 && (
// //         <div className="flex items-center justify-between mt-6 px-1">
// //           <span className="text-sm text-[#666]">
// //             Showing {paginated.length} of {filtered.length} plans
// //           </span>
// //           <div className="flex items-center gap-1.5">
// //             <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
// //               className="px-3 py-2 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] text-sm text-[#aaa]
// //                 disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40 hover:text-red-400
// //                 transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]">
// //               Prev
// //             </button>
// //             {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
// //               <button key={p} onClick={() => setCurrentPage(p)}
// //                 className={`w-9 h-9 rounded-xl text-sm transition-all
// //                   ${p === currentPage
// //                     ? 'bg-red-700 text-white font-semibold'
// //                     : 'bg-[#1c1c1e] border border-[#2a2a2c] text-[#aaa] hover:border-red-700/40 hover:text-red-400'}`}>
// //                 {p}
// //               </button>
// //             ))}
// //             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
// //               className="px-3 py-2 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] text-sm text-[#aaa]
// //                 disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40 hover:text-red-400
// //                 transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]">
// //               Next
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Modals */}
// //       <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
// //       {showCreateModal && (
// //         <CreatePlanModal onClose={() => setShowCreateModal(false)} onSuccess={() => refetch()} />
// //       )}
// //     </div>
// //   );
// // };

// // export default Subscriptions;

// import React, { useEffect, useState } from 'react';
// import { FaTimes, FaPlus } from 'react-icons/fa';
// import {
//   FiCheckCircle, FiXCircle, FiStar, FiCalendar,
//   FiList, FiDollarSign, FiHash, FiTrash2, FiPlusCircle, FiSearch
// } from 'react-icons/fi';
// import {
//   useCreateMealPlanMutation,
//   useDeletePlanSubMutation,
//   useGetAllPlansQuery
// } from '../../redux/features/plan/plan';

// const PAGE_SIZE = 6;

// /* ── Helpers ── */
// const getLocalized = (field, locale = 'en-US') => {
//   if (!field) return '—';
//   if (typeof field === 'string') return field;
//   if (typeof field === 'object') {
//     return field[locale] || field['en'] || Object.values(field)[0] || '—';
//   }
//   return String(field);
// };

// /* ── Shared Input Styles ── */
// const inputCls = `w-full bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl px-3 py-2.5 text-sm
//   text-[#f0f0f2] placeholder-[#444] focus:outline-none focus:border-red-700 transition-colors`;
// const labelCls = `block text-[10px] text-[#555] uppercase tracking-widest font-medium mb-1.5`;

// /* ── Toggle Switch ── */
// const Toggle = ({ checked, onChange, label }) => (
//   <label className="flex items-center justify-between cursor-pointer">
//     <span className="text-sm text-[#ccc]">{label}</span>
//     <div
//       onClick={() => onChange(!checked)}
//       className={`relative w-10 h-5 rounded-full transition-colors duration-200 shrink-0
//         ${checked ? 'bg-red-700' : 'bg-[#2a2a2c]'}`}
//     >
//       <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
//         ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
//     </div>
//   </label>
// );

// /* ── Delete Confirm Modal ── */
// const DeleteModal = ({ plan, onClose, onConfirm, isLoading }) => (
//   <div
//     className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
//     onClick={onClose}
//   >
//     <div
//       className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-xs shadow-2xl p-7"
//       onClick={e => e.stopPropagation()}
//     >
//       <div className="w-14 h-14 rounded-2xl bg-red-700/20 flex items-center justify-center mx-auto mb-5">
//         <FiTrash2 size={24} className="text-red-400" />
//       </div>
//       <h3 className="text-lg font-semibold text-[#f0f0f2] text-center">Delete Plan</h3>
//       <p className="text-[#555] text-sm text-center mt-2 leading-relaxed">
//         Are you sure you want to delete{' '}
//         <span className="font-semibold text-[#ccc]">"{getLocalized(plan?.name)}"</span>?
//         This action cannot be undone.
//       </p>
//       <div className="flex gap-3 mt-6">
//         <button
//           onClick={onClose}
//           disabled={isLoading}
//           className="flex-1 py-3 rounded-xl bg-[#252527] text-[#aaa] text-sm
//             font-semibold hover:bg-[#2a2a2c] transition-colors disabled:opacity-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={() => onConfirm(plan._id)}
//           disabled={isLoading}
//           className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white
//             text-sm font-semibold transition-colors disabled:opacity-60
//             flex items-center justify-center gap-2"
//         >
//           {isLoading ? (
//             <>
//               <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               Deleting…
//             </>
//           ) : (
//             <><FiTrash2 size={13} /> Delete</>
//           )}
//         </button>
//       </div>
//     </div>
//   </div>
// );

// /* ── Plan Card ── */
// const PlanCard = ({ plan, refetch, onViewDetails, onDelete }) => {
//   const planName = getLocalized(plan.name);
//   const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
//   const yearlyPrice = plan.pricing?.yearly?.amount ?? plan.pricing?.yearly?.price ?? '—';
//   const currency = plan.pricing?.monthly?.currency ?? 'USD';
//   const features = Array.isArray(plan.features)
//     ? plan.features.map((f, i) => ({
//       id: i,
//       label: f?.label ?? getLocalized(f),
//       included: f?.included ?? true,
//     }))
//     : [];

//   return (
//     <div className={`relative bg-[#1c1c1e] border rounded-2xl p-7 flex flex-col gap-5
//       transition-all duration-200 hover:border-red-700/40 hover:-translate-y-0.5
//       ${plan.isPopular ? 'border-red-700/50' : 'border-[#2a2a2c]'}`}>

//       {/* Popular badge */}
//       {plan.isPopular && (
//         <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
//           <span className="px-4 py-1.5 rounded-full bg-red-700 text-white text-xs font-bold
//             tracking-wider shadow-lg shadow-red-900/40">
//             POPULAR
//           </span>
//         </div>
//       )}

//       {/* Header: name + status */}
//       <div className="flex items-start justify-between gap-2">
//         <div>
//           <div className="flex items-center gap-2.5 mb-1">
//             <div className="w-8 h-8 rounded-lg bg-red-700/20 flex items-center justify-center shrink-0">
//               <FiStar size={14} className="text-red-400" />
//             </div>
//             <h3 className="text-[#f0f0f2] font-semibold text-lg">{planName}</h3>
//           </div>
//           <p className="text-[#555] text-[10px] uppercase tracking-widest pl-10">{plan.slug}</p>
//           <div className="w-8 h-0.5 bg-red-700 rounded mt-2 ml-10" />
//         </div>
//         {/* Active badge */}
//         <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
//           font-semibold border shrink-0
//           ${plan.isActive
//             ? 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30'
//             : 'bg-[#2a2a2c] text-[#555] border-[#333]'}`}>
//           {plan.isActive ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
//           {plan.isActive ? 'Active' : 'Inactive'}
//         </span>
//       </div>

//       {/* Meal Limits */}
//       <div className="grid grid-cols-2 gap-2">
//         <div className="bg-[#252527] rounded-xl px-3 py-2.5 flex items-center gap-2">
//           <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
//             <FiCalendar size={11} className="text-red-400" />
//           </div>
//           <div>
//             <p className="text-[9px] text-[#555] uppercase tracking-widest">Per Week</p>
//             <p className="text-sm text-[#f0f0f2] font-semibold">{plan.limits?.mealsPerWeek ?? '—'}</p>
//           </div>
//         </div>
//         <div className="bg-[#252527] rounded-xl px-3 py-2.5 flex items-center gap-2">
//           <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
//             <FiCalendar size={11} className="text-red-400" />
//           </div>
//           <div>
//             <p className="text-[9px] text-[#555] uppercase tracking-widest">Per Month</p>
//             <p className="text-sm text-[#f0f0f2] font-semibold">{plan.limits?.mealsPerMonth ?? '—'}</p>
//           </div>
//         </div>
//       </div>

//       {/* Features */}
//       {features.length > 0 && (
//         <ul className="flex flex-col gap-2 flex-1">
//           {features.map(({ id, label, included }) => (
//             <li key={id} className="flex items-start gap-2.5">
//               <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5
//                 ${included ? 'bg-red-700/20' : 'bg-[#252527]'}`}>
//                 {included
//                   ? <FiCheckCircle size={11} className="text-red-400" />
//                   : <FiXCircle size={11} className="text-[#444]" />}
//               </div>
//               <span className={`text-sm leading-relaxed ${included ? 'text-[#aaa]' : 'text-[#444] line-through'}`}>
//                 {label}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Pricing + Actions */}
//       <div className="border-t border-[#252527] pt-5 flex items-end justify-between gap-3">
//         <div>
//           <div className="flex items-end gap-1">
//             <span className="text-red-400 text-base font-semibold mb-1">{currency}</span>
//             <span className="text-[#f0f0f2] text-4xl font-bold leading-none">{monthlyPrice}</span>
//             <span className="text-[#555] text-sm mb-1.5 ml-1">/ mo</span>
//           </div>
//           <p className="text-[10px] text-[#555] mt-0.5">{currency} {yearlyPrice} / year</p>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Delete */}
//           <button
//             onClick={() => onDelete(plan)}
//             className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl
//               bg-red-700/10 border border-red-700/20 text-red-400 text-xs font-semibold
//               hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-200"
//           >
//             <FiTrash2 size={13} /> Delete
//           </button>

//           {/* View Details */}
//           <button
//             onClick={() => onViewDetails(plan)}
//             className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl
//               bg-[#252527] border border-[#2a2a2c] text-[#aaa] text-xs font-semibold
//               hover:border-red-700/40 hover:text-red-400 transition-all duration-200"
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ── Plan Detail Modal ── */
// const PlanModal = ({ plan, onClose }) => {
//   if (!plan) return null;

//   const planName = getLocalized(plan.name);
//   const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
//   const yearlyPrice = plan.pricing?.yearly?.amount ?? plan.pricing?.yearly?.price ?? '—';
//   const currency = plan.pricing?.monthly?.currency ?? 'USD';

//   const sections = [
//     { icon: FiHash, label: 'Slug', value: plan.slug },
//     { icon: FiCalendar, label: 'Meals / Month', value: plan.limits?.mealsPerMonth ?? '—' },
//     { icon: FiCalendar, label: 'Meals / Week', value: plan.limits?.mealsPerWeek ?? '—' },
//     { icon: FiDollarSign, label: 'Monthly Price', value: `${currency} ${monthlyPrice}` },
//     { icon: FiDollarSign, label: 'Yearly Price', value: `${currency} ${yearlyPrice}` },
//   ];

//   const features = Array.isArray(plan.features)
//     ? plan.features.map((f, i) => ({
//       id: i,
//       label: f?.label ?? getLocalized(f),
//       included: f?.included ?? true,
//     }))
//     : [];

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl
//           overflow-hidden max-h-[90vh] flex flex-col"
//         onClick={e => e.stopPropagation()}
//       >
//         {/* Banner */}
//         <div className="relative h-20 bg-gradient-to-r from-red-900/50 via-[#1c1c1e] to-[#1c1c1e] shrink-0">
//           <div className="absolute inset-0 opacity-10"
//             style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #cc1a1a 0%, transparent 60%)' }} />
//           <button onClick={onClose}
//             className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center
//               justify-center text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors">
//             <FaTimes size={11} />
//           </button>
//           <div className="absolute -bottom-7 left-5">
//             <div className="w-14 h-14 rounded-xl border-2 border-red-700 bg-red-700/20
//               flex items-center justify-center shadow-xl">
//               <FiStar size={22} className="text-red-400" />
//             </div>
//           </div>
//         </div>

//         {/* Name + badges */}
//         <div className="pt-10 px-5 pb-1 flex items-start justify-between gap-2 shrink-0">
//           <div>
//             <h3 className="text-[#f0f0f2] font-semibold text-base">{planName}</h3>
//             <p className="text-[#555] text-[11px] mt-0.5 uppercase tracking-widest">{plan.slug}</p>
//           </div>
//           <div className="flex flex-col items-end gap-1 mt-1">
//             <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
//               font-semibold border
//               ${plan.isActive
//                 ? 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30'
//                 : 'bg-[#2a2a2c] text-[#555] border-[#333]'}`}>
//               {plan.isActive ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
//               {plan.isActive ? 'Active' : 'Inactive'}
//             </span>
//             {plan.isPopular && (
//               <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
//                 font-semibold border bg-amber-700/20 text-amber-400 border-amber-700/30">
//                 <FiStar size={10} /> Popular
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="mx-5 my-3 border-t border-[#252527] shrink-0" />

//         {/* Scrollable content */}
//         <div className="px-5 flex flex-col gap-2.5 overflow-y-auto flex-1">
//           {sections.map(({ icon: Icon, label, value }) => (
//             <div key={label} className="bg-[#252527] rounded-xl px-4 py-3">
//               <div className="flex items-center gap-2 mb-1.5">
//                 <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
//                   <Icon size={12} className="text-red-400" />
//                 </div>
//                 <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">{label}</span>
//               </div>
//               <p className="text-[#f0f0f2] text-sm font-medium pl-8">{value}</p>
//             </div>
//           ))}

//           {features.length > 0 && (
//             <div className="bg-[#252527] rounded-xl px-4 py-3">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
//                   <FiList size={12} className="text-red-400" />
//                 </div>
//                 <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">Features</span>
//               </div>
//               <div className="pl-8 flex flex-col gap-1.5">
//                 {features.map(({ id, label, included }) => (
//                   <div key={id} className="flex items-center gap-2">
//                     {included
//                       ? <FiCheckCircle size={11} className="text-emerald-400 shrink-0" />
//                       : <FiXCircle size={11} className="text-[#555] shrink-0" />}
//                     <span className={`text-[11px] ${included ? 'text-[#ccc]' : 'text-[#555]'}`}>{label}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="px-5 pb-5 mt-3 shrink-0">
//           <button onClick={onClose}
//             className="w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
//               text-white text-sm font-semibold">
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ── Create Plan Modal ── */
// const EMPTY_FEATURE = () => ({ key: '', label: '', included: true });
// const INITIAL_FORM = {
//   name: '', slug: '',
//   pricing: { monthly: { price: '' }, yearly: { price: '' } },
//   limits: { mealsPerWeek: '', mealsPerMonth: '' },
//   features: [EMPTY_FEATURE()],
//   isPopular: false, isActive: true,
// };

// const CreatePlanModal = ({ onClose, onSuccess }) => {
//   const [form, setForm] = useState(INITIAL_FORM);
//   const [errors, setErrors] = useState({});
//   const [createMealPlan, { isLoading }] = useCreateMealPlanMutation();

//   const set = (path, value) => {
//     setForm(prev => {
//       const next = structuredClone(prev);
//       const keys = path.split('.');
//       let ref = next;
//       for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
//       ref[keys[keys.length - 1]] = value;
//       return next;
//     });
//     if (errors[path]) setErrors(e => { const n = { ...e }; delete n[path]; return n; });
//   };

//   const autoSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
//   const addFeature = () => setForm(p => ({ ...p, features: [...p.features, EMPTY_FEATURE()] }));
//   const removeFeature = (i) => setForm(p => ({ ...p, features: p.features.filter((_, idx) => idx !== i) }));
//   const setFeature = (i, field, value) =>
//     setForm(p => {
//       const features = [...p.features];
//       features[i] = { ...features[i], [field]: value };
//       return { ...p, features };
//     });

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = 'Name is required';
//     if (!form.slug.trim()) e.slug = 'Slug is required';
//     if (form.pricing.monthly.price === '') e['pricing.monthly.price'] = 'Required';
//     if (form.pricing.yearly.price === '') e['pricing.yearly.price'] = 'Required';
//     if (form.limits.mealsPerWeek === '') e['limits.mealsPerWeek'] = 'Required';
//     if (form.limits.mealsPerMonth === '') e['limits.mealsPerMonth'] = 'Required';
//     form.features.forEach((f, i) => {
//       if (!f.label.trim()) e[`feature_label_${i}`] = 'Label required';
//     });
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;
//     const payload = {
//       name: form.name.trim(),
//       slug: form.slug.trim(),
//       pricing: {
//         monthly: { price: parseFloat(form.pricing.monthly.price) },
//         yearly: { price: parseFloat(form.pricing.yearly.price) },
//       },
//       limits: {
//         mealsPerWeek: parseInt(form.limits.mealsPerWeek),
//         mealsPerMonth: parseInt(form.limits.mealsPerMonth),
//       },
//       features: form.features.map(f => ({
//         key: f.key || f.label.toLowerCase().replace(/\s+/g, '_'),
//         label: f.label.trim(),
//         included: f.included,
//       })),
//       isPopular: form.isPopular,
//       isActive: form.isActive,
//     };
//     try {
//       await createMealPlan(payload).unwrap();
//       onSuccess?.();
//       onClose();
//     } catch (err) {
//       console.error('Create plan failed:', err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
//       onClick={onClose}>
//       <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-lg shadow-2xl
//           flex flex-col max-h-[90vh]"
//         onClick={e => e.stopPropagation()}>

//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2c] shrink-0">
//           <div>
//             <h3 className="text-[#f0f0f2] font-semibold text-base">Create New Plan</h3>
//             <p className="text-[#555] text-[11px] mt-0.5">Fill in the details to add a subscription plan</p>
//           </div>
//           <button onClick={onClose}
//             className="w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center justify-center
//               text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors">
//             <FaTimes size={11} />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5 flex-1">

//           {/* Basic Info */}
//           <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-4">
//             <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Basic Info</p>
//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className={labelCls}>Plan Name *</label>
//                 <input className={`${inputCls} ${errors.name ? 'border-red-700' : ''}`}
//                   placeholder="e.g. Elite" value={form.name}
//                   onChange={e => {
//                     set('name', e.target.value);
//                     if (!form.slug || form.slug === autoSlug(form.name))
//                       set('slug', autoSlug(e.target.value));
//                   }} />
//                 {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
//               </div>
//               <div>
//                 <label className={labelCls}>Slug *</label>
//                 <input className={`${inputCls} ${errors.slug ? 'border-red-700' : ''}`}
//                   placeholder="e.g. elite" value={form.slug}
//                   onChange={e => set('slug', autoSlug(e.target.value))} />
//                 {errors.slug && <p className="text-red-400 text-[10px] mt-1">{errors.slug}</p>}
//               </div>
//             </div>
//             <div className="flex flex-col gap-3">
//               <Toggle label="Active" checked={form.isActive} onChange={v => set('isActive', v)} />
//               <Toggle label="Mark as Popular" checked={form.isPopular} onChange={v => set('isPopular', v)} />
//             </div>
//           </div>

//           {/* Pricing */}
//           <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
//             <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Pricing (USD)</p>
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { label: 'Monthly Price *', path: 'pricing.monthly.price', placeholder: '20.99' },
//                 { label: 'Yearly Price *', path: 'pricing.yearly.price', placeholder: '200' },
//               ].map(({ label, path, placeholder }) => (
//                 <div key={path}>
//                   <label className={labelCls}>{label}</label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">$</span>
//                     <input type="number" min="0" step="0.01"
//                       className={`${inputCls} pl-7 ${errors[path] ? 'border-red-700' : ''}`}
//                       placeholder={placeholder}
//                       value={path.split('.').reduce((o, k) => o?.[k], form)}
//                       onChange={e => set(path, e.target.value)} />
//                   </div>
//                   {errors[path] && <p className="text-red-400 text-[10px] mt-1">{errors[path]}</p>}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Limits */}
//           <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
//             <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Meal Limits</p>
//             <div className="grid grid-cols-2 gap-3">
//               {[
//                 { label: 'Meals / Week *', path: 'limits.mealsPerWeek', placeholder: '4' },
//                 { label: 'Meals / Month *', path: 'limits.mealsPerMonth', placeholder: '12' },
//               ].map(({ label, path, placeholder }) => (
//                 <div key={path}>
//                   <label className={labelCls}>{label}</label>
//                   <input type="number" min="0"
//                     className={`${inputCls} ${errors[path] ? 'border-red-700' : ''}`}
//                     placeholder={placeholder}
//                     value={path.split('.').reduce((o, k) => o?.[k], form)}
//                     onChange={e => set(path, e.target.value)} />
//                   {errors[path] && <p className="text-red-400 text-[10px] mt-1">{errors[path]}</p>}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Features */}
//           <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
//             <div className="flex items-center justify-between">
//               <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Features</p>
//               <button onClick={addFeature}
//                 className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
//                   bg-red-700/20 border border-red-700/30 text-red-400 text-[10px] font-semibold
//                   hover:bg-red-700 hover:text-white transition-all">
//                 <FiPlusCircle size={11} /> Add Feature
//               </button>
//             </div>
//             <div className="flex flex-col gap-2">
//               {form.features.map((feature, i) => (
//                 <div key={i} className="bg-[#1c1c1e] rounded-xl p-3 flex flex-col gap-2">
//                   <div className="flex items-center gap-2">
//                     <div className="flex-1">
//                       <input className={`${inputCls} ${errors[`feature_label_${i}`] ? 'border-red-700' : ''}`}
//                         placeholder="Feature label (e.g. AI Nutrition Balance)"
//                         value={feature.label}
//                         onChange={e => setFeature(i, 'label', e.target.value)} />
//                       {errors[`feature_label_${i}`] && (
//                         <p className="text-red-400 text-[10px] mt-1">{errors[`feature_label_${i}`]}</p>
//                       )}
//                     </div>
//                     <button onClick={() => setFeature(i, 'included', !feature.included)}
//                       className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors
//                         ${feature.included
//                           ? 'bg-emerald-700/20 text-emerald-400 border border-emerald-700/30'
//                           : 'bg-[#2a2a2c] text-[#555] border border-[#333]'}`}>
//                       <FiCheckCircle size={13} />
//                     </button>
//                     {form.features.length > 1 && (
//                       <button onClick={() => removeFeature(i)}
//                         className="w-7 h-7 rounded-lg bg-red-700/10 border border-red-700/20
//                           flex items-center justify-center text-red-500 hover:bg-red-700/30 transition-colors shrink-0">
//                         <FiTrash2 size={12} />
//                       </button>
//                     )}
//                   </div>
//                   <input className={`${inputCls} text-[11px] text-[#666]`}
//                     placeholder="Key (optional) — auto-generated if blank"
//                     value={feature.key}
//                     onChange={e => setFeature(i, 'key', e.target.value)} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="px-6 py-4 border-t border-[#2a2a2c] flex items-center gap-3 shrink-0">
//           <button onClick={onClose}
//             className="flex-1 py-2.5 rounded-xl bg-[#252527] border border-[#2a2a2c]
//               text-[#888] text-sm font-semibold hover:text-white transition-colors">
//             Cancel
//           </button>
//           <button onClick={handleSubmit} disabled={isLoading}
//             className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
//               text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
//             {isLoading ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Creating…
//               </>
//             ) : (
//               <><FaPlus size={11} /> Create Plan</>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ── Main Page ── */
// const MealPlan = () => {
//   const { data, isLoading, refetch } = useGetAllPlansQuery();
//   const [deletePlanSub, { isLoading: isDeleting }] = useDeletePlanSubMutation();

//   const allPlans = data?.data ?? [];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [deletePlan, setDeletePlan] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [search, setSearch] = useState('');

//   const filtered = allPlans.filter(p =>
//     getLocalized(p.name).toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
//   const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

//   const handleDelete = async (id) => {
//     try {
//       await deletePlanSub(id).unwrap();
//       setDeletePlan(null);
//       // If last item on page, go back one page
//       if (paginated.length === 1 && currentPage > 1) {
//         setCurrentPage(p => p - 1);
//       }
//     } catch (err) {
//       console.error('Delete plan failed:', err);
//     }
//   };

//   return (
//     <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#f0f0f2]">Meal Plans</h1>
//           <p className="text-sm text-[#555] mt-1">Manage subscription plans & dietary limits</p>
//         </div>
//         <div className="flex items-center gap-3">
//           {/* Search */}
//           <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
//             px-4 py-2.5 focus-within:border-red-700 transition-colors w-56">
//             <FiSearch size={15} className="text-[#555] shrink-0" />
//             <input type="text" placeholder="Search plan…" value={search}
//               onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
//               className="bg-transparent text-sm text-[#ccc] placeholder-[#444] focus:outline-none w-full" />
//           </div>
//           {/* Create button */}
//           <button onClick={() => setShowCreateModal(true)}
//             className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-600
//               text-white text-sm font-semibold transition-colors shadow-lg shadow-red-900/30 whitespace-nowrap">
//             <FaPlus size={13} /> Create New Plan
//           </button>
//         </div>
//       </div>

//       {/* Loading */}
//       {isLoading && (
//         <div className="flex items-center justify-center py-24 text-[#444] text-sm gap-3">
//           <svg className="animate-spin w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//           </svg>
//           Loading plans…
//         </div>
//       )}

//       {/* Empty */}
//       {!isLoading && filtered.length === 0 && (
//         <div className="flex flex-col items-center justify-center py-24 gap-4">
//           <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2c] flex items-center justify-center">
//             <FiList size={24} className="text-[#444]" />
//           </div>
//           <p className="text-[#444] text-base">No plans found. Create your first plan.</p>
//         </div>
//       )}

//       {/* Cards Grid */}
//       {!isLoading && paginated.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           {paginated.map(plan => (
//             <PlanCard
//               key={plan._id}
//               refetch={refetch}
//               plan={plan}
//               onViewDetails={setSelectedPlan}
//               onDelete={setDeletePlan}
//             />
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
//       {!isLoading && totalPages > 1 && (
//         <div className="flex items-center justify-between mt-6 px-1">
//           <span className="text-sm text-[#666]">
//             Showing {paginated.length} of {filtered.length} plans
//           </span>
//           <div className="flex items-center gap-1.5">
//             <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
//               className="px-3 py-2 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] text-sm text-[#aaa]
//                 disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40 hover:text-red-400
//                 transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]">
//               Prev
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//               <button key={p} onClick={() => setCurrentPage(p)}
//                 className={`w-9 h-9 rounded-xl text-sm transition-all
//                   ${p === currentPage
//                     ? 'bg-red-700 text-white font-semibold'
//                     : 'bg-[#1c1c1e] border border-[#2a2a2c] text-[#aaa] hover:border-red-700/40 hover:text-red-400'}`}>
//                 {p}
//               </button>
//             ))}
//             <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
//               className="px-3 py-2 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] text-sm text-[#aaa]
//                 disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40 hover:text-red-400
//                 transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]">
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />

//       {deletePlan && (
//         <DeleteModal
//           plan={deletePlan}
//           onClose={() => setDeletePlan(null)}
//           onConfirm={handleDelete}
//           isLoading={isDeleting}
//         />
//       )}

//       {showCreateModal && (
//         <CreatePlanModal onClose={() => setShowCreateModal(false)} onSuccess={() => refetch()} />
//       )}
//     </div>
//   );
// };

// export default MealPlan;


import React, { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import {
  FiCheckCircle, FiXCircle, FiStar, FiCalendar,
  FiList, FiDollarSign, FiHash, FiTrash2, FiPlusCircle, FiSearch, FiAlertCircle
} from 'react-icons/fi';
import {
  useCreateMealPlanMutation,
  useDeletePlanSubMutation,
  useGetAllPlansQuery
} from '../../redux/features/plan/plan';

const PAGE_SIZE = 6;

/* ── Helpers ── */
const getLocalized = (field, locale = 'en-US') => {
  if (!field) return '—';
  if (typeof field === 'string') return field;
  if (typeof field === 'object') {
    return field[locale] || field['en'] || Object.values(field)[0] || '—';
  }
  return String(field);
};

/* ── Shared Input Styles ── */
const inputCls = `w-full bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl px-3 py-2.5 text-sm
  text-[#f0f0f2] placeholder-[#444] focus:outline-none focus:border-red-700 transition-colors`;
const labelCls = `block text-[10px] text-[#555] uppercase tracking-widest font-medium mb-1.5`;

/* ═══════════════════════════════════════
   ── Toast System ──
═══════════════════════════════════════ */
const ToastIcon = ({ type }) => {
  if (type === 'success') return <FiCheckCircle size={16} className="text-emerald-400 shrink-0" />;
  if (type === 'error')   return <FiAlertCircle size={16} className="text-red-400 shrink-0" />;
  return null;
};

const ToastItem = ({ toast, onRemove }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // mount → slide in
    const t1 = setTimeout(() => setVisible(true), 10);
    // slide out before removal
    const t2 = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl min-w-[260px] max-w-xs
        transition-all duration-300 ease-out
        ${toast.type === 'success'
          ? 'bg-[#1c1c1e] border-emerald-700/30'
          : 'bg-[#1c1c1e] border-red-700/30'}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <ToastIcon type={toast.type} />
      <p className="text-sm text-[#f0f0f2] flex-1 leading-snug">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-[#555] hover:text-[#aaa] transition-colors shrink-0"
      >
        <FaTimes size={11} />
      </button>
    </div>
  );
};

const ToastContainer = ({ toasts, onRemove }) => (
  <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 items-end pointer-events-none">
    {toasts.map(t => (
      <div key={t.id} className="pointer-events-auto">
        <ToastItem toast={t} onRemove={onRemove} />
      </div>
    ))}
  </div>
);

/* hook */
const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3600);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
};

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

/* ── Spinner SVG ── */
const Spinner = ({ size = 'w-4 h-4' }) => (
  <svg className={`animate-spin ${size}`} viewBox="0 0 24 24" fill="none">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

/* ── Delete Confirm Modal ── */
const DeleteModal = ({ plan, onClose, onConfirm, isLoading }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
    onClick={onClose}
  >
    <div
      className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-xs shadow-2xl p-7"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-14 h-14 rounded-2xl bg-red-700/20 flex items-center justify-center mx-auto mb-5">
        <FiTrash2 size={24} className="text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-[#f0f0f2] text-center">Delete Plan</h3>
      <p className="text-[#555] text-sm text-center mt-2 leading-relaxed">
        Are you sure you want to delete{' '}
        <span className="font-semibold text-[#ccc]">"{getLocalized(plan?.name)}"</span>?
        This action cannot be undone.
      </p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl bg-[#252527] text-[#aaa] text-sm
            font-semibold hover:bg-[#2a2a2c] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(plan._id)}
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white
            text-sm font-semibold transition-colors disabled:opacity-60
            flex items-center justify-center gap-2"
        >
          {isLoading ? <><Spinner /> Deleting…</> : <><FiTrash2 size={13} /> Delete</>}
        </button>
      </div>
    </div>
  </div>
);

/* ── Plan Card ── */
const PlanCard = ({ plan, onViewDetails, onDelete }) => {
  const planName    = getLocalized(plan.name);
  const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
  const yearlyPrice  = plan.pricing?.yearly?.amount  ?? plan.pricing?.yearly?.price  ?? '—';
  const currency     = plan.pricing?.monthly?.currency ?? 'USD';
  const features     = Array.isArray(plan.features)
    ? plan.features.map((f, i) => ({ id: i, label: f?.label ?? getLocalized(f), included: f?.included ?? true }))
    : [];

  return (
    <div className={`relative bg-[#1c1c1e] border rounded-2xl p-7 flex flex-col gap-5
      transition-all duration-200 hover:border-red-700/40 hover:-translate-y-0.5
      ${plan.isPopular ? 'border-red-700/50' : 'border-[#2a2a2c]'}`}>

      {plan.isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1.5 rounded-full bg-red-700 text-white text-xs font-bold
            tracking-wider shadow-lg shadow-red-900/40">POPULAR</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-red-700/20 flex items-center justify-center shrink-0">
              <FiStar size={14} className="text-red-400" />
            </div>
            <h3 className="text-[#f0f0f2] font-semibold text-lg">{planName}</h3>
          </div>
          <p className="text-[#555] text-[10px] uppercase tracking-widest pl-10">{plan.slug}</p>
          <div className="w-8 h-0.5 bg-red-700 rounded mt-2 ml-10" />
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
          font-semibold border shrink-0
          ${plan.isActive
            ? 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30'
            : 'bg-[#2a2a2c] text-[#555] border-[#333]'}`}>
          {plan.isActive ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
          {plan.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Meal Limits */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Per Week',  value: plan.limits?.mealsPerWeek  ?? '—' },
          { label: 'Per Month', value: plan.limits?.mealsPerMonth ?? '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#252527] rounded-xl px-3 py-2.5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
              <FiCalendar size={11} className="text-red-400" />
            </div>
            <div>
              <p className="text-[9px] text-[#555] uppercase tracking-widest">{label}</p>
              <p className="text-sm text-[#f0f0f2] font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      {features.length > 0 && (
        <ul className="flex flex-col gap-2 flex-1">
          {features.map(({ id, label, included }) => (
            <li key={id} className="flex items-start gap-2.5">
              <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5
                ${included ? 'bg-red-700/20' : 'bg-[#252527]'}`}>
                {included
                  ? <FiCheckCircle size={11} className="text-red-400" />
                  : <FiXCircle size={11} className="text-[#444]" />}
              </div>
              <span className={`text-sm leading-relaxed ${included ? 'text-[#aaa]' : 'text-[#444] line-through'}`}>
                {label}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Pricing + Actions */}
      <div className="border-t border-[#252527] pt-5 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-end gap-1">
            <span className="text-red-400 text-base font-semibold mb-1">{currency}</span>
            <span className="text-[#f0f0f2] text-4xl font-bold leading-none">{monthlyPrice}</span>
            <span className="text-[#555] text-sm mb-1.5 ml-1">/ mo</span>
          </div>
          <p className="text-[10px] text-[#555] mt-0.5">{currency} {yearlyPrice} / year</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDelete(plan)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl
              bg-red-700/10 border border-red-700/20 text-red-400 text-xs font-semibold
              hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-200"
          >
            <FiTrash2 size={13} /> Delete
          </button>
          <button
            onClick={() => onViewDetails(plan)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl
              bg-[#252527] border border-[#2a2a2c] text-[#aaa] text-xs font-semibold
              hover:border-red-700/40 hover:text-red-400 transition-all duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Plan Detail Modal ── */
const PlanModal = ({ plan, onClose }) => {
  if (!plan) return null;

  const planName     = getLocalized(plan.name);
  const monthlyPrice = plan.pricing?.monthly?.amount ?? plan.pricing?.monthly?.price ?? '—';
  const yearlyPrice  = plan.pricing?.yearly?.amount  ?? plan.pricing?.yearly?.price  ?? '—';
  const currency     = plan.pricing?.monthly?.currency ?? 'USD';

  const sections = [
    { icon: FiHash,      label: 'Slug',           value: plan.slug },
    { icon: FiCalendar,  label: 'Meals / Month',   value: plan.limits?.mealsPerMonth ?? '—' },
    { icon: FiCalendar,  label: 'Meals / Week',    value: plan.limits?.mealsPerWeek  ?? '—' },
    { icon: FiDollarSign,label: 'Monthly Price',   value: `${currency} ${monthlyPrice}` },
    { icon: FiDollarSign,label: 'Yearly Price',    value: `${currency} ${yearlyPrice}` },
  ];

  const features = Array.isArray(plan.features)
    ? plan.features.map((f, i) => ({ id: i, label: f?.label ?? getLocalized(f), included: f?.included ?? true }))
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl
          overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-20 bg-gradient-to-r from-red-900/50 via-[#1c1c1e] to-[#1c1c1e] shrink-0">
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

        <div className="pt-10 px-5 pb-1 flex items-start justify-between gap-2 shrink-0">
          <div>
            <h3 className="text-[#f0f0f2] font-semibold text-base">{planName}</h3>
            <p className="text-[#555] text-[11px] mt-0.5 uppercase tracking-widest">{plan.slug}</p>
          </div>
          <div className="flex flex-col items-end gap-1 mt-1">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border
              ${plan.isActive
                ? 'bg-emerald-700/20 text-emerald-400 border-emerald-700/30'
                : 'bg-[#2a2a2c] text-[#555] border-[#333]'}`}>
              {plan.isActive ? <FiCheckCircle size={10} /> : <FiXCircle size={10} />}
              {plan.isActive ? 'Active' : 'Inactive'}
            </span>
            {plan.isPopular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px]
                font-semibold border bg-amber-700/20 text-amber-400 border-amber-700/30">
                <FiStar size={10} /> Popular
              </span>
            )}
          </div>
        </div>

        <div className="mx-5 my-3 border-t border-[#252527] shrink-0" />

        <div className="px-5 flex flex-col gap-2.5 overflow-y-auto flex-1">
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
                      : <FiXCircle size={11} className="text-[#555] shrink-0" />}
                    <span className={`text-[11px] ${included ? 'text-[#ccc]' : 'text-[#555]'}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pb-5 mt-3 shrink-0">
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

/* ── Create Plan Modal ── */
const EMPTY_FEATURE = () => ({ key: '', label: '', included: true });
const INITIAL_FORM = {
  name: '', slug: '',
  pricing: { monthly: { price: '' }, yearly: { price: '' } },
  limits: { mealsPerWeek: '', mealsPerMonth: '' },
  features: [EMPTY_FEATURE()],
  isPopular: false, isActive: true,
};

const CreatePlanModal = ({ onClose, onSuccess }) => {
  const [form, setForm]     = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [createMealPlan, { isLoading }] = useCreateMealPlanMutation();

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

  const autoSlug    = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const addFeature  = () => setForm(p => ({ ...p, features: [...p.features, EMPTY_FEATURE()] }));
  const removeFeature = (i) => setForm(p => ({ ...p, features: p.features.filter((_, idx) => idx !== i) }));
  const setFeature  = (i, field, value) =>
    setForm(p => { const f = [...p.features]; f[i] = { ...f[i], [field]: value }; return { ...p, features: f }; });

  const validate = () => {
    const e = {};
    if (!form.name.trim())              e.name = 'Name is required';
    if (!form.slug.trim())              e.slug = 'Slug is required';
    if (form.pricing.monthly.price === '') e['pricing.monthly.price'] = 'Required';
    if (form.pricing.yearly.price  === '') e['pricing.yearly.price']  = 'Required';
    if (form.limits.mealsPerWeek   === '') e['limits.mealsPerWeek']   = 'Required';
    if (form.limits.mealsPerMonth  === '') e['limits.mealsPerMonth']  = 'Required';
    form.features.forEach((f, i) => { if (!f.label.trim()) e[`feature_label_${i}`] = 'Label required'; });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    const payload = {
      name: form.name.trim(), slug: form.slug.trim(),
      pricing: {
        monthly: { price: parseFloat(form.pricing.monthly.price) },
        yearly:  { price: parseFloat(form.pricing.yearly.price)  },
      },
      limits: {
        mealsPerWeek:  parseInt(form.limits.mealsPerWeek),
        mealsPerMonth: parseInt(form.limits.mealsPerMonth),
      },
      features: form.features.map(f => ({
        key: f.key || f.label.toLowerCase().replace(/\s+/g, '_'),
        label: f.label.trim(), included: f.included,
      })),
      isPopular: form.isPopular, isActive: form.isActive,
    };
    try {
      await createMealPlan(payload).unwrap();
      onSuccess?.();   // triggers toast + refetch in parent
      onClose();
    } catch (err) {
      onSuccess?.(true); // pass error flag
      console.error('Create plan failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
      onClick={onClose}>
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-lg shadow-2xl
          flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2c] shrink-0">
          <div>
            <h3 className="text-[#f0f0f2] font-semibold text-base">Create New Plan</h3>
            <p className="text-[#555] text-[11px] mt-0.5">Fill in the details to add a subscription plan</p>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center justify-center
              text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors">
            <FaTimes size={11} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5 flex-1">

          {/* Basic Info */}
          <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-4">
            <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Basic Info</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Plan Name *</label>
                <input className={`${inputCls} ${errors.name ? 'border-red-700' : ''}`}
                  placeholder="e.g. Elite" value={form.name}
                  onChange={e => {
                    set('name', e.target.value);
                    if (!form.slug || form.slug === autoSlug(form.name)) set('slug', autoSlug(e.target.value));
                  }} />
                {errors.name && <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className={labelCls}>Slug *</label>
                <input className={`${inputCls} ${errors.slug ? 'border-red-700' : ''}`}
                  placeholder="e.g. elite" value={form.slug}
                  onChange={e => set('slug', autoSlug(e.target.value))} />
                {errors.slug && <p className="text-red-400 text-[10px] mt-1">{errors.slug}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Toggle label="Active"          checked={form.isActive}  onChange={v => set('isActive', v)} />
              <Toggle label="Mark as Popular" checked={form.isPopular} onChange={v => set('isPopular', v)} />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
            <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Pricing (USD)</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Monthly Price *', path: 'pricing.monthly.price', placeholder: '20.99' },
                { label: 'Yearly Price *',  path: 'pricing.yearly.price',  placeholder: '200'   },
              ].map(({ label, path, placeholder }) => (
                <div key={path}>
                  <label className={labelCls}>{label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555] text-sm">$</span>
                    <input type="number" min="0" step="0.01"
                      className={`${inputCls} pl-7 ${errors[path] ? 'border-red-700' : ''}`}
                      placeholder={placeholder}
                      value={path.split('.').reduce((o, k) => o?.[k], form)}
                      onChange={e => set(path, e.target.value)} />
                  </div>
                  {errors[path] && <p className="text-red-400 text-[10px] mt-1">{errors[path]}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Limits */}
          <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
            <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Meal Limits</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Meals / Week *',  path: 'limits.mealsPerWeek',  placeholder: '4'  },
                { label: 'Meals / Month *', path: 'limits.mealsPerMonth', placeholder: '12' },
              ].map(({ label, path, placeholder }) => (
                <div key={path}>
                  <label className={labelCls}>{label}</label>
                  <input type="number" min="0"
                    className={`${inputCls} ${errors[path] ? 'border-red-700' : ''}`}
                    placeholder={placeholder}
                    value={path.split('.').reduce((o, k) => o?.[k], form)}
                    onChange={e => set(path, e.target.value)} />
                  {errors[path] && <p className="text-red-400 text-[10px] mt-1">{errors[path]}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-[#252527] rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#555] uppercase tracking-widest font-medium">Features</p>
              <button onClick={addFeature}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
                  bg-red-700/20 border border-red-700/30 text-red-400 text-[10px] font-semibold
                  hover:bg-red-700 hover:text-white transition-all">
                <FiPlusCircle size={11} /> Add Feature
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {form.features.map((feature, i) => (
                <div key={i} className="bg-[#1c1c1e] rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <input className={`${inputCls} ${errors[`feature_label_${i}`] ? 'border-red-700' : ''}`}
                        placeholder="Feature label (e.g. AI Nutrition Balance)"
                        value={feature.label}
                        onChange={e => setFeature(i, 'label', e.target.value)} />
                      {errors[`feature_label_${i}`] && (
                        <p className="text-red-400 text-[10px] mt-1">{errors[`feature_label_${i}`]}</p>
                      )}
                    </div>
                    <button onClick={() => setFeature(i, 'included', !feature.included)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors
                        ${feature.included
                          ? 'bg-emerald-700/20 text-emerald-400 border border-emerald-700/30'
                          : 'bg-[#2a2a2c] text-[#555] border border-[#333]'}`}>
                      <FiCheckCircle size={13} />
                    </button>
                    {form.features.length > 1 && (
                      <button onClick={() => removeFeature(i)}
                        className="w-7 h-7 rounded-lg bg-red-700/10 border border-red-700/20
                          flex items-center justify-center text-red-500 hover:bg-red-700/30 transition-colors shrink-0">
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </div>
                  <input className={`${inputCls} text-[11px] text-[#666]`}
                    placeholder="Key (optional) — auto-generated if blank"
                    value={feature.key}
                    onChange={e => setFeature(i, 'key', e.target.value)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2a2a2c] flex items-center gap-3 shrink-0">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#252527] border border-[#2a2a2c]
              text-[#888] text-sm font-semibold hover:text-white transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={isLoading}
            className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
              text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
            {isLoading ? <><Spinner /> Creating…</> : <><FaPlus size={11} /> Create Plan</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   ── Main Page ──
══════════════════════════════════════ */
const Subscriptions = () => {
  const { data, isLoading, refetch }               = useGetAllPlansQuery();
  const [deletePlanSub, { isLoading: isDeleting }] = useDeletePlanSubMutation();
  const { toasts, addToast, removeToast }          = useToast();

  const allPlans = data?.data ?? [];

  const [currentPage,      setCurrentPage]      = useState(1);
  const [selectedPlan,     setSelectedPlan]     = useState(null);
  const [deletePlan,       setDeletePlan]       = useState(null);
  const [showCreateModal,  setShowCreateModal]  = useState(false);
  const [search,           setSearch]           = useState('');

  const filtered   = allPlans.filter(p => getLocalized(p.name).toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  /* ── Delete handler ── */
  const handleDelete = async (id) => {
    try {
      await deletePlanSub(id).unwrap();
      setDeletePlan(null);
      await refetch();                                          // ← refetch after delete
      addToast('Plan deleted successfully.', 'success');
      if (paginated.length === 1 && currentPage > 1) setCurrentPage(p => p - 1);
    } catch (err) {
      console.error('Delete plan failed:', err);
      addToast('Failed to delete plan. Please try again.', 'error');
    }
  };

  /* ── Create success callback ── */
  const handleCreateSuccess = async (isError = false) => {
    if (isError) {
      addToast('Failed to create plan. Please try again.', 'error');
      return;
    }
    await refetch();                                            // ← refetch after create
    addToast('Plan created successfully!', 'success');
  };

  return (
    <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#f0f0f2]">Meal Plans</h1>
          <p className="text-sm text-[#555] mt-1">Manage subscription plans & dietary limits</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
            px-4 py-2.5 focus-within:border-red-700 transition-colors w-56">
            <FiSearch size={15} className="text-[#555] shrink-0" />
            <input type="text" placeholder="Search plan…" value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              className="bg-transparent text-sm text-[#ccc] placeholder-[#444] focus:outline-none w-full" />
          </div>
          <button onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-600
              text-white text-sm font-semibold transition-colors shadow-lg shadow-red-900/30 whitespace-nowrap">
            <FaPlus size={13} /> Create New Plan
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-24 text-[#444] text-sm gap-3">
          <Spinner size="w-5 h-5" /> Loading plans…
        </div>
      )}

      {/* Empty */}
      {!isLoading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2c] flex items-center justify-center">
            <FiList size={24} className="text-[#444]" />
          </div>
          <p className="text-[#444] text-base">No plans found. Create your first plan.</p>
        </div>
      )}

      {/* Cards Grid */}
      {!isLoading && paginated.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginated.map(plan => (
            <PlanCard
              key={plan._id}
              plan={plan}
              onViewDetails={setSelectedPlan}
              onDelete={setDeletePlan}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-1">
          <span className="text-sm text-[#666]">
            Showing {paginated.length} of {filtered.length} plans
          </span>
          <div className="flex items-center gap-1.5">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-2 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] text-sm text-[#aaa]
                disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40 hover:text-red-400
                transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]">
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)}
                className={`w-9 h-9 rounded-xl text-sm transition-all
                  ${p === currentPage
                    ? 'bg-red-700 text-white font-semibold'
                    : 'bg-[#1c1c1e] border border-[#2a2a2c] text-[#aaa] hover:border-red-700/40 hover:text-red-400'}`}>
                {p}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-2 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] text-sm text-[#aaa]
                disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40 hover:text-red-400
                transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />

      {deletePlan && (
        <DeleteModal
          plan={deletePlan}
          onClose={() => setDeletePlan(null)}
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
      )}

      {showCreateModal && (
        <CreatePlanModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {/* Toast Portal */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default Subscriptions;