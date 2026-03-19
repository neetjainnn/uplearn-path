import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DifficultyBadge from "@/components/DifficultyBadge";
import BucketTag from "@/components/BucketTag";
import { useAppContext } from "@/context/AppContext";
import { problems } from "@/data/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, ThumbsUp, Lock } from "lucide-react";
import { toast } from "sonner";

// Correct answers for each problem (deterministic based on id)
const getCorrectAnswer = (id: number) => ((id * 7 + 3) % 4);

const problemDescriptions: Record<number, { scenario: string; options: string[]; explanation: string }> = {};
const defaultOptions = [
  "Buy — Strong bullish breakout confirmed",
  "Sell — Bearish reversal pattern forming",
  "Hold — Wait for confirmation candle",
  "Exit — Stop-loss triggered",
];
const defaultScenario = "You are analyzing a 15-minute chart. The price has been consolidating near a key level with increasing volume. Multiple technical indicators are giving mixed signals. Analyze the setup and determine the best course of action.";
const defaultExplanation = "The correct approach considers all available indicators together rather than relying on a single signal. Always wait for confirmation before making a trading decision to minimize risk.";

// Generate unique content per problem
for (let i = 1; i <= 20; i++) {
  problemDescriptions[i] = {
    scenario: defaultScenario,
    options: defaultOptions,
    explanation: defaultExplanation,
  };
}

const tabs = ["Description", "Discussion", "Solution", "Editorial"] as const;

const ProblemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch, getDiscussions, getProblemStatus } = useAppContext();
  const problemId = Number(id);
  const problem = problems.find((p) => p.id === problemId);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("Description");
  const [commentText, setCommentText] = useState("");
  const [editorialExpanded, setEditorialExpanded] = useState(false);

  const correctAnswer = getCorrectAnswer(problemId);
  const status = getProblemStatus(problemId);
  const discussions = getDiscussions(problemId);
  const desc = problemDescriptions[problemId] || problemDescriptions[1];

  if (!problem) return <div className="min-h-screen bg-background"><Navbar /><div className="container py-20 text-center text-muted-foreground">Problem not found.</div></div>;

  const problemIndex = problems.findIndex((p) => p.id === problemId);
  const prevProblem = problemIndex > 0 ? problems[problemIndex - 1] : null;
  const nextProblem = problemIndex < problems.length - 1 ? problems[problemIndex + 1] : null;

  const handleSubmit = () => {
    if (selected === null) return;
    const isCorrect = selected === correctAnswer;
    setSubmitted(true);

    dispatch({
      type: "SUBMIT_ANSWER",
      payload: { problemId, answer: selected, isCorrect, correctAnswer },
    });

    if (isCorrect) {
      toast.success("Problem solved! +10 Trader Score", { duration: 3000 });
      // Check streak
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      if (state.user.lastActiveDate === yesterday || (!state.activityLog[today] || state.activityLog[today] === 0)) {
        const newStreak = state.user.lastActiveDate === yesterday ? state.user.currentStreak + 1 : 1;
        if (newStreak > state.user.currentStreak) {
          setTimeout(() => toast("🔥 Day " + newStreak + " streak! Keep going!", { duration: 3000 }), 500);
        }
      }
    } else {
      toast.error("Incorrect answer. Try reviewing the solution.", { duration: 3000 });
    }
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    dispatch({
      type: "ADD_DISCUSSION",
      payload: {
        problemId,
        comment: {
          id: `user-${Date.now()}`,
          name: state.user.name,
          text: commentText,
          upvotes: 0,
          timestamp: new Date().toISOString(),
          upvotedByUser: false,
        },
      },
    });
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/problems" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Problems
          </Link>
          <span className="text-sm text-muted-foreground">Problem {problemIndex + 1} of {problems.length}</span>
        </div>

        <div className="grid lg:grid-cols-[2fr_3fr] gap-8">
          {/* Left Panel */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-bold text-foreground">{problem.id}. {problem.title}</h1>
              <DifficultyBadge difficulty={problem.difficulty} />
            </div>
            <div className="flex gap-2 mb-6 flex-wrap">
              <BucketTag name={problem.bucket} />
              {problem.tags.map((t) => (
                <span key={t} className="rounded-pill bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {tab === "Solution" && status !== "solved" && <Lock className="inline ml-1 h-3 w-3" />}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "Description" && (
              <div className="prose prose-sm max-w-none text-body-text space-y-4">
                <p>{desc.scenario}</p>
                <h4 className="text-foreground font-semibold">Key Information:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Acceptance rate: {problem.acceptance}%</li>
                  <li>Bucket: {problem.bucket}</li>
                  <li>Difficulty: {problem.difficulty}</li>
                </ul>
                <h4 className="text-foreground font-semibold">Correct Action:</h4>
                <p>Determine the best trading action based on the given scenario.</p>
              </div>
            )}

            {activeTab === "Discussion" && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    placeholder="Add a comment..."
                    className="flex-1 rounded-button border border-border px-3 py-2 text-sm bg-card outline-none focus:border-primary placeholder:text-muted-foreground"
                  />
                  <Button size="sm" className="rounded-button" onClick={handleAddComment}>Post</Button>
                </div>
                {discussions.map((c) => (
                  <div key={c.id} className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{new Date(c.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-body-text mb-2">{c.text}</p>
                    <button
                      onClick={() => dispatch({ type: "TOGGLE_UPVOTE", payload: { problemId, commentId: c.id } })}
                      className={`flex items-center gap-1 text-xs transition-colors ${c.upvotedByUser ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                    >
                      <ThumbsUp className="h-3 w-3" /> {c.upvotes}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "Solution" && (
              <div>
                {status === "solved" ? (
                  <div className="prose prose-sm max-w-none text-body-text">
                    <h4 className="text-foreground font-semibold">Solution</h4>
                    <p>The correct answer is <strong>Option {String.fromCharCode(65 + correctAnswer)}</strong>.</p>
                    <p>{desc.explanation}</p>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Solve the problem first to unlock the solution.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Editorial" && (
              <div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 mb-4">
                  <p className="text-sm font-medium text-foreground">⚠️ Think before reading!</p>
                  <p className="text-xs text-muted-foreground">Try solving the problem on your own first.</p>
                </div>
                <button
                  onClick={() => setEditorialExpanded(!editorialExpanded)}
                  className="text-sm text-primary hover:underline mb-4"
                >
                  {editorialExpanded ? "Hide Editorial ▲" : "Show Editorial ▼"}
                </button>
                {editorialExpanded && (
                  <div className="prose prose-sm max-w-none text-body-text mt-4">
                    <p>The correct answer is <strong>Option {String.fromCharCode(65 + correctAnswer)}</strong>: {desc.options[correctAnswer]}</p>
                    <p>{desc.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div>
            <div className="rounded-lg bg-gradient-to-br from-primary-deep/20 to-primary/10 border border-border h-48 md:h-64 flex items-center justify-center mb-6">
              <span className="text-muted-foreground text-sm">📊 Chart Visualization</span>
            </div>
            <div className="space-y-3 mb-6">
              {desc.options.map((opt, i) => (
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
            <Button disabled={selected === null || submitted} onClick={handleSubmit} className="w-full rounded-button" size="lg">
              {submitted ? (selected === correctAnswer ? "✅ Correct! +10 Trader Score" : "❌ Incorrect") : "Submit Answer"}
            </Button>
            {submitted && (
              <div className="mt-4 p-4 rounded-button bg-muted/50 text-sm text-body-text">
                <strong className="text-foreground">Explanation:</strong> {desc.explanation}
              </div>
            )}

            {/* Prev/Next Navigation */}
            <div className="flex justify-between mt-6">
              {prevProblem ? (
                <Button variant="outline" className="rounded-button" onClick={() => navigate(`/problems/${prevProblem.id}`)}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
              ) : <div />}
              {nextProblem ? (
                <Button variant="outline" className="rounded-button" onClick={() => navigate(`/problems/${nextProblem.id}`)}>
                  Next <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : <div />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProblemDetailPage;
