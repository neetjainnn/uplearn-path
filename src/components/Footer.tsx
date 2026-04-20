import { Link } from "react-router-dom";
import { buckets } from "@/data/data";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-20">
    <div className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-button bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">U</div>
            <span className="text-lg font-bold text-foreground">Uplearn</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs mb-4">India's #1 trading education platform by Upstox. Learn, Practice, Master.</p>
          <p className="text-xs text-muted-foreground">Powered by Upstox — India's Leading Stockbroker</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Learning Paths</h4>
          <div className="space-y-2">
            {buckets.map((b) => (
              <Link key={b.id} to={`/buckets/${b.id}`} className="block text-sm text-muted-foreground hover:text-primary">
                {b.emoji} {b.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
          <div className="space-y-2">
            <a href="https://upstox.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary">Upstox</a>
            <a href="https://upstox.com/uplearn/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary">Uplearn</a>
            <a href="https://upstox.com/learning-center/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-primary">Learning Center</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Upstox. All rights reserved. | upstox.com/uplearn
      </div>
    </div>
  </footer>
);

export default Footer;
