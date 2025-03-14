import { useNavigate } from "react-router-dom";

export default function C_Account({setToken}) {
  const navigate = useNavigate();

  const handleSignOut = () =>{
    navigate("/login");
    setToken(null)
    localStorage.removeItem("token")
  }
  
  return (
    <>
      <p>Client :)</p>
      <button className="button" onClick={handleSignOut}>
        Sign-Out
      </button>
    </>
  );
}


//their information
//who their trainer is
//other clients?
//way to view what their trainer assigned them