import { Link } from "react-router-dom";
import type { Contest } from "@/data/data";
import { Users, Calendar } from "lucide-react";
import { Button } from "./ui/button";

const ContestCard = ({ contest }: { contest: Contest }) => (
  <div className="rounded-lg bg-card p-6 shadow-card border border-border">
    <div className="flex items-center gap-2 mb-3">
      <span className={`rounded-pill px-2.5 py-0.5 text-xs font-semibold ${contest.status === "upcoming" ? "bg-primary/10 text-primary" : contest.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
        {contest.status === "upcoming" ? "Upcoming" : contest.status === "active" ? "Live" : "Ended"}
      </span>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-1">{contest.title}</h3>
    <p className="text-sm text-body-text mb-4">{contest.description}</p>
    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{contest.date}</span>
      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{contest.participants.toLocaleString()}</span>
    </div>
    {contest.leaderboard && (
      <div className="mb-4 rounded-button bg-muted/50 p-3">
        {contest.leaderboard.map((e) => (
          <div key={e.rank} className="flex items-center justify-between py-1 text-sm">
            <span className="font-medium text-foreground">#{e.rank} {e.username}</span>
            <span className="text-success font-medium">{e.pnl}</span>
          </div>
        ))}
      </div>
    )}
    <Button variant={contest.status === "upcoming" ? "default" : "outline"} className="w-full rounded-button">
      {contest.status === "upcoming" ? "Register Free" : "View Results"}
    </Button>
  </div>
);

export default ContestCard;
