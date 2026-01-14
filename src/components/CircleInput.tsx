import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

interface CircleInputProps {
  onFocus: () => void;
  onBlur: () => void;
  hasValue: boolean;
  onValueChange: (hasValue: boolean) => void;
  onSend: (content: string) => void;
}

const CircleInput = ({ onFocus, onBlur, onValueChange, onSend }: CircleInputProps) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    onValueChange(value.length > 0);
  }, [value, onValueChange]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="circle-input relative flex items-end rounded-xl border bg-input px-4 py-3">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          placeholder=""
          rows={1}
          className="flex-1 resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base leading-relaxed min-h-[28px] max-h-40"
          style={{ fontWeight: 300 }}
        />
        <button
          onClick={handleSend}
          className={`ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
            value.length > 0
              ? "bg-primary/80 text-primary-foreground"
              : "bg-muted text-muted-foreground cursor-default"
          }`}
          disabled={value.length === 0}
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

export default CircleInput;
