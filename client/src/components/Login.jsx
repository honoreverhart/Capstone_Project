import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  navigate = useNavigate();

  const [formData, setFormData] = useState();
  return (
    <>
      <div>
        <form>
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
        </form>
      </div>
    </>
  );
}
