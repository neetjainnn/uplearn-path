import { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const HeatmapCalendar = () => {
  const { state } = useAppContext();

  const data = useMemo(() => {
    const result: { date: string; count: number }[] = [];
    const now = new Date();
    for (let i = 365; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      result.push({ date: dateStr, count: state.activityLog[dateStr] || 0 });
    }
    return result;
  }, [state.activityLog]);

  const getColor = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count <= 2) return "bg-primary/20";
    if (count <= 4) return "bg-primary/40";
    if (count <= 6) return "bg-primary/70";
    return "bg-primary";
  };

  const weeks: typeof data[] = [];
  const startDay = new Date(data[0].date).getDay();
  let currentWeek: typeof data = [];

  for (let i = 0; i < startDay; i++) {
    currentWeek.push({ date: "", count: -1 });
  }

  data.forEach((d) => {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const totalSubmissions = data.reduce((s, d) => s + d.count, 0);
  const totalActive = data.filter((d) => d.count > 0).length;

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="flex gap-[3px] min-w-[700px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                day.count === -1 ? (
                  <div key={di} className="h-[11px] w-[11px]" />
                ) : (
                  <Tooltip key={di}>
                    <TooltipTrigger asChild>
                      <div className={`h-[11px] w-[11px] rounded-[2px] ${getColor(day.count)} transition-colors`} />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      {day.count} submissions on {day.date}
                    </TooltipContent>
                  </Tooltip>
                )
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        {totalSubmissions} submissions in the past one year · Total active days: {totalActive} · Max streak: {state.user.maxStreak}
      </p>
    </div>
  );
};

export default HeatmapCalendar;
