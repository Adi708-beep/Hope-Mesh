import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const stats = [
  { value: "10K+", label: "Volunteers" },
  { value: "500+", label: "NGOs" },
  { value: "50+", label: "Cities" },
  { value: "100K+", label: "Tasks Completed" },
];

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Floating Navbar */}
      <header
        className={`floating-navbar ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div className="nav-container">
          <div className="logo">
            HopeMesh
          </div>

          <nav className="nav-links">
            <a href="#">Solutions</a>
            <a href="#">Impact</a>
            <a href="#">About</a>
            <a href="#">Pricing</a>
          </nav>

          <div className="nav-buttons">
            <button className="login-btn">
              Login
            </button>

            <button
              className="gradient-btn"
              type="button"
              onClick={() => navigate("/get-started")}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        {/* Animated Background */}
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>

        {/* Grid */}
        <div className="grid-overlay"></div>

        {/* Content */}
        <div className="hero-content">
          <div className="badge">
            ✨ Trusted by 500+ NGOs Worldwide
          </div>

          <h1>
            Empowering NGOs &
            <span> Volunteers </span>
            Together
          </h1>

          <p>
            Build impact faster with a premium platform
            for volunteer management, communication,
            fundraising, and real-time collaboration.
          </p>

          <div className="hero-buttons">
            <button
              className="gradient-btn large"
              type="button"
              onClick={() => navigate("/get-started")}
            >
              Join as NGO
            </button>

            <button className="glass-btn large" type="button">
              Become Volunteer
            </button>
          </div>

          {/* Stats */}
          <div className="stats-container">
            {stats.map((item, index) => (
              <div
                className="stat-card"
                key={index}
              >
                <h2>{item.value}</h2>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Cards */}
        <div className="floating-card left-card">
          <div className="card-header">
            <div className="icon green">
              ✓
            </div>

            <div>
              <h4>Mission Completed</h4>
              <p>Clean Water Initiative</p>
            </div>
          </div>

          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>

        <div className="floating-card right-card">
          <div className="profile">
            <img
              src="https://i.pravatar.cc/100"
              alt="volunteer"
            />

            <div>
              <h4>Sarah Johnson</h4>
              <p>Joined Disaster Relief Team</p>
            </div>
          </div>

          <button className="profile-btn">
            View Profile
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse"></div>
        </div>
      </section>
    </div>
  );
};

export default Hero;