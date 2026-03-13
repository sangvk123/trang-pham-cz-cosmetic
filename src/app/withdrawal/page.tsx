'use client';

import { useRef } from 'react';
import { useLocale } from '@/lib/LocaleContext';
import { useToast } from '@/lib/ToastContext';
import { t } from '@/lib/i18n';

// ============================================================
// [TODO] CẦN BỔ SUNG SAU KHI MỞ ŽIVNOST:
// 1. Tên, IČO, địa chỉ sídlo (phần "Adresát")
// ============================================================

const TODO = '[TODO]';

export default function WithdrawalPage() {
  const { locale } = useLocale();
  const { showToast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      locale === 'vi' ? 'Đã gửi! Chúng tôi sẽ phản hồi trong 24 giờ.' :
      locale === 'cs' ? 'Odesláno! Odpovíme do 24 hodin.' :
      'Sent! We will respond within 24 hours.',
      'success'
    );
    formRef.current?.reset();
  };

  const titles: Record<string, string> = {
    cs: 'Odstoupení od smlouvy',
    vi: 'Mẫu đơn hủy đơn hàng',
    en: 'Withdrawal Form',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-text-muted mb-6">
        <a href="/" className="hover:text-sage-darker">{t('nav.home', locale)}</a>
        <span className="mx-2">/</span>
        <span className="text-charcoal font-medium">{titles[locale]}</span>
      </nav>

      <h1 className="text-3xl font-bold text-charcoal mb-4 text-center font-[family-name:var(--font-playfair)] italic">
        {titles[locale]}
      </h1>

      <p className="text-sm text-text-secondary text-center mb-8">
        {locale === 'cs'
          ? 'Vzorový formulář pro odstoupení od smlouvy dle § 1829 občanského zákoníku. Máte 14 dní od převzetí zboží.'
          : locale === 'vi'
          ? 'Mẫu đơn rút lui khỏi hợp đồng theo § 1829 Luật dân sự Séc. Bạn có 14 ngày từ khi nhận hàng.'
          : 'Withdrawal form per § 1829 Czech Civil Code. You have 14 days from delivery.'
        }
      </p>

      {/* Printable form template */}
      <div className="bg-cream rounded-xl p-6 mb-8 print:bg-white print:p-0 print:border-0">
        <div className="border border-border rounded-lg p-6 bg-white">
          <h2 className="text-base font-bold text-charcoal mb-4">
            {locale === 'cs' ? 'VZOROVÝ FORMULÁŘ PRO ODSTOUPENÍ OD SMLOUVY' :
             locale === 'vi' ? 'MẪU ĐƠN RÚT LUI KHỎI HỢP ĐỒNG' :
             'MODEL WITHDRAWAL FORM'}
          </h2>

          <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
            <p className="font-medium text-charcoal">
              {locale === 'cs' ? 'Adresát:' : locale === 'vi' ? 'Gửi đến:' : 'To:'}
            </p>
            <p>
              {TODO} {locale === 'cs' ? 'Jméno a příjmení / Název firmy' : locale === 'vi' ? 'Họ tên / Tên doanh nghiệp' : 'Name / Business name'}<br />
              {TODO} {locale === 'cs' ? 'Adresa sídla' : locale === 'vi' ? 'Địa chỉ' : 'Address'}<br />
              Email: info@trangphamcosmetics.cz
            </p>

            <p className="font-medium text-charcoal pt-2">
              {locale === 'cs' ? 'Oznamuji, že tímto odstupuji od smlouvy o nákupu tohoto zboží:' :
               locale === 'vi' ? 'Tôi thông báo rút lui khỏi hợp đồng mua sản phẩm sau:' :
               'I hereby withdraw from the contract for the purchase of:'}
            </p>

            <div className="space-y-2 pt-1">
              <p>{locale === 'cs' ? 'Datum objednání:' : locale === 'vi' ? 'Ngày đặt hàng:' : 'Order date:'} _______________</p>
              <p>{locale === 'cs' ? 'Datum obdržení:' : locale === 'vi' ? 'Ngày nhận hàng:' : 'Date received:'} _______________</p>
              <p>{locale === 'cs' ? 'Číslo objednávky:' : locale === 'vi' ? 'Số đơn hàng:' : 'Order number:'} _______________</p>
              <p>{locale === 'cs' ? 'Popis zboží:' : locale === 'vi' ? 'Mô tả sản phẩm:' : 'Product description:'} _______________</p>
            </div>

            <div className="space-y-2 pt-2">
              <p>{locale === 'cs' ? 'Jméno a příjmení spotřebitele:' : locale === 'vi' ? 'Họ tên người mua:' : 'Consumer name:'} _______________</p>
              <p>{locale === 'cs' ? 'Adresa spotřebitele:' : locale === 'vi' ? 'Địa chỉ:' : 'Address:'} _______________</p>
              <p>{locale === 'cs' ? 'Číslo účtu pro vrácení peněz:' : locale === 'vi' ? 'Số tài khoản hoàn tiền:' : 'Bank account for refund:'} _______________</p>
            </div>

            <div className="pt-4">
              <p>{locale === 'cs' ? 'Datum:' : locale === 'vi' ? 'Ngày:' : 'Date:'} _______________</p>
              <p className="pt-4">{locale === 'cs' ? 'Podpis:' : locale === 'vi' ? 'Chữ ký:' : 'Signature:'} _______________</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 bg-charcoal text-white py-2.5 rounded-full text-sm font-medium hover:bg-charcoal-light transition-colors"
          >
            {locale === 'cs' ? 'Vytisknout formulář' : locale === 'vi' ? 'In mẫu đơn' : 'Print Form'}
          </button>
        </div>
      </div>

      {/* Online submission */}
      <div className="print:hidden">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          {locale === 'cs' ? 'Nebo vyplňte online:' : locale === 'vi' ? 'Hoặc gửi online:' : 'Or submit online:'}
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">
                {locale === 'cs' ? 'Jméno a příjmení' : locale === 'vi' ? 'Họ tên' : 'Full Name'} *
              </label>
              <input required type="text" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Email *</label>
              <input required type="email" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">
                {locale === 'cs' ? 'Číslo objednávky' : locale === 'vi' ? 'Số đơn hàng' : 'Order Number'} *
              </label>
              <input required type="text" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark" />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">
                {locale === 'cs' ? 'Číslo účtu (IBAN)' : locale === 'vi' ? 'Số tài khoản (IBAN)' : 'Bank Account (IBAN)'}
              </label>
              <input type="text" className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              {locale === 'cs' ? 'Popis zboží k vrácení' : locale === 'vi' ? 'Mô tả sản phẩm cần trả' : 'Product Description'} *
            </label>
            <textarea required rows={3} className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-sage-dark focus:ring-1 focus:ring-sage-dark resize-none" />
          </div>
          <button type="submit" className="w-full bg-charcoal text-white py-3 rounded-full font-medium text-sm hover:bg-charcoal-light transition-colors">
            {locale === 'cs' ? 'Odeslat odstoupení' : locale === 'vi' ? 'Gửi đơn rút lui' : 'Submit Withdrawal'}
          </button>
        </form>
      </div>
    </div>
  );
}
