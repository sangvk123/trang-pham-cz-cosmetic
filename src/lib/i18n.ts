import { Locale } from '@/types';

export const translations: Record<string, Record<Locale, string>> = {
  'announcement': {
    vi: 'MIỄN PHÍ VẬN CHUYỂN cho đơn hàng từ 1.500 CZK',
    cs: 'DOPRAVA ZDARMA při nákupu nad 1.500 Kč',
    en: 'FREE SHIPPING on orders over 1,500 CZK',
  },
  'search.placeholder': { vi: 'Tìm kiếm...', cs: 'Hledat...', en: 'Search...' },
  'cart.title': { vi: 'Giỏ hàng', cs: 'Košík', en: 'Cart' },
  'cart.empty': { vi: 'Giỏ hàng trống', cs: 'Košík je prázdný', en: 'Your cart is empty' },
  'cart.checkout': { vi: 'Thanh toán', cs: 'K pokladně', en: 'Checkout' },
  'account.login': { vi: 'Tài khoản', cs: 'Účet', en: 'Account' },
  'nav.home': { vi: 'Trang chủ', cs: 'Domů', en: 'Home' },
  'nav.products': { vi: 'Sản phẩm', cs: 'Produkty', en: 'Products' },
  'nav.makeup': { vi: 'Trang điểm', cs: 'Make-up', en: 'Makeup' },
  'nav.skincare': { vi: 'Chăm sóc da', cs: 'Skincare', en: 'Skincare' },
  'nav.bodycare': { vi: 'Chăm sóc cơ thể', cs: 'Péče o tělo', en: 'Body Care' },
  'nav.haircare': { vi: 'Chăm sóc tóc', cs: 'Péče o vlasy', en: 'Hair Care' },
  'nav.bestsellers': { vi: 'Bán chạy', cs: 'Bestsellery', en: 'Best Sellers' },
  'nav.brands': { vi: 'Thương hiệu', cs: 'Značky', en: 'Brands' },
  'nav.new': { vi: 'Hàng mới', cs: 'Novinky', en: 'New Arrivals' },
  'nav.sale': { vi: 'Khuyến mãi', cs: 'Akce', en: 'Sale' },
  'nav.makeup.face': { vi: 'Trang điểm mặt', cs: 'Tvář', en: 'Face' },
  'nav.makeup.eyes': { vi: 'Mắt', cs: 'Oči', en: 'Eyes' },
  'nav.makeup.lips': { vi: 'Môi', cs: 'Rty', en: 'Lips' },
  'nav.makeup.brows': { vi: 'Lông mày', cs: 'Obočí', en: 'Brows' },
  'nav.makeup.tools': { vi: 'Dụng cụ', cs: 'Doplňky', en: 'Tools' },
  'nav.skincare.cleanser': { vi: 'Tẩy trang & Rửa mặt', cs: 'Čištění', en: 'Cleansers' },
  'nav.skincare.toner': { vi: 'Toner', cs: 'Tonery', en: 'Toners' },
  'nav.skincare.serum': { vi: 'Serum', cs: 'Séra', en: 'Serums' },
  'nav.skincare.moisturizer': { vi: 'Kem dưỡng', cs: 'Krémy', en: 'Moisturizers' },
  'nav.skincare.sunscreen': { vi: 'Chống nắng', cs: 'SPF ochrana', en: 'Sunscreen' },
  'nav.skincare.mask': { vi: 'Mặt nạ', cs: 'Masky', en: 'Masks' },
  'home.newArrivals': { vi: 'HÀNG MỚI VỀ', cs: 'NOVINKY', en: 'NEW ARRIVALS' },
  'home.bestSellers': { vi: 'BÁN CHẠY NHẤT', cs: 'BESTSELLERY', en: 'BEST SELLERS' },
  'home.ourBrands': { vi: 'THƯƠNG HIỆU CỦA CHÚNG TÔI', cs: 'NAŠE ZNAČKY', en: 'OUR BRANDS' },
  'home.shopNow': { vi: 'Mua ngay', cs: 'Nakoupit', en: 'Shop Now' },
  'home.viewAll': { vi: 'Xem tất cả', cs: 'Zobrazit vše', en: 'View All' },
  'home.hero.title': { vi: 'Mỹ phẩm chính hãng', cs: 'Originální kosmetika', en: 'Authentic Beauty' },
  'home.hero.subtitle': {
    vi: 'Chăm sóc da & Trang điểm từ các thương hiệu hàng đầu Hàn Quốc',
    cs: 'Péče o pleť & make-up od předních korejských značek',
    en: 'Skincare & Makeup from leading Korean brands',
  },
  'product.addToCart': { vi: 'Thêm vào giỏ', cs: 'Přidat do košíku', en: 'Add to Cart' },
  'product.selectOption': { vi: 'Chọn màu', cs: 'Vyberte možnost', en: 'Select Option' },
  'product.new': { vi: 'Mới', cs: 'Novinka', en: 'New' },
  'product.sale': { vi: 'Sale', cs: 'Akce', en: 'Sale' },
  'product.regularPrice': { vi: 'Giá gốc', cs: 'Běžná cena', en: 'Regular price' },
  'product.salePrice': { vi: 'Giá sale', cs: 'Akce', en: 'Sale price' },
  'footer.about': { vi: 'Về chúng tôi', cs: 'O nás', en: 'About Us' },
  'footer.help': { vi: 'Hỗ trợ', cs: 'Nápověda', en: 'Help' },
  'footer.shipping': { vi: 'Vận chuyển', cs: 'Doručení', en: 'Shipping' },
  'footer.returns': { vi: 'Đổi trả', cs: 'Vrácení', en: 'Returns' },
  'footer.contact': { vi: 'Liên hệ', cs: 'Kontakt', en: 'Contact' },
  'footer.privacy': { vi: 'Bảo mật', cs: 'Ochrana soukromí', en: 'Privacy' },
  'footer.terms': { vi: 'Điều khoản', cs: 'Podmínky', en: 'Terms' },
  'footer.followUs': { vi: 'Theo dõi', cs: 'Sledujte nás', en: 'Follow Us' },
  'footer.newsletter': { vi: 'Nhận tin mới', cs: 'Odběr novinek', en: 'Newsletter' },
  'footer.subscribe': { vi: 'Đăng ký', cs: 'Odebrat', en: 'Subscribe' },
  'footer.rights': { vi: 'Mọi quyền được bảo lưu.', cs: 'Všechna práva vyhrazena.', en: 'All rights reserved.' },
  'category.sort': { vi: 'Sắp xếp', cs: 'Řazení', en: 'Sort' },
  'category.popular': { vi: 'Phổ biến', cs: 'Populární', en: 'Popular' },
  'category.newest': { vi: 'Mới nhất', cs: 'Nejnovější', en: 'Newest' },
  'category.priceLow': { vi: 'Giá tăng dần', cs: 'Cena vzestupně', en: 'Price: Low-High' },
  'category.priceHigh': { vi: 'Giá giảm dần', cs: 'Cena sestupně', en: 'Price: High-Low' },
  'category.noProducts': { vi: 'Không tìm thấy sản phẩm', cs: 'Žádné produkty', en: 'No products found' },

  // Toast notifications
  'toast.addedToCart': { vi: 'Đã thêm vào giỏ hàng', cs: 'Přidáno do košíku', en: 'Added to cart' },
  'toast.removedFromCart': { vi: 'Đã xóa khỏi giỏ hàng', cs: 'Odstraněno z košíku', en: 'Removed from cart' },
  'toast.addedToWishlist': { vi: 'Đã thêm vào yêu thích', cs: 'Přidáno do oblíbených', en: 'Added to wishlist' },
  'toast.removedFromWishlist': { vi: 'Đã xóa khỏi yêu thích', cs: 'Odstraněno z oblíbených', en: 'Removed from wishlist' },
  'toast.newsletterSuccess': { vi: 'Đăng ký thành công!', cs: 'Úspěšně přihlášeno!', en: 'Subscribed successfully!' },
  'toast.newsletterError': { vi: 'Vui lòng nhập email hợp lệ', cs: 'Zadejte platný e-mail', en: 'Please enter a valid email' },

  // Back to top
  'backToTop': { vi: 'Lên đầu trang', cs: 'Nahoru', en: 'Back to top' },

  // Contact page
  'contact.title': { vi: 'Liên hệ', cs: 'Kontakt', en: 'Contact Us' },
  'contact.subtitle': { vi: 'Chúng tôi luôn sẵn sàng hỗ trợ bạn', cs: 'Jsme tu pro vás', en: 'We are here to help' },
  'contact.phone': { vi: 'Điện thoại', cs: 'Telefon', en: 'Phone' },
  'contact.email': { vi: 'Email', cs: 'E-mail', en: 'Email' },
  'contact.address': { vi: 'Địa chỉ', cs: 'Adresa', en: 'Address' },
  'contact.hours': { vi: 'Giờ làm việc', cs: 'Otevírací doba', en: 'Working Hours' },
  'contact.hoursValue': { vi: 'Thứ 2 - Thứ 7: 9:00 - 18:00', cs: 'Po - So: 9:00 - 18:00', en: 'Mon - Sat: 9:00 - 18:00' },
  'contact.social': { vi: 'Mạng xã hội', cs: 'Sociální sítě', en: 'Social Media' },
  'contact.formName': { vi: 'Họ tên', cs: 'Jméno', en: 'Full Name' },
  'contact.formEmail': { vi: 'Email', cs: 'E-mail', en: 'Email' },
  'contact.formMessage': { vi: 'Tin nhắn', cs: 'Zpráva', en: 'Message' },
  'contact.formSend': { vi: 'Gửi tin nhắn', cs: 'Odeslat zprávu', en: 'Send Message' },
  'contact.formSent': { vi: 'Đã gửi thành công!', cs: 'Úspěšně odesláno!', en: 'Sent successfully!' },

  // About page
  'about.title': { vi: 'Về chúng tôi', cs: 'O nás', en: 'About Us' },
  'about.story.title': { vi: 'Câu chuyện của chúng tôi', cs: 'Náš příběh', en: 'Our Story' },
  'about.story.p1': {
    vi: 'Trang Pham Cosmetics được thành lập bởi những người Việt đam mê làm đẹp tại Cộng hòa Séc. Chúng tôi mang đến những sản phẩm mỹ phẩm Hàn Quốc chính hãng, chất lượng cao cho cộng đồng Việt Nam và khách hàng tại Séc.',
    cs: 'Trang Pham Cosmetics byla založena Vietnamci, kteří milují krásu, v České republice. Přinášíme originální, vysoce kvalitní korejskou kosmetiku pro vietnamskou komunitu a české zákazníky.',
    en: 'Trang Pham Cosmetics was founded by beauty-loving Vietnamese people in the Czech Republic. We bring authentic, high-quality Korean cosmetics to the Vietnamese community and Czech customers.',
  },
  'about.story.p2': {
    vi: 'Với kinh nghiệm nhiều năm trong ngành mỹ phẩm, chúng tôi cam kết chỉ bán sản phẩm 100% chính hãng từ các thương hiệu uy tín hàng đầu Hàn Quốc.',
    cs: 'S mnohaletými zkušenostmi v kosmetickém průmyslu se zavazujeme prodávat pouze 100% originální produkty od předních korejských značek.',
    en: 'With years of experience in the cosmetics industry, we are committed to selling only 100% authentic products from leading Korean brands.',
  },
  'about.mission.title': { vi: 'Sứ mệnh', cs: 'Naše mise', en: 'Our Mission' },
  'about.mission.text': {
    vi: 'Mang K-Beauty chính hãng đến gần hơn với mọi người tại Châu Âu, với giá cả hợp lý và dịch vụ tận tâm.',
    cs: 'Přiblížit autentickou K-Beauty lidem v Evropě za rozumné ceny a s oddaným servisem.',
    en: 'Bringing authentic K-Beauty closer to everyone in Europe, with affordable prices and dedicated service.',
  },
  'about.values': { vi: 'Giá trị cốt lõi', cs: 'Naše hodnoty', en: 'Our Values' },
  'about.value1.title': { vi: '100% Chính hãng', cs: '100% Originální', en: '100% Authentic' },
  'about.value1.text': { vi: 'Cam kết chỉ bán sản phẩm chính hãng, nhập trực tiếp từ Hàn Quốc', cs: 'Prodáváme pouze originální produkty dovezené přímo z Koreje', en: 'Committed to selling only authentic products, imported directly from Korea' },
  'about.value2.title': { vi: 'Chất lượng cao', cs: 'Vysoká kvalita', en: 'High Quality' },
  'about.value2.text': { vi: 'Chọn lọc kỹ lưỡng từ các thương hiệu uy tín nhất', cs: 'Pečlivě vybrané od nejdůvěryhodnějších značek', en: 'Carefully selected from the most trusted brands' },
  'about.value3.title': { vi: 'Giá hợp lý', cs: 'Přijatelné ceny', en: 'Fair Prices' },
  'about.value3.text': { vi: 'Cam kết giá tốt nhất tại thị trường Séc', cs: 'Nejlepší ceny na českém trhu', en: 'Best prices in the Czech market' },
  'about.value4.title': { vi: 'Hỗ trợ tận tâm', cs: 'Oddaný servis', en: 'Dedicated Support' },
  'about.value4.text': { vi: 'Luôn sẵn sàng tư vấn và hỗ trợ khách hàng', cs: 'Vždy připraveni poradit a pomoci zákazníkům', en: 'Always ready to advise and support customers' },

  // FAQ page
  'faq.title': { vi: 'Câu hỏi thường gặp', cs: 'Často kladené otázky', en: 'FAQ' },
  'faq.q1': { vi: 'Sản phẩm có chính hãng không?', cs: 'Jsou produkty originální?', en: 'Are the products authentic?' },
  'faq.a1': { vi: 'Tất cả sản phẩm của chúng tôi đều 100% chính hãng, nhập khẩu trực tiếp từ Hàn Quốc. Mỗi sản phẩm đều có tem và mã vạch xác thực.', cs: 'Všechny naše produkty jsou 100% originální, dovezené přímo z Koreje. Každý produkt má ověřovací známku a čárový kód.', en: 'All our products are 100% authentic, imported directly from Korea. Each product has a verification seal and barcode.' },
  'faq.q2': { vi: 'Thời gian giao hàng bao lâu?', cs: 'Jak dlouho trvá doručení?', en: 'How long does shipping take?' },
  'faq.a2': { vi: 'Đơn hàng trong nội thành Praha giao trong 1-2 ngày. Các tỉnh khác trong Séc giao trong 2-4 ngày làm việc.', cs: 'Objednávky v Praze doručíme do 1-2 dnů. Ostatní města v ČR do 2-4 pracovních dnů.', en: 'Prague orders are delivered in 1-2 days. Other cities in Czech Republic in 2-4 business days.' },
  'faq.q3': { vi: 'Có thể đổi trả hàng không?', cs: 'Lze produkty vrátit?', en: 'Can I return products?' },
  'faq.a3': { vi: 'Có, chúng tôi chấp nhận đổi trả trong vòng 14 ngày kể từ ngày nhận hàng. Sản phẩm phải chưa qua sử dụng và còn nguyên bao bì.', cs: 'Ano, přijímáme vrácení do 14 dnů od doručení. Produkty musí být nepoužité a v původním obalu.', en: 'Yes, we accept returns within 14 days of delivery. Products must be unused and in original packaging.' },
  'faq.q4': { vi: 'Phương thức thanh toán nào được chấp nhận?', cs: 'Jaké platební metody přijímáte?', en: 'What payment methods do you accept?' },
  'faq.a4': { vi: 'Chúng tôi chấp nhận chuyển khoản ngân hàng, thanh toán khi nhận hàng (COD) và thanh toán qua Facebook/Zalo.', cs: 'Přijímáme bankovní převod, platbu na dobírku (COD) a platbu přes Facebook/Zalo.', en: 'We accept bank transfer, cash on delivery (COD), and payment via Facebook/Zalo.' },
  'faq.q5': { vi: 'Miễn phí vận chuyển khi nào?', cs: 'Kdy je doprava zdarma?', en: 'When is shipping free?' },
  'faq.a5': { vi: 'Đơn hàng từ 1.500 CZK trở lên được miễn phí vận chuyển toàn Séc.', cs: 'Objednávky nad 1.500 Kč mají dopravu zdarma po celém Česku.', en: 'Orders over 1,500 CZK get free shipping across Czech Republic.' },
  'faq.q6': { vi: 'Làm sao liên hệ hỗ trợ?', cs: 'Jak kontaktovat podporu?', en: 'How to contact support?' },
  'faq.a6': { vi: 'Bạn có thể liên hệ qua điện thoại, email, Facebook hoặc Zalo. Chúng tôi trả lời trong vòng 24 giờ.', cs: 'Můžete nás kontaktovat telefonicky, e-mailem, přes Facebook nebo Zalo. Odpovíme do 24 hodin.', en: 'You can contact us via phone, email, Facebook or Zalo. We respond within 24 hours.' },

  // Shipping policy
  'shipping.title': { vi: 'Chính sách vận chuyển', cs: 'Doručení', en: 'Shipping Policy' },
  'shipping.free.title': { vi: 'Miễn phí vận chuyển', cs: 'Doprava zdarma', en: 'Free Shipping' },
  'shipping.free.text': { vi: 'Đơn hàng từ 1.500 CZK trở lên được miễn phí vận chuyển trên toàn Séc.', cs: 'Objednávky nad 1.500 Kč mají dopravu zdarma po celém Česku.', en: 'Orders over 1,500 CZK qualify for free shipping across Czech Republic.' },
  'shipping.standard.title': { vi: 'Vận chuyển tiêu chuẩn', cs: 'Standardní doručení', en: 'Standard Shipping' },
  'shipping.standard.text': { vi: 'Phí vận chuyển 99 CZK cho đơn hàng dưới 1.500 CZK. Giao hàng trong 2-4 ngày làm việc.', cs: 'Poštovné 99 Kč pro objednávky pod 1.500 Kč. Doručení do 2-4 pracovních dnů.', en: 'Shipping fee of 99 CZK for orders under 1,500 CZK. Delivery in 2-4 business days.' },
  'shipping.prague.title': { vi: 'Giao hàng Praha', cs: 'Doručení v Praze', en: 'Prague Delivery' },
  'shipping.prague.text': { vi: 'Giao hàng tận nơi trong nội thành Praha trong 1-2 ngày. Có thể hẹn giờ giao.', cs: 'Doručení v Praze do 1-2 dnů. Možnost domluvit čas doručení.', en: 'Prague delivery within 1-2 days. Flexible delivery time scheduling available.' },
  'shipping.tracking.title': { vi: 'Theo dõi đơn hàng', cs: 'Sledování zásilky', en: 'Order Tracking' },
  'shipping.tracking.text': { vi: 'Sau khi gửi hàng, bạn sẽ nhận được mã theo dõi qua email hoặc tin nhắn.', cs: 'Po odeslání obdržíte sledovací číslo e-mailem nebo zprávou.', en: 'After shipping, you will receive a tracking number via email or message.' },

  // Returns policy
  'returns.title': { vi: 'Chính sách đổi trả', cs: 'Vrácení zboží', en: 'Returns Policy' },
  'returns.period.title': { vi: 'Thời gian đổi trả', cs: 'Lhůta pro vrácení', en: 'Return Period' },
  'returns.period.text': { vi: 'Bạn có 14 ngày kể từ ngày nhận hàng để yêu cầu đổi trả sản phẩm.', cs: 'Máte 14 dní od doručení na vrácení produktů.', en: 'You have 14 days from delivery to request a product return.' },
  'returns.condition.title': { vi: 'Điều kiện đổi trả', cs: 'Podmínky vrácení', en: 'Return Conditions' },
  'returns.condition.text': { vi: 'Sản phẩm phải chưa qua sử dụng, còn nguyên bao bì và tem. Sản phẩm đã mở seal không được đổi trả trừ khi bị lỗi.', cs: 'Produkty musí být nepoužité, v původním obalu se štítky. Otevřené produkty nelze vrátit, pokud nejsou vadné.', en: 'Products must be unused, in original packaging with tags. Opened products cannot be returned unless defective.' },
  'returns.process.title': { vi: 'Quy trình đổi trả', cs: 'Postup vrácení', en: 'Return Process' },
  'returns.process.text': { vi: 'Liên hệ chúng tôi qua điện thoại hoặc email. Sau khi xác nhận, gửi sản phẩm về địa chỉ cửa hàng. Hoàn tiền trong 5-7 ngày làm việc.', cs: 'Kontaktujte nás telefonicky nebo e-mailem. Po potvrzení zašlete produkt na adresu obchodu. Refundace do 5-7 pracovních dnů.', en: 'Contact us via phone or email. After confirmation, send the product to our store address. Refund within 5-7 business days.' },
  'returns.refund.title': { vi: 'Hoàn tiền', cs: 'Refundace', en: 'Refund' },
  'returns.refund.text': { vi: 'Hoàn tiền qua chuyển khoản ngân hàng trong 5-7 ngày làm việc sau khi nhận được hàng trả lại.', cs: 'Refundace bankovním převodem do 5-7 pracovních dnů po obdržení vráceného zboží.', en: 'Refund via bank transfer within 5-7 business days after receiving the returned product.' },

  // Search
  'search.results': { vi: 'Kết quả tìm kiếm', cs: 'Výsledky hledání', en: 'Search Results' },
  'search.noResults': { vi: 'Không tìm thấy sản phẩm nào', cs: 'Žádné výsledky', en: 'No products found' },

  // Wishlist
  'wishlist.title': { vi: 'Yêu thích', cs: 'Oblíbené', en: 'Wishlist' },
  'wishlist.empty': { vi: 'Chưa có sản phẩm yêu thích', cs: 'Žádné oblíbené produkty', en: 'No wishlist items yet' },

  // Recently viewed
  'recentlyViewed': { vi: 'Đã xem gần đây', cs: 'Nedávno prohlížené', en: 'Recently Viewed' },

  // Social sharing
  'share': { vi: 'Chia sẻ', cs: 'Sdílet', en: 'Share' },

  // Error pages
  'error.title': { vi: 'Có lỗi xảy ra', cs: 'Došlo k chybě', en: 'Something went wrong' },
  'error.retry': { vi: 'Thử lại', cs: 'Zkusit znovu', en: 'Try Again' },
  'notFound.title': { vi: 'Trang không tồn tại', cs: 'Stránka nenalezena', en: 'Page Not Found' },
  'notFound.text': { vi: 'Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.', cs: 'Stránka, kterou hledáte, neexistuje nebo byla odstraněna.', en: 'The page you are looking for does not exist or has been removed.' },
  'notFound.backHome': { vi: 'Về trang chủ', cs: 'Zpět na hlavní stránku', en: 'Back to Home' },

  // Loading
  'loading': { vi: 'Đang tải...', cs: 'Načítání...', en: 'Loading...' },
};

export function t(key: string, locale: Locale): string {
  return translations[key]?.[locale] || key;
}

export const localeNames: Record<Locale, string> = { vi: 'Tiếng Việt', cs: 'Čeština', en: 'English' };
export const localeFlags: Record<Locale, string> = { vi: '🇻🇳', cs: '🇨🇿', en: '🇬🇧' };
