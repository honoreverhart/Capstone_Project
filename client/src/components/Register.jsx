import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRegisterToken } from "../api";

export default function Register({ setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    role: "client",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerT = await getRegisterToken(formData);
    if (registerT.token) {
      setToken(registerT.token);
      localStorage.setItem("token", registerT.token);
      registerT.user.role === "trainer" ? navigate("/t_account") : navigate("/c_account")
    } else {
      alert("Failure to register");
    }
  };

  return (
    <>
      <div>
        <form className="register" onSubmit={handleSubmit}>
          <label>
            First Name:{" "}
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:{" "}
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:{" "}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Username:{" "}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="client">Client</option>
              <option value="trainer">Trainer</option>
            </select>
          </label>
          <button className="button">Login</button>
        </form>
        <button className="button" onClick={() => navigate("/")}>
          Back To Home Page
        </button>
      </div>
    </>
  );
}
