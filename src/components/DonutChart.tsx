import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useAppContext } from "@/context/AppContext";
import { problems } from "@/data/data";

const DonutChart = () => {
  const { state } = useAppContext();

  const easySolved = problems.filter((p) => p.difficulty === "Easy" && state.problems.solvedIds.includes(p.id)).length;
  const mediumSolved = problems.filter((p) => p.difficulty === "Medium" && state.problems.solvedIds.includes(p.id)).length;
  const hardSolved = problems.filter((p) => p.difficulty === "Hard" && state.problems.solvedIds.includes(p.id)).length;
  const totalSolved = state.problems.solvedIds.length;

  const data = [
    { name: "Easy", value: Math.max(easySolved, 1), color: "hsl(160, 59%, 47%)" },
    { name: "Medium", value: Math.max(mediumSolved, 1), color: "hsl(38, 92%, 50%)" },
    { name: "Hard", value: Math.max(hardSolved, 1), color: "hsl(0, 84%, 60%)" },
  ];

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-32 w-32">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{totalSolved}</div>
            <div className="text-[10px] text-muted-foreground">Solved</div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "hsl(160, 59%, 47%)" }} />
          <span className="text-muted-foreground">Easy</span>
          <span className="font-medium text-foreground">{easySolved}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "hsl(38, 92%, 50%)" }} />
          <span className="text-muted-foreground">Medium</span>
          <span className="font-medium text-foreground">{mediumSolved}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "hsl(0, 84%, 60%)" }} />
          <span className="text-muted-foreground">Hard</span>
          <span className="font-medium text-foreground">{hardSolved}</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
