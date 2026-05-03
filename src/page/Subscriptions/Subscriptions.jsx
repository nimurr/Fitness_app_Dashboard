import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck, FiDollarSign, FiList, FiTag } from 'react-icons/fi';

const initialPlans = [
  {
    id: 1,
    name: 'Standard',
    price: 9.00,
    features: ['Limited profile views per day', 'Basic search filters', 'Email support'],
    popular: false,
  },
  {
    id: 2,
    name: 'Pro',
    price: 19.00,
    features: ['Unlimited profile views', 'Advanced search filters', 'Priority support'],
    popular: true,
  },
  {
    id: 3,
    name: 'Elite',
    price: 39.00,
    features: ['Everything in Pro', 'Dedicated account manager', '24/7 phone support'],
    popular: false,
  },
];

const EMPTY_FORM = { name: '', price: '', features: '', popular: false };

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#555] font-medium mb-2">
      <Icon size={13} className="text-red-400" /> {label}
    </label>
    {children}
  </div>
);

const inputCls = `w-full bg-[#252527] border border-[#2a2a2c] rounded-xl px-4 py-3
  text-sm text-[#f0f0f2] placeholder-[#444] focus:outline-none focus:border-red-700
  transition-colors`;

/* ── Add / Edit Modal ── */
const PlanModal = ({ mode, plan, onClose, onSave }) => {
  const [form, setForm] = useState(
    plan
      ? { name: plan.name, price: plan.price, features: plan.features.join('\n'), popular: plan.popular }
      : EMPTY_FORM
  );

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name.trim() || !form.price) return;
    onSave({
      name: form.name.trim(),
      price: parseFloat(form.price),
      features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
      popular: form.popular,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#252527]">
          <div>
            <h2 className="text-lg font-semibold text-[#f0f0f2]">
              {mode === 'add' ? 'Add New Plan' : 'Edit Plan'}
            </h2>
            <p className="text-sm text-[#555] mt-0.5">
              {mode === 'add' ? 'Fill in the details below' : `Editing "${plan.name}"`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center justify-center
              text-[#666] hover:text-white hover:bg-[#3a3a3c] transition-colors"
          >
            <FiX size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5">
          <Field label="Plan Name" icon={FiTag}>
            <input
              className={inputCls}
              placeholder="e.g. Standard"
              value={form.name}
              onChange={e => handle('name', e.target.value)}
            />
          </Field>

          <Field label="Price / Month ($)" icon={FiDollarSign}>
            <input
              type="number"
              min="0"
              step="0.01"
              className={inputCls}
              placeholder="e.g. 9.00"
              value={form.price}
              onChange={e => handle('price', e.target.value)}
            />
          </Field>

          <Field label="Features (one per line)" icon={FiList}>
            <textarea
              rows={4}
              className={`${inputCls} resize-none leading-relaxed`}
              placeholder={"Limited profile views per day\nBasic filters\nEmail support"}
              value={form.features}
              onChange={e => handle('features', e.target.value)}
            />
          </Field>

          {/* Popular toggle */}
          <button
            onClick={() => handle('popular', !form.popular)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200
              ${form.popular
                ? 'bg-red-700/20 border-red-700/40'
                : 'bg-[#252527] border-[#2a2a2c] hover:border-[#3a3a3c]'}`}
          >
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all
              ${form.popular ? 'bg-red-700 border-red-700' : 'border-[#444] bg-transparent'}`}>
              {form.popular && <FiCheck size={11} className="text-white" />}
            </div>
            <span className="text-sm text-[#ccc]">Mark as Popular</span>
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#252527] text-[#aaa] text-sm
              font-semibold hover:bg-[#2a2a2c] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white
              text-sm font-semibold transition-colors"
          >
            {mode === 'add' ? 'Add Plan' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Delete Confirm Modal ── */
const DeleteModal = ({ plan, onClose, onConfirm }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
    onClick={onClose}
  >
    <div
      className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl p-7"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-14 h-14 rounded-2xl bg-red-700/20 flex items-center justify-center mx-auto mb-5">
        <FiTrash2 size={24} className="text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-[#f0f0f2] text-center">Delete Plan</h3>
      <p className="text-[#555] text-sm text-center mt-2 leading-relaxed">
        Are you sure you want to delete{' '}
        <span className="text-[#ccc] font-medium">"{plan?.name}"</span>?
        This action cannot be undone.
      </p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-xl bg-[#252527] text-[#aaa] text-sm
            font-semibold hover:bg-[#2a2a2c] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => { onConfirm(plan.id); onClose(); }}
          className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white
            text-sm font-semibold transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

/* ── Plan Card ── */
const PlanCard = ({ plan, onEdit, onDelete }) => (
  <div className={`relative bg-[#1c1c1e] border rounded-2xl p-7 flex flex-col gap-6
    transition-all duration-200 hover:border-red-700/40 hover:-translate-y-0.5
    ${plan.popular ? 'border-red-700/50' : 'border-[#2a2a2c]'}`}>

    {plan.popular && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <span className="px-4 py-1.5 rounded-full bg-red-700 text-white text-xs font-bold
          tracking-wider shadow-lg shadow-red-900/40">
          POPULAR
        </span>
      </div>
    )}

    {/* Plan name */}
    <div>
      <h3 className="text-[#f0f0f2] font-semibold text-xl">{plan.name}</h3>
      <div className="w-8 h-0.5 bg-red-700 rounded mt-2" />
    </div>

    {/* Features */}
    <ul className="flex flex-col gap-3 flex-1">
      {plan.features.map((f, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-md bg-red-700/20 flex items-center justify-center shrink-0 mt-0.5">
            <FiCheck size={11} className="text-red-400" />
          </div>
          <span className="text-[#aaa] text-sm leading-relaxed">{f}</span>
        </li>
      ))}
    </ul>

    {/* Price */}
    <div className="flex items-end gap-1 border-t border-[#252527] pt-5">
      <span className="text-red-400 text-base font-semibold mb-1">$</span>
      <span className="text-[#f0f0f2] text-4xl font-bold leading-none">
        {plan.price.toFixed(2)}
      </span>
      <span className="text-[#555] text-sm mb-1.5 ml-1">/ month</span>
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      <button
        onClick={() => onEdit(plan)}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
          bg-[#252527] border border-[#2a2a2c] text-[#aaa] text-sm font-medium
          hover:border-red-700/40 hover:text-red-400 transition-all duration-200"
      >
        <FiEdit2 size={14} /> Edit
      </button>
      <button
        onClick={() => onDelete(plan)}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
          bg-red-700/10 border border-red-700/20 text-red-400 text-sm font-medium
          hover:bg-red-700 hover:text-white hover:border-red-700 transition-all duration-200"
      >
        <FiTrash2 size={14} /> Delete
      </button>
    </div>
  </div>
);

/* ── Main Page ── */
const Subscriptions = () => {
  const [plans, setPlans]         = useState(initialPlans);
  const [addOpen, setAddOpen]     = useState(false);
  const [editPlan, setEditPlan]   = useState(null);
  const [deletePlan, setDeletePlan] = useState(null);

  const handleAdd    = (data) => setPlans(p => [...p, { id: Date.now(), ...data }]);
  const handleEdit   = (data) => setPlans(p => p.map(pl => pl.id === editPlan.id ? { ...pl, ...data } : pl));
  const handleDelete = (id)   => setPlans(p => p.filter(pl => pl.id !== id));

  return (
    <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#f0f0f2]">Subscriptions</h1>
          <p className="text-sm text-[#555] mt-1">Manage your pricing plans</p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-700 hover:bg-red-600
            text-white text-sm font-semibold transition-colors shadow-lg shadow-red-900/30"
        >
          <FiPlus size={16} /> Add Plan
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Plans',  value: plans.length },
          { label: 'Avg. Price',   value: `$${(plans.reduce((a, p) => a + p.price, 0) / (plans.length || 1)).toFixed(2)}` },
          { label: 'Popular Plan', value: plans.find(p => p.popular)?.name ?? '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl px-5 py-4">
            <p className="text-[#555] text-xs uppercase tracking-widest mb-1.5">{label}</p>
            <p className="text-[#f0f0f2] text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Cards grid */}
      {plans.length === 0
        ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1c1c1e] border border-[#2a2a2c] flex items-center justify-center">
              <FiList size={24} className="text-[#444]" />
            </div>
            <p className="text-[#444] text-base">No plans yet. Add your first plan.</p>
          </div>
        )
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {plans.map(plan => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onEdit={setEditPlan}
                onDelete={setDeletePlan}
              />
            ))}
          </div>
        )}

      {/* Modals */}
      {addOpen    && <PlanModal mode="add"  plan={null}     onClose={() => setAddOpen(false)}   onSave={handleAdd}  />}
      {editPlan   && <PlanModal mode="edit" plan={editPlan} onClose={() => setEditPlan(null)}   onSave={handleEdit} />}
      {deletePlan && <DeleteModal plan={deletePlan}         onClose={() => setDeletePlan(null)} onConfirm={handleDelete} />}
    </div>
  );
};

export default Subscriptions;