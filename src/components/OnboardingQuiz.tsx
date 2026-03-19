import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { buckets } from "@/data/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

const steps = [
  {
    question: "What's your primary goal?",
    options: [
      { emoji: "💰", label: "Grow wealth slowly & safely", bucket: "investing-basics" },
      { emoji: "📈", label: "Learn to read charts & trade", bucket: "technical-analysis" },
      { emoji: "⚡", label: "Trade intraday / scalp stocks", bucket: "scalping-intraday" },
      { emoji: "🤖", label: "Build automated trading systems", bucket: "algo-trading" },
      { emoji: "📊", label: "Analyze companies deeply", bucket: "fundamental-analysis" },
    ],
  },
  {
    question: "What's your experience level?",
    options: [
      { emoji: "🌱", label: "Complete beginner (never invested)" },
      { emoji: "📚", label: "I have a Demat account but don't trade actively" },
      { emoji: "💹", label: "I trade occasionally" },
      { emoji: "🔥", label: "I trade regularly and want to level up" },
    ],
  },
  {
    question: "How much time can you commit weekly?",
    options: [
      { emoji: "⏱️", label: "1–2 hours (casual learner)" },
      { emoji: "📅", label: "3–5 hours (serious learner)" },
      { emoji: "🚀", label: "5+ hours (I want to go fast)" },
    ],
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  isFirstVisit?: boolean;
}

const OnboardingQuiz = ({ open, onClose, isFirstVisit }: Props) => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(0);
      setAnswers({});
      setLoading(false);
      setResult(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSelect = (optionIdx: number) => {
    const newAnswers = { ...answers, [step]: optionIdx };
    setAnswers(newAnswers);

    if (step < 2) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      // Calculate result
      setLoading(true);
      const goalAnswer = newAnswers[0] ?? 0;
      const goalOption = steps[0].options[goalAnswer];
      const recommendedBucket = ("bucket" in goalOption ? goalOption.bucket : "investing-basics") as string;
      setTimeout(() => {
        setLoading(false);
        setResult(recommendedBucket);
        dispatch({ type: "COMPLETE_ONBOARDING", payload: { bucket: recommendedBucket, answers: newAnswers } });
      }, 1500);
    }
  };

  const bucket = result ? buckets.find((b) => b.id === result) : null;

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress bar */}
        {!loading && !result && (
          <div className="flex gap-2 mb-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 animate-fade-in">
            <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Calculating your path...</h2>
            <p className="text-muted-foreground">Analyzing your preferences</p>
          </div>
        ) : result && bucket ? (
          <div className="text-center animate-fade-in">
            <span className="text-5xl mb-4 block">{bucket.emoji}</span>
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your recommended path:</h2>
            <h3 className="text-3xl font-bold text-primary mb-4">{bucket.name}</h3>
            <p className="text-body-text mb-2">{bucket.description}</p>
            <div className="flex justify-center gap-3 mb-8 text-sm text-muted-foreground">
              <span>{bucket.level}</span> · <span>{bucket.hours} hours</span> · <span>₹{bucket.price.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="rounded-button" onClick={() => { onClose(); navigate(`/buckets/${bucket.id}`); }}>
                Start This Path <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-button" onClick={() => { onClose(); navigate("/"); }}>
                Browse All Paths
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-sm text-muted-foreground mb-2">Step {step + 1} of 3</p>
            <h2 className="text-2xl font-semibold text-foreground mb-6">{steps[step].question}</h2>
            <div className="space-y-3">
              {steps[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    answers[step] === i
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-primary-light/50"
                  }`}
                >
                  <span className="text-xl mr-3">{opt.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>
            {step > 0 && !isFirstVisit && (
              <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-muted-foreground hover:text-primary">
                ← Back
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingQuiz;
