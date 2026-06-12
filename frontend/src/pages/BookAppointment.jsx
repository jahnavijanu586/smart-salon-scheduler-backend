import { useState } from "react";
import { createAppointment } from "../services/appointmentService";

function BookAppointment() {
  const [formData, setFormData] = useState({
    customer_name: "",
    service_name: "",
    appointment_date: "",
    appointment_time: "",
    duration_minutes: "",
    practitioner_id: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await createAppointment({
        ...formData,
        duration_minutes: Number(formData.duration_minutes),
        practitioner_id: Number(formData.practitioner_id)
      });

      alert("Appointment Booked Successfully");

      setFormData({
        customer_name: "",
        service_name: "",
        appointment_date: "",
        appointment_time: "",
        duration_minutes: "",
        practitioner_id: ""
      });

    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Book Appointment
      </h1>

      <div className="space-y-3 max-w-md">

        <input
          name="customer_name"
          placeholder="Customer Name"
          className="border p-2 w-full"
          value={formData.customer_name}
          onChange={handleChange}
        />

        <input
          name="service_name"
          placeholder="Service Name"
          className="border p-2 w-full"
          value={formData.service_name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="appointment_date"
          className="border p-2 w-full"
          value={formData.appointment_date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="appointment_time"
          className="border p-2 w-full"
          value={formData.appointment_time}
          onChange={handleChange}
        />

        <input
          type="number"
          name="duration_minutes"
          placeholder="Duration Minutes"
          className="border p-2 w-full"
          value={formData.duration_minutes}
          onChange={handleChange}
        />

        <input
          type="number"
          name="practitioner_id"
          placeholder="Practitioner ID"
          className="border p-2 w-full"
          value={formData.practitioner_id}
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white p-2 rounded w-full"
        >
          Book Appointment
        </button>

      </div>
    </div>
  );
}

export default BookAppointment;