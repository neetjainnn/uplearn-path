import { useState, useMemo, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonutChart from "@/components/DonutChart";
import StreakCounter from "@/components/StreakCounter";
import HeatmapCalendar from "@/components/HeatmapCalendar";
import BadgeCelebration from "@/components/BadgeCelebration";
import { useAppContext } from "@/context/AppContext";
import { buckets, contests, problems } from "@/data/data";
import { Trophy, Hash, Target, Flame, Lock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const badgeDefinitions = [
  { name: "First Step", icon: "🎯", condition: (s: any) => s.problems.solvedIds.length >= 1 },
  { name: "7 Day Streak", icon: "🔥", condition: (s: any) => s.user.maxStreak >= 7 },
  { name: "50 Day Streak", icon: "💪", condition: (s: any) => s.user.maxStreak >= 50 },
  { name: "500 Day Streak", icon: "💎", condition: (s: any) => s.user.maxStreak >= 500 },
  { name: "Quick Learner", icon: "⚡", condition: (s: any) => s.problems.solvedIds.length >= 10 },
  { name: "Problem Solver", icon: "💯", condition: (s: any) => s.problems.solvedIds.length >= 100 },
  { name: "Contest Debut", icon: "🏆", condition: (s: any) => s.contests.registeredIds.length >= 1 },
  { name: "Top 10%", icon: "⭐", condition: (s: any) => Object.values(s.contests.results).some((r: any) => r.rank <= 20) },
  { name: "Path Complete", icon: "🎓", condition: (s: any) => s.enrollments.buckets.length >= 1 },
  { name: "Algo Master", icon: "🤖", condition: (s: any) => s.enrollments.buckets.includes("algo-trading") },
];

const DashboardPage = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [celebrateBadge, setCelebrateBadge] = useState<{ name: string; icon: string } | null>(null);
  const previousBadgesRef = useRef<string[]>([]);

  // Redirect if onboarding not completed
  useEffect(() => {
    if (!state.user.onboardingCompleted) {
      navigate("/");
    }
  }, [state.user.onboardingCompleted, navigate]);

  const earnedBadges = useMemo(() => {
    return badgeDefinitions.map((b) => ({ ...b, earned: b.condition(state) }));
  }, [state]);

  // Check for newly unlocked badges
  useEffect(() => {
    const currentEarned = earnedBadges.filter((b) => b.earned).map((b) => b.name);
    const prev = previousBadgesRef.current;
    if (prev.length > 0) {
      const newlyEarned = currentEarned.filter((n) => !prev.includes(n));
      if (newlyEarned.length > 0) {
        const badge = earnedBadges.find((b) => b.name === newlyEarned[0]);
        if (badge) setCelebrateBadge({ name: badge.name, icon: badge.icon });
      }
    }
    previousBadgesRef.current = currentEarned;
  }, [earnedBadges]);

  const statCards = [
    { label: "Trader Score", value: state.user.traderScore.toLocaleString(), icon: Trophy },
    { label: "Global Rank", value: `#${state.user.globalRank.toLocaleString()}`, icon: Hash },
    { label: "Problems Solved", value: state.problems.solvedIds.length.toLocaleString(), icon: Target },
    { label: "Current Streak", value: `${state.user.currentStreak} days`, icon: Flame },
  ];

  const enrolledBuckets = buckets.filter((b) => state.enrollments.buckets.includes(b.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BadgeCelebration badge={celebrateBadge} onClose={() => setCelebrateBadge(null)} />
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-lg bg-card shadow-card border border-border p-5">
              <s.icon className="h-5 w-5 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Score History */}
        <div className="rounded-lg bg-card shadow-card border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Trader Score History</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={state.scoreHistory}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(d) => d.slice(5)} stroke="hsl(245, 15%, 53%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(245, 15%, 53%)" />
                <RechartsTooltip contentStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="score" stroke="hsl(260, 72%, 55%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap */}
        <div className="rounded-lg bg-card shadow-card border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Activity</h2>
          <HeatmapCalendar />
        </div>

        {/* Problems Breakdown */}
        <div className="rounded-lg bg-card shadow-card border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Problems Breakdown</h2>
          <DonutChart />
        </div>

        {/* Badges */}
        <div className="rounded-lg bg-card shadow-card border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Badges ({earnedBadges.filter((b) => b.earned).length})
          </h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {earnedBadges.map((b) => (
              <div key={b.name} className={`flex flex-col items-center gap-1 p-2 rounded-button ${b.earned ? "" : "opacity-30 grayscale"}`}>
                <span className="text-2xl">{b.earned ? b.icon : "🔒"}</span>
                <span className="text-[10px] text-center text-muted-foreground leading-tight">{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolled Paths */}
        <div className="rounded-lg bg-card shadow-card border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Enrolled Paths</h2>
          {enrolledBuckets.length === 0 ? (
            <p className="text-sm text-muted-foreground">You haven't enrolled in any paths yet. <Link to="/" className="text-primary hover:underline">Browse paths →</Link></p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {enrolledBuckets.map((b) => {
                const progress = state.enrollments.progress[b.id]?.percentage || 0;
                return (
                  <div key={b.id} className="p-4 rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{b.emoji}</span>
                      <span className="text-sm font-medium text-foreground">{b.name}</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">{progress}% complete</span>
                    <Button variant="outline" size="sm" className="rounded-button mt-2" asChild>
                      <Link to={`/buckets/${b.id}`}>Continue →</Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Contest History */}
        <div className="rounded-lg bg-card shadow-card border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Contest History</h2>
          {Object.keys(state.contests.results).length === 0 ? (
            <p className="text-sm text-muted-foreground">No contest results yet. <Link to="/contests" className="text-primary hover:underline">Join a contest →</Link></p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 font-medium">Contest</th>
                    <th className="text-left py-2 font-medium">Rank</th>
                    <th className="text-left py-2 font-medium">Score</th>
                    <th className="text-left py-2 font-medium">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(state.contests.results).map(([cId, result]) => {
                    const contest = contests.find((c) => c.id === cId);
                    return (
                      <tr key={cId} className="border-b border-border last:border-0">
                        <td className="py-2.5 text-foreground font-medium">{contest?.title || cId}</td>
                        <td className="py-2.5 text-muted-foreground">#{result.rank}</td>
                        <td className="py-2.5 text-muted-foreground">{result.score}</td>
                        <td className={`py-2.5 font-medium ${result.pnl >= 0 ? "text-success" : "text-hard"}`}>{result.pnl >= 0 ? "+" : ""}{result.pnl.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
