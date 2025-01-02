import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import Navbar from "./Navbar";

const Layout = () => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      // Ensure we're on the correct route after login
      if (window.location.pathname === "/login") {
        navigate("/");
      }
    }
  }, [session, navigate]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;