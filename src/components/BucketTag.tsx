import { cn } from "@/lib/utils";

interface BucketTagProps {
  name: string;
  className?: string;
}

const BucketTag = ({ name, className }: BucketTagProps) => (
  <span className={cn("inline-flex items-center rounded-pill bg-primary-light px-2.5 py-0.5 text-xs font-medium text-accent-foreground", className)}>
    {name}
  </span>
);

export default BucketTag;
