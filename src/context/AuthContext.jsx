import React, { useMemo, useState } from "react";
import { AuthContext } from "./authContextInstance";

const AUTH_STORAGE_KEY = "hopemesh.auth";

const DEMO_CREDENTIALS = {
  NGO: { email: "ngo@test.com", password: "123456" },
  Volunteer: { email: "volunteer@test.com", password: "123456" },
  Admin: { email: "admin@test.com", password: "123456" },
};

const DASHBOARD_BY_ROLE = {
  NGO: "/ngo/dashboard",
  Volunteer: "/volunteer/dashboard",
  Admin: "/admin/dashboard",
};

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (!parsed?.token || !parsed?.role) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => readStoredAuth());

  const login = ({ role, email, password, remember }) => {
    const valid = DEMO_CREDENTIALS[role];

    if (!valid) {
      return { ok: false, message: "Unknown role selected." };
    }

    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "").trim();

    if (normalizedEmail !== valid.email || normalizedPassword !== valid.password) {
      return {
        ok: false,
        message: `Use demo credentials for ${role}: ${valid.email} / ${valid.password}`,
      };
    }

    const nextAuth = {
      token: `demo-token-${role.toLowerCase()}`,
      role,
      email: valid.email,
      remember: Boolean(remember),
      loggedAt: Date.now(),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
    setAuth(nextAuth);

    return { ok: true, auth: nextAuth, redirectTo: DASHBOARD_BY_ROLE[role] };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuth(null);
  };

  const value = useMemo(() => {
    return {
      auth,
      isAuthenticated: Boolean(auth?.token),
      role: auth?.role || null,
      email: auth?.email || null,
      login,
      logout,
      demoCredentials: DEMO_CREDENTIALS,
      getDashboardPath: (role) => DASHBOARD_BY_ROLE[role] || "/",
    };
  }, [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}