import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from "react";
import { generateHeatmapData } from "@/data/data";

// Generate initial heatmap data
function buildInitialActivityLog(): Record<string, number> {
  const heatmap = generateHeatmapData();
  const log: Record<string, number> = {};
  heatmap.forEach((d) => { if (d.count > 0) log[d.date] = d.count; });
  return log;
}

// Score history - generate dummy data
function buildInitialScoreHistory(): { date: string; score: number }[] {
  const history: { date: string; score: number }[] = [];
  let score = 800;
  const now = new Date();
  for (let i = 180; i >= 0; i -= 7) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    score += Math.floor(Math.random() * 40 + 5);
    history.push({ date: d.toISOString().split("T")[0], score: Math.min(score, 1430) });
  }
  // ensure last point is current score
  history[history.length - 1].score = 1430;
  return history;
}

export interface Discussion {
  id: string;
  name: string;
  text: string;
  upvotes: number;
  timestamp: string;
  upvotedByUser: boolean;
}

export interface AppState {
  user: {
    name: string;
    email: string;
    traderScore: number;
    globalRank: number;
    currentStreak: number;
    maxStreak: number;
    totalActiveDays: number;
    lastActiveDate: string | null;
    onboardingCompleted: boolean;
    recommendedBucket: string | null;
  };
  problems: {
    solvedIds: number[];
    attemptedIds: number[];
    submissions: Record<number, { answer: number; isCorrect: boolean; timestamp: number; date: string }>;
  };
  activityLog: Record<string, number>;
  contests: {
    registeredIds: string[];
    results: Record<string, { rank: number; pnl: number; score: number }>;
  };
  enrollments: {
    buckets: string[];
    courses: string[];
    progress: Record<string, { completedLessons: number[]; percentage: number }>;
  };
  onboardingAnswers: Record<number, number>;
  discussions: Record<number, Discussion[]>;
  scoreHistory: { date: string; score: number }[];
}

const defaultDummySolved = [1, 5, 6, 8, 12, 15, 17, 18];
const defaultDummyAttempted = [2, 9, 14, 20];

const initialState: AppState = {
  user: {
    name: "Rahul Sharma",
    email: "rahul@example.com",
    traderScore: 1430,
    globalRank: 472793,
    currentStreak: 14,
    maxStreak: 58,
    totalActiveDays: 294,
    lastActiveDate: null,
    onboardingCompleted: false,
    recommendedBucket: null,
  },
  problems: {
    solvedIds: defaultDummySolved,
    attemptedIds: defaultDummyAttempted,
    submissions: {},
  },
  activityLog: buildInitialActivityLog(),
  contests: {
    registeredIds: [],
    results: {},
  },
  enrollments: {
    buckets: [],
    courses: [],
    progress: {},
  },
  onboardingAnswers: {},
  discussions: {},
  scoreHistory: buildInitialScoreHistory(),
};

// Generate default discussions for problems
const defaultDiscussions: Record<number, Discussion[]> = {};
const dummyComments = [
  { name: "Ankit Mehta", text: "Great problem! The key is to look at the volume confirmation before deciding.", upvotes: 12 },
  { name: "Priya Sharma", text: "I got confused between head & shoulders and double top here.", upvotes: 8 },
  { name: "Rohan Gupta", text: "The trick is to use RSI divergence along with the pattern.", upvotes: 15 },
  { name: "Neha Kapoor", text: "Can someone explain why option C is wrong?", upvotes: 5 },
  { name: "Vikram Singh", text: "This is similar to the pattern we saw in Nifty last week!", upvotes: 22 },
  { name: "Deepika Jain", text: "Remember to always check the timeframe before applying patterns.", upvotes: 9 },
];

for (let i = 1; i <= 20; i++) {
  defaultDiscussions[i] = dummyComments.slice(0, Math.floor(Math.random() * 3) + 3).map((c, idx) => ({
    id: `default-${i}-${idx}`,
    name: c.name,
    text: c.text,
    upvotes: c.upvotes,
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 86400000)).toISOString(),
    upvotedByUser: false,
  }));
}

type Action =
  | { type: "SET_STATE"; payload: AppState }
  | { type: "COMPLETE_ONBOARDING"; payload: { bucket: string; answers: Record<number, number> } }
  | { type: "SUBMIT_ANSWER"; payload: { problemId: number; answer: number; isCorrect: boolean; correctAnswer: number } }
  | { type: "REGISTER_CONTEST"; payload: string }
  | { type: "SAVE_CONTEST_RESULT"; payload: { contestId: string; rank: number; pnl: number; score: number } }
  | { type: "ENROLL_BUCKET"; payload: string }
  | { type: "ADD_DISCUSSION"; payload: { problemId: number; comment: Discussion } }
  | { type: "TOGGLE_UPVOTE"; payload: { problemId: number; commentId: string } }
  | { type: "RESET_STATE" };

function updateStreak(activityLog: Record<string, number>, user: AppState["user"]): AppState["user"] {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const activeToday = (activityLog[today] || 0) > 0;
  const lastActive = user.lastActiveDate;

  if (activeToday) {
    if (lastActive === yesterday || lastActive === today) {
      if (lastActive !== today) {
        user = { ...user, currentStreak: user.currentStreak + 1, lastActiveDate: today };
      }
    } else {
      user = { ...user, currentStreak: 1, lastActiveDate: today };
    }
  }

  user = {
    ...user,
    maxStreak: Math.max(user.maxStreak, user.currentStreak),
    totalActiveDays: Object.keys(activityLog).filter((d) => activityLog[d] > 0).length,
  };

  return user;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;

    case "RESET_STATE":
      return { ...initialState, activityLog: buildInitialActivityLog(), scoreHistory: buildInitialScoreHistory() };

    case "COMPLETE_ONBOARDING":
      return {
        ...state,
        user: { ...state.user, onboardingCompleted: true, recommendedBucket: action.payload.bucket },
        onboardingAnswers: action.payload.answers,
      };

    case "SUBMIT_ANSWER": {
      const { problemId, answer, isCorrect } = action.payload;
      const today = new Date().toISOString().split("T")[0];
      const newActivityLog = { ...state.activityLog, [today]: (state.activityLog[today] || 0) + 1 };

      let newSolvedIds = [...state.problems.solvedIds];
      let newAttemptedIds = [...state.problems.attemptedIds];

      if (!newAttemptedIds.includes(problemId)) newAttemptedIds.push(problemId);
      if (isCorrect && !newSolvedIds.includes(problemId)) newSolvedIds.push(problemId);

      const scoreIncrease = isCorrect && !state.problems.solvedIds.includes(problemId) ? 10 : 0;
      const newScore = state.user.traderScore + scoreIncrease;

      let updatedUser = {
        ...state.user,
        traderScore: newScore,
      };
      updatedUser = updateStreak(newActivityLog, updatedUser);

      const newScoreHistory = scoreIncrease > 0
        ? [...state.scoreHistory, { date: today, score: newScore }]
        : state.scoreHistory;

      return {
        ...state,
        user: updatedUser,
        problems: {
          solvedIds: newSolvedIds,
          attemptedIds: newAttemptedIds,
          submissions: {
            ...state.problems.submissions,
            [problemId]: { answer, isCorrect, timestamp: Date.now(), date: today },
          },
        },
        activityLog: newActivityLog,
        scoreHistory: newScoreHistory,
      };
    }

    case "REGISTER_CONTEST": {
      if (state.contests.registeredIds.includes(action.payload)) return state;
      return {
        ...state,
        contests: { ...state.contests, registeredIds: [...state.contests.registeredIds, action.payload] },
      };
    }

    case "SAVE_CONTEST_RESULT": {
      const { contestId, rank, pnl, score } = action.payload;
      return {
        ...state,
        contests: {
          ...state.contests,
          results: { ...state.contests.results, [contestId]: { rank, pnl, score } },
        },
      };
    }

    case "ENROLL_BUCKET": {
      if (state.enrollments.buckets.includes(action.payload)) return state;
      return {
        ...state,
        enrollments: { ...state.enrollments, buckets: [...state.enrollments.buckets, action.payload] },
      };
    }

    case "ADD_DISCUSSION": {
      const { problemId, comment } = action.payload;
      const existing = state.discussions[problemId] || defaultDiscussions[problemId] || [];
      return {
        ...state,
        discussions: { ...state.discussions, [problemId]: [comment, ...existing] },
      };
    }

    case "TOGGLE_UPVOTE": {
      const { problemId, commentId } = action.payload;
      const existing = state.discussions[problemId] || defaultDiscussions[problemId] || [];
      return {
        ...state,
        discussions: {
          ...state.discussions,
          [problemId]: existing.map((c) =>
            c.id === commentId
              ? { ...c, upvotes: c.upvotedByUser ? c.upvotes - 1 : c.upvotes + 1, upvotedByUser: !c.upvotedByUser }
              : c
          ),
        },
      };
    }

    default:
      return state;
  }
}

const STORAGE_KEY = "uplearn-state";

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with initialState to handle new fields
      return { ...initialState, ...parsed, user: { ...initialState.user, ...parsed.user } };
    }
  } catch {
    // ignore
  }
  return { ...initialState, discussions: defaultDiscussions };
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  getDiscussions: (problemId: number) => Discussion[];
  getProblemStatus: (problemId: number) => "solved" | "attempted" | "unsolved";
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Run streak check on app load
  useEffect(() => {
    const updatedUser = updateStreak(state.activityLog, state.user);
    if (updatedUser.currentStreak !== state.user.currentStreak || updatedUser.lastActiveDate !== state.user.lastActiveDate) {
      dispatch({ type: "SET_STATE", payload: { ...state, user: updatedUser } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDiscussions = useCallback((problemId: number): Discussion[] => {
    return state.discussions[problemId] || defaultDiscussions[problemId] || [];
  }, [state.discussions]);

  const getProblemStatus = useCallback((problemId: number): "solved" | "attempted" | "unsolved" => {
    if (state.problems.solvedIds.includes(problemId)) return "solved";
    if (state.problems.attemptedIds.includes(problemId)) return "attempted";
    return "unsolved";
  }, [state.problems.solvedIds, state.problems.attemptedIds]);

  return (
    <AppContext.Provider value={{ state, dispatch, getDiscussions, getProblemStatus }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

export { defaultDiscussions };
