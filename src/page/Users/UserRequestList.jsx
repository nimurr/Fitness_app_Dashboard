import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft, FaTimes } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiHash } from "react-icons/fi";
import { useGetAllUsersForAdminQuery } from "../../redux/features/user/userApi";

const PAGE_SIZE = 10;

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide
    ${status === "Subscribers"
      ? "bg-red-700/20 text-red-400 border border-red-700/40"
      : "bg-[#2a2a2c] text-[#888] border border-[#333]"}`}>
    {status}
  </span>
);

/* ── Detail Modal ── */
const UserModal = ({ user, onClose }) => {
  if (!user) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl w-full max-w-md mx-4 shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="relative h-24 bg-gradient-to-r from-red-900/60 to-[#1c1c1e]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center
              justify-center text-[#aaa] hover:text-white hover:bg-[#3a3a3c] transition-colors"
          >
            <FaTimes size={13} />
          </button>
          {/* Avatar */}
          <div className="absolute -bottom-8 left-6">
            <img
              src={user.image?.url}
              alt={user.firstName}
              className="w-16 h-16 rounded-xl border-2 border-red-700 object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Body */}
        <div className="pt-12 px-6 pb-6">
          <div className="mb-5">
            <h3 className="text-[#f0f0f2] font-semibold text-lg leading-tight">
              {user.firstName} {user.lastName}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <StatusBadge status={user.status} />
              <span className="text-[#555] text-xs">·</span>
              <span className="text-[#666] text-xs">{user.role}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[,
              { icon: FiMail, label: "Email", value: user.email },
              { icon: FiPhone, label: "Phone", value: user.phone },
              { icon: FiMapPin, label: "Address", value: user.address_line1 },
              { icon: FiCalendar, label: "Joined", value: formatDate(user.createdAt) },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}
                className="flex items-center gap-3 bg-[#252527] rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-lg bg-red-700/20 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-red-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[#666] text-[10px] uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-[#f0f0f2] text-xs font-medium truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-5 w-full py-2.5 rounded-xl bg-red-700 hover:bg-red-600 transition-colors
              text-white text-sm font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const UserRequestList = () => {

  const { data } = useGetAllUsersForAdminQuery();
  const userFullData = data?.data;

  console.log(userFullData)


  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = userFullData?.filter((u) => {
    const name = `${u.firstName} ${u.lastName}`.toLowerCase();
    const matchName = name.includes(searchText.toLowerCase());
    const matchDate = selectedDate
      ? u.createdAt.startsWith(selectedDate)
      : true;
    return matchName && matchDate;
  });

  const totalPages = Math.ceil(filtered?.length / PAGE_SIZE);
  const paginated = filtered?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const cols = ["#SI", "Full Name", "ROLE", "Email", "Phone", "Joined Date", "Action"];

  return (
    <div className="bg-[#111111] min-h-screen p-7 text-[#f0f0f2]">

      {/* Top bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="flex items-center gap-2 text-xl font-semibold text-[#f0f0f2]">
          <FaAngleLeft className="text-[#666]" /> All Users
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={e => { setSelectedDate(e.target.value); setCurrentPage(1); }}
            className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-lg px-3 py-2 text-xs
              text-[#ccc] focus:outline-none focus:border-red-700 transition-colors"
          />
          <div className="flex items-center gap-2 bg-[#1c1c1e] border border-[#2a2a2c]
            rounded-lg px-3 py-2 focus-within:border-red-700 transition-colors">
            <IoIosSearch className="text-[#555] text-base shrink-0" />
            <input
              type="text"
              placeholder="Search by name…"
              value={searchText}
              onChange={e => { setSearchText(e.target.value); setCurrentPage(1); }}
              className="bg-transparent text-xs text-[#ccc] placeholder-[#555]
                focus:outline-none w-44"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1e] border border-[#2a2a2c] rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center border-b-2 border-red-700">
          {cols.map((col, i) => (
            <div key={col}
              className={`flex-1 px-4 py-4 text-xs font-medium text-[#f0f0f2] tracking-wide
                ${i < cols?.length - 1 ? "border-r border-[#2a2a2c]" : ""}`}>
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginated?.length === 0 ? (
          <div className="py-16 text-center text-[#444] text-sm">No users found.</div>
        ) : paginated?.map((user, ri) => (
          <div key={user.id}
            className={`flex items-center hover:bg-[#222224] transition-colors duration-150
              ${ri < paginated?.length - 1 ? "border-b border-[#252527]" : ""}`}>

            {/* SI */}
            <div className="flex-1 px-4 py-4 text-xs text-[#aaa] border-r border-[#252527]">
              {(currentPage - 1) * PAGE_SIZE + ri + 1}
            </div>
            {/* Account ID */}

            {/* First Name */}
            <div className="flex-1 px-4 py-4 text-xs border-r border-[#252527] flex items-center gap-2.5">
              <img src={user.image?.url} alt={user.name}
                className="w-7 h-7 rounded-lg object-cover shrink-0" />
              {user?.name || "- -"}
            </div>
            {/* Gender */}
            <div className="flex-1 px-4 py-4 text-xs text-[#ccc] border-r border-[#252527]">
              {user.role}
            </div>
            {/* Email */}
            <div className="flex-1 px-4 py-4 text-xs text-[#ccc] border-r border-[#252527] truncate max-w-[140px]">
              {user.email}
            </div>
            {/* Phone */}
            <div className="flex-1 px-4 py-4 text-xs text-[#ccc] border-r border-[#252527]">
              {user.phone}
            </div>
            {/* Joined Date */}
            <div className="flex-1 px-4 py-4 text-xs text-[#ccc] border-r border-[#252527]">
              {formatDate(user.createdAt)}
            </div>
            {/* Action */}
            <div className="flex-1 px-4 py-4 flex justify-center">
              <button
                onClick={() => setSelectedUser(user)}
                className="w-8 h-8 rounded-lg bg-[#2a2a2c] hover:bg-red-700/30 flex items-center
                  justify-center transition-colors duration-200 group"
              >
                <GoInfo className="text-lg text-[#aaa] group-hover:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-5 px-1">
        <span className="text-xs text-[#666]">
          Showing {paginated?.length} of {filtered?.length} users
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="text-xs px-1 bg-transparent text-[#aaa] disabled:text-[#444]
              disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p <= 7)
            .map(p => (
              <button key={p} onClick={() => setCurrentPage(p)}
                className={`w-[34px] h-[34px] rounded-full text-xs transition-all duration-200
                  ${p === currentPage
                    ? "bg-red-700 text-white font-semibold"
                    : "bg-transparent text-[#aaa] hover:text-white"}`}>
                {p}
              </button>
            ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
            className="text-xs px-1 bg-transparent text-[#aaa] disabled:text-[#444]
              disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* User Detail Modal */}
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default UserRequestList;