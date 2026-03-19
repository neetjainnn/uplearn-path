import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BucketCard from "@/components/BucketCard";
import ProblemRow from "@/components/ProblemRow";
import ContestCard from "@/components/ContestCard";
import CourseCard from "@/components/CourseCard";
import OnboardingQuiz from "@/components/OnboardingQuiz";
import { useAppContext } from "@/context/AppContext";
import { buckets, problems, contests, courses } from "@/data/data";
import { ArrowRight, TrendingUp, BookOpen, Users, Target } from "lucide-react";

const stats = [
  { label: "Learners", value: "2,00,000+", icon: Users },
  { label: "Courses", value: "50+", icon: BookOpen },
  { label: "Expert Mentors", value: "10+", icon: TrendingUp },
  { label: "Practice Problems", value: "500+", icon: Target },
];

const Index = () => {
  const { state, getProblemStatus } = useAppContext();
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <OnboardingQuiz open={quizOpen} onClose={() => setQuizOpen(false)} />

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <span className="inline-block rounded-pill bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
              India's #1 Trading Education Platform
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Learn to Trade.<br />Practice. Master.
            </h1>
            <p className="text-body-text text-lg mb-8 max-w-md">
              Structured learning paths built for Indian markets — from zero to pro.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-button" onClick={() => setQuizOpen(true)}>
                Find My Learning Path <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-button" asChild>
                <Link to="/problems">Browse Problems</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-card p-5 shadow-card border border-border text-center">
                <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Banner */}
      <section className="container mb-16">
        <div className="rounded-lg bg-primary-light p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Not sure where to start?</h2>
            <p className="text-body-text">Answer 3 quick questions and we'll recommend your perfect learning path.</p>
          </div>
          <Button size="lg" className="rounded-button whitespace-nowrap" onClick={() => setQuizOpen(true)}>
            Take the Quiz <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Buckets */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Choose Your Learning Path</h2>
          <p className="text-body-text">Each path is a structured curriculum designed for a specific trading style.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buckets.map((b) => <BucketCard key={b.id} bucket={b} />)}
        </div>
      </section>

      {/* Problems Preview */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Practice with Real Market Problems</h2>
          <p className="text-body-text">Sharpen your skills with scenario-based problems. Discuss. Learn. Improve.</p>
        </div>
        <div className="rounded-lg bg-card shadow-card border border-border overflow-hidden">
          <div className="grid grid-cols-[32px_40px_1fr_auto_100px_80px] items-center gap-3 px-4 py-2.5 bg-muted/50 text-xs font-medium text-muted-foreground border-b border-border">
            <span></span><span>#</span><span>Title</span><span>Bucket</span><span>Difficulty</span><span className="text-right">Acceptance</span>
          </div>
          {problems.slice(0, 5).map((p) => (
            <ProblemRow key={p.id} problem={p} status={getProblemStatus(p.id)} />
          ))}
        </div>
        <div className="text-center mt-6">
          <Button variant="outline" className="rounded-button" asChild>
            <Link to="/problems">View All 500+ Problems <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Contests */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Weekly Trading Contests</h2>
          <p className="text-body-text">Compete with traders across India. Win prizes and bragging rights.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {contests.slice(0, 2).map((c) => <ContestCard key={c.id} contest={c} />)}
        </div>
      </section>

      {/* Courses */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Watch Expert Courses</h2>
          <p className="text-body-text">Learn from India's top market practitioners.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
