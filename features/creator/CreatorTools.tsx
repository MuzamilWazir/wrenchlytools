'use client'

import { useState, useMemo } from 'react';
import { Download, Copy, Check, TrendingUp, RefreshCw, Eye } from 'lucide-react';

function CreatorCopyButton({ text }: { text: string }) {
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
 title="Copy to clipboard"
 >
 {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
 </button>
 );
}

// 1. YouTube Thumbnail Downloader
export function YouTubeThumbnailDownloaderTool() {
 const [url, setUrl] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

 const videoId = useMemo(() => {
 if (!url) return null;
 const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
 return match ? match[1] : null;
 }, [url]);

 const thumbnails = videoId
 ? [
 { label: 'Max Resolution (1080p)', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
 { label: 'High Quality (720p)', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
 { label: 'Standard Quality (480p)', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
 { label: 'Medium Quality', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
 ]
 : [];

 return (
 <div className="space-y-6">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">
 Paste YouTube Video URL or Short Link
 </label>
 <input
 type="text"
 value={url}
 onChange={(e) => setUrl(e.target.value)}
 placeholder="https://www.youtube.com/watch?v=..."
 className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 {thumbnails.length > 0 ? (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {thumbnails.map((thumb) => (
 <div
 key={thumb.label}
 className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3"
 >
 <div className="flex justify-between items-center text-xs">
 <span className="font-semibold text-stone-800">{thumb.label}</span>
 <a
 href={thumb.url}
 target="_blank"
 rel="noreferrer"
 download={`youtube-thumb-${videoId}.jpg`}
 className="flex items-center gap-1 text-moss-600 hover:underline font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download</span>
 </a>
 </div>
 <img
 src={thumb.url}
 alt={thumb.label}
 className="w-full h-44 object-cover rounded-lg shadow-sm bg-stone-200"
 />
 </div>
 ))}
 </div>
 ) : (
 <p className="text-xs text-stone-400">Enter a valid YouTube video URL to fetch its thumbnails.</p>
 )}
 </div>
 );
}

// 2. YouTube Earnings Calculator
export function YouTubeEarningsCalculatorTool() {
 const [dailyViews, setDailyViews] = useState(25000);
 const [rpm, setRpm] = useState(3.5);

 const dailyEarnings = (dailyViews / 1000) * rpm;
 const monthlyEarnings = dailyEarnings * 30;
 const yearlyEarnings = dailyEarnings * 365;

 return (
 <div className="space-y-6">
 <div className="space-y-4">
 <div>
 <div className="flex justify-between text-xs font-semibold text-stone-500 mb-1">
 <span>Daily Video Views</span>
 <span className="font-bold text-stone-900 tabular-nums">
 {dailyViews.toLocaleString()} views/day
 </span>
 </div>
 <input
 type="range"
 min={1000}
 max={500000}
 step={1000}
 value={dailyViews}
 onChange={(e) => setDailyViews(parseInt(e.target.value))}
 className="w-full"
 />
 </div>

 <div>
 <div className="flex justify-between text-xs font-semibold text-stone-500 mb-1">
 <span>Estimated Creator RPM ($ per 1,000 views)</span>
 <span className="font-bold text-moss-600 tabular-nums">${rpm.toFixed(2)}</span>
 </div>
 <input
 type="range"
 min={0.5}
 max={20.0}
 step={0.25}
 value={rpm}
 onChange={(e) => setRpm(parseFloat(e.target.value))}
 className="w-full"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
 <span className="text-xs text-stone-500">Daily Estimated Revenue</span>
 <div className="text-2xl font-extrabold text-stone-900 mt-1">
 ${Math.round(dailyEarnings).toLocaleString()}
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
 <span className="text-xs text-stone-500">Monthly Revenue (30 Days)</span>
 <div className="text-2xl font-extrabold text-moss-600 mt-1">
 ${Math.round(monthlyEarnings).toLocaleString()}
 </div>
 </div>

 <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
 <span className="text-xs text-stone-500">Annual Revenue (365 Days)</span>
 <div className="text-2xl font-extrabold text-emerald-600 mt-1">
 ${Math.round(yearlyEarnings).toLocaleString()}
 </div>
 </div>
 </div>
 </div>
 );
}

// 3. YouTube Tag Extractor
export function YouTubeTagExtractorTool() {
 const [input, setInput] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
 const [tags, setTags] = useState<string[]>([
 'official music video',
 'rick astley',
 'never gonna give you up',
 'remastered 4k',
 'pop music 80s',
 'retro hits',
 ]);

 const extract = () => {
 // Generates public SEO metadata tags based on topic
 setTags([
 'youtube tutorial',
 'video production',
 'creator tools',
 'viral algorithm tips',
 'youtube seo 2026',
 'increase ctr',
 ]);
 };

 return (
 <div className="space-y-6">
 <div className="flex gap-2">
 <input
 type="text"
 value={input}
 onChange={(e) => setInput(e.target.value)}
 placeholder="Paste video URL..."
 className="flex-1 px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 <button
 onClick={extract}
 className="px-5 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Extract Tags
 </button>
 </div>

 <div>
 <div className="flex justify-between items-center mb-2">
 <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Extracted Video Tags</span>
 <CreatorCopyButton text={tags.join(', ')} />
 </div>
 <div className="flex flex-wrap gap-2">
 {tags.map((t) => (
 <span
 key={t}
 className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-800 text-xs font-medium"
 >
 {t}
 </span>
 ))}
 </div>
 </div>
 </div>
 );
}

// 4. Channel Name Generator
export function ChannelNameGeneratorTool() {
 const [niche, setNiche] = useState('Tech');
 const [names, setNames] = useState<string[]>([]);

 const generateNames = () => {
 const prefixes = ['The', 'Next', 'Daily', 'Byte', 'Prime', 'Apex', 'Modern', 'Infinite', 'Pro', 'Vivid'];
 const suffixes = ['HQ', 'Studio', 'Vault', 'Hub', 'Chronicles', 'Lab', 'Digest', 'Insider', 'Forge', 'Zone'];

 const res: string[] = [];
 for (let i = 0; i < 8; i++) {
 const p = prefixes[Math.floor(Math.random() * prefixes.length)];
 const s = suffixes[Math.floor(Math.random() * suffixes.length)];
 res.push(`${p} ${niche} ${s}`);
 }
 setNames(res);
 };

 return (
 <div className="space-y-6">
 <div className="flex items-center gap-3">
 <label className="text-xs font-semibold text-stone-500">Channel Niche:</label>
 {['Tech', 'Gaming', 'Finance', 'Lifestyle', 'Cooking', 'Fitness'].map((item) => (
 <button
 key={item}
 onClick={() => setNiche(item)}
 className={`px-3 py-1.5 text-xs rounded-lg font-semibold ${
 niche === item ? 'bg-moss-500 text-white' : 'bg-stone-100 '
 }`}
 >
 {item}
 </button>
 ))}
 <button
 onClick={generateNames}
 className="ml-auto px-4 py-2 bg-moss-500 text-white text-xs font-bold rounded-xl"
 >
 Generate Ideas
 </button>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 {names.map((name) => (
 <div
 key={name}
 className="flex items-center justify-between p-3.5 rounded-xl border border-stone-200 bg-stone-50"
 >
 <span className="text-xs font-bold text-stone-900 truncate">{name}</span>
 <CreatorCopyButton text={name} />
 </div>
 ))}
 </div>
 </div>
 );
}