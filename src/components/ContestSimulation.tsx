import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Timer, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const contestProblems = [
  {
    question: "NIFTY is trading at 22,500. A large bearish engulfing candle forms on the 15-min chart with high volume. RSI is at 72. What's your move?",
    options: ["Buy the dip", "Short sell immediately", "Wait for confirmation", "Exit all positions"],
    correct: 2,
    pnlCorrect: 8500,
    pnlWrong: -3200,
  },
  {
    question: "Bank Nifty breaks above resistance at 48,000 with 2x average volume. MACD shows bullish crossover. What do you do?",
    options: ["Buy with stop-loss at 47,800", "Wait for pullback to 48,000", "Short at resistance", "No trade — too risky"],
    correct: 0,
    pnlCorrect: 12000,
    pnlWrong: -5000,
  },
  {
    question: "Your long position in Reliance is up 5%. The stock hits a key Fibonacci extension level. Volume is declining. Action?",
    options: ["Hold for more upside", "Book 50% profits", "Add more quantity", "Exit completely"],
    correct: 1,
    pnlCorrect: 6000,
    pnlWrong: -2000,
  },
  {
    question: "A morning star pattern forms on Tata Motors daily chart near 200-DMA support. What's the best strategy?",
    options: ["Buy aggressively", "Buy with strict stop-loss below 200-DMA", "Short sell", "Wait for 3 more candles"],
    correct: 1,
    pnlCorrect: 9500,
    pnlWrong: -4000,
  },
  {
    question: "Market opens gap-up 1.5%. Your portfolio is fully invested. VIX spikes 15%. What should you do?",
    options: ["Buy more on strength", "Hold positions unchanged", "Hedge with put options", "Sell everything"],
    correct: 2,
    pnlCorrect: 7000,
    pnlWrong: -6000,
  },
];

interface Props {
  contestId: string;
  open: boolean;
  onClose: () => void;
}

const ContestSimulation = ({ contestId, open, onClose }: Props) => {
  const { dispatch } = useAppContext();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [portfolio, setPortfolio] = useState(100000);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [finished, setFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [open, finished]);

  if (!open) return null;

  const problem = contestProblems[currentQ];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const pnlPercent = ((portfolio - 100000) / 100000 * 100).toFixed(1);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    const isCorrect = selected === problem.correct;
    const pnlChange = isCorrect ? problem.pnlCorrect : problem.pnlWrong;
    setPortfolio((p) => p + pnlChange);
    if (isCorrect) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (currentQ < contestProblems.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
      const finalPnl = ((portfolio - 100000) / 100000 * 100);
      const rank = Math.floor(Math.random() * 200) + 50;
      dispatch({
        type: "SAVE_CONTEST_RESULT",
        payload: { contestId, rank, pnl: finalPnl, score: correctCount * 500 + Math.max(0, Math.floor(finalPnl * 100)) },
      });
      toast.success(`Contest completed! Rank #${rank}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card rounded-lg border border-border shadow-card p-6">
        {finished ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">🏆 Contest Complete!</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-foreground">₹{portfolio.toLocaleString("en-IN")}</div>
                <div className="text-xs text-muted-foreground">Final Portfolio</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className={`text-2xl font-bold ${portfolio >= 100000 ? "text-success" : "text-hard"}`}>{pnlPercent}%</div>
                <div className="text-xs text-muted-foreground">P&L</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold text-foreground">{correctCount}/5</div>
                <div className="text-xs text-muted-foreground">Correct</div>
              </div>
            </div>
            <Button onClick={onClose} className="rounded-button">Close</Button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="rounded-pill bg-destructive/10 text-destructive px-2.5 py-0.5 text-xs font-semibold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" /> LIVE
                </span>
                <span className="text-sm text-muted-foreground">Q{currentQ + 1} of {contestProblems.length}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                  <TrendingUp className="h-4 w-4" /> ₹{portfolio.toLocaleString("en-IN")}
                  <span className={`text-xs ml-1 ${portfolio >= 100000 ? "text-success" : "text-hard"}`}>({pnlPercent}%)</span>
                </span>
                <span className="flex items-center gap-1 text-sm font-mono text-muted-foreground">
                  <Timer className="h-4 w-4" /> {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Question */}
            <p className="text-sm text-foreground mb-6">{problem.question}</p>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {problem.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => !submitted && setSelected(i)}
                  className={`w-full text-left p-4 rounded-lg border transition-all text-sm ${
                    submitted && i === problem.correct ? "border-success bg-success/10" :
                    submitted && i === selected && i !== problem.correct ? "border-hard bg-hard/10" :
                    selected === i ? "border-primary bg-primary/5" :
                    "border-border hover:border-primary/40"
                  }`}
                >
                  <span className="font-medium text-foreground">{String.fromCharCode(65 + i)}.</span> {opt}
                  {submitted && i === problem.correct && <CheckCircle2 className="inline ml-2 h-4 w-4 text-success" />}
                  {submitted && i === selected && i !== problem.correct && <XCircle className="inline ml-2 h-4 w-4 text-hard" />}
                </button>
              ))}
            </div>

            {!submitted ? (
              <Button disabled={selected === null} onClick={handleSubmit} className="w-full rounded-button" size="lg">
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="w-full rounded-button" size="lg">
                {currentQ < contestProblems.length - 1 ? "Next Question →" : "Finish Contest"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContestSimulation;
