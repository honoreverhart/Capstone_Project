import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [slideIndex, setSlideIndex] = useState(1);
  const navigate = useNavigate();


  useEffect(()=>{
    showSlides()
  },[slideIndex])


  function plusSlides(n) {
    setSlideIndex(prevIndex => {
      const newIndex = prevIndex + n;
      return newIndex > 3 ? 1 : newIndex < 1 ? 3 : newIndex;
    });
  }

  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
  
    Array.from(slides).forEach(slide => slide.style.display = "none");
    Array.from(dots).forEach(dot => dot.className = dot.className.replace(" active", ""));
  
    slides[slideIndex - 1].style.display = "block";
  }

  return (
    <div>
      <div className="navbar">
        <div className="logo">
          <a className="piece1"></a>
          <a className="piece2"></a>
          <a className="piece3"></a>
          <h2 className="logo">EndoPeaks</h2>
        </div>
        <button className="nav-button" onClick={() => navigate("/login")}>
          Sign in
        </button>
        <button className="nav-button" onClick={() => navigate("/register")}>
          Create an Account
        </button>
      </div>

      <div className="welcome">
        <h1>Welcome to Endurance Peak!</h1>
      </div>

      <div className="slideshow-container">
        <div className="fitness mySlides">
          <div className="numbertext">1 / 3</div>
          <img src="/pictures/circlefitness.jpg" />
          <div className="text">Stay Strong</div>
        </div>

        <div className="fitness mySlides">
          <div className="numbertext">2 / 3</div>
          <img src="/pictures/bestrong.jpg" />
          <div className="text">You Matter</div>
        </div>

        <div className="fitness mySlides">
          <div className="numbertext">3 / 3</div>
          <img src="/pictures/healthylifestyle.jpg" />
          <div className="text">Your Way</div>
        </div>

        <a className="prev" onClick={()=> plusSlides(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={()=> plusSlides(1)}>
          &#10095;
        </a>
      </div>
      <br></br>

      <div className="who_we_are">
        <h3>Who we are</h3>
        <p>
          Endurance Peak is a company striving to help each individual pursue
          and accomplish they're fitness goals. Every person has peaks to climb.
          Through perseverance and endurance you can overcome these mountains!
          Join us today to conquer your fitness peaks!
          <br></br>
          <button
            className="sign_up_button"
            onClick={() => navigate("/register")}
          >
            Sign Up Today!
          </button>
        </p>
      </div>
    </div>
  );
}
