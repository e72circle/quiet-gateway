import { Star, TreePine, Bell } from "lucide-react";

interface Circle {
  id: string;
  name: string;
  icon: React.ElementType;
}

const circles: Circle[] = [
  { id: "ebras-friends", name: "Ebra's Friends", icon: Star },
  { id: "stanford-lsa", name: "Stanford LSA", icon: TreePine },
  { id: "bell-street", name: "Bell Street Neighbors", icon: Bell },
];

interface CircleOverlayProps {
  isOpen: boolean;
  activeCircle: string;
  onSelectCircle: (id: string) => void;
  onClose: () => void;
}

const CircleOverlay = ({ isOpen, activeCircle, onSelectCircle, onClose }: CircleOverlayProps) => {
  return (
    <>
      {/* Mobile backdrop - only shows on small screens when overlay is open */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0, 0, 0, 0.02)' }}
        onClick={onClose}
      />
      
      {/* Sidebar/Overlay panel */}
      <div
        className={`
          fixed top-0 left-0 h-full z-40 bg-background transition-transform duration-300 ease-out
          md:relative md:translate-x-0 md:z-auto md:flex-shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          width: '16rem',
          borderRight: '1px solid rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="pt-8 md:pt-12 px-5">
          <nav className="space-y-1">
            {circles.map((circle) => {
              const Icon = circle.icon;
              const isActive = activeCircle === circle.id;
              
              return (
                <button
                  key={circle.id}
                  onClick={() => {
                    onSelectCircle(circle.id);
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-left ${
                    isActive 
                      ? 'bg-muted/60' 
                      : 'hover:bg-muted/40'
                  }`}
                >
                  <Icon 
                    className={`w-4 h-4 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`} 
                    strokeWidth={1.5} 
                  />
                  <span 
                    className={`text-sm tracking-tight ${
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                    style={{ fontWeight: isActive ? 450 : 400 }}
                  >
                    {circle.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default CircleOverlay;
