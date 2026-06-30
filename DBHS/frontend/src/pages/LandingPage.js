// src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  document.title = "JL-U1 Enterprise | Welcome";

  return (
    <div className="landing-container">
      {/* Greeting Section */}
      <section className="greeting">
        <h1>Welcome to JL-U1 Enterprise!</h1>
      </section>

      <section>
        <div className="btn-group">
          <button onClick={() => navigate("/login")} className="primary-btn">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="secondary-btn">
            Register
          </button>
        </div>

        <p>“Building a business is not rocket science, it's about having a great idea and seeing it through with integrity.” - Mark Zuckerberg</p>

      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission-vision-container">
            <div>
                <h2>Our Mission</h2>
                <p>
                To provide efficient, user-friendly solutions that empower businesses
                to manage operations seamlessly.
                </p>
            </div>

            <div>
            <h2>Our Vision</h2>
            <p>
                To be the leading platform for integrated enterprise management,
                fostering growth and innovation.
            </p>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          JL-U1 Enterprise System is designed to simplify payroll, vehicle
          management, and business category tracking. Our goal is to make
          enterprise management accessible and effective for all.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Us</h2>
        <p>Email: support@jlu1enterprise.com</p>
        <p>Phone: +63 912 345 6789</p>
        <p>Address: Sabang, Calabanga, Camarines Sur, Philippines</p>
      </section>
    </div>
  );
}

export default LandingPage;
