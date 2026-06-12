import { useEffect, useState } from "react";
import { getRevenue } from "../services/analyticsService";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {
    try {
      const data = await getRevenue();
      console.log("Revenue API:", data);


      setRevenue(data.total_revenue);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
        <Navbar />
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="bg-green-500 text-white p-6 rounded shadow w-72">

        <h2 className="text-xl font-bold">
          Total Revenue
        </h2>

        <p className="text-3xl mt-2">
          ₹ {revenue}
        </p>

      </div>

    </div>
    </>
  );
}

export default AdminDashboard;