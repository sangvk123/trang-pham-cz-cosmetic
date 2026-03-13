'use client';

import { useLocale } from '@/lib/LocaleContext';
import { t } from '@/lib/i18n';

// ============================================================
// [TODO] CẦN BỔ SUNG SAU KHI MỞ ŽIVNOST:
// 1. Tên, IČO, địa chỉ sídlo
// 2. Địa chỉ nhận hàng reklamace (nếu khác sídlo)
// ============================================================

const TODO = '[TODO - Bổ sung sau khi mở Živnost]';

export default function ComplaintsPage() {
  const { locale } = useLocale();

  const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
    cs: {
      title: 'Reklamační řád',
      sections: [
        {
          heading: '1. Obecná ustanovení',
          body: `Tento reklamační řád je vydán v souladu se zákonem č. 89/2012 Sb. (občanský zákoník) a zákonem č. 634/1992 Sb. (o ochraně spotřebitele) a upravuje práva a povinnosti prodávajícího a kupujícího při uplatnění práv z vadného plnění.

Prodávající:
${TODO} Jméno a příjmení / Název firmy
IČO: ${TODO}
Sídlo: ${TODO}
E-mail: info@trangphamcosmetics.cz
Telefon: (+420) 607 715 020`,
        },
        {
          heading: '2. Záruční doba',
          body: `2.1. Záruční doba činí 24 měsíců od převzetí zboží kupujícím (§ 2165 občanského zákoníku).

2.2. U zboží s vyznačeným datem minimální trvanlivosti (kosmetika) se záruční doba řídí tímto datem.

2.3. Záruční doba se prodlužuje o dobu, po kterou bylo zboží v reklamaci.`,
        },
        {
          heading: '3. Uplatnění reklamace',
          body: `3.1. Kupující uplatňuje reklamaci:
• E-mailem na: info@trangphamcosmetics.cz
• Telefonicky: (+420) 607 715 020
• Osobně na adrese: ${TODO}

3.2. Při reklamaci kupující uvede:
• Číslo objednávky nebo doklad o koupi
• Popis závady
• Požadovaný způsob vyřízení reklamace

3.3. Kupující je povinen zaslat reklamované zboží na adresu: ${TODO}
Zboží musí být řádně zabalené, aby nedošlo k dalšímu poškození při přepravě.`,
        },
        {
          heading: '4. Práva z vadného plnění',
          body: `4.1. Pokud se vada projeví v prvních 12 měsících, má se za to, že zboží bylo vadné již při převzetí (§ 2161 odst. 2 občanského zákoníku).

4.2. Kupující má právo požadovat:
• Opravu zboží
• Výměnu zboží za nové
• Přiměřenou slevu z ceny
• Odstoupení od smlouvy (při podstatném porušení)

4.3. Volba způsobu vyřízení reklamace náleží kupujícímu.`,
        },
        {
          heading: '5. Lhůta pro vyřízení reklamace',
          body: `5.1. Prodávající je povinen vyřídit reklamaci nejpozději do 30 dnů ode dne jejího uplatnění (§ 19 odst. 3 zákona o ochraně spotřebitele).

5.2. Pokud prodávající reklamaci nevyřídí v zákonné lhůtě, má kupující právo od kupní smlouvy odstoupit.

5.3. Prodávající vydá kupujícímu potvrzení o přijetí reklamace (písemně nebo e-mailem).`,
        },
        {
          heading: '6. Kdy nelze reklamovat',
          body: `Reklamaci nelze uplatnit v těchto případech:
• Závada vznikla nesprávným používáním nebo skladováním
• Závada vznikla mechanickým poškozením kupujícím
• Uplynula záruční doba
• Zboží bylo poškozeno vyšší mocí (živelní pohroma apod.)
• Přirozené opotřebení`,
        },
        {
          heading: '7. Náklady reklamace',
          body: `7.1. V případě oprávněné reklamace nese náklady na dopravu reklamovaného zboží prodávající.

7.2. V případě neoprávněné reklamace nese náklady kupující.`,
        },
        {
          heading: '8. Mimosoudní řešení sporů',
          body: `Spotřebitel má právo na mimosoudní řešení spotřebitelského sporu. Příslušným subjektem je:

Česká obchodní inspekce (ČOI)
Ústřední inspektorát – oddělení ADR
Štěpánská 44, 110 00 Praha 1
Web: https://www.coi.cz
E-mail: adr@coi.cz

Platformu pro řešení sporů online (ODR) naleznete na:
https://ec.europa.eu/consumers/odr/`,
        },
        {
          heading: '9. Účinnost',
          body: `Tento reklamační řád je platný a účinný od ${TODO} (datum).`,
        },
      ],
    },
    vi: {
      title: 'Quy trình khiếu nại',
      sections: [
        {
          heading: '1. Quy định chung',
          body: `Quy trình khiếu nại này được ban hành theo luật Séc (Občanský zákoník + Zákon o ochraně spotřebitele).

Người bán:
${TODO} Họ tên / Tên doanh nghiệp
IČO: ${TODO}
Địa chỉ: ${TODO}
Email: info@trangphamcosmetics.cz
Điện thoại: (+420) 607 715 020`,
        },
        {
          heading: '2. Thời hạn bảo hành',
          body: `• 24 tháng kể từ ngày nhận hàng
• Mỹ phẩm có hạn sử dụng: theo ngày ghi trên sản phẩm
• Thời hạn bảo hành được kéo dài thêm thời gian khiếu nại`,
        },
        {
          heading: '3. Cách thực hiện khiếu nại',
          body: `Liên hệ qua email, điện thoại hoặc trực tiếp. Cung cấp:
• Số đơn hàng hoặc hóa đơn
• Mô tả lỗi sản phẩm
• Yêu cầu xử lý (sửa, đổi, giảm giá, hoàn tiền)

Gửi sản phẩm khiếu nại về: ${TODO}`,
        },
        {
          heading: '4. Quyền của người mua',
          body: `Trong 12 tháng đầu, sản phẩm lỗi được coi là lỗi từ khi giao. Bạn có quyền yêu cầu:
• Sửa chữa
• Đổi sản phẩm mới
• Giảm giá hợp lý
• Hủy hợp đồng (nếu lỗi nghiêm trọng)`,
        },
        {
          heading: '5. Thời hạn xử lý',
          body: `Tối đa 30 ngày. Nếu quá hạn, bạn có quyền hủy hợp đồng.`,
        },
        {
          heading: '6. Trường hợp không được khiếu nại',
          body: `• Lỗi do sử dụng sai cách
• Hư hỏng do người mua
• Hết hạn bảo hành
• Hao mòn tự nhiên`,
        },
        {
          heading: '7. Chi phí',
          body: `Khiếu nại hợp lệ: người bán chịu chi phí vận chuyển. Khiếu nại không hợp lệ: người mua chịu.`,
        },
        {
          heading: '8. Giải quyết tranh chấp',
          body: `ČOI (Česká obchodní inspekce): www.coi.cz
ODR: https://ec.europa.eu/consumers/odr/`,
        },
        {
          heading: '9. Hiệu lực',
          body: `Có hiệu lực từ: ${TODO}`,
        },
      ],
    },
    en: {
      title: 'Complaint Procedure',
      sections: [
        {
          heading: '1. General',
          body: `This complaint procedure is issued under Czech Civil Code and Consumer Protection Act.

Seller:
${TODO} Full name / Business name
IČO: ${TODO}
Address: ${TODO}
Email: info@trangphamcosmetics.cz
Phone: (+420) 607 715 020`,
        },
        {
          heading: '2. Warranty Period',
          body: `• 24 months from delivery
• Cosmetics with expiry dates: as marked on the product
• Warranty period extends by the duration of the complaint`,
        },
        {
          heading: '3. Filing a Complaint',
          body: `Contact via email, phone, or in person. Provide:
• Order number or proof of purchase
• Description of defect
• Desired resolution (repair, replacement, discount, refund)

Send products to: ${TODO}`,
        },
        {
          heading: '4. Consumer Rights',
          body: `Within the first 12 months, defects are presumed to have existed at delivery. You may request:
• Repair
• Replacement
• Reasonable discount
• Contract withdrawal (for substantial breach)`,
        },
        {
          heading: '5. Resolution Timeline',
          body: `Maximum 30 days. If exceeded, you may withdraw from the contract.`,
        },
        {
          heading: '6. Exclusions',
          body: `• Damage from misuse
• Mechanical damage by buyer
• Expired warranty
• Natural wear and tear`,
        },
        {
          heading: '7. Costs',
          body: `Justified complaints: seller bears shipping. Unjustified: buyer bears costs.`,
        },
        {
          heading: '8. Dispute Resolution',
          body: `Czech Trade Inspection (ČOI): www.coi.cz
ODR platform: https://ec.europa.eu/consumers/odr/`,
        },
        {
          heading: '9. Effective Date',
          body: `Effective from: ${TODO}`,
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
