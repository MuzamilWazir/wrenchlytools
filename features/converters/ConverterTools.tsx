'use client'

import { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

function ConvCopyButton({ text }: { text: string }) {
 const [copied, setCopied] = useState(false);
 const handleCopy = () => {
 navigator.clipboard.writeText(text);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };
 return (
 <button
 onClick={handleCopy}
 className="p-1 text-stone-400 hover:text-stone-600"
 title="Copy value"
 >
 {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
 </button>
 );
}

// 1. Length Converter
export function LengthConverterTool() {
 const [val, setVal] = useState(10);
 const [from, setFrom] = useState('meters');
 const [to, setTo] = useState('feet');

 const factors: Record<string, number> = {
 meters: 1,
 kilometers: 1000,
 centimeters: 0.01,
 millimeters: 0.001,
 miles: 1609.344,
 yards: 0.9144,
 feet: 0.3048,
 inches: 0.0254,
 };

 const result = ((val * (factors[from] || 1)) / (factors[to] || 1)).toFixed(4);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Value</label>
 <input
 type="number"
 value={val}
 onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">From</label>
 <select
 value={from}
 onChange={(e) => setFrom(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">To</label>
 <select
 value={to}
 onChange={(e) => setTo(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u}</option>
 ))}
 </select>
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{val} {from} =</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{result} {to}</div>
 </div>
 <ConvCopyButton text={result} />
 </div>
 </div>
 );
}

// 2. Weight Converter
export function WeightConverterTool() {
 const [val, setVal] = useState(5);
 const [from, setFrom] = useState('kg');
 const [to, setTo] = useState('lbs');

 const factors: Record<string, number> = {
 kg: 1,
 grams: 0.001,
 lbs: 0.45359237,
 ounces: 0.0283495,
 metric_tons: 1000,
 };

 const result = ((val * (factors[from] || 1)) / (factors[to] || 1)).toFixed(4);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Weight</label>
 <input
 type="number"
 value={val}
 onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">From</label>
 <select
 value={from}
 onChange={(e) => setFrom(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">To</label>
 <select
 value={to}
 onChange={(e) => setTo(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u}</option>
 ))}
 </select>
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{val} {from} =</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{result} {to}</div>
 </div>
 <ConvCopyButton text={result} />
 </div>
 </div>
 );
}

// 3. Temperature Converter
export function TemperatureConverterTool() {
 const [val, setVal] = useState(25);
 const [from, setFrom] = useState<'C' | 'F' | 'K'>('C');

 const conversions = useMemo(() => {
 let c = val;
 if (from === 'F') c = (val - 32) * (5 / 9);
 else if (from === 'K') c = val - 273.15;

 const f = c * (9 / 5) + 32;
 const k = c + 273.15;

 return {
 C: c.toFixed(2),
 F: f.toFixed(2),
 K: k.toFixed(2),
 };
 }, [val, from]);

 return (
 <div className="space-y-6">
 <div className="flex gap-4 max-w-sm">
 <input
 type="number"
 value={val}
 onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 <select
 value={from}
 onChange={(e) => setFrom(e.target.value as any)}
 className="px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 <option value="C">°C Celsius</option>
 <option value="F">°F Fahrenheit</option>
 <option value="K">Kelvin</option>
 </select>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Celsius</span>
 <div className="text-2xl font-bold text-stone-900 mt-1">{conversions.C} °C</div>
 </div>
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Fahrenheit</span>
 <div className="text-2xl font-bold text-stone-900 mt-1">{conversions.F} °F</div>
 </div>
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Kelvin</span>
 <div className="text-2xl font-bold text-stone-900 mt-1">{conversions.K} K</div>
 </div>
 </div>
 </div>
 );
}

// 4. Area Converter
export function AreaConverterTool() {
 const [val, setVal] = useState(1);
 const [from, setFrom] = useState('marla');
 const [to, setTo] = useState('sq_ft');

 // Sq meters base
 const factors: Record<string, number> = {
 sq_meters: 1,
 sq_ft: 0.092903,
 acres: 4046.86,
 hectares: 10000,
 marla: 20.903, // 225 sq ft
 kanal: 418.064, // 20 marlas
 };

 const result = ((val * (factors[from] || 1)) / (factors[to] || 1)).toFixed(2);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Area Amount</label>
 <input
 type="number"
 value={val}
 onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">From</label>
 <select
 value={from}
 onChange={(e) => setFrom(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u.replace('_', ' ')}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">To</label>
 <select
 value={to}
 onChange={(e) => setTo(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u.replace('_', ' ')}</option>
 ))}
 </select>
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{val} {from} =</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{result} {to}</div>
 </div>
 <ConvCopyButton text={result} />
 </div>
 </div>
 );
}

// 5. Speed Converter
export function SpeedConverterTool() {
 const [val, setVal] = useState(100);
 const [from, setFrom] = useState('kmh');
 const [to, setTo] = useState('mph');

 const factors: Record<string, number> = {
 kmh: 1,
 mph: 1.60934,
 ms: 3.6,
 knots: 1.852,
 };

 const result = ((val * (factors[from] || 1)) / (factors[to] || 1)).toFixed(2);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Speed</label>
 <input
 type="number"
 value={val}
 onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">From</label>
 <select
 value={from}
 onChange={(e) => setFrom(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 <option value="kmh">km/h</option>
 <option value="mph">mph</option>
 <option value="ms">m/s</option>
 <option value="knots">Knots</option>
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">To</label>
 <select
 value={to}
 onChange={(e) => setTo(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 <option value="kmh">km/h</option>
 <option value="mph">mph</option>
 <option value="ms">m/s</option>
 <option value="knots">Knots</option>
 </select>
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{val} {from} =</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{result} {to}</div>
 </div>
 <ConvCopyButton text={result} />
 </div>
 </div>
 );
}

// 6. Time Converter
export function TimeConverterTool() {
 const [val, setVal] = useState(24);
 const [from, setFrom] = useState('hours');
 const [to, setTo] = useState('minutes');

 const factors: Record<string, number> = {
 seconds: 1,
 minutes: 60,
 hours: 3600,
 days: 86400,
 weeks: 604800,
 };

 const result = ((val * (factors[from] || 1)) / (factors[to] || 1)).toFixed(2);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Duration</label>
 <input
 type="number"
 value={val}
 onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">From</label>
 <select
 value={from}
 onChange={(e) => setFrom(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">To</label>
 <select
 value={to}
 onChange={(e) => setTo(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u}</option>
 ))}
 </select>
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{val} {from} =</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{result} {to}</div>
 </div>
 <ConvCopyButton text={result} />
 </div>
 </div>
 );
}

// 7. Data Size Converter
export function DataSizeConverterTool() {
 const [val, setVal] = useState(1);
 const [from, setFrom] = useState('GB');
 const [to, setTo] = useState('MB');

 const factors: Record<string, number> = {
 Bytes: 1,
 KB: 1024,
 MB: 1024 * 1024,
 GB: 1024 * 1024 * 1024,
 TB: 1024 * 1024 * 1024 * 1024,
 };

 const result = ((val * (factors[from] || 1)) / (factors[to] || 1)).toFixed(2);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Size</label>
 <input
 type="number"
 value={val}
 onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">From</label>
 <select
 value={from}
 onChange={(e) => setFrom(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">To</label>
 <select
 value={to}
 onChange={(e) => setTo(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(factors).map((u) => (
 <option key={u} value={u}>{u}</option>
 ))}
 </select>
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{val} {from} =</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{result} {to}</div>
 </div>
 <ConvCopyButton text={result} />
 </div>
 </div>
 );
}

// 8. Cooking Units Converter
export function CookingUnitsTool() {
 const [val, setVal] = useState(2);
 const [ingredient, setIngredient] = useState<'flour' | 'sugar' | 'butter'>('flour');

 // Densities (grams per cup)
 const densities = {
 flour: 120,
 sugar: 200,
 butter: 227,
 };

 const grams = val * densities[ingredient];

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Cups</label>
 <input
 type="number"
 value={val}
 onChange={(e) => setVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Ingredient</label>
 <select
 value={ingredient}
 onChange={(e) => setIngredient(e.target.value as any)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 <option value="flour">All-Purpose Flour (~120g/cup)</option>
 <option value="sugar">Granulated Sugar (~200g/cup)</option>
 <option value="butter">Butter (~227g/cup)</option>
 </select>
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{val} cups of {ingredient} =</span>
 <div className="text-3xl font-extrabold text-amber-500 mt-1">{grams} grams</div>
 </div>
 <ConvCopyButton text={String(grams)} />
 </div>
 </div>
 );
}

// 9. Number to Words
export function NumberToWordsTool() {
 const [num, setNum] = useState(124500);

 const words = useMemo(() => {
 if (num === 0) return 'zero';
 const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
 const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

 function inWords(n: number): string {
 if ((n = n.toString() as any).length > 9) return 'overflow';
 const nArr = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
 if (!nArr) return '';
 let str = '';
 str += Number(nArr[1]) !== 0 ? (a[Number(nArr[1])] || b[nArr[1][0] as any] + ' ' + a[nArr[1][1] as any]) + 'crore ' : '';
 str += Number(nArr[2]) !== 0 ? (a[Number(nArr[2])] || b[nArr[2][0] as any] + ' ' + a[nArr[2][1] as any]) + 'lakh ' : '';
 str += Number(nArr[3]) !== 0 ? (a[Number(nArr[3])] || b[nArr[3][0] as any] + ' ' + a[nArr[3][1] as any]) + 'thousand ' : '';
 str += Number(nArr[4]) !== 0 ? (a[Number(nArr[4])] || b[nArr[4][0] as any] + ' ' + a[nArr[4][1] as any]) + 'hundred ' : '';
 str += Number(nArr[5]) !== 0 ? ((str !== '') ? 'and ' : '') + (a[Number(nArr[5])] || b[nArr[5][0] as any] + ' ' + a[nArr[5][1] as any]) : '';
 return str.trim();
 }
 return inWords(num);
 }, [num]);

 return (
 <div className="space-y-6">
 <div className="max-w-xs">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Enter Number</label>
 <input
 type="number"
 value={num}
 onChange={(e) => setNum(parseInt(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">Spelled Out:</span>
 <div className="text-xl font-bold text-stone-900 capitalize mt-1">{words}</div>
 </div>
 <ConvCopyButton text={words} />
 </div>
 </div>
 );
}

// 10. Roman Numerals
export function RomanNumeralsTool() {
 const [arabic, setArabic] = useState(2026);

 const roman = useMemo(() => {
 const map: [number, string][] = [
 [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
 [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
 [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
 ];
 let num = arabic;
 let res = '';
 for (const [v, s] of map) {
 while (num >= v) {
 res += s;
 num -= v;
 }
 }
 return res;
 }, [arabic]);

 return (
 <div className="space-y-6">
 <div className="max-w-xs">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Arabic Number (1-3999)</label>
 <input
 type="number"
 min={1}
 max={3999}
 value={arabic}
 onChange={(e) => setArabic(Math.min(3999, Math.max(1, parseInt(e.target.value) || 1)))}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">Roman Numeral</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{roman}</div>
 </div>
 <ConvCopyButton text={roman} />
 </div>
 </div>
 );
}

// 11. Binary / Hex / Decimal
export function BinaryHexConverterTool() {
 const [dec, setDec] = useState(42);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Decimal (Base 10)</label>
 <input
 type="number"
 value={dec}
 onChange={(e) => setDec(parseInt(e.target.value) || 0)}
 className="w-full px-3 py-2 font-mono text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Binary (Base 2)</label>
 <div className="p-2 font-mono text-sm border rounded-xl bg-stone-50 truncate">
 {dec.toString(2)}
 </div>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Hexadecimal (Base 16)</label>
 <div className="p-2 font-mono text-sm border rounded-xl bg-stone-50 uppercase truncate">
 0x{dec.toString(16)}
 </div>
 </div>
 </div>
 </div>
 );
}