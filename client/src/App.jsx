import { useState } from "react";
import HomePage from "./components/HomePage"
// import Account from "./components/Account";
// import Login from "./components/Login";
// import Register from "./components/Register"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.css";

function App() {
  // const [token, setToken] = useState(null);
  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage/>}>
      
    </Route>
  </Routes>
  </BrowserRouter>
  </>;
}

export default App;
