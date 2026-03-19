import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BucketCard from "@/components/BucketCard";
import ProblemRow from "@/components/ProblemRow";
import ContestCard from "@/components/ContestCard";
import CourseCard from "@/components/CourseCard";
import { buckets, problems, contests, courses, instructors, subscriptionPlans } from "@/data/data";
import { ArrowRight, TrendingUp, BookOpen, Users, Target, Play, Star, CheckCircle2, Zap } from "lucide-react";

const stats = [
  { label: "Active Learners", value: "2,00,000+", icon: Users },
  { label: "Expert Courses", value: "50+", icon: BookOpen },
  { label: "Expert Mentors", value: "10+", icon: TrendingUp },
  { label: "Practice Problems", value: "500+", icon: Target },
];

const avatarGradients = [
  "from-violet-500 to-purple-700",
  "from-blue-500 to-indigo-700",
  "from-emerald-500 to-teal-700",
  "from-orange-500 to-red-600",
  "from-pink-500 to-rose-700",
  "from-cyan-500 to-blue-700",
  "from-amber-500 to-orange-700",
];

const Index = () => {
  const featuredCourses = courses.filter((c) => [
    "c-complete-stock-trading",
    "c-options-basics-advanced",
    "c-wealth-creation-ta",
    "c-strategies-trading-portfolio",
    "c-algo-trading-bootcamp",
    "c-financial-statements",
  ].includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/5 via-transparent to-primary/5" />
        <div className="container py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                <Zap className="h-3 w-3" /> Powered by Upstox — India's Leading Stockbroker
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                Learn Trading.<br />
                <span className="text-primary">Practice.</span> Master.
              </h1>
              <p className="text-body-text text-lg mb-8 max-w-lg">
                Structured learning paths built for Indian markets by experts with decades of real trading experience.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Button size="lg" className="rounded-button" asChild>
                  <Link to="/buckets/stock-market-basics">Start Learning Free <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-button" asChild>
                  <Link to="/problems">Practice Problems</Link>
                </Button>
              </div>
              {/* Instructor avatars strip */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {instructors.slice(0, 5).map((inst, i) => (
                    <div key={inst.id} className={`h-8 w-8 rounded-full bg-gradient-to-br ${avatarGradients[i]} flex items-center justify-center text-[10px] font-bold text-white border-2 border-background`}>
                      {inst.avatar}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">Learn from <strong className="text-foreground">7+ expert mentors</strong></span>
              </div>
            </div>

            {/* Stats grid + hero visual */}
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="rounded-lg bg-gradient-to-br from-primary-deep to-primary p-6 text-primary-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="h-8 w-8" />
                  <div>
                    <div className="text-sm font-medium opacity-80">Featured Course</div>
                    <div className="text-lg font-bold">The Complete Course on Stock Trading</div>
                  </div>
                </div>
                <p className="text-sm opacity-80 mb-3">by Milan Bavishi · 4 Modules · 6h 30m</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <Star className="h-3.5 w-3.5 fill-current opacity-40" />
                  </div>
                  <span className="text-sm opacity-80">85,000+ students</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-lg bg-card p-4 shadow-card border border-border text-center hover:border-primary/30 transition-colors">
                    <s.icon className="h-5 w-5 text-primary mx-auto mb-1.5" />
                    <div className="text-xl font-bold text-foreground">{s.value}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Banner */}
      <section className="container mb-16">
        <div className="rounded-lg bg-gradient-to-r from-primary-light to-primary/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/10">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Not sure where to start?</h2>
            <p className="text-body-text">Answer 3 quick questions and we'll recommend your perfect learning path.</p>
          </div>
          <Button size="lg" className="rounded-button whitespace-nowrap">
            Take the Quiz <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Choose Your Learning Path</h2>
          <p className="text-body-text max-w-xl mx-auto">Each path is a structured curriculum designed by market experts for a specific trading style.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buckets.map((b) => <BucketCard key={b.id} bucket={b} />)}
        </div>
      </section>

      {/* Expert Instructors */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Learn from Market Experts</h2>
          <p className="text-body-text max-w-xl mx-auto">Our instructors bring decades of real trading experience from India's top financial institutions.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {instructors.slice(0, 4).map((inst, i) => (
            <div key={inst.id} className="rounded-lg bg-card p-5 shadow-card border border-border text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${avatarGradients[i]} flex items-center justify-center text-xl font-bold text-white mx-auto mb-3`}>
                {inst.avatar}
              </div>
              <h3 className="text-sm font-semibold text-foreground">{inst.name}</h3>
              <p className="text-xs text-primary mb-2">{inst.title}</p>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{inst.bio}</p>
              <div className="flex justify-center gap-4 text-[11px] text-muted-foreground">
                <span><strong className="text-foreground">{inst.courses}</strong> courses</span>
                <span><strong className="text-foreground">{inst.students}</strong> students</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-4">
            {instructors.slice(4).map((inst, i) => (
              <div key={inst.id} className="flex items-center gap-2 px-3 py-2 rounded-button bg-card border border-border shadow-sm">
                <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${avatarGradients[i + 4]} flex items-center justify-center text-[9px] font-bold text-white`}>
                  {inst.avatar}
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium text-foreground">{inst.name}</div>
                  <div className="text-[10px] text-muted-foreground">{inst.courses} courses</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Popular Courses</h2>
          <p className="text-body-text max-w-xl mx-auto">Start with these handpicked courses — from free introductions to comprehensive masterclasses.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((c) => <CourseCard key={c.id} course={c} />)}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" className="rounded-button" asChild>
            <Link to="/buckets/stock-market-basics">View All 50+ Courses <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Problems Preview */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Practice with Real Market Problems</h2>
          <p className="text-body-text max-w-xl mx-auto">Sharpen your skills with scenario-based problems. Discuss. Learn. Improve.</p>
        </div>
        <div className="rounded-lg bg-card shadow-card border border-border overflow-hidden">
          <div className="grid grid-cols-[32px_40px_1fr_auto_100px_80px] items-center gap-3 px-4 py-2.5 bg-muted/50 text-xs font-medium text-muted-foreground border-b border-border">
            <span></span><span>#</span><span>Title</span><span>Bucket</span><span>Difficulty</span><span className="text-right">Acceptance</span>
          </div>
          {problems.slice(0, 6).map((p) => <ProblemRow key={p.id} problem={p} />)}
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
          <p className="text-body-text max-w-xl mx-auto">Compete with traders across India. Win prizes and bragging rights.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {contests.slice(0, 2).map((c) => <ContestCard key={c.id} contest={c} />)}
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="container mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Simple, Transparent Pricing</h2>
          <p className="text-body-text max-w-xl mx-auto">Unlimited access to all courses, live webinars, and recordings.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <div key={plan.id} className={`rounded-lg bg-card p-6 shadow-card border transition-all duration-200 hover:shadow-lg ${plan.popular ? "border-primary ring-2 ring-primary/20 relative" : "border-border"}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-primary text-primary-foreground px-3 py-0.5 text-xs font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.duration} access</p>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">₹{plan.price.toLocaleString("en-IN")}</span>
                <span className="text-sm text-muted-foreground ml-2">₹{plan.perMonth}/mo</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-body-text">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? "default" : "outline"} className="w-full rounded-button">
                {plan.popular ? "Get Started" : "Choose Plan"}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
