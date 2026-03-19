import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Discover", path: "/" },
  { label: "Courses", path: "/buckets/investing-basics" },
  { label: "Problems", path: "/problems" },
  { label: "Contests", path: "/contests" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-button bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">U</div>
          <span className="text-lg font-bold text-foreground">Uplearn</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                isActive(l.path)
                  ? "text-primary after:absolute after:-bottom-[18px] after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-button border border-border px-3 py-1.5 bg-muted/50">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input placeholder="Search..." className="bg-transparent text-sm outline-none w-32 placeholder:text-muted-foreground" />
          </div>
          <Button variant="outline" size="sm" className="rounded-button border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
            <Link to="/dashboard">My Dashboard</Link>
          </Button>
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3">
          {navLinks.map((l) => (
            <Link key={l.path} to={l.path} onClick={() => setOpen(false)} className={`block text-sm font-medium ${isActive(l.path) ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
              {l.label}
            </Link>
          ))}
          <Link to="/dashboard" onClick={() => setOpen(false)} className="block text-sm font-medium text-primary">My Dashboard</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
