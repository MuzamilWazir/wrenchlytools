'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Copy, Check, Download, Trash2, Play, Square, RefreshCw, Volume2, ArrowUpDown } from 'lucide-react';

// Reusable action buttons
function CopyButton({ text }: { text: string }) {
 const [copied, setCopied] = useState(false);
 const handleCopy = () => {
 if (!text) return;
 navigator.clipboard.writeText(text);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };
 return (
 <button
 onClick={handleCopy}
 disabled={!text}
 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-moss-500 hover:bg-moss-600 text-white disabled:opacity-40 transition-colors"
 >
 {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
 <span>{copied ? 'Copied' : 'Copy'}</span>
 </button>
 );
}

// 1. Word Counter
export function WordCounterTool() {
 const [text, setText] = useState(
 'WrenchlyTools is a complete, fast, and secure online toolbox built for everyday productivity. Write, format, convert, and calculate right in your browser without worrying about privacy.'
 );

 const stats = useMemo(() => {
 const trimmed = text.trim();
 const words = trimmed ? trimmed.split(/\s+/).length : 0;
 const charsWithSpaces = text.length;
 const charsWithoutSpaces = text.replace(/\s+/g, '').length;
 const sentences = trimmed ? trimmed.split(/[.!?]+/).filter(Boolean).length : 0;
 const paragraphs = trimmed ? trimmed.split(/\n+/).filter(Boolean).length : 0;
 const lines = text ? text.split('\n').length : 0;
 const readingTimeMinutes = (words / 200).toFixed(1);
 const speakingTimeMinutes = (words / 130).toFixed(1);

 return {
 words,
 charsWithSpaces,
 charsWithoutSpaces,
 sentences,
 paragraphs,
 lines,
 readingTime: `${readingTimeMinutes} min`,
 speakingTime: `${speakingTimeMinutes} min`,
 };
 }, [text]);

 return (
 <div className="space-y-6">
 {/* Metric Cards */}
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
 <div className="text-2xl font-extrabold text-moss-600 tabular-nums">{stats.words}</div>
 <div className="text-xs text-stone-500 mt-0.5">Total Words</div>
 </div>
 <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
 <div className="text-2xl font-extrabold text-stone-900 tabular-nums">{stats.charsWithSpaces}</div>
 <div className="text-xs text-stone-500 mt-0.5">Characters (all)</div>
 </div>
 <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
 <div className="text-2xl font-extrabold text-stone-900 tabular-nums">{stats.charsWithoutSpaces}</div>
 <div className="text-xs text-stone-500 mt-0.5">Chars (no spaces)</div>
 </div>
 <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
 <div className="text-2xl font-extrabold text-clay-600 tabular-nums">{stats.readingTime}</div>
 <div className="text-xs text-stone-500 mt-0.5">Reading Time</div>
 </div>
 </div>

 <div className="flex items-center justify-between text-xs text-stone-500 px-1">
 <span>Sentences: <strong className="text-stone-800">{stats.sentences}</strong></span>
 <span>Paragraphs: <strong className="text-stone-800">{stats.paragraphs}</strong></span>
 <span>Lines: <strong className="text-stone-800">{stats.lines}</strong></span>
 <span>Speaking: <strong className="text-stone-800">{stats.speakingTime}</strong></span>
 </div>

 {/* Editor */}
 <div className="relative">
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 placeholder="Start typing or paste your text here..."
 rows={10}
 className="w-full p-4 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-moss-500/40 leading-relaxed font-sans"
 />
 </div>

 {/* Controls */}
 <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
 <div className="flex items-center gap-2">
 <button
 onClick={() => setText('')}
 className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
 >
 <Trash2 className="w-3.5 h-3.5" />
 <span>Clear</span>
 </button>
 <button
 onClick={() => setText('The quick brown fox jumps over the lazy dog. Online utilities streamline everyday tasks effortlessly.')}
 className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200"
 >
 Sample Text
 </button>
 </div>
 <CopyButton text={text} />
 </div>
 </div>
 );
}

// 2. Character Counter
export function CharacterCounterTool() {
 const [text, setText] = useState('');
 const [limit, setLimit] = useState(280);

 const charCount = text.length;
 const charsNoSpaces = text.replace(/\s+/g, '').length;
 const remaining = limit - charCount;
 const percentage = Math.min(100, Math.round((charCount / limit) * 100));

 return (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <div className="flex items-center gap-6">
 <div>
 <span className="text-xs text-stone-500">Characters</span>
 <div className="text-2xl font-bold text-stone-900 tabular-nums">{charCount}</div>
 </div>
 <div>
 <span className="text-xs text-stone-500">No Spaces</span>
 <div className="text-2xl font-bold text-stone-900 tabular-nums">{charsNoSpaces}</div>
 </div>
 <div>
 <span className="text-xs text-stone-500">Remaining</span>
 <div className={`text-2xl font-bold tabular-nums ${remaining < 0 ? 'text-red-500' : 'text-moss-600'}`}>
 {remaining}
 </div>
 </div>
 </div>

 <div className="flex items-center gap-2">
 <label className="text-xs text-stone-600">Preset Limit:</label>
 <select
 value={limit}
 onChange={(e) => setLimit(Number(e.target.value))}
 className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 >
 <option value={160}>160 (SMS)</option>
 <option value={280}>280 (X / Twitter)</option>
 <option value={500}>500 (Meta Description)</option>
 <option value={2200}>2,200 (Instagram)</option>
 <option value={5000}>5,000 (Custom)</option>
 </select>
 </div>
 </div>

 {/* Progress Bar */}
 <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
 <div
 className={`h-full transition-all duration-200 ${
 percentage >= 100 ? 'bg-red-500' : percentage >= 80 ? 'bg-amber-500' : 'bg-moss-500'
 }`}
 style={{ width: `${percentage}%` }}
 />
 </div>

 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 placeholder="Type or paste text to track character count..."
 rows={8}
 className="w-full p-4 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-moss-500/40"
 />

 <div className="flex justify-between items-center">
 <button
 onClick={() => setText('')}
 className="text-xs text-stone-500 hover:text-rose-500"
 >
 Clear Text
 </button>
 <CopyButton text={text} />
 </div>
 </div>
 );
}

// 3. Case Converter
export function CaseConverterTool() {
 const [input, setInput] = useState('Build high-quality web applications using WrenchlyTools.');

 const toTitleCase = (str: string) => {
 const minorWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v[.]?|via|vs[.]?)$/i;
 return str
 .toLowerCase()
 .split(' ')
 .map((word, i) => (i === 0 || !minorWords.test(word) ? word.charAt(0).toUpperCase() + word.slice(1) : word))
 .join(' ');
 };

 const toSentenceCase = (str: string) => {
 return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
 };

 const toAlternating = (str: string) => {
 return str
 .split('')
 .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
 .join('');
 };

 const toInverse = (str: string) => {
 return str
 .split('')
 .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
 .join('');
 };

 const transformations = [
 { label: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
 { label: 'lowercase', fn: (s: string) => s.toLowerCase() },
 { label: 'Title Case', fn: toTitleCase },
 { label: 'Sentence case', fn: toSentenceCase },
 { label: 'aLtErNaTiNg cAsE', fn: toAlternating },
 { label: 'InVeRsE CaSe', fn: toInverse },
 { label: 'kebab-case', fn: (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') },
 { label: 'snake_case', fn: (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/(^_|_$)/g, '') },
 ];

 return (
 <div className="space-y-6">
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={6}
 placeholder="Type or paste your text to change case..."
 className="w-full p-4 rounded-xl border border-stone-200 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-moss-500/40"
 />

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
 {transformations.map((t) => (
 <button
 key={t.label}
 onClick={() => setInput(t.fn(input))}
 className="px-3 py-2 text-xs font-medium rounded-xl border border-stone-200 bg-stone-50 hover:bg-moss-500 hover:text-white hover:border-moss-500 text-stone-800 transition-colors"
 >
 {t.label}
 </button>
 ))}
 </div>

 <div className="flex justify-end gap-2">
 <CopyButton text={input} />
 </div>
 </div>
 );
}

// 4. Remove Duplicate Lines
export function RemoveDuplicateLinesTool() {
 const [input, setInput] = useState("apple\nbanana\norange\napple\nbanana\ngrapes");
 const [caseSensitive, setCaseSensitive] = useState(false);
 const [trimLines, setTrimLines] = useState(true);
 const [removeEmpty, setRemoveEmpty] = useState(true);

 const { output, duplicatesCount } = useMemo(() => {
 const rawLines = input.split('\n');
 const seen = new Set<string>();
 const result: string[] = [];
 let dups = 0;

 for (const raw of rawLines) {
 let line = trimLines ? raw.trim() : raw;
 if (removeEmpty && !line) continue;

 const key = caseSensitive ? line : line.toLowerCase();
 if (seen.has(key)) {
 dups++;
 } else {
 seen.add(key);
 result.push(line);
 }
 }

 return { output: result.join('\n'), duplicatesCount: dups };
 }, [input, caseSensitive, trimLines, removeEmpty]);

 return (
 <div className="space-y-6">
 <div className="flex flex-wrap gap-4 text-xs text-stone-700">
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input
 type="checkbox"
 checked={caseSensitive}
 onChange={(e) => setCaseSensitive(e.target.checked)}
 className="rounded text-moss-600"
 />
 <span>Case sensitive</span>
 </label>
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input
 type="checkbox"
 checked={trimLines}
 onChange={(e) => setTrimLines(e.target.checked)}
 className="rounded text-moss-600"
 />
 <span>Trim whitespace</span>
 </label>
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input
 type="checkbox"
 checked={removeEmpty}
 onChange={(e) => setRemoveEmpty(e.target.checked)}
 className="rounded text-moss-600"
 />
 <span>Remove empty lines</span>
 </label>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Original Text</label>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={8}
 className="w-full p-3 text-xs font-mono rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">
 Clean Result ({duplicatesCount} duplicate{duplicatesCount === 1 ? '' : 's'} removed)
 </label>
 <CopyButton text={output} />
 </div>
 <textarea
 readOnly
 value={output}
 rows={8}
 className="w-full p-3 text-xs font-mono rounded-xl border border-stone-200 bg-stone-50 text-stone-800"
 />
 </div>
 </div>
 </div>
 );
}

// 5. Sort Lines
export function SortLinesTool() {
 const [input, setInput] = useState("Delta\nAlpha\nCharlie\nBravo\nEcho\n10\n2");
 const [sortType, setSortType] = useState<'az' | 'za' | 'numAsc' | 'numDesc' | 'reverse' | 'shuffle'>('az');
 const [caseSensitive, setCaseSensitive] = useState(false);

 const sortedOutput = useMemo(() => {
 let lines = input.split('\n');
 switch (sortType) {
 case 'az':
 lines.sort((a, b) => (caseSensitive ? a.localeCompare(b) : a.toLowerCase().localeCompare(b.toLowerCase())));
 break;
 case 'za':
 lines.sort((a, b) => (caseSensitive ? b.localeCompare(a) : b.toLowerCase().localeCompare(a.toLowerCase())));
 break;
 case 'numAsc':
 lines.sort((a, b) => (parseFloat(a) || 0) - (parseFloat(b) || 0));
 break;
 case 'numDesc':
 lines.sort((a, b) => (parseFloat(b) || 0) - (parseFloat(a) || 0));
 break;
 case 'reverse':
 lines.reverse();
 break;
 case 'shuffle':
 lines = [...lines].sort(() => Math.random() - 0.5);
 break;
 }
 return lines.join('\n');
 }, [input, sortType, caseSensitive]);

 return (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
 <div className="flex flex-wrap gap-2 text-xs">
 {[
 { id: 'az', label: 'A → Z' },
 { id: 'za', label: 'Z → A' },
 { id: 'numAsc', label: '1 → 9' },
 { id: 'numDesc', label: '9 → 1' },
 { id: 'reverse', label: 'Reverse' },
 { id: 'shuffle', label: 'Shuffle' },
 ].map((mode) => (
 <button
 key={mode.id}
 onClick={() => setSortType(mode.id as any)}
 className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
 sortType === mode.id
 ? 'bg-moss-500 text-white'
 : 'bg-white text-stone-700 border border-stone-200 '
 }`}
 >
 {mode.label}
 </button>
 ))}
 </div>
 <label className="flex items-center gap-1.5 text-xs text-stone-600">
 <input
 type="checkbox"
 checked={caseSensitive}
 onChange={(e) => setCaseSensitive(e.target.checked)}
 className="rounded"
 />
 <span>Case sensitive</span>
 </label>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Input Lines</label>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Sorted Output</label>
 <CopyButton text={sortedOutput} />
 </div>
 <textarea
 readOnly
 value={sortedOutput}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 6. Find and Replace
export function FindReplaceTool() {
 const [text, setText] = useState("The quick brown fox jumps over the lazy dog. The fox is clever.");
 const [find, setFind] = useState("fox");
 const [replace, setReplace] = useState("cat");
 const [caseSensitive, setCaseSensitive] = useState(false);
 const [useRegex, setUseRegex] = useState(false);
 const [result, setResult] = useState("");

 const handleReplaceAll = () => {
 if (!find) {
 setResult(text);
 return;
 }
 try {
 const flags = caseSensitive ? 'g' : 'gi';
 const regex = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
 setResult(text.replace(regex, replace));
 } catch {
 alert("Invalid Regular Expression pattern.");
 }
 };

 useEffect(() => {
 handleReplaceAll();
 }, [text, find, replace, caseSensitive, useRegex]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-medium text-stone-600 mb-1">Find text or pattern</label>
 <input
 type="text"
 value={find}
 onChange={(e) => setFind(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-medium text-stone-600 mb-1">Replace with</label>
 <input
 type="text"
 value={replace}
 onChange={(e) => setReplace(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="flex gap-4 text-xs text-stone-600">
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
 <span>Case sensitive</span>
 </label>
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} />
 <span>Regular Expression (Regex)</span>
 </label>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Source Text</label>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Replaced Result</label>
 <CopyButton text={result} />
 </div>
 <textarea
 readOnly
 value={result}
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 7. Text Diff Checker
export function TextDiffTool() {
 const [original, setOriginal] = useState("function greet() {\n console.log('Hello world');\n}");
 const [modified, setModified] = useState("function greet() {\n console.log('Hello WrenchlyTools!');\n return true;\n}");

 const diffLines = useMemo(() => {
 const origLines = original.split('\n');
 const modLines = modified.split('\n');
 const diffs: { type: 'same' | 'added' | 'removed'; text: string }[] = [];

 const max = Math.max(origLines.length, modLines.length);
 for (let i = 0; i < max; i++) {
 const o = origLines[i];
 const m = modLines[i];

 if (o === m) {
 diffs.push({ type: 'same', text: o });
 } else {
 if (o !== undefined) diffs.push({ type: 'removed', text: o });
 if (m !== undefined) diffs.push({ type: 'added', text: m });
 }
 }
 return diffs;
 }, [original, modified]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Original Text</label>
 <textarea
 value={original}
 onChange={(e) => setOriginal(e.target.value)}
 rows={7}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Modified Text</label>
 <textarea
 value={modified}
 onChange={(e) => setModified(e.target.value)}
 rows={7}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="p-4 rounded-xl border border-stone-200 bg-white">
 <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
 Difference Highlights
 </h3>
 <div className="font-mono text-xs space-y-1">
 {diffLines.map((line, idx) => (
 <div
 key={idx}
 className={`px-3 py-1 rounded flex items-center gap-2 ${
 line.type === 'added'
 ? 'bg-emerald-50 text-emerald-700 border-l-2 border-emerald-500'
 : line.type === 'removed'
 ? 'bg-rose-50 text-rose-700 border-l-2 border-rose-500'
 : 'text-stone-600 '
 }`}
 >
 <span className="w-4 select-none opacity-60">
 {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
 </span>
 <span>{line.text}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}

// 8. Lorem Ipsum Generator
export function LoremIpsumTool() {
 const [count, setCount] = useState(3);
 const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
 const [startWithClassic, setStartWithClassic] = useState(true);

 const wordsList = [
 'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquot',
 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse'
 ];

 const generatedText = useMemo(() => {
 let result = '';
 const makeSentence = () => {
 const len = Math.floor(Math.random() * 8) + 8;
 const sWords = Array.from({ length: len }, () => wordsList[Math.floor(Math.random() * wordsList.length)]);
 return sWords.join(' ').replace(/^\w/, (c) => c.toUpperCase()) + '.';
 };

 if (type === 'paragraphs') {
 const paras: string[] = [];
 for (let i = 0; i < count; i++) {
 const sentenceCount = 5;
 const p = Array.from({ length: sentenceCount }, makeSentence).join(' ');
 paras.push(p);
 }
 if (startWithClassic && paras.length > 0) {
 paras[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paras[0];
 }
 result = paras.join('\n\n');
 } else if (type === 'sentences') {
 const sents = Array.from({ length: count }, makeSentence);
 result = sents.join(' ');
 } else {
 const wrds = Array.from({ length: count }, () => wordsList[Math.floor(Math.random() * wordsList.length)]);
 result = wrds.join(' ');
 }
 return result;
 }, [count, type, startWithClassic]);

 return (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <div className="flex items-center gap-2">
 <label className="text-xs font-semibold text-stone-600">Generate:</label>
 <input
 type="number"
 min={1}
 max={50}
 value={count}
 onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
 className="w-16 px-2.5 py-1 text-xs rounded border border-stone-300 bg-white"
 />
 </div>

 <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200 text-xs">
 {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
 <button
 key={t}
 onClick={() => setType(t)}
 className={`px-3 py-1 rounded capitalize ${type === t ? 'bg-moss-500 text-white' : 'text-stone-600 '}`}
 >
 {t}
 </button>
 ))}
 </div>

 <label className="flex items-center gap-1.5 text-xs text-stone-600 ml-auto cursor-pointer">
 <input
 type="checkbox"
 checked={startWithClassic}
 onChange={(e) => setStartWithClassic(e.target.checked)}
 className="rounded"
 />
 <span>Start with"Lorem ipsum..."</span>
 </label>
 </div>

 <div className="relative">
 <textarea
 readOnly
 value={generatedText}
 rows={10}
 className="w-full p-4 text-sm rounded-xl border border-stone-200 bg-white text-stone-900"
 />
 </div>

 <div className="flex justify-end gap-2">
 <CopyButton text={generatedText} />
 </div>
 </div>
 );
}

// 9. Text to Slug
export function TextToSlugTool() {
 const [text, setText] = useState("How to Build Clean Web Utilities in 2026!");
 const [separator, setSeparator] = useState<'-' | '_' | '.'>('-');
 const [lowercase, setLowercase] = useState(true);

 const slug = useMemo(() => {
 let s = text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // remove accents
 if (lowercase) s = s.toLowerCase();
 s = s.replace(/[^a-zA-Z0-9]+/g, separator);
 return s.replace(new RegExp(`^\\${separator}+|\\${separator}+$`, 'g'), '');
 }, [text, separator, lowercase]);

 return (
 <div className="space-y-6">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Input Title or Headline</label>
 <input
 type="text"
 value={text}
 onChange={(e) => setText(e.target.value)}
 className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="flex items-center gap-4 text-xs text-stone-600">
 <div className="flex items-center gap-2">
 <span>Separator:</span>
 {['-', '_', '.'].map((sep) => (
 <button
 key={sep}
 onClick={() => setSeparator(sep as any)}
 className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold ${
 separator === sep ? 'bg-moss-500 text-white' : 'bg-stone-100 '
 }`}
 >
 {sep}
 </button>
 ))}
 </div>
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input type="checkbox" checked={lowercase} onChange={(e) => setLowercase(e.target.checked)} />
 <span>Force lowercase</span>
 </label>
 </div>

 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Generated URL Slug</label>
 <CopyButton text={slug} />
 </div>
 <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 font-mono text-sm text-moss-600">
 {slug || 'your-slug-will-appear-here'}
 </div>
 </div>
 </div>
 );
}

// 10. Reverse Text
export function ReverseTextTool() {
 const [text, setText] = useState("WrenchlyTools Everyday Utility Toolbox");
 const [mode, setMode] = useState<'chars' | 'words' | 'lines'>('chars');

 const reversed = useMemo(() => {
 if (mode === 'chars') {
 return text.split('').reverse().join('');
 } else if (mode === 'words') {
 return text.split(' ').reverse().join(' ');
 } else {
 return text.split('\n').reverse().join('\n');
 }
 }, [text, mode]);

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 {[
 { id: 'chars', label: 'Reverse Characters' },
 { id: 'words', label: 'Reverse Words' },
 { id: 'lines', label: 'Reverse Lines' },
 ].map((m) => (
 <button
 key={m.id}
 onClick={() => setMode(m.id as any)}
 className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
 mode === m.id ? 'bg-moss-500 text-white' : 'bg-stone-100 text-stone-700 '
 }`}
 >
 {m.label}
 </button>
 ))}
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Input Text</label>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Reversed Output</label>
 <CopyButton text={reversed} />
 </div>
 <textarea
 readOnly
 value={reversed}
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 11. Text Repeater
export function TextRepeaterTool() {
 const [text, setText] = useState("Wrenchly");
 const [count, setCount] = useState(10);
 const [sep, setSep] = useState<'none' | 'space' | 'newline' | 'comma'>('space');

 const repeated = useMemo(() => {
 if (!text || count <= 0) return '';
 const safeCount = Math.min(count, 5000);
 const delimiter = sep === 'space' ? ' ' : sep === 'newline' ? '\n' : sep === 'comma' ? ', ' : '';
 return Array(safeCount).fill(text).join(delimiter);
 }, [text, count, sep]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div className="sm:col-span-2">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Text to repeat</label>
 <input
 type="text"
 value={text}
 onChange={(e) => setText(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Repetitions (max 5,000)</label>
 <input
 type="number"
 min={1}
 max={5000}
 value={count}
 onChange={(e) => setCount(Math.min(5000, Math.max(1, parseInt(e.target.value) || 1)))}
 className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="flex gap-2 text-xs">
 <span>Separator:</span>
 {(['space', 'newline', 'comma', 'none'] as const).map((s) => (
 <button
 key={s}
 onClick={() => setSep(s)}
 className={`px-2.5 py-1 rounded capitalize ${sep === s ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 {s}
 </button>
 ))}
 </div>

 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Output ({repeated.length} characters)</label>
 <CopyButton text={repeated} />
 </div>
 <textarea
 readOnly
 value={repeated}
 rows={8}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 );
}

// 12. Fancy Text Generator
export function FancyTextGeneratorTool() {
 const [input, setInput] = useState("WrenchlyTools");

 const styles = [
 {
 name: 'Bold Serif',
 fn: (text: string) => {
 const offset = 0x1d400 - 65;
 const offsetLower = 0x1d41a - 97;
 return text.replace(/[A-Za-z]/g, (c) => {
 const code = c.charCodeAt(0);
 return String.fromCodePoint(code + (code <= 90 ? offset : offsetLower));
 });
 },
 },
 {
 name: 'Italic Serif',
 fn: (text: string) => {
 const offset = 0x1d434 - 65;
 const offsetLower = 0x1d44e - 97;
 return text.replace(/[A-Za-z]/g, (c) => {
 const code = c.charCodeAt(0);
 return String.fromCodePoint(code + (code <= 90 ? offset : offsetLower));
 });
 },
 },
 {
 name: 'Monospace Code',
 fn: (text: string) => {
 const offset = 0x1d670 - 65;
 const offsetLower = 0x1d68a - 97;
 return text.replace(/[A-Za-z]/g, (c) => {
 const code = c.charCodeAt(0);
 return String.fromCodePoint(code + (code <= 90 ? offset : offsetLower));
 });
 },
 },
 {
 name: 'Double Struck (Blackboard)',
 fn: (text: string) => {
 const offset = 0x1d538 - 65;
 const offsetLower = 0x1d552 - 97;
 return text.replace(/[A-Za-z]/g, (c) => {
 const code = c.charCodeAt(0);
 return String.fromCodePoint(code + (code <= 90 ? offset : offsetLower));
 });
 },
 },
 {
 name: 'Circled Bubbles',
 fn: (text: string) => {
 const offset = 0x24b6 - 65;
 const offsetLower = 0x24d0 - 97;
 return text.replace(/[A-Za-z]/g, (c) => {
 const code = c.charCodeAt(0);
 return String.fromCodePoint(code + (code <= 90 ? offset : offsetLower));
 });
 },
 },
 ];

 return (
 <div className="space-y-6">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Your Text / Handle</label>
 <input
 type="text"
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="Type something stylish..."
 className="w-full px-4 py-2.5 text-base rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="space-y-3">
 {styles.map((style) => {
 const transformed = style.fn(input || 'Wrenchly');
 return (
 <div
 key={style.name}
 className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 bg-stone-50"
 >
 <div>
 <span className="text-xs text-stone-400 block mb-0.5">{style.name}</span>
 <span className="text-base text-stone-900 select-all">{transformed}</span>
 </div>
 <CopyButton text={transformed} />
 </div>
 );
 })}
 </div>
 </div>
 );
}

// 13. Text to Speech
export function TextToSpeechTool() {
 const [text, setText] = useState("Hello! Welcome to WrenchlyTools. All utilities execute fast and privately in your browser.");
 const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
 const [selectedVoice, setSelectedVoice] = useState<string>('');
 const [rate, setRate] = useState(1);
 const [pitch, setPitch] = useState(1);
 const [isPlaying, setIsPlaying] = useState(false);

 useEffect(() => {
 if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
 const updateVoices = () => {
 const v = window.speechSynthesis.getVoices();
 setVoices(v);
 if (v.length > 0 && !selectedVoice) {
 setSelectedVoice(v[0].name);
 }
 };
 updateVoices();
 window.speechSynthesis.onvoiceschanged = updateVoices;
 }
 }, []);

 const handleSpeak = () => {
 if (!('speechSynthesis' in window)) return;
 window.speechSynthesis.cancel();

 if (!text.trim()) return;

 const utterance = new SpeechSynthesisUtterance(text);
 const voice = voices.find((v) => v.name === selectedVoice);
 if (voice) utterance.voice = voice;
 utterance.rate = rate;
 utterance.pitch = pitch;

 utterance.onend = () => setIsPlaying(false);
 utterance.onerror = () => setIsPlaying(false);

 window.speechSynthesis.speak(utterance);
 setIsPlaying(true);
 };

 const handleStop = () => {
 if ('speechSynthesis' in window) {
 window.speechSynthesis.cancel();
 setIsPlaying(false);
 }
 };

 return (
 <div className="space-y-6">
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={6}
 placeholder="Type the passage you want to hear spoken aloud..."
 className="w-full p-4 rounded-xl border border-stone-200 bg-white text-sm"
 />

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Voice</label>
 <select
 value={selectedVoice}
 onChange={(e) => setSelectedVoice(e.target.value)}
 className="w-full px-2.5 py-1.5 text-xs rounded border border-stone-300 bg-white"
 >
 {voices.map((v) => (
 <option key={v.name} value={v.name}>
 {v.name} ({v.lang})
 </option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Speed: {rate}x</label>
 <input
 type="range"
 min={0.5}
 max={2}
 step={0.1}
 value={rate}
 onChange={(e) => setRate(parseFloat(e.target.value))}
 className="w-full"
 />
 </div>

 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Pitch: {pitch}</label>
 <input
 type="range"
 min={0.5}
 max={1.5}
 step={0.1}
 value={pitch}
 onChange={(e) => setPitch(parseFloat(e.target.value))}
 className="w-full"
 />
 </div>
 </div>

 <div className="flex gap-3">
 <button
 onClick={handleSpeak}
 className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-moss-500 hover:bg-moss-600 text-white text-xs font-bold transition-colors"
 >
 <Play className="w-4 h-4 fill-current" />
 <span>{isPlaying ? 'Restart Audio' : 'Play Speech'}</span>
 </button>

 {isPlaying && (
 <button
 onClick={handleStop}
 className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
 >
 <Square className="w-4 h-4" />
 <span>Stop</span>
 </button>
 )}
 </div>
 </div>
 );
}

// 14. Markdown to HTML
export function MarkdownToHtmlTool() {
 const [md, setMd] = useState(
"# WrenchlyTools\n\nEveryday tools. **Done in seconds.**\n\n- Free online utilities\n- Fast performance\n- Local browser execution"
 );

 const html = useMemo(() => {
 // Clean lightweight safe markdown parser
 let res = md
 .replace(/^### (.*$)/gim, '<h3>$1</h3>')
 .replace(/^## (.*$)/gim, '<h2>$1</h2>')
 .replace(/^# (.*$)/gim, '<h1>$1</h1>')
 .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
 .replace(/\*(.*?)\*/gim, '<em>$1</em>')
 .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
 .replace(/^\- (.*$)/gim, '<li>$1</li>')
 .replace(/\n\n/gim, '<p></p>');
 return res;
 }, [md]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Markdown Input</label>
 <textarea
 value={md}
 onChange={(e) => setMd(e.target.value)}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Rendered Preview</label>
 <CopyButton text={html} />
 </div>
 <div
 dangerouslySetInnerHTML={{ __html: html }}
 className="w-full p-4 h-56 overflow-y-auto rounded-xl border border-stone-200 bg-white prose text-xs"
 />
 </div>
 </div>
 </div>
 );
}

// 15. HTML to Text
export function HtmlToTextTool() {
 const [htmlInput, setHtmlInput] = useState(
"<div class=\"banner\">\n <h1>Welcome to WrenchlyTools</h1>\n <p>Every tool you need, <strong>all in one place</strong>.</p>\n</div>"
 );

 const plainText = useMemo(() => {
 if (typeof DOMParser === 'undefined') return '';
 const doc = new DOMParser().parseFromString(htmlInput, 'text/html');
 return doc.body.textContent || '';
 }, [htmlInput]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">HTML Code</label>
 <textarea
 value={htmlInput}
 onChange={(e) => setHtmlInput(e.target.value)}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Clean Plain Text</label>
 <CopyButton text={plainText} />
 </div>
 <textarea
 readOnly
 value={plainText}
 rows={10}
 className="w-full p-3 text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 16. Readability Score
export function ReadabilityScoreTool() {
 const [text, setText] = useState(
"The software provides an intuitive suite of everyday productivity tools. You can compress images, convert file formats, and calculate tax rates seamlessly."
 );

 const scores = useMemo(() => {
 const trimmed = text.trim();
 if (!trimmed) return { ease: 0, grade: 0, level: 'Empty' };

 const words = trimmed.split(/\s+/).length;
 const sentences = trimmed.split(/[.!?]+/).filter(Boolean).length || 1;
 // Simple syllable counter heuristic
 const syllables = trimmed
 .toLowerCase()
 .split(/\s+/)
 .reduce((acc, word) => {
 const matches = word.match(/[aeiouy]{1,2}/g);
 return acc + (matches ? matches.length : 1);
 }, 0);

 const wordsPerSentence = words / sentences;
 const syllablesPerWord = syllables / words;

 // Flesch Reading Ease = 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
 const ease = Math.round(206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord);
 // Flesch-Kincaid Grade Level = 0.39*(words/sentences) + 11.8*(syllables/words) - 15.59
 const grade = (0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59).toFixed(1);

 let level = 'Standard / Conversational';
 if (ease >= 80) level = 'Very Easy (6th Grade)';
 else if (ease >= 60) level = 'Plain English (8th-9th Grade)';
 else if (ease >= 50) level = 'Fairly Difficult (10th-12th Grade)';
 else level = 'College Level / Academic';

 return { ease, grade, level, words, sentences, wordsPerSentence: wordsPerSentence.toFixed(1) };
 }, [text]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
 <div className="text-2xl font-extrabold text-moss-600 tabular-nums">{scores.ease}</div>
 <div className="text-xs text-stone-500">Reading Ease (0-100)</div>
 </div>
 <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
 <div className="text-2xl font-extrabold text-stone-900 tabular-nums">{scores.grade}</div>
 <div className="text-xs text-stone-500">US Grade Level</div>
 </div>
 <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 col-span-2">
 <div className="text-sm font-bold text-stone-800">{scores.level}</div>
 <div className="text-xs text-stone-500 mt-1">Average {scores.wordsPerSentence} words per sentence</div>
 </div>
 </div>

 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={8}
 placeholder="Paste your writing to analyze readability..."
 className="w-full p-4 rounded-xl border border-stone-200 bg-white text-sm"
 />
 </div>
 );
}