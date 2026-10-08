import Link from 'next/link';
import type { ReactNode } from 'react';
import type { ToolGuide } from '@/data/toolGuides';

function renderInline(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <Link
          key={i}
          href={link[2]}
          className="font-medium text-moss-600 underline decoration-moss-300 underline-offset-2 hover:text-moss-700 hover:decoration-moss-500"
        >
          {link[1]}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function formatDate(iso: string): string {
  const parsed = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function ToolGuideSections({ guide }: { guide: ToolGuide }) {
  return (
    <div className="mt-8 space-y-8">
      {guide.sections.map((section, i) => (
        <section key={i}>
          <h2 className="text-lg font-bold tracking-tight text-ink mb-3">
            {section.heading}
          </h2>
          {section.paragraphs?.map((p, j) => (
            <p key={j} className="text-sm leading-relaxed text-stone-600 mb-3">
              {renderInline(p)}
            </p>
          ))}
          {section.list && (
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-600 marker:text-moss-500">
              {section.list.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          )}
          {section.table && (
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-stone-50 text-left">
                    {section.table.headers.map((h, j) => (
                      <th
                        key={j}
                        className="border-b border-line px-3 py-2 text-xs font-semibold text-stone-500"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) => (
                        <td
                          key={k}
                          className="border-b border-line px-3 py-2 text-stone-600 last:border-b-0"
                        >
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      <p className="text-xs text-stone-400">
        Last reviewed:{' '}
        <time dateTime={guide.lastReviewed}>{formatDate(guide.lastReviewed)}</time>{' '}
        by the WrenchlyTools team.
      </p>
    </div>
  );
}
