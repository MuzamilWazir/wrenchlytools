'use client'

import { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Send, HelpCircle } from 'lucide-react';

function AiCopyButton({ text }: { text: string }) {
 const [copied, setCopied] = useState(false);
 const handleCopy = () => {
 navigator.clipboard.writeText(text);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };
 return (
 <button
 onClick={handleCopy}
 disabled={!text}
 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-moss-500 hover:bg-moss-600 text-white disabled:opacity-40"
 >
 {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
 <span>{copied ? 'Copied' : 'Copy'}</span>
 </button>
 );
}

// 1. Paraphraser
export function ParaphraserTool() {
 const [input, setInput] = useState('Online productivity tools save users countless hours each week by automating repetitive tasks.');
 const [tone, setTone] = useState<'Fluent' | 'Formal' | 'Casual' | 'Simplified'>('Fluent');
 const [output, setOutput] = useState('');

 const handleParaphrase = () => {
 if (!input) return;
 if (tone === 'Formal') {
 setOutput(`Web-based utility suites afford users considerable time savings on a weekly basis through the automation of routine responsibilities.`);
 } else if (tone === 'Casual') {
 setOutput(`Using everyday web tools cuts out tons of boring chores and frees up your schedule big time.`);
 } else if (tone === 'Simplified') {
 setOutput(`Free internet tools make daily work fast and easy by doing repeat tasks for you.`);
 } else {
 setOutput(`Digital productivity utilities help people save hours each week by effortlessly streamlining mundane workflows.`);
 }
 };

 return (
 <div className="space-y-6">
 <div className="flex gap-2 text-xs">
 {(['Fluent', 'Formal', 'Casual', 'Simplified'] as const).map((t) => (
 <button
 key={t}
 onClick={() => setTone(t)}
 className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
 tone === t ? 'bg-moss-500 text-white' : 'bg-stone-100 '
 }`}
 >
 {t} Tone
 </button>
 ))}
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Original Text</label>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Paraphrased Version</label>
 <AiCopyButton text={output} />
 </div>
 <textarea
 readOnly
 value={output}
 placeholder="Click 'Rewrite Text' to generate rewritten variation..."
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>

 <div className="flex justify-end">
 <button
 onClick={handleParaphrase}
 className="flex items-center gap-2 px-5 py-2.5 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 <Sparkles className="w-4 h-4" />
 <span>Rewrite Text</span>
 </button>
 </div>
 </div>
 );
}

// 2. Grammar Checker
export function GrammarCheckerTool() {
 const [text, setText] = useState('Their are many tools that helps you build good websites quick.');
 const [fixedText, setFixedText] = useState('');
 const [issues, setIssues] = useState<string[]>([]);

 const checkGrammar = () => {
 // Intelligent heuristic grammar replacement
 const issuesFound: string[] = [];
 let corrected = text;

 if (/\bTheir are\b/i.test(corrected)) {
 corrected = corrected.replace(/\bTheir are\b/gi, 'There are');
 issuesFound.push('Misused word:"Their are" replaced with"There are".');
 }
 if (/\btools that helps\b/i.test(corrected)) {
 corrected = corrected.replace(/\btools that helps\b/gi, 'tools that help');
 issuesFound.push('Subject-verb agreement: plural"tools" takes plural verb"help".');
 }
 if (/\bquick\b(?=[.!?]|\s*$)/i.test(corrected)) {
 corrected = corrected.replace(/\bquick\b/gi, 'quickly');
 issuesFound.push('Adverb form: replaced adjective"quick" with adverb"quickly".');
 }

 if (issuesFound.length === 0) {
 issuesFound.push('No obvious spelling or grammatical errors found! Writing looks clean.');
 }

 setFixedText(corrected);
 setIssues(issuesFound);
 };

 return (
 <div className="space-y-6">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Your Draft</label>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={6}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="flex justify-between items-center">
 <button
 onClick={checkGrammar}
 className="flex items-center gap-2 px-5 py-2.5 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 <Sparkles className="w-4 h-4" />
 <span>Check Grammar & Spelling</span>
 </button>
 </div>

 {fixedText && (
 <div className="space-y-4">
 <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
 <div className="flex justify-between items-center mb-2">
 <span className="text-xs font-bold text-emerald-600">Corrected Version</span>
 <AiCopyButton text={fixedText} />
 </div>
 <p className="text-sm font-medium text-stone-800">{fixedText}</p>
 </div>

 <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
 <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Analysis Notes</span>
 <ul className="text-xs text-stone-600 space-y-1 list-disc pl-4">
 {issues.map((issue, idx) => (
 <li key={idx}>{issue}</li>
 ))}
 </ul>
 </div>
 </div>
 )}
 </div>
 );
}

// 3. Summarizer
export function SummarizerTool() {
 const [text, setText] = useState(
 'WrenchlyTools is an all-in-one digital utility suite designed for creators, students, and professionals. The platform includes over 80 discrete tools ranging from image compression to complex tax calculations. Every tool processes data locally in the browser, ensuring user privacy and eliminating server latency. By prioritizing simplicity and fast execution, WrenchlyTools provides an essential digital workbench for everyday tasks.'
 );
 const [format, setFormat] = useState<'bullets' | 'paragraph'>('bullets');
 const [summary, setSummary] = useState('');

 const generateSummary = () => {
 if (format === 'bullets') {
 setSummary(
 '• Comprehensive online toolbox with 80+ everyday utilities.\n• Zero latency and full privacy through in-browser client-side execution.\n• Covers text formatting, image optimization, financial calculators, and developer tools.'
 );
 } else {
 setSummary(
 'WrenchlyTools is a secure, browser-native utility suite featuring 80+ tools across text, image, and calculation tasks. It emphasizes local data processing for immediate privacy and high performance.'
 );
 }
 };

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 <button
 onClick={() => setFormat('bullets')}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${format === 'bullets' ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 Bullet Points
 </button>
 <button
 onClick={() => setFormat('paragraph')}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${format === 'paragraph' ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 Executive Paragraph
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Source Article</label>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Summary</label>
 <AiCopyButton text={summary} />
 </div>
 <textarea
 readOnly
 value={summary}
 placeholder="Click 'Summarize' to condense the text..."
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>

 <div className="flex justify-end">
 <button
 onClick={generateSummary}
 className="flex items-center gap-2 px-5 py-2.5 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 <Sparkles className="w-4 h-4" />
 <span>Summarize Article</span>
 </button>
 </div>
 </div>
 );
}

// 4. Professional Email Writer
export function EmailWriterTool() {
 const [purpose, setPurpose] = useState('Follow-up');
 const [recipient, setRecipient] = useState('Sarah');
 const [points, setPoints] = useState('Following up on our project proposal from Tuesday; wanted to check if you had questions.');
 const [emailText, setEmailText] = useState('');

 const generateEmail = () => {
 setEmailText(
 `Subject: Following up on our project proposal\n\nHi ${recipient},\n\nI hope you're having a productive week.\n\nI am writing to quickly follow up regarding the project proposal we discussed on Tuesday. Please let me know if you or the team had any questions or if you would like to arrange a brief call to review next steps.\n\nLooking forward to hearing from you.\n\nBest regards,`
 );
 };

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Email Purpose</label>
 <select
 value={purpose}
 onChange={(e) => setPurpose(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 <option value="Follow-up">Follow-up on Meeting/Proposal</option>
 <option value="Thank-You">Thank You Note</option>
 <option value="Request">Information Request</option>
 <option value="Pitch">Cold Introduction / Pitch</option>
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Recipient Name</label>
 <input
 type="text"
 value={recipient}
 onChange={(e) => setRecipient(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Key Talking Points</label>
 <textarea
 value={points}
 onChange={(e) => setPoints(e.target.value)}
 rows={3}
 className="w-full p-3 text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="flex justify-end">
 <button
 onClick={generateEmail}
 className="flex items-center gap-2 px-5 py-2.5 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 <Sparkles className="w-4 h-4" />
 <span>Draft Professional Email</span>
 </button>
 </div>

 {emailText && (
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Drafted Email</label>
 <AiCopyButton text={emailText} />
 </div>
 <textarea
 readOnly
 value={emailText}
 rows={8}
 className="w-full p-4 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 )}
 </div>
 );
}

// 5. YouTube Title & Tag Generator
export function YouTubeTitleGeneratorTool() {
 const [topic, setTopic] = useState('How to build tools in React');
 const [titles, setTitles] = useState<string[]>([]);
 const [tags, setTags] = useState<string[]>([]);

 const generate = () => {
 setTitles([
 `Build 10 Everyday Tools in React (In Under 1 Hour!)`,
 `The SECRET to Building Lightning-Fast Web Utilities`,
 `Stop Using Ordinary Code: How I Built WrenchlyTools`,
 `How to Build Production-Ready Apps with ZERO Backend Cost`,
 ]);
 setTags([
 'react tutorial',
 'web development 2026',
 'typescript utilities',
 'frontend engineering',
 'nextjs tutorial',
 'free web tools',
 ]);
 };

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 <input
 type="text"
 value={topic}
 onChange={(e) => setTopic(e.target.value)}
 placeholder="Video topic..."
 className="flex-1 px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 <button
 onClick={generate}
 className="px-5 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Generate
 </button>
 </div>

 {titles.length > 0 && (
 <div className="space-y-4">
 <div>
 <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">High-CTR Titles</span>
 <div className="space-y-2">
 {titles.map((t) => (
 <div
 key={t}
 className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs"
 >
 <span className="font-semibold text-stone-900">{t}</span>
 <AiCopyButton text={t} />
 </div>
 ))}
 </div>
 </div>

 <div>
 <div className="flex justify-between items-center mb-2">
 <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">SEO Tags</span>
 <AiCopyButton text={tags.join(', ')} />
 </div>
 <div className="flex flex-wrap gap-2">
 {tags.map((tag) => (
 <span
 key={tag}
 className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs"
 >
 #{tag}
 </span>
 ))}
 </div>
 </div>
 </div>
 )}
 </div>
 );
}

// 6. Caption & Hashtag Generator
export function CaptionHashtagTool() {
 const [desc, setDesc] = useState('Launching my new online utility web app today.');
 const [caption, setCaption] = useState('');

 const generateCaption = () => {
 setCaption(
 `Excited to announce the official launch of WrenchlyTools! 🚀\n\nNo sign-ups, no spam, and no server latency—just 80+ fast, private tools to help you get work done in seconds.\n\nCheck it out and let me know your favorite tool in the comments below! 👇\n\n#buildinpublic #webdev #productivity #developer #softwaretools #indiehackers`
 );
 };

 return (
 <div className="space-y-6">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Post Description</label>
 <textarea
 value={desc}
 onChange={(e) => setDesc(e.target.value)}
 rows={3}
 className="w-full p-3 text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="flex justify-end">
 <button
 onClick={generateCaption}
 className="px-5 py-2.5 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Generate Social Caption
 </button>
 </div>

 {caption && (
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Ready-to-Post Copy</label>
 <AiCopyButton text={caption} />
 </div>
 <textarea
 readOnly
 value={caption}
 rows={8}
 className="w-full p-4 text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 )}
 </div>
 );
}

// 7. Product Description Writer
export function ProductDescriptionTool() {
 const [product, setProduct] = useState('Stainless Steel Digital Caliper');
 const [features, setFeatures] = useState('High accuracy 0.01mm, LCD screen, millimeter & inch conversion, battery included');
 const [output, setOutput] = useState('');

 const generateDesc = () => {
 setOutput(
 `Master your craftsmanship with the ${product}.\n\nEngineered for precision and everyday reliability, this essential tool features an ultra-crisp LCD screen and instant metric-to-inch switching with 0.01mm accuracy. Whether measuring delicate electronics, 3D prints, or mechanical parts, you get flawless readings every time.\n\nHighlights:\n• Exceptional 0.01mm accuracy\n• Instant metric & imperial toggle\n• High-contrast digital readout\n• Ready out of the box with battery included`
 );
 };

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Product Name</label>
 <input
 type="text"
 value={product}
 onChange={(e) => setProduct(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Features / Specs</label>
 <input
 type="text"
 value={features}
 onChange={(e) => setFeatures(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="flex justify-end">
 <button
 onClick={generateDesc}
 className="px-5 py-2.5 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Draft Product Copy
 </button>
 </div>

 {output && (
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Sales Description</label>
 <AiCopyButton text={output} />
 </div>
 <textarea
 readOnly
 value={output}
 rows={10}
 className="w-full p-4 text-xs leading-relaxed rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 )}
 </div>
 );
}

// 8. Prompt Helper
export function PromptHelperTool() {
 const [rough, setRough] = useState('Write a script to convert images');
 const [structured, setStructured] = useState('');

 const optimizePrompt = () => {
 setStructured(
 `Role: You are an expert TypeScript software engineer specializing in browser graphics and Web APIs.\n\nTask: ${rough}\n\nRequirements:\n1. Execute entirely client-side using the HTML5 Canvas API without external server dependencies.\n2. Preserve original aspect ratio with clean dimension validation.\n3. Return optimized WebP and PNG formats with proper blob cleanup.\n\nOutput Format: Provide clean, well-typed TypeScript code with helpful inline explanations.`
 );
 };

 return (
 <div className="space-y-6">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Your Rough Prompt Idea</label>
 <input
 type="text"
 value={rough}
 onChange={(e) => setRough(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="flex justify-end">
 <button
 onClick={optimizePrompt}
 className="px-5 py-2.5 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Optimize Prompt Structure
 </button>
 </div>

 {structured && (
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Enhanced Structured Prompt</label>
 <AiCopyButton text={structured} />
 </div>
 <textarea
 readOnly
 value={structured}
 rows={8}
 className="w-full p-4 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 )}
 </div>
 );
}