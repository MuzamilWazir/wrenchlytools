'use client'

import Link from 'next/link';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '@/data/faqs';


export function FAQPage() {
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
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-2xl border border-line bg-white overflow-hidden transition-colors"
          >
            <summary className="w-full cursor-pointer list-none p-5 text-sm font-bold text-ink flex items-center justify-between hover:bg-stone-50">
              <span>{faq.q}</span>
              <ChevronDown className="w-4 h-4 text-stone-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-5 pt-1 text-xs text-stone-600 leading-relaxed border-t border-line">
              {faq.a}
            </div>
          </details>
        ))}
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
