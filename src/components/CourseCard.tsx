import type { Course } from "@/data/data";
import { Play, Clock, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

const gradients = [
  "from-violet-600 to-purple-800",
  "from-blue-600 to-indigo-800",
  "from-emerald-600 to-teal-800",
  "from-orange-500 to-red-700",
  "from-pink-600 to-rose-800",
  "from-cyan-600 to-blue-800",
];

const CourseCard = ({ course }: { course: Course }) => {
  const gradientIdx = course.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length;

  return (
    <div className="rounded-lg bg-card shadow-card border border-border overflow-hidden group transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <div className={`h-40 bg-gradient-to-br ${gradients[gradientIdx]} flex items-center justify-center relative`}>
        <Play className="h-10 w-10 text-white/80 group-hover:scale-110 transition-transform" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="rounded-pill bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white">{course.level}</span>
          {course.free && (
            <span className="rounded-pill bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white">FREE</span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[11px] text-white/80 font-medium">
          <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{course.modules} modules</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-1.5 line-clamp-2 min-h-[2.5rem]">{course.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>
        {course.description && (
          <p className="text-xs text-body-text mb-3 line-clamp-2">{course.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-foreground">
            {course.free ? <span className="text-success">Free</span> : `₹${course.price.toLocaleString("en-IN")}`}
          </span>
          <Button variant="outline" size="sm" className="rounded-button text-xs">
            {course.free ? "Start Learning" : "Learn More"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
