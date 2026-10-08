'use client'

import { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Calendar, DollarSign, Percent, Shield, ArrowRight } from 'lucide-react';

function CalcCopyButton({ value }: { value: string | number }) {
 const [copied, setCopied] = useState(false);
 const handleCopy = () => {
 navigator.clipboard.writeText(String(value));
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

// 1. Age Calculator
export function AgeCalculatorTool() {
 const [birthDate, setBirthDate] = useState('2000-01-15');

 const ageData = useMemo(() => {
 if (!birthDate) return null;
 const birth = new Date(birthDate);
 const now = new Date();
 if (isNaN(birth.getTime()) || birth > now) return null;

 let years = now.getFullYear() - birth.getFullYear();
 let months = now.getMonth() - birth.getMonth();
 let days = now.getDate() - birth.getDate();

 if (days < 0) {
 months--;
 const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
 days += prevMonth.getDate();
 }
 if (months < 0) {
 years--;
 months += 12;
 }

 const diffMs = now.getTime() - birth.getTime();
 const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
 const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

 // Next birthday
 let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
 if (nextBday < now) {
 nextBday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
 }
 const daysUntilNext = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

 return { years, months, days, totalDays, totalHours, daysUntilNext };
 }, [birthDate]);

 return (
 <div className="space-y-6">
 <div className="max-w-xs">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Select Date of Birth</label>
 <input
 type="date"
 value={birthDate}
 onChange={(e) => setBirthDate(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 {ageData ? (
 <div className="space-y-4">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Your Age</span>
 <div className="text-2xl font-extrabold text-moss-600 tabular-nums mt-1">
 {ageData.years} <span className="text-xs font-medium text-stone-500">Years</span>
 </div>
 <p className="text-xs text-stone-500 mt-1">
 {ageData.months} months, {ageData.days} days
 </p>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Next Birthday In</span>
 <div className="text-2xl font-extrabold text-clay-600 tabular-nums mt-1">
 {ageData.daysUntilNext} <span className="text-xs font-medium text-stone-500">Days</span>
 </div>
 <p className="text-xs text-stone-500 mt-1">Celebrate your {ageData.years + 1}th birthday</p>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Total Days Lived</span>
 <div className="text-2xl font-extrabold text-stone-900 tabular-nums mt-1">
 {ageData.totalDays.toLocaleString()}
 </div>
 <p className="text-xs text-stone-500 mt-1">~{ageData.totalHours.toLocaleString()} hours</p>
 </div>
 </div>
 </div>
 ) : (
 <p className="text-xs text-stone-400">Please choose a valid birth date in the past.</p>
 )}
 </div>
 );
}

// 2. Percentage Calculator
export function PercentageCalculatorTool() {
 const [valA, setValA] = useState(25);
 const [valB, setValB] = useState(200);

 const [fromVal, setFromVal] = useState(150);
 const [toVal, setToVal] = useState(195);

 const res1 = ((valA / 100) * valB).toFixed(2);
 const res2 = valB !== 0 ? (((valA / valB) * 100).toFixed(2)) : '0';
 const pctChange = fromVal !== 0 ? ((((toVal - fromVal) / fromVal) * 100).toFixed(2)) : '0';

 return (
 <div className="space-y-6">
 {/* Mode 1: What is X% of Y */}
 <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
 <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
 What is X% of Y?
 </h3>
 <div className="flex flex-wrap items-center gap-3 text-sm">
 <span>What is</span>
 <input
 type="number"
 value={valA}
 onChange={(e) => setValA(parseFloat(e.target.value) || 0)}
 className="w-20 px-2.5 py-1.5 rounded border border-stone-300 bg-white"
 />
 <span>% of</span>
 <input
 type="number"
 value={valB}
 onChange={(e) => setValB(parseFloat(e.target.value) || 0)}
 className="w-28 px-2.5 py-1.5 rounded border border-stone-300 bg-white"
 />
 <span className="font-bold text-moss-600 text-lg tabular-nums">= {res1}</span>
 <CalcCopyButton value={res1} />
 </div>
 </div>

 {/* Mode 2: Percentage Increase / Decrease */}
 <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
 <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
 Percentage Increase / Decrease
 </h3>
 <div className="flex flex-wrap items-center gap-3 text-sm">
 <span>From</span>
 <input
 type="number"
 value={fromVal}
 onChange={(e) => setFromVal(parseFloat(e.target.value) || 0)}
 className="w-24 px-2.5 py-1.5 rounded border border-stone-300 bg-white"
 />
 <span>to</span>
 <input
 type="number"
 value={toVal}
 onChange={(e) => setToVal(parseFloat(e.target.value) || 0)}
 className="w-24 px-2.5 py-1.5 rounded border border-stone-300 bg-white"
 />
 <span className={`font-bold text-lg tabular-nums ${parseFloat(pctChange) >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
 = {pctChange}% {parseFloat(pctChange) >= 0 ? 'Increase' : 'Decrease'}
 </span>
 <CalcCopyButton value={`${pctChange}%`} />
 </div>
 </div>
 </div>
 );
}

// 3. BMI Calculator
export function BmiCalculatorTool() {
 const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
 const [weightKg, setWeightKg] = useState(70);
 const [heightCm, setHeightCm] = useState(175);
 const [weightLbs, setWeightLbs] = useState(154);
 const [heightIn, setHeightIn] = useState(69);

 const bmi = useMemo(() => {
 let val = 0;
 if (unit === 'metric') {
 const hM = heightCm / 100;
 val = hM > 0 ? weightKg / (hM * hM) : 0;
 } else {
 val = heightIn > 0 ? (703 * weightLbs) / (heightIn * heightIn) : 0;
 }
 return parseFloat(val.toFixed(1));
 }, [unit, weightKg, heightCm, weightLbs, heightIn]);

 let category = 'Normal Weight';
 let color = 'text-emerald-500';
 if (bmi < 18.5) {
 category = 'Underweight';
 color = 'text-sky-500';
 } else if (bmi >= 25 && bmi < 30) {
 category = 'Overweight';
 color = 'text-amber-500';
 } else if (bmi >= 30) {
 category = 'Obese';
 color = 'text-rose-500';
 }

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 <button
 onClick={() => setUnit('metric')}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${unit === 'metric' ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 Metric (kg / cm)
 </button>
 <button
 onClick={() => setUnit('imperial')}
 className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${unit === 'imperial' ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 Imperial (lbs / inches)
 </button>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {unit === 'metric' ? (
 <>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Weight (kg)</label>
 <input
 type="number"
 value={weightKg}
 onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Height (cm)</label>
 <input
 type="number"
 value={heightCm}
 onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </>
 ) : (
 <>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Weight (lbs)</label>
 <input
 type="number"
 value={weightLbs}
 onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Height (inches)</label>
 <input
 type="number"
 value={heightIn}
 onChange={(e) => setHeightIn(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </>
 )}
 </div>

 <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
 <div>
 <span className="text-xs text-stone-500">Your Body Mass Index (BMI)</span>
 <div className="text-4xl font-extrabold text-stone-900 tabular-nums mt-1">
 {bmi}
 </div>
 </div>
 <div className="text-right">
 <span className="text-xs text-stone-500">Classification</span>
 <div className={`text-xl font-bold ${color} mt-1`}>{category}</div>
 <p className="text-xs text-stone-400 mt-0.5">Healthy normal range: 18.5 – 24.9</p>
 </div>
 </div>
 </div>
 );
}

// 4. GPA Calculator
export function GpaCalculatorTool() {
 const [courses, setCourses] = useState([
 { id: 1, name: 'Computer Science', grade: 4.0, credits: 3 },
 { id: 2, name: 'Calculus II', grade: 3.7, credits: 4 },
 { id: 3, name: 'Technical Writing', grade: 4.0, credits: 3 },
 { id: 4, name: 'Physics Mechanics', grade: 3.3, credits: 4 },
 ]);

 const addCourse = () => {
 setCourses([...courses, { id: Date.now(), name: 'New Course', grade: 4.0, credits: 3 }]);
 };

 const removeCourse = (id: number) => {
 setCourses(courses.filter((c) => c.id !== id));
 };

 const gpa = useMemo(() => {
 let totalPoints = 0;
 let totalCredits = 0;
 courses.forEach((c) => {
 totalPoints += c.grade * c.credits;
 totalCredits += c.credits;
 });
 return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
 }, [courses]);

 return (
 <div className="space-y-6">
 <div className="space-y-2">
 {courses.map((course, idx) => (
 <div key={course.id} className="flex items-center gap-2">
 <input
 type="text"
 value={course.name}
 onChange={(e) => {
 const updated = [...courses];
 updated[idx].name = e.target.value;
 setCourses(updated);
 }}
 className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 <select
 value={course.grade}
 onChange={(e) => {
 const updated = [...courses];
 updated[idx].grade = parseFloat(e.target.value);
 setCourses(updated);
 }}
 className="w-28 px-2 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 >
 <option value={4.0}>A (4.0)</option>
 <option value={3.7}>A- (3.7)</option>
 <option value={3.3}>B+ (3.3)</option>
 <option value={3.0}>B (3.0)</option>
 <option value={2.7}>B- (2.7)</option>
 <option value={2.0}>C (2.0)</option>
 <option value={1.0}>D (1.0)</option>
 <option value={0.0}>F (0.0)</option>
 </select>
 <input
 type="number"
 min={1}
 max={6}
 value={course.credits}
 onChange={(e) => {
 const updated = [...courses];
 updated[idx].credits = parseInt(e.target.value) || 1;
 setCourses(updated);
 }}
 className="w-16 px-2 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 <button
 onClick={() => removeCourse(course.id)}
 className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
 >
 ×
 </button>
 </div>
 ))}
 </div>

 <div className="flex items-center justify-between pt-2">
 <button
 onClick={addCourse}
 className="px-3 py-1.5 text-xs font-medium text-moss-600 hover:bg-moss-500/10 rounded-lg"
 >
 + Add Course
 </button>

 <div className="flex items-center gap-2">
 <span className="text-xs text-stone-500">Cumulative GPA:</span>
 <span className="text-2xl font-bold text-moss-600 tabular-nums">{gpa}</span>
 </div>
 </div>
 </div>
 );
}

// 5. Date Difference Calculator
export function DateDifferenceTool() {
 const [start, setStart] = useState('2026-01-01');
 const [end, setEnd] = useState('2026-12-31');

 const diff = useMemo(() => {
 const s = new Date(start);
 const e = new Date(end);
 if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

 const diffMs = Math.abs(e.getTime() - s.getTime());
 const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
 const weeks = Math.floor(totalDays / 7);
 const remDays = totalDays % 7;

 return { totalDays, weeks, remDays };
 }, [start, end]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Start Date</label>
 <input
 type="date"
 value={start}
 onChange={(e) => setStart(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">End Date</label>
 <input
 type="date"
 value={end}
 onChange={(e) => setEnd(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 {diff && (
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
 <span className="text-xs text-stone-500">Difference</span>
 <div className="text-3xl font-extrabold text-moss-600 tabular-nums mt-1">
 {diff.totalDays} Days
 </div>
 <p className="text-xs text-stone-500 mt-1">
 ({diff.weeks} weeks and {diff.remDays} days)
 </p>
 </div>
 )}
 </div>
 );
}

// 6. Days Until a Date
export function DaysUntilDateTool() {
 const [target, setTarget] = useState('2026-12-25');

 const daysLeft = useMemo(() => {
 const t = new Date(target);
 const now = new Date();
 if (isNaN(t.getTime())) return 0;
 const diffMs = t.getTime() - now.getTime();
 return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
 }, [target]);

 return (
 <div className="space-y-6">
 <div className="max-w-xs">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Target Event Date</label>
 <input
 type="date"
 value={target}
 onChange={(e) => setTarget(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center">
 <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Countdown</span>
 <div className="text-5xl font-black text-moss-600 tabular-nums my-2">
 {daysLeft >= 0 ? daysLeft : 0}
 </div>
 <span className="text-sm font-medium text-stone-700">
 Days remaining until {target}
 </span>
 </div>
 </div>
 );
}

// 7. Tip Calculator
export function TipCalculatorTool() {
 const [bill, setBill] = useState(85);
 const [tipPct, setTipPct] = useState(18);
 const [people, setPeople] = useState(2);

 const tipAmount = (bill * (tipPct / 100));
 const total = bill + tipAmount;
 const perPerson = people > 0 ? (total / people).toFixed(2) : '0';

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Bill Amount ($)</label>
 <input
 type="number"
 value={bill}
 onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Tip Percentage (%)</label>
 <input
 type="number"
 value={tipPct}
 onChange={(e) => setTipPct(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Split (# People)</label>
 <input
 type="number"
 min={1}
 value={people}
 onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <div className="text-xs text-stone-500">Tip: ${tipAmount.toFixed(2)} · Total: ${total.toFixed(2)}</div>
 <div className="text-2xl font-bold text-moss-600 mt-1">${perPerson} <span className="text-xs font-normal text-stone-500">/ person</span></div>
 </div>
 <CalcCopyButton value={perPerson} />
 </div>
 </div>
 );
}

// 8. Discount Calculator
export function DiscountCalculatorTool() {
 const [price, setPrice] = useState(120);
 const [discount, setDiscount] = useState(25);
 const [coupon, setCoupon] = useState(10);

 const discounted = price * (1 - discount / 100);
 const finalPrice = discounted * (1 - coupon / 100);
 const totalSaved = price - finalPrice;

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Original Price ($)</label>
 <input
 type="number"
 value={price}
 onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Primary Discount (%)</label>
 <input
 type="number"
 value={discount}
 onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Extra Coupon (%)</label>
 <input
 type="number"
 value={coupon}
 onChange={(e) => setCoupon(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">You Save: ${totalSaved.toFixed(2)}</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">${finalPrice.toFixed(2)}</div>
 </div>
 <CalcCopyButton value={finalPrice.toFixed(2)} />
 </div>
 </div>
 );
}

// 9. Loan & EMI Calculator
export function LoanEmiCalculatorTool() {
 const [principal, setPrincipal] = useState(250000);
 const [rate, setRate] = useState(6.5);
 const [years, setYears] = useState(15);

 const emiData = useMemo(() => {
 const monthlyRate = rate / 12 / 100;
 const months = years * 12;
 if (monthlyRate === 0) {
 const emi = principal / months;
 return { emi: emi.toFixed(2), totalInterest: '0', totalPayment: principal.toFixed(2) };
 }
 const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
 const totalPayment = emi * months;
 const totalInterest = totalPayment - principal;

 return {
 emi: emi.toFixed(2),
 totalInterest: totalInterest.toFixed(2),
 totalPayment: totalPayment.toFixed(2),
 };
 }, [principal, rate, years]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Loan Principal ($)</label>
 <input
 type="number"
 value={principal}
 onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Annual Interest Rate (%)</label>
 <input
 type="number"
 step={0.1}
 value={rate}
 onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Tenure (Years)</label>
 <input
 type="number"
 value={years}
 onChange={(e) => setYears(parseInt(e.target.value) || 1)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Monthly EMI</span>
 <div className="text-2xl font-extrabold text-moss-600 mt-1">${emiData.emi}</div>
 </div>
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Total Interest</span>
 <div className="text-2xl font-extrabold text-clay-600 mt-1">${emiData.totalInterest}</div>
 </div>
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Total Cost of Loan</span>
 <div className="text-2xl font-extrabold text-stone-900 mt-1">${emiData.totalPayment}</div>
 </div>
 </div>
 </div>
 );
}

// 10. Pakistan Income Tax Calculator (Salaried — Tax Year 2026-2027 / Finance Act 2026)
export function PakistanIncomeTaxTool() {
 const [monthlySalary, setMonthlySalary] = useState(150000);

 const taxDetails = useMemo(() => {
 const annual = monthlySalary * 12;
 let annualTax = 0;

 // FBR Salaried Slabs — Finance Act 2026 (Tax Year 2026-27, effective 1 July 2026):
 // 0 - 600,000: 0%
 // 600,001 - 1,200,000: 1% of amount exceeding 600,000
 // 1,200,001 - 2,200,000: 6,000 + 11% of amount exceeding 1,200,000
 // 2,200,001 - 3,200,000: 116,000 + 20% of amount exceeding 2,200,000
 // 3,200,001 - 4,100,000: 316,000 + 25% of amount exceeding 3,200,000
 // 4,100,001 - 5,600,000: 541,000 + 29% of amount exceeding 4,100,000
 // 5,600,001 - 7,000,000: 976,000 + 32% of amount exceeding 5,600,000
 // Above 7,000,000: 1,424,000 + 35% of amount exceeding 7,000,000

 if (annual <= 600000) {
 annualTax = 0;
 } else if (annual <= 1200000) {
 annualTax = (annual - 600000) * 0.01;
 } else if (annual <= 2200000) {
 annualTax = 6000 + (annual - 1200000) * 0.11;
 } else if (annual <= 3200000) {
 annualTax = 116000 + (annual - 2200000) * 0.2;
 } else if (annual <= 4100000) {
 annualTax = 316000 + (annual - 3200000) * 0.25;
 } else if (annual <= 5600000) {
 annualTax = 541000 + (annual - 4100000) * 0.29;
 } else if (annual <= 7000000) {
 annualTax = 976000 + (annual - 5600000) * 0.32;
 } else {
 annualTax = 1424000 + (annual - 7000000) * 0.35;
 }

 const monthlyTax = annualTax / 12;
 const netMonthly = monthlySalary - monthlyTax;
 const effectiveRate = annual > 0 ? ((annualTax / annual) * 100).toFixed(1) : '0';

 return {
 annual,
 annualTax: Math.round(annualTax),
 monthlyTax: Math.round(monthlyTax),
 netMonthly: Math.round(netMonthly),
 effectiveRate,
 };
 }, [monthlySalary]);

 return (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center gap-2">
 <span className="inline-flex items-center rounded-full bg-moss-50 px-2.5 py-1 text-[11px] font-semibold text-moss-700 ring-1 ring-inset ring-moss-100">
 Tax Year 2026-27 · Finance Act 2026
 </span>
 <span className="text-[11px] text-stone-400">Salaried individuals · FBR slabs</span>
 </div>
 <div className="max-w-sm">
 <label className="block text-xs font-semibold text-stone-500 mb-1">
 Gross Monthly Salary (PKR)
 </label>
 <input
 type="number"
 step={5000}
 value={monthlySalary}
 onChange={(e) => setMonthlySalary(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 <span className="text-[11px] text-stone-400 mt-1 block">Annual Gross: PKR {taxDetails.annual.toLocaleString()}</span>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Monthly Tax Deduction</span>
 <div className="text-2xl font-extrabold text-rose-500 mt-1">
 PKR {taxDetails.monthlyTax.toLocaleString()}
 </div>
 <span className="text-[11px] text-stone-400">{taxDetails.effectiveRate}% effective tax rate</span>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Net Take-Home Salary</span>
 <div className="text-2xl font-extrabold text-emerald-600 mt-1">
 PKR {taxDetails.netMonthly.toLocaleString()}
 </div>
 <span className="text-[11px] text-stone-400">Monthly in-pocket</span>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs text-stone-500">Annual Tax Liability</span>
 <div className="text-2xl font-extrabold text-stone-900 mt-1">
 PKR {taxDetails.annualTax.toLocaleString()}
 </div>
 <span className="text-[11px] text-stone-400">Total FBR tax for Tax Year 2026-27</span>
 </div>
 </div>

 <p className="text-[11px] leading-relaxed text-stone-400">
 Estimate only — excludes surcharge, exemptions and tax credits, which can change your
 final liability. Slabs follow the Finance Act 2026 (effective 1 July 2026); confirm
 figures with the FBR or a registered tax advisor before filing.
 </p>
 </div>
 );
}

// 11. Zakat Calculator
export function ZakatCalculatorTool() {
 const [cash, setCash] = useState(500000);
 const [goldVal, setGoldVal] = useState(300000);
 const [silverVal, setSilverVal] = useState(0);
 const [investments, setInvestments] = useState(200000);
 const [liabilities, setLiabilities] = useState(50000);

 const totalWealth = cash + goldVal + silverVal + investments - liabilities;
 const zakatPayable = totalWealth > 0 ? totalWealth * 0.025 : 0;

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Cash in hand & Bank accounts</label>
 <input
 type="number"
 value={cash}
 onChange={(e) => setCash(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Gold value owned</label>
 <input
 type="number"
 value={goldVal}
 onChange={(e) => setGoldVal(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Trade goods & Investments</label>
 <input
 type="number"
 value={investments}
 onChange={(e) => setInvestments(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Immediate Debts & Liabilities (-)</label>
 <input
 type="number"
 value={liabilities}
 onChange={(e) => setLiabilities(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">Net Zakatable Wealth: {totalWealth.toLocaleString()}</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">
 {zakatPayable.toLocaleString()} <span className="text-xs font-normal text-stone-500">(2.5% Zakat)</span>
 </div>
 </div>
 <CalcCopyButton value={zakatPayable} />
 </div>
 </div>
 );
}

// 12. Gold Value Calculator
export function GoldValueTool() {
 const [unit, setUnit] = useState<'tola' | 'grams'>('tola');
 const [weight, setWeight] = useState(2);
 const [purity, setPurity] = useState<24 | 22 | 21 | 18>(24);
 const [ratePerUnit, setRatePerUnit] = useState(280000); // reference rate

 const purityFactor = purity / 24;
 const totalValue = weight * ratePerUnit * purityFactor;

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Unit</label>
 <select
 value={unit}
 onChange={(e) => setUnit(e.target.value as any)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 >
 <option value="tola">Tola (11.66g)</option>
 <option value="grams">Grams</option>
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Weight ({unit})</label>
 <input
 type="number"
 value={weight}
 onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Purity Karat</label>
 <select
 value={purity}
 onChange={(e) => setPurity(parseInt(e.target.value) as any)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 >
 <option value={24}>24K (Pure 99.9%)</option>
 <option value={22}>22K (Jewelry 91.6%)</option>
 <option value={21}>21K (87.5%)</option>
 <option value={18}>18K (75.0%)</option>
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Price per {unit}</label>
 <input
 type="number"
 value={ratePerUnit}
 onChange={(e) => setRatePerUnit(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{weight} {unit} of {purity}K Gold Valuation</span>
 <div className="text-3xl font-extrabold text-amber-500 mt-1">
 {Math.round(totalValue).toLocaleString()}
 </div>
 </div>
 <CalcCopyButton value={Math.round(totalValue)} />
 </div>
 </div>
 );
}

// 13. Currency Converter
export function CurrencyConverterTool() {
 const [amount, setAmount] = useState(100);
 const [from, setFrom] = useState('USD');
 const [to, setTo] = useState('PKR');

 // Realistic reference rates
 const rates: Record<string, number> = {
 USD: 1.0,
 EUR: 0.92,
 GBP: 0.78,
 PKR: 279.5,
 INR: 84.2,
 AED: 3.67,
 SAR: 3.75,
 CAD: 1.36,
 };

 const converted = ((amount / (rates[from] || 1)) * (rates[to] || 1)).toFixed(2);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Amount</label>
 <input
 type="number"
 value={amount}
 onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">From Currency</label>
 <select
 value={from}
 onChange={(e) => setFrom(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(rates).map((c) => (
 <option key={c} value={c}>{c}</option>
 ))}
 </select>
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">To Currency</label>
 <select
 value={to}
 onChange={(e) => setTo(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 >
 {Object.keys(rates).map((c) => (
 <option key={c} value={c}>{c}</option>
 ))}
 </select>
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
 <div>
 <span className="text-xs text-stone-500">{amount} {from} =</span>
 <div className="text-3xl font-extrabold text-moss-600 mt-1">{converted} {to}</div>
 </div>
 <CalcCopyButton value={converted} />
 </div>
 </div>
 );
}