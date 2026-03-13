'use client';

import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';

// ============================================================
// [TODO] CẦN BỔ SUNG SAU KHI MỞ ŽIVNOST:
// 1. Tên đầy đủ, IČO, DIČ, địa chỉ sídlo
// 2. Nếu plátce DPH → giá vč. DPH, nếu không → "Nejsme plátci DPH"
// 3. Phương thức thanh toán chính xác (bank transfer, COD, Stripe...)
// 4. Phương thức vận chuyển chính xác (PPL, Zásilkovna, DPD...)
// 5. Số účtu pro vrácení peněz
// ============================================================

const TODO = '[TODO - Bổ sung sau khi mở Živnost]';

export default function TermsPage() {
  const { locale } = useLocale();

  const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
    cs: {
      title: 'Obchodní podmínky',
      sections: [
        {
          heading: '1. Úvodní ustanovení',
          body: `Tyto obchodní podmínky (dále jen „podmínky") upravují vzájemná práva a povinnosti prodávajícího a kupujícího při prodeji zboží prostřednictvím internetového obchodu trangphamcosmetics.cz.

Prodávající:
${TODO} Jméno a příjmení / Název firmy
IČO: ${TODO}
DIČ: ${TODO} (nebo "Nejsme plátci DPH")
Sídlo: ${TODO} ulice, PSČ, město
Zapsáno: ${TODO} (např. "Živnostenský rejstřík vedený MÚ Praha X")
E-mail: info@trangphamcosmetics.cz
Telefon: (+420) 607 715 020

Kupujícím je spotřebitel ve smyslu § 419 občanského zákoníku.`,
        },
        {
          heading: '2. Objednávka a uzavření kupní smlouvy',
          body: `2.1. Kupující objednává zboží prostřednictvím internetového obchodu, e-mailu, telefonu nebo sociálních sítí (Facebook, Zalo).

2.2. Objednávka je návrhem kupní smlouvy. Kupní smlouva vzniká potvrzením objednávky prodávajícím.

2.3. Prodávající si vyhrazuje právo odmítnout objednávku v případě vyprodání zboží nebo zjevné chyby v ceně.

2.4. Kupující je povinen uvést správné a úplné údaje při objednávce.`,
        },
        {
          heading: '3. Cena zboží a platební podmínky',
          body: `3.1. Všechny ceny jsou uvedeny v CZK (Kč) a jsou konečné. ${TODO} (vč. DPH / Nejsme plátci DPH)

3.2. Akceptujeme následující platební metody:
• Bankovní převod na účet: ${TODO} (číslo účtu / IBAN)
• Platba při převzetí (dobírka)
• ${TODO} (další metody: Stripe, GoPay...)

3.3. V případě platby převodem je kupující povinen uhradit cenu do 7 dnů od potvrzení objednávky. Po uplynutí této lhůty může být objednávka zrušena.`,
        },
        {
          heading: '4. Dodací podmínky',
          body: `4.1. Zboží je doručováno na území České republiky.

4.2. Způsoby doručení:
• Osobní odběr v Praze — zdarma
• ${TODO} dopravce (PPL, Zásilkovna, DPD) — ${TODO} Kč
• Doručení v Praze — ${TODO} Kč

4.3. Doprava zdarma pro objednávky nad 1 500 Kč.

4.4. Obvyklá doba doručení:
• Praha: 1–2 pracovní dny
• Ostatní ČR: 2–4 pracovní dny

4.5. Kupující je povinen zboží při převzetí zkontrolovat a případné poškození zásilky ihned reklamovat u dopravce.`,
        },
        {
          heading: '5. Odstoupení od smlouvy',
          body: `5.1. Kupující má právo odstoupit od kupní smlouvy bez udání důvodu ve lhůtě 14 dnů ode dne převzetí zboží (§ 1829 občanského zákoníku).

5.2. Pro odstoupení od smlouvy může kupující využít vzorový formulář (viz stránka Odstoupení od smlouvy) nebo zaslat oznámení na e-mail info@trangphamcosmetics.cz.

5.3. Kupující je povinen zboží vrátit do 14 dnů od odstoupení od smlouvy. Zboží musí být nepoužité, nepoškozené a v původním obalu.

5.4. Prodávající vrátí kupujícímu peníze do 14 dnů od obdržení vráceného zboží, a to stejným způsobem, jakým je obdržel.

5.5. Náklady na vrácení zboží nese kupující.

5.6. Spotřebitel nemůže odstoupit od smlouvy v případech uvedených v § 1837 občanského zákoníku, zejména:
• u zboží upraveného podle přání spotřebitele
• u zboží podléhajícího rychlé zkáze
• u zboží v zapečetěném obalu, které bylo po dodání otevřeno a z hygienických důvodů jej nelze vrátit (otevřená kosmetika)`,
        },
        {
          heading: '6. Reklamace a záruka',
          body: `6.1. Záruční doba činí 24 měsíců od převzetí zboží (§ 2165 občanského zákoníku).

6.2. Práva z vadného plnění se řídí příslušnými ustanoveními občanského zákoníku (§ 2099–2117 a § 2161–2174).

6.3. Podrobnosti o reklamačním postupu najdete na stránce Reklamační řád.

6.4. Prodávající je povinen vyřídit reklamaci nejpozději do 30 dnů ode dne jejího uplatnění.`,
        },
        {
          heading: '7. Ochrana osobních údajů',
          body: `Zpracování osobních údajů se řídí zásadami ochrany osobních údajů, které jsou k dispozici na stránce Ochrana osobních údajů.`,
        },
        {
          heading: '8. Mimosoudní řešení sporů',
          body: `8.1. K mimosoudnímu řešení spotřebitelských sporů z kupní smlouvy je příslušná Česká obchodní inspekce (ČOI):

Česká obchodní inspekce
Ústřední inspektorát – oddělení ADR
Štěpánská 44, 110 00 Praha 1
Web: https://www.coi.cz
E-mail: adr@coi.cz

8.2. Spotřebitel může rovněž využít platformu pro řešení sporů online (ODR):
https://ec.europa.eu/consumers/odr/`,
        },
        {
          heading: '9. Závěrečná ustanovení',
          body: `9.1. Tyto obchodní podmínky jsou platné a účinné od ${TODO} (datum).

9.2. Prodávající si vyhrazuje právo obchodní podmínky měnit. Změny budou zveřejněny na těchto stránkách.

9.3. Vztahy neupravené těmito podmínkami se řídí právním řádem České republiky, zejména zákonem č. 89/2012 Sb. (občanský zákoník) a zákonem č. 634/1992 Sb. (o ochraně spotřebitele).`,
        },
      ],
    },
    vi: {
      title: 'Điều khoản kinh doanh',
      sections: [
        {
          heading: '1. Quy định chung',
          body: `Các điều khoản kinh doanh này điều chỉnh quyền và nghĩa vụ giữa người bán và người mua khi mua hàng qua cửa hàng trực tuyến trangphamcosmetics.cz.

Người bán:
${TODO} Họ tên / Tên doanh nghiệp
IČO: ${TODO}
Địa chỉ: ${TODO}
Email: info@trangphamcosmetics.cz
Điện thoại: (+420) 607 715 020`,
        },
        {
          heading: '2. Đặt hàng',
          body: `Đơn hàng được thực hiện qua website, email, điện thoại hoặc mạng xã hội. Hợp đồng mua bán có hiệu lực khi đơn hàng được xác nhận.`,
        },
        {
          heading: '3. Giá và thanh toán',
          body: `Giá niêm yết bằng CZK (Kč), là giá cuối cùng. ${TODO} (đã bao gồm DPH / Không phải plátce DPH)

Phương thức thanh toán:
• Chuyển khoản ngân hàng: ${TODO}
• Thanh toán khi nhận hàng (COD)
• ${TODO}`,
        },
        {
          heading: '4. Giao hàng',
          body: `Giao hàng trên toàn Séc. Miễn phí ship cho đơn từ 1.500 CZK.
• Praha: 1-2 ngày
• Ngoài Praha: 2-4 ngày làm việc`,
        },
        {
          heading: '5. Quyền hủy đơn (14 ngày)',
          body: `Theo luật Séc (§ 1829 Občanský zákoník), bạn có quyền hủy đơn trong 14 ngày kể từ khi nhận hàng, không cần lý do. Sản phẩm phải còn nguyên, chưa sử dụng. Hoàn tiền trong 14 ngày. Chi phí gửi trả do người mua chịu.

Ngoại trừ: mỹ phẩm đã mở seal vì lý do vệ sinh.`,
        },
        {
          heading: '6. Bảo hành và khiếu nại',
          body: `Bảo hành 24 tháng. Xử lý khiếu nại tối đa 30 ngày. Chi tiết xem trang Reklamační řád.`,
        },
        {
          heading: '7. Bảo vệ dữ liệu',
          body: `Xem trang Chính sách bảo mật.`,
        },
        {
          heading: '8. Giải quyết tranh chấp',
          body: `Cơ quan giải quyết: Česká obchodní inspekce (ČOI) — www.coi.cz
Nền tảng ODR: https://ec.europa.eu/consumers/odr/`,
        },
        {
          heading: '9. Hiệu lực',
          body: `Có hiệu lực từ: ${TODO}. Áp dụng theo luật Cộng hòa Séc.`,
        },
      ],
    },
    en: {
      title: 'Terms & Conditions',
      sections: [
        {
          heading: '1. General Provisions',
          body: `These terms govern the rights and obligations between the seller and buyer for purchases through trangphamcosmetics.cz.

Seller:
${TODO} Full name / Business name
IČO: ${TODO}
Address: ${TODO}
Email: info@trangphamcosmetics.cz
Phone: (+420) 607 715 020`,
        },
        {
          heading: '2. Orders',
          body: `Orders can be placed via website, email, phone, or social media. A purchase contract is concluded upon order confirmation by the seller.`,
        },
        {
          heading: '3. Prices and Payment',
          body: `All prices are in CZK and are final. ${TODO} (incl. VAT / Not VAT registered)

Payment methods:
• Bank transfer: ${TODO}
• Cash on delivery (COD)
• ${TODO}`,
        },
        {
          heading: '4. Delivery',
          body: `Delivery throughout Czech Republic. Free shipping on orders over 1,500 CZK.
• Prague: 1-2 business days
• Other CZ: 2-4 business days`,
        },
        {
          heading: '5. Right of Withdrawal (14 days)',
          body: `Under Czech law (§ 1829 Civil Code), you may withdraw from the contract within 14 days of receiving goods, without reason. Products must be unused and in original packaging. Refund within 14 days. Return shipping costs are borne by the buyer.

Exception: cosmetics with broken seal for hygiene reasons.`,
        },
        {
          heading: '6. Warranty and Complaints',
          body: `24-month warranty. Complaints resolved within 30 days maximum. See Complaint Procedure page for details.`,
        },
        {
          heading: '7. Data Protection',
          body: `See our Privacy Policy page.`,
        },
        {
          heading: '8. Dispute Resolution',
          body: `Czech Trade Inspection (ČOI) — www.coi.cz
ODR platform: https://ec.europa.eu/consumers/odr/`,
        },
        {
          heading: '9. Effective Date',
          body: `Effective from: ${TODO}. Governed by the laws of the Czech Republic.`,
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
