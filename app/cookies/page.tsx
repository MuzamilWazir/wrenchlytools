import type { Metadata } from "next";
import { Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "WrenchlyTools uses no tracking cookies. Learn exactly what we store in your browser's localStorage and how to clear it.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold mb-3">
          <Cookie className="w-3.5 h-3.5" />
          <span>Cookie Policy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-ink">Cookie Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: September 2026</p>
      </div>

      <div className="prose text-xs leading-relaxed space-y-4 text-stone-600">
        <h2 className="text-base font-bold text-ink">How We Use Cookies and Local Storage</h2>
        <p>
          WrenchlyTools does not use tracking cookies to follow your activity across external websites. We use standard browser <strong>localStorage</strong> strictly to:
        </p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Remember your theme preference (Light or Dark mode).</li>
          <li>Save the list of tools you have marked as Favorites.</li>
          <li>Maintain your recent tool history for quick navigation.</li>
        </ul>
        <p>
          You can clear your localStorage data at any time via your browser settings or directly via the &quot;Clear History&quot; button on the Recent Tools page.
        </p>
      </div>
    </div>
  );
}
