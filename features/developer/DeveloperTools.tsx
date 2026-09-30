'use client'

import { useState, useEffect, useMemo } from 'react';
import { Copy, Check, RefreshCw, Terminal, Code2, AlertTriangle, Eye, ArrowRight } from 'lucide-react';

function DevCopyButton({ text }: { text: string }) {
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
 className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-moss-500 hover:bg-moss-600 text-white disabled:opacity-40"
 >
 {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
 <span>{copied ? 'Copied' : 'Copy'}</span>
 </button>
 );
}

// 1. JSON Formatter & Validator
export function JsonFormatterTool() {
 const [input, setInput] = useState('{"name":"WrenchlyTools","version":"1.0.0","features":["fast","secure","local"],"status":"active"}');
 const [error, setError] = useState<string | null>(null);

 const formatJson = (spaces = 2) => {
 try {
 const parsed = JSON.parse(input);
 setInput(JSON.stringify(parsed, null, spaces));
 setError(null);
 } catch (e: any) {
 setError(e.message);
 }
 };

 const minifyJson = () => {
 try {
 const parsed = JSON.parse(input);
 setInput(JSON.stringify(parsed));
 setError(null);
 } catch (e: any) {
 setError(e.message);
 }
 };

 return (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center justify-between gap-3">
 <div className="flex gap-2">
 <button
 onClick={() => formatJson(2)}
 className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-moss-500 text-white"
 >
 Prettify (2 Spaces)
 </button>
 <button
 onClick={() => formatJson(4)}
 className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 text-stone-700"
 >
 Prettify (4 Spaces)
 </button>
 <button
 onClick={minifyJson}
 className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 text-stone-700"
 >
 Minify JSON
 </button>
 </div>

 <div className="flex items-center gap-2">
 <button
 onClick={() => {
 setInput('{\n"app":"WrenchlyTools",\n"tools": 80,\n"offline": true\n}');
 setError(null);
 }}
 className="text-xs text-stone-500 hover:text-stone-700"
 >
 Load Sample
 </button>
 <DevCopyButton text={input} />
 </div>
 </div>

 {error && (
 <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
 <AlertTriangle className="w-4 h-4 shrink-0" />
 <span>JSON Syntax Error: {error}</span>
 </div>
 )}

 <textarea
 value={input}
 onChange={(e) => {
 setInput(e.target.value);
 try {
 JSON.parse(e.target.value);
 setError(null);
 } catch (err: any) {
 setError(err.message);
 }
 }}
 rows={14}
 className="w-full p-4 font-mono text-xs rounded-xl border border-stone-200 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-moss-500/40 leading-relaxed"
 />
 </div>
 );
}

// 2. JSON to CSV
export function JsonToCsvTool() {
 const [jsonStr, setJsonStr] = useState(
 '[\n {"id": 1,"name":"John Doe","role":"Developer","city":"London"},\n {"id": 2,"name":"Jane Smith","role":"Designer","city":"Berlin"}\n]'
 );

 const csv = useMemo(() => {
 try {
 const arr = JSON.parse(jsonStr);
 if (!Array.isArray(arr) || arr.length === 0) return '';
 const headers = Object.keys(arr[0]);
 const rows = arr.map((item) =>
 headers.map((h) => JSON.stringify(item[h] ?? '')).join(',')
 );
 return [headers.join(','), ...rows].join('\n');
 } catch {
 return 'Invalid JSON array input.';
 }
 }, [jsonStr]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">JSON Array Input</label>
 <textarea
 value={jsonStr}
 onChange={(e) => setJsonStr(e.target.value)}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">CSV Spreadsheet Output</label>
 <DevCopyButton text={csv} />
 </div>
 <textarea
 readOnly
 value={csv}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 3. CSV to JSON
export function CsvToJsonTool() {
 const [csvStr, setCsvStr] = useState('id,name,role\n1,Alice,Engineer\n2,Bob,Lead');

 const jsonOutput = useMemo(() => {
 const lines = csvStr.trim().split('\n');
 if (lines.length < 2) return '[]';
 const headers = lines[0].split(',').map((h) => h.trim());
 const data = lines.slice(1).map((line) => {
 const values = line.split(',');
 const obj: Record<string, string> = {};
 headers.forEach((h, i) => {
 obj[h] = values[i]?.trim() || '';
 });
 return obj;
 });
 return JSON.stringify(data, null, 2);
 }, [csvStr]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">CSV Input</label>
 <textarea
 value={csvStr}
 onChange={(e) => setCsvStr(e.target.value)}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">JSON Output</label>
 <DevCopyButton text={jsonOutput} />
 </div>
 <textarea
 readOnly
 value={jsonOutput}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 4. Base64 Encode & Decode
export function Base64Tool() {
 const [input, setInput] = useState('WrenchlyTools: The modern developer toolbox');
 const [mode, setMode] = useState<'encode' | 'decode'>('encode');

 const output = useMemo(() => {
 try {
 if (mode === 'encode') {
 return btoa(unescape(encodeURIComponent(input)));
 } else {
 return decodeURIComponent(escape(atob(input)));
 }
 } catch {
 return 'Error: Invalid Base64 input string';
 }
 }, [input, mode]);

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 <button
 onClick={() => setMode('encode')}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${mode === 'encode' ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 Encode to Base64
 </button>
 <button
 onClick={() => setMode('decode')}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${mode === 'decode' ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 Decode from Base64
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Input Text</label>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={8}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Output</label>
 <DevCopyButton text={output} />
 </div>
 <textarea
 readOnly
 value={output}
 rows={8}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 5. URL Encode & Decode
export function UrlEncodeTool() {
 const [input, setInput] = useState('https://wrenchlytools.com/search?query=web development & utilities=true');
 const [mode, setMode] = useState<'encode' | 'decode'>('encode');

 const output = useMemo(() => {
 try {
 return mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input);
 } catch {
 return 'Malformed URL string';
 }
 }, [input, mode]);

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 <button
 onClick={() => setMode('encode')}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${mode === 'encode' ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 URL Encode
 </button>
 <button
 onClick={() => setMode('decode')}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${mode === 'decode' ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 URL Decode
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Input URL or Parameter</label>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 rows={7}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Result</label>
 <DevCopyButton text={output} />
 </div>
 <textarea
 readOnly
 value={output}
 rows={7}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 6. Regex Tester
export function RegexTesterTool() {
 const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
 const [flags, setFlags] = useState('g');
 const [text, setText] = useState('Contact support@wrenchlytools.com or hello@example.org for questions.');

 const matches = useMemo(() => {
 try {
 const reg = new RegExp(pattern, flags);
 const results: string[] = [];
 let m;
 if (flags.includes('g')) {
 while ((m = reg.exec(text)) !== null) {
 results.push(m[0]);
 }
 } else {
 const single = text.match(reg);
 if (single) results.push(single[0]);
 }
 return results;
 } catch {
 return [];
 }
 }, [pattern, flags, text]);

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 <div className="flex-1">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Regular Expression</label>
 <input
 type="text"
 value={pattern}
 onChange={(e) => setPattern(e.target.value)}
 className="w-full px-3 py-2 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div className="w-24">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Flags</label>
 <input
 type="text"
 value={flags}
 onChange={(e) => setFlags(e.target.value)}
 className="w-full px-3 py-2 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Test String</label>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={5}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
 <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
 Matches Found ({matches.length})
 </span>
 <div className="flex flex-wrap gap-2">
 {matches.map((m, i) => (
 <span
 key={i}
 className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-mono text-xs"
 >
 {m}
 </span>
 ))}
 {matches.length === 0 && <span className="text-xs text-stone-400">No matches found.</span>}
 </div>
 </div>
 </div>
 );
}

// 7. Hash Generator (Web Crypto API)
export function HashGeneratorTool() {
 const [text, setText] = useState('WrenchlyTools');
 const [hashes, setHashes] = useState<Record<string, string>>({});

 useEffect(() => {
 async function computeHashes() {
 const enc = new TextEncoder();
 const data = enc.encode(text);

 const algos = ['SHA-256', 'SHA-384', 'SHA-512', 'SHA-1'];
 const res: Record<string, string> = {};

 for (const algo of algos) {
 try {
 const buf = await crypto.subtle.digest(algo, data);
 const hashArr = Array.from(new Uint8Array(buf));
 res[algo] = hashArr.map((b) => b.toString(16).padStart(2, '0')).join('');
 } catch (e) {
 res[algo] = 'Error';
 }
 }
 setHashes(res);
 }
 computeHashes();
 }, [text]);

 return (
 <div className="space-y-6">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Input Text to Hash</label>
 <input
 type="text"
 value={text}
 onChange={(e) => setText(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="space-y-3">
 {Object.entries(hashes).map(([algo, hash]) => (
 <div
 key={algo}
 className="p-3 rounded-xl border border-stone-200 bg-stone-50"
 >
 <div className="flex justify-between items-center mb-1">
 <span className="text-xs font-bold text-moss-600">{algo}</span>
 <DevCopyButton text={hash} />
 </div>
 <div className="font-mono text-xs text-stone-800 break-all select-all">
 {hash}
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}

// 8. JWT Decoder
export function JwtDecoderTool() {
 const [token, setToken] = useState(
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggTWVyY2VyIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
 );

 const decoded = useMemo(() => {
 try {
 const parts = token.split('.');
 if (parts.length < 2) return null;
 const header = JSON.parse(atob(parts[0]));
 const payload = JSON.parse(atob(parts[1]));
 return { header, payload };
 } catch {
 return null;
 }
 }, [token]);

 return (
 <div className="space-y-6">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Encoded JWT Token</label>
 <textarea
 value={token}
 onChange={(e) => setToken(e.target.value)}
 rows={3}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>

 {decoded ? (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block mb-1">Header</span>
 <pre className="p-4 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs text-rose-600 overflow-auto">
 {JSON.stringify(decoded.header, null, 2)}
 </pre>
 </div>
 <div>
 <span className="text-xs font-bold text-moss-600 uppercase tracking-wider block mb-1">Payload Claims</span>
 <pre className="p-4 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs text-moss-600 overflow-auto">
 {JSON.stringify(decoded.payload, null, 2)}
 </pre>
 </div>
 </div>
 ) : (
 <p className="text-xs text-rose-500">Invalid JWT token structure.</p>
 )}
 </div>
 );
}

// 9. Timestamp Converter
export function TimestampConverterTool() {
 const [epoch, setEpoch] = useState(Math.floor(Date.now() / 1000));

 const dateObj = new Date(epoch * 1000);

 return (
 <div className="space-y-6">
 <div className="max-w-xs">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Unix Timestamp (Seconds)</label>
 <input
 type="number"
 value={epoch}
 onChange={(e) => setEpoch(parseInt(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">ISO 8601 (UTC)</span>
 <div className="font-mono text-xs font-semibold text-stone-800 mt-1">
 {dateObj.toISOString()}
 </div>
 </div>
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Local Time</span>
 <div className="font-mono text-xs font-semibold text-stone-800 mt-1">
 {dateObj.toLocaleString()}
 </div>
 </div>
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Milliseconds</span>
 <div className="font-mono text-xs font-semibold text-stone-800 mt-1">
 {epoch * 1000}
 </div>
 </div>
 </div>
 </div>
 );
}

// 10. Cron Helper
export function CronHelperTool() {
 const [cron, setCron] = useState('*/15 * * * *');

 const explanation = useMemo(() => {
 if (cron === '*/15 * * * *') return 'Runs every 15 minutes.';
 if (cron === '0 0 * * *') return 'Runs once every day at midnight (00:00).';
 if (cron === '0 9 * * 1-5') return 'Runs at 09:00 AM on weekdays (Monday through Friday).';
 return 'Custom recurring cron schedule expression.';
 }, [cron]);

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 {['*/15 * * * *', '0 0 * * *', '0 9 * * 1-5'].map((preset) => (
 <button
 key={preset}
 onClick={() => setCron(preset)}
 className="px-2.5 py-1 text-xs rounded border border-stone-300 bg-white"
 >
 {preset}
 </button>
 ))}
 </div>

 <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500 block mb-1">Human-Readable Meaning</span>
 <div className="text-xl font-bold text-moss-600">{explanation}</div>
 </div>
 </div>
 );
}

// 11. CSS Gradient Generator
export function CssGradientTool() {
 const [col1, setCol1] = useState('#101B2D');
 const [col2, setCol2] = useState('#326BFF');
 const [angle, setAngle] = useState(135);

 const css = `linear-gradient(${angle}deg, ${col1} 0%, ${col2} 100%)`;

 return (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Color 1</label>
 <input
 type="color"
 value={col1}
 onChange={(e) => setCol1(e.target.value)}
 className="w-12 h-8 rounded cursor-pointer"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Color 2</label>
 <input
 type="color"
 value={col2}
 onChange={(e) => setCol2(e.target.value)}
 className="w-12 h-8 rounded cursor-pointer"
 />
 </div>
 <div className="flex-1 min-w-[150px]">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Angle: {angle}°</label>
 <input
 type="range"
 min={0}
 max={360}
 value={angle}
 onChange={(e) => setAngle(parseInt(e.target.value))}
 className="w-full"
 />
 </div>
 </div>

 <div className="h-44 rounded-2xl shadow-inner border" style={{ background: css }} />

 <div className="flex justify-between items-center p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs">
 <span>background: {css};</span>
 <DevCopyButton text={`background: ${css};`} />
 </div>
 </div>
 );
}

// 12. Box Shadow Generator
export function BoxShadowTool() {
 const [x, setX] = useState(0);
 const [y, setY] = useState(10);
 const [blur, setBlur] = useState(25);
 const [spread, setSpread] = useState(-5);
 const [opacity, setOpacity] = useState(0.15);

 const css = `${x}px ${y}px ${blur}px ${spread}px rgba(0, 0, 0, ${opacity})`;

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
 <div>
 <span>X: {x}px</span>
 <input type="range" min={-50} max={50} value={x} onChange={(e) => setX(parseInt(e.target.value))} />
 </div>
 <div>
 <span>Y: {y}px</span>
 <input type="range" min={-50} max={50} value={y} onChange={(e) => setY(parseInt(e.target.value))} />
 </div>
 <div>
 <span>Blur: {blur}px</span>
 <input type="range" min={0} max={100} value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} />
 </div>
 <div>
 <span>Spread: {spread}px</span>
 <input type="range" min={-30} max={30} value={spread} onChange={(e) => setSpread(parseInt(e.target.value))} />
 </div>
 </div>

 <div className="h-48 flex items-center justify-center bg-stone-100 rounded-2xl">
 <div
 className="w-32 h-32 bg-white rounded-2xl"
 style={{ boxShadow: css }}
 />
 </div>

 <div className="flex justify-between items-center p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs">
 <span>box-shadow: {css};</span>
 <DevCopyButton text={`box-shadow: ${css};`} />
 </div>
 </div>
 );
}

// 13. Border Radius Generator
export function BorderRadiusTool() {
 const [tl, setTl] = useState(24);
 const [tr, setTr] = useState(24);
 const [br, setBr] = useState(24);
 const [bl, setBl] = useState(24);

 const css = `${tl}px ${tr}px ${br}px ${bl}px`;

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
 <div>
 <span>Top Left: {tl}px</span>
 <input type="range" min={0} max={100} value={tl} onChange={(e) => setTl(parseInt(e.target.value))} />
 </div>
 <div>
 <span>Top Right: {tr}px</span>
 <input type="range" min={0} max={100} value={tr} onChange={(e) => setTr(parseInt(e.target.value))} />
 </div>
 <div>
 <span>Bottom Right: {br}px</span>
 <input type="range" min={0} max={100} value={br} onChange={(e) => setBr(parseInt(e.target.value))} />
 </div>
 <div>
 <span>Bottom Left: {bl}px</span>
 <input type="range" min={0} max={100} value={bl} onChange={(e) => setBl(parseInt(e.target.value))} />
 </div>
 </div>

 <div className="h-44 flex items-center justify-center bg-stone-100 rounded-2xl">
 <div
 className="w-36 h-36 bg-moss-500"
 style={{ borderRadius: css }}
 />
 </div>

 <div className="flex justify-between items-center p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs">
 <span>border-radius: {css};</span>
 <DevCopyButton text={`border-radius: ${css};`} />
 </div>
 </div>
 );
}

// 14. Minify Code
export function MinifyCodeTool() {
 const [code, setCode] = useState(
 '/* Button component */\n.btn {\n display: inline-flex;\n padding: 8px 16px;\n background-color: #326BFF;\n}'
 );

 const minified = useMemo(() => {
 return code
 .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '') // comments
 .replace(/\s+/g, ' ')
 .replace(/\s*([\{\}:;,])\s*/g, '$1')
 .trim();
 }, [code]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Source Code</label>
 <textarea
 value={code}
 onChange={(e) => setCode(e.target.value)}
 rows={8}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">Minified Code</label>
 <DevCopyButton text={minified} />
 </div>
 <textarea
 readOnly
 value={minified}
 rows={8}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 </div>
 </div>
 );
}

// 15. Color Converter
export function ColorConverterTool() {
 const [hex, setHex] = useState('#326BFF');

 const rgb = useMemo(() => {
 const r = parseInt(hex.slice(1, 3), 16) || 0;
 const g = parseInt(hex.slice(3, 5), 16) || 0;
 const b = parseInt(hex.slice(5, 7), 16) || 0;
 return `rgb(${r}, ${g}, ${b})`;
 }, [hex]);

 return (
 <div className="space-y-6">
 <div className="flex items-center gap-4">
 <input
 type="color"
 value={hex}
 onChange={(e) => setHex(e.target.value)}
 className="w-16 h-12 rounded cursor-pointer border"
 />
 <div className="flex-1">
 <input
 type="text"
 value={hex}
 onChange={(e) => setHex(e.target.value)}
 className="w-full px-3 py-2 font-mono text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div className="p-3 border rounded-xl bg-stone-50 flex justify-between items-center font-mono text-xs">
 <span>{hex.toUpperCase()}</span>
 <DevCopyButton text={hex.toUpperCase()} />
 </div>
 <div className="p-3 border rounded-xl bg-stone-50 flex justify-between items-center font-mono text-xs">
 <span>{rgb}</span>
 <DevCopyButton text={rgb} />
 </div>
 </div>
 </div>
 );
}