import type { Course } from "@/data/data";
import { Play, Clock } from "lucide-react";
import { Button } from "./ui/button";

const CourseCard = ({ course }: { course: Course }) => (
  <div className="rounded-lg bg-card shadow-card border border-border overflow-hidden group transition-all duration-200 hover:shadow-lg">
    <div className="h-40 bg-gradient-to-br from-primary-deep to-primary flex items-center justify-center relative">
      <Play className="h-10 w-10 text-primary-foreground/80 group-hover:scale-110 transition-transform" />
      <div className="absolute bottom-3 left-3 text-xs text-primary-foreground/80 font-medium">{course.modules} modules</div>
    </div>
    <div className="p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">{course.title}</h3>
      <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />{course.duration}
        </div>
        <span className="text-sm font-bold text-foreground">₹{course.price}</span>
      </div>
      <Button variant="outline" size="sm" className="w-full mt-3 rounded-button text-xs">
        Learn More
      </Button>
    </div>
  </div>
);

export default CourseCard;
