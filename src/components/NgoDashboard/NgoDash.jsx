import React from "react";
import "./NgoDash.css";

const NgoDash = () => {
  return (
    <div className="dashboard-page">
      {/* Ambient Glow */}
      <div className="ambient ambient-1"></div>
      <div className="ambient ambient-2"></div>

      {/* SIDEBAR */}
      <aside className="sidebar">
        {/* Header */}
        <div className="sidebar-header">
          <div className="avatar-ring">
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
            />
          </div>

          <div>
            <h2>HopeMesh Portal</h2>
            <p>Empowered Transparency</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="nav-links">
          <a href="#" className="active">
            <span className="material-symbols-outlined">
              dashboard
            </span>
            Command Center
          </a>

          <a href="#">
            <span className="material-symbols-outlined">
              forum
            </span>
            Chat Hub
          </a>

          <a href="#">
            <span className="material-symbols-outlined">
              view_kanban
            </span>
            Task Board
          </a>

          <a href="#">
            <span className="material-symbols-outlined">
              group
            </span>
            Directories
          </a>

          <a href="#">
            <span className="material-symbols-outlined">
              settings
            </span>
            Settings
          </a>
        </div>

        {/* CTA */}
        <button className="initiative-btn">
          <span className="material-symbols-outlined">
            add
          </span>
          New Initiative
        </button>

        {/* Footer */}
        <div className="sidebar-footer">
          <a href="#">
            <span className="material-symbols-outlined">
              help
            </span>
            Help Support
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* HEADER */}
        <header className="topbar glass">
          <div className="search-box">
            <span className="material-symbols-outlined">
              search
            </span>

            <input
              type="text"
              placeholder="Search initiatives, volunteers, or reports..."
            />
          </div>

          <div className="topbar-right">
            <button className="notification-btn">
              <span className="material-symbols-outlined">
                notifications
              </span>

              <div className="notification-dot"></div>
            </button>

            <div className="profile-box">
              <div>
                <h4>Sarah Jenkins</h4>
                <p>Global Director</p>
              </div>

              <span className="material-symbols-outlined profile-icon">
                account_circle
              </span>
            </div>
          </div>
        </header>

        {/* TITLE */}
        <section className="overview-section">
          <h1>Overview</h1>

          <p>
            Real-time metrics and global
            impact tracking.
          </p>
        </section>

        {/* KPI GRID */}
        <section className="kpi-grid">
          <div className="kpi-card glass">
            <div className="kpi-top">
              <div>
                <p>Total Volunteers</p>
                <h2>12,480</h2>
              </div>

              <span className="material-symbols-outlined kpi-icon">
                group
              </span>
            </div>

            <span className="growth green">
              +14%
            </span>

            <div className="progress-line"></div>
          </div>

          <div className="kpi-card glass">
            <div className="kpi-top">
              <div>
                <p>Active Events</p>
                <h2>142</h2>
              </div>

              <span className="material-symbols-outlined kpi-icon blue">
                event
              </span>
            </div>

            <span className="growth green">
              +5%
            </span>

            <div className="progress-line blue-line"></div>
          </div>

          <div className="kpi-card glass">
            <div className="kpi-top">
              <div>
                <p>Pending Requests</p>
                <h2>38</h2>
              </div>

              <span className="material-symbols-outlined kpi-icon purple">
                pending_actions
              </span>
            </div>

            <span className="growth red">
              -2%
            </span>

            <div className="bar-chart">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className="kpi-card glass">
            <div className="kpi-top">
              <div>
                <p>Tasks Completed</p>
                <h2>8,902</h2>
              </div>

              <span className="material-symbols-outlined kpi-icon green-bg">
                task_alt
              </span>
            </div>

            <span className="growth">
              This Month
            </span>

            <div className="task-progress">
              <div></div>
            </div>
          </div>
        </section>

        {/* LOWER GRID */}
        <section className="lower-grid">
          {/* CHART */}
          <div className="chart-card glass">
            <div className="section-top">
              <h3>Global Impact Trajectory</h3>

              <select>
                <option>
                  Last 6 Months
                </option>
                <option>This Year</option>
              </select>
            </div>

            <div className="chart-area">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,80 Q20,70 40,50 T80,30 T100,10"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                />

                <defs>
                  <linearGradient id="gradient">
                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                    />

                    <stop
                      offset="100%"
                      stopColor="#06b6d4"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="months">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>

          {/* ACTIVITY */}
          <div className="activity-card glass">
            <div className="section-top">
              <h3>Recent Activity</h3>

              <button>View All</button>
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon blue">
                  <span className="material-symbols-outlined">
                    campaign
                  </span>
                </div>

                <div>
                  <h4>
                    Clean Water Initiative
                    Launched
                  </h4>

                  <p>
                    Sub-Saharan region
                    deployment started.
                  </p>

                  <span>2 hours ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon green">
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                </div>

                <div>
                  <h4>
                    Fundraising Goal Met
                  </h4>

                  <p>
                    EduTech reached 100%
                    funding.
                  </p>

                  <span>5 hours ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon purple">
                  <span className="material-symbols-outlined">
                    person_add
                  </span>
                </div>

                <div>
                  <h4>
                    New Regional Director
                  </h4>

                  <p>
                    Elena joined the EU
                    team.
                  </p>

                  <span>1 day ago</span>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon red">
                  <span className="material-symbols-outlined">
                    warning
                  </span>
                </div>

                <div>
                  <h4>
                    Supply Chain Alert
                  </h4>

                  <p>
                    Medical supplies delayed
                    in transit.
                  </p>

                  <span>1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NgoDash;