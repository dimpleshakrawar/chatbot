import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  return (
    <div className="p-4 md:p-6 bg-slate-950/40 backdrop-blur-xl border-t border-slate-800/50 z-10 w-full shrink-0">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end gap-3 w-full rounded-3xl bg-slate-900 border border-slate-700/60 p-1.5 shadow-inner transition-all duration-300 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_15px_rgba(99,102,241,0.15)] focus-within:bg-slate-800/80"
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Nexus Assistant..."
          disabled={disabled}
          rows={1}
          className="flex-1 max-h-[120px] bg-transparent text-slate-100 placeholder:text-slate-500 px-4 py-2.5 outline-none resize-none leading-relaxed text-[15px] custom-scrollbar"
          style={{ minHeight: '44px' }}
        />

        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className={`h-[44px] w-[44px] rounded-full shrink-0 transition-all duration-300 flex items-center justify-center group mb-[1px] mr-[1px]
            ${text.trim() && !disabled
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-95 cursor-pointer'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
        >
          <IoSend size={18} className={`transition-transform duration-300 ${text.trim() && !disabled ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5' : ''}`} />
        </button>
      </form>
      <div className="text-center mt-3 text-[11px] text-slate-500 uppercase tracking-widest font-medium opacity-70">
        Nexus Assistant By AI
      </div>
    </div>
  );
};

export default ChatInput;
