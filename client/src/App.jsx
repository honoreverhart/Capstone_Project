import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenCheck = localStorage.getItem("token") || null;
    if (tokenCheck) {
      setToken(tokenCheck);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage token={token} setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<Register setToken={setToken}/>} />
          <Route path="/account" element={<Account token={token} setToken={setToken}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
