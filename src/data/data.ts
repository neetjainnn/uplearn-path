// ============================================================
// UPLEARN DATA — Based on real Upstox Uplearn courses & experts
// ============================================================

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string; // gradient placeholder with initials
  courses: number;
  students: string;
}

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
  highlights: string[];
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
  instructorId: string;
  modules: number;
  duration: string;
  price: number;
  bucketId: string;
  thumbnail?: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  free?: boolean;
}

// ============================================================
// INSTRUCTORS — Real Uplearn experts
// ============================================================
export const instructors: Instructor[] = [
  {
    id: "milan-bavishi",
    name: "Milan Bavishi",
    title: "Director of Content, Upstox",
    bio: "Two decades of Indian stock market wisdom. Stints at JM Financial and Ernst & Young. Featured on ET Now, Mint, and Business Standard.",
    avatar: "MB",
    courses: 5,
    students: "85,000+",
  },
  {
    id: "chirag-shah",
    name: "Dr. Chirag Shah",
    title: "Derivatives Expert & Professor",
    bio: "PhD in Financial Derivatives. 15+ years trading stocks and commodities. Conducted workshops for NSE. Visiting faculty at leading B-Schools.",
    avatar: "CS",
    courses: 4,
    students: "62,000+",
  },
  {
    id: "mukta-dhamankar",
    name: "Mukta Dhamankar",
    title: "Full-Time Trader & Analyst",
    bio: "Mumbai-based trader who transitioned to full-time trading 12 years ago. Specializes in volume analysis and technical strategies.",
    avatar: "MD",
    courses: 4,
    students: "48,000+",
  },
  {
    id: "mike-akeroyd",
    name: "Mike Akeroyd",
    title: "VP of Product, Upstox",
    bio: "20 years of trading experience. Previously led a quantitative fund. Worked in Product at Amazon and Disney.",
    avatar: "MA",
    courses: 3,
    students: "35,000+",
  },
  {
    id: "milan-vaishnav",
    name: "Milan Vaishnav",
    title: "CMT, Technical Research Analyst",
    bio: "SEBI-registered research analyst. Expert in wealth creation through technical analysis. Founder of Gemstone Equity Research.",
    avatar: "MV",
    courses: 3,
    students: "42,000+",
  },
  {
    id: "jay-mehta",
    name: "Jay Mehta",
    title: "CFA, Capital Markets Expert",
    bio: "Chartered Financial Analyst with 10 years in capital markets spanning Equity Research, Treasury Management, and Corporate Strategy.",
    avatar: "JM",
    courses: 2,
    students: "28,000+",
  },
  {
    id: "archit-mittal",
    name: "Archit Mittal",
    title: "Algo Trading & AI Mentor",
    bio: "Specializes in building automated trading systems with Python and AI. Leads Uplearn's algo trading and crash course programs.",
    avatar: "AM",
    courses: 2,
    students: "18,000+",
  },
];

// ============================================================
// BUCKETS — Reorganized learning paths based on real Uplearn categories
// ============================================================
export const buckets: Bucket[] = [
  {
    id: "stock-market-basics",
    emoji: "🌱",
    name: "Stock Market Basics",
    description: "Start your stock market journey from scratch — learn how markets work, essential terminology, and your first trades.",
    level: "Beginner",
    hours: 14,
    courses: 4,
    price: 999,
    color: "easy",
    highlights: [
      "How the stock market works",
      "Essential trading terminology",
      "Chart types & basic charting",
      "Your first buy & sell order",
    ],
  },
  {
    id: "technical-analysis",
    emoji: "📈",
    name: "Technical Analysis",
    description: "Master charts, patterns, indicators & price action — from candlesticks to advanced breakout strategies.",
    level: "Beginner–Advanced",
    hours: 32,
    courses: 7,
    price: 2499,
    color: "warning",
    highlights: [
      "Candlestick patterns & chart reading",
      "Support, resistance & trendlines",
      "RSI, MACD, Bollinger Bands",
      "Breakout & reversal strategies",
    ],
  },
  {
    id: "options-trading",
    emoji: "🎯",
    name: "Options Trading",
    description: "From basics to advanced — learn to buy, sell & hedge options like a pro with real strategies.",
    level: "Intermediate–Advanced",
    hours: 28,
    courses: 6,
    price: 3499,
    color: "primary",
    highlights: [
      "Options pricing & Greeks",
      "Call & put strategies",
      "Iron condors, straddles, spreads",
      "Risk management for options",
    ],
  },
  {
    id: "trading-strategies",
    emoji: "⚡",
    name: "Trading & Intraday Strategies",
    description: "Build a complete trading toolkit — portfolio building, intraday setups, and earnings-based strategies.",
    level: "Intermediate",
    hours: 20,
    courses: 5,
    price: 2999,
    color: "hard",
    highlights: [
      "Entry & exit strategies",
      "Portfolio construction",
      "Earnings announcement plays",
      "Intraday momentum trading",
    ],
  },
  {
    id: "investing-strategies",
    emoji: "💎",
    name: "Investing & Wealth Creation",
    description: "Long-term wealth creation through fundamental analysis, business cycles, and smart investing frameworks.",
    level: "Beginner–Intermediate",
    hours: 16,
    courses: 4,
    price: 1999,
    color: "success",
    highlights: [
      "Financial statement analysis",
      "Business cycle investing",
      "Value & growth investing",
      "Portfolio diversification",
    ],
  },
  {
    id: "algo-trading",
    emoji: "🤖",
    name: "Algo Trading & AI",
    description: "Automate your trading with Python, build AI-driven market analytics, and create systematic strategies.",
    level: "Advanced",
    hours: 30,
    courses: 3,
    price: 7999,
    color: "primary",
    highlights: [
      "Python for trading automation",
      "Backtesting frameworks",
      "AI-driven market analytics",
      "Building alerting systems",
    ],
  },
];

// ============================================================
// COURSES — Real Uplearn courses mapped to buckets
// ============================================================
export const courses: Course[] = [
  // Stock Market Basics
  {
    id: "c-intro-stock-market",
    title: "Introduction to Stock Market",
    instructor: "Milan Bavishi",
    instructorId: "milan-bavishi",
    modules: 1,
    duration: "1h 28m",
    price: 0,
    bucketId: "stock-market-basics",
    description: "How the market works, essential terminology, basics of charting, and getting started with trading and investing.",
    level: "Beginner",
    free: true,
  },
  {
    id: "c-complete-stock-trading",
    title: "The Complete Course on Stock Trading",
    instructor: "Milan Bavishi",
    instructorId: "milan-bavishi",
    modules: 4,
    duration: "6h 30m",
    price: 999,
    bucketId: "stock-market-basics",
    description: "Covers basics, charting, breakout patterns (Head & Shoulder, Cup & Handle, Triangles, Flags), RSI indicator, and risk management.",
    level: "Beginner",
  },
  {
    id: "c-basics-stock-trading-breakout",
    title: "Basics of Stock Trading & Breakout Strategy",
    instructor: "Milan Bavishi",
    instructorId: "milan-bavishi",
    modules: 3,
    duration: "3h 45m",
    price: 499,
    bucketId: "stock-market-basics",
    description: "Learn how to identify breakout opportunities and build a basic trading system from scratch.",
    level: "Beginner",
  },
  {
    id: "c-beginners-guide",
    title: "Beginner's Guide to the Stock Market",
    instructor: "Milan Bavishi",
    instructorId: "milan-bavishi",
    modules: 2,
    duration: "2h 15m",
    price: 0,
    bucketId: "stock-market-basics",
    description: "A quick-start guide covering everything a new investor needs to open their first demat account and make their first trade.",
    level: "Beginner",
    free: true,
  },

  // Technical Analysis
  {
    id: "c-basics-technical-analysis",
    title: "Basics of Technical Analysis",
    instructor: "Milan Vaishnav",
    instructorId: "milan-vaishnav",
    modules: 3,
    duration: "4h 20m",
    price: 499,
    bucketId: "technical-analysis",
    description: "Charting fundamentals, market trends, support and resistance levels — the building blocks of technical analysis.",
    level: "Beginner",
  },
  {
    id: "c-wealth-creation-ta",
    title: "Wealth Creation Using Technical Analysis",
    instructor: "Milan Vaishnav",
    instructorId: "milan-vaishnav",
    modules: 3,
    duration: "6h 10m",
    price: 999,
    bucketId: "technical-analysis",
    description: "Advanced technical strategies for long-term wealth creation, combining trend analysis with position management.",
    level: "Intermediate",
  },
  {
    id: "c-volume-analysis",
    title: "Mastering Market Moves with Volume Analysis",
    instructor: "Mukta Dhamankar",
    instructorId: "mukta-dhamankar",
    modules: 1,
    duration: "1h 15m",
    price: 299,
    bucketId: "technical-analysis",
    description: "Learn how to read volume patterns to confirm breakouts, spot reversals, and time your entries perfectly.",
    level: "Intermediate",
  },
  {
    id: "c-macd-indicator",
    title: "Trade Using MACD Indicator",
    instructor: "Mukta Dhamankar",
    instructorId: "mukta-dhamankar",
    modules: 1,
    duration: "1h 30m",
    price: 299,
    bucketId: "technical-analysis",
    description: "Master the MACD indicator for trend identification, signal generation, and divergence trading.",
    level: "Intermediate",
  },
  {
    id: "c-fibonacci-pivot",
    title: "Fibonacci and Pivot Analysis for Trading",
    instructor: "Mukta Dhamankar",
    instructorId: "mukta-dhamankar",
    modules: 2,
    duration: "2h 45m",
    price: 499,
    bucketId: "technical-analysis",
    description: "Optimize your trading with Fibonacci retracement/extension levels and pivot point strategies.",
    level: "Intermediate",
  },
  {
    id: "c-decode-downtrends",
    title: "Technical Tools to Decode Downtrends",
    instructor: "Milan Vaishnav",
    instructorId: "milan-vaishnav",
    modules: 2,
    duration: "3h 00m",
    price: 699,
    bucketId: "technical-analysis",
    description: "Navigate bear markets and downtrends with specialized technical tools and short-selling strategies.",
    level: "Advanced",
  },
  {
    id: "c-investing-volatile",
    title: "Investing in Volatile Markets",
    instructor: "Milan Vaishnav",
    instructorId: "milan-vaishnav",
    modules: 1,
    duration: "1h 40m",
    price: 399,
    bucketId: "technical-analysis",
    description: "Strategies and frameworks for profitable investing during high-volatility market conditions.",
    level: "Advanced",
  },

  // Options Trading
  {
    id: "c-basics-options",
    title: "Basics of Options Trading",
    instructor: "Milan Bavishi",
    instructorId: "milan-bavishi",
    modules: 2,
    duration: "2h 30m",
    price: 0,
    bucketId: "options-trading",
    description: "Understand what options are, how they work, and the fundamental concepts every options trader must know.",
    level: "Beginner",
    free: true,
  },
  {
    id: "c-options-basics-advanced",
    title: "Options Trading Course: Basics to Advanced",
    instructor: "Dr. Chirag Shah",
    instructorId: "chirag-shah",
    modules: 5,
    duration: "14h 20m",
    price: 2499,
    bucketId: "options-trading",
    description: "In just 5 days, learn to buy and sell options like a pro. From basics to advanced techniques with real market examples.",
    level: "Intermediate",
  },
  {
    id: "c-6-options-strategies",
    title: "Learn 6 Options Strategies",
    instructor: "Dr. Chirag Shah",
    instructorId: "chirag-shah",
    modules: 3,
    duration: "4h 45m",
    price: 999,
    bucketId: "options-trading",
    description: "Master six powerful options strategies: covered calls, protective puts, spreads, straddles, and more.",
    level: "Intermediate",
  },
  {
    id: "c-options-essentials",
    title: "Options Trading Essentials",
    instructor: "Mike Akeroyd",
    instructorId: "mike-akeroyd",
    modules: 2,
    duration: "2h 10m",
    price: 499,
    bucketId: "options-trading",
    description: "A practical guide to options trading essentials from a 20-year trading veteran.",
    level: "Beginner",
  },
  {
    id: "c-options-quick-start",
    title: "Options Quick Start Guide",
    instructor: "Milan Bavishi",
    instructorId: "milan-bavishi",
    modules: 1,
    duration: "1h 15m",
    price: 0,
    bucketId: "options-trading",
    description: "Get started with options trading in under 2 hours. Covers the essential concepts and your first options trade.",
    level: "Beginner",
    free: true,
  },
  {
    id: "c-faces-stock-options",
    title: "The Many Faces of Stock Options",
    instructor: "Dr. Chirag Shah",
    instructorId: "chirag-shah",
    modules: 2,
    duration: "3h 00m",
    price: 799,
    bucketId: "options-trading",
    description: "Explore the versatile world of stock options — hedging, speculation, income generation, and portfolio protection.",
    level: "Advanced",
  },

  // Trading & Intraday Strategies
  {
    id: "c-strategies-trading-portfolio",
    title: "Strategies for Trading & Portfolio Building",
    instructor: "Mukta Dhamankar",
    instructorId: "mukta-dhamankar",
    modules: 4,
    duration: "7h 35m",
    price: 1499,
    bucketId: "trading-strategies",
    description: "Plan trades, identify optimal entry/exit points, and find stocks likely to outperform or underperform the market.",
    level: "Intermediate",
  },
  {
    id: "c-earnings-strategies",
    title: "Trading Strategies Around Earnings Announcements",
    instructor: "Mike Akeroyd",
    instructorId: "mike-akeroyd",
    modules: 2,
    duration: "2h 50m",
    price: 699,
    bucketId: "trading-strategies",
    description: "Capitalize on earnings season with proven strategies for pre- and post-announcement trading.",
    level: "Intermediate",
  },
  {
    id: "c-energy-options-mcx",
    title: "Energy Options on MCX",
    instructor: "Mike Akeroyd",
    instructorId: "mike-akeroyd",
    modules: 1,
    duration: "1h 20m",
    price: 399,
    bucketId: "trading-strategies",
    description: "Learn to trade energy options on MCX — crude oil, natural gas, and energy sector derivatives.",
    level: "Advanced",
  },
  {
    id: "c-intraday-momentum",
    title: "Intraday Momentum Trading Masterclass",
    instructor: "Mukta Dhamankar",
    instructorId: "mukta-dhamankar",
    modules: 3,
    duration: "4h 15m",
    price: 999,
    bucketId: "trading-strategies",
    description: "Capture intraday price movements using momentum indicators, VWAP, and level-based scalping strategies.",
    level: "Intermediate",
  },
  {
    id: "c-risk-management-trading",
    title: "Risk Management & Trading Plans",
    instructor: "Milan Bavishi",
    instructorId: "milan-bavishi",
    modules: 2,
    duration: "3h 00m",
    price: 599,
    bucketId: "trading-strategies",
    description: "Build a solid trading plan with stop-losses, position sizing, and risk-reward frameworks.",
    level: "Beginner",
  },

  // Investing & Wealth Creation
  {
    id: "c-financial-statements",
    title: "Financial Statements Made Fun",
    instructor: "Jay Mehta",
    instructorId: "jay-mehta",
    modules: 1,
    duration: "58m",
    price: 0,
    bucketId: "investing-strategies",
    description: "Learn to read balance sheets, income statements, and cash flow statements — the fun way.",
    level: "Beginner",
    free: true,
  },
  {
    id: "c-investing-business-cycles",
    title: "Investing Across Business Cycles",
    instructor: "Jay Mehta",
    instructorId: "jay-mehta",
    modules: 1,
    duration: "35m",
    price: 0,
    bucketId: "investing-strategies",
    description: "Understand how business cycles impact markets and learn to position your portfolio for each phase.",
    level: "Intermediate",
    free: true,
  },
  {
    id: "c-value-investing",
    title: "Value Investing in Indian Markets",
    instructor: "Jay Mehta",
    instructorId: "jay-mehta",
    modules: 3,
    duration: "5h 45m",
    price: 1299,
    bucketId: "investing-strategies",
    description: "Learn the principles of value investing as applied to Indian markets — screening, analysis, and portfolio construction.",
    level: "Intermediate",
  },
  {
    id: "c-long-term-wealth",
    title: "Long-Term Wealth Creation Framework",
    instructor: "Milan Vaishnav",
    instructorId: "milan-vaishnav",
    modules: 4,
    duration: "8h 30m",
    price: 1499,
    bucketId: "investing-strategies",
    description: "A comprehensive framework combining fundamental and technical analysis for building long-term wealth in Indian equities.",
    level: "Intermediate",
  },

  // Algo Trading & AI
  {
    id: "c-algo-trading-bootcamp",
    title: "Algo Trading Bootcamp with Python",
    instructor: "Archit Mittal",
    instructorId: "archit-mittal",
    modules: 8,
    duration: "18h 00m",
    price: 4999,
    bucketId: "algo-trading",
    description: "Build automated trading systems from scratch using Python. Covers data fetching, strategy coding, backtesting, and deployment.",
    level: "Advanced",
  },
  {
    id: "c-ai-market-analytics",
    title: "AI-Driven Market Analytics & Alerting Systems",
    instructor: "Archit Mittal",
    instructorId: "archit-mittal",
    modules: 12,
    duration: "10h 00m",
    price: 3999,
    bucketId: "algo-trading",
    description: "Turn your strategies into working systems that actually run efficiently. Build AI-powered analytics and real-time alerting.",
    level: "Advanced",
  },
  {
    id: "c-quant-strategies",
    title: "Quantitative Trading Strategies",
    instructor: "Mike Akeroyd",
    instructorId: "mike-akeroyd",
    modules: 3,
    duration: "5h 30m",
    price: 1999,
    bucketId: "algo-trading",
    description: "Learn quantitative approaches to trading — factor models, mean reversion, momentum strategies, and statistical arbitrage.",
    level: "Advanced",
  },
];

// ============================================================
// PROBLEMS — Trading practice problems mapped to new buckets
// ============================================================
export const problems: Problem[] = [
  // Stock Market Basics
  { id: 1, title: "What is a Demat Account?", bucket: "Stock Market Basics", difficulty: "Easy", acceptance: 92, status: "solved", tags: ["Basics"] },
  { id: 2, title: "Market Order vs Limit Order", bucket: "Stock Market Basics", difficulty: "Easy", acceptance: 88, status: "solved", tags: ["Basics", "Order Types"] },

  // Technical Analysis
  { id: 3, title: "Identify the Doji Pattern", bucket: "Technical Analysis", difficulty: "Easy", acceptance: 78, status: "solved", tags: ["Candlestick", "Chart Patterns"] },
  { id: 4, title: "Bull Trap or Breakout?", bucket: "Technical Analysis", difficulty: "Medium", acceptance: 54, status: "attempted", tags: ["Chart Patterns", "Candlestick"] },
  { id: 5, title: "RSI Divergence Signal", bucket: "Technical Analysis", difficulty: "Medium", acceptance: 49, status: "unsolved", tags: ["Indicators"] },
  { id: 6, title: "Identify Head & Shoulders", bucket: "Technical Analysis", difficulty: "Hard", acceptance: 38, status: "unsolved", tags: ["Chart Patterns"] },
  { id: 7, title: "Moving Average Crossover", bucket: "Technical Analysis", difficulty: "Easy", acceptance: 71, status: "solved", tags: ["Indicators"] },
  { id: 8, title: "MACD Histogram Analysis", bucket: "Technical Analysis", difficulty: "Medium", acceptance: 52, status: "attempted", tags: ["Indicators"] },
  { id: 9, title: "Fibonacci Retracement Levels", bucket: "Technical Analysis", difficulty: "Hard", acceptance: 29, status: "unsolved", tags: ["Chart Patterns"] },
  { id: 10, title: "Bollinger Band Squeeze", bucket: "Technical Analysis", difficulty: "Hard", acceptance: 33, status: "unsolved", tags: ["Indicators"] },
  { id: 11, title: "Identify Support & Resistance", bucket: "Technical Analysis", difficulty: "Easy", acceptance: 74, status: "solved", tags: ["Chart Patterns"] },
  { id: 12, title: "Volume Spike Interpretation", bucket: "Technical Analysis", difficulty: "Medium", acceptance: 56, status: "unsolved", tags: ["Indicators", "Volume"] },

  // Options Trading
  { id: 13, title: "Options Greeks Calculator", bucket: "Options Trading", difficulty: "Hard", acceptance: 22, status: "unsolved", tags: ["Options", "Greeks"] },
  { id: 14, title: "Iron Condor Setup", bucket: "Options Trading", difficulty: "Hard", acceptance: 28, status: "unsolved", tags: ["Options", "Strategy"] },
  { id: 15, title: "Call vs Put — Which to Buy?", bucket: "Options Trading", difficulty: "Easy", acceptance: 76, status: "solved", tags: ["Options"] },
  { id: 16, title: "Calculate Option Premium", bucket: "Options Trading", difficulty: "Medium", acceptance: 48, status: "attempted", tags: ["Options", "Greeks"] },

  // Trading Strategies
  { id: 17, title: "Scalp or Hold? 5-min Chart", bucket: "Trading & Intraday Strategies", difficulty: "Hard", acceptance: 31, status: "unsolved", tags: ["Intraday", "Candlestick"] },
  { id: 18, title: "Gap Up or Gap Down?", bucket: "Trading & Intraday Strategies", difficulty: "Medium", acceptance: 45, status: "unsolved", tags: ["Intraday"] },
  { id: 19, title: "Build a Stop-Loss Strategy", bucket: "Trading & Intraday Strategies", difficulty: "Easy", acceptance: 82, status: "solved", tags: ["Risk"] },
  { id: 20, title: "Position Sizing Formula", bucket: "Trading & Intraday Strategies", difficulty: "Medium", acceptance: 58, status: "solved", tags: ["Risk"] },

  // Investing
  { id: 21, title: "Calculate P/E Intrinsic Value", bucket: "Investing & Wealth Creation", difficulty: "Medium", acceptance: 61, status: "unsolved", tags: ["Valuation"] },
  { id: 22, title: "Read a Balance Sheet", bucket: "Investing & Wealth Creation", difficulty: "Easy", acceptance: 88, status: "solved", tags: ["Valuation"] },
  { id: 23, title: "Debt-to-Equity Analysis", bucket: "Investing & Wealth Creation", difficulty: "Easy", acceptance: 80, status: "solved", tags: ["Valuation"] },
  { id: 24, title: "DCF Valuation Model", bucket: "Investing & Wealth Creation", difficulty: "Hard", acceptance: 27, status: "unsolved", tags: ["Valuation"] },
  { id: 25, title: "Sector Rotation Strategy", bucket: "Investing & Wealth Creation", difficulty: "Medium", acceptance: 58, status: "attempted", tags: ["Strategy"] },

  // Algo Trading
  { id: 26, title: "Backtest a Moving Average Strategy", bucket: "Algo Trading & AI", difficulty: "Hard", acceptance: 25, status: "unsolved", tags: ["Python", "Strategy"] },
  { id: 27, title: "Build a Simple Trading Bot", bucket: "Algo Trading & AI", difficulty: "Hard", acceptance: 18, status: "unsolved", tags: ["Python", "Automation"] },
  { id: 28, title: "Calculate Sharpe Ratio in Python", bucket: "Algo Trading & AI", difficulty: "Medium", acceptance: 42, status: "attempted", tags: ["Python", "Risk"] },
];

// ============================================================
// CONTESTS
// ============================================================
export const contests: Contest[] = [
  {
    id: "contest-14",
    title: "Options Showdown — Week 14",
    description: "Pick the best options strategy for 5 market scenarios. Highest portfolio return wins.",
    status: "upcoming",
    date: "Starts Mar 29 | 10:00 AM",
    participants: 1567,
  },
  {
    id: "contest-13",
    title: "Market Masters — Week 13",
    description: "Trade with ₹1,00,000 virtual capital. Best P&L wins.",
    status: "active",
    date: "Mar 22 — Mar 23 | Live Now",
    participants: 2341,
  },
  {
    id: "contest-12",
    title: "Breakout Challenge — Week 12",
    description: "Identify breakout stocks and ride the momentum.",
    status: "ended",
    date: "Mar 15 — Mar 16",
    participants: 2105,
    leaderboard: [
      { rank: 1, username: "TraderAce99", pnl: "+18.4%", score: 2450 },
      { rank: 2, username: "NiftyNinja", pnl: "+15.2%", score: 2280 },
      { rank: 3, username: "BullRunKing", pnl: "+12.7%", score: 2100 },
      { rank: 4, username: "OptionsGuru", pnl: "+11.3%", score: 1980 },
      { rank: 5, username: "ChartWhiz", pnl: "+9.8%", score: 1850 },
    ],
  },
  {
    id: "contest-11",
    title: "Scalper's Arena — Week 11",
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

// ============================================================
// SUBSCRIPTION PLANS — Real Uplearn pricing
// ============================================================
export interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string;
  price: number;
  perMonth: number;
  features: string[];
  popular?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "prime",
    name: "Prime",
    duration: "3 months",
    price: 999,
    perMonth: 333,
    features: [
      "Unlimited access to 50+ courses",
      "Live webinar recordings",
      "Practice problems",
      "Email support",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    duration: "6 months",
    price: 1499,
    perMonth: 250,
    features: [
      "Everything in Prime",
      "Contest participation",
      "Weekly live Q&A sessions",
      "Priority email support",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    duration: "12 months",
    price: 2499,
    perMonth: 208,
    features: [
      "Everything in Elite",
      "1-on-1 mentorship sessions",
      "Algo trading tools access",
      "Certificate on completion",
      "Lifetime community access",
    ],
  },
];

// ============================================================
// USER STATS
// ============================================================
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

// ============================================================
// HEATMAP DATA GENERATOR
// ============================================================
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

// ============================================================
// BADGES
// ============================================================
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
