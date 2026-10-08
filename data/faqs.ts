export interface SiteFAQ {
  q: string;
  a: string;
}

/** Site-wide FAQs shown on /faq and embedded as FAQPage JSON-LD. */
export const FAQS: SiteFAQ[] = [
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
    a: 'Our Pakistan Income Tax Calculator follows the Federal Board of Revenue (FBR) salaried tax slabs as enacted under the Finance Act 2026 for Tax Year 2026-27, and is reviewed after every federal budget.',
  },
  {
    q: 'How do favorites and recently used tools work?',
    a: 'Favorites and your recent tool history are stored locally in your browser\u2019s localStorage. No server tracking or account registration is needed.',
  },
];
