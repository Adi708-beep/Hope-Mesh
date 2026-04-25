import React, { useMemo, useState } from "react";
import { Bell, ChevronRight, LogOut, Menu, Search, Settings, ShieldCheck, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu } from "./PlatformOverlays";
import { usePlatform } from "../../context/usePlatform";
import { useAuth } from "../../context/useAuth";

const MotionHeader = motion.header;
const MotionDiv = motion.div;

const fadeIn = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 },
};

export const PublicFrame = ({ page, children }) => {
  const navItems = page.navItems || [];
  return (
    <div className="platform-shell platform-public">
      <div className="platform-glow one" />
      <div className="platform-glow two" />

      <div className="platform-topbar-shell">
        <header className="platform-topbar">
          <NavLink to="/" className="platform-brand" end>
            <span className="platform-brand-mark">H</span>
            <span>HopeMesh</span>
          </NavLink>

          <nav className="platform-nav">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="platform-topbar-actions">
            {page.secondaryAction ? (
              <NavLink to={page.secondaryAction.to} className="platform-btn ghost">
                {page.secondaryAction.label}
              </NavLink>
            ) : null}
            {page.primaryAction ? (
              <NavLink to={page.primaryAction.to} className="platform-btn">
                {page.primaryAction.label}
              </NavLink>
            ) : null}
          </div>
        </header>
      </div>

      <main className="platform-page-wrap">{children}</main>

      <footer className="platform-footer">
        <div className="platform-footer-inner">
          <span>{page.footerLeft || "HopeMesh Ecosystem"}</span>
          <span>{page.footerRight || "Transparency in every action."}</span>
        </div>
      </footer>
    </div>
  );
};

export const PanelFrame = ({ page, children }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = usePlatform();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navItems = page.navItems || [];
  const shell = useMemo(() => {
    return page.shellTitle || page.title;
  }, [page.shellTitle, page.title]);

  return (
    <div className="platform-shell platform-panel">
      <div className="platform-sidebar-shell">
        <AnimatePresence>
          {sidebarOpen ? (
            <>
              <MotionDiv
                className="platform-sidebar-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
              />

              <MotionDiv
                className="platform-sidebar platform-sidebar-mobile"
                initial={{ x: -24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <SidebarContent page={page} navItems={navItems} onClose={() => setSidebarOpen(false)} />
              </MotionDiv>
            </>
          ) : null}
        </AnimatePresence>

        <aside className="platform-sidebar platform-sidebar-desktop">
          <SidebarContent page={page} navItems={navItems} onClose={() => setSidebarOpen(false)} />
        </aside>

        <section className="platform-main-shell">
          <MotionHeader className="platform-main-topbar" {...fadeIn}>
            <button className="platform-btn ghost" type="button" onClick={() => setSidebarOpen((value) => !value)}>
              <Menu size={16} />
            </button>

            <div>
              <div className="platform-breadcrumbs">{page.breadcrumbs || "Dashboard / Overview"}</div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>{shell}</div>
            </div>

            <div className="platform-search">
              <Search size={16} color="rgba(255,255,255,0.55)" />
              <input type="search" placeholder={page.searchPlaceholder || "Search platform"} />
            </div>

            <div className="platform-topbar-actions">
              <div className="platform-dropdown-wrap">
                <button
                  className="platform-btn ghost"
                  type="button"
                  onClick={() => {
                    setNotificationsOpen((current) => !current);
                    setProfileOpen(false);
                  }}
                >
                <Bell size={16} />
                </button>
                <DropdownMenu
                  open={notificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                  items={[
                    { label: "4 new volunteer requests", icon: Bell },
                    { label: "Event reminder in 40 mins", icon: Bell },
                    { label: "2 reports pending moderation", icon: Bell },
                  ]}
                />
              </div>

              <button
                className="platform-btn ghost"
                type="button"
                aria-label="Settings"
                onClick={toggleTheme}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                <Settings size={16} />
              </button>

              <div className="platform-dropdown-wrap">
                <button
                  className="platform-btn ghost"
                  type="button"
                  onClick={() => {
                    setProfileOpen((current) => !current);
                    setNotificationsOpen(false);
                  }}
                >
                <User size={16} />
                </button>
                <DropdownMenu
                  open={profileOpen}
                  onClose={() => setProfileOpen(false)}
                  items={[
                    { label: "Profile", icon: User, onClick: () => navigate(page.path) },
                    { label: "Access Roles", icon: ShieldCheck, onClick: () => navigate("/login") },
                    {
                      label: "Sign out",
                      icon: LogOut,
                      onClick: () => {
                        logout();
                        navigate("/login");
                      },
                    },
                  ]}
                />
              </div>
            </div>
          </MotionHeader>

          <div style={{ marginTop: 20 }}>{children}</div>

          <nav className="platform-bottom-nav" aria-label="Quick navigation">
            {navItems.slice(0, 4).map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `platform-bottom-link ${isActive ? "active" : ""}`}>
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </section>
      </div>
    </div>
  );
};

function SidebarContent({ page, navItems, onClose }) {
  return (
    <div className="platform-sidebar-inner">
      <div className="platform-sidebar-brand">
        <NavLink to="/" className="platform-brand" end>
          <span className="platform-brand-mark">H</span>
          <span>HopeMesh</span>
        </NavLink>
        <p style={{ color: "rgba(255,255,255,0.56)", margin: "14px 0 0", lineHeight: 1.7 }}>
          {page.sidebarCopy || "Unified NGO operations, volunteer coordination, and platform oversight."}
        </p>
      </div>

      <nav className="platform-sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `platform-sidebar-link ${isActive ? "active" : ""}`} onClick={onClose}>
            <item.icon size={16} />
            <span>{item.label}</span>
            <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.5 }} />
          </NavLink>
        ))}
      </nav>

      <div className="platform-card platform-card-content">
        <div className="platform-chip">{page.roleLabel || "Platform Access"}</div>
        <div style={{ marginTop: 14, fontWeight: 700, fontSize: 18 }}>{page.title}</div>
        <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
          {page.summary}
        </p>
      </div>
    </div>
  );
}