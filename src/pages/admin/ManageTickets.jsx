import React, { useEffect, useState, useMemo } from "react";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import useAdminStore from "@/store/useAdminStore";
import {
  Ticket as TicketIcon,
  User as UserIcon,
  Calendar,
  Trash2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Clock,
  Search,
} from "lucide-react";

/**
 * ManageTickets - admin UI for listing, searching, filtering & deleting tickets
 * - populated user & event support
 * - modal confirmation for delete
 * - responsive table (desktop) & cards (mobile)
 */

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleString() : "—";

const formatCurrency = (n) =>
  typeof n === "number" ? `$${n.toFixed(2)}` : "—";

const ManageTickets = () => {
  const {
    tickets,
    fetchTickets,
    fetchUsers,
    fetchEvents,
    deleteTicket,
    isLoading,
  } = useAdminStore();

  const [expandedId, setExpandedId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [query, setQuery] = useState("");

  // modal state
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    fetchTickets();
    fetchUsers();
    fetchEvents();
  }, [fetchTickets, fetchUsers, fetchEvents]);

  const filtered = useMemo(() => {
    return (tickets || [])
      .filter((t) => (filterStatus === "all" ? true : t.status === filterStatus))
      .filter((t) => (filterType === "all" ? true : t.ticketType === filterType))
      .filter((t) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          t._id?.toString().includes(q) ||
          (t.user?.fullName || "").toLowerCase().includes(q) ||
          (t.user?.email || "").toLowerCase().includes(q) ||
          (t.event?.title || "").toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [tickets, filterStatus, filterType, query]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteTicket(deleteTarget);
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <AdminNavbar />

      <div className="p-6 pt-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Manage Tickets</h1>
            <p className="text-gray-600 mt-1">
              List, inspect and remove tickets. Expand a row to view the history.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by ticket id, user or event..."
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm w-64"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
            >
              <option value="all">All status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
            >
              <option value="all">All types</option>
              <option value="general">General</option>
              <option value="vip">VIP</option>
              <option value="premium">Premium</option>
              <option value="free">Free</option>
            </select>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="mt-6 hidden md:block bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="py-8 text-center text-gray-500"
                  >
                    No tickets found
                  </td>
                </tr>
              ) : (
                filtered.map((t) => {
                  const isExpanded = expandedId === t._id;
                  return (
                    <React.Fragment key={t._id}>
                      <tr className="border-t hover:bg-gray-50">
                        <td className="px-4 py-3 align-top">
                          <div className="text-xs text-gray-600">
                            #{t._id?.toString().slice(-6)}
                          </div>
                          <div className="mt-1 text-gray-800 flex items-center gap-2">
                            <TicketIcon className="w-4 h-4 text-indigo-500" />
                            <div className="text-sm">
                              {t.paymentReference || "—"}
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 align-top">
                          <div className="font-semibold">
                            {t.event?.title || "Event not found!"}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {t.event?.date
                              ? `${new Date(
                                  t.event.date
                                ).toLocaleDateString()} • ${
                                  t.event.location
                                }`
                              : ""}
                          </div>
                        </td>

                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                              {t.user?.image ? (
                                <img
                                  src={t.user.image}
                                  alt="u"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <UserIcon className="w-full h-full p-1 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">
                                {t.user?.fullName || "User"}
                              </div>
                              <div className="text-xs text-gray-500">
                                {t.user?.email || "—"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 align-top capitalize">
                          {t.ticketType}
                        </td>
                        <td className="px-4 py-3 align-top">{t.quantity}</td>
                        <td className="px-4 py-3 align-top">
                          {formatCurrency(t.price)}
                        </td>

                        <td className="px-4 py-3 align-top">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              t.status === "paid"
                                ? "bg-green-100 text-green-700"
                                : t.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>

                        <td className="px-4 py-3 align-top">
                          {formatDate(t.createdAt)}
                        </td>

                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setExpandedId(isExpanded ? null : t._id)
                              }
                              className="p-2 rounded-md bg-white border border-gray-200 hover:shadow-sm"
                              title="Toggle details"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              onClick={() => setDeleteTarget(t._id)}
                              disabled={isLoading}
                              className="flex items-center gap-2 px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-gray-50">
                          <td colSpan="9" className="px-6 py-4">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <h4 className="font-semibold mb-1">Payment</h4>
                                <div className="text-sm text-gray-700">
                                  <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-amber-600" />{" "}
                                    {formatCurrency(t.price)}
                                  </div>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Clock className="w-4 h-4 text-gray-500" />{" "}
                                    {formatDate(t.createdAt)}
                                  </div>
                                  {t.paymentReference && (
                                    <div className="mt-2 text-xs text-gray-500">
                                      Ref: {t.paymentReference}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-1">History</h4>
                                <div className="text-sm text-gray-700 space-y-2">
                                  {Array.isArray(t.history) &&
                                  t.history.length > 0 ? (
                                    t.history.map((h, i) => (
                                      <div
                                        key={i}
                                        className="text-xs p-2 rounded-md bg-white border border-gray-100"
                                      >
                                        <div className="font-medium">
                                          {h.action}
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                          {formatDate(h.timestamp)}
                                        </div>
                                        {h.note && (
                                          <div className="mt-1 text-xs text-gray-600">
                                            {h.note}
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-xs text-gray-500">
                                      No activity recorded.
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-1">Meta</h4>
                                <div className="text-sm text-gray-700">
                                  <div>
                                    <strong>Ticket ID:</strong> {t._id}
                                  </div>
                                  <div className="mt-1">
                                    <strong>Quantity:</strong> {t.quantity}
                                  </div>
                                  <div className="mt-1">
                                    <strong>Type:</strong> {t.ticketType}
                                  </div>
                                  <div className="mt-1">
                                    <strong>Status:</strong> {t.status}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="mt-6 md:hidden space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No tickets found
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t._id}
                className="bg-white p-4 rounded-xl shadow border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500">
                      #{t._id?.toString().slice(-6)} •{" "}
                      {formatDate(t.createdAt)}
                    </div>
                    <div className="font-semibold mt-2">
                      {t.event?.title || "Event"}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {t.user?.fullName || t.user?.email}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {formatCurrency(t.price)}
                    </div>
                    <div
                      className={`mt-2 text-xs px-2 py-1 rounded-full ${
                        t.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : t.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.status}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === t._id ? null : t._id)
                    }
                    className="text-sm text-gray-700 px-3 py-2 border rounded-md"
                  >
                    {expandedId === t._id ? "Hide details" : "View details"}
                  </button>

                  <button
                    onClick={() => setDeleteTarget(t._id)}
                    disabled={isLoading}
                    className="text-sm px-3 py-2 rounded-md bg-red-500 text-white"
                  >
                    Delete
                  </button>
                </div>

                {expandedId === t._id && (
                  <div className="mt-3 pt-3 border-t text-sm text-gray-700 space-y-2">
                    <div>
                      <strong>Ref:</strong> {t.paymentReference || "—"}
                    </div>
                    <div>
                      <strong>Type:</strong> {t.ticketType}
                    </div>
                    <div>
                      <strong>Qty:</strong> {t.quantity}
                    </div>
                    <div>
                      <strong>History:</strong>
                    </div>
                    <div className="space-y-1">
                      {Array.isArray(t.history) && t.history.length > 0 ? (
                        t.history.map((h, i) => (
                          <div
                            key={i}
                            className="text-xs bg-gray-100 p-2 rounded"
                          >
                            {h.action} — {formatDate(h.timestamp)}
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-gray-500">No activity</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Delete
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this ticket? This action cannot be
              undone.
            </p>

            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isLoading}
                className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTickets;
