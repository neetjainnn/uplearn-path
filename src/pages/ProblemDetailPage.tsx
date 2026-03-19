import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DifficultyBadge from "@/components/DifficultyBadge";
import BucketTag from "@/components/BucketTag";
import { problems } from "@/data/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

const options = [
  "Buy — Strong bullish breakout confirmed",
  "Sell — Bearish reversal pattern forming",
  "Hold — Wait for confirmation candle",
  "Exit — Stop-loss triggered",
];

const ProblemDetailPage = () => {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === Number(id));
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const correctAnswer = 2; // "Hold" is correct

  if (!problem) return <div className="min-h-screen bg-background"><Navbar /><div className="container py-20 text-center text-muted-foreground">Problem not found.</div></div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <Link to="/problems" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Problems
        </Link>
        <div className="grid lg:grid-cols-[2fr_3fr] gap-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-foreground">{problem.id}. {problem.title}</h1>
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>
            <div className="flex gap-2 mb-6">
              <BucketTag name={problem.bucket} />
              {problem.tags.map((t) => (
                <span key={t} className="rounded-pill bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="prose prose-sm max-w-none text-body-text space-y-4">
              <p>You are analyzing a 15-minute chart of NIFTY 50 futures. The price has been consolidating in a tight range for the past 2 hours near a key resistance level of 22,450.</p>
              <p>A large green candle has just formed with above-average volume, pushing the price to 22,480. The RSI is at 68 and MACD has just crossed above the signal line.</p>
              <h4 className="text-foreground font-semibold">Given Chart:</h4>
              <p>15-min NIFTY50 chart showing consolidation near resistance with a breakout candle.</p>
              <h4 className="text-foreground font-semibold">Key Information:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Resistance level: 22,450</li>
                <li>Current price: 22,480</li>
                <li>RSI: 68 (approaching overbought)</li>
                <li>MACD: Bullish crossover</li>
                <li>Volume: 1.5x average</li>
              </ul>
              <h4 className="text-foreground font-semibold">Correct Action:</h4>
              <p>Determine the best trading action based on the given scenario.</p>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-lg bg-gradient-to-br from-primary-deep/20 to-primary/10 border border-border h-48 md:h-64 flex items-center justify-center mb-6">
              <span className="text-muted-foreground text-sm">📊 Chart Visualization</span>
            </div>
            <div className="space-y-3 mb-6">
              {options.map((opt, i) => (
                <button key={i} onClick={() => !submitted && setSelected(i)} className={`w-full text-left p-4 rounded-button border transition-all text-sm ${
                  submitted && i === correctAnswer ? "border-success bg-success/10" :
                  submitted && i === selected && i !== correctAnswer ? "border-hard bg-hard/10" :
                  selected === i ? "border-primary bg-primary/5" :
                  "border-border hover:border-primary/40"
                }`}>
                  <span className="font-medium text-foreground">{String.fromCharCode(65 + i)}.</span> {opt}
                  {submitted && i === correctAnswer && <CheckCircle2 className="inline ml-2 h-4 w-4 text-success" />}
                  {submitted && i === selected && i !== correctAnswer && <XCircle className="inline ml-2 h-4 w-4 text-hard" />}
                </button>
              ))}
            </div>
            <Button disabled={selected === null || submitted} onClick={() => setSubmitted(true)} className="w-full rounded-button" size="lg">
              {submitted ? (selected === correctAnswer ? "✅ Correct!" : "❌ Incorrect") : "Submit Answer"}
            </Button>
            {submitted && (
              <div className="mt-4 p-4 rounded-button bg-muted/50 text-sm text-body-text">
                <strong className="text-foreground">Explanation:</strong> While the breakout looks promising, the RSI at 68 is approaching overbought territory. A prudent trader would wait for a confirmation candle (retest of breakout level) before entering. This reduces the risk of getting caught in a false breakout.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProblemDetailPage;
