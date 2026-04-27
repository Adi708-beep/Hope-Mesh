import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function SignOutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const performSignout = async () => {
      await logout();

      if (isMounted) {
        navigate("/", { replace: true });
      }
    };

    performSignout();

    return () => {
      isMounted = false;
    };
  }, [logout, navigate]);

  return (
    <div style={{ padding: 24, color: "#fff", textAlign: "center" }}>
      Signing you out...
    </div>
  );
}
