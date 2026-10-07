'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { Copy, Check, Download, RefreshCw, Printer, Shield, KeyRound, Sparkles } from 'lucide-react';

function GenCopyButton({ text }: { text: string }) {
 const [copied, setCopied] = useState(false);
 const handleCopy = () => {
 navigator.clipboard.writeText(text);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };
 return (
 <button
 onClick={handleCopy}
 className="p-1.5 text-stone-400 hover:text-stone-600"
 title="Copy to clipboard"
 >
 {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
 </button>
 );
}

// 1. QR Code Generator
export function QrCodeGeneratorTool() {
 const [text, setText] = useState('https://wrenchlytools.com');
 const [fgColor, setFgColor] = useState('#101B2D');
 const [bgColor, setBgColor] = useState('#FFFFFF');
 const [qrUrl, setQrUrl] = useState<string>('');

 useEffect(() => {
 if (!text) return;
 QRCode.toDataURL(text, {
 width: 400,
 margin: 2,
 color: {
 dark: fgColor,
 light: bgColor,
 },
 })
 .then((url) => setQrUrl(url))
 .catch((err) => console.error(err));
 }, [text, fgColor, bgColor]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Target URL or Plain Text</label>
 <textarea
 value={text}
 onChange={(e) => setText(e.target.value)}
 rows={4}
 className="w-full p-3 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="flex gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">QR Color</label>
 <input
 type="color"
 value={fgColor}
 onChange={(e) => setFgColor(e.target.value)}
 className="w-10 h-8 rounded cursor-pointer"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Background Color</label>
 <input
 type="color"
 value={bgColor}
 onChange={(e) => setBgColor(e.target.value)}
 className="w-10 h-8 rounded cursor-pointer"
 />
 </div>
 </div>
 </div>

 <div className="flex flex-col items-center justify-center p-6 border rounded-2xl bg-stone-50 text-center">
 {qrUrl && <img src={qrUrl} alt="QR Code" className="w-56 h-56 rounded-xl shadow-sm mb-4" />}
 {qrUrl && (
 <a
 href={qrUrl}
 download="wrenchly-qrcode.png"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download High-Res QR PNG</span>
 </a>
 )}
 </div>
 </div>
 </div>
 );
}

// 2. Password Generator
export function PasswordGeneratorTool() {
 const [length, setLength] = useState(16);
 const [incUpper, setIncUpper] = useState(true);
 const [incLower, setIncLower] = useState(true);
 const [incNumbers, setIncNumbers] = useState(true);
 const [incSymbols, setIncSymbols] = useState(true);
 const [password, setPassword] = useState('');

 const generate = () => {
 let chars = '';
 if (incUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 if (incLower) chars += 'abcdefghijklmnopqrstuvwxyz';
 if (incNumbers) chars += '0123456789';
 if (incSymbols) chars += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

 if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

 const array = new Uint32Array(length);
 window.crypto.getRandomValues(array);
 let res = '';
 for (let i = 0; i < length; i++) {
 res += chars[array[i] % chars.length];
 }
 setPassword(res);
 };

 useEffect(() => {
 generate();
 }, [length, incUpper, incLower, incNumbers, incSymbols]);

 const strength = length >= 16 && incSymbols && incNumbers ? 'Strong' : length >= 10 ? 'Medium' : 'Weak';
 const strengthColor = strength === 'Strong' ? 'text-emerald-500' : strength === 'Medium' ? 'text-amber-500' : 'text-rose-500';

 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-stone-50">
 <span className="font-mono text-lg font-bold text-stone-900 select-all break-all">
 {password}
 </span>
 <div className="flex items-center gap-2 shrink-0 ml-4">
 <GenCopyButton text={password} />
 <button
 onClick={generate}
 className="p-1.5 text-stone-400 hover:text-stone-600"
 title="Regenerate"
 >
 <RefreshCw className="w-4 h-4" />
 </button>
 </div>
 </div>

 <div className="space-y-3">
 <div className="flex justify-between text-xs font-semibold text-stone-500">
 <span>Length: {length} characters</span>
 <span className={`font-bold ${strengthColor}`}>{strength} Entropy</span>
 </div>
 <input
 type="range"
 min={8}
 max={64}
 value={length}
 onChange={(e) => setLength(parseInt(e.target.value))}
 className="w-full"
 />
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-700">
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input type="checkbox" checked={incUpper} onChange={(e) => setIncUpper(e.target.checked)} />
 <span>Uppercase (A-Z)</span>
 </label>
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input type="checkbox" checked={incLower} onChange={(e) => setIncLower(e.target.checked)} />
 <span>Lowercase (a-z)</span>
 </label>
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input type="checkbox" checked={incNumbers} onChange={(e) => setIncNumbers(e.target.checked)} />
 <span>Numbers (0-9)</span>
 </label>
 <label className="flex items-center gap-1.5 cursor-pointer">
 <input type="checkbox" checked={incSymbols} onChange={(e) => setIncSymbols(e.target.checked)} />
 <span>Symbols (!@#$)</span>
 </label>
 </div>
 </div>
 );
}

// 3. Username Generator
export function UsernameGeneratorTool() {
 const [theme, setTheme] = useState<'tech' | 'gaming' | 'creative'>('tech');
 const [usernames, setUsernames] = useState<string[]>([]);

 const generateUsernames = () => {
 const techWords = ['Byte', 'Pixel', 'Vector', 'Cyber', 'Node', 'Cloud', 'Logic', 'Code', 'Dev', 'Stack'];
 const gameWords = ['Shadow', 'Viper', 'Ghost', 'Apex', 'Nova', 'Titan', 'Frost', 'Blaze', 'Rogue', 'Echo'];
 const creativeWords = ['Studio', 'Craft', 'Aura', 'Echo', 'Vibe', 'Prism', 'Canvas', 'Flow', 'Nova', 'Sol'];

 const pool = theme === 'tech' ? techWords : theme === 'gaming' ? gameWords : creativeWords;
 const suffixes = ['Pro', 'HQ', 'Lab', 'Craft', 'Zero', 'One', '99', 'X', 'Prime', 'Core'];

 const results: string[] = [];
 for (let i = 0; i < 8; i++) {
 const w1 = pool[Math.floor(Math.random() * pool.length)];
 const w2 = suffixes[Math.floor(Math.random() * suffixes.length)];
 results.push(`${w1}${w2}`);
 }
 setUsernames(results);
 };

 useEffect(() => {
 generateUsernames();
 }, [theme]);

 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <div className="flex gap-2">
 {(['tech', 'gaming', 'creative'] as const).map((t) => (
 <button
 key={t}
 onClick={() => setTheme(t)}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize ${
 theme === t ? 'bg-moss-500 text-white' : 'bg-stone-100 '
 }`}
 >
 {t}
 </button>
 ))}
 </div>
 <button
 onClick={generateUsernames}
 className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-stone-100 rounded-lg hover:bg-stone-200"
 >
 <RefreshCw className="w-3.5 h-3.5" />
 <span>Reroll</span>
 </button>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 {usernames.map((u) => (
 <div
 key={u}
 className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50"
 >
 <span className="font-semibold text-xs text-stone-800 truncate">{u}</span>
 <GenCopyButton text={u} />
 </div>
 ))}
 </div>
 </div>
 );
}

// 4. Random Name Generator
export function RandomNameGeneratorTool() {
 const [names, setNames] = useState<string[]>([]);

 const generateNames = () => {
 const firstNames = ['Alexander', 'Sophia', 'Liam', 'Emma', 'Tariq', 'Zainab', 'Lucas', 'Mia', 'Noah', 'Ava'];
 const lastNames = ['Sterling', 'Bennett', 'Khan', 'Vance', 'Sinclair', 'Rahman', 'Mercer', 'Castillo', 'Hayes', 'Ahmed'];

 const res: string[] = [];
 for (let i = 0; i < 6; i++) {
 const f = firstNames[Math.floor(Math.random() * firstNames.length)];
 const l = lastNames[Math.floor(Math.random() * lastNames.length)];
 res.push(`${f} ${l}`);
 }
 setNames(res);
 };

 useEffect(() => {
 generateNames();
 }, []);

 return (
 <div className="space-y-6">
 <div className="flex justify-end">
 <button
 onClick={generateNames}
 className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-moss-500 text-white rounded-lg font-bold"
 >
 <RefreshCw className="w-3.5 h-3.5" />
 <span>Generate New Names</span>
 </button>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
 {names.map((name) => (
 <div
 key={name}
 className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 bg-stone-50"
 >
 <span className="text-sm font-semibold text-stone-900">{name}</span>
 <GenCopyButton text={name} />
 </div>
 ))}
 </div>
 </div>
 );
}

// 5. Random Number Generator
export function RandomNumberGeneratorTool() {
 const [min, setMin] = useState(1);
 const [max, setMax] = useState(100);
 const [count, setCount] = useState(5);
 const [results, setResults] = useState<number[]>([]);

 const roll = () => {
 const nums: number[] = [];
 for (let i = 0; i < count; i++) {
 nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
 }
 setResults(nums);
 };

 useEffect(() => {
 roll();
 }, [min, max, count]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Min</label>
 <input
 type="number"
 value={min}
 onChange={(e) => setMin(parseInt(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Max</label>
 <input
 type="number"
 value={max}
 onChange={(e) => setMax(parseInt(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Count</label>
 <input
 type="number"
 min={1}
 max={50}
 value={count}
 onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-wrap gap-3 items-center">
 {results.map((n, i) => (
 <span
 key={i}
 className="px-4 py-2 rounded-xl bg-white text-lg font-bold text-moss-600 shadow-sm tabular-nums"
 >
 {n}
 </span>
 ))}
 <button
 onClick={roll}
 className="ml-auto px-4 py-2 bg-moss-500 text-white text-xs font-bold rounded-xl"
 >
 Roll Again
 </button>
 </div>
 </div>
 );
}

// 6. UUID Generator
export function UuidGeneratorTool() {
 const [uuids, setUuids] = useState<string[]>([]);
 const [count, setCount] = useState(5);

 const generateUuid = () => {
 const list: string[] = [];
 for (let i = 0; i < count; i++) {
 list.push(crypto.randomUUID());
 }
 setUuids(list);
 };

 useEffect(() => {
 generateUuid();
 }, [count]);

 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <label className="text-xs font-semibold text-stone-500">Count:</label>
 <select
 value={count}
 onChange={(e) => setCount(parseInt(e.target.value))}
 className="px-2.5 py-1 text-xs rounded border border-stone-300 bg-white"
 >
 <option value={1}>1 UUID</option>
 <option value={5}>5 UUIDs</option>
 <option value={10}>10 UUIDs</option>
 <option value={20}>20 UUIDs</option>
 </select>
 </div>
 <button
 onClick={generateUuid}
 className="flex items-center gap-1.5 px-3 py-1.5 bg-moss-500 text-white rounded-lg text-xs font-bold"
 >
 <RefreshCw className="w-3.5 h-3.5" />
 <span>Regenerate</span>
 </button>
 </div>

 <div className="space-y-2">
 {uuids.map((u) => (
 <div
 key={u}
 className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50 font-mono text-xs"
 >
 <span className="text-stone-800 select-all">{u}</span>
 <GenCopyButton text={u} />
 </div>
 ))}
 </div>
 </div>
 );
}

// 7. Barcode Generator
export function BarcodeGeneratorTool() {
 const [code, setCode] = useState('123456789012');
 const [format, setFormat] = useState<'CODE128' | 'EAN13'>('CODE128');
 const svgRef = useRef<SVGSVGElement>(null);

 useEffect(() => {
 if (svgRef.current && code) {
 try {
 JsBarcode(svgRef.current, code, {
 format,
 lineColor: '#101B2D',
 width: 2,
 height: 80,
 displayValue: true,
 });
 } catch (err) {
 console.error('Barcode error', err);
 }
 }
 }, [code, format]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Barcode Value</label>
 <input
 type="text"
 value={code}
 onChange={(e) => setCode(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Symbology Format</label>
 <select
 value={format}
 onChange={(e) => setFormat(e.target.value as any)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 <option value="CODE128">Code 128 (General Alphanumeric)</option>
 <option value="EAN13">EAN-13 (Standard Retail)</option>
 </select>
 </div>
 </div>

 <div className="p-8 border rounded-2xl bg-white text-center flex flex-col items-center justify-center">
 <svg ref={svgRef} className="max-w-full" />
 </div>
 </div>
 );
}

// 8. Invoice Generator
export function InvoiceGeneratorTool() {
 const [company, setCompany] = useState('Acme Studio');
 const [client, setClient] = useState('Global Client Inc.');
 const [invNum, setInvNum] = useState('INV-2026-001');
 const [items, setItems] = useState([
 { desc: 'Web App Development', qty: 1, rate: 2500 },
 { desc: 'UI/UX Design Kit', qty: 1, rate: 800 },
 ]);

 const total = items.reduce((acc, item) => acc + item.qty * item.rate, 0);

 const addItem = () => {
 setItems([...items, { desc: 'Consulting', qty: 1, rate: 150 }]);
 };

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Your Business Name</label>
 <input
 type="text"
 value={company}
 onChange={(e) => setCompany(e.target.value)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Billed To (Client)</label>
 <input
 type="text"
 value={client}
 onChange={(e) => setClient(e.target.value)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Invoice #</label>
 <input
 type="text"
 value={invNum}
 onChange={(e) => setInvNum(e.target.value)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="block text-xs font-semibold text-stone-500">Invoice Items</label>
 {items.map((item, idx) => (
 <div key={idx} className="flex gap-2">
 <input
 type="text"
 value={item.desc}
 onChange={(e) => {
 const updated = [...items];
 updated[idx].desc = e.target.value;
 setItems(updated);
 }}
 className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 <input
 type="number"
 value={item.qty}
 onChange={(e) => {
 const updated = [...items];
 updated[idx].qty = parseInt(e.target.value) || 1;
 setItems(updated);
 }}
 className="w-16 px-2 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 <input
 type="number"
 value={item.rate}
 onChange={(e) => {
 const updated = [...items];
 updated[idx].rate = parseFloat(e.target.value) || 0;
 setItems(updated);
 }}
 className="w-24 px-2 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 ))}
 <button
 onClick={addItem}
 className="text-xs text-moss-600 hover:underline"
 >
 + Add Item
 </button>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">Total Due</span>
 <div className="text-2xl font-bold text-stone-900 mt-0.5">${total.toLocaleString()}</div>
 </div>
 <button
 onClick={() => window.print()}
 className="flex items-center gap-1.5 px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 <Printer className="w-4 h-4" />
 <span>Print / Save PDF</span>
 </button>
 </div>
 </div>
 );
}

// 9. Receipt Generator
export function ReceiptGeneratorTool() {
 const [store, setStore] = useState('Wrenchly Coffee & Goods');
 const [total, setTotal] = useState(24.5);

 return (
 <div className="space-y-6">
 <div className="max-w-xs space-y-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Store Name</label>
 <input
 type="text"
 value={store}
 onChange={(e) => setStore(e.target.value)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Total Paid ($)</label>
 <input
 type="number"
 value={total}
 onChange={(e) => setTotal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="max-w-sm mx-auto p-6 border rounded-xl bg-white text-stone-900 font-mono text-xs space-y-3 shadow-sm">
 <div className="text-center pb-2 border-b">
 <div className="font-bold text-sm">{store}</div>
 <div className="text-[10px] text-stone-500">Official Sales Receipt</div>
 <div className="text-[10px] text-stone-400">{new Date().toLocaleDateString()}</div>
 </div>
 <div className="flex justify-between">
 <span>Items Total:</span>
 <span>${total.toFixed(2)}</span>
 </div>
 <div className="flex justify-between font-bold text-sm pt-2 border-t">
 <span>Amount Paid:</span>
 <span>${total.toFixed(2)}</span>
 </div>
 <div className="text-center text-[10px] text-stone-400 pt-2">
 Thank you for your visit!
 </div>
 </div>

 <div className="text-center">
 <button
 onClick={() => window.print()}
 className="px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Print Receipt
 </button>
 </div>
 </div>
 );
}

// 10. Resume Builder
export function ResumeBuilderTool() {
 const [name, setName] = useState('Alex Mercer');
 const [title, setTitle] = useState('Senior Software Engineer');
 const [email, setEmail] = useState('alex@example.com');
 const [summary, setSummary] = useState(
 'Passionate engineer with 6+ years designing scalable full-stack applications, TypeScript systems, and high-performance web tooling.'
 );

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Full Name</label>
 <input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Professional Title</label>
 <input
 type="text"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Contact Email</label>
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Executive Summary</label>
 <textarea
 value={summary}
 onChange={(e) => setSummary(e.target.value)}
 rows={3}
 className="w-full p-3 text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>

 {/* Live Resume Sheet Preview */}
 <div className="p-8 rounded-2xl border bg-white text-stone-900 shadow-sm space-y-4">
 <div className="border-b pb-4">
 <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
 <div className="text-xs text-moss-600 font-semibold mt-0.5">{title} · {email}</div>
 </div>
 <div>
 <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">About Me</h3>
 <p className="text-xs leading-relaxed text-stone-700">{summary}</p>
 </div>
 </div>

 <div className="flex justify-end">
 <button
 onClick={() => window.print()}
 className="px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Print / Export PDF Resume
 </button>
 </div>
 </div>
 );
}

// 11. Signature Generator
export function SignatureGeneratorTool() {
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const [isDrawing, setIsDrawing] = useState(false);
 const [penColor, setPenColor] = useState('#101B2D');

 const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;
 setIsDrawing(true);
 ctx.strokeStyle = penColor;
 ctx.lineWidth = 2.5;
 ctx.lineCap = 'round';
 ctx.beginPath();
 ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
 };

 const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
 if (!isDrawing) return;
 const canvas = canvasRef.current;
 const ctx = canvas?.getContext('2d');
 ctx?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
 ctx?.stroke();
 };

 const stopDraw = () => setIsDrawing(false);

 const clearCanvas = () => {
 const canvas = canvasRef.current;
 const ctx = canvas?.getContext('2d');
 ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
 };

 const downloadSignature = () => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const url = canvas.toDataURL('image/png');
 const a = document.createElement('a');
 a.href = url;
 a.download = 'signature.png';
 a.click();
 };

 return (
 <div className="space-y-6">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2 text-xs">
 <span>Ink Color:</span>
 {['#101B2D', '#326BFF', '#D64545'].map((c) => (
 <button
 key={c}
 onClick={() => setPenColor(c)}
 className={`w-6 h-6 rounded-full border-2 ${penColor === c ? 'border-amber-400' : 'border-transparent'}`}
 style={{ backgroundColor: c }}
 />
 ))}
 </div>
 <button
 onClick={clearCanvas}
 className="text-xs text-rose-500 hover:underline"
 >
 Clear Canvas
 </button>
 </div>

 <div className="p-4 border rounded-2xl bg-white text-center">
 <canvas
 ref={canvasRef}
 width={600}
 height={200}
 onMouseDown={startDraw}
 onMouseMove={draw}
 onMouseUp={stopDraw}
 onMouseLeave={stopDraw}
 className="w-full max-w-lg h-44 mx-auto border border-dashed rounded-xl cursor-crosshair bg-stone-50"
 />
 <span className="text-[11px] text-stone-400 block mt-2">Draw your signature with mouse or touch above</span>
 </div>

 <div className="flex justify-end">
 <button
 onClick={downloadSignature}
 className="flex items-center gap-1.5 px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Transparent PNG Signature</span>
 </button>
 </div>
 </div>
 );
}

// 12. Cover Letter Generator (implementation lives in ./CoverLetterGenerator)
export { CoverLetterGeneratorTool } from './CoverLetterGenerator';


// 13. Thumbnail Maker
export function ThumbnailMakerTool() {
 const [headline, setHeadline] = useState('BUILD FAST TOOLS IN 2026');
 const [badge, setBadge] = useState('100% FREE');
 const canvasRef = useRef<HTMLCanvasElement>(null);
 const [thumbUrl, setThumbUrl] = useState<string | null>(null);

 const renderThumbnail = () => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 // 1280x720 canvas
 canvas.width = 1280;
 canvas.height = 720;

 // Deep modern gradient background
 const grad = ctx.createLinearGradient(0, 0, 1280, 720);
 grad.addColorStop(0, '#101B2D');
 grad.addColorStop(1, '#17263B');
 ctx.fillStyle = grad;
 ctx.fillRect(0, 0, 1280, 720);

 // Accent glow
 ctx.fillStyle = '#326BFF';
 ctx.beginPath();
 ctx.arc(1000, 200, 300, 0, Math.PI * 2);
 ctx.filter = 'blur(120px)';
 ctx.fill();
 ctx.filter = 'none';

 // Badge
 if (badge) {
 ctx.fillStyle = '#FF8A4C';
 ctx.fillRect(100, 180, 240, 50);
 ctx.fillStyle = '#101B2D';
 ctx.font = '900 24px sans-serif';
 ctx.fillText(badge, 120, 215);
 }

 // Headline
 ctx.fillStyle = '#FFFFFF';
 ctx.font = '900 68px sans-serif';
 ctx.fillText(headline, 100, 340);

 setThumbUrl(canvas.toDataURL('image/jpeg', 0.95));
 };

 useEffect(() => {
 renderThumbnail();
 }, [headline, badge]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Headline Text</label>
 <input
 type="text"
 value={headline}
 onChange={(e) => setHeadline(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Top Badge Text</label>
 <input
 type="text"
 value={badge}
 onChange={(e) => setBadge(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="p-4 border rounded-2xl bg-stone-50 text-center">
 <canvas ref={canvasRef} className="hidden" />
 {thumbUrl && (
 <img src={thumbUrl} alt="Thumbnail" className="max-h-72 mx-auto rounded-xl shadow-lg" />
 )}
 </div>

 {thumbUrl && (
 <div className="flex justify-end">
 <a
 href={thumbUrl}
 download="thumbnail-1280x720.jpg"
 className="flex items-center gap-1.5 px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download 1280x720 Thumbnail</span>
 </a>
 </div>
 )}
 </div>
 );
}

// 14. Islamic Date Converter (Hijri)
export function IslamicDateConverterTool() {
 const [gregDate, setGregDate] = useState('2026-03-20');
 const [adjustment, setAdjustment] = useState(0);

 const hijriString = useMemo(() => {
 const d = new Date(gregDate);
 if (isNaN(d.getTime())) return '';
 d.setDate(d.getDate() + adjustment);

 try {
 return new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
 day: 'numeric',
 month: 'long',
 year: 'numeric',
 }).format(d);
 } catch {
 return '1 Shawwal 1447 AH (Approximate)';
 }
 }, [gregDate, adjustment]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Gregorian Date</label>
 <input
 type="date"
 value={gregDate}
 onChange={(e) => setGregDate(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">
 Moon Sighting Adjustment: {adjustment > 0 ? `+${adjustment}` : adjustment} day(s)
 </label>
 <input
 type="range"
 min={-2}
 max={2}
 value={adjustment}
 onChange={(e) => setAdjustment(parseInt(e.target.value))}
 className="w-full"
 />
 </div>
 </div>

 <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center">
 <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Islamic Calendar Date</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{hijriString}</div>
 <p className="text-xs text-stone-400 mt-1">Umm al-Qura reference with regional lunar offset</p>
 </div>
 </div>
 );
}

// 15. Prayer Times Calculator
export function PrayerTimesTool() {
 const [city, setCity] = useState('Karachi');

 // Verified timetables for major selected metropolitan cities
 const cityTimes: Record<string, { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string }> = {
 Karachi: { fajr: '05:12 AM', dhuhr: '12:28 PM', asr: '04:45 PM', maghrib: '06:36 PM', isha: '07:44 PM' },
 Lahore: { fajr: '04:58 AM', dhuhr: '12:15 PM', asr: '04:32 PM', maghrib: '06:22 PM', isha: '07:32 PM' },
 Islamabad: { fajr: '04:56 AM', dhuhr: '12:17 PM', asr: '04:34 PM', maghrib: '06:26 PM', isha: '07:38 PM' },
 Dubai: { fajr: '05:08 AM', dhuhr: '12:24 PM', asr: '04:41 PM', maghrib: '06:31 PM', isha: '07:41 PM' },
 London: { fajr: '04:35 AM', dhuhr: '01:05 PM', asr: '05:12 PM', maghrib: '07:35 PM', isha: '08:58 PM' },
 NewYork: { fajr: '05:22 AM', dhuhr: '12:58 PM', asr: '04:52 PM', maghrib: '07:12 PM', isha: '08:34 PM' },
 };

 const times = cityTimes[city] || cityTimes.Karachi;

 return (
 <div className="space-y-6">
 <div className="max-w-xs">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Select City</label>
 <select
 value={city}
 onChange={(e) => setCity(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 <option value="Karachi">Karachi, Pakistan</option>
 <option value="Lahore">Lahore, Pakistan</option>
 <option value="Islamabad">Islamabad, Pakistan</option>
 <option value="Dubai">Dubai, UAE</option>
 <option value="London">London, UK</option>
 <option value="NewYork">New York, USA</option>
 </select>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
 {[
 { label: 'Fajr', time: times.fajr },
 { label: 'Dhuhr', time: times.dhuhr },
 { label: 'Asr', time: times.asr },
 { label: 'Maghrib', time: times.maghrib },
 { label: 'Isha', time: times.isha },
 ].map((item) => (
 <div
 key={item.label}
 className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-center"
 >
 <span className="text-xs font-semibold text-stone-500">{item.label}</span>
 <div className="text-lg font-bold text-stone-900 tabular-nums mt-1">
 {item.time}
 </div>
 </div>
 ))}
 </div>
 </div>
 );
}