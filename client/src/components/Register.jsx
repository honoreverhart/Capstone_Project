import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRegisterToken } from "../api";

export default function Register({setToken}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const register = await getRegisterToken(formData)
    if(register.token){
      setToken(register.token)
      localStorage.setItem("token", register.token)
      navigate("/account")
    }else{
      alert("Failure to register")
    }
  }

  return (
    <>
      <div>
        <form className="form">
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
            Role:{" "}
            <input
              //   type="text"
              //   name="name"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </label>
        </form>
      </div>
    </>
  );
}
