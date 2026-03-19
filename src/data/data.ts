export interface Bucket {
  id: string;
  emoji: string;
  name: string;
  description: string;
  level: string;
  hours: number;
  courses: number;
  price: number;
  color: string;
}

export interface Problem {
  id: number;
  title: string;
  bucket: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: number;
  status: "solved" | "attempted" | "unsolved";
  tags: string[];
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  status: "upcoming" | "active" | "ended";
  date: string;
  participants: number;
  leaderboard?: { rank: number; username: string; pnl: string; score: number }[];
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  modules: number;
  duration: string;
  price: number;
  bucketId: string;
  thumbnail?: string;
}

export const buckets: Bucket[] = [
  { id: "investing-basics", emoji: "🌱", name: "Investing Basics", description: "Start your wealth journey from scratch", level: "Beginner", hours: 12, courses: 4, price: 1999, color: "easy" },
  { id: "fundamental-analysis", emoji: "📊", name: "Fundamental Analysis", description: "Read companies like Warren Buffett", level: "Intermediate", hours: 20, courses: 6, price: 3999, color: "primary" },
  { id: "technical-analysis", emoji: "📈", name: "Technical Analysis", description: "Master charts, patterns & indicators", level: "Beginner-Intermediate", hours: 25, courses: 8, price: 4999, color: "warning" },
  { id: "scalping-intraday", emoji: "⚡", name: "Scalping & Intraday", description: "Trade fast, trade smart", level: "Advanced", hours: 18, courses: 5, price: 5999, color: "hard" },
  { id: "algo-trading", emoji: "🤖", name: "Algo Trading", description: "Automate your trading with Python", level: "Advanced", hours: 30, courses: 7, price: 7999, color: "primary" },
  { id: "risk-management", emoji: "🛡️", name: "Risk Management", description: "Protect your capital at all costs", level: "All levels", hours: 10, courses: 3, price: 2499, color: "success" },
];

export const problems: Problem[] = [
  { id: 1, title: "Identify the Pattern", bucket: "Technical Analysis", difficulty: "Easy", acceptance: 78, status: "solved", tags: ["Chart Patterns"] },
  { id: 2, title: "Bull Trap or Breakout?", bucket: "Technical Analysis", difficulty: "Medium", acceptance: 54, status: "attempted", tags: ["Chart Patterns", "Candlestick"] },
  { id: 3, title: "Calculate Intrinsic Value", bucket: "Fundamental Analysis", difficulty: "Medium", acceptance: 61, status: "unsolved", tags: ["Valuation"] },
  { id: 4, title: "Scalp or Hold? 5-min chart", bucket: "Scalping & Intraday", difficulty: "Hard", acceptance: 31, status: "unsolved", tags: ["Candlestick", "Intraday"] },
  { id: 5, title: "Build a Stop-Loss Strategy", bucket: "Risk Management", difficulty: "Easy", acceptance: 82, status: "solved", tags: ["Risk"] },
  { id: 6, title: "Moving Average Crossover", bucket: "Technical Analysis", difficulty: "Easy", acceptance: 85, status: "solved", tags: ["Indicators"] },
  { id: 7, title: "RSI Divergence Signal", bucket: "Technical Analysis", difficulty: "Medium", acceptance: 48, status: "unsolved", tags: ["Indicators"] },
  { id: 8, title: "PE Ratio Comparison", bucket: "Fundamental Analysis", difficulty: "Easy", acceptance: 76, status: "solved", tags: ["Valuation"] },
  { id: 9, title: "MACD Histogram Analysis", bucket: "Technical Analysis", difficulty: "Medium", acceptance: 52, status: "attempted", tags: ["Indicators"] },
  { id: 10, title: "Gap Up or Gap Down?", bucket: "Scalping & Intraday", difficulty: "Medium", acceptance: 45, status: "unsolved", tags: ["Intraday"] },
  { id: 11, title: "Fibonacci Retracement Levels", bucket: "Technical Analysis", difficulty: "Hard", acceptance: 29, status: "unsolved", tags: ["Chart Patterns"] },
  { id: 12, title: "Debt-to-Equity Analysis", bucket: "Fundamental Analysis", difficulty: "Easy", acceptance: 80, status: "solved", tags: ["Valuation"] },
  { id: 13, title: "Bollinger Band Squeeze", bucket: "Technical Analysis", difficulty: "Hard", acceptance: 33, status: "unsolved", tags: ["Indicators"] },
  { id: 14, title: "Sector Rotation Strategy", bucket: "Investing Basics", difficulty: "Medium", acceptance: 58, status: "attempted", tags: ["Strategy"] },
  { id: 15, title: "Position Sizing Calculator", bucket: "Risk Management", difficulty: "Medium", acceptance: 64, status: "solved", tags: ["Risk"] },
  { id: 16, title: "Backtest a Moving Average Strategy", bucket: "Algo Trading", difficulty: "Hard", acceptance: 25, status: "unsolved", tags: ["Python", "Strategy"] },
  { id: 17, title: "Read a Balance Sheet", bucket: "Fundamental Analysis", difficulty: "Easy", acceptance: 88, status: "solved", tags: ["Valuation"] },
  { id: 18, title: "Identify Support & Resistance", bucket: "Technical Analysis", difficulty: "Easy", acceptance: 74, status: "solved", tags: ["Chart Patterns"] },
  { id: 19, title: "Options Greeks Calculator", bucket: "Algo Trading", difficulty: "Hard", acceptance: 22, status: "unsolved", tags: ["Options", "Python"] },
  { id: 20, title: "Create a Trailing Stop Loss", bucket: "Risk Management", difficulty: "Medium", acceptance: 56, status: "attempted", tags: ["Risk"] },
];

export const contests: Contest[] = [
  {
    id: "contest-12",
    title: "Market Masters — Week 12",
    description: "Trade with ₹1,00,000 virtual capital. Best P&L wins.",
    status: "upcoming",
    date: "Starts Mar 22 | 10:00 AM",
    participants: 1243,
  },
  {
    id: "contest-11",
    title: "Breakout Challenge — Week 11",
    description: "Identify breakout stocks and ride the momentum.",
    status: "ended",
    date: "Mar 15 — Mar 16",
    participants: 2105,
    leaderboard: [
      { rank: 1, username: "TraderAce99", pnl: "+18.4%", score: 2450 },
      { rank: 2, username: "NiftyNinja", pnl: "+15.2%", score: 2280 },
      { rank: 3, username: "BullRunKing", pnl: "+12.7%", score: 2100 },
    ],
  },
  {
    id: "contest-10",
    title: "Scalper's Arena — Week 10",
    description: "5-minute chart challenge. Most profitable scalps win.",
    status: "ended",
    date: "Mar 8 — Mar 9",
    participants: 1876,
    leaderboard: [
      { rank: 1, username: "ScalpMaster", pnl: "+22.1%", score: 2600 },
      { rank: 2, username: "QuickFlip", pnl: "+17.8%", score: 2350 },
      { rank: 3, username: "DayTraderPro", pnl: "+14.3%", score: 2150 },
    ],
  },
];

export const courses: Course[] = [
  { id: "c1", title: "Stock Market for Absolute Beginners", instructor: "Prateek Singh", modules: 12, duration: "4h 30m", price: 499, bucketId: "investing-basics" },
  { id: "c2", title: "Candlestick Patterns Masterclass", instructor: "Rachana Ranade", modules: 18, duration: "6h 15m", price: 999, bucketId: "technical-analysis" },
  { id: "c3", title: "Value Investing in Indian Markets", instructor: "Saurabh Mukherjea", modules: 15, duration: "5h 45m", price: 1299, bucketId: "fundamental-analysis" },
];

export const userStats = {
  traderScore: 1430,
  globalRank: 472793,
  problemsSolved: 955,
  totalProblems: 3466,
  currentStreak: 14,
  maxStreak: 58,
  totalSubmissions: 2858,
  activeDays: 294,
  badges: 17,
  easySolved: 412,
  easyTotal: 830,
  mediumSolved: 398,
  mediumTotal: 1712,
  hardSolved: 145,
  hardTotal: 924,
};

// Generate heatmap data for past year
export function generateHeatmapData() {
  const data: { date: string; count: number }[] = [];
  const now = new Date();
  for (let i = 365; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const rand = Math.random();
    let count = 0;
    if (rand > 0.3) count = Math.floor(Math.random() * 3) + 1;
    if (rand > 0.7) count = Math.floor(Math.random() * 5) + 3;
    if (rand > 0.9) count = Math.floor(Math.random() * 4) + 7;
    if (rand < 0.25) count = 0;
    data.push({ date: dateStr, count });
  }
  return data;
}

export const badges = [
  { name: "7 Day Streak", icon: "🔥", earned: true },
  { name: "50 Day Streak", icon: "💪", earned: true },
  { name: "First Contest", icon: "🏆", earned: true },
  { name: "Top 10%", icon: "⭐", earned: true },
  { name: "100 Problems", icon: "💯", earned: true },
  { name: "500 Problems", icon: "🎯", earned: true },
  { name: "Speed Demon", icon: "⚡", earned: true },
  { name: "Night Owl", icon: "🦉", earned: true },
  { name: "Early Bird", icon: "🐦", earned: true },
  { name: "Consistent", icon: "📅", earned: true },
  { name: "Mentor", icon: "🧑‍🏫", earned: true },
  { name: "Bug Hunter", icon: "🐛", earned: true },
  { name: "Rising Star", icon: "🌟", earned: true },
  { name: "Problem Crusher", icon: "🔨", earned: true },
  { name: "Market Sage", icon: "🧙", earned: true },
  { name: "Diamond Hands", icon: "💎", earned: true },
  { name: "Risk Master", icon: "🛡️", earned: true },
  { name: "1000 Problems", icon: "🏅", earned: false },
  { name: "100 Day Streak", icon: "🔥", earned: false },
  { name: "Top 1%", icon: "👑", earned: false },
];
