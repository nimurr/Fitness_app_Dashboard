import React, { useState } from 'react';
import {
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiX,
  FiTag, FiCalendar, FiHash, FiCopy, FiCheck
} from 'react-icons/fi';

const initialPromos = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  code: ['SHabU60', 'SAVE20', 'ELITE50', 'PRO30', 'NEWUSER', 'FLASH15', 'VIP100', 'DEAL40'][i],
  startDate: '2025-09-01',
  endDate: '2025-10-10',
}));

const PAGE_SIZE = 5;
const EMPTY = { code: '', startDate: '', endDate: '' };

const inputCls = `w-full bg-[#252527] border border-[#2a2a2c] rounded-xl px-4 py-3
  text-sm text-[#f0f0f2] placeholder-[#444] focus:outline-none focus:border-red-700 transition-colors`;

const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#555] font-medium mb-2">
      <Icon size={12} className="text-red-400" /> {label}
    </label>
    {children}
  </div>
);

/* ── Copy Badge ── */
const CopyCode = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="flex items-center gap-2">
      <span className="px-3 py-1 rounded-lg bg-red-700/20 border border-red-700/30
        text-red-400 text-sm font-mono font-semibold tracking-widest">
        {code}
      </span>
      <button onClick={copy}
        className="w-7 h-7 rounded-lg bg-[#252527] flex items-center justify-center
          text-[#555] hover:text-red-400 transition-colors">
        {copied ? <FiCheck size={12} className="text-emerald-400" /> : <FiCopy size={12} />}
      </button>
    </div>
  );
};

/* ── Add / Edit Modal ── */
const PromoModal = ({ mode, promo, onClose, onSave }) => {
  const [form, setForm] = useState(promo ? { ...promo } : EMPTY);
  const [err, setErr]   = useState('');
  const h = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.code.trim())      return setErr('Promo code is required.');
    if (!form.startDate)        return setErr('Start date is required.');
    if (!form.endDate)          return setErr('End date is required.');
    if (form.endDate < form.startDate) return setErr('End date must be after start date.');
    onSave({ ...form, code: form.code.trim().toUpperCase() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
      onClick={onClose}>
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#252527]">
          <div>
            <h2 className="text-lg font-semibold text-[#f0f0f2]">
              {mode === 'add' ? 'Create Promo Code' : 'Edit Promo Code'}
            </h2>
            <p className="text-sm text-[#555] mt-0.5">
              {mode === 'add' ? 'Fill in the details below' : `Editing "${promo.code}"`}
            </p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center justify-center
              text-[#666] hover:text-white hover:bg-[#3a3a3c] transition-colors">
            <FiX size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 flex flex-col gap-5">
          <Field label="Promo Code" icon={FiTag}>
            <input
              className={`${inputCls} uppercase tracking-widest font-mono`}
              placeholder="e.g. SAVE20"
              value={form.code}
              onChange={e => { h('code', e.target.value); setErr(''); }}
            />
          </Field>

          <Field label="Starting Date" icon={FiCalendar}>
            <input
              type="date"
              className={inputCls}
              value={form.startDate}
              onChange={e => { h('startDate', e.target.value); setErr(''); }}
            />
          </Field>

          <Field label="End Date" icon={FiCalendar}>
            <input
              type="date"
              className={inputCls}
              value={form.endDate}
              onChange={e => { h('endDate', e.target.value); setErr(''); }}
            />
          </Field>

          {err && (
            <p className="text-red-400 text-xs bg-red-700/10 border border-red-700/20
              rounded-xl px-4 py-2.5">{err}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#252527] text-[#aaa] text-sm
              font-semibold hover:bg-[#2a2a2c] transition-colors">
            Cancel
          </button>
          <button onClick={submit}
            className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white
              text-sm font-semibold transition-colors">
            {mode === 'add' ? 'Create' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Delete Modal ── */
const DeleteModal = ({ promo, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
    onClick={onClose}>
    <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-xs shadow-2xl p-7"
      onClick={e => e.stopPropagation()}>
      <div className="w-14 h-14 rounded-2xl bg-red-700/20 flex items-center justify-center mx-auto mb-5">
        <FiTrash2 size={24} className="text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-[#f0f0f2] text-center">Delete Promo Code</h3>
      <p className="text-[#555] text-sm text-center mt-2 leading-relaxed">
        Are you sure you want to delete{' '}
        <span className="font-mono font-bold text-red-400">"{promo?.code}"</span>?
        This cannot be undone.
      </p>
      <div className="flex gap-3 mt-6">
        <button onClick={onClose}
          className="flex-1 py-3 rounded-xl bg-[#252527] text-[#aaa] text-sm
            font-semibold hover:bg-[#2a2a2c] transition-colors">
          Cancel
        </button>
        <button onClick={() => { onConfirm(promo.id); onClose(); }}
          className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white
            text-sm font-semibold transition-colors">
          Delete
        </button>
      </div>
    </div>
  </div>
);

/* ── Status pill (active / expired) ── */
const isActive = (endDate) => new Date(endDate) >= new Date();

/* ── Main ── */
const PromoList = () => {
  const [promos, setPromos]       = useState(initialPromos);
  const [search, setSearch]       = useState('');
  const [page, setPage]           = useState(1);
  const [addOpen, setAddOpen]     = useState(false);
  const [editPromo, setEditPromo] = useState(null);
  const [delPromo, setDelPromo]   = useState(null);

  const filtered   = promos.filter(p => p.code.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAdd    = (data) => setPromos(p => [...p, { id: Date.now(), ...data }]);
  const handleEdit   = (data) => setPromos(p => p.map(pr => pr.id === editPromo.id ? { ...pr, ...data } : pr));
  const handleDelete = (id)   => setPromos(p => p.filter(pr => pr.id !== id));

  const cols = ['No', 'Promo Code', 'Starting Date', 'End Date', 'Status', 'Action'];

  return (
    <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-semibold text-[#f0f0f2]">Promo List</h1>
          <p className="text-sm text-[#555] mt-0.5">{promos.length} promo codes total</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
            px-4 py-2.5 focus-within:border-red-700 transition-colors w-56">
            <FiSearch size={15} className="text-[#555] shrink-0" />
            <input
              type="text"
              placeholder="Search code…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="bg-transparent text-sm text-[#ccc] placeholder-[#444] focus:outline-none w-full"
            />
          </div>

          {/* Create button */}
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-600
              text-white text-sm font-semibold transition-colors shadow-lg shadow-red-900/30 whitespace-nowrap"
          >
            <FiPlus size={16} /> Create Promo Code
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[
          { label: 'Total Codes',   value: promos.length },
          { label: 'Active',        value: promos.filter(p => isActive(p.endDate)).length },
          { label: 'Expired',       value: promos.filter(p => !isActive(p.endDate)).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl px-5 py-4">
            <p className="text-[#555] text-xs uppercase tracking-widest mb-1.5">{label}</p>
            <p className="text-[#f0f0f2] text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl overflow-hidden">

        {/* Head */}
        <div className="flex items-center border-b-2 border-red-700">
          {cols.map((col, i) => (
            <div key={col}
              className={`flex-1 px-5 py-4 text-sm font-medium text-[#f0f0f2] tracking-wide
                ${i < cols.length - 1 ? 'border-r border-[#2a2a2c]' : ''}`}>
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0
          ? <div className="py-20 text-center text-[#444] text-sm">No promo codes found.</div>
          : paginated.map((row, ri) => (
            <div key={row.id}
              className={`flex items-center hover:bg-[#222224] transition-colors duration-150
                ${ri < paginated.length - 1 ? 'border-b border-[#252527]' : ''}`}>

              {/* No */}
              <div className="flex-1 px-5 py-4 text-sm text-[#555] border-r border-[#252527]">
                {String((page - 1) * PAGE_SIZE + ri + 1).padStart(2, '0')}
              </div>

              {/* Code */}
              <div className="flex-1 px-5 py-4 border-r border-[#252527]">
                <CopyCode code={row.code} />
              </div>

              {/* Start */}
              <div className="flex-1 px-5 py-4 text-sm text-[#aaa] border-r border-[#252527] font-mono">
                {row.startDate}
              </div>

              {/* End */}
              <div className="flex-1 px-5 py-4 text-sm text-[#aaa] border-r border-[#252527] font-mono">
                {row.endDate}
              </div>

              {/* Status */}
              <div className="flex-1 px-5 py-4 border-r border-[#252527]">
                {isActive(row.endDate)
                  ? <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/30 text-emerald-400 border border-emerald-700/30">Active</span>
                  : <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2a2a2c] text-[#555] border border-[#333]">Expired</span>
                }
              </div>

              {/* Actions */}
              <div className="flex-1 px-5 py-4 flex items-center gap-2">
                <button onClick={() => setEditPromo(row)}
                  className="w-9 h-9 rounded-xl bg-[#252527] flex items-center justify-center
                    text-[#888] hover:bg-amber-700/30 hover:text-amber-400 transition-all duration-200">
                  <FiEdit2 size={15} />
                </button>
                <button onClick={() => setDelPromo(row)}
                  className="w-9 h-9 rounded-xl bg-[#252527] flex items-center justify-center
                    text-[#888] hover:bg-red-700/30 hover:text-red-400 transition-all duration-200">
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 px-1">
        <span className="text-sm text-[#666]">
          Showing {paginated.length} of {filtered.length} codes
        </span>
        <div className="flex items-center gap-1.5">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="px-3 py-2 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] text-sm text-[#aaa]
              disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40 hover:text-red-400
              transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]">
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-xl text-sm transition-all
                ${p === page
                  ? 'bg-red-700 text-white font-semibold'
                  : 'bg-[#1c1c1e] border border-[#2a2a2c] text-[#aaa] hover:border-red-700/40 hover:text-red-400'}`}>
              {p}
            </button>
          ))}
          <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)}
            className="px-3 py-2 rounded-xl bg-[#1c1c1e] border border-[#2a2a2c] text-sm text-[#aaa]
              disabled:text-[#333] disabled:cursor-not-allowed hover:border-red-700/40 hover:text-red-400
              transition-all disabled:hover:border-[#2a2a2c] disabled:hover:text-[#333]">
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      {addOpen   && <PromoModal mode="add"  promo={null}      onClose={() => setAddOpen(false)}   onSave={handleAdd}  />}
      {editPromo && <PromoModal mode="edit" promo={editPromo} onClose={() => setEditPromo(null)} onSave={handleEdit} />}
      {delPromo  && <DeleteModal promo={delPromo}             onClose={() => setDelPromo(null)}  onConfirm={handleDelete} />}
    </div>
  );
};

export default PromoList;