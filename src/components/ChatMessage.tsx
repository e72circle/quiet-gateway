interface ChatMessageProps {
  content: string;
  isUser: boolean;
}

const ChatMessage = ({ content, isUser }: ChatMessageProps) => {
  if (isUser) {
    const isShort = content.length < 40;
    return (
      <div className="flex justify-end">
        <div 
          className={`user-message ${isShort ? 'px-3.5 py-2' : 'px-4 py-2.5'}`}
          style={{ 
            maxWidth: isShort ? '16rem' : '22rem',
            borderRadius: isShort ? '1rem 0.375rem 1rem 1rem' : '1.125rem 0.5rem 1.125rem 1.125rem'
          }}
        >
          <span className="text-foreground text-sm tracking-tight" style={{ fontWeight: 400 }}>
            {content}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="system-message max-w-lg py-1">
        <p className="text-muted-foreground text-base leading-relaxed tracking-tight" style={{ fontWeight: 400 }}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
