import { cn } from "@/lib/utils";

interface DifficultyBadgeProps {
  difficulty: "Easy" | "Medium" | "Hard";
  className?: string;
}

const DifficultyBadge = ({ difficulty, className }: DifficultyBadgeProps) => {
  const colors = {
    Easy: "bg-easy/10 text-easy",
    Medium: "bg-medium/10 text-medium",
    Hard: "bg-hard/10 text-hard",
  };

  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 text-xs font-medium", colors[difficulty], className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-easy": difficulty === "Easy",
        "bg-medium": difficulty === "Medium",
        "bg-hard": difficulty === "Hard",
      })} />
      {difficulty}
    </span>
  );
};

export default DifficultyBadge;
