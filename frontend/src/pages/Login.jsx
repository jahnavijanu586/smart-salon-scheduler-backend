import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        username,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      if (!data.access_token) {
        alert("No access token received");
        return;
      }

      // Save token
      localStorage.setItem(
        "token",
        data.access_token
      );

      // Update Auth Context
      login(data.access_token);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      if (error.response) {
        console.log(
          "STATUS:",
          error.response.status
        );

        console.log(
          "DATA:",
          error.response.data
        );

        alert(
          error.response.data.detail ||
          "Login Failed"
        );
      } else {
        alert("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-96 p-6 bg-white border rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>
  );
}

export default Login;