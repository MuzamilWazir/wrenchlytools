import type { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — WrenchlyTools In-Browser Security",
  description:
    "WrenchlyTools runs client-side: your files, text, and passwords are processed in your browser and never uploaded to our servers.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>Privacy Guaranteed</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink">Privacy Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: September 2026</p>
      </div>

      <div className="prose text-xs leading-relaxed space-y-4 text-stone-600">
        <h2 className="text-base font-bold text-ink">1. Client-Side Execution First</h2>
        <p>
          At WrenchlyTools, we believe the most private file is the one you never send over the wire. Unlike standard online utility portals that upload your confidential PDFs, passwords, or personal photos to cloud servers for processing, WrenchlyTools prioritizes client-side execution. Tools such as our PDF Merger, Image Compressor, JSON Formatter, and Password Generator run 100% within your local browser memory using JavaScript and WebAssembly.
        </p>

        <h2 className="text-base font-bold text-ink">2. No Account or Personal Data Collection</h2>
        <p>
          WrenchlyTools does not require registration, login, credit card information, or user passwords. Your favorite tools and recent history are stored exclusively in your browser&apos;s localStorage and are never synced to our servers.
        </p>

        <h2 className="text-base font-bold text-ink">3. Third-Party Analytics and Cookies</h2>
        <p>
          We do not use invasive tracking pixels or cross-site tracking cookies. We strictly utilize privacy-respecting basic telemetry solely to identify aggregate page views and error diagnostics.
        </p>

        <h2 className="text-base font-bold text-ink">4. Contacting Us</h2>
        <p>
          If you have questions regarding this Privacy Policy or our client-side architecture, please reach out via our contact page.
        </p>
      </div>
    </div>
  );
}
