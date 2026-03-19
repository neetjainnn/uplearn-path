import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

interface Props {
  badge: { name: string; icon: string } | null;
  onClose: () => void;
}

const BadgeCelebration = ({ badge, onClose }: Props) => {
  useEffect(() => {
    if (badge) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6C3CE1", "#3D1E8F", "#F0ECFB", "#22C55E", "#F59E0B"],
      });
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-card p-8 text-center max-w-sm animate-fade-in">
        <span className="text-6xl block mb-4">{badge.icon}</span>
        <h2 className="text-2xl font-bold text-foreground mb-2">Badge Unlocked!</h2>
        <p className="text-lg font-semibold text-primary mb-4">{badge.name}</p>
        <Button onClick={onClose} className="rounded-button">Awesome!</Button>
      </div>
    </div>
  );
};

export default BadgeCelebration;
