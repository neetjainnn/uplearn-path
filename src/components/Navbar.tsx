import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Flame } from "lucide-react";
import { Button } from "./ui/button";
import { userStats } from "@/data/data";

const navLinks = [
  { label: "Discover", path: "/" },
  { label: "Courses", path: "/buckets/stock-market-basics" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
            <Link key={l.path} to={l.path} className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.path ? "text-primary" : "text-muted-foreground"}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-button border border-border px-3 py-1.5 bg-muted/50">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input placeholder="Search..." className="bg-transparent text-sm outline-none w-32 placeholder:text-muted-foreground" />
          </div>
          {/* Streak indicator */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-button bg-warning/10 border border-warning/20">
            <Flame className="h-4 w-4 text-warning" />
            <span className="text-sm font-bold text-warning">{userStats.currentStreak}</span>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-button bg-warning/10">
            <Flame className="h-3.5 w-3.5 text-warning" />
            <span className="text-xs font-bold text-warning">{userStats.currentStreak}</span>
          </div>
          <button onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3">
          {navLinks.map((l) => (
            <Link key={l.path} to={l.path} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-primary">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
