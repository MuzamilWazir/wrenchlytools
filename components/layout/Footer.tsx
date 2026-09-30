'use client'

import Link from 'next/link';
import { Wrench, Shield } from 'lucide-react';
import { CATEGORY_LIST } from '@/data/categories';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-moss-900 text-stone-300 border-t border-moss-800 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-10 border-b border-moss-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-moss-500 flex items-center justify-center text-white">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Wrenchly<span className="text-moss-300">Tools</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              The all-in-one digital utility toolbox. Everyday online tools for students, developers, creators, freelancers, and small businesses — done in seconds.
            </p>
            <div className="flex items-center gap-2 text-stone-300 bg-moss-800 border border-moss-700 rounded-lg px-3 py-2 max-w-sm">
              <Shield className="w-4 h-4 text-moss-600 shrink-0" />
              <p className="text-[11px] leading-tight">
                <strong className="text-white font-semibold">Privacy Guaranteed:</strong> Client-side tools execute locally in your browser. We never store or inspect your confidential data.
              </p>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Categories</h4>
            <ul className="space-y-1.5">
              {CATEGORY_LIST.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/tools/${cat.slug}`}
                    className="transition-colors hover:text-moss-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">More Categories</h4>
            <ul className="space-y-1.5">
              {CATEGORY_LIST.slice(5).map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/tools/${cat.slug}`}
                    className="transition-colors hover:text-moss-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tools"
                  className="font-medium text-moss-300 hover:text-moss-200"
                >
                  View All Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Company & Legal</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/about" className="transition-colors hover:text-moss-200">
                  About WrenchlyTools
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-moss-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-moss-200">
                  FAQs & Help
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-moss-200">
                  Articles & Guides
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-moss-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-moss-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="transition-colors hover:text-moss-200">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {currentYear} WrenchlyTools. Every tool you need, all in one place.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for productivity & speed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
