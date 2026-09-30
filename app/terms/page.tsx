import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of WrenchlyTools, including our license, intellectual property, and warranty disclaimer.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-moss-500/10 text-moss-600 text-xs font-bold mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Terms of Service</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink">Terms of Service</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: September 2026</p>
      </div>

      <div className="prose text-xs leading-relaxed space-y-4 text-stone-600">
        <h2 className="text-base font-bold text-ink">1. Acceptance of Terms</h2>
        <p>
          By accessing and utilizing WrenchlyTools (&quot;the Service&quot;), you agree to abide by these Terms of Service. If you disagree with any part of these terms, please discontinue using the website immediately.
        </p>

        <h2 className="text-base font-bold text-ink">2. Use License and Intellectual Property</h2>
        <p>
          WrenchlyTools grants you a free, non-exclusive license to use all tools, calculators, generators, and converters for both personal and commercial projects. Any files, documents, or graphics you produce with our tools are 100% your own property.
        </p>

        <h2 className="text-base font-bold text-ink">3. Disclaimer of Warranty</h2>
        <p>
          The tools and calculators provided on WrenchlyTools are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. While we rigorously test all formulas (such as tax calculations, loan EMIs, and unit conversions), results should be verified before making major financial, tax, or legal commitments.
        </p>
      </div>
    </div>
  );
}
