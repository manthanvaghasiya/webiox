
'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [localInput, setLocalInput] = useState('');
  const chat = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm Webiox AI. How can I help you grow your digital presence today?",
      },
    ],
    onError: (error) => {
      console.error('Chat error:', error);
      alert('An error occurred while sending the message: ' + error.message);
    },
  });
  
  useEffect(() => {
    console.log("useChat available methods:", Object.keys(chat));
  }, []);

  const { messages, isLoading } = chat;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a7097] to-[#147a82] p-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Webiox Assistant</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Online 24/7
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-[85%] ${
                      m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        m.role === 'user'
                          ? 'bg-[#1a7097] text-white'
                          : 'bg-gray-100 text-[#1a7097]'
                      }`}
                    >
                      {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm ${
                        m.role === 'user'
                          ? 'bg-[#1a7097] text-white rounded-tr-none'
                          : 'bg-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {/* Note: In a real app, use react-markdown here to parse markdown formatting from the AI */}
                      <span className="whitespace-pre-wrap">{m.content}</span>
                      
                      {/* Tool call indicators */}
                      {m.toolInvocations?.map((toolInvocation) => {
                        const toolCallId = toolInvocation.toolCallId;
                        if (toolInvocation.state === 'result') {
                          return (
                            <div key={toolCallId} className="mt-2 text-xs italic text-gray-500 bg-black/5 p-2 rounded-md">
                              ✓ Saved your details securely.
                            </div>
                          );
                        }
                        return (
                          <div key={toolCallId} className="mt-2 text-xs italic text-gray-500 bg-black/5 p-2 rounded-md flex items-center gap-2">
                            <span className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span> Saving details...
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] flex-row">
                     <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-[#1a7097]">
                        <Bot size={16} />
                     </div>
                     <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none shadow-sm flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                     </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div
                className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[#1a7097]/20 focus-within:border-[#1a7097] transition-all"
              >
                <input
                  className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400"
                  value={localInput}
                  placeholder="Type your message..."
                  onChange={(e) => setLocalInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (!localInput.trim() || isLoading) return;
                      const c = chat as any;
                      if (c.append) c.append({ role: 'user', content: localInput });
                      else if (c.sendMessage) c.sendMessage({ role: 'user', content: localInput });
                      else c.submit?.(localInput);
                      setLocalInput('');
                    }
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!localInput.trim() || isLoading) return;
                    const c = chat as any;
                    if (c.append) c.append({ role: 'user', content: localInput });
                    else if (c.sendMessage) c.sendMessage({ role: 'user', content: localInput });
                    else c.submit?.(localInput);
                    setLocalInput('');
                  }}
                  disabled={!localInput.trim() || isLoading}
                  className="ml-2 text-[#1a7097] disabled:text-gray-300 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400">Powered by Webiox AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-[#1a7097] to-[#1a8891] rounded-full shadow-lg shadow-[#1a7097]/30 flex items-center justify-center text-white"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
