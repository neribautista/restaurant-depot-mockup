import { Bot, ChefHat } from "lucide-react";

export const ChefBot = ({ size = 40 }) => {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Bot size={size} className="text-navy" />
      {/* Position the chef hat over the robot */}
      <ChefHat
        size={size * 0.5}
        className="absolute -top-1 left-1/2 -translate-x-1/2 text-gold-deep"
        fill="currentColor"
      />
    </div>
  );
};