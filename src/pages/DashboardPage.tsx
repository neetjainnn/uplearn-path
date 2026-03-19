import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonutChart from "@/components/DonutChart";
import StreakCounter from "@/components/StreakCounter";
import HeatmapCalendar from "@/components/HeatmapCalendar";
import { userStats, badges, buckets, contests } from "@/data/data";
import { Trophy, Hash, Target, Flame } from "lucide-react";

const statCards = [
  { label: "Trader Score", value: userStats.traderScore.toLocaleString(), icon: Trophy },
  { label: "Global Rank", value: `#${userStats.globalRank.toLocaleString()}`, icon: Hash },
  { label: "Problems Solved", value: userStats.problemsSolved.toLocaleString(), icon: Target },
  { label: "Current Streak", value: `${userStats.currentStreak} days`, icon: Flame },
];

const DashboardPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
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
        <h2 className="text-lg font-semibold text-foreground mb-4">Badges ({userStats.badges})</h2>
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
          {badges.map((b) => (
            <div key={b.name} className={`flex flex-col items-center gap-1 p-2 rounded-button ${b.earned ? "" : "opacity-30 grayscale"}`}>
              <span className="text-2xl">{b.icon}</span>
              <span className="text-[10px] text-center text-muted-foreground leading-tight">{b.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Paths */}
      <div className="rounded-lg bg-card shadow-card border border-border p-6 mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Enrolled Paths</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {buckets.slice(0, 3).map((b) => {
            const progress = Math.floor(Math.random() * 80 + 10);
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Contest History */}
      <div className="rounded-lg bg-card shadow-card border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Contest History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2 font-medium">Contest</th>
                <th className="text-left py-2 font-medium">Rank</th>
                <th className="text-left py-2 font-medium">Score</th>
                <th className="text-left py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {contests.filter((c) => c.status === "ended").map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="py-2.5 text-foreground font-medium">{c.title}</td>
                  <td className="py-2.5 text-muted-foreground">#142</td>
                  <td className="py-2.5 text-muted-foreground">1,850</td>
                  <td className="py-2.5 text-muted-foreground">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default DashboardPage;
