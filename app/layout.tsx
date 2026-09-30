import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchProvider } from "@/components/providers/SearchProvider";
import { TOOLS_REGISTRY } from "@/data/toolsRegistry";
import { SITE_DESCRIPTION, SITE_NAME, SITE_OG_IMAGE, SITE_URL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Everyday tools. Done in seconds.`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "free online tools",
    "browser based utilities",
    "image compressor",
    "pdf merger",
    "json formatter",
    "word counter",
    "qr code generator",
    "unit converter",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Everyday tools. Done in seconds.`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1600,
        height: 730,
        alt: `${SITE_NAME} online utility toolbox`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Everyday tools. Done in seconds.`,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F1EA",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "WrenchlyTools Free Online Utilities",
    description: SITE_DESCRIPTION,
    numberOfItems: TOOLS_REGISTRY.length,
    itemListElement: TOOLS_REGISTRY.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}${tool.route}`,
    })),
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink selection:bg-moss-500/20 selection:text-moss-700">
        <SearchProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SearchProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
