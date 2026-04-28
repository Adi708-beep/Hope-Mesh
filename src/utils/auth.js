export const AUTH_STORAGE_KEY = "impactsphere_auth";

export const DASHBOARD_BY_ROLE = {
  ngo: "/ngo/dashboard",
  volunteer: "/volunteer/dashboard",
  admin: "/admin/dashboard",
};

export const normalizeRole = (role) => {
  const value = String(role || "").toLowerCase();

  if (value === "ngo") {
    return "ngo";
  }

  if (value === "volunteer") {
    return "volunteer";
  }

  if (value === "admin") {
    return "admin";
  }

  return null;
};

export const fakeDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDashboardPath = (role) => {
  const normalizedRole = normalizeRole(role);
  return normalizedRole ? DASHBOARD_BY_ROLE[normalizedRole] : "/";
};
