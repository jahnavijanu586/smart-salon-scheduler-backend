import api from "../api/axios";

export const getPractitioners = async () => {
  const response = await api.get("/practitioners");
  return response.data;
};