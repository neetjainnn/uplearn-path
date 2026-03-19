import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContestCard from "@/components/ContestCard";
import { contests } from "@/data/data";

const tabs = ["Upcoming", "Active", "Past"] as const;

const ContestsPage = () => {
  const [tab, setTab] = useState<string>("Upcoming");

  const filtered = contests.filter((c) => {
    if (tab === "Upcoming") return c.status === "upcoming";
    if (tab === "Active") return c.status === "active";
    return c.status === "ended";
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="rounded-lg bg-gradient-to-r from-primary-deep to-primary p-8 md:p-12 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">Weekly Trading Contests</h1>
          <p className="text-primary-foreground/80">Test your skills against India's best traders</p>
        </div>
        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-button text-sm font-medium transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {t}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No {tab.toLowerCase()} contests right now.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((c) => <ContestCard key={c.id} contest={c} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContestsPage;
