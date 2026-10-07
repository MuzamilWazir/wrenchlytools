'use client'

import { useEffect, useRef, useState } from 'react';
import {
  Copy,
  Check,
  Download,
  Printer,
  RefreshCw,
  Sparkles,
  Eraser,
  Wand2,
} from 'lucide-react';

type PurposeKey =
  | 'job'
  | 'internship'
  | 'scholarship'
  | 'admission'
  | 'visa'
  | 'volunteer'
  | 'proposal'
  | 'general';

type ToneKey = 'professional' | 'confident' | 'enthusiastic' | 'formal' | 'friendly';

interface Fields {
  purpose: PurposeKey;
  name: string;
  title: string;
  company: string;
  manager: string;
  years: string;
  tone: ToneKey;
  skills: string;
  ach: string;
  why: string;
  jd: string;
}

const STORAGE_KEY = 'clg2';

const DEFAULT_FIELDS: Fields = {
  purpose: 'job',
  name: '',
  title: '',
  company: '',
  manager: '',
  years: '',
  tone: 'professional',
  skills: '',
  ach: '',
  why: '',
  jd: '',
};

const FIELD_KEYS: (keyof Fields)[] = [
  'purpose',
  'name',
  'title',
  'company',
  'manager',
  'years',
  'tone',
  'skills',
  'ach',
  'why',
  'jd',
];

const STOP = new Set(
  'the and for with you our are will that this from your have has not but all can any who what their they about more such into also able work role team job experience years year including across within ability strong skills required preferred must should looking join which we us to of in on a an is as be by or at it'.split(
    ' '
  )
);

const PURPOSES: {
  key: PurposeKey;
  label: string;
}[] = [
  { key: 'job', label: 'Job application' },
  { key: 'internship', label: 'Internship' },
  { key: 'scholarship', label: 'Scholarship' },
  { key: 'admission', label: 'University admission' },
  { key: 'visa', label: 'Visa / travel' },
  { key: 'volunteer', label: 'Volunteer role' },
  { key: 'proposal', label: 'Proposal / partnership' },
  { key: 'general', label: 'General' },
];

const TONES: { key: ToneKey; label: string }[] = [
  { key: 'professional', label: 'Professional' },
  { key: 'confident', label: 'Confident' },
  { key: 'enthusiastic', label: 'Enthusiastic' },
  { key: 'formal', label: 'Formal' },
  { key: 'friendly', label: 'Friendly' },
];

/* Purpose settings: labels, wording and greeting */
const P: Record<
  PurposeKey,
  {
    t: string;
    c: string;
    s: string;
    a: string;
    w: string;
    j: string;
    tp: string;
    cp: string;
    target: string;
    m: string;
    ah: string;
    ask: string;
    hi: string;
  }
> = {
  job: {
    t: 'Job title',
    c: 'Company',
    s: 'Top skills (comma separated)',
    a: 'Key achievements (one per line, add numbers)',
    w: 'Why this company? (optional)',
    j: 'Job description (optional, used to match keywords)',
    tp: 'Frontend Developer',
    cp: 'Acme Corp',
    target: 'the {t} position at {c}',
    m: 'my background in {s}',
    ah: 'Some highlights of my work:',
    ask: 'discuss how I can contribute to {c}',
    hi: 'Hiring Manager',
  },
  internship: {
    t: 'Internship role',
    c: 'Company',
    s: 'Relevant skills and coursework',
    a: 'Projects and achievements (one per line)',
    w: 'Why this company? (optional)',
    j: 'Internship description (optional)',
    tp: 'Marketing Intern',
    cp: 'Acme Corp',
    target: 'the {t} internship at {c}',
    m: 'my studies and early experience in {s}',
    ah: 'Projects I am proud of:',
    ask: 'learn from your team at {c} and contribute from day one',
    hi: 'Hiring Manager',
  },
  scholarship: {
    t: 'Scholarship name',
    c: 'Awarding organization',
    s: 'Fields of study and strengths',
    a: 'Academic and personal achievements (one per line)',
    w: 'Your goals and why you deserve it (optional)',
    j: 'Eligibility criteria (optional)',
    tp: 'Merit Scholarship',
    cp: 'Future Leaders Foundation',
    target: 'the {t} offered by {c}',
    m: 'my academic commitment to {s}',
    ah: 'My key achievements include:',
    ask: 'be considered for this scholarship',
    hi: 'Scholarship Committee',
  },
  admission: {
    t: 'Program / course',
    c: 'University',
    s: 'Academic interests and strengths',
    a: 'Academic achievements and activities (one per line)',
    w: 'Why this university? (optional)',
    j: 'Program requirements (optional)',
    tp: 'MSc Computer Science',
    cp: 'State University',
    target: 'admission to the {t} program at {c}',
    m: 'my academic interests in {s}',
    ah: 'Highlights of my academic journey:',
    ask: 'join {c} and contribute to its community',
    hi: 'Admissions Committee',
  },
  visa: {
    t: 'Purpose of visit',
    c: 'Country / embassy',
    s: 'Reasons you will return home (ties, job, family)',
    a: 'Trip plan and funding details (one per line)',
    w: 'Additional context (optional)',
    j: 'Embassy requirements (optional)',
    tp: 'tourist',
    cp: 'the Embassy of Canada',
    target: 'a {t} visa through {c}',
    m: 'my strong ties to my home country, including {s}',
    ah: 'Details of my trip:',
    ask: 'travel as planned and return on schedule',
    hi: 'Visa Officer',
  },
  volunteer: {
    t: 'Volunteer role',
    c: 'Organization',
    s: 'Skills you can offer',
    a: 'Relevant experience (one per line)',
    w: 'Why this cause? (optional)',
    j: 'Role description (optional)',
    tp: 'Community Helper',
    cp: 'City Food Bank',
    target: 'the {t} volunteer role at {c}',
    m: 'my skills in {s}',
    ah: 'Relevant experience:',
    ask: 'support the mission of {c}',
    hi: 'Volunteer Coordinator',
  },
  proposal: {
    t: 'Proposal subject',
    c: 'Recipient organization',
    s: 'Your strengths and services',
    a: 'Past results (one per line)',
    w: 'What you propose / the value for them (optional)',
    j: 'Their requirements (optional)',
    tp: 'website redesign',
    cp: 'Northwind Ltd',
    target: 'a proposal for {t} with {c}',
    m: 'my experience in {s}',
    ah: 'Results I have delivered:',
    ask: 'discuss this proposal with {c}',
    hi: 'Team',
  },
  general: {
    t: 'Subject / purpose',
    c: 'Recipient organization',
    s: 'Key strengths',
    a: 'Key points (one per line)',
    w: 'Anything else to add (optional)',
    j: 'Related description (optional)',
    tp: 'my request',
    cp: 'your organization',
    target: '{t} at {c}',
    m: 'my experience in {s}',
    ah: 'Key points:',
    ask: 'discuss this further',
    hi: 'Sir or Madam',
  },
};

const T: Record<
  ToneKey,
  { open: string[]; mid: string; close: string; sign: string }
> = {
  professional: {
    open: ['I am writing to apply for {x}.', 'I would like to be considered for {x}.'],
    mid: 'I bring {m}.',
    close:
      'I would welcome the opportunity to {k}. Thank you for your time and consideration.',
    sign: 'Sincerely,',
  },
  confident: {
    open: ['I am well prepared for {x}.', 'I am confident I am a strong fit for {x}.'],
    mid: 'With {m}, I am ready to make an impact.',
    close: 'I am ready to {k}. I look forward to speaking with you soon.',
    sign: 'Best regards,',
  },
  enthusiastic: {
    open: ['I am excited to apply for {x}!', 'Few opportunities excite me as much as {x}.'],
    mid: 'I am passionate about {m}.',
    close:
      'I would love the chance to {k}. Thank you so much for considering me!',
    sign: 'With excitement,',
  },
  formal: {
    open: [
      'I wish to formally apply for {x}.',
      'Please accept this letter as my application for {x}.',
    ],
    mid: 'I possess {m}.',
    close:
      'I respectfully request the opportunity to {k}. I thank you for your kind consideration.',
    sign: 'Yours faithfully,',
  },
  friendly: {
    open: ["Hi! I'd love to apply for {x}.", 'I recently learned about {x} and wanted to reach out.'],
    mid: 'I enjoy {m}.',
    close: "I'd really enjoy the chance to {k}. Thanks for reading!",
    sign: 'Warm regards,',
  },
};

const EXAMPLES: Record<string, Partial<Fields>> = {
  job: {
    title: 'Frontend Developer',
    company: 'Brightlane',
    years: '4',
    skills: 'React, TypeScript, accessibility',
    ach: 'Cut page load time by 40%\nLed a team of 3 to ship a design system',
    why: 'I admire how Brightlane puts accessibility first.',
    jd: 'Looking for a Frontend Developer with React, GraphQL and testing experience.',
  },
  internship: {
    title: 'Data Analyst Intern',
    company: 'Northwind',
    years: '',
    skills: 'Python, statistics, Excel',
    ach: 'Built a sales dashboard for a class project\nTop 5% in Data Structures',
    why: '',
    jd: '',
  },
  scholarship: {
    title: 'Merit Scholarship',
    company: 'Future Leaders Foundation',
    years: '',
    skills: 'physics and engineering',
    ach: 'GPA 3.9/4.0\nFounded a school robotics club with 30 members',
    why: 'This scholarship would let me focus on research without financial strain.',
    jd: '',
  },
  admission: {
    title: 'MSc Computer Science',
    company: 'State University',
    years: '',
    skills: 'machine learning and security',
    ach: 'Graduated with distinction\nPublished a paper on image classification',
    why: 'Your research lab in applied ML matches my goals.',
    jd: '',
  },
  visa: {
    title: 'tourist',
    company: 'the Embassy of Canada',
    years: '',
    skills: 'my full-time job, family, and property at home',
    ach: 'Trip: 10 days, Toronto and Niagara\nFunding: personal savings and employer leave approval',
    why: '',
    jd: '',
  },
  volunteer: {
    title: 'Community Helper',
    company: 'City Food Bank',
    years: '',
    skills: 'organizing, driving and teamwork',
    ach: 'Ran a neighborhood clothing drive for 200 families',
    why: 'Food security matters deeply to me.',
    jd: '',
  },
  proposal: {
    title: 'website redesign',
    company: 'Northwind Ltd',
    years: '5',
    skills: 'UX design and front-end development',
    ach: 'Increased conversions by 25% for a retail client',
    why: 'I propose a 6-week redesign focused on mobile checkout.',
    jd: '',
  },
  general: {
    title: 'my request for a mentorship',
    company: 'the Alumni Association',
    years: '',
    skills: 'product management',
    ach: '',
    why: '',
    jd: '',
  },
};

const PRINT_CSS = `@media print{
body *{visibility:hidden !important}
#cl-print,#cl-print *{visibility:visible !important}
#cl-print{position:absolute;left:0;top:0;width:100%;display:block !important;margin:0;padding:0;white-space:pre-wrap;font-family:Georgia,'Times New Roman',serif;font-size:12pt;line-height:1.6;color:#000}
}`;

function list(s: string, sep: string) {
  return s
    .split(sep)
    .map((x) => x.trim())
    .filter(Boolean);
}

function joinList(a: string[]) {
  if (a.length < 2) return a.join('');
  return a.slice(0, -1).join(', ') + ' and ' + a[a.length - 1];
}

function keywords(jd: string, skills: string[]) {
  const have = skills.map((s) => s.toLowerCase());
  const counts: Record<string, number> = {};
  const matches = jd.toLowerCase().match(/[a-z][a-z+#.\-]{2,}/g) || [];
  matches.forEach((raw) => {
    const w = raw.replace(/[.\-]+$/, '');
    if (!STOP.has(w) && have.indexOf(w) < 0) counts[w] = (counts[w] || 0) + 1;
  });
  return Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, 6);
}

const inputCls =
  'w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-stone-400 focus:border-moss-400 focus:outline-none focus:ring-2 focus:ring-moss-500/15';
const labelCls = 'block text-xs font-semibold text-stone-500 mb-1';
const secondaryBtnCls =
  'inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-stone-600 transition-colors hover:border-moss-300 hover:text-moss-700';

export function CoverLetterGeneratorTool() {
  const [fields, setFields] = useState<Fields>(DEFAULT_FIELDS);
  const [output, setOutput] = useState('');
  const [kws, setKws] = useState<string[]>([]);
  const [toast, setToast] = useState('');
  const variantRef = useRef(0);
  const hydratedRef = useRef(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Restore saved draft (runs only in the browser) */
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Fields>;
        const next: Fields = { ...DEFAULT_FIELDS };
        FIELD_KEYS.forEach((key) => {
          if (saved[key] != null) {
            Object.assign(next, { [key]: saved[key] as string });
          }
        });
        if (!P[next.purpose]) next.purpose = 'job';
        if (!T[next.tone]) next.tone = 'professional';
        setFields(next);
      }
    } catch {
      /* ignore corrupted storage */
    }
    hydratedRef.current = true;
  }, []);

  /* Persist draft */
  useEffect(() => {
    if (!hydratedRef.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    } catch {
      /* storage full or unavailable */
    }
  }, [fields]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  };

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const purpose = P[fields.purpose] || P.job;
  const tone = T[fields.tone] || T.professional;

  const build = (f: Fields, variant: number) => {
    const p = P[f.purpose] || P.job;
    const tn = T[f.tone] || T.professional;
    const name = f.name || '[Your Name]';
    const title = f.title || '[' + p.t + ']';
    const co = f.company || '[' + p.c + ']';
    const skills = list(f.skills, ',');
    const ach = list(f.ach, '\n');
    const yrs = parseInt(f.years, 10);

    const fill = (s: string) =>
      s
        .replace(/\{t\}/g, title)
        .replace(/\{c\}/g, co)
        .replace(
          /\{s\}/g,
          skills.length ? joinList(skills.slice(0, 4)) : '[your key strengths]'
        );

    const x = fill(p.target);
    const m = fill(p.m);
    const k = fill(p.ask);
    const kwsFound = keywords(f.jd, skills);

    const out: string[] = [];
    out.push('Dear ' + (f.manager || p.hi) + ',');
    const intro =
      tn.open[variant % tn.open.length].replace('{x}', x) + ' ' + tn.mid.replace('{m}', m);
    const withYears =
      yrs > 0
        ? intro + ' I have ' + yrs + ' year' + (yrs > 1 ? 's' : '') + ' of relevant experience.'
        : intro;
    out.push(withYears);
    if (ach.length) {
      out.push(
        p.ah +
          '\n' +
          ach
            .slice(0, 5)
            .map((a) => '• ' + a.replace(/^[•\-*]\s*/, ''))
            .join('\n')
      );
    }
    if (kwsFound.length) {
      out.push(
        'The requirements, including ' +
          joinList(kwsFound.slice(0, 3)) +
          ', align closely with my background and goals.'
      );
    }
    if (f.why) out.push(f.why);
    out.push(tn.close.replace('{k}', k));
    out.push(tn.sign + '\n' + name);

    setOutput(out.join('\n\n'));
    setKws(kwsFound);
  };

  const onGenerate = () => {
    variantRef.current = 0;
    build(fields, 0);
  };

  const onAnotherVersion = () => {
    variantRef.current += 1;
    build(fields, variantRef.current);
  };

  const onExample = () => {
    const example = EXAMPLES[fields.purpose] || EXAMPLES.job;
    const next: Fields = { ...fields, name: 'Aisha Khan', manager: '' };
    FIELD_KEYS.forEach((key) => {
      if (key in example) {
        Object.assign(next, { [key]: String(example[key]) });
      }
    });
    variantRef.current = 0;
    setFields(next);
    build(next, 0);
  };

  const onClear = () => {
    variantRef.current = 0;
    const next: Fields = {
      ...DEFAULT_FIELDS,
      purpose: fields.purpose,
      tone: fields.tone,
    };
    setFields(next);
    setOutput('');
    setKws([]);
  };

  const onCopy = async () => {
    if (!output) return showToast('Generate a letter first');
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(output);
      } else {
        const el = document.getElementById('cl-out') as HTMLTextAreaElement | null;
        el?.select();
        document.execCommand('copy');
      }
      showToast('Copied');
    } catch {
      showToast('Copy failed — select the text and copy manually');
    }
  };

  const onDownload = () => {
    if (!output) return showToast('Generate a letter first');
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download =
      'cover-letter-' +
      (fields.company || 'draft').toLowerCase().replace(/\W+/g, '-') +
      '.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onPrint = () => {
    if (!output) return showToast('Generate a letter first');
    window.print();
  };

  const words = (output.trim().match(/\S+/g) || []).length;
  const hint = !words
    ? ''
    : words < 150
      ? 'A bit short. Aim for 200–400 words.'
      : words > 450
        ? 'Long. Aim for 200–400 words.'
        : 'Good length.';

  return (
    <div className="space-y-5">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-3 rounded-2xl border border-line bg-stone-50/60 p-4">
          <div>
            <label htmlFor="cl-purpose" className={labelCls}>
              What is the letter for?
            </label>
            <select
              id="cl-purpose"
              value={fields.purpose}
              onChange={(e) => set('purpose', e.target.value as PurposeKey)}
              className={inputCls}
            >
              {PURPOSES.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cl-name" className={labelCls}>
                Your name
              </label>
              <input
                id="cl-name"
                autoComplete="name"
                value={fields.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Aisha Khan"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="cl-title" className={labelCls}>
                {purpose.t}
              </label>
              <input
                id="cl-title"
                value={fields.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder={purpose.tp}
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cl-company" className={labelCls}>
                {purpose.c}
              </label>
              <input
                id="cl-company"
                value={fields.company}
                onChange={(e) => set('company', e.target.value)}
                placeholder={purpose.cp}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="cl-manager" className={labelCls}>
                Recipient name (optional)
              </label>
              <input
                id="cl-manager"
                value={fields.manager}
                onChange={(e) => set('manager', e.target.value)}
                placeholder="Sam Rivera"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="cl-years" className={labelCls}>
                Years of relevant experience (optional)
              </label>
              <input
                id="cl-years"
                type="number"
                min={0}
                max={50}
                value={fields.years}
                onChange={(e) => set('years', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="cl-tone" className={labelCls}>
                Tone
              </label>
              <select
                id="cl-tone"
                value={fields.tone}
                onChange={(e) => set('tone', e.target.value as ToneKey)}
                className={inputCls}
              >
                {TONES.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="cl-skills" className={labelCls}>
              {purpose.s}
            </label>
            <input
              id="cl-skills"
              value={fields.skills}
              onChange={(e) => set('skills', e.target.value)}
              placeholder="React, TypeScript, accessibility"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="cl-ach" className={labelCls}>
              {purpose.a}
            </label>
            <textarea
              id="cl-ach"
              rows={3}
              value={fields.ach}
              onChange={(e) => set('ach', e.target.value)}
              className={inputCls + ' resize-y'}
            />
          </div>

          <div>
            <label htmlFor="cl-why" className={labelCls}>
              {purpose.w}
            </label>
            <textarea
              id="cl-why"
              rows={2}
              value={fields.why}
              onChange={(e) => set('why', e.target.value)}
              className={inputCls + ' resize-y'}
            />
          </div>

          <div>
            <label htmlFor="cl-jd" className={labelCls}>
              {purpose.j}
            </label>
            <textarea
              id="cl-jd"
              rows={3}
              value={fields.jd}
              onChange={(e) => set('jd', e.target.value)}
              className={inputCls + ' resize-y'}
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={onGenerate}
              className="inline-flex items-center gap-1.5 rounded-lg bg-moss-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-moss-600"
            >
              <Wand2 className="h-3.5 w-3.5" />
              Generate letter
            </button>
            <button type="button" onClick={onAnotherVersion} className={secondaryBtnCls}>
              <RefreshCw className="h-3.5 w-3.5" />
              Another version
            </button>
            <button type="button" onClick={onExample} className={secondaryBtnCls}>
              <Sparkles className="h-3.5 w-3.5" />
              Try an example
            </button>
            <button type="button" onClick={onClear} className={secondaryBtnCls}>
              <Eraser className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col rounded-2xl border border-line bg-white p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <label htmlFor="cl-out" className="text-xs font-semibold text-stone-500">
              Your cover letter (edit anything before you copy)
            </label>
            <button
              type="button"
              onClick={onCopy}
              title="Copy to clipboard"
              className="rounded-md p-1.5 text-stone-400 transition-colors hover:text-moss-600"
            >
              <span className="sr-only">Copy letter</span>
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <textarea
            id="cl-out"
            aria-label="Generated cover letter, editable"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Your letter will appear here. You can edit it before copying, downloading or printing."
            className="min-h-[380px] w-full flex-1 resize-y rounded-xl border border-stone-200 bg-stone-50/60 p-4 font-serif text-sm leading-relaxed text-ink placeholder:text-stone-400 focus:border-moss-400 focus:outline-none focus:ring-2 focus:ring-moss-500/15"
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
            <span>{words} words</span>
            <span>{hint}</span>
          </div>
          {kws.length > 0 && (
            <p className="mt-2 text-xs text-stone-500">
              Keywords from the description worth mentioning:{' '}
              <span className="font-semibold text-moss-600">{kws.join(', ')}</span>
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={onDownload} className={secondaryBtnCls}>
              <Download className="h-3.5 w-3.5" />
              Download .txt
            </button>
            <button type="button" onClick={onPrint} className={secondaryBtnCls}>
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-moss-500 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-moss-600"
            >
              <Check className="h-3.5 w-3.5" />
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Print target: only this block is visible when printing */}
      <div id="cl-print" className="hidden">
        {output}
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white shadow-lg transition-opacity duration-200 ${
          toast ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {toast}
      </div>
    </div>
  );
}
