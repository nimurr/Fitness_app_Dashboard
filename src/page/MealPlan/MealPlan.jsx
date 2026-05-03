import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiUser, FiGlobe, FiHeart, FiAlertTriangle, FiThumbsDown, FiDroplet } from 'react-icons/fi';

const allMealPlans = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: 'Tasmia Hassan',
  bloodType: 'A+',
  country: 'Bangladesh',
  diet: 'Classic',
  allergies: ['Gluten', 'Dairy', 'Nuts', 'Soy', 'Egg', 'Shellfish'],
  dislikes: ['Gluten', 'Broccoli', 'Mushroom', 'Onion', 'Garlic', 'Cilantro'],
  avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 1}.jpg`,
  title: 'Tasmia Hassan',
}));

const PAGE_SIZE = 5;

const Tag = ({ label, color = 'red' }) => (
  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border
    ${color === 'red'
      ? 'bg-red-700/20 text-red-400 border-red-700/30'
      : color === 'amber'
      ? 'bg-amber-700/20 text-amber-400 border-amber-700/30'
      : 'bg-[#2a2a2c] text-[#888] border-[#333]'
    }`}>
    {label}
  </span>
);

/* ── Detail Modal ── */
const MealModal = ({ user, onClose }) => {
  if (!user) return null;

  const sections = [
    {
      icon: FiDroplet,
      label: 'Blood Group',
      value: null,
      tag: user.bloodType,
      tagColor: 'red',
    },
    {
      icon: FiGlobe,
      label: 'Country',
      value: user.country,
    },
    {
      icon: FiHeart,
      label: 'Diet',
      value: user.diet,
    },
    {
      icon: FiAlertTriangle,
      label: 'Allergies',
      tags: user.allergies,
      tagColor: 'red',
    },
    {
      icon: FiThumbsDown,
      label: 'Dislikes',
      tags: user.dislikes,
      tagColor: 'amber',
    },
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
        {/* Header banner */}
        <div className="relative h-20 bg-gradient-to-r from-red-900/50 via-[#1c1c1e] to-[#1c1c1e]">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #cc1a1a 0%, transparent 60%)' }} />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#2a2a2c] flex items-center
              justify-center text-[#888] hover:text-white hover:bg-[#3a3a3c] transition-colors"
          >
            <FaTimes size={11} />
          </button>
          {/* Avatar */}
          <div className="absolute -bottom-7 left-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-14 h-14 rounded-xl border-2 border-red-700 object-cover shadow-xl"
            />
          </div>
        </div>

        {/* Name */}
        <div className="pt-10 px-5 pb-1">
          <h3 className="text-[#f0f0f2] font-semibold text-base">{user.name}</h3>
          <p className="text-[#555] text-base mt-0.5">{user.title}</p>
        </div>

        {/* Divider */}
        <div className="mx-5 my-3 border-t border-[#252527]" />

        {/* Sections */}
        <div className="px-5 pb-5 flex flex-col gap-3">
          {sections.map(({ icon: Icon, label, value, tag, tags, tagColor }) => (
            <div key={label} className="bg-[#252527] rounded-xl px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-red-700/20 flex items-center justify-center shrink-0">
                  <Icon size={12} className="text-red-400" />
                </div>
                <span className="text-[#555] text-[10px] uppercase tracking-widest font-medium">
                  {label}
                </span>
              </div>

              {/* Single value */}
              {value && (
                <p className="text-[#f0f0f2] text-base font-medium pl-8">{value}</p>
              )}

              {/* Single tag (blood type) */}
              {tag && (
                <div className="pl-8">
                  <Tag label={tag} color={tagColor} />
                </div>
              )}

              {/* Tag list */}
              {tags && (
                <div className="pl-8 flex flex-wrap gap-1.5">
                  {tags.map(t => <Tag key={t} label={t} color={tagColor} />)}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={onClose}
            className="mt-1 w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
              text-white text-base font-semibold"
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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = allMealPlans.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const cols = ['#', 'User Name', 'Blood Type', 'Country', 'Diet', 'Allergies', 'Dislikes', 'View Details'];

  return (
    <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#f0f0f2]">Meal Plan</h1>
          <p className="text-[#555] text-base mt-0.5">Manage user dietary preferences</p>
        </div>
        <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c] rounded-xl
          px-3 py-2 focus-within:border-red-700 transition-colors w-full sm:w-56">
          <FiUser size={14} className="text-[#555] shrink-0" />
          <input
            type="text"
            placeholder="Search user…"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="bg-transparent text-base text-[#ccc] placeholder-[#444] focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl overflow-hidden">

        {/* Header row */}
        <div className="flex items-center border-b-2 border-red-700">
          {cols.map((col, i) => (
            <div key={col}
              className={`flex-1 px-4 py-4 text-base font-medium text-[#f0f0f2] tracking-wide
                ${i < cols.length - 1 ? 'border-r border-[#2a2a2c]' : ''}`}>
              {col}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {paginated.length === 0
          ? <div className="py-16 text-center text-[#444] text-base">No results found.</div>
          : paginated.map((user, ri) => (
            <div key={user.id}
              className={`flex items-center hover:bg-[#222224] transition-colors duration-150
                ${ri < paginated.length - 1 ? 'border-b border-[#252527]' : ''}`}>

              {/* # */}
              <div className="flex-1 px-4 py-4 text-base text-[#555] border-r border-[#252527]">
                {(currentPage - 1) * PAGE_SIZE + ri + 1}
              </div>

              {/* User Name */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527] flex items-center gap-2.5">
                <img src={user.avatar} alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="text-base text-[#f0f0f2] font-medium truncate">{user.name}</p>
                  <p className="text-[10px] text-[#555] truncate">{user.title}</p>
                </div>
              </div>

              {/* Blood Type */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <Tag label={user.bloodType} color="red" />
              </div>

              {/* Country */}
              <div className="flex-1 px-4 py-4 text-base text-[#ccc] border-r border-[#252527] capitalize">
                {user.country}
              </div>

              {/* Diet */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <Tag label={user.diet} color="neutral" />
              </div>

              {/* Allergies */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <div className="flex flex-wrap gap-1">
                  {user.allergies.slice(0, 2).map(a => <Tag key={a} label={a} color="red" />)}
                  {user.allergies.length > 2 && (
                    <span className="text-[10px] text-[#555] self-center">
                      +{user.allergies.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Dislikes */}
              <div className="flex-1 px-4 py-4 border-r border-[#252527]">
                <div className="flex flex-wrap gap-1">
                  {user.dislikes.slice(0, 2).map(d => <Tag key={d} label={d} color="amber" />)}
                  {user.dislikes.length > 2 && (
                    <span className="text-[10px] text-[#555] self-center">
                      +{user.dislikes.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="flex-1 px-4 py-4 flex justify-center">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="px-3 py-1.5 rounded-lg bg-red-700/20 border border-red-700/30
                    text-red-400 text-[10px] font-semibold hover:bg-red-700 hover:text-white
                    transition-all duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 px-1">
        <span className="text-base text-[#666]">
          Showing {paginated.length} of {filtered.length} users
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="text-base px-1 text-[#aaa] disabled:text-[#444] disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p <= 6)
            .map(p => (
              <button key={p} onClick={() => setCurrentPage(p)}
                className={`w-[32px] h-[32px] rounded-full text-base transition-all
                  ${p === currentPage
                    ? 'bg-red-700 text-white font-semibold'
                    : 'text-[#aaa] hover:text-white'}`}>
                {p}
              </button>
            ))}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
            className="text- px-1 text-[#aaa] disabled:text-[#444] disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <MealModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default MealPlan;