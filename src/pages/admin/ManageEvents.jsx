import { useEffect, useState } from "react";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import useAdminStore from "@/store/useAdminStore";
import {
  Calendar,
  MapPin,
  User,
  Trash2,
  Tag,
  Info,
  X,
} from "lucide-react";

const ManageEvents = () => {
  const { events, fetchEvents, deleteEvent, isLoading } = useAdminStore();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteConfirmEvent, setDeleteConfirmEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Filtered + Sorted events
  const filteredEvents = events
    .filter((event) => {
      const searchTerm = search.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchTerm) ||
        event.category.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.organizerId?.fullName?.toLowerCase().includes(searchTerm) ||
        event.organizerId?.email?.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "category") {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <AdminNavbar />
      <div className="p-6 pt-20 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Manage Events</h1>
        <p className="mb-6 text-gray-600">
          View all events, their details, and manage actions.
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title, category, organizer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
              >
                {/* Event images */}
                <div className="relative w-full h-40 overflow-x-auto flex gap-2 p-2">
                  {event.images && event.images.length > 0 ? (
                    event.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`event-img-${idx}`}
                        className="h-36 w-56 rounded-lg object-cover flex-shrink-0"
                      />
                    ))
                  ) : (
                    <div className="h-36 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-indigo-500" />
                      <span>{event.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>
                        {new Date(event.date).toLocaleDateString()} at{" "}
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-green-500" />
                      <span>
                        {event.organizerId
                          ? `${event.organizerId.fullName || "Unnamed"} (${event.organizerId.email})`
                          : event.organizer}
                      </span>
                    </div>
                  </div>

                  {/* Tickets Info */}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">
                      Ticket Prices / Available
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {["general", "vip", "premium"].map((tier) => (
                        <div
                          key={tier}
                          className="p-2 bg-gray-100 rounded-lg text-center"
                        >
                          <p className="font-semibold capitalize">{tier}</p>
                          <p>${event.ticketPrices?.[tier]}</p>
                          <p className="text-gray-500">
                            {event.ticketsAvailable?.[tier]} left
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t flex justify-between">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="flex items-center gap-2 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg transition"
                  >
                    <Info className="w-4 h-4" />
                    Details
                  </button>
                  <button
                    onClick={() => setDeleteConfirmEvent(event)}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">No events found</div>
        )}
      </div>

      {/* Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <p className="text-gray-600 mb-4">
              {selectedEvent.fullDescription}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedEvent.date).toLocaleDateString()} at{" "}
                  {selectedEvent.time}
                </p>
                <p>
                  <strong>Location:</strong> {selectedEvent.location},{" "}
                  {selectedEvent.address}
                </p>
                <p>
                  <strong>Organizer:</strong>{" "}
                  {selectedEvent.organizerId
                    ? `${selectedEvent.organizerId.fullName} (${selectedEvent.organizerId.email})`
                    : selectedEvent.organizer}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tickets</h3>
                {["general", "vip", "premium"].map((tier) => (
                  <p key={tier}>
                    {tier}: ${selectedEvent.ticketPrices?.[tier]} |{" "}
                    {selectedEvent.ticketsAvailable?.[tier]} left
                  </p>
                ))}
              </div>
            </div>

            {/* Images */}
            {selectedEvent.images && selectedEvent.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto">
                {selectedEvent.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`modal-img-${idx}`}
                    className="h-40 w-64 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteConfirmEvent.title}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmEvent(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteEvent(deleteConfirmEvent._id);
                  setDeleteConfirmEvent(null);
                }}
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
