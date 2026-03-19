import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { userStats } from "@/data/data";

const DonutChart = () => {
  const data = [
    { name: "Easy", value: userStats.easySolved, color: "hsl(160, 59%, 47%)" },
    { name: "Medium", value: userStats.mediumSolved, color: "hsl(38, 92%, 50%)" },
    { name: "Hard", value: userStats.hardSolved, color: "hsl(0, 84%, 60%)" },
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
            <div className="text-lg font-bold text-foreground">{userStats.problemsSolved}</div>
            <div className="text-[10px] text-muted-foreground">Solved</div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span className="text-muted-foreground">{d.name}</span>
            <span className="font-medium text-foreground">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
