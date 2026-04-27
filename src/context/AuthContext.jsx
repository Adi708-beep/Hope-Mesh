import React, { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./authContextInstance";
import {
  forgotPasswordRequest,
  loginRequest,
  resetPasswordRequest,
  signoutRequest,
  signupNgoRequest,
  signupStaffRequest,
  signupUserRequest,
  signupVolunteerRequest,
  validateResetTokenRequest,
} from "../services/authApi";
import { ApiError } from "../lib/apiClient";

const AUTH_STORAGE_KEY = "impactsphere_auth";

const ROLE_ALIASES = {
  NGO: "ngo",
  Volunteer: "volunteer",
  Admin: "admin",
  Staff: "admin",
  ngo: "ngo",
  volunteer: "volunteer",
  admin: "admin",
  staff: "admin",
};

const ROLE_LABELS = {
  ngo: "NGO",
  volunteer: "Volunteer",
  admin: "Admin",
};

const DEMO_CREDENTIALS = {
  NGO: { email: "", password: "" },
  Volunteer: { email: "", password: "" },
  Admin: { email: "", password: "" },
};

const DASHBOARD_BY_ROLE = {
  ngo: "/ngo/dashboard",
  volunteer: "/volunteer/dashboard",
  admin: "/admin/dashboard",
};

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    if (!parsed?.token || !parsed?.user?.role) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => readStoredAuth());
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async ({ role, email, password, remember, roleId }) => {
    setIsLoading(true);

    const normalizedRole = ROLE_ALIASES[role] || String(role || "").toLowerCase();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "").trim();
    const normalizedRoleId = String(roleId || "").trim();

    if (!normalizedEmail || !normalizedPassword) {
      setIsLoading(false);
      return {
        ok: false,
        success: false,
        error: "Email and password are required.",
      };
    }

    if (normalizedRole === "admin" && !normalizedRoleId) {
      setIsLoading(false);
      return {
        ok: false,
        success: false,
        error: "Role ID is required for admin login.",
      };
    }

    try {
      const payload = {
        email: normalizedEmail,
        password: normalizedPassword,
      };

      if (normalizedRoleId) {
        payload.role_id = normalizedRoleId;
      }

      const response = await loginRequest(payload);
      const token = String(response?.access_token || "").trim();

      if (!token) {
        setIsLoading(false);
        return {
          ok: false,
          success: false,
          error: "Login succeeded but token is missing in the response.",
        };
      }

      const safeUser = {
        email: normalizedEmail,
        role: normalizedRole,
        role_id: normalizedRoleId || null,
      };

      const nextAuth = {
        token,
        role: normalizedRole,
        email: normalizedEmail,
        user: safeUser,
        remember: Boolean(remember),
        loggedAt: Date.now(),
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
      setAuth(nextAuth);
      setIsLoading(false);

      return {
        ok: true,
        success: true,
        auth: nextAuth,
        user: safeUser,
        redirectTo: DASHBOARD_BY_ROLE[normalizedRole],
        error: null,
      };
    } catch (error) {
      setIsLoading(false);
      return {
        ok: false,
        success: false,
        error: error instanceof ApiError ? error.message : "Unable to login right now.",
      };
    }
  }, []);

  const signupNgo = useCallback(async (payload) => {
    try {
      const response = await signupNgoRequest(payload);
      return { ok: true, success: true, data: response, error: null };
    } catch (error) {
      return {
        ok: false,
        success: false,
        data: null,
        error: error instanceof ApiError ? error.message : "Unable to create NGO account.",
      };
    }
  }, []);

  const signupUser = useCallback(async (payload) => {
    try {
      const response = await signupUserRequest(payload);
      return { ok: true, success: true, data: response, error: null };
    } catch (error) {
      return {
        ok: false,
        success: false,
        data: null,
        error: error instanceof ApiError ? error.message : "Unable to create user account.",
      };
    }
  }, []);

  const signupVolunteer = useCallback(async (payload) => {
    try {
      const response = await signupVolunteerRequest(payload);
      return { ok: true, success: true, data: response, error: null };
    } catch (error) {
      return {
        ok: false,
        success: false,
        data: null,
        error: error instanceof ApiError ? error.message : "Unable to create volunteer account.",
      };
    }
  }, []);

  const signupStaff = useCallback(async (payload) => {
    try {
      const response = await signupStaffRequest(payload);
      return { ok: true, success: true, data: response, error: null };
    } catch (error) {
      return {
        ok: false,
        success: false,
        data: null,
        error: error instanceof ApiError ? error.message : "Unable to create staff account.",
      };
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    try {
      const response = await forgotPasswordRequest(email);
      return { ok: true, success: true, data: response, error: null };
    } catch (error) {
      return {
        ok: false,
        success: false,
        data: null,
        error: error instanceof ApiError ? error.message : "Unable to send reset link.",
      };
    }
  }, []);

  const resetPassword = useCallback(async (payload) => {
    try {
      const response = await resetPasswordRequest(payload);
      return { ok: true, success: true, data: response, error: null };
    } catch (error) {
      return {
        ok: false,
        success: false,
        data: null,
        error: error instanceof ApiError ? error.message : "Unable to reset password.",
      };
    }
  }, []);

  const validateResetToken = useCallback(async (token) => {
    try {
      const response = await validateResetTokenRequest(token);
      return { ok: true, success: true, data: response, error: null };
    } catch (error) {
      return {
        ok: false,
        success: false,
        data: null,
        error: error instanceof ApiError ? error.message : "Reset token is invalid.",
      };
    }
  }, []);

  const logout = useCallback(async () => {
    const currentToken = auth?.token;

    try {
      if (currentToken) {
        await signoutRequest(currentToken);
      }
    } catch {
      // Continue with client-side logout even when backend signout fails.
    } finally {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setAuth(null);
    }
  }, [auth?.token]);

  const updateProfile = useCallback((data) => {
    setAuth((previous) => {
      if (!previous?.user) {
        return previous;
      }

      const next = {
        ...previous,
        user: {
          ...previous.user,
          ...data,
        },
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(() => {
    return {
      auth,
      user: auth?.user || null,
      isAuthenticated: Boolean(auth?.token),
      isLoading,
      role: auth?.user?.role || auth?.role || null,
      email: auth?.email || null,
      login,
      signupNgo,
      signupUser,
      signupVolunteer,
      signupStaff,
      forgotPassword,
      resetPassword,
      validateResetToken,
      logout,
      updateProfile,
      demoCredentials: DEMO_CREDENTIALS,
      getDashboardPath: (role) => {
        const normalizedRole = ROLE_ALIASES[role] || String(role || "").toLowerCase();
        return DASHBOARD_BY_ROLE[normalizedRole] || "/";
      },
      getRoleLabel: (role) => {
        const normalizedRole = ROLE_ALIASES[role] || String(role || "").toLowerCase();
        return ROLE_LABELS[normalizedRole] || "User";
      },
    };
  }, [
    auth,
    isLoading,
    login,
    signupNgo,
    signupUser,
    signupVolunteer,
    signupStaff,
    forgotPassword,
    resetPassword,
    validateResetToken,
    logout,
    updateProfile,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}