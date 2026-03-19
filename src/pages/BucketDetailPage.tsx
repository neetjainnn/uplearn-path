import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { buckets, courses, instructors } from "@/data/data";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Lock, ArrowLeft, CheckCircle2, Users } from "lucide-react";

const avatarGradients = [
  "from-violet-500 to-purple-700",
  "from-blue-500 to-indigo-700",
  "from-emerald-500 to-teal-700",
  "from-orange-500 to-red-600",
  "from-pink-500 to-rose-700",
  "from-cyan-500 to-blue-700",
  "from-amber-500 to-orange-700",
];

const BucketDetailPage = () => {
  const { id } = useParams();
  const bucket = buckets.find((b) => b.id === id);
  const bucketCourses = courses.filter((c) => c.bucketId === id);

  // Get unique instructors for this bucket
  const bucketInstructorIds = [...new Set(bucketCourses.map((c) => c.instructorId))];
  const bucketInstructors = instructors.filter((i) => bucketInstructorIds.includes(i.id));

  if (!bucket) return <div className="min-h-screen bg-background"><Navbar /><div className="container py-20 text-center text-muted-foreground">Bucket not found.</div></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> All Paths
        </Link>
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div>
            {/* Header */}
            <div className="text-4xl mb-3">{bucket.emoji}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{bucket.name}</h1>
            <p className="text-lg text-body-text mb-4">{bucket.description}</p>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="rounded-pill bg-primary-light px-3 py-1 text-sm text-accent-foreground">{bucket.level}</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-3.5 w-3.5" />{bucket.hours} hours</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><BookOpen className="h-3.5 w-3.5" />{bucketCourses.length} courses</span>
            </div>

            {/* What you'll learn */}
            {bucket.highlights && (
              <div className="rounded-lg bg-card border border-border p-5 mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-3">What you'll learn</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {bucket.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2 text-sm text-body-text">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructors */}
            {bucketInstructors.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Instructors</h2>
                <div className="flex flex-wrap gap-4">
                  {bucketInstructors.map((inst) => {
                    const idx = instructors.indexOf(inst);
                    return (
                      <div key={inst.id} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${avatarGradients[idx % avatarGradients.length]} flex items-center justify-center text-xs font-bold text-white`}>
                          {inst.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{inst.name}</div>
                          <div className="text-xs text-muted-foreground">{inst.title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Curriculum */}
            <h2 className="text-xl font-semibold text-foreground mb-4">Curriculum ({bucketCourses.length} courses)</h2>
            <div className="space-y-3">
              {bucketCourses.map((c, i) => (
                <div key={c.id} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground truncate">{c.title}</span>
                      {c.free && <span className="rounded-pill bg-success/10 text-success px-2 py-0.5 text-[10px] font-semibold shrink-0">FREE</span>}
                      {!c.free && i > 1 && <Lock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {c.instructor} · {c.modules} modules · {c.duration}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-foreground">
                      {c.free ? <span className="text-success">Free</span> : `₹${c.price.toLocaleString("en-IN")}`}
                    </div>
                    <button className="text-xs text-primary hover:underline">
                      {c.free ? "Start Now" : "Buy Individually"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-lg bg-card shadow-card border border-border p-6">
              <div className="text-3xl font-bold text-foreground mb-1">₹{bucket.price.toLocaleString("en-IN")}</div>
              <p className="text-sm text-muted-foreground mb-6">Full path bundle</p>
              <ul className="space-y-2.5 mb-6 text-sm text-body-text">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {bucketCourses.length} courses included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> {bucket.hours} hours of content</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Certificate on completion</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Lifetime access</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success shrink-0" /> Practice problems included</li>
              </ul>
              <Button className="w-full rounded-button" size="lg">Enroll in Full Path</Button>
              <div className="text-center mt-3">
                <span className="text-xs text-muted-foreground">or </span>
                <Link to="/" className="text-xs text-primary hover:underline">subscribe from ₹999/quarter</Link>
              </div>
            </div>

            {/* Social proof */}
            <div className="mt-4 rounded-lg bg-card border border-border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span><strong className="text-foreground">12,400+</strong> learners enrolled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BucketDetailPage;
