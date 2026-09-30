'use client'

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Is WrenchlyTools really 100% free to use?',
    a: 'Yes, every single tool in our directory is completely free. We do not require credit card information, trial sign-ups, or subscriptions.',
  },
  {
    q: 'Do you store or upload my files to your servers?',
    a: 'No. Tools on WrenchlyTools are engineered to execute client-side directly within your browser memory using HTML5 Canvas, WebAssembly, and native Web APIs (such as pdf-lib and Web Crypto). Your confidential documents, images, and passwords never leave your computer.',
  },
  {
    q: 'Can I use WrenchlyTools offline?',
    a: 'Yes! Once a tool page has loaded in your browser, the client-side JavaScript operates without an active internet connection. You can compress images, calculate loan payments, format JSON, and generate passwords entirely offline.',
  },
  {
    q: 'Do generated files or images include a watermark?',
    a: 'Never. Any file, image, PDF, or barcode you create or convert on WrenchlyTools is 100% clean and free of watermarks or promotional branding.',
  },
  {
    q: 'What is the maximum file size for image compression and PDF merging?',
    a: 'Because processing happens on your device using your computer\u2019s RAM and CPU, files up to 50MB typically process smoothly. For optimal performance, we recommend files under 25MB.',
  },
  {
    q: 'How does the Pakistan Income Tax Calculator stay accurate?',
    a: 'Our Pakistan Income Tax Calculator is updated in accordance with the Federal Board of Revenue (FBR) salaried tax slabs as enacted under the Pakistan Finance Act for Tax Year 2024-2025 and 2025-2026.',
  },
  {
    q: 'How do favorites and recently used tools work?',
    a: 'Favorites and your recent tool history are stored locally in your browser\u2019s localStorage. No server tracking or account registration is needed.',
  },
];

export function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-moss-500/10 text-moss-600 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help &amp; Answers</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Everything you need to know about WrenchlyTools, client-side privacy, and our feature set.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.q}
              className="rounded-2xl border border-line bg-white overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 text-sm font-bold text-ink flex items-center justify-between hover:bg-stone-50"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-line">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-3xl bg-stone-50 border border-line text-center space-y-3">
        <h3 className="text-base font-bold text-ink">Still have questions?</h3>
        <p className="text-xs text-stone-600 max-w-sm mx-auto">
          Our team is happy to assist. Send us a message and we will get back to you.
        </p>
        <Link
          href="/contact"
          className="inline-block px-5 py-2.5 bg-moss-500 text-white text-xs font-bold rounded-xl"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
