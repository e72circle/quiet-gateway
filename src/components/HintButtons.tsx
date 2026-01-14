interface HintButtonsProps {
  visible: boolean;
  onHintClick: (hint: string) => void;
}

const hints = [
  "Anyone playing tennis tomorrow?",
  "Down for dinner tonight?",
  "Walk later this evening?",
];

const HintButtons = ({ visible, onHintClick }: HintButtonsProps) => {
  return (
    <div
      className={`flex flex-wrap justify-center gap-2 mt-6 transition-all duration-300 ${
        visible ? "opacity-100" : "hints-fade-out"
      }`}
    >
      {hints.map((hint) => (
        <button
          key={hint}
          onClick={() => onHintClick(hint)}
          className="hint-button px-4 py-2 rounded-full text-sm"
          style={{ fontWeight: 300 }}
        >
          {hint}
        </button>
      ))}
    </div>
  );
};

export default HintButtons;
