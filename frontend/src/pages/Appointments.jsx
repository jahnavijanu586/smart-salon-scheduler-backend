import { useEffect, useState } from "react";
import {
  getAppointments,
  cancelAppointment,
  completeAppointment
} from "../services/appointmentService";
import Navbar from "../components/Navbar";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      alert("Appointment Cancelled");
      loadAppointments();
    } catch (error) {
      alert("Failed to cancel appointment");
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeAppointment(id);
      alert("Appointment Completed");
      loadAppointments();
    } catch (error) {
      alert("Failed to complete appointment");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10">
          Loading appointments...
        </div>
      </>
    );
  }

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
          Appointments
        </h1>

        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="border">
                <th>ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Practitioner</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border text-center"
                >
                  <td>{appointment.id}</td>
                  <td>{appointment.customer_name}</td>
                  <td>{appointment.service_name}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_time}</td>
                  <td>
                    {appointment.duration_minutes} mins
                  </td>

                  <td>
                    ₹{appointment.service_price}
                  </td>

                  <td>
                    {appointment.practitioner_id}
                  </td>
                  <td>
                    <span
                      className={
                        appointment.status === "completed"
                          ? "text-green-600 font-bold"
                          : appointment.status === "cancelled"
                          ? "text-red-600 font-bold"
                          : "text-blue-600 font-bold"
                    }
                 >
                    {appointment.status}
                 </span>
                 </td>

                  <td className="space-x-2">

                    <button
                      onClick={() =>
                        handleCancel(appointment.id)
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() =>
                        handleComplete(appointment.id)
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Complete
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </>
  );
}

export default Appointments;