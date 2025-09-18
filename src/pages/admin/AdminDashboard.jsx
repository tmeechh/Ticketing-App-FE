import { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import useAdminStore from "@/store/useAdminStore";
import AdminNavbar from "@/components/Navbar/AdminNavbar";

// 🎨 Chart Colors
const COLORS = ["#2563eb", "#16a34a", "#facc15", "#f43f5e"];

const AdminDashboard = () => {
  const { users, events, tickets, fetchUsers, fetchEvents, fetchTickets } =
    useAdminStore();

  useEffect(() => {
    fetchUsers();
    fetchEvents();
    fetchTickets();
  }, [fetchUsers, fetchEvents, fetchTickets]);

  // 🧮 Prepare data
  const totalUsers = users.length;
  const organizers = users.filter((u) => u.roles?.includes("organizer")).length;
  const attendees = users.filter((u) => u.roles?.includes("user")).length;

  const ticketTypeData = [
    { name: "General", value: tickets.filter((t) => t.ticketType === "general").length },
    { name: "VIP", value: tickets.filter((t) => t.ticketType === "vip").length },
    { name: "Premium", value: tickets.filter((t) => t.ticketType === "premium").length },
    { name: "Free", value: tickets.filter((t) => t.ticketType === "free").length },
  ];

  const eventCategoryData = [
    "Concerts",
    "Sports",
    "Conferences",
    "Theater",
    "Festivals",
    "Exhibitions",
  ].map((cat) => ({
    name: cat,
    count: events.filter((e) => e.category === cat).length,
  }));

  const ticketStatusData = [
    { name: "Paid", value: tickets.filter((t) => t.status === "paid").length },
    { name: "Pending", value: tickets.filter((t) => t.status === "pending").length },
    { name: "Cancelled", value: tickets.filter((t) => t.status === "cancelled").length },
  ];

  // 🔥 Recent activity (latest 5 of each)
  const recentUsers = [...users].slice(-5).reverse();
  const recentEvents = [...events].slice(-5).reverse();
  const recentTickets = [...tickets].slice(-5).reverse();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <AdminNavbar />

      <div className="p-6 pt-20 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* === Summary Cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 bg-gradient-to-r from-accent to-primary text-gray-950 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold">{totalUsers}</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">Organizers</h2>
            <p className="text-3xl font-bold">{organizers}</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">Attendees</h2>
            <p className="text-3xl font-bold">{attendees}</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="text-3xl font-bold">{events.length}</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold">Tickets</h2>
            <p className="text-3xl font-bold">{tickets.length}</p>
          </div>
        </div>

        {/* === Charts === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Pie Chart */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Ticket Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  dataKey="value"
                >
                  {ticketTypeData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Events by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Ticket Status Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ticketStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#16a34a" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* === Recent Activity === */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Users */}
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">New Users</h3>
              <ul className="space-y-3">
                {recentUsers.map((u) => (
                  <li key={u._id} className="flex justify-between text-sm">
                    <span>{u.fullName || "Unnamed"}</span>
                    <span className="text-gray-500">{u.roles?.join(", ")}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Events */}
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
              <ul className="space-y-3">
                {recentEvents.map((e) => (
                  <li key={e._id} className="flex justify-between text-sm">
                    <span>{e.title}</span>
                    <span className="text-gray-500">{e.category}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tickets */}
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Latest Tickets</h3>
              <ul className="space-y-3">
                {recentTickets.map((t) => (
                  <li key={t._id} className="flex justify-between text-sm">
                    <span>{t.ticketType}</span>
                    <span className="text-gray-500">{t.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
