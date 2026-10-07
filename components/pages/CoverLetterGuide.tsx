import Link from 'next/link';
import { CheckCircle2, ChevronDown, HelpCircle } from 'lucide-react';
import {
  COVER_LETTER_FAQS,
  COVER_LETTER_HOW_TO_STEPS,
} from '@/data/coverLetterSeo';

const linkCls =
  'font-medium text-moss-600 underline underline-offset-2 transition-colors hover:text-moss-700';

export function CoverLetterHowTo() {
  return (
    <section
      aria-labelledby="cl-howto-heading"
      className="mb-8 rounded-2xl border border-line bg-stone-50 p-6"
    >
      <h2
        id="cl-howto-heading"
        className="mb-3 flex items-center gap-2 text-base font-bold text-ink"
      >
        <CheckCircle2 className="h-4 w-4 text-moss-600" />
        How to use the Cover Letter Generator
      </h2>
      <ol className="space-y-2 text-sm text-stone-600">
        {COVER_LETTER_HOW_TO_STEPS.map((step, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss-500 text-xs font-bold text-white">
              {idx + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CoverLetterFaq() {
  return (
    <section aria-labelledby="cl-faq-heading" className="mb-8">
      <h2
        id="cl-faq-heading"
        className="mb-3 flex items-center gap-2 text-base font-bold text-ink"
      >
        <HelpCircle className="h-4 w-4 text-moss-600" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {COVER_LETTER_FAQS.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-line bg-white overflow-hidden"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-stone-50 [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-stone-500 transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-line px-4 pb-3 pt-1 text-xs leading-relaxed text-stone-600 sm:text-sm">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function CoverLetterGuide() {
  return (
    <section aria-labelledby="cl-guide-heading" className="mt-10 border-t border-line pt-8">
      <h2 id="cl-guide-heading" className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
        Cover letter guide: how to write one that gets read
      </h2>
      <p className="mt-3 text-[15px] leading-8 text-stone-700">
        Everything below is written to work with the{' '}
        <strong className="font-semibold text-ink">cover letter generator</strong> on this
        page, but the advice stands on its own. Whether you are applying for a job today or
        drafting a formal request next month, the same structure gets you a clear, credible
        letter — and our free cover letter maker turns that structure into a finished draft
        in seconds.
      </p>

      <h3 className="mt-6 text-lg font-bold text-ink">
        What is a cover letter and when do you need one
      </h3>
      <p className="mt-2 text-[15px] leading-8 text-stone-700">
        A cover letter is a short, one-page letter that introduces you and explains why you
        are applying. It sits alongside your CV or application form and connects the facts
        in those documents to the specific role, program or decision in front of you. You
        need one for most job applications, internships, scholarships, university
        admissions, visa requests, volunteer roles and business proposals. If the posting
        or the embassy asks for a letter, always send one — a missing letter is a common
        reason applications are set aside. When no letter is requested, a well-written one
        still differentiates you from candidates with a similar profile.
      </p>

      <h3 className="mt-6 text-lg font-bold text-ink">
        How to write a cover letter: the structure that works
      </h3>
      <p className="mt-2 text-[15px] leading-8 text-stone-700">
        Keep it to four parts. One page, three or four short paragraphs, no walls of text.
      </p>

      <h4 className="mt-4 text-base font-semibold text-ink">1. Greeting</h4>
      <p className="mt-1 text-[15px] leading-8 text-stone-700">
        Address a real person whenever you can find one — a hiring manager, a scholarship
        committee chair, an admissions tutor. If the name is unknown, use the right generic
        form for the context: <em>Hiring Manager</em> for a company,{' '}
        <em>Scholarship Committee</em> or <em>Admissions Committee</em> for academic
        decisions, <em>Visa Officer</em> for an embassy. Never open with “To whom it may
        concern” if a better option exists.
      </p>

      <h4 className="mt-4 text-base font-semibold text-ink">2. Opening</h4>
      <p className="mt-1 text-[15px] leading-8 text-stone-700">
        In the first two sentences, name the exact position, scholarship or program and
        state your strongest reason for applying. The reader should know what this letter
        is about without reading further. Match the tone of the organization: a formal
        program wants a formal opening; a startup team is fine with something warmer.
      </p>

      <h4 className="mt-4 text-base font-semibold text-ink">3. Body</h4>
      <p className="mt-1 text-[15px] leading-8 text-stone-700">
        One or two paragraphs of evidence. Pick two or three achievements that match what
        the description asks for and quantify them where you can — percentages, team sizes,
        deadlines, grades. Mirror the wording of the listing: if it says “accessibility”
        and “testing,” and you have both, say so in those words. This is where most
        applications are won, and it is also where the keyword matching in the generator
        helps you spot terms worth mentioning.
      </p>

      <h4 className="mt-4 text-base font-semibold text-ink">4. Closing and signature</h4>
      <p className="mt-1 text-[15px] leading-8 text-stone-700">
        End with a clear, single request: that you would welcome an interview, be
        considered for the award, be admitted to the program or granted the visa. Thank the
        reader, sign off consistently with your greeting (“Sincerely,” or “Yours
        faithfully,” for formal letters) and add your name and contact details.
      </p>

      <h3 className="mt-6 text-lg font-bold text-ink">
        How to write a scholarship cover letter
      </h3>
      <p className="mt-2 text-[15px] leading-8 text-stone-700">
        A scholarship cover letter has to do two jobs at once: prove merit and show that
        the money will be used well. Open with the exact name of the award and the year.
        In the body, connect your academic record and activities to the award’s criteria —
        selection committees score against published criteria, not against general
        impressions. Then explain your goals and, briefly, your financial context: what the
        funding unlocks, such as full-time study, research time or a year without
        part-time work. Close by stating what you will do with the opportunity. Keep it
        factual and specific; awards committees read hundreds of letters and remember the
        ones with concrete detail.
      </p>
      <p className="mt-2 text-[15px] leading-8 text-stone-700">
        <strong className="font-semibold text-ink">Short example:</strong>
      </p>
      <blockquote className="mt-2 rounded-r-xl border-l-4 border-moss-500 bg-moss-50/60 px-4 py-3 text-[15px] italic leading-8 text-stone-700">
        “I am applying for the Merit Scholarship offered by the Future Leaders Foundation.
        Maintaining a 3.9 GPA while leading a 30-member robotics club has taught me to
        manage demanding deadlines. This scholarship would let me focus on my final-year
        research project without reducing my hours to paid work, and I plan to publish the
        results before graduation.”
      </blockquote>

      <h3 className="mt-6 text-lg font-bold text-ink">
        How to write a university application letter
      </h3>
      <p className="mt-2 text-[15px] leading-8 text-stone-700">
        A university application letter — sometimes called a motivation letter — should
        explain three things: why this subject, why this program, and what you will bring
        to the cohort. Start with the specific program and the area of the field that
        interests you. Use the middle paragraph for academic evidence: courses, projects,
        grades, research, competitions, work experience. The final paragraph should show
        fit — name a module, lab, teaching approach or student community that attracts you,
        and say what you would contribute in return. Keep the register formal, proofread
        twice, and check whether the department wants the letter as an attachment or in a
        text box — that affects length.
      </p>

      <h3 className="mt-6 text-lg font-bold text-ink">How to write a visa cover letter</h3>
      <p className="mt-2 text-[15px] leading-8 text-stone-700">
        A visa cover letter is a cover of facts, not a story. Address it to the visa officer
        at the relevant embassy and state the visa type and purpose of travel in the first
        line. Then cover, in order: your itinerary and dates, who is funding the trip and
        how, your travel and employment history, and — most important — your ties to your
        home country (a job to return to, family, property, studies). Attach or reference
        the supporting documents you are submitting so the officer can find them. Do not
        exaggerate or add emotional appeals; consistency between your letter, your
        application form and your documents is what gets a visa cover letter approved.
      </p>

      <h3 className="mt-6 text-lg font-bold text-ink">
        How to write an internship cover letter
      </h3>
      <p className="mt-2 text-[15px] leading-8 text-stone-700">
        An internship cover letter should not pretend you have a career behind you. Lead
        with your studies, coursework and projects, then show one or two examples of work
        you have actually shipped — a class project, a society event, a part-time job, open
        source contributions. Enthusiasm counts for more here than for senior roles, so say
        what you want to learn and what you can contribute from week one. State your
        availability and duration clearly. Finish by linking your letter to a matching
        application: build the document itself in our{' '}
        <Link href="/tools/generators/resume-builder" className={linkCls}>
          resume builder
        </Link>{' '}
        so both pieces use the same keywords and the same story.
      </p>

      <h3 className="mt-6 text-lg font-bold text-ink">
        Cover letter tips: do’s and don’ts
      </h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-4">
          <h4 className="text-sm font-bold text-ink">Do</h4>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-stone-600 marker:text-moss-500">
            <li>Customize every letter for the specific role, program or embassy.</li>
            <li>Quantify achievements — numbers make claims believable.</li>
            <li>Mirror important keywords from the description or eligibility criteria.</li>
            <li>Keep it to one page and 200–400 words.</li>
            <li>Read it aloud once before sending, and check every name and date.</li>
            <li>Save and reuse drafts — this tool keeps your inputs in your own browser only.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-white p-4">
          <h4 className="text-sm font-bold text-ink">Don’t</h4>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-stone-600 marker:text-clay-500">
            <li>Repeat your CV line by line — add context instead of duplication.</li>
            <li>Use one generic letter for ten different applications.</li>
            <li>Badmouth past employers, schools or officials.</li>
            <li>Exaggerate dates, grades or titles — they are checked.</li>
            <li>Send a letter full of typos, wrong names or the wrong company.</li>
            <li>Paste unedited generated text — always proofread your draft first.</li>
          </ul>
        </div>
      </div>

      <p className="mt-5 text-[15px] leading-8 text-stone-700">
        After your letter is ready, follow up professionally: a short, polite message goes
        a long way, and the{' '}
        <Link href="/tools/ai/email-writer" className={linkCls}>
          professional email writer
        </Link>{' '}
        can draft it for you. And because everything on this page runs in your own browser,
        it helps to understand{' '}
        <Link
          href="/blog/how-browser-side-tools-protect-privacy"
          className={linkCls}
        >
          how browser-side tools protect your privacy
        </Link>{' '}
        when you are handling personal documents such as applications and identity papers.
      </p>
    </section>
  );
}
