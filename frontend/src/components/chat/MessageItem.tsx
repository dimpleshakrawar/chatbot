import React from 'react';
import type { Message } from './ChatContainer';
import { FaUser } from 'react-icons/fa';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.isUser;

  return (
    <div className={`flex items-end gap-3 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 origin-bottom ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/20">
          <span className="text-[10px] text-white font-bold">AI</span>
        </div>
      )}

      <div className={`max-w-[85%] md:max-w-[75%] group relative flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2.5 text-[15px] leading-relaxed shadow-sm break-words
            ${isUser
              ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-2xl rounded-br-sm'
              : 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-md text-slate-100 rounded-2xl rounded-bl-sm'
            }`}
        >
          {message.text}
        </div>
        <div className="text-[10px] text-slate-500 mt-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-800 mt-auto shrink-0 flex items-center justify-center border border-slate-700">
          <FaUser size={12} className="text-slate-300" />
        </div>
      )}
    </div>
  );
};

export default MessageItem;
