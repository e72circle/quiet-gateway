import { Menu } from "lucide-react";

interface CircleSwitcherProps {
  onClick: () => void;
}

const CircleSwitcher = ({ onClick }: CircleSwitcherProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-muted/60 md:hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      }}
      aria-label="Switch Circle"
    >
      <Menu className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
    </button>
  );
};

export default CircleSwitcher;
