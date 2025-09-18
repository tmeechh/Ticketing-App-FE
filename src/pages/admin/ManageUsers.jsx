import { useEffect, useState } from "react";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import useAdminStore from "@/store/useAdminStore";

const ManageUsers = () => {
  const {
    users,
    events,
    tickets,
    fetchUsers,
    fetchEvents,
    fetchTickets,
    deleteUser,
    isLoading,
  } = useAdminStore();

  const [userToDelete, setUserToDelete] = useState(null); // 🔥 for modal

  useEffect(() => {
    fetchUsers();
    fetchEvents();
    fetchTickets();
  }, [fetchUsers, fetchEvents, fetchTickets]);

  // Group users by roles
  const organizers = users.filter((u) => u.roles?.includes("organizer"));
  const normalUsers = users.filter((u) => u.roles?.includes("user"));

  // Count helpers (use String() to avoid objectId vs string mismatch)
  const getEventCount = (organizerId) =>
    events.filter((e) => String(e.organizerId?._id || e.organizerId) === String(organizerId)).length;

  const getTicketCount = (userId) =>
    tickets.filter((t) => String(t.user?._id || t.user) === String(userId)).length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <AdminNavbar />
      <div className="p-6 pt-20 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        <p className="mb-10 text-gray-600">
          View all users, organizers, their details, and manage actions.
        </p>

        {/* Organizers Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Organizers</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Roles</th>
                  <th className="px-6 py-3">Verified</th>
                  <th className="px-6 py-3">Events</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {organizers.length > 0 ? (
                  organizers.map((org) => (
                    <tr
                      key={org._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">{org.fullName || "Unnamed"}</td>
                      <td className="px-6 py-4">{org.email}</td>
                      <td className="px-6 py-4">{org.roles?.join(", ")}</td>
                      <td className="px-6 py-4">
                        {org.isEmailVerified ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            Verified
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                            Not Verified
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {getEventCount(org._id)} events
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setUserToDelete(org)} // 🔥 set modal
                          disabled={isLoading}
                          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No organizers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Roles</th>
                  <th className="px-6 py-3">Verified</th>
                  <th className="px-6 py-3">Tickets</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {normalUsers.length > 0 ? (
                  normalUsers.map((usr) => (
                    <tr
                      key={usr._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">{usr.fullName || "Unnamed"}</td>
                      <td className="px-6 py-4">{usr.email}</td>
                      <td className="px-6 py-4">{usr.roles?.join(", ")}</td>
                      <td className="px-6 py-4">
                        {usr.isEmailVerified ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                            Verified
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                            Not Verified
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {getTicketCount(usr._id)} tickets
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setUserToDelete(usr)} // 🔥 set modal
                          disabled={isLoading}
                          className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🔥 Confirm Delete Modal */}
      {userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-bold">{userToDelete.fullName || "this user"}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteUser(userToDelete._id);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
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

export default ManageUsers;
