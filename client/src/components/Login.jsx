import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getLoginToken } from "../api";

export default function Login({ setToken }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "username",
    password: "password",
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
    const login = await getLoginToken(formData);
    if (login.token) {
      setToken(login.token);
      localStorage.setItem("token", login.token);
      navigate("/account");
    } else {
      alert("Username or Password incorrect");
    }
  };

  return (
    <>
      <div>
        <form className="login" onSubmit={handleSubmit}>
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
          <button className="button">Login</button>
        </form>
        <button className="button" onClick={() => navigate("/")}>
          Back To Home Page
        </button>
      </div>
    </>
  );
}
