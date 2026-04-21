import React, { useEffect, useRef } from 'react';
import MessageItem from './MessageItem';
import type { Message } from './ChatContainer';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}

      {isTyping && (
        <div className="flex items-start gap-3 animate-pulse text-slate-400">
          <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
            <span className="text-xs">AI</span>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center h-10 w-16">
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
