import { Link } from "react-router-dom";
import { Home, Briefcase, User } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Briefcase, label: "Services", href: "/services" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="bg-[#E95901] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Animals.Id
          </Link>
          <div className="flex space-x-4">
            {navItems.map(({ icon: Icon, label, href }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[#FFD377] hover:text-[#E95900] transition-colors",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;