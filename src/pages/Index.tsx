import { useState, useCallback } from "react";
import CircleInput from "@/components/CircleInput";
import HintButtons from "@/components/HintButtons";
import ChatMessage from "@/components/ChatMessage";
import CircleSwitcher from "@/components/CircleSwitcher";
import CircleOverlay from "@/components/CircleOverlay";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const Index = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [activeCircle, setActiveCircle] = useState("ebras-friends");

  const hasMessages = messages.length > 0;
  const showHints = !isFocused && !hasValue && !hasMessages;

  const handleHintClick = useCallback((hint: string) => {
    console.log("Hint selected:", hint);
  }, []);

  const handleSend = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Simulate response after a brief delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Hello! How can I help you today?",
        isUser: false,
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 300);
  }, []);

  return (
    <div className="gradient-backdrop min-h-screen flex relative overflow-hidden">
      {/* Circle Sidebar/Overlay */}
      <CircleOverlay
        isOpen={isOverlayOpen}
        activeCircle={activeCircle}
        onSelectCircle={setActiveCircle}
        onClose={() => setIsOverlayOpen(false)}
      />
      
      {/* Main content wrapper */}
      <div 
        className={`
          flex-1 min-h-screen flex flex-col px-6 transition-transform duration-300 ease-out relative
          md:transition-none md:transform-none
        `}
        style={{
          transform: isOverlayOpen ? 'translateX(16rem)' : 'translateX(0)',
        }}
      >
        {/* Circle Switcher - inside the sliding container so it moves with content */}
        <CircleSwitcher onClick={() => setIsOverlayOpen(true)} isOverlayOpen={isOverlayOpen} />
        
        {/* Wordmark - fixed at top */}
        <div className="pt-12 flex justify-center flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <img 
            src="/assets/27-circle-logo.png" 
            alt="27 Circle" 
            className="h-4 w-auto opacity-70"
          />
          <span 
            className="text-muted-foreground text-lg tracking-wide"
            style={{ fontWeight: 300 }}
          >
            circle
          </span>
        </div>
      </div>

      {/* Main chat container - flex column */}
      <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto min-h-0">
        {/* Top spacer - shrinks to 0 instantly when messages exist */}
        <div 
          style={{ flex: hasMessages ? '0 0 0px' : '1 1 0px' }}
        />

        {/* Messages area - at top, grows downward */}
        {hasMessages && (
          <div className="overflow-y-auto flex-1 pt-4">
            <div className="space-y-3 px-1">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                />
              ))}
            </div>
          </div>
        )}

        {/* Input area - always at natural position */}
        <div className="py-6 flex flex-col items-center flex-shrink-0">
          <CircleInput
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            hasValue={hasValue}
            onValueChange={setHasValue}
            onSend={handleSend}
          />
          <HintButtons visible={showHints} onHintClick={handleHintClick} />
        </div>

        {/* Bottom spacer - shrinks to 0 instantly when messages exist */}
        <div 
          style={{ flex: hasMessages ? '0 0 0px' : '1 1 0px' }}
        />
        </div>
      </div>
    </div>
  );
};

export default Index;
