import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProblemRow from "@/components/ProblemRow";
import DonutChart from "@/components/DonutChart";
import StreakCounter from "@/components/StreakCounter";
import { problems, buckets, userStats } from "@/data/data";
import { Search } from "lucide-react";

const difficulties = ["All", "Easy", "Medium", "Hard"] as const;
const statuses = ["All", "Solved", "Attempted", "Unsolved"] as const;
const allTags = ["Candlestick", "Chart Patterns", "Valuation", "Options", "Greeks", "Indicators", "Intraday", "Risk", "Strategy", "Python", "Volume", "Basics", "Order Types", "Automation"];

const ProblemsPage = () => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [selectedBuckets, setSelectedBuckets] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      if (status !== "All" && p.status !== status.toLowerCase()) return false;
      if (selectedBuckets.length > 0 && !selectedBuckets.includes(p.bucket)) return false;
      if (selectedTags.length > 0 && !selectedTags.some((t) => p.tags.includes(t))) return false;
      return true;
    });
  }, [search, difficulty, status, selectedBuckets, selectedTags]);

  const toggleBucket = (name: string) => {
    setSelectedBuckets((prev) => prev.includes(name) ? prev.filter((b) => b !== name) : [...prev, name]);
  };
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-6 mb-8 p-6 rounded-lg bg-card shadow-card border border-border">
          <DonutChart />
          <div className="h-16 w-px bg-border hidden md:block" />
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{userStats.problemsSolved} / {userStats.totalProblems} Solved</span>
            <StreakCounter streak={userStats.currentStreak} />
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            <strong className="text-foreground">{filtered.length}</strong> problems found
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6">
            <div className="flex items-center gap-2 rounded-button border border-border px-3 py-2 bg-card">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search problems..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground" />
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Difficulty</h4>
              <div className="space-y-1">
                {difficulties.map((d) => (
                  <button key={d} onClick={() => setDifficulty(d)} className={`block w-full text-left px-3 py-1.5 rounded-button text-sm transition-colors ${difficulty === d ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</h4>
              <div className="space-y-1">
                {statuses.map((s) => (
                  <button key={s} onClick={() => setStatus(s)} className={`block w-full text-left px-3 py-1.5 rounded-button text-sm transition-colors ${status === s ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Bucket / Topic</h4>
              <div className="space-y-1">
                {buckets.map((b) => (
                  <label key={b.id} className="flex items-center gap-2 text-sm text-foreground cursor-pointer px-3 py-1">
                    <input type="checkbox" checked={selectedBuckets.includes(b.name)} onChange={() => toggleBucket(b.name)} className="rounded accent-primary" />
                    {b.emoji} {b.name}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1.5">
                {allTags.map((t) => (
                  <button key={t} onClick={() => toggleTag(t)} className={`rounded-pill px-2.5 py-0.5 text-xs font-medium transition-colors ${selectedTags.includes(t) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Table */}
          <div className="flex-1">
            <div className="rounded-lg bg-card shadow-card border border-border overflow-hidden">
              <div className="grid grid-cols-[32px_40px_1fr_auto_100px_80px] items-center gap-3 px-4 py-2.5 bg-muted/50 text-xs font-medium text-muted-foreground border-b border-border">
                <span></span><span>#</span><span>Title</span><span>Bucket</span><span>Difficulty</span><span className="text-right">Acceptance</span>
              </div>
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">No problems match your filters.</div>
              ) : (
                filtered.map((p) => <ProblemRow key={p.id} problem={p} />)
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProblemsPage;
