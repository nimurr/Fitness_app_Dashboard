import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

const initialData = [
    { id: "#125", name: "Tasmia Hassan", email: "t@gmail.com", problem: "Meal Issue", status: "Pending", date: "2025-09-27", desc: "Not Accurate Results" },
    { id: "#125", name: "Tasmia Hassan", email: "t@gmail.com", problem: "Meal Issue", status: "Approved", date: "2025-09-27", desc: "Not Accurate Results" },
    { id: "#125", name: "Tasmia Hassan", email: "t@gmail.com", problem: "Meal Issue", status: "Canceled", date: "2025-09-27", desc: "Not Accurate Results" },
    { id: "#125", name: "Tasmia Hassan", email: "t@gmail.com", problem: "Meal Issue", status: "Pending", date: "2025-09-27", desc: "Not Accurate Results" },
    { id: "#125", name: "Tasmia Hassan", email: "t@gmail.com", problem: "Meal Issue", status: "Pending", date: "2025-09-27", desc: "Not Accurate Results" },
];

const STATUS_STYLES = {
    Pending: "bg-yellow-500 text-white",
    Approved: "bg-green-600 text-white",
    Canceled: "bg-red-600 text-white",
};

/* ── Reusable Input ── */
function Field({ value, onChange, readOnly, placeholder, multiline }) {
    const base =
        "w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2.5 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-[#555] transition-colors";
    return multiline ? (
        <textarea
            className={`${base} h-20 resize-none`}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            placeholder={placeholder}
        />
    ) : (
        <input
            className={base}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            placeholder={placeholder}
        />
    );
}

/* ── View / Resolve Modal ── */
function ViewModal({ report, onClose, onResolve, onDecline }) {
    if (!report) return null;
    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#232323] border border-[#333] rounded-xl w-[340px] p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-white text-lg leading-none"
                >
                    ✕
                </button>
                <h3 className="text-white font-bold text-[15px] mb-4">
                    Report {report.id}
                </h3>
                <div className="flex flex-col gap-2.5">
                    <Field value={report.name} readOnly />
                    <Field value={report.email} readOnly />
                    <Field value={report.problem} readOnly />
                    <Field value={report.desc} readOnly multiline />
                </div>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={onResolve}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md py-2.5 transition-colors"
                    >
                        Resolve The Issue
                    </button>
                    <button
                        onClick={onDecline}
                        className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-[#444] text-gray-300 text-sm font-semibold rounded-md py-2.5 transition-colors"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ── Send Reply Modal ── */
function SendModal({ report, onClose, onSend }) {
    const [email, setEmail] = useState(report?.email || "");
    const [problem, setProblem] = useState(report?.problem || "");
    const [desc, setDesc] = useState(report?.desc || "");

    if (!report) return null;
    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-[#232323] border border-[#333] rounded-xl w-[340px] p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-white text-lg leading-none"
                >
                    ✕
                </button>
                <h3 className="text-white font-bold text-[15px] mb-4">
                    Report {report.id}
                </h3>
                <div className="flex flex-col gap-2.5">
                    <Field
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <Field
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        placeholder="Problem Type"
                    />
                    <Field
                        // value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Description"
                        multiline
                    />
                </div>
                <button
                    onClick={() => onSend({ email, problem, desc })}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-md py-2.5 transition-colors"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

/* ── Toast ── */
function Toast({ message }) {
    if (!message) return null;
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-lg z-[100]">
            {message}
        </div>
    );
}

/* ── Main Component ── */
export default function ReportAndIssue() {
    const [reports, setReports] = useState(initialData);
    const [viewTarget, setViewTarget] = useState(null);   // index
    const [sendTarget, setSendTarget] = useState(null);   // index
    const [page, setPage] = useState(1);
    const [toast, setToast] = useState("");
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(""), 2500);
    };

    const handleResolve = () => {
        setReports((prev) =>
            prev.map((r, i) => (i === viewTarget ? { ...r, status: "Approved" } : r))
        );
        setViewTarget(null);
        showToast("Issue resolved successfully!");
    };

    const handleDecline = () => {
        setReports((prev) =>
            prev.map((r, i) => (i === viewTarget ? { ...r, status: "Canceled" } : r))
        );
        setViewTarget(null);
        showToast("Issue declined.");
    };

    const handleDelete = (i) => {
        setReports((prev) => prev.filter((_, idx) => idx !== i));
        showToast("Report deleted.");
    };

    const handleSend = () => {
        setSendTarget(null);
        showToast("Reply sent successfully!");
    };

    const filtered = reports.filter((r) => {
        const matchName = r.name.toLowerCase().includes(search.toLowerCase());
        const matchDate = dateFilter ? r.date.includes(dateFilter) : true;
        const matchStatus = statusFilter ? r.status === statusFilter : true;
        return matchName && matchDate && matchStatus;
    });

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-200 p-5 font-sans">

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                    <button className="text-gray-500 hover:text-white text-xl leading-none">←</button>
                    <h1 className="text-white font-bold text-[17px]">Report &amp; Issue</h1>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <input
                        className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-[#555] w-36"
                        placeholder="User Name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <input
                        type="text"
                        className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-[#555] w-32"
                        placeholder="Date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                    <select
                        className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-md px-3 py-2 text-sm text-gray-300 outline-none focus:border-[#555] w-32"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
            </div>

            {/* ── Table ── */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-x-auto">
                <table className="w-full border-collapse min-w-[640px]">
                    <thead>
                        <tr>
                            {["R.ID", "Username", "Email", "Problem Type", "Status", "Date", "Action"].map((h) => (
                                <th
                                    key={h}
                                    className="bg-[#222] text-gray-500 text-xs font-semibold uppercase tracking-wide px-4 py-3 text-left border-b border-[#2e2e2e]"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-600 py-8 text-sm">
                                    No reports found.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((r, i) => (
                                <tr key={i} className="hover:bg-[#232323] transition-colors">
                                    <td className="px-4 py-3 text-sm text-gray-500">{r.id}</td>
                                    <td className="px-4 py-3 text-sm text-gray-300">{r.name}</td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{r.email}</td>
                                    <td className="px-4 py-3 text-sm text-gray-100 font-semibold">{r.problem}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded ${STATUS_STYLES[r.status] || "bg-gray-600 text-white"}`}
                                        >
                                            {r.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{r.date}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setViewTarget(i)}
                                                className="bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] text-gray-400 hover:text-white text-xs rounded-md px-3 py-1.5 transition-colors"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => setSendTarget(i)}
                                                className="bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] text-blue-400 hover:text-blue-300 text-xs rounded-md px-3 py-1.5 transition-colors"
                                            >
                                                Reply
                                            </button>
                                            <button
                                                onClick={() => handleDelete(i)}
                                                className="text-red-600 hover:text-red-500 transition-colors px-1.5 py-1 text-base"
                                                title="Delete"
                                            >
                                                <RiDeleteBin6Fill />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Pagination ── */}
            <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                <span>Showing {filtered.length} of {reports.length} users</span>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="bg-[#2a2a2a] border border-[#3a3a3a] text-gray-400 rounded-md px-3 py-1.5 text-xs hover:bg-[#333] transition-colors"
                    >
                        Prev
                    </button>
                    {[1, 2].map((n) => (
                        <button
                            key={n}
                            onClick={() => setPage(n)}
                            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors border ${page === n
                                    ? "bg-red-600 border-red-600 text-white"
                                    : "bg-[#2a2a2a] border-[#3a3a3a] text-gray-400 hover:bg-[#333]"
                                }`}
                        >
                            {n}
                        </button>
                    ))}
                    <button
                        onClick={() => setPage((p) => Math.min(2, p + 1))}
                        className="bg-[#2a2a2a] border border-[#3a3a3a] text-gray-400 rounded-md px-3 py-1.5 text-xs hover:bg-[#333] transition-colors"
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
                />
            )}
            {sendTarget !== null && (
                <SendModal
                    report={reports[sendTarget]}
                    onClose={() => setSendTarget(null)}
                    onSend={handleSend}
                />
            )}

            {/* ── Toast ── */}
            <Toast message={toast} />
        </div>
    );
}