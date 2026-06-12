import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow">
      <div className="flex gap-6 font-medium">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/salons">Salons</Link>

        <Link to="/practitioners">Practitioners</Link>

        <Link to="/appointments">Appointments</Link>

        <Link to="/reviews">Reviews</Link>

        <Link to="/admin-dashboard">Admin</Link>

      </div>
    </nav>
  );
}

export default Navbar;