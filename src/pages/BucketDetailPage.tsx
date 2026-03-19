import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buckets, courses } from "@/data/data";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Lock, ArrowLeft } from "lucide-react";

const BucketDetailPage = () => {
  const { id } = useParams();
  const bucket = buckets.find((b) => b.id === id);
  const bucketCourses = courses.filter((c) => c.bucketId === id);

  if (!bucket) return <div className="min-h-screen bg-background"><Navbar /><div className="container py-20 text-center text-muted-foreground">Bucket not found.</div></div>;

  const fakeCourses = Array.from({ length: bucket.courses }, (_, i) => ({
    num: i + 1,
    title: bucketCourses[i]?.title || `${bucket.name} — Module ${i + 1}`,
    duration: bucketCourses[i]?.duration || `${Math.floor(Math.random() * 3 + 2)}h ${Math.floor(Math.random() * 50 + 10)}m`,
    modules: bucketCourses[i]?.modules || Math.floor(Math.random() * 10 + 5),
    price: bucketCourses[i]?.price || Math.floor(Math.random() * 800 + 299),
    locked: i > 1,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> All Paths
        </Link>
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <div>
            <div className="text-4xl mb-3">{bucket.emoji}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{bucket.name}</h1>
            <p className="text-lg text-body-text mb-4">{bucket.description}</p>
            <div className="flex gap-3 mb-8">
              <span className="rounded-pill bg-primary-light px-3 py-1 text-sm text-accent-foreground">{bucket.level}</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-3.5 w-3.5" />{bucket.hours} hours</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground"><BookOpen className="h-3.5 w-3.5" />{bucket.courses} courses</span>
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-4">Curriculum</h2>
            <div className="space-y-3">
              {fakeCourses.map((c) => (
                <div key={c.num} className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">{c.num}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{c.title}</span>
                      {c.locked && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{c.modules} modules · {c.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-foreground">₹{c.price}</div>
                    <button className="text-xs text-primary hover:underline">Buy Individually</button>
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
              <ul className="space-y-2 mb-6 text-sm text-body-text">
                <li>✓ {bucket.courses} courses included</li>
                <li>✓ {bucket.hours} hours of content</li>
                <li>✓ Certificate on completion</li>
                <li>✓ Lifetime access</li>
              </ul>
              <Button className="w-full rounded-button" size="lg">Enroll in Full Path</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BucketDetailPage;
