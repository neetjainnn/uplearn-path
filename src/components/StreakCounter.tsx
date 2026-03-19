import { Flame } from "lucide-react";

const StreakCounter = ({ streak }: { streak: number }) => (
  <div className="flex items-center gap-1.5">
    <Flame className="h-5 w-5 text-warning" />
    <span className="text-sm font-semibold text-foreground">{streak} day streak</span>
  </div>
);

export default StreakCounter;
