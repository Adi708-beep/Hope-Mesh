import React from "react";
import "./GetStarted.css";

const GetStarted = () => {
  return (
    <div className="getstarted-page">
      {/* Background Glow */}
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      {/* Navbar */}
      <header className="top-navbar">
        <div className="logo">HopeMesh</div>

        <div className="nav-right">
          <p>ALREADY HAVE AN ACCOUNT?</p>

          <button className="login-btn">
            Login
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        {/* Heading */}
        <div className="hero-section">
          <span className="subtitle">
            THE MISSION CONTROL FOR IMPACT
          </span>

          <h1>
            Choose your path to change
          </h1>

          <p>
            Whether you are scaling global initiatives
            or offering your unique talents, HopeMesh
            provides the infrastructure for transparent,
            high-velocity social good.
          </p>
        </div>

        {/* Cards */}
        <div className="cards-container">
          {/* NGO Card */}
          <div className="card glass-card">
            <div className="icon-box">
              🏢
            </div>

            <h2>NGO Registration</h2>

            <p className="card-description">
              Unlock institutional-grade fundraising,
              real-time impact tracking, and automated
              donor transparency reports. Designed for
              organizations leading the frontier of
              social change.
            </p>

            <ul>
              <li>
                ✓ Transparent donor dashboard
              </li>

              <li>
                ✓ Global volunteer management
              </li>

              <li>
                ✓ Automated impact analytics
              </li>
            </ul>

            <button className="primary-btn">
              Establish Organization
            </button>

            <span className="bottom-text">
              Requires verification of nonprofit
              status
            </span>
          </div>

          {/* Volunteer Card */}
          <div className="card glass-card">
            <div className="icon-box">
              ❤️
            </div>

            <h2>Volunteer Registration</h2>

            <p className="card-description">
              Deploy your skills where they matter
              most. Join a global network of
              changemakers and build a verified
              portfolio of high-impact contributions
              and skills development.
            </p>

            <ul>
              <li>
                ✓ Personal impact blockchain ledger
              </li>

              <li>
                ✓ AI-driven opportunity matching
              </li>

              <li>
                ✓ Global skill endorsements
              </li>
            </ul>

            <button className="secondary-btn">
              Become a Volunteer
            </button>

            <span className="bottom-text">
              Join 12,000+ active changemakers
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="advisor-text">
          Not sure which one to pick?{" "}
          <span>
            Talk to our mission advisors
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <h3>HopeMesh Ecosystem</h3>

          <p>
            © 2026 HopeMesh Ecosystem.
            Transparency in every action.
          </p>
        </div>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Impact Report</a>
          <a href="#">Newsroom</a>
        </div>
      </footer>
    </div>
  );
};

export default GetStarted;