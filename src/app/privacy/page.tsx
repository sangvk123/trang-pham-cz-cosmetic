'use client';

import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';

// ============================================================
// [TODO] CẦN BỔ SUNG SAU KHI MỞ ŽIVNOST:
// 1. Tên đầy đủ chủ Živnost (Jméno a příjmení)
// 2. IČO (Identifikační číslo osoby)
// 3. Địa chỉ sídlo đầy đủ (ulice, PSČ, město)
// 4. Nếu đăng ký plátce DPH → thêm DIČ
// 5. Danh sách chính xác bên thứ ba nhận dữ liệu
//    (payment provider, dopravce, hosting Vercel...)
// 6. Thời gian lưu trữ dữ liệu cụ thể
// ============================================================

const TODO = '[TODO - Bổ sung sau khi mở Živnost]';

export default function PrivacyPage() {
  const { locale } = useLocale();

  const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
    cs: {
      title: 'Ochrana osobních údajů',
      sections: [
        {
          heading: '1. Správce osobních údajů',
          body: `Správcem osobních údajů je:

${TODO} Jméno a příjmení / Název firmy
IČO: ${TODO}
Sídlo: ${TODO} ulice, PSČ, město
E-mail: info@trangphamcosmetics.cz
Telefon: (+420) 607 715 020

(dále jen „správce").`,
        },
        {
          heading: '2. Jaké osobní údaje zpracováváme',
          body: `Zpracováváme následující kategorie osobních údajů:

• Identifikační údaje: jméno, příjmení
• Kontaktní údaje: e-mailová adresa, telefonní číslo, doručovací adresa
• Údaje o objednávkách: obsah objednávky, historie nákupů, platební údaje
• Technické údaje: IP adresa, typ prohlížeče, cookies (viz sekce Cookies)
• Údaje z komunikace: obsah e-mailů, zpráv přes sociální sítě`,
        },
        {
          heading: '3. Účel a právní základ zpracování',
          body: `Vaše osobní údaje zpracováváme pro tyto účely:

a) Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR):
   • Zpracování a vyřízení objednávky
   • Doručení zboží
   • Vyřízení reklamací a vrácení zboží

b) Plnění právních povinností (čl. 6 odst. 1 písm. c) GDPR):
   • Vedení účetnictví a daňové evidence
   • Archivace daňových dokladů

c) Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR):
   • Ochrana proti podvodům
   • Zlepšování služeb

d) Souhlas (čl. 6 odst. 1 písm. a) GDPR):
   • Zasílání obchodních sdělení (newsletter)
   • Marketingové cookies`,
        },
        {
          heading: '4. Příjemci osobních údajů',
          body: `Vaše osobní údaje mohou být předány těmto příjemcům:

• Poskytovatel hostingu: Vercel Inc. (USA) — na základě standardních smluvních doložek
• Přepravní společnost: ${TODO} (např. PPL, Zásilkovna, DPD)
• Platební brána: ${TODO} (např. Stripe, GoPay)
• Účetní software: ${TODO}
• E-mailový marketing: ${TODO} (pokud používáte)

Osobní údaje nejsou předávány do třetích zemí mimo EU/EHP, s výjimkou poskytovatele hostingu (Vercel — USA), kde je přenos zajištěn standardními smluvními doložkami.`,
        },
        {
          heading: '5. Doba uchování údajů',
          body: `Osobní údaje uchováváme po dobu:

• Údaje z objednávek: po dobu trvání smluvního vztahu + 3 roky (promlčecí lhůta)
• Daňové doklady: 10 let (zákonná povinnost)
• Newsletter: do odvolání souhlasu
• Cookies: dle typu (viz sekce Cookies)
• Údaje z komunikace: 3 roky od posledního kontaktu`,
        },
        {
          heading: '6. Vaše práva',
          body: `Jako subjekt údajů máte následující práva:

• Právo na přístup — můžete požádat o kopii svých osobních údajů
• Právo na opravu — můžete požádat o opravu nepřesných údajů
• Právo na výmaz — můžete požádat o smazání údajů ("právo být zapomenut")
• Právo na omezení zpracování — můžete požádat o omezení zpracování
• Právo na přenositelnost — můžete požádat o předání údajů jinému správci
• Právo vznést námitku — můžete namítat proti zpracování na základě oprávněného zájmu
• Právo odvolat souhlas — kdykoli můžete odvolat souhlas se zpracováním

Pro uplatnění svých práv nás kontaktujte na: info@trangphamcosmetics.cz

Máte také právo podat stížnost u dozorového úřadu:
Úřad pro ochranu osobních údajů (ÚOOÚ)
Pplk. Sochora 27, 170 00 Praha 7
www.uoou.cz`,
        },
        {
          heading: '7. Cookies',
          body: `Na našich stránkách používáme tyto typy cookies:

a) Nezbytné cookies — zajišťují základní funkce webu (košík, přihlášení). Nelze je vypnout.

b) Analytické cookies — pomáhají nám pochopit, jak návštěvníci používají web. Jsou aktivovány pouze s vaším souhlasem.

c) Marketingové cookies — slouží k zobrazení relevantní reklamy. Jsou aktivovány pouze s vaším souhlasem.

Souhlas s cookies můžete kdykoli změnit nebo odvolat prostřednictvím lišty cookies na našem webu.`,
        },
        {
          heading: '8. Zabezpečení údajů',
          body: `Přijímáme vhodná technická a organizační opatření k ochraně vašich osobních údajů, včetně:

• Šifrování dat při přenosu (HTTPS/TLS)
• Omezený přístup k osobním údajům
• Pravidelná aktualizace bezpečnostních opatření`,
        },
        {
          heading: '9. Změny zásad',
          body: `Tyto zásady ochrany osobních údajů mohou být průběžně aktualizovány. O významných změnách vás budeme informovat prostřednictvím e-mailu nebo oznámení na webu.

Poslední aktualizace: ${TODO} (datum)`,
        },
      ],
    },
    vi: {
      title: 'Chính sách bảo mật',
      sections: [
        {
          heading: '1. Người quản lý dữ liệu',
          body: `Người quản lý dữ liệu cá nhân:

${TODO} Họ tên / Tên doanh nghiệp
IČO: ${TODO}
Địa chỉ: ${TODO}
Email: info@trangphamcosmetics.cz
Điện thoại: (+420) 607 715 020`,
        },
        {
          heading: '2. Dữ liệu chúng tôi thu thập',
          body: `• Thông tin cá nhân: họ tên
• Thông tin liên hệ: email, số điện thoại, địa chỉ giao hàng
• Thông tin đơn hàng: nội dung đơn, lịch sử mua, thông tin thanh toán
• Dữ liệu kỹ thuật: địa chỉ IP, trình duyệt, cookies
• Dữ liệu liên lạc: nội dung email, tin nhắn qua mạng xã hội`,
        },
        {
          heading: '3. Mục đích sử dụng',
          body: `a) Thực hiện hợp đồng: xử lý đơn hàng, giao hàng, đổi trả
b) Nghĩa vụ pháp lý: kế toán, lưu trữ hóa đơn thuế
c) Lợi ích hợp pháp: bảo vệ chống gian lận, cải thiện dịch vụ
d) Sự đồng ý: gửi newsletter, cookie marketing`,
        },
        {
          heading: '4. Bên thứ ba nhận dữ liệu',
          body: `• Hosting: Vercel Inc. (USA)
• Vận chuyển: ${TODO}
• Thanh toán: ${TODO}
• Phần mềm kế toán: ${TODO}`,
        },
        {
          heading: '5. Thời gian lưu trữ',
          body: `• Dữ liệu đơn hàng: thời gian hợp đồng + 3 năm
• Hóa đơn thuế: 10 năm
• Newsletter: đến khi rút đồng ý
• Cookies: theo loại (xem mục Cookies)`,
        },
        {
          heading: '6. Quyền của bạn',
          body: `• Quyền truy cập — yêu cầu bản sao dữ liệu cá nhân
• Quyền sửa đổi — yêu cầu sửa dữ liệu không chính xác
• Quyền xóa — yêu cầu xóa dữ liệu ("quyền được quên")
• Quyền hạn chế — yêu cầu hạn chế xử lý dữ liệu
• Quyền chuyển dữ liệu — yêu cầu chuyển cho bên quản lý khác
• Quyền phản đối — phản đối việc xử lý dựa trên lợi ích hợp pháp
• Quyền rút đồng ý — rút đồng ý bất cứ lúc nào

Liên hệ: info@trangphamcosmetics.cz

Cơ quan giám sát: ÚOOÚ (Úřad pro ochranu osobních údajů), www.uoou.cz`,
        },
        {
          heading: '7. Cookies',
          body: `a) Cookie cần thiết — chức năng cơ bản (giỏ hàng, đăng nhập)
b) Cookie phân tích — chỉ khi được đồng ý
c) Cookie marketing — chỉ khi được đồng ý`,
        },
        {
          heading: '8. Bảo mật',
          body: `Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật bao gồm mã hóa HTTPS/TLS, hạn chế quyền truy cập dữ liệu.`,
        },
        {
          heading: '9. Cập nhật',
          body: `Chính sách này có thể được cập nhật. Chúng tôi sẽ thông báo về những thay đổi quan trọng qua email hoặc trên website.

Cập nhật lần cuối: ${TODO}`,
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      sections: [
        {
          heading: '1. Data Controller',
          body: `The data controller is:

${TODO} Full name / Business name
IČO: ${TODO}
Address: ${TODO}
Email: info@trangphamcosmetics.cz
Phone: (+420) 607 715 020`,
        },
        {
          heading: '2. Data We Collect',
          body: `• Personal data: full name
• Contact data: email, phone number, delivery address
• Order data: order contents, purchase history, payment info
• Technical data: IP address, browser type, cookies
• Communication data: email and social media messages`,
        },
        {
          heading: '3. Purpose of Processing',
          body: `a) Contract performance: order processing, delivery, returns
b) Legal obligations: accounting, tax document archival
c) Legitimate interest: fraud protection, service improvement
d) Consent: newsletter, marketing cookies`,
        },
        {
          heading: '4. Data Recipients',
          body: `• Hosting: Vercel Inc. (USA) — under Standard Contractual Clauses
• Shipping: ${TODO}
• Payment: ${TODO}
• Accounting: ${TODO}`,
        },
        {
          heading: '5. Data Retention',
          body: `• Order data: contract duration + 3 years
• Tax documents: 10 years
• Newsletter: until consent withdrawal
• Cookies: varies by type (see Cookies section)`,
        },
        {
          heading: '6. Your Rights',
          body: `• Right of access — request a copy of your personal data
• Right to rectification — request correction of inaccurate data
• Right to erasure — request deletion ("right to be forgotten")
• Right to restriction — request restricted processing
• Right to data portability — request data transfer
• Right to object — object to processing based on legitimate interest
• Right to withdraw consent — withdraw consent at any time

Contact: info@trangphamcosmetics.cz

Supervisory authority: ÚOOÚ (Czech Data Protection Office), www.uoou.cz`,
        },
        {
          heading: '7. Cookies',
          body: `a) Essential cookies — basic functionality (cart, login)
b) Analytics cookies — only with your consent
c) Marketing cookies — only with your consent`,
        },
        {
          heading: '8. Security',
          body: `We implement appropriate technical measures including HTTPS/TLS encryption and restricted data access.`,
        },
        {
          heading: '9. Updates',
          body: `This policy may be updated. We will notify you of significant changes via email or website notice.

Last updated: ${TODO}`,
        },
      ],
    },
  };

  const c = content[locale] || content.en;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-sage-darker">{t('nav.home', locale)}</a>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">{c.title}</span>
      </nav>

      <h1 className="text-3xl font-bold text-charcoal mb-8 text-center font-[family-name:var(--font-playfair)] italic">
        {c.title}
      </h1>

      <div className="space-y-8">
        {c.sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-charcoal mb-3">{section.heading}</h2>
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {section.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
