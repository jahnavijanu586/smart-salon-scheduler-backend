import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  const response = await axios.get(
    `http://127.0.0.1:8000/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/dashboard-stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};