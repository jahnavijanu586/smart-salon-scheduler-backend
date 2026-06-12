import api from "../api/axios";

export const getReviews = async () => {
  const response = await api.get("/reviews");
  return response.data;
};

export const createReview = async (reviewData) => {
  const response = await api.post(
    "/reviews",
    reviewData
  );
  return response.data;
};