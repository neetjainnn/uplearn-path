import { Link } from "react-router-dom";
import type { Bucket } from "@/data/data";

const BucketCard = ({ bucket }: { bucket: Bucket }) => (
  <div className="group rounded-lg bg-card p-6 shadow-card border border-border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30">
    <div className="text-3xl mb-3">{bucket.emoji}</div>
    <h3 className="text-lg font-semibold text-foreground mb-1">{bucket.name}</h3>
    <p className="text-sm text-body-text mb-4">{bucket.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="rounded-pill bg-primary-light px-2.5 py-0.5 text-xs font-medium text-accent-foreground">{bucket.level}</span>
      <span className="rounded-pill bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{bucket.hours} hrs</span>
      <span className="rounded-pill bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{bucket.courses} courses</span>
    </div>
    <div className="flex items-center justify-between">
      <div>
        <span className="text-lg font-bold text-foreground">₹{bucket.price.toLocaleString("en-IN")}</span>
        <span className="text-xs text-muted-foreground ml-2">or buy individually</span>
      </div>
      <Link to={`/buckets/${bucket.id}`} className="text-sm font-medium text-primary hover:text-primary-deep transition-colors">
        Explore Path →
      </Link>
    </div>
  </div>
);

export default BucketCard;
