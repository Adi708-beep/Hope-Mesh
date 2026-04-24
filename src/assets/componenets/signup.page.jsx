import { useState } from "react";
import "./AuthPage.css";

export default function SignupPage() {
  const [role, setRole] = useState("volunteer");
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    location: "",
    uniqueId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, ...formData });
  };

  const handleLoginClick = () => {
    console.log("Navigate to Login");
  };

  return (
    <div className="container">
      <div className="auth-card">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <div className="overlay">
            <h2>Make an Impact</h2>
            <p>Join our NGO and contribute to meaningful change.</p>
            <div className="stats">
              <div className="stat-card">
                <span className="stat-number">1200+</span>
                <span className="stat-label">Volunteers</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">50+</span>
                <span className="stat-label">Campaigns</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">10k+</span>
                <span className="stat-label">Lives Impacted</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <h2>Create Account</h2>

          <form className="form" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div className="role-select">
              <button
                type="button"
                className={role === "volunteer" ? "active" : ""}
                onClick={() => setRole("volunteer")}
              >
                Volunteer
              </button>
              <button
                type="button"
                className={role === "staff" ? "active" : ""}
                onClick={() => setRole("staff")}
              >
                Staff
              </button>
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Contact Number */}
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                placeholder="Enter your contact number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">Location (City/State)</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter your city and state"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Conditional Unique ID */}
            <div className="form-group">
              <label htmlFor="uniqueId">
                {role === "volunteer" ? "Volunteer Unique ID" : "Staff Unique ID"}
              </label>
              <input
                type="text"
                id="uniqueId"
                name="uniqueId"
                placeholder={
                  role === "volunteer"
                    ? "Enter your Volunteer ID"
                    : "Enter your Staff ID"
                }
                value={formData.uniqueId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <button type="submit" className="submit-btn">
              Create Account
            </button>
          </form>

          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={handleLoginClick}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}