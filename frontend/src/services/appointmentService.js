import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const createAppointment = async (appointmentData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/book-appointment`,
    appointmentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getAppointments = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/appointments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const cancelAppointment = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/cancel-appointment/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const completeAppointment = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/complete-appointment/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};