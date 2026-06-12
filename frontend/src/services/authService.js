import axios from "axios";

export const loginUser = async ({ username, password }) => {
  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const response = await axios.post(
    "http://127.0.0.1:8000/login",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  console.log("LOGIN API RESPONSE:", response.data);

  return response.data;
};