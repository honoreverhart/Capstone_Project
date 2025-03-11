import {useNavigate} from "react-router-dom";
import {useEffect} from "react"


export default function HomePage() {
    
    const navigate = useNavigate();

    // useEffect(()=>{
    //     fetch("http://localhost:3000/api/workouts").then(res => res.json()).then(data => console.log(data))
    // }, [])
  return (
    <div>
        <div className="navbar">
            <h1 className="logo">EndoPeaks</h1>
            <button onClick = {()=>navigate("/login")}>Sign in</button>
            <button onClick = {()=>navigate("/register")}>Create an Account</button>
        </div>
      <h1>Welcome to Endurance Peak!</h1>
      <h3>Who we are</h3>
      <p>
        Endurance Peak is a company striving to help each individual pursue and
        accomplish they're fitness goals. Every person has peaks to climb.
        Through perseverance and endurance you can overcome these mountains!
        Join us today to conquer your fitness peaks!
        <br></br>
        <button onClick = {()=>navigate("/register")}>Sign Up Today!</button>
      </p>
      
    </div>
  );
}
