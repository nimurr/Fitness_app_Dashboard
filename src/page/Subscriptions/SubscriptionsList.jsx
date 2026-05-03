 


import React, { useState } from 'react';
import {
  FiUser, FiMail, FiPhone, FiGlobe, FiDroplet, FiCreditCard,
  FiCalendar, FiEdit2, FiTrash2, FiX, FiCheck, FiEye,
  FiHash, FiSearch, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';

const initialData = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  username: ['Tasmia Hassan', 'John Doe', 'Sara Williams', 'Mike Brown', 'Emily Davis'][i % 5],
  email: ['tasmia@gmail.com', 'john@gmail.com', 'sara@gmail.com', 'mike@gmail.com', 'emily@gmail.com'][i % 5],
  phone: '+8801629235330',
  bloodType: ['A+', 'B+', 'O+', 'AB+', 'A-'][i % 5],
  plan: ['Pro', 'Standard', 'Elite', 'Standard', 'Pro'][i % 5],
  lastActive: '2025-09-27',
  status: i % 4 === 3 ? 'Inactive' : 'Active',
  country: 'Bangladesh',
  classicDiet: 'Loose Weight',
  transactionId: `#1452${i + 1}D`,
  lastPayment: '2025-09-27',
  avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 1}.jpg`,
}));

const PAGE_SIZE = 5;

const inputCls = `w-full bg-[#252527] border border-[#2a2a2c] rounded-xl px-4 py-2.5
  text-sm text-[#f0f0f2] placeholder-[#444] focus:outline-none focus:border-red-700 transition-colors`;

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold border
    ${status === 'Active'
      ? 'bg-emerald-900/30 text-emerald-400 border-emerald-700/30'
      : 'bg-[#2a2a2c] text-[#666] border-[#333]'}`}>
    {status}
  </span>
);

const PlanBadge = ({ plan }) => (
  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-700/20 text-red-400 border border-red-700/30">
    {plan}
  </span>
);

/* ── View Modal ── */
const ViewModal = ({ user, onClose }) => {
  if (!user) return null;
  const rows = [
    { icon: FiUser,       label: 'Name',              value: user.username },
    { icon: FiMail,       label: 'Email',             value: user.email },
    { icon: FiGlobe,      label: 'Country',           value: user.country },
    { icon: FiPhone,      label: 'Number',            value: user.phone },
    { icon: FiDroplet,    label: 'Blood Group',       value: user.bloodType },
    { icon: FiCreditCard, label: 'Subscription Plan', value: user.plan },
    { icon: FiHash,       label: 'Transaction ID',    value: user.transactionId },
    { icon: FiCalendar,   label: 'Last Payment Date', value: user.lastPayment },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Banner */}
        <div className="relative h-20 bg-gradient-to-r from-red-900/50 to-[#1c1c1e]">
          <button onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center
              justify-center text-[#666] hover:text-white hover:bg-[#3a3a3c] transition-colors">
            <FiX size={14} />
          </button>
          <div className="absolute -bottom-7 left-5">
            <img src={user.avatar} alt={user.username}
              className="w-14 h-14 rounded-xl border-2 border-red-700 object-cover shadow-xl" />
          </div>
        </div>

        <div className="pt-10 px-5 pb-1">
          <h3 className="text-base font-semibold text-[#f0f0f2]">{user.username}</h3>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={user.status} />
            <span className="text-[#444] text-xs">·</span>
            <span className="text-[#555] text-xs">{user.classicDiet}</span>
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
                <p className="text-[#f0f0f2] text-sm font-medium truncate">{value}</p>
              </div>
            </div>
          ))}
          <button onClick={onClose}
            className="mt-2 w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Edit Modal ── */
const EditModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({ ...user });
  const h = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between px-6 py-5 border-b border-[#252527]">
          <div>
            <h2 className="text-lg font-semibold text-[#f0f0f2]">Edit Subscription</h2>
            <p className="text-sm text-[#555] mt-0.5">Update user subscription details</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center justify-center
              text-[#666] hover:text-white hover:bg-[#3a3a3c] transition-colors">
            <FiX size={15} />
          </button>
        </div>

        <div className="px-6 py-5 grid grid-cols-2 gap-4">
          {[
            { label: 'Username',    key: 'username', col: 2 },
            { label: 'Email',       key: 'email',    col: 2 },
            { label: 'Phone',       key: 'phone',    col: 1 },
            { label: 'Blood Type',  key: 'bloodType',col: 1 },
            { label: 'Country',     key: 'country',  col: 1 },
            { label: 'Diet',        key: 'classicDiet', col: 1 },
          ].map(({ label, key, col }) => (
            <div key={key} className={col === 2 ? 'col-span-2' : 'col-span-1'}>
              <label className="text-xs uppercase tracking-widest text-[#555] font-medium block mb-1.5">{label}</label>
              <input className={inputCls} value={form[key]} onChange={e => h(key, e.target.value)} />
            </div>
          ))}

          {/* Plan select */}
          <div className="col-span-1">
            <label className="text-xs uppercase tracking-widest text-[#555] font-medium block mb-1.5">Plan</label>
            <select
              className={`${inputCls} cursor-pointer`}
              value={form.plan}
              onChange={e => h('plan', e.target.value)}
            >
              {['Standard', 'Pro', 'Elite'].map(p => (
                <option key={p} value={p} className="bg-[#1c1c1e]">{p}</option>
              ))}
            </select>
          </div>

          {/* Status select */}
          <div className="col-span-1">
            <label className="text-xs uppercase tracking-widest text-[#555] font-medium block mb-1.5">Status</label>
            <select
              className={`${inputCls} cursor-pointer`}
              value={form.status}
              onChange={e => h('status', e.target.value)}
            >
              {['Active', 'Inactive'].map(s => (
                <option key={s} value={s} className="bg-[#1c1c1e]">{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#252527] text-[#aaa] text-sm font-semibold hover:bg-[#2a2a2c] transition-colors">
            Cancel
          </button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Delete Modal ── */
const DeleteModal = ({ user, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4" onClick={onClose}>
    <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-sm shadow-2xl p-7" onClick={e => e.stopPropagation()}>
      <div className="w-14 h-14 rounded-2xl bg-red-700/20 flex items-center justify-center mx-auto mb-5">
        <FiTrash2 size={24} className="text-red-400" />
      </div>
      <h3 className="text-lg font-semibold text-[#f0f0f2] text-center">Delete Subscription</h3>
      <p className="text-[#555] text-sm text-center mt-2 leading-relaxed">
        Are you sure you want to remove{' '}
        <span className="text-[#ccc] font-medium">"{user?.username}"</span>{' '}
        from subscriptions? This cannot be undone.
      </p>
      <div className="flex gap-3 mt-6">
        <button onClick={onClose}
          className="flex-1 py-3 rounded-xl bg-[#252527] text-[#aaa] text-sm font-semibold hover:bg-[#2a2a2c] transition-colors">
          Cancel
        </button>
        <button onClick={() => { onConfirm(user.id); onClose(); }}
          className="flex-1 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
          Delete
        </button>
      </div>
    </div>
  </div>
);

/* ── Main Page ── */
const SubscriptionsList = () => {
  const [data, setData]           = useState(initialData);
  const [search, setSearch]       = useState('');
  const [currentPage, setPage]    = useState(1);
  const [viewUser, setViewUser]   = useState(null);
  const [editUser, setEditUser]   = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const filtered   = data.filter(u => u.username.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSave   = (updated) => setData(d => d.map(u => u.id === updated.id ? updated : u));
  const handleDelete = (id)      => setData(d => d.filter(u => u.id !== id));

  const cols = ['No', 'Username', 'Email', 'Phone Number', 'Blood Type', 'Subscription Plan', 'Last Active', 'Status', 'Action'];

  return (
    <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[#f0f0f2]">Subscription List</h1>
          <p className="text-sm text-[#555] mt-0.5">{data.length} total subscribers</p>
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

        {/* Header row */}
        <div className="flex items-center border-b-2 border-red-700">
          {cols.map((col, i) => (
            <div key={col}
              className={`flex-1 px-4 py-4 text-sm font-medium text-[#f0f0f2] tracking-wide whitespace-nowrap
                ${i < cols.length - 1 ? 'border-r border-[#2a2a2c]' : ''}`}>
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginated.length === 0
          ? <div className="py-20 text-center text-[#444] text-sm">No subscribers found.</div>
          : paginated.map((row, ri) => (
            <div key={row.id}
              className={`flex items-center hover:bg-[#222224] transition-colors duration-150
                ${ri < paginated.length - 1 ? 'border-b border-[#252527]' : ''}`}>

              {/* No */}
              <div className="flex-1 px-4 py-4 text-sm text-[#555] border-r border-[#252527]">
                {String((currentPage - 1) * PAGE_SIZE + ri + 1).padStart(2, '0')}
              </div>

              {/* Username */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527] flex items-center gap-2.5 min-w-0">
                <img src={row.avatar} alt={row.username}
                  className="w-8 h-8 rounded-lg object-cover shrink-0" />
                <span className="text-sm text-[#f0f0f2] font-medium truncate">{row.username}</span>
              </div>

              {/* Email */}
              <div className="flex-1 px-4 py-4 text-sm text-[#aaa] border-r border-[#252527] truncate">
                {row.email}
              </div>

              {/* Phone */}
              <div className="flex-1 px-4 py-4 text-sm text-[#aaa] border-r border-[#252527] whitespace-nowrap">
                {row.phone}
              </div>

              {/* Blood Type */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-700/20 text-red-400 border border-red-700/30">
                  {row.bloodType}
                </span>
              </div>

              {/* Plan */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <PlanBadge plan={row.plan} />
              </div>

              {/* Last Active */}
              <div className="flex-1 px-4 py-4 text-sm text-[#aaa] border-r border-[#252527] whitespace-nowrap">
                {row.lastActive}
              </div>

              {/* Status */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <StatusBadge status={row.status} />
              </div>

              {/* Action */}
              <div className="flex-1 px-4 py-4 flex items-center justify-center gap-2">
                <button onClick={() => setViewUser(row)}
                  className="w-8 h-8 rounded-lg bg-[#252527] flex items-center justify-center
                    text-[#888] hover:bg-blue-700/30 hover:text-blue-400 transition-all duration-200">
                  <FiEye size={14} />
                </button>
                <button onClick={() => setEditUser(row)}
                  className="w-8 h-8 rounded-lg bg-[#252527] flex items-center justify-center
                    text-[#888] hover:bg-amber-700/30 hover:text-amber-400 transition-all duration-200">
                  <FiEdit2 size={14} />
                </button>
                <button onClick={() => setDeleteUser(row)}
                  className="w-8 h-8 rounded-lg bg-[#252527] flex items-center justify-center
                    text-[#888] hover:bg-red-700/30 hover:text-red-400 transition-all duration-200">
                  <FiTrash2 size={14} />
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

      {/* Modals */}
      {viewUser   && <ViewModal   user={viewUser}   onClose={() => setViewUser(null)} />}
      {editUser   && <EditModal   user={editUser}   onClose={() => setEditUser(null)}   onSave={handleSave} />}
      {deleteUser && <DeleteModal user={deleteUser} onClose={() => setDeleteUser(null)} onConfirm={handleDelete} />}
    </div>
  );
};

export default SubscriptionsList;