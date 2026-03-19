import { Link } from "react-router-dom";
import type { Problem } from "@/data/data";
import DifficultyBadge from "./DifficultyBadge";
import BucketTag from "./BucketTag";
import { CheckCircle2, Circle, MinusCircle } from "lucide-react";

const statusIcons = {
  solved: <CheckCircle2 className="h-4 w-4 text-success" />,
  attempted: <MinusCircle className="h-4 w-4 text-warning" />,
  unsolved: <Circle className="h-4 w-4 text-muted-foreground" />,
};

const ProblemRow = ({ problem, status }: { problem: Problem; status: "solved" | "attempted" | "unsolved" }) => (
  <Link to={`/problems/${problem.id}`} className="group">
    <div className="grid grid-cols-[32px_40px_1fr_auto_100px_80px] items-center gap-3 px-4 py-3 rounded-button hover:bg-primary-light/60 transition-colors cursor-pointer border-b border-border last:border-0">
      <div>{statusIcons[status]}</div>
      <span className="text-sm text-muted-foreground">{problem.id}</span>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{problem.title}</span>
      <BucketTag name={problem.bucket} />
      <DifficultyBadge difficulty={problem.difficulty} />
      <span className="text-sm text-muted-foreground text-right">{problem.acceptance}%</span>
    </div>
  </Link>
);

export default ProblemRow;
