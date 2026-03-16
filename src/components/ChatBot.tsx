'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { FiSend, FiX } from 'react-icons/fi';
import { BsChatDots } from 'react-icons/bs';
import { useLocale } from '@/lib/LocaleContext';

const MAX_USER_MESSAGES = 15;
const STORAGE_KEY = 'trangpham-chat-count';

type DisplayMessage = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  quickReplies?: string[];
};

type ApiMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const text = {
  vi: {
    title: 'Trợ lý mua hàng',
    subtitle: 'AI · Online',
    placeholder: 'Nhập tin nhắn...',
    welcome: 'Xin chào! 👋 Tôi là trợ lý mua hàng AI của Trang Pham Cosmetics. Hãy hỏi tôi về sản phẩm, skincare, hoặc đặt hàng!',
    quickReplies: ['Tìm sản phẩm', 'Tư vấn skincare', 'Xem khuyến mãi', 'Hỗ trợ đặt hàng'],
    limitReached: 'Bạn đã sử dụng hết lượt chat miễn phí cho phiên này. Để được tư vấn thêm, hãy nhắn tin cho chúng tôi qua Facebook nhé! 💬',
    limitCta: 'Nhắn tin Facebook',
    typing: 'Đang trả lời...',
    error: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ qua Facebook.',
    remaining: 'tin nhắn còn lại',
  },
  cs: {
    title: 'Nákupní asistent',
    subtitle: 'AI · Online',
    placeholder: 'Napište zprávu...',
    welcome: 'Dobrý den! 👋 Jsem AI nákupní asistent Trang Pham Cosmetics. Zeptejte se mě na produkty, skincare nebo objednávky!',
    quickReplies: ['Hledat produkt', 'Poradit skincare', 'Zobrazit akce', 'Pomoc s objednávkou'],
    limitReached: 'Vyčerpali jste bezplatné zprávy pro tuto relaci. Pro další poradenství nám napište na Facebook! 💬',
    limitCta: 'Napsat na Facebook',
    typing: 'Odpovídám...',
    error: 'Omlouváme se, došlo k chybě. Zkuste to znovu nebo nás kontaktujte přes Facebook.',
    remaining: 'zpráv zbývá',
  },
  en: {
    title: 'Shopping Assistant',
    subtitle: 'AI · Online',
    placeholder: 'Type a message...',
    welcome: 'Hello! 👋 I\'m the Trang Pham Cosmetics AI shopping assistant. Ask me about products, skincare, or ordering!',
    quickReplies: ['Find products', 'Skincare advice', 'View promotions', 'Order help'],
    limitReached: 'You\'ve used all free messages for this session. For more help, message us on Facebook! 💬',
    limitCta: 'Message on Facebook',
    typing: 'Replying...',
    error: 'Sorry, something went wrong. Please try again or contact us via Facebook.',
    remaining: 'messages left',
  },
};

let msgId = 0;
function createMsg(role: 'bot' | 'user', content: string, quickReplies?: string[]): DisplayMessage {
  return { id: `msg-${++msgId}`, role, text: content, quickReplies };
}

function getUsedCount(): number {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  } catch {
    return 0;
  }
}

function incrementCount(): number {
  try {
    const next = getUsedCount() + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
}

export default function ChatBot() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [apiHistory, setApiHistory] = useState<ApiMessage[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usedCount, setUsedCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const tx = text[locale] || text.en;
  const remaining = MAX_USER_MESSAGES - usedCount;
  const limitReached = remaining <= 0;

  // Load count from storage
  useEffect(() => {
    setUsedCount(getUsedCount());
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (open && !initialized) {
      setMessages([createMsg('bot', tx.welcome, tx.quickReplies)]);
      setInitialized(true);
    }
  }, [open, initialized, tx]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const callApi = useCallback(async (userText: string, history: ApiMessage[]) => {
    const newHistory: ApiMessage[] = [...history, { role: 'user', content: userText }];

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      const reply = data.reply || tx.error;

      setApiHistory([...newHistory, { role: 'assistant', content: reply }]);
      setMessages(prev => [...prev, createMsg('bot', reply)]);
    } catch {
      setMessages(prev => [...prev, createMsg('bot', tx.error)]);
    } finally {
      setLoading(false);
    }
  }, [tx.error]);

  const handleSend = useCallback((msg?: string) => {
    const userText = msg || input.trim();
    if (!userText || loading || limitReached) return;

    // Add user message
    setMessages(prev => [...prev, createMsg('user', userText)]);
    setInput('');
    setLoading(true);

    // Increment count
    const newCount = incrementCount();
    setUsedCount(newCount);

    // Check if this was the last allowed message
    if (newCount >= MAX_USER_MESSAGES) {
      setTimeout(() => {
        setMessages(prev => [...prev, createMsg('bot', tx.limitReached)]);
        setLoading(false);
      }, 400);
      return;
    }

    // Call API
    callApi(userText, apiHistory);
  }, [input, loading, limitReached, apiHistory, callApi, tx.limitReached]);

  return (
    <>
      {/* Chat toggle button - positioned above FloatingContact */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          open
            ? 'bg-charcoal text-white bottom-6 right-6'
            : 'bg-sage text-white hover:bg-sage-dark bottom-[88px] right-[26px]'
        }`}
        aria-label="Chat"
      >
        {open ? <FiX size={20} /> : <BsChatDots size={18} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[min(500px,70vh)] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col animate-slideUp">
          {/* Header */}
          <div className="bg-sage px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
              TP
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">{tx.title}</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                {tx.subtitle}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                  <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-sage text-white rounded-br-md'
                      : 'bg-sage-lightest text-charcoal rounded-bl-md'
                  }`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Quick replies */}
                  {msg.quickReplies && !limitReached && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleSend(reply)}
                          className="text-xs bg-white border border-sage-dark text-sage-darker px-3 py-1.5 rounded-full hover:bg-sage-lightest transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-sage-lightest text-charcoal rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    <span className="text-xs text-text-muted ml-1">{tx.typing}</span>
                  </span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input / Limit reached */}
          <div className="border-t border-border p-3 shrink-0">
            {limitReached ? (
              <div className="text-center">
                <a
                  href="https://www.facebook.com/trangptt.2011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#166FE5] transition-colors"
                >
                  {tx.limitCta}
                </a>
              </div>
            ) : (
              <>
                <form
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={tx.placeholder}
                    disabled={loading}
                    className="flex-1 border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="w-10 h-10 bg-sage text-white rounded-full flex items-center justify-center hover:bg-sage-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                  >
                    <FiSend size={16} />
                  </button>
                </form>
                {remaining <= 5 && remaining > 0 && (
                  <p className="text-[10px] text-text-muted text-center mt-1.5">
                    {remaining} {tx.remaining}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
