import Link from 'next/link';
import { Wrench, Shield, Zap, Heart, CheckCircle2 } from 'lucide-react';

export function AboutContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-moss-500/10 text-moss-600 text-xs font-bold">
          <Wrench className="w-3.5 h-3.5" />
          <span>About WrenchlyTools</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-ink">
          The digital workbench built for everyone.
        </h1>
        <p className="text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          WrenchlyTools was founded on a simple principle: you shouldn&apos;t have to create an account, view invasive ads, or upload private files to a server just to perform a simple calculation, format JSON, or compress an image.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-line bg-white">
          <div className="w-10 h-10 rounded-xl bg-moss-500/10 text-moss-600 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-ink mb-1">Instant Execution</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            By avoiding unnecessary server round-trips, our tools process files and text with near-instant responsiveness.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-line bg-white">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-ink mb-1">Privacy By Design</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Your images, PDFs, passwords, and JSON never leave your computer. Everything runs client-side using modern Web APIs.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-line bg-white">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-ink mb-1">100% Free</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            No paywalls, hidden tiers, or trial periods. We build tools that empower students, developers, and creators worldwide.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-stone-50 border border-line space-y-4">
        <h2 className="text-xl font-bold text-ink">Our Commitments</h2>
        <ul className="space-y-3 text-sm text-stone-600">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>No Watermarks:</strong> Any generated image, barcode, PDF, or file is 100% clean and free of logos.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Transparent Formulas:</strong> Calculators and converters clearly display underlying mathematical formulas.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span><strong>Zero Tracking of User Input:</strong> Text typed in our editors is never logged, stored, or mined for AI training.</span>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <Link
          href="/tools"
          className="inline-block px-6 py-3 bg-moss-500 hover:bg-moss-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
        >
          Explore the Toolbox →
        </Link>
      </div>
    </div>
  );
}
