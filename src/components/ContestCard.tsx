import { useState, useEffect } from "react";
import type { Contest } from "@/data/data";
import { useAppContext } from "@/context/AppContext";
import { Users, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Props {
  contest: Contest;
  onEnterContest?: (contestId: string) => void;
}

const ContestCard = ({ contest, onEnterContest }: Props) => {
  const { state, dispatch } = useAppContext();
  const isRegistered = state.contests.registeredIds.includes(contest.id);
  const hasResult = !!state.contests.results[contest.id];

  // Countdown for upcoming contests
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (contest.status !== "upcoming") return;
    // Simulate a future date (3 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(10, 0, 0, 0);

    const update = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) { setCountdown("Starting soon..."); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${d}d ${h}h ${m}m ${s}s`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [contest.status]);

  const handleRegister = () => {
    dispatch({ type: "REGISTER_CONTEST", payload: contest.id });
    toast.success("Contest registration confirmed!");
  };

  return (
    <div className="rounded-lg bg-card p-6 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-3">
        <span className={`rounded-pill px-2.5 py-0.5 text-xs font-semibold ${
          contest.status === "upcoming" ? "bg-primary/10 text-primary" :
          contest.status === "active" ? "bg-success/10 text-success" :
          "bg-muted text-muted-foreground"
        }`}>
          {contest.status === "upcoming" ? "Upcoming" : contest.status === "active" ? (
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-destructive animate-pulse" /> LIVE</span>
          ) : "Ended"}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{contest.title}</h3>
      <p className="text-sm text-body-text mb-4">{contest.description}</p>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{contest.date}</span>
        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{contest.participants.toLocaleString()}</span>
      </div>

      {contest.status === "upcoming" && countdown && (
        <div className="text-sm text-primary font-mono mb-4">Starts in {countdown}</div>
      )}

      {contest.leaderboard && (
        <div className="mb-4 rounded-button bg-muted/50 p-3">
          {contest.leaderboard.map((e) => {
            const isUser = hasResult && state.contests.results[contest.id]?.rank === e.rank;
            return (
              <div key={e.rank} className={`flex items-center justify-between py-1 text-sm ${isUser ? "bg-primary/5 rounded px-2" : ""}`}>
                <span className="font-medium text-foreground">#{e.rank} {e.username}</span>
                <span className="text-success font-medium">{e.pnl}</span>
              </div>
            );
          })}
        </div>
      )}

      {contest.status === "upcoming" ? (
        <Button
          variant={isRegistered ? "outline" : "default"}
          className={`w-full rounded-button ${isRegistered ? "border-success text-success" : ""}`}
          disabled={isRegistered}
          onClick={handleRegister}
        >
          {isRegistered ? "✓ Registered" : "Register Free"}
        </Button>
      ) : contest.status === "active" ? (
        <Button className="w-full rounded-button" onClick={() => onEnterContest?.(contest.id)}>
          Enter Contest
        </Button>
      ) : (
        <Button variant="outline" className="w-full rounded-button">
          View Results
        </Button>
      )}
    </div>
  );
};

export default ContestCard;
