'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FiMessageCircle, FiX, FiSend, FiShoppingBag } from 'react-icons/fi';
import { useLocale } from '@/lib/LocaleContext';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/lib/ToastContext';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/types';

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  products?: Product[];
  quickReplies?: string[];
};

const text = {
  vi: {
    title: 'Trợ lý mua hàng',
    subtitle: 'Online',
    placeholder: 'Nhập tin nhắn...',
    welcome: 'Xin chào! 👋 Tôi là trợ lý mua hàng của Trang Pham Cosmetics. Tôi có thể giúp bạn:',
    quickReplies: ['Tìm sản phẩm', 'Tư vấn skincare', 'Xem khuyến mãi', 'Hỗ trợ đặt hàng'],
    noResults: 'Không tìm thấy sản phẩm phù hợp. Bạn có thể thử từ khóa khác hoặc liên hệ qua Facebook để được tư vấn trực tiếp.',
    foundProducts: 'Tôi tìm thấy {count} sản phẩm phù hợp:',
    addedToCart: 'Đã thêm vào giỏ!',
    skincare: 'Bạn quan tâm đến loại sản phẩm skincare nào?',
    skincareReplies: ['Tẩy trang', 'Sữa rửa mặt', 'Toner', 'Serum', 'Kem dưỡng', 'Chống nắng', 'Mặt nạ'],
    promo: '🔥 Hiện tại chúng tôi có:\n• Miễn phí ship từ 1.500 CZK\n• Giảm 10% đơn đầu với mã WELCOME10\n• Flash Sale skincare Hàn Quốc giảm đến 30%!\n\nBạn muốn xem sản phẩm nào?',
    orderHelp: 'Để đặt hàng, bạn có thể:\n1. Thêm sản phẩm vào giỏ hàng trên web\n2. Liên hệ qua Facebook: fb.com/trangptt.2011\n3. Gọi/Zalo: (+420) 607 715 020\n\nBạn cần hỗ trợ gì thêm?',
    orderReplies: ['Xem giỏ hàng', 'Tìm sản phẩm', 'Liên hệ Facebook'],
    viewAll: 'Xem tất cả',
    addToCart: 'Thêm vào giỏ',
  },
  cs: {
    title: 'Nákupní asistent',
    subtitle: 'Online',
    placeholder: 'Napište zprávu...',
    welcome: 'Dobrý den! 👋 Jsem nákupní asistent Trang Pham Cosmetics. Mohu vám pomoci s:',
    quickReplies: ['Hledat produkt', 'Poradit se skincare', 'Zobrazit akce', 'Pomoc s objednávkou'],
    noResults: 'Nenašel jsem žádný vhodný produkt. Zkuste jiné klíčové slovo nebo nás kontaktujte přes Facebook.',
    foundProducts: 'Našel jsem {count} produktů:',
    addedToCart: 'Přidáno do košíku!',
    skincare: 'O jaký typ skincare produktu máte zájem?',
    skincareReplies: ['Odličování', 'Čistící pěna', 'Toner', 'Sérum', 'Krém', 'Opalovací krém', 'Maska'],
    promo: '🔥 Aktuální nabídky:\n• Doprava zdarma od 1.500 Kč\n• 10% sleva na první objednávku s kódem WELCOME10\n• Flash Sale korejské kosmetiky až 30% sleva!\n\nCo byste chtěli vidět?',
    orderHelp: 'Pro objednávku můžete:\n1. Přidat produkty do košíku na webu\n2. Kontaktovat přes Facebook: fb.com/trangptt.2011\n3. Volat/Zalo: (+420) 607 715 020\n\nPotřebujete další pomoc?',
    orderReplies: ['Zobrazit košík', 'Hledat produkt', 'Kontaktovat Facebook'],
    viewAll: 'Zobrazit vše',
    addToCart: 'Do košíku',
  },
  en: {
    title: 'Shopping Assistant',
    subtitle: 'Online',
    placeholder: 'Type a message...',
    welcome: 'Hello! 👋 I\'m the Trang Pham Cosmetics shopping assistant. I can help you with:',
    quickReplies: ['Find products', 'Skincare advice', 'View promotions', 'Order help'],
    noResults: 'No matching products found. Try different keywords or contact us via Facebook for personal assistance.',
    foundProducts: 'I found {count} matching products:',
    addedToCart: 'Added to cart!',
    skincare: 'What type of skincare product are you interested in?',
    skincareReplies: ['Oil Cleanser', 'Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Sheet Mask'],
    promo: '🔥 Current promotions:\n• Free shipping over 1,500 CZK\n• 10% OFF first order with code WELCOME10\n• Flash Sale on Korean skincare up to 30% off!\n\nWhat would you like to see?',
    orderHelp: 'To place an order, you can:\n1. Add products to cart on the website\n2. Contact via Facebook: fb.com/trangptt.2011\n3. Call/Zalo: (+420) 607 715 020\n\nNeed anything else?',
    orderReplies: ['View cart', 'Find products', 'Contact Facebook'],
    viewAll: 'View all',
    addToCart: 'Add to cart',
  },
};

// Keyword mapping for product search
const categoryKeywords: Record<string, string[]> = {
  'oil-cleanser': ['tẩy trang', 'odličování', 'oil cleanser', 'cleansing oil', 'makeup remover'],
  'water-cleanser': ['sữa rửa mặt', 'rửa mặt', 'čisticí', 'cleanser', 'foam', 'gel'],
  'toner': ['toner', 'tonery'],
  'toner-pad': ['toner pad', 'pad'],
  'serum': ['serum', 'tinh chất', 'séra', 'esence', 'essence', 'ampoule'],
  'moisturizer': ['kem dưỡng', 'dưỡng ẩm', 'krém', 'moistur', 'cream'],
  'sunscreen': ['chống nắng', 'kem chống nắng', 'sunscreen', 'spf', 'opalovací', 'sun'],
  'eye-care': ['kem mắt', 'eye', 'oční'],
  'mask': ['mặt nạ', 'mask', 'sheet mask', 'maska'],
  'treatment': ['đặc trị', 'treatment', 'acne', 'mụn', 'spot'],
  'lip-care': ['dưỡng môi', 'lip', 'rty'],
  'face': ['makeup', 'trang điểm', 'foundation', 'cushion', 'bb', 'cc', 'concealer', 'powder'],
  'lips': ['son', 'lipstick', 'lip tint', 'rty', 'rtěnka'],
  'eyes': ['mascara', 'eyeliner', 'eyeshadow', 'brow', 'lông mi', 'kẻ mắt'],
  'body': ['body', 'dưỡng thể', 'tělový'],
  'haircare': ['tóc', 'hair', 'shampoo', 'vlasy', 'šampon'],
  'fragrance': ['nước hoa', 'parfém', 'fragrance', 'perfume'],
};

function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();

  // Check category keywords first
  for (const [subId, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(kw => q.includes(kw))) {
      return products.filter(p => p.subcategory === subId || p.category === subId).slice(0, 4);
    }
  }

  // Fallback to name/brand search
  return products
    .filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.group.toLowerCase().includes(q)
    )
    .slice(0, 4);
}

let msgId = 0;
function createMsg(role: 'bot' | 'user', text: string, products?: Product[], quickReplies?: string[]): Message {
  return { id: `msg-${++msgId}`, role, text, products, quickReplies };
}

export default function ChatBot() {
  const { locale } = useLocale();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [initialized, setInitialized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const tx = text[locale] || text.en;

  // Initialize with welcome message
  useEffect(() => {
    if (open && !initialized) {
      setMessages([createMsg('bot', tx.welcome, undefined, tx.quickReplies)]);
      setInitialized(true);
    }
  }, [open, initialized, tx]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleBotResponse = (userText: string) => {
    const q = userText.toLowerCase();

    // Check for skincare advice
    if (q.includes('tư vấn') || q.includes('skincare') || q.includes('poradit') || q.includes('advice')) {
      setMessages(prev => [...prev, createMsg('bot', tx.skincare, undefined, tx.skincareReplies)]);
      return;
    }

    // Check for promotions
    if (q.includes('khuyến mãi') || q.includes('sale') || q.includes('akce') || q.includes('promo') || q.includes('giảm')) {
      setMessages(prev => [...prev, createMsg('bot', tx.promo)]);
      return;
    }

    // Check for order help
    if (q.includes('đặt hàng') || q.includes('order') || q.includes('objednávk') || q.includes('hỗ trợ') || q.includes('pomoc')) {
      setMessages(prev => [...prev, createMsg('bot', tx.orderHelp, undefined, tx.orderReplies)]);
      return;
    }

    // Check for cart
    if (q.includes('giỏ hàng') || q.includes('košík') || q.includes('cart')) {
      setMessages(prev => [...prev, createMsg('bot',
        locale === 'vi' ? 'Bạn có thể xem giỏ hàng tại đây 👇' :
        locale === 'cs' ? 'Košík si můžete prohlédnout zde 👇' :
        'You can view your cart here 👇'
      )]);
      return;
    }

    // Check for Facebook contact
    if (q.includes('facebook') || q.includes('fb') || q.includes('liên hệ') || q.includes('kontakt') || q.includes('contact')) {
      setMessages(prev => [...prev, createMsg('bot',
        locale === 'vi' ? 'Liên hệ Facebook: fb.com/trangptt.2011\nĐiện thoại/Zalo: (+420) 607 715 020\nEmail: info@trangphamcosmetics.cz' :
        locale === 'cs' ? 'Facebook: fb.com/trangptt.2011\nTelefon/Zalo: (+420) 607 715 020\nEmail: info@trangphamcosmetics.cz' :
        'Facebook: fb.com/trangptt.2011\nPhone/Zalo: (+420) 607 715 020\nEmail: info@trangphamcosmetics.cz'
      )]);
      return;
    }

    // Search products
    const found = searchProducts(userText);
    if (found.length > 0) {
      setMessages(prev => [...prev, createMsg('bot', tx.foundProducts.replace('{count}', String(found.length)), found)]);
    } else {
      setMessages(prev => [...prev, createMsg('bot', tx.noResults)]);
    }
  };

  const handleSend = (msg?: string) => {
    const userText = msg || input.trim();
    if (!userText) return;

    setMessages(prev => [...prev, createMsg('user', userText)]);
    setInput('');

    // Simulate typing delay
    setTimeout(() => handleBotResponse(userText), 400);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast(tx.addedToCart);
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-charcoal text-white rotate-0' : 'bg-sage text-white hover:bg-sage-dark'
        }`}
        aria-label="Chat"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-36 right-4 z-50 w-[340px] sm:w-[380px] max-h-[500px] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col animate-slideUp">
          {/* Header */}
          <div className="bg-sage px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
              TP
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{tx.title}</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                {tx.subtitle}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[340px]">
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

                  {/* Product cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.products.map(p => (
                        <div key={p.id} className="bg-white border border-border rounded-xl p-3 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-sage-lightest flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-sage-darker">{(p.brand || p.name).charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${p.slug}`}
                              className="text-xs font-medium text-charcoal hover:text-sage-darker line-clamp-1"
                              onClick={() => setOpen(false)}
                            >
                              {p.name}
                            </Link>
                            <p className="text-xs font-bold text-charcoal mt-0.5">{formatPrice(p.price)}</p>
                          </div>
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="w-8 h-8 bg-charcoal text-white rounded-full flex items-center justify-center shrink-0 active:bg-charcoal-light transition-colors"
                            aria-label={tx.addToCart}
                          >
                            <FiShoppingBag size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick replies */}
                  {msg.quickReplies && (
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
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={tx.placeholder}
                className="flex-1 border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 bg-sage text-white rounded-full flex items-center justify-center hover:bg-sage-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              >
                <FiSend size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
