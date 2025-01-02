import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import Navbar from "./Navbar";

const Layout = () => {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect if we're not already on login and there's no session
    if (!session && location.pathname !== "/login") {
      // Use replace to avoid building up history stack
      navigate("/login", { replace: true });
    }
  }, [session, location.pathname]);

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