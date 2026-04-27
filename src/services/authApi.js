import { apiRequest } from "../lib/apiClient";

export function loginRequest(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function signupNgoRequest(payload) {
  return apiRequest("/auth/signup/ngo", {
    method: "POST",
    body: payload,
  });
}

export function signupUserRequest(payload) {
  return apiRequest("/auth/signup/user", {
    method: "POST",
    body: payload,
  });
}

export function signupVolunteerRequest(payload) {
  return apiRequest("/auth/signup/volunteer", {
    method: "POST",
    body: payload,
  });
}

export function signupStaffRequest(payload) {
  return apiRequest("/auth/signup/staff", {
    method: "POST",
    body: payload,
  });
}

export function forgotPasswordRequest(email) {
  return apiRequest("/auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

export function resetPasswordRequest(payload) {
  return apiRequest("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
}

export function validateResetTokenRequest(token) {
  const query = encodeURIComponent(String(token || "").trim());
  return apiRequest(`/auth/reset-password/validate?token=${query}`, {
    method: "GET",
  });
}

export function signoutRequest(token) {
  return apiRequest("/signout", {
    method: "POST",
    token,
  });
}
