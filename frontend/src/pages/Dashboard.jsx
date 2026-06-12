import { useEffect, useState } from "react";
import { getProfile, getDashboardStats } from "../services/dashboardService";
import { useNavigate, Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import Navbar from "../components/Navbar";
import { getRevenue } from "../services/analyticsService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
    loadStats();
    loadRevenue();
  }, []);

  const loadProfile = async () => {
  try {
    const data = await getProfile();
    setUser(data);
  } catch (error) {
    console.log("PROFILE ERROR:", error);

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", JSON.stringify(error.response.data));
    }

    setError("Failed to load profile");
  }
};

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      setError("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const loadRevenue = async () => {
    try {
      const data = await getRevenue();
      setRevenue(data.total_revenue);
    } catch (error) {
    console.log(error);
    }
  };       

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const chartData = stats
    ? [
        {
          name: "Completed",
          value: stats.completed
        },
        {
          name: "Cancelled",
          value: stats.cancelled
        },
        {
          name: "Booked",
          value: stats.booked
        }
      ]
    : [];

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10">
          Loading Dashboard...
        </div>
      </>
    );
  }

  // Error State
  if (error) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-red-500">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="p-10">

        <h1 className="text-3xl font-bold mb-5">
          Dashboard
        </h1>

        {/* User Info */}
        {user && (
          <div className="border p-5 rounded mb-5 shadow">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

            <div className="bg-blue-500 text-white p-5 rounded shadow">
              <h2 className="text-2xl font-bold">
                {stats.total}
              </h2>
              <p>Total Appointments</p>
            </div>

            <div className="bg-green-500 text-white p-5 rounded shadow">
              <h2 className="text-2xl font-bold">
                {stats.completed}
              </h2>
              <p>Completed</p>
            </div>

            <div className="bg-red-500 text-white p-5 rounded shadow">
              <h2 className="text-2xl font-bold">
                {stats.cancelled}
              </h2>
              <p>Cancelled</p>
            </div>

            <div className="bg-yellow-500 text-white p-5 rounded shadow">
              <h2 className="text-2xl font-bold">
                {stats.booked}
              </h2>
              <p>Booked</p>
            </div>

            <div className="bg-purple-600 text-white p-5 rounded">
              <h2 className="text-2xl font-bold">
                ₹{revenue || 0}
              </h2>
              <p>Total Revenue</p>
              </div>

          </div>
        )}

        {/* Pie Chart */}
        {stats && (
          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-4">
              Appointment Analytics
            </h2>

            <PieChart width={400} height={300}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                <Cell fill="#22c55e" />
                <Cell fill="#ef4444" />
                <Cell fill="#3b82f6" />
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>

          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">

          <Link
            to="/book-appointment"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Book Appointment
          </Link>

          <Link
            to="/appointments"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            View Appointments
          </Link>

          <Link
            to="/salons"
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            View Salons
          </Link>

          <Link
            to="/practitioners"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            View Practitioners
          </Link>

          <Link
            to="/reviews"
            className="bg-orange-600 text-white px-4 py-2 rounded"
          >
            Reviews
          </Link>

          <Link
            to="/admin-dashboard"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Admin Dashboard
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>
    </>
  );
}

export default Dashboard;