import api from "../api/axios";

export const getSalons = async () => {
  const response = await api.get("/salons");
  return response.data;
};