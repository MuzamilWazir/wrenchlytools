import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { Icon } from '@/components/ui/Icon';
import { ToolRow } from '@/components/ui/ToolCard';
import { AdSlot } from '@/components/tools/AdSlot';
import { FavoriteButton } from '@/components/tools/FavoriteButton';
import { ToolVisitTracker } from '@/components/tools/ToolVisitTracker';
import { CoverLetterToolLoader } from '@/components/pages/CoverLetterToolLoader';
import {
  CoverLetterFaq,
  CoverLetterGuide,
  CoverLetterHowTo,
} from '@/components/pages/CoverLetterGuide';
import { CATEGORIES } from '@/data/categories';
import { getToolBySlug } from '@/data/toolsRegistry';
import {
  COVER_LETTER_DESCRIPTION,
  COVER_LETTER_FAQS,
  COVER_LETTER_HOW_TO_STEPS,
  COVER_LETTER_INTRO,
  COVER_LETTER_OG_IMAGE,
  COVER_LETTER_ROUTE,
  COVER_LETTER_TITLE,
} from '@/data/coverLetterSeo';
import { SITE_NAME, SITE_URL } from '@/lib/site';

const tool = getToolBySlug('cover-letter-generator')!;

const absolute = (path: string) => new URL(path, SITE_URL).toString();

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Cover Letter Generator',
      description: COVER_LETTER_DESCRIPTION,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any (web browser)',
      url: absolute(COVER_LETTER_ROUTE),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: COVER_LETTER_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'HowTo',
      name: 'How to use the Cover Letter Generator',
      step: COVER_LETTER_HOW_TO_STEPS.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        text: step,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absolute('/') },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: absolute('/tools') },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Generators',
          item: absolute('/tools/generators'),
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Cover Letter Generator',
          item: absolute(COVER_LETTER_ROUTE),
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: { absolute: COVER_LETTER_TITLE },
  description: COVER_LETTER_DESCRIPTION,
  keywords: [],
  alternates: {
    canonical: COVER_LETTER_ROUTE,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: COVER_LETTER_ROUTE,
    title: COVER_LETTER_TITLE,
    description: COVER_LETTER_DESCRIPTION,
    images: [
      {
        url: COVER_LETTER_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Cover letter generator interface: pick a purpose and tone, then generate an editable letter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COVER_LETTER_TITLE,
    description: COVER_LETTER_DESCRIPTION,
    images: [COVER_LETTER_OG_IMAGE],
  },
};

export default function CoverLetterGeneratorPage() {
  const category = CATEGORIES[tool.category];
  const relatedTools = (tool.relatedToolSlugs || [])
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is NonNullable<typeof t> => !!t);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ToolVisitTracker slug={tool.slug} />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: category?.name || tool.category, href: `/tools/${tool.category}` },
            { label: tool.name },
          ]}
        />

        <div className="mb-6 mt-2 flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-moss-50 text-moss-600 ring-1 ring-inset ring-moss-100">
              <Icon name={tool.icon} className="h-6 w-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  {tool.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-moss-50 px-2.5 py-1 text-[11px] font-semibold text-moss-700">
                  <Shield className="h-3.5 w-3.5" />
                  Runs 100% In-Browser
                </span>
              </div>
              <p className="mt-1.5 max-w-3xl text-sm text-stone-600">
                {COVER_LETTER_INTRO}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <FavoriteButton slug={tool.slug} />
          </div>
        </div>

        <AdSlot position="top" />

        {/* Interactive tool — client component, loaded below the H1 */}
        <div className="mb-10 rounded-2xl border border-line bg-white p-4 shadow-[0_1px_2px_rgba(27,42,37,0.04),0_10px_28px_-18px_rgba(27,42,37,0.25)] sm:p-6">
          <CoverLetterToolLoader />
        </div>

        <AdSlot position="bottom" />

        <CoverLetterHowTo />

        <CoverLetterFaq />

        <CoverLetterGuide />

        {relatedTools.length > 0 && (
          <section className="mt-10 border-t border-line pt-6">
            <h2 className="mb-3 text-base font-bold text-ink">
              Related Tools in {category?.name || 'WrenchlyTools'}
            </h2>
            <div className="space-y-2">
              {relatedTools.map((rel) => (
                <ToolRow key={rel.slug} tool={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
