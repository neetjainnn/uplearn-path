import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-20">
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-button bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">U</div>
            <span className="text-lg font-bold text-foreground">Uplearn</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">India's #1 trading education platform by Upstox. Learn, Practice, Master.</p>
        </div>
        <div className="flex gap-12">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Platform</h4>
            <div className="space-y-2">
              <Link to="/problems" className="block text-sm text-muted-foreground hover:text-primary">Problems</Link>
              <Link to="/contests" className="block text-sm text-muted-foreground hover:text-primary">Contests</Link>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-primary">Dashboard</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
            <div className="space-y-2">
              <a href="https://upstox.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary">Upstox</a>
              <span className="block text-sm text-muted-foreground">About</span>
              <span className="block text-sm text-muted-foreground">Blog</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Upstox. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
