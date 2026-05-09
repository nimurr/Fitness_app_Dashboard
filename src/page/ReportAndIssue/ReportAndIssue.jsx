

import { useState, useMemo } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  useCreateReportMutation,
  useGetReoprtsAllQuery,
  useDeleteReportMutation,
  useUpdateStatusMutation,
} from "../../redux/features/reportAndIssue/reportAndIssue";

const PAGE_SIZE = 8;

const STATUS_STYLES = {
  pending:  "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  approved: "bg-green-500/15 text-green-400 border border-green-500/30",
  canceled: "bg-red-500/15 text-red-400 border border-red-500/30",
};

const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";

/* ── Field ── */
function Field({ value, onChange, readOnly, placeholder, multiline }) {
  const base =
    "w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2.5 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-[#555] transition-colors";
  return multiline ? (
    <textarea className={`${base} h-20 resize-none`} value={value} onChange={onChange} readOnly={readOnly} placeholder={placeholder} />
  ) : (
    <input className={base} value={value} onChange={onChange} readOnly={readOnly} placeholder={placeholder} />
  );
}

/* ── Skeleton Row ── */
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-3 bg-[#2a2a2a] rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

/* ── View Modal ── */
function ViewModal({ report, onClose, onResolve, onDecline, loading }) {
  if (!report) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#232323] border border-[#333] rounded-xl w-[340px] p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-white text-lg leading-none">✕</button>
        <h3 className="text-white font-bold text-[15px] mb-1">Report Details</h3>
        <p className="text-gray-600 text-xs mb-4">#{report._id?.slice(-6).toUpperCase()}</p>
        <div className="flex flex-col gap-2.5">
          <Field value={report.name} readOnly placeholder="Name" />
          <Field value={report.email} readOnly placeholder="Email" />
          <Field value={report.status} readOnly placeholder="Problem Type" />
          <Field value={report.msg} readOnly multiline placeholder="Message" />
        </div>
        {report.status?.toLowerCase() === "pending" && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={onResolve}
              disabled={loading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold rounded-md py-2.5 transition-colors"
            >
              {loading ? "Updating…" : "Resolve"}
            </button>
            <button
              onClick={onDecline}
              disabled={loading}
              className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-[#444] text-gray-300 text-sm font-semibold rounded-md py-2.5 transition-colors disabled:opacity-50"
            >
              Decline
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Send Reply Modal ── */
function SendModal({ report, onClose, onSend, loading }) {
  const [email, setEmail]     = useState(report?.email || "");
  const [problem, setProblem] = useState(report?.msg || "");
  const [message, setMessage] = useState("");
  const [error, setError]     = useState("");

  if (!report) return null;

  const handleSend = () => {
    if (!email.trim() || !problem.trim() || !message.trim()) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSend({ name: report.name, email, problem, message });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#232323] border border-[#333] rounded-xl w-[340px] p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-white text-lg leading-none">✕</button>
        <h3 className="text-white font-bold text-[15px] mb-1">Send Reply</h3>
        <p className="text-gray-600 text-xs mb-4">#{report._id?.slice(-6).toUpperCase()}</p>
        <div className="flex flex-col gap-2.5">
          <Field value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Field value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Problem Type" />
          <Field value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your reply…" multiline />
        </div>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold rounded-md py-2.5 transition-colors"
        >
          {loading ? "Sending…" : "Send Reply"}
        </button>
      </div>
    </div>
  );
}

/* ── Delete Confirm Modal ── */
function DeleteModal({ onClose, onConfirm, loading }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#232323] border border-[#333] rounded-xl w-[300px] p-6 relative" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white font-bold text-[15px] mb-2">Delete Report?</h3>
        <p className="text-gray-500 text-sm mb-5">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold rounded-md py-2.5 transition-colors"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-[#444] text-gray-300 text-sm font-semibold rounded-md py-2.5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Toast ── */
function Toast({ message, type }) {
  if (!message) return null;
  const colors = { success: "bg-green-700", error: "bg-red-700" };
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 ${colors[type] || "bg-green-700"} text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-lg z-[100] flex items-center gap-2`}>
      {message}
    </div>
  );
}

/* ── Main ── */
export default function ReportAndIssue() {
  const { data, isLoading, isError } = useGetReoprtsAllQuery();
  const [createReport, { isLoading: sending }]   = useCreateReportMutation();
  const [deleteReport, { isLoading: deleting }]  = useDeleteReportMutation();
  const [updateStatus, { isLoading: updating }]  = useUpdateStatusMutation();

  const reports = data?.data || [];
  console.log(reports)

  const [viewTarget,   setViewTarget]   = useState(null);
  const [sendTarget,   setSendTarget]   = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [page,         setPage]         = useState(1);
  const [toast,        setToast]        = useState({ message: "", type: "success" });
  const [search,       setSearch]       = useState("");
  const [dateFilter,   setDateFilter]   = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 2500);
  };

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      const matchName   = r.name?.toLowerCase().includes(search.toLowerCase());
      const matchDate   = dateFilter ? r.createdAt?.includes(dateFilter) : true;
      const matchStatus = statusFilter ? r.status?.toLowerCase() === statusFilter.toLowerCase() : true;
      return matchName && matchDate && matchStatus;
    });
  }, [reports, search, dateFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleResolve = async () => {
    try {
      await updateStatus({ id: reports[viewTarget]._id, data: { status: "approved" } }).unwrap();
      setViewTarget(null);
      showToast("Issue resolved successfully!");
    } catch {
      showToast("Failed to resolve issue.", "error");
    }
  };

  const handleDecline = async () => {
    try {
      await updateStatus({ id: reports[viewTarget]._id, data: { status: "canceled" } }).unwrap();
      setViewTarget(null);
      showToast("Issue declined.");
    } catch {
      showToast("Failed to decline issue.", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReport(reports[deleteTarget]._id).unwrap();
      setDeleteTarget(null);
      showToast("Report deleted.");
    } catch {
      showToast("Failed to delete report.", "error");
    }
  };

  const handleSend = async (payload) => {
    try {
      await createReport(payload).unwrap();
      setSendTarget(null);
      showToast("Reply sent successfully!");
    } catch {
      showToast("Failed to send reply.", "error");
    }
  };

  const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-GB") : "—";

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 p-5 font-sans">

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-white font-bold text-[17px]">Report &amp; Issue</h1>
          <span className="bg-red-600/20 text-red-400 border border-red-600/30 text-xs font-semibold px-2 py-0.5 rounded-full">
            {filtered.length}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-[#555] w-36"
            placeholder="Search name…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <input
            type="date"
            className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-sm text-gray-300 outline-none focus:border-[#555] w-36"
            value={dateFilter}
            onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
          />
          <select
            className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-sm text-gray-300 outline-none focus:border-[#555] w-32"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-x-auto">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr>
              {["#", "Username", "Email", "Problem Type", "Status", "Date", "Action"].map((h) => (
                <th key={h} className="bg-[#222] text-gray-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 text-left border-b border-[#2e2e2e]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            ) : isError ? (
              <tr>
                <td colSpan={7} className="text-center text-red-400 py-10 text-sm">
                  Failed to load reports. Please try again.
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-600 py-10 text-sm">
                  No reports found.
                </td>
              </tr>
            ) : (
              paginated.map((r, i) => {
                const realIndex = reports.indexOf(r);
                return (
                  <tr key={r._id} className="hover:bg-[#232323] transition-colors border-b border-[#252525] last:border-0">
                    <td className="px-4 py-3 text-xs text-gray-600 font-mono">
                      #{r._id?.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300 font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{r.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-100 font-semibold">{r.msg}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[r.status?.toLowerCase()] || "bg-gray-600/20 text-gray-400 border border-gray-600/30"}`}>
                        {capitalize(r.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{formatDate(r.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewTarget(realIndex)}
                          className="bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] text-gray-400 hover:text-white text-xs rounded-md px-3 py-1.5 transition-colors"
                        >
                          View
                        </button>
                        {/* <button
                          onClick={() => setSendTarget(realIndex)}
                          className="bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] text-blue-400 hover:text-blue-300 text-xs rounded-md px-3 py-1.5 transition-colors"
                        >
                          Reply
                        </button> */}
                        <button
                          onClick={() => setDeleteTarget(realIndex)}
                          className="text-red-600 hover:text-red-500 transition-colors px-1.5 py-1 text-base"
                          title="Delete"
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
        <span>
          Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} reports
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="bg-[#2a2a2a] border border-[#3a3a3a] text-gray-400 rounded-md px-3 py-1.5 text-xs hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors border ${
                page === n
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-[#2a2a2a] border-[#3a3a3a] text-gray-400 hover:bg-[#333]"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="bg-[#2a2a2a] border border-[#3a3a3a] text-gray-400 rounded-md px-3 py-1.5 text-xs hover:bg-[#333] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* ── Modals ── */}
      {viewTarget !== null && (
        <ViewModal
          report={reports[viewTarget]}
          onClose={() => setViewTarget(null)}
          onResolve={handleResolve}
          onDecline={handleDecline}
          loading={updating}
        />
      )}
      {sendTarget !== null && (
        <SendModal
          report={reports[sendTarget]}
          onClose={() => setSendTarget(null)}
          onSend={handleSend}
          loading={sending}
        />
      )}
      {deleteTarget !== null && (
        <DeleteModal
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}