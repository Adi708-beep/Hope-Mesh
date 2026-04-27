import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  MessageSquareMore,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { PublicFrame, PanelFrame } from "../components/platform/PlatformFrame";
import {
  FeatureGrid,
  GlassCard,
  MetricCard,
  MiniChartCard,
  SectionHeader,
  SimpleTable,
  TimelineList,
} from "../components/platform/PlatformWidgets";
import {
  EmptyState,
  ModalDialog,
  SkeletonBlocks,
  ToastStack,
} from "../components/platform/PlatformOverlays";
import { useAuth } from "../context/useAuth";

const panelPillStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.82)",
};

export default function PlatformPage({ page }) {
  const [toasts, setToasts] = useState([]);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 360);

    return () => clearTimeout(timer);
  }, [page.path]);

  useEffect(() => {
    if (!toasts.length) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 2600);

    return () => clearTimeout(timer);
  }, [toasts]);

  const notify = (title, message, type = "info") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((current) => [...current, { id, title, message, type }]);
  };

  const closeModal = () => setIsActionModalOpen(false);

  const sharedProps = {
    page,
    isLoading,
    notify,
    openActionModal: () => setIsActionModalOpen(true),
  };

  let content = null;

  if (page.layout === "auth") {
    content = <AuthPage {...sharedProps} />;
  } else if (page.layout === "panel") {
    content = <PanelPage {...sharedProps} />;
  } else if (page.layout === "chat") {
    content = <ChatPage {...sharedProps} />;
  } else {
    content = <PublicPage {...sharedProps} />;
  }

  return (
    <>
      {content}

      <ModalDialog
        open={isActionModalOpen}
        onClose={closeModal}
        title={`Create in ${page.title}`}
        description="Use this reusable modal for tasks, events, reports, or collaboration entries."
        actions={(
          <>
            <button className="platform-btn ghost" type="button" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="platform-btn"
              type="button"
              onClick={() => {
                closeModal();
                notify("Saved", "Your entry has been captured in the current workspace.", "success");
              }}
            >
              Save
            </button>
          </>
        )}
      />

      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((current) => current.filter((item) => item.id !== id))} />
    </>
  );
}

function PublicPage({ page, isLoading, notify }) {
  return (
    <PublicFrame page={page}>
      <section className="platform-hero centered">
        <div className="platform-eyebrow">{page.variant === "landing" ? "Premium NGO Ecosystem" : page.variant.toUpperCase()}</div>
        <h1 className="platform-title">{page.title}</h1>
        <p className="platform-summary">{page.summary}</p>
        <div className="platform-actions centered">
          {page.primaryAction ? (
            <Link className="platform-btn" to={page.primaryAction.to}>
              {page.primaryAction.label}
            </Link>
          ) : null}
        </div>
      </section>

      {isLoading ? <SkeletonBlocks count={4} height={180} /> : null}

      {!isLoading && page.variant === "landing" ? (
        <>
          <section className="platform-section">
            <SectionHeader
              eyebrow="Platform Snapshot"
              title="Built to keep one operating system across every role"
              summary="The same glass card treatment, motion, and color system extend from public pages into working dashboards."
            />
            <div className="platform-metric-grid">
              {page.stats.map((item) => (
                <GlassCard key={item.label} className="platform-stat">
                  <div className="platform-stat-value">{item.value}</div>
                  <div className="platform-stat-label">{item.label}</div>
                </GlassCard>
              ))}
            </div>
          </section>

          <section className="platform-section">
            <SectionHeader
              eyebrow="Features"
              title="Core workflow surface"
              summary="Volunteer matching, events, approval flows, analytics, and messaging organized as reusable modules."
            />
            <FeatureGrid
              columns={3}
              items={page.highlights.map((item, index) => ({
                ...item,
                icon: [Sparkles, Check, ShieldCheck, Clock3, MessageSquareMore, Star][index % 6],
              }))}
            />
          </section>

          <section className="platform-section platform-grid-2 platform-section-grid">
            <div>
              <SectionHeader
                eyebrow="Showcase"
                title="A system that feels like a funded SaaS product"
                summary="The layout keeps the same spacing rhythm and glassmorphism level while expanding into practical platform states."
              />
              <div className="platform-grid-2 platform-section-grid">
                <GlassCard>
                  <div className="platform-chip">Live Activity</div>
                  <h3 style={{ marginTop: 14, fontSize: 24 }}>12,400 volunteers and 500 NGOs already modeled in the system</h3>
                  <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>
                    The mock platform data mirrors the operational scale the product is designed to support.
                  </p>
                </GlassCard>
                <GlassCard>
                  <div className="platform-chip">Trust Layer</div>
                  <h3 style={{ marginTop: 14, fontSize: 24 }}>Verification badges and role-based routing keep workflows clean</h3>
                  <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>
                    This keeps the NGO, volunteer, and admin surfaces visually unified while still distinct.
                  </p>
                </GlassCard>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Testimonials" title="Signals from the experience" />
              <div className="platform-section-grid">
                {page.testimonials.map((item) => (
                  <GlassCard key={item.author}>
                    <p style={{ margin: 0, fontSize: 18, lineHeight: 1.9, color: "rgba(255,255,255,0.82)" }}>"{item.quote}"</p>
                    <div style={{ marginTop: 16, color: "#cbd5e1" }}>{item.author}</div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}

      {!isLoading && page.variant === "about" ? (
        <section className="platform-section">
          <SectionHeader eyebrow="Mission Stack" title="Mission, vision, and operating goals" />
          <FeatureGrid
            columns={3}
            items={page.sections.map((item) => ({
              ...item,
              icon: Sparkles,
            }))}
          />
          <div className="platform-section" />
          <SectionHeader eyebrow="Timeline" title="Why the platform exists" />
          <TimelineList items={page.timeline} />
          <div className="platform-section" />
          <SectionHeader eyebrow="Team" title="A small team with product-minded execution" />
          <div className="platform-grid-3 platform-section-grid">
            {page.team.map((member) => (
              <GlassCard key={member.name}>
                <img src={member.avatar} alt={member.name} className="platform-avatar" />
                <h3 style={{ marginTop: 16 }}>{member.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.68)" }}>{member.role}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      ) : null}

      {!isLoading && page.variant === "contact" ? (
        <section className="platform-section platform-grid-2 platform-section-grid">
          <GlassCard className="platform-auth-card">
            <SectionHeader eyebrow="Contact Form" title="Send the team a direct message" />
            <div className="platform-form-grid">
              <input className="platform-input" placeholder="Your name" />
              <input className="platform-input" placeholder="Email address" />
              <input className="platform-input" placeholder="Subject" />
              <textarea className="platform-textarea" placeholder="How can we help?" />
              <button
                className="platform-btn"
                type="button"
                onClick={() => notify("Message Sent", "Your support request was queued successfully.", "success")}
              >
                Send Message <Send size={16} style={{ marginLeft: 8 }} />
              </button>
            </div>
          </GlassCard>

          <div className="platform-section-grid">
            <SectionHeader eyebrow="Support Cards" title="Fast paths to the right team" />
            <div className="platform-section-grid">
              {page.sections.map((item) => (
                <GlassCard key={item.title}>
                  <div className="platform-feature-icon"><item.icon size={18} /></div>
                  <h3 style={{ margin: 0 }}>{item.title}</h3>
                  <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)" }}>{item.description}</p>
                </GlassCard>
              ))}
            </div>

            <SectionHeader eyebrow="Map" title="Field support location" />
            <GlassCard>
              <div className="platform-map-placeholder">
                <MapPin size={18} />
                <span>Interactive map placeholder for HQ and field offices</span>
              </div>
            </GlassCard>

            <SectionHeader eyebrow="FAQ" title="Support answers" />
            <div className="platform-section-grid">
              {page.faq.map((item) => (
                <GlassCard key={item.question}>
                  <h3 style={{ margin: 0 }}>{item.question}</h3>
                  <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)" }}>{item.answer}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {!isLoading && page.variant === "directory" ? (
        <section className="platform-section">
          <SectionHeader eyebrow="Directory" title="Verified NGOs and search filters" summary="Organized cards, verification tags, and simple discovery flows." />
          <div className="platform-section-grid platform-grid-2">
            <GlassCard>
              <div className="platform-form-grid">
                <input className="platform-input" placeholder="Search NGOs, focus areas, or locations" />
                <div className="platform-pill-row">
                  <span className="platform-chip">Healthcare</span>
                  <span className="platform-chip">Education</span>
                  <span className="platform-chip">Climate</span>
                  <span className="platform-chip">Disaster Relief</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="platform-chip">Verification</div>
              <p style={{ marginTop: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>
                Verified organizations can be filtered and surfaced with the same badge treatment across the product.
              </p>
            </GlassCard>
          </div>

          <div className="platform-section-grid platform-grid-2" style={{ marginTop: 20 }}>
            {page.sections.map((item) => (
              <GlassCard key={item.title}>
                <div className="platform-chip">{item.chip}</div>
                <h3 style={{ marginTop: 14 }}>{item.title}</h3>
                <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)" }}>{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      ) : null}
    </PublicFrame>
  );
}

function AuthPage({ page, isLoading, notify }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    login,
    signupNgo,
    signupStaff,
    signupVolunteer,
    forgotPassword,
    resetPassword,
    validateResetToken,
    isAuthenticated,
    isLoading: isAuthLoading,
    role,
    getDashboardPath,
  } = useAuth();
  const [selectedLoginRole, setSelectedLoginRole] = useState("NGO");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [ngoSignupForm, setNgoSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    description: "",
  });
  const [volunteerSignupForm, setVolunteerSignupForm] = useState({
    name: "",
    email: "",
    ngo_id: "",
    contact_number: "",
    location: "",
    password: "",
    skill: "Food shortage",
  });
  const [staffSignupForm, setStaffSignupForm] = useState({
    name: "",
    email: "",
    ngo_id: "",
    designation: "Staff",
    contact_number: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetForm, setResetForm] = useState({
    token: "",
    new_password: "",
    confirm_password: "",
  });
  const [isResetTokenVerified, setIsResetTokenVerified] = useState(false);

  const loginRouteMap = {
    NGO: "/ngo/dashboard",
    Volunteer: "/volunteer/dashboard",
    Admin: "/admin/dashboard",
  };

  useEffect(() => {
    if (page.variant !== "login") {
      return;
    }

    setSelectedLoginRole("NGO");
    setRoleId("");
  }, [page.variant]);

  useEffect(() => {
    if (page.variant !== "login") {
      return;
    }

    if (isAuthenticated && role) {
      navigate(getDashboardPath(role), { replace: true });
    }
  }, [page.variant, isAuthenticated, role, getDashboardPath, navigate]);

  useEffect(() => {
    if (page.variant !== "forgot") {
      return;
    }

    const tokenFromQuery = searchParams.get("token") || "";
    if (!tokenFromQuery) {
      setIsResetTokenVerified(false);
      return;
    }

    let isCancelled = false;

    const verifyToken = async () => {
      const validation = await validateResetToken(tokenFromQuery);
      if (isCancelled) {
        return;
      }

      if (validation.ok) {
        setResetForm((current) => ({ ...current, token: tokenFromQuery }));
        setIsResetTokenVerified(true);
        return;
      }

      setIsResetTokenVerified(false);
      notify("Reset Link", validation.error || "This reset link is invalid or expired.", "warning");
    };

    verifyToken();

    return () => {
      isCancelled = true;
    };
  }, [page.variant, searchParams, notify, validateResetToken]);

  const handleLogin = async () => {
    const result = await login({
      role: selectedLoginRole,
      email,
      password,
      roleId,
      remember: rememberMe,
    });

    if (!result.ok) {
      notify("Login Failed", result.error || result.message, "warning");
      return;
    }

    const requestedPath = location.state?.from;
    const roleHome = loginRouteMap[selectedLoginRole] || "/ngo/dashboard";
    const destination = requestedPath || result.redirectTo || roleHome;

    notify("Authenticated", `${selectedLoginRole} login successful.`, "success");
    navigate(destination, { replace: true });
  };

  const handleNgoSignup = async () => {
    const result = await signupNgo({
      name: ngoSignupForm.name,
      email: ngoSignupForm.email,
      password: ngoSignupForm.password,
      address: ngoSignupForm.address,
      description: ngoSignupForm.description,
    });

    if (!result.ok) {
      notify("Signup Failed", result.error, "warning");
      return;
    }

    const loginResult = await login({
      role: "NGO",
      email: ngoSignupForm.email,
      password: ngoSignupForm.password,
      remember: true,
    });

    if (!loginResult.ok) {
      notify("Signup Complete", result.data?.message || "NGO account created. Please login.", "success");
      navigate("/login", { replace: true });
      return;
    }

    notify("Signup Complete", result.data?.message || "NGO account created successfully.", "success");
    navigate(loginResult.redirectTo || "/ngo/dashboard", { replace: true });
  };

  const handleVolunteerSignup = async () => {
    const result = await signupVolunteer({
      name: volunteerSignupForm.name,
      email: volunteerSignupForm.email,
      password: volunteerSignupForm.password,
      ngo_id: volunteerSignupForm.ngo_id,
      skill: volunteerSignupForm.skill,
      contact_number: volunteerSignupForm.contact_number,
      location: volunteerSignupForm.location,
    });

    if (!result.ok) {
      notify("Signup Failed", result.error, "warning");
      return;
    }

    const loginResult = await login({
      role: "Volunteer",
      email: volunteerSignupForm.email,
      password: volunteerSignupForm.password,
      roleId: result.data?.user_id || result.data?.volunteer_id || "",
      remember: true,
    });

    if (!loginResult.ok) {
      notify("Signup Complete", result.data?.message || "Volunteer account created. Please login.", "success");
      navigate("/login", { replace: true });
      return;
    }

    notify("Signup Complete", result.data?.message || "Volunteer account created successfully.", "success");
    navigate(loginResult.redirectTo || "/volunteer/dashboard", { replace: true });
  };

  const handleStaffSignup = async () => {
    const result = await signupStaff({
      name: staffSignupForm.name,
      email: staffSignupForm.email,
      password: staffSignupForm.password,
      ngo_id: staffSignupForm.ngo_id,
      designation: staffSignupForm.designation,
      contact_number: staffSignupForm.contact_number,
    });

    if (!result.ok) {
      notify("Signup Failed", result.error, "warning");
      return;
    }

    const loginResult = await login({
      role: "Admin",
      email: staffSignupForm.email,
      password: staffSignupForm.password,
      roleId: result.data?.user_id || result.data?.staff_id || "",
      remember: true,
    });

    if (!loginResult.ok) {
      notify("Signup Complete", result.data?.message || "Staff account created. Please login.", "success");
      navigate("/login", { replace: true });
      return;
    }

    notify("Signup Complete", result.data?.message || "Staff account created successfully.", "success");
    navigate(loginResult.redirectTo || "/admin/dashboard", { replace: true });
  };

  const handleForgotPassword = async () => {
    const result = await forgotPassword(forgotEmail);

    if (!result.ok) {
      notify("Request Failed", result.error, "warning");
      return;
    }

    notify("Check Email", result.data?.message || "Password reset link sent.", "success");
  };

  const handleResetPassword = async () => {
    const result = await resetPassword(resetForm);

    if (!result.ok) {
      notify("Reset Failed", result.error, "warning");
      return;
    }

    notify("Password Updated", result.data?.message || "Your password was updated.", "success");
    navigate("/login", { replace: true });
  };

  return (
    <PublicFrame page={page}>
      <section className="platform-hero centered" style={{ minHeight: "auto" }}>
        <div className="platform-eyebrow">Authentication</div>
        <h1 className="platform-title">{page.title}</h1>
        <p className="platform-summary">{page.summary}</p>
      </section>

      {isLoading ? <SkeletonBlocks count={2} height={220} /> : null}

      {!isLoading ? (
        <div className="platform-auth-shell">
          <GlassCard className="platform-auth-card">
            {page.variant === "role" ? (
              <>
                <SectionHeader eyebrow="Role Selection" title="Choose your role" />
                <div className="platform-grid-2 platform-section-grid">
                  {page.roleCards.map((card) => (
                    <GlassCard key={card.title}>
                      <div className="platform-feature-icon"><ChevronRight size={18} /></div>
                      <h3 style={{ marginTop: 0 }}>{card.title}</h3>
                      <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>{card.description}</p>
                      <Link className="platform-btn" to={card.href} style={{ display: "inline-flex", marginTop: 14, textDecoration: "none" }}>
                        Continue
                      </Link>
                    </GlassCard>
                  ))}
                </div>
              </>
            ) : null}

            {page.variant === "login" ? (
              <>
                <SectionHeader eyebrow="Login" title="Role-based access" />
                <div className="platform-tab-list">
                  {page.tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`platform-tab ${selectedLoginRole === tab ? "active" : ""}`}
                      type="button"
                      onClick={() => setSelectedLoginRole(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="platform-form-grid" style={{ marginTop: 18 }}>
                  <input
                    className="platform-input"
                    placeholder={selectedLoginRole === "NGO" ? "Email or NGO User ID" : "Email address"}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    className="platform-input"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {selectedLoginRole !== "NGO" ? (
                    <input
                      className="platform-input"
                      placeholder={selectedLoginRole === "Admin" ? "Role ID (required for Admin)" : "Role ID (optional for NGO-linked volunteers)"}
                      value={roleId}
                      onChange={(event) => setRoleId(event.target.value)}
                    />
                  ) : null}
                  <label style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.76)", fontSize: 14 }}>
                    <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                    Remember me
                  </label>
                  <button
                    className="platform-btn"
                    type="button"
                    onClick={handleLogin}
                    disabled={isAuthLoading}
                  >
                    {isAuthLoading ? "Authenticating..." : "Login"}
                  </button>
                  <Link to="/forgot-password" style={{ color: "#a5b4fc", fontSize: 14, textDecoration: "none" }}>Forgot password?</Link>
                </div>
              </>
            ) : null}

            {page.variant === "forgot" ? (
              <div className="platform-form-grid">
                <SectionHeader eyebrow="Recovery" title="Email reset and set a new password" />
                <input
                  className="platform-input"
                  placeholder="Email address"
                  value={forgotEmail}
                  onChange={(event) => setForgotEmail(event.target.value)}
                />
                <button
                  className="platform-btn"
                  type="button"
                  onClick={handleForgotPassword}
                >
                  Send Reset Link
                </button>
                <input
                  className="platform-input"
                  placeholder="Reset token"
                  value={resetForm.token}
                  onChange={(event) => setResetForm((current) => ({ ...current, token: event.target.value }))}
                />
                <input
                  className="platform-input"
                  placeholder="New password"
                  type="password"
                  value={resetForm.new_password}
                  onChange={(event) => setResetForm((current) => ({ ...current, new_password: event.target.value }))}
                />
                <input
                  className="platform-input"
                  placeholder="Confirm new password"
                  type="password"
                  value={resetForm.confirm_password}
                  onChange={(event) => setResetForm((current) => ({ ...current, confirm_password: event.target.value }))}
                />
                <button
                  className="platform-btn"
                  type="button"
                  disabled={Boolean(searchParams.get("token")) && !isResetTokenVerified}
                  onClick={handleResetPassword}
                >
                  Reset Password
                </button>
              </div>
            ) : null}

            {page.variant === "signupNgo" || page.variant === "signupVolunteer" || page.variant === "signupStaff" ? (
              <div className="platform-form-grid">
                <SectionHeader eyebrow="Signup" title={page.title} />
                <div className="platform-tab-list">
                  {page.checklist.map((step, index) => (
                    <button key={step} className={`platform-tab ${index === 0 ? "active" : ""}`} type="button">
                      {step}
                    </button>
                  ))}
                </div>
                {page.variant === "signupNgo" ? (
                  <>
                    <input
                      className="platform-input"
                      placeholder="Organization name"
                      value={ngoSignupForm.name}
                      onChange={(event) => setNgoSignupForm((current) => ({ ...current, name: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Primary email"
                      value={ngoSignupForm.email}
                      onChange={(event) => setNgoSignupForm((current) => ({ ...current, email: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Address"
                      value={ngoSignupForm.address}
                      onChange={(event) => setNgoSignupForm((current) => ({ ...current, address: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Description"
                      value={ngoSignupForm.description}
                      onChange={(event) => setNgoSignupForm((current) => ({ ...current, description: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Password"
                      type="password"
                      value={ngoSignupForm.password}
                      onChange={(event) => setNgoSignupForm((current) => ({ ...current, password: event.target.value }))}
                    />
                    <button className="platform-btn" type="button" onClick={handleNgoSignup}>
                      Create NGO Account
                    </button>
                  </>
                ) : page.variant === "signupVolunteer" ? (
                  <>
                    <input
                      className="platform-input"
                      placeholder="Full name"
                      value={volunteerSignupForm.name}
                      onChange={(event) => setVolunteerSignupForm((current) => ({ ...current, name: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Email"
                      value={volunteerSignupForm.email}
                      onChange={(event) => setVolunteerSignupForm((current) => ({ ...current, email: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="NGO ID"
                      value={volunteerSignupForm.ngo_id}
                      onChange={(event) => setVolunteerSignupForm((current) => ({ ...current, ngo_id: event.target.value }))}
                    />
                    <select
                      className="platform-input"
                      value={volunteerSignupForm.skill}
                      onChange={(event) => setVolunteerSignupForm((current) => ({ ...current, skill: event.target.value }))}
                    >
                      <option value="Food shortage">Food shortage</option>
                      <option value="Medical help">Medical help</option>
                      <option value="Shelter">Shelter</option>
                      <option value="Education">Education</option>
                      <option value="Disaster relief">Disaster relief</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      className="platform-input"
                      placeholder="Contact number"
                      value={volunteerSignupForm.contact_number}
                      onChange={(event) => setVolunteerSignupForm((current) => ({ ...current, contact_number: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Location"
                      value={volunteerSignupForm.location}
                      onChange={(event) => setVolunteerSignupForm((current) => ({ ...current, location: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Password"
                      type="password"
                      value={volunteerSignupForm.password}
                      onChange={(event) => setVolunteerSignupForm((current) => ({ ...current, password: event.target.value }))}
                    />
                    <button className="platform-btn" type="button" onClick={handleVolunteerSignup}>
                      Create Volunteer Account
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      className="platform-input"
                      placeholder="Full name"
                      value={staffSignupForm.name}
                      onChange={(event) => setStaffSignupForm((current) => ({ ...current, name: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Email"
                      value={staffSignupForm.email}
                      onChange={(event) => setStaffSignupForm((current) => ({ ...current, email: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="NGO ID"
                      value={staffSignupForm.ngo_id}
                      onChange={(event) => setStaffSignupForm((current) => ({ ...current, ngo_id: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Designation"
                      value={staffSignupForm.designation}
                      onChange={(event) => setStaffSignupForm((current) => ({ ...current, designation: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Contact number"
                      value={staffSignupForm.contact_number}
                      onChange={(event) => setStaffSignupForm((current) => ({ ...current, contact_number: event.target.value }))}
                    />
                    <input
                      className="platform-input"
                      placeholder="Password"
                      type="password"
                      value={staffSignupForm.password}
                      onChange={(event) => setStaffSignupForm((current) => ({ ...current, password: event.target.value }))}
                    />
                    <button className="platform-btn" type="button" onClick={handleStaffSignup}>
                      Create Staff Account
                    </button>
                  </>
                )}
              </div>
            ) : null}
          </GlassCard>

          <GlassCard className="platform-auth-preview">
            <div className="platform-chip">Why this flow works</div>
            <div className="platform-section-grid">
              <div style={panelPillStyle}><ShieldCheck size={16} /> Secure role access</div>
              <div style={panelPillStyle}><Clock3 size={16} /> Fast onboarding</div>
              <div style={panelPillStyle}><Sparkles size={16} /> Unified platform language</div>
            </div>
          </GlassCard>
        </div>
      ) : null}
    </PublicFrame>
  );
}

function PanelPage({ page, isLoading, notify, openActionModal }) {
  const hasPrimaryContent = useMemo(
    () => Boolean(
      page.metrics
      || page.chartData
      || page.highlights
      || page.table
      || page.board
      || page.timeline
      || page.settingsTabs
      || page.profile
      || page.eventCards
      || page.approvalCards
      || page.featureCards
      || page.activityFeed,
    ),
    [page],
  );

  return (
    <PanelFrame page={page}>
      <section className="platform-hero" style={{ minHeight: "auto", paddingTop: 0 }}>
        <div className="platform-eyebrow">{page.role}</div>
        <h1 className="platform-title">{page.title}</h1>
        <p className="platform-summary">{page.summary}</p>
        <div className="platform-actions">
          <button className="platform-btn" type="button" onClick={openActionModal}>Create Entry</button>
          <button
            className="platform-btn ghost"
            type="button"
            onClick={() => notify("Quick update", "Notification center and toasts are active.", "info")}
          >
            Trigger Toast
          </button>
        </div>
      </section>

      {isLoading ? <SkeletonBlocks count={4} height={160} /> : null}

      {!isLoading && page.metrics ? (
        <section className="platform-section">
          <div className="platform-metric-grid">
            {page.metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </section>
      ) : null}

      {!isLoading && page.chartData ? (
        <section className="platform-section">
          <MiniChartCard title="Activity trend" summary="A compact trend chart that keeps the dashboard language consistent across panels." data={page.chartData} />
        </section>
      ) : null}

      {!isLoading && page.highlights ? (
        <section className="platform-section platform-grid-3 platform-section-grid">
          {page.highlights.map((item) => (
            <GlassCard key={item.title}>
              <div className="platform-chip">Overview</div>
              <h3 style={{ marginTop: 14 }}>{item.title}</h3>
              <p style={{ marginTop: 8, fontSize: 34, fontWeight: 800 }}>{item.value}</p>
            </GlassCard>
          ))}
        </section>
      ) : null}

      {!isLoading && page.table ? (
        <section className="platform-section">
          <SectionHeader eyebrow="Records" title="Operational table" />
          <SimpleTable columns={page.table.columns} rows={page.table.rows} />
        </section>
      ) : null}

      {!isLoading && page.board ? (
        <section className="platform-section platform-grid-3 platform-section-grid">
          {page.board.map((column) => (
            <GlassCard key={column.title}>
              <div className="platform-chip">{column.title}</div>
              <ul className="platform-list" style={{ marginTop: 16 }}>
                {column.items.map((item) => (
                  <li key={typeof item === "string" ? item : item.name}>
                    {typeof item === "string" ? (
                      item
                    ) : (
                      <div className="platform-board-item">
                        <strong>{item.name}</strong>
                        <span>{item.assignee} • {item.due}</span>
                        <small>{item.attachments} attachments</small>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </section>
      ) : null}

      {!isLoading && page.eventCards ? (
        <section className="platform-section platform-grid-3 platform-section-grid">
          {page.eventCards.map((eventCard) => (
            <GlassCard key={eventCard.title}>
              <div className="platform-chip"><CalendarDays size={14} /> {eventCard.date}</div>
              <h3 style={{ marginTop: 14 }}>{eventCard.title}</h3>
              <p style={{ marginTop: 8, color: "rgba(255,255,255,0.68)" }}>{eventCard.rsvp}</p>
              <p style={{ marginTop: 6, color: "rgba(255,255,255,0.6)" }}>{eventCard.location}</p>
            </GlassCard>
          ))}
        </section>
      ) : null}

      {!isLoading && page.profile ? (
        <section className="platform-section platform-grid-2 platform-section-grid">
          <GlassCard>
            <div className="platform-chip">Volunteer Profile</div>
            <h3 style={{ marginTop: 14 }}>{page.profile.name}</h3>
            <p style={{ marginTop: 8, color: "rgba(255,255,255,0.68)" }}>{page.profile.role}</p>
            <p style={{ marginTop: 12, color: "rgba(255,255,255,0.64)", lineHeight: 1.8 }}>{page.profile.bio}</p>
            <button className="platform-btn" type="button" style={{ marginTop: 14 }} onClick={openActionModal}>Edit Profile</button>
          </GlassCard>
          <GlassCard>
            <div className="platform-chip">Skills & Certificates</div>
            <div className="platform-pill-row" style={{ marginTop: 14 }}>
              {page.profile.skills.map((skill) => (
                <span className="platform-chip" key={skill}>{skill}</span>
              ))}
            </div>
            <ul className="platform-list" style={{ marginTop: 16 }}>
              {page.profile.certificates.map((certificate) => (
                <li key={certificate}>{certificate}</li>
              ))}
            </ul>
            <div className="platform-pill-row" style={{ marginTop: 14 }}>
              {page.profile.socials.map((social) => (
                <span className="platform-chip" key={social}>{social}</span>
              ))}
            </div>
          </GlassCard>
        </section>
      ) : null}

      {!isLoading && page.approvalCards ? (
        <section className="platform-section platform-grid-2 platform-section-grid">
          {page.approvalCards.map((card) => (
            <GlassCard key={card.title}>
              <div className="platform-chip">Document Preview</div>
              <h3 style={{ marginTop: 14 }}>{card.title}</h3>
              <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>{card.description}</p>
              <div className="platform-actions" style={{ marginTop: 14 }}>
                <button className="platform-btn" type="button" onClick={() => notify("Action complete", `${card.title}: ${card.action}`, "success")}>{card.action}</button>
                <button className="platform-btn ghost" type="button" onClick={openActionModal}>Open File</button>
              </div>
            </GlassCard>
          ))}
        </section>
      ) : null}

      {!isLoading && page.featureCards ? (
        <section className="platform-section platform-grid-3 platform-section-grid">
          {page.featureCards.map((feature) => (
            <GlassCard key={feature.title}>
              <div className="platform-chip">System Module</div>
              <h3 style={{ marginTop: 14 }}>{feature.title}</h3>
              <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>{feature.description}</p>
            </GlassCard>
          ))}
        </section>
      ) : null}

      {!isLoading && page.activityFeed ? (
        <section className="platform-section">
          <SectionHeader eyebrow="Activity Feed" title="Latest platform updates" />
          <div className="platform-section-grid">
            {page.activityFeed.map((activity) => (
              <GlassCard key={activity.title}>
                <h3 style={{ margin: 0 }}>{activity.title}</h3>
                <p style={{ marginTop: 10, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>{activity.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      ) : null}

      {!isLoading && page.timeline ? (
        <section className="platform-section">
          <SectionHeader eyebrow="Timeline" title="Progress and reminders" />
          <TimelineList items={page.timeline} />
        </section>
      ) : null}

      {!isLoading && page.settingsTabs ? (
        <section className="platform-section">
          <SectionHeader eyebrow="Settings" title="Tabbed system controls" />
          <div className="platform-tab-list">
            {page.settingsTabs.map((tab, index) => (
              <button key={tab} className={`platform-tab ${index === 0 ? "active" : ""}`} type="button">{tab}</button>
            ))}
          </div>
          <div className="platform-grid-2 platform-section-grid" style={{ marginTop: 18 }}>
            <GlassCard>
              <div className="platform-form-grid">
                <input className="platform-input" placeholder="Display name" />
                <input className="platform-input" placeholder="Support email" />
                <button className="platform-btn" type="button" onClick={() => notify("Saved", "Settings updated successfully.", "success")}>Save changes</button>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="platform-chip">Theme</div>
              <p style={{ marginTop: 12, color: "rgba(255,255,255,0.68)", lineHeight: 1.8 }}>
                Appearance controls can be extended later without changing the existing shell.
              </p>
            </GlassCard>
          </div>
        </section>
      ) : null}

      {!isLoading && !hasPrimaryContent ? (
        <section className="platform-section">
          <EmptyState
            title="No records available yet"
            summary="This page has the full layout scaffold ready. Start by creating your first item to populate this section."
            actionLabel="Create First Item"
            onAction={openActionModal}
          />
        </section>
      ) : null}
    </PanelFrame>
  );
}

function ChatPage({ page, isLoading, notify }) {
  return (
    <PanelFrame page={page}>
      <section className="platform-hero" style={{ minHeight: "auto", paddingTop: 0 }}>
        <div className="platform-eyebrow">{page.role}</div>
        <h1 className="platform-title">{page.title}</h1>
        <p className="platform-summary">{page.summary}</p>
      </section>

      {isLoading ? <SkeletonBlocks count={3} height={200} /> : null}

      {!isLoading ? (
        <div className="platform-chat-shell">
          <GlassCard className="platform-chat-list">
            <SectionHeader eyebrow="Chats" title="Active threads" />
            <div className="platform-chat-item active">
              <img className="platform-avatar" src="https://i.pravatar.cc/100?img=5" alt="thread avatar" />
              <div>
                <div style={{ fontWeight: 700 }}>Field Coordinators</div>
                <div style={{ color: "rgba(255,255,255,0.58)", fontSize: 13 }}>3 new updates</div>
              </div>
            </div>
            <div className="platform-chat-item">
              <img className="platform-avatar" src="https://i.pravatar.cc/100?img=9" alt="thread avatar" />
              <div>
                <div style={{ fontWeight: 700 }}>Volunteer Dispatch</div>
                <div style={{ color: "rgba(255,255,255,0.58)", fontSize: 13 }}>typing...</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="platform-chat-thread">
            <SectionHeader eyebrow="Conversation" title="Mission Operations" />
            <div className="platform-section-grid" style={{ gap: 12 }}>
              <div className="platform-message">We need the final volunteer list before 6 PM.</div>
              <div className="platform-message me">Confirmed. Uploading the roster and file preview now.</div>
              <div className="platform-message">Great, I will pin the reminder and notify the event team.</div>
            </div>
            <div className="platform-form-grid" style={{ marginTop: 18 }}>
              <input className="platform-input" placeholder="Type a message" />
              <button
                className="platform-btn"
                type="button"
                onClick={() => notify("Message sent", "Conversation updated in real-time layout.", "success")}
              >
                Send Message
              </button>
            </div>
          </GlassCard>

          <GlassCard className="platform-chat-info">
            <SectionHeader eyebrow="Thread Info" title="Shared assets" />
            <div className="platform-chip">Voice message placeholder</div>
            <div className="platform-chip">File preview cards</div>
            <div className="platform-chip">Emoji picker placeholder</div>
            <div className="platform-chip"><CalendarDays size={14} /> Typing indicators active</div>
          </GlassCard>
        </div>
      ) : null}
    </PanelFrame>
  );
}
