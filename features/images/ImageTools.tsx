'use client'

import { useState, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, ZoomIn, Crop, RotateCw, Layers, ShieldCheck, Check, Copy } from 'lucide-react';

function CopyButton({ text }: { text: string }) {
 const [copied, setCopied] = useState(false);
 const handleCopy = () => {
 navigator.clipboard.writeText(text);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };
 return (
 <button
 onClick={handleCopy}
 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-moss-500 hover:bg-moss-600 text-white transition-colors"
 >
 {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
 <span>{copied ? 'Copied' : 'Copy'}</span>
 </button>
 );
}

// Reusable Image Dropzone
function ImageDropzone({ onImageSelect }: { onImageSelect: (file: File) => void }) {
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleDrop = (e: React.DragEvent) => {
 e.preventDefault();
 if (e.dataTransfer.files && e.dataTransfer.files[0]) {
 onImageSelect(e.dataTransfer.files[0]);
 }
 };

 return (
 <div
 onDragOver={(e) => e.preventDefault()}
 onDrop={handleDrop}
 onClick={() => fileInputRef.current?.click()}
 className="border-2 border-dashed border-stone-300 hover:border-moss-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-stone-50/50 group"
 >
 <input
 ref={fileInputRef}
 type="file"
 accept="image/*"
 className="hidden"
 onChange={(e) => e.target.files?.[0] && onImageSelect(e.target.files[0])}
 />
 <div className="w-12 h-12 mx-auto rounded-xl bg-moss-500/10 text-moss-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
 <Upload className="w-6 h-6" />
 </div>
 <p className="text-sm font-semibold text-stone-800">
 Click to select an image, or drag & drop here
 </p>
 <p className="text-xs text-stone-500 mt-1">Supports PNG, JPG, JPEG, and WebP (up to 25MB)</p>
 </div>
 );
}

// 1. Image Compressor
export function ImageCompressorTool() {
 const [image, setImage] = useState<string | null>(null);
 const [originalSize, setOriginalSize] = useState<number>(0);
 const [compressedImage, setCompressedImage] = useState<string | null>(null);
 const [compressedSize, setCompressedSize] = useState<number>(0);
 const [quality, setQuality] = useState(0.8);
 const [format, setFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');

 const handleSelect = (file: File) => {
 setOriginalSize(file.size);
 const reader = new FileReader();
 reader.onload = (e) => {
 setImage(e.target?.result as string);
 };
 reader.readAsDataURL(file);
 };

 useEffect(() => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 canvas.width = img.width;
 canvas.height = img.height;
 const ctx = canvas.getContext('2d');
 if (ctx) {
 ctx.fillStyle = '#FFFFFF';
 ctx.fillRect(0, 0, canvas.width, canvas.height);
 ctx.drawImage(img, 0, 0);
 const dataUrl = canvas.toDataURL(format, quality);
 setCompressedImage(dataUrl);

 // Approximate size from base64
 const head = `data:${format};base64,`;
 const sizeInBytes = Math.round(((dataUrl.length - head.length) * 3) / 4);
 setCompressedSize(sizeInBytes);
 }
 };
 }, [image, quality, format]);

 const savings = originalSize > 0 && compressedSize > 0
 ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
 : 0;

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-center">
 <span className="text-xs font-semibold text-stone-500 mb-2 block">
 Original ({(originalSize / 1024).toFixed(1)} KB)
 </span>
 <img src={image} alt="Original" className="max-h-64 mx-auto rounded-lg object-contain shadow-sm" />
 </div>

 <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-center">
 <span className="text-xs font-semibold text-stone-500 mb-2 block">
 Compressed ({(compressedSize / 1024).toFixed(1)} KB — {savings}% smaller)
 </span>
 {compressedImage && (
 <img src={compressedImage} alt="Compressed" className="max-h-64 mx-auto rounded-lg object-contain shadow-sm" />
 )}
 </div>
 </div>

 <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <div className="flex-1 min-w-[200px]">
 <div className="flex justify-between text-xs font-medium text-stone-700 mb-1">
 <span>Compression Quality: {Math.round(quality * 100)}%</span>
 </div>
 <input
 type="range"
 min={0.1}
 max={1.0}
 step={0.05}
 value={quality}
 onChange={(e) => setQuality(parseFloat(e.target.value))}
 className="w-full"
 />
 </div>

 <div className="flex items-center gap-3">
 <select
 value={format}
 onChange={(e) => setFormat(e.target.value as any)}
 className="px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 >
 <option value="image/jpeg">JPG / JPEG</option>
 <option value="image/webp">WebP</option>
 </select>

 {compressedImage && (
 <a
 href={compressedImage}
 download={`compressed-wrenchly.${format === 'image/webp' ? 'webp' : 'jpg'}`}
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 hover:bg-moss-600 text-white text-xs font-bold transition-colors"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download</span>
 </a>
 )}

 <button
 onClick={() => setImage(null)}
 className="px-3 py-2 text-xs text-stone-500 hover:text-stone-700"
 >
 Upload another
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}

// 2. Image Resizer
export function ImageResizerTool() {
 const [image, setImage] = useState<string | null>(null);
 const [width, setWidth] = useState(800);
 const [height, setHeight] = useState(600);
 const [lockAspect, setLockAspect] = useState(true);
 const [aspectRatio, setAspectRatio] = useState(1);
 const [resizedUrl, setResizedUrl] = useState<string | null>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => {
 const src = e.target?.result as string;
 setImage(src);
 const img = new Image();
 img.src = src;
 img.onload = () => {
 setWidth(img.width);
 setHeight(img.height);
 setAspectRatio(img.width / img.height);
 };
 };
 reader.readAsDataURL(file);
 };

 const handleWidthChange = (w: number) => {
 setWidth(w);
 if (lockAspect && aspectRatio) {
 setHeight(Math.round(w / aspectRatio));
 }
 };

 const handleHeightChange = (h: number) => {
 setHeight(h);
 if (lockAspect && aspectRatio) {
 setWidth(Math.round(h * aspectRatio));
 }
 };

 const handleResize = () => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 canvas.width = width;
 canvas.height = height;
 const ctx = canvas.getContext('2d');
 if (ctx) {
 ctx.drawImage(img, 0, 0, width, height);
 setResizedUrl(canvas.toDataURL('image/png'));
 }
 };
 };

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Width (px)</label>
 <input
 type="number"
 value={width}
 onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
 className="w-24 px-2.5 py-1.5 text-xs rounded border border-stone-300 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Height (px)</label>
 <input
 type="number"
 value={height}
 onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
 className="w-24 px-2.5 py-1.5 text-xs rounded border border-stone-300 bg-white"
 />
 </div>

 <label className="flex items-center gap-1.5 text-xs text-stone-600 cursor-pointer pt-4">
 <input
 type="checkbox"
 checked={lockAspect}
 onChange={(e) => setLockAspect(e.target.checked)}
 className="rounded"
 />
 <span>Lock Aspect Ratio</span>
 </label>

 <button
 onClick={handleResize}
 className="ml-auto mt-4 px-4 py-2 rounded-xl bg-moss-500 hover:bg-moss-600 text-white text-xs font-bold"
 >
 Resize Image
 </button>
 </div>

 <div className="text-center p-4 border border-stone-200 rounded-xl bg-stone-50">
 <img
 src={resizedUrl || image}
 alt="Preview"
 className="max-h-72 mx-auto rounded-lg object-contain shadow-sm"
 />
 </div>

 {resizedUrl && (
 <div className="flex justify-end gap-3">
 <a
 href={resizedUrl}
 download="resized-wrenchly.png"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Resized Image</span>
 </a>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// 3. Image Cropper
export function ImageCropperTool() {
 const [image, setImage] = useState<string | null>(null);
 const [ratio, setRatio] = useState<'free' | '1:1' | '16:9' | '4:3'>('1:1');
 const [croppedUrl, setCroppedUrl] = useState<string | null>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => setImage(e.target?.result as string);
 reader.readAsDataURL(file);
 };

 const handleCrop = () => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 let targetW = img.width;
 let targetH = img.height;

 if (ratio === '1:1') {
 const size = Math.min(img.width, img.height);
 targetW = size;
 targetH = size;
 } else if (ratio === '16:9') {
 targetW = img.width;
 targetH = Math.round((img.width * 9) / 16);
 } else if (ratio === '4:3') {
 targetW = img.width;
 targetH = Math.round((img.width * 3) / 4);
 }

 canvas.width = targetW;
 canvas.height = targetH;
 const ctx = canvas.getContext('2d');
 if (ctx) {
 ctx.drawImage(img, 0, 0, targetW, targetH, 0, 0, targetW, targetH);
 setCroppedUrl(canvas.toDataURL('image/png'));
 }
 };
 };

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="flex items-center gap-3">
 <span className="text-xs font-semibold text-stone-500">Preset Ratio:</span>
 {(['free', '1:1', '16:9', '4:3'] as const).map((r) => (
 <button
 key={r}
 onClick={() => setRatio(r)}
 className={`px-3 py-1.5 text-xs rounded-lg font-medium ${
 ratio === r ? 'bg-moss-500 text-white' : 'bg-stone-100 '
 }`}
 >
 {r.toUpperCase()}
 </button>
 ))}
 <button
 onClick={handleCrop}
 className="ml-auto px-4 py-2 bg-moss-500 text-white text-xs font-bold rounded-xl"
 >
 Apply Crop
 </button>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 text-center">
 <img src={croppedUrl || image} alt="Preview" className="max-h-72 mx-auto rounded-lg object-contain" />
 </div>

 {croppedUrl && (
 <div className="flex justify-end">
 <a
 href={croppedUrl}
 download="cropped-wrenchly.png"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Cropped Image</span>
 </a>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// 4. Rotate and Flip Image
export function RotateFlipTool() {
 const [image, setImage] = useState<string | null>(null);
 const [rotation, setRotation] = useState(0);
 const [flipH, setFlipH] = useState(false);
 const [flipV, setFlipV] = useState(false);
 const [resultUrl, setResultUrl] = useState<string | null>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => {
 setImage(e.target?.result as string);
 setRotation(0);
 setFlipH(false);
 setFlipV(false);
 };
 reader.readAsDataURL(file);
 };

 const applyTransforms = () => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 const is90 = rotation % 180 !== 0;
 canvas.width = is90 ? img.height : img.width;
 canvas.height = is90 ? img.width : img.height;
 const ctx = canvas.getContext('2d');
 if (ctx) {
 ctx.translate(canvas.width / 2, canvas.height / 2);
 ctx.rotate((rotation * Math.PI) / 180);
 ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
 ctx.drawImage(img, -img.width / 2, -img.height / 2);
 setResultUrl(canvas.toDataURL('image/png'));
 }
 };
 };

 useEffect(() => {
 applyTransforms();
 }, [rotation, flipH, flipV, image]);

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center gap-3">
 <button
 onClick={() => setRotation((r) => (r + 90) % 360)}
 className="px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-100"
 >
 Rotate 90° Clockwise
 </button>
 <button
 onClick={() => setFlipH((h) => !h)}
 className={`px-3 py-1.5 text-xs font-medium rounded-lg ${flipH ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 Flip Horizontal
 </button>
 <button
 onClick={() => setFlipV((v) => !v)}
 className={`px-3 py-1.5 text-xs font-medium rounded-lg ${flipV ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 Flip Vertical
 </button>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 text-center">
 <img src={resultUrl || image} alt="Transformed" className="max-h-72 mx-auto rounded-lg object-contain" />
 </div>

 {resultUrl && (
 <div className="flex justify-end">
 <a
 href={resultUrl}
 download="transformed-wrenchly.png"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Result</span>
 </a>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// 5. Image Converter
export function ImageConverterTool() {
 const [image, setImage] = useState<string | null>(null);
 const [targetFormat, setTargetFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
 const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => setImage(e.target?.result as string);
 reader.readAsDataURL(file);
 };

 const handleConvert = () => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 canvas.width = img.width;
 canvas.height = img.height;
 const ctx = canvas.getContext('2d');
 if (ctx) {
 if (targetFormat === 'image/jpeg') {
 ctx.fillStyle = '#FFFFFF';
 ctx.fillRect(0, 0, canvas.width, canvas.height);
 }
 ctx.drawImage(img, 0, 0);
 setConvertedUrl(canvas.toDataURL(targetFormat, 0.92));
 }
 };
 };

 const ext = targetFormat === 'image/png' ? 'png' : targetFormat === 'image/jpeg' ? 'jpg' : 'webp';

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="flex items-center gap-3">
 <span className="text-xs font-semibold text-stone-500">Convert to:</span>
 <select
 value={targetFormat}
 onChange={(e) => setTargetFormat(e.target.value as any)}
 className="px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-white"
 >
 <option value="image/png">PNG (Lossless with transparency)</option>
 <option value="image/jpeg">JPG / JPEG (Smallest size, white bg)</option>
 <option value="image/webp">WebP (Modern web format)</option>
 </select>
 <button
 onClick={handleConvert}
 className="px-4 py-2 bg-moss-500 text-white text-xs font-bold rounded-xl"
 >
 Convert Now
 </button>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 text-center">
 <img src={convertedUrl || image} alt="Converted" className="max-h-72 mx-auto rounded-lg object-contain" />
 </div>

 {convertedUrl && (
 <div className="flex justify-end">
 <a
 href={convertedUrl}
 download={`converted-wrenchly.${ext}`}
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download as .{ext.toUpperCase()}</span>
 </a>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// 6. Compress to Target Size (e.g. 50KB, 100KB, 200KB)
export function CompressToSizeTool() {
 const [image, setImage] = useState<string | null>(null);
 const [targetKb, setTargetKb] = useState(50);
 const [finalSizeKb, setFinalSizeKb] = useState<number | null>(null);
 const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => setImage(e.target?.result as string);
 reader.readAsDataURL(file);
 };

 const runCompressToSize = () => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 canvas.width = img.width;
 canvas.height = img.height;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;
 ctx.drawImage(img, 0, 0);

 let low = 0.05;
 let high = 0.95;
 let bestUrl = '';
 let bestSize = 0;

 for (let i = 0; i < 7; i++) {
 const mid = (low + high) / 2;
 const data = canvas.toDataURL('image/jpeg', mid);
 const sizeBytes = Math.round(((data.length - 23) * 3) / 4);
 const sizeKb = sizeBytes / 1024;

 if (sizeKb <= targetKb) {
 bestUrl = data;
 bestSize = sizeKb;
 low = mid;
 } else {
 high = mid;
 }
 }

 setCompressedUrl(bestUrl || canvas.toDataURL('image/jpeg', 0.1));
 setFinalSizeKb(bestSize || targetKb);
 };
 };

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <span className="text-xs font-semibold text-stone-500">Target Maximum Size:</span>
 {[20, 50, 100, 200].map((kb) => (
 <button
 key={kb}
 onClick={() => setTargetKb(kb)}
 className={`px-3 py-1.5 text-xs rounded-lg font-medium ${
 targetKb === kb ? 'bg-moss-500 text-white' : 'bg-stone-100 '
 }`}
 >
 {kb} KB
 </button>
 ))}
 <button
 onClick={runCompressToSize}
 className="ml-auto px-4 py-2 bg-moss-500 text-white text-xs font-bold rounded-xl"
 >
 Compress to Target
 </button>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 text-center">
 <img src={compressedUrl || image} alt="Output" className="max-h-72 mx-auto rounded-lg object-contain" />
 {finalSizeKb && (
 <p className="text-xs text-emerald-600 font-semibold mt-2">
 Achieved: {finalSizeKb.toFixed(1)} KB (Target: ≤{targetKb} KB)
 </p>
 )}
 </div>

 {compressedUrl && (
 <div className="flex justify-end">
 <a
 href={compressedUrl}
 download={`compressed-${targetKb}kb.jpg`}
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Result</span>
 </a>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// 7. Passport Photo Maker
export function PassportPhotoMakerTool() {
 const [image, setImage] = useState<string | null>(null);
 const [country, setCountry] = useState<'us' | 'uk' | 'pk'>('us');
 const [bgColor, setBgColor] = useState('#FFFFFF');
 const [sheetUrl, setSheetUrl] = useState<string | null>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => setImage(e.target?.result as string);
 reader.readAsDataURL(file);
 };

 const generateSheet = () => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 // 4x6 inch printable sheet at 300 DPI = 1200 x 1800 px
 const canvas = document.createElement('canvas');
 canvas.width = 1800;
 canvas.height = 1200;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 ctx.fillStyle = '#FFFFFF';
 ctx.fillRect(0, 0, canvas.width, canvas.height);

 // Passport photo size: 2x2 inches (600x600 px)
 const pw = 500;
 const ph = 500;
 const cols = 3;
 const rows = 2;
 const gapX = 60;
 const gapY = 60;
 const startX = (canvas.width - (cols * pw + (cols - 1) * gapX)) / 2;
 const startY = (canvas.height - (rows * ph + (rows - 1) * gapY)) / 2;

 for (let r = 0; r < rows; r++) {
 for (let c = 0; c < cols; c++) {
 const x = startX + c * (pw + gapX);
 const y = startY + r * (ph + gapY);

 // Draw photo background
 ctx.fillStyle = bgColor;
 ctx.fillRect(x, y, pw, ph);

 // Draw image
 ctx.drawImage(img, x, y, pw, ph);

 // Thin cutting border
 ctx.strokeStyle = '#CCCCCC';
 ctx.lineWidth = 1;
 ctx.strokeRect(x, y, pw, ph);
 }
 }

 setSheetUrl(canvas.toDataURL('image/jpeg', 0.95));
 };
 };

 useEffect(() => {
 if (image) generateSheet();
 }, [image, country, bgColor]);

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Standard Preset</label>
 <select
 value={country}
 onChange={(e) => setCountry(e.target.value as any)}
 className="px-3 py-1.5 text-xs rounded border border-stone-300 bg-white"
 >
 <option value="us">United States (2 x 2 inches / 51 x 51 mm)</option>
 <option value="uk">United Kingdom / Schengen (35 x 45 mm)</option>
 <option value="pk">Pakistan Passport / Nadra (35 x 45 mm)</option>
 </select>
 </div>

 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Background</label>
 <input
 type="color"
 value={bgColor}
 onChange={(e) => setBgColor(e.target.value)}
 className="w-10 h-7 rounded cursor-pointer"
 />
 </div>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 text-center">
 <span className="text-xs text-stone-400 block mb-2">Printable 4x6 Inch Sheet Preview (6 photos)</span>
 <img src={sheetUrl || image} alt="Sheet" className="max-h-80 mx-auto rounded-lg shadow-sm" />
 </div>

 {sheetUrl && (
 <div className="flex justify-end">
 <a
 href={sheetUrl}
 download="passport-photo-sheet-4x6.jpg"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download 4x6" Print Sheet</span>
 </a>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// 8. Image to Base64
export function ImageToBase64Tool() {
 const [dataUri, setDataUri] = useState<string>('');
 const [sizeKb, setSizeKb] = useState<number>(0);

 const handleSelect = (file: File) => {
 setSizeKb(file.size / 1024);
 const reader = new FileReader();
 reader.onload = (e) => setDataUri(e.target?.result as string);
 reader.readAsDataURL(file);
 };

 return (
 <div className="space-y-6">
 {!dataUri ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-4">
 <div className="flex items-center justify-between text-xs text-stone-500">
 <span>Size: {sizeKb.toFixed(1)} KB</span>
 <div className="flex gap-2">
 <CopyButton text={dataUri} />
 <button
 onClick={() => setDataUri('')}
 className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-700"
 >
 Upload another
 </button>
 </div>
 </div>
 <textarea
 readOnly
 value={dataUri}
 rows={10}
 className="w-full p-4 font-mono text-xs rounded-xl border border-stone-200 bg-stone-50"
 />
 </div>
 )}
 </div>
 );
}

// 9. Color Picker from Image
export function ColorPickerTool() {
 const [image, setImage] = useState<string | null>(null);
 const [color, setColor] = useState('#326BFF');
 const canvasRef = useRef<HTMLCanvasElement>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => {
 setImage(e.target?.result as string);
 };
 reader.readAsDataURL(file);
 };

 useEffect(() => {
 if (!image || !canvasRef.current) return;
 const canvas = canvasRef.current;
 const ctx = canvas.getContext('2d');
 const img = new Image();
 img.src = image;
 img.onload = () => {
 canvas.width = img.width;
 canvas.height = img.height;
 ctx?.drawImage(img, 0, 0);
 };
 }, [image]);

 const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
 const canvas = canvasRef.current;
 if (!canvas) return;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 const rect = canvas.getBoundingClientRect();
 const scaleX = canvas.width / rect.width;
 const scaleY = canvas.height / rect.height;

 const x = (e.clientX - rect.left) * scaleX;
 const y = (e.clientY - rect.top) * scaleY;

 const pixel = ctx.getImageData(x, y, 1, 1).data;
 const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
 setColor(hex.toUpperCase());
 };

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <div className="w-12 h-12 rounded-xl border border-stone-300 shadow-sm shrink-0" style={{ backgroundColor: color }} />
 <div>
 <span className="text-xs text-stone-500">Sampled Color</span>
 <div className="text-lg font-mono font-bold text-stone-900">{color}</div>
 </div>
 <div className="ml-auto">
 <CopyButton text={color} />
 </div>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 text-center overflow-auto max-h-96">
 <canvas
 ref={canvasRef}
 onClick={handleCanvasClick}
 className="max-h-80 mx-auto rounded-lg cursor-crosshair shadow-sm"
 />
 </div>
 </div>
 )}
 </div>
 );
}

// 10. SVG to PNG Converter
export function SvgToPngTool() {
 const [svgCode, setSvgCode] = useState(
 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n <circle cx="50" cy="50" r="40" fill="#326BFF" />\n <polygon points="50,20 60,45 85,45 65,60 72,85 50,70 28,85 35,60 15,45 40,45" fill="#FFFFFF" />\n</svg>'
 );
 const [scale, setScale] = useState(4);
 const [pngUrl, setPngUrl] = useState<string | null>(null);

 const handleConvert = () => {
 const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
 const url = URL.createObjectURL(blob);
 const img = new Image();
 img.src = url;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 canvas.width = (img.width || 100) * scale;
 canvas.height = (img.height || 100) * scale;
 const ctx = canvas.getContext('2d');
 if (ctx) {
 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
 setPngUrl(canvas.toDataURL('image/png'));
 }
 URL.revokeObjectURL(url);
 };
 };

 useEffect(() => {
 handleConvert();
 }, [svgCode, scale]);

 return (
 <div className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">SVG Code</label>
 <textarea
 value={svgCode}
 onChange={(e) => setSvgCode(e.target.value)}
 rows={10}
 className="w-full p-3 font-mono text-xs rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div>
 <div className="flex items-center justify-between mb-1">
 <label className="text-xs font-semibold text-stone-500">Rendered PNG</label>
 <div className="flex items-center gap-2">
 <span className="text-xs text-stone-500">Scale:</span>
 {[1, 2, 4, 8].map((s) => (
 <button
 key={s}
 onClick={() => setScale(s)}
 className={`px-2 py-0.5 text-xs rounded ${scale === s ? 'bg-moss-500 text-white' : 'bg-stone-100 '}`}
 >
 {s}x
 </button>
 ))}
 </div>
 </div>

 <div className="h-56 p-4 border rounded-xl bg-stone-50 flex items-center justify-center">
 {pngUrl && <img src={pngUrl} alt="PNG Render" className="max-h-48 object-contain" />}
 </div>
 </div>
 </div>

 {pngUrl && (
 <div className="flex justify-end">
 <a
 href={pngUrl}
 download="rendered-vector.png"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download PNG ({scale}x resolution)</span>
 </a>
 </div>
 )}
 </div>
 );
}

// 11. Favicon Generator
export function FaviconGeneratorTool() {
 const [image, setImage] = useState<string | null>(null);
 const [favicons, setFavicons] = useState<{ size: number; url: string }[]>([]);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => {
 const src = e.target?.result as string;
 setImage(src);
 generateSizes(src);
 };
 reader.readAsDataURL(file);
 };

 const generateSizes = (src: string) => {
 const sizes = [16, 32, 48, 180];
 const results: { size: number; url: string }[] = [];
 const img = new Image();
 img.src = src;
 img.onload = () => {
 sizes.forEach((s) => {
 const canvas = document.createElement('canvas');
 canvas.width = s;
 canvas.height = s;
 const ctx = canvas.getContext('2d');
 if (ctx) {
 ctx.drawImage(img, 0, 0, s, s);
 results.push({ size: s, url: canvas.toDataURL('image/png') });
 }
 });
 setFavicons(results);
 };
 };

 const htmlSnippet = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 {favicons.map((fav) => (
 <div
 key={fav.size}
 className="p-4 border rounded-xl bg-stone-50 text-center flex flex-col items-center justify-between"
 >
 <span className="text-xs font-bold text-stone-700 mb-3">{fav.size}x{fav.size} px</span>
 <img src={fav.url} alt={`Favicon ${fav.size}`} className="rounded mb-3 shadow-sm" style={{ width: Math.max(32, fav.size / 2) }} />
 <a
 href={fav.url}
 download={`favicon-${fav.size}x${fav.size}.png`}
 className="px-3 py-1 text-xs bg-moss-500 text-white rounded font-medium"
 >
 Download
 </a>
 </div>
 ))}
 </div>

 <div>
 <div className="flex justify-between items-center mb-1">
 <label className="text-xs font-semibold text-stone-500">HTML Embed Code</label>
 <CopyButton text={htmlSnippet} />
 </div>
 <pre className="p-3 text-xs font-mono rounded-xl border border-stone-200 bg-stone-50">
 {htmlSnippet}
 </pre>
 </div>
 </div>
 )}
 </div>
 );
}

// 12. Meme Maker
export function MemeMakerTool() {
 const [image, setImage] = useState<string | null>(null);
 const [topText, setTopText] = useState('WHEN YOU FIND');
 const [bottomText, setBottomText] = useState('THE PERFECT UTILITY TOOL');
 const [fontSize, setFontSize] = useState(36);
 const [memeUrl, setMemeUrl] = useState<string | null>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => setImage(e.target?.result as string);
 reader.readAsDataURL(file);
 };

 const renderMeme = () => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 canvas.width = img.width;
 canvas.height = img.height;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 ctx.drawImage(img, 0, 0);

 ctx.font = `900 ${fontSize * (img.width / 600)}px Impact, sans-serif`;
 ctx.textAlign = 'center';
 ctx.fillStyle = '#FFFFFF';
 ctx.strokeStyle = '#000000';
 ctx.lineWidth = 6 * (img.width / 600);

 if (topText) {
 ctx.strokeText(topText.toUpperCase(), canvas.width / 2, fontSize * 1.5 * (img.width / 600));
 ctx.fillText(topText.toUpperCase(), canvas.width / 2, fontSize * 1.5 * (img.width / 600));
 }

 if (bottomText) {
 ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20 * (img.width / 600));
 ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20 * (img.width / 600));
 }

 setMemeUrl(canvas.toDataURL('image/jpeg', 0.9));
 };
 };

 useEffect(() => {
 renderMeme();
 }, [image, topText, bottomText, fontSize]);

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Top Text</label>
 <input
 type="text"
 value={topText}
 onChange={(e) => setTopText(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Bottom Text</label>
 <input
 type="text"
 value={bottomText}
 onChange={(e) => setBottomText(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 bg-white"
 />
 </div>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 text-center">
 <img src={memeUrl || image} alt="Meme" className="max-h-80 mx-auto rounded-lg shadow-sm" />
 </div>

 {memeUrl && (
 <div className="flex justify-end">
 <a
 href={memeUrl}
 download="meme-wrenchly.jpg"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Meme</span>
 </a>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// 13. Watermark Adder
export function WatermarkAdderTool() {
 const [image, setImage] = useState<string | null>(null);
 const [watermark, setWatermark] = useState('WRENCHLYTOOLS');
 const [opacity, setOpacity] = useState(0.5);
 const [resultUrl, setResultUrl] = useState<string | null>(null);

 const handleSelect = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => setImage(e.target?.result as string);
 reader.readAsDataURL(file);
 };

 const applyWatermark = () => {
 if (!image) return;
 const img = new Image();
 img.src = image;
 img.onload = () => {
 const canvas = document.createElement('canvas');
 canvas.width = img.width;
 canvas.height = img.height;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 ctx.drawImage(img, 0, 0);

 ctx.save();
 ctx.globalAlpha = opacity;
 ctx.fillStyle = '#FFFFFF';
 ctx.font = `bold ${Math.round(canvas.width / 18)}px sans-serif`;
 ctx.textAlign = 'center';
 ctx.translate(canvas.width / 2, canvas.height / 2);
 ctx.rotate(-Math.PI / 6);
 ctx.fillText(watermark, 0, 0);
 ctx.restore();

 setResultUrl(canvas.toDataURL('image/png'));
 };
 };

 useEffect(() => {
 applyWatermark();
 }, [image, watermark, opacity]);

 return (
 <div className="space-y-6">
 {!image ? (
 <ImageDropzone onImageSelect={handleSelect} />
 ) : (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <div className="flex-1 min-w-[200px]">
 <label className="block text-xs font-semibold text-stone-500 mb-1">Watermark Text</label>
 <input
 type="text"
 value={watermark}
 onChange={(e) => setWatermark(e.target.value)}
 className="w-full px-3 py-1.5 text-xs rounded border border-stone-300 bg-white"
 />
 </div>
 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Opacity: {Math.round(opacity * 100)}%</label>
 <input
 type="range"
 min={0.1}
 max={1.0}
 step={0.1}
 value={opacity}
 onChange={(e) => setOpacity(parseFloat(e.target.value))}
 className="w-32"
 />
 </div>
 </div>

 <div className="p-4 border rounded-xl bg-stone-50 text-center">
 <img src={resultUrl || image} alt="Watermarked" className="max-h-80 mx-auto rounded-lg shadow-sm" />
 </div>

 {resultUrl && (
 <div className="flex justify-end">
 <a
 href={resultUrl}
 download="watermarked.png"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Watermarked Image</span>
 </a>
 </div>
 )}
 </div>
 )}
 </div>
 );
}

// 14. Photo Collage Maker
export function PhotoCollageTool() {
 const [images, setImages] = useState<string[]>([]);
 const [gap, setGap] = useState(10);
 const [collageUrl, setCollageUrl] = useState<string | null>(null);

 const handleAddImage = (file: File) => {
 const reader = new FileReader();
 reader.onload = (e) => {
 setImages((prev) => [...prev, e.target?.result as string].slice(0, 4));
 };
 reader.readAsDataURL(file);
 };

 const renderCollage = () => {
 if (images.length === 0) return;
 const canvas = document.createElement('canvas');
 canvas.width = 1200;
 canvas.height = 1200;
 const ctx = canvas.getContext('2d');
 if (!ctx) return;

 ctx.fillStyle = '#FFFFFF';
 ctx.fillRect(0, 0, canvas.width, canvas.height);

 const loadedImages: HTMLImageElement[] = [];
 let loadedCount = 0;

 images.forEach((src) => {
 const img = new Image();
 img.src = src;
 img.onload = () => {
 loadedCount++;
 loadedImages.push(img);
 if (loadedCount === images.length) {
 // Draw 2x2 or 1x2 grid
 const cols = images.length > 2 ? 2 : images.length;
 const rows = images.length > 2 ? 2 : 1;
 const cellW = (canvas.width - (cols + 1) * gap) / cols;
 const cellH = (canvas.height - (rows + 1) * gap) / rows;

 loadedImages.forEach((im, idx) => {
 const r = Math.floor(idx / cols);
 const c = idx % cols;
 const x = gap + c * (cellW + gap);
 const y = gap + r * (cellH + gap);
 ctx.drawImage(im, x, y, cellW, cellH);
 });

 setCollageUrl(canvas.toDataURL('image/jpeg', 0.92));
 }
 };
 });
 };

 useEffect(() => {
 renderCollage();
 }, [images, gap]);

 return (
 <div className="space-y-6">
 <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
 <label className="px-4 py-2 bg-moss-500 text-white text-xs font-bold rounded-xl cursor-pointer">
 <span>+ Add Photo ({images.length}/4)</span>
 <input
 type="file"
 accept="image/*"
 className="hidden"
 onChange={(e) => e.target.files?.[0] && handleAddImage(e.target.files[0])}
 />
 </label>

 <div className="flex items-center gap-2 text-xs">
 <span>Grid Gap: {gap}px</span>
 <input
 type="range"
 min={0}
 max={30}
 value={gap}
 onChange={(e) => setGap(parseInt(e.target.value))}
 />
 </div>

 {images.length > 0 && (
 <button
 onClick={() => {
 setImages([]);
 setCollageUrl(null);
 }}
 className="text-xs text-rose-500 hover:underline"
 >
 Clear All
 </button>
 )}
 </div>

 {collageUrl ? (
 <div className="p-4 border rounded-xl bg-stone-50 text-center">
 <img src={collageUrl} alt="Collage" className="max-h-96 mx-auto rounded-lg shadow-sm" />
 <div className="mt-4 flex justify-end">
 <a
 href={collageUrl}
 download="photo-collage.jpg"
 className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moss-500 text-white text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Collage</span>
 </a>
 </div>
 </div>
 ) : (
 <div className="p-12 text-center text-stone-400 text-xs border border-dashed rounded-xl">
 Add 2 to 4 photos to generate your custom collage grid.
 </div>
 )}
 </div>
 );
}