'use client'

import { useState, useRef } from 'react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { Upload, Download, FileText, RefreshCw, Check, Layers, AlertCircle } from 'lucide-react';

function PdfDropzone({ onFileSelect, multiple = false }: { onFileSelect: (files: FileList) => void; multiple?: boolean }) {
 const fileInputRef = useRef<HTMLInputElement>(null);

 return (
 <div
 onClick={() => fileInputRef.current?.click()}
 className="border-2 border-dashed border-stone-300 hover:border-moss-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-stone-50/50"
 >
 <input
 ref={fileInputRef}
 type="file"
 accept="application/pdf"
 multiple={multiple}
 className="hidden"
 onChange={(e) => e.target.files && onFileSelect(e.target.files)}
 />
 <div className="w-12 h-12 mx-auto rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
 <FileText className="w-6 h-6" />
 </div>
 <p className="text-sm font-semibold text-stone-800">
 {multiple ? 'Select multiple PDF files, or drag & drop here' : 'Select a PDF file, or drag & drop here'}
 </p>
 <p className="text-xs text-stone-500 mt-1">Processed 100% locally in your browser via pdf-lib</p>
 </div>
 );
}

// 1. PDF Merger
export function PdfMergerTool() {
 const [files, setFiles] = useState<File[]>([]);
 const [isProcessing, setIsProcessing] = useState(false);
 const [mergedUrl, setMergedUrl] = useState<string | null>(null);

 const handleFiles = (fileList: FileList) => {
 setFiles(Array.from(fileList));
 setMergedUrl(null);
 };

 const mergePdfs = async () => {
 if (files.length < 2) return;
 setIsProcessing(true);
 try {
 const mergedPdf = await PDFDocument.create();
 for (const file of files) {
 const buffer = await file.arrayBuffer();
 const pdf = await PDFDocument.load(buffer);
 const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
 copiedPages.forEach((page) => mergedPdf.addPage(page));
 }
 const pdfBytes = await mergedPdf.save();
 const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
 setMergedUrl(URL.createObjectURL(blob));
 } catch (err) {
 console.error('PDF Merge Error:', err);
 alert('Could not merge these PDFs. Please ensure they are valid and not password-protected.');
 } finally {
 setIsProcessing(false);
 }
 };

 return (
 <div className="space-y-6">
 <PdfDropzone onFileSelect={handleFiles} multiple />

 {files.length > 0 && (
 <div className="space-y-4">
 <div className="space-y-2">
 <span className="text-xs font-semibold text-stone-500">Selected Documents ({files.length}):</span>
 {files.map((f, i) => (
 <div
 key={i}
 className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs"
 >
 <span className="font-medium text-stone-800 truncate">{f.name}</span>
 <span className="text-stone-400">{(f.size / 1024).toFixed(1)} KB</span>
 </div>
 ))}
 </div>

 <div className="flex justify-between items-center">
 <button
 onClick={mergePdfs}
 disabled={files.length < 2 || isProcessing}
 className="px-5 py-2.5 bg-moss-500 hover:bg-moss-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors"
 >
 {isProcessing ? 'Merging in browser...' : `Merge ${files.length} PDFs`}
 </button>

 {mergedUrl && (
 <a
 href={mergedUrl}
 download="merged-documents.pdf"
 className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Merged PDF</span>
 </a>
 )}
 </div>
 </div>
 )}
 </div>
 );
}

// 2. PDF Splitter
export function PdfSplitterTool() {
 const [file, setFile] = useState<File | null>(null);
 const [pageRange, setPageRange] = useState('1');
 const [splitUrl, setSplitUrl] = useState<string | null>(null);
 const [isProcessing, setIsProcessing] = useState(false);

 const handleSelect = (list: FileList) => {
 if (list[0]) {
 setFile(list[0]);
 setSplitUrl(null);
 }
 };

 const splitPdf = async () => {
 if (!file) return;
 setIsProcessing(true);
 try {
 const buffer = await file.arrayBuffer();
 const srcPdf = await PDFDocument.load(buffer);
 const newPdf = await PDFDocument.create();

 // Parse range e.g."1, 2, 4" or"1-3"
 const totalPages = srcPdf.getPageCount();
 const pageIndices: number[] = [];

 pageRange.split(',').forEach((part) => {
 const trimmed = part.trim();
 if (trimmed.includes('-')) {
 const [start, end] = trimmed.split('-').map(Number);
 for (let i = start; i <= end; i++) {
 if (i >= 1 && i <= totalPages) pageIndices.push(i - 1);
 }
 } else {
 const p = Number(trimmed);
 if (p >= 1 && p <= totalPages) pageIndices.push(p - 1);
 }
 });

 const uniqueIndices = Array.from(new Set(pageIndices));
 if (uniqueIndices.length === 0) {
 alert('Please specify valid page numbers within the document range.');
 setIsProcessing(false);
 return;
 }

 const pages = await newPdf.copyPages(srcPdf, uniqueIndices);
 pages.forEach((p) => newPdf.addPage(p));

 const bytes = await newPdf.save();
 const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
 setSplitUrl(URL.createObjectURL(blob));
 } catch (err) {
 console.error(err);
 alert('Failed to split PDF. Please check the document.');
 } finally {
 setIsProcessing(false);
 }
 };

 return (
 <div className="space-y-6">
 {!file ? (
 <PdfDropzone onFileSelect={handleSelect} />
 ) : (
 <div className="space-y-4">
 <div className="p-3 border rounded-xl bg-stone-50 text-xs flex justify-between">
 <span className="font-semibold text-stone-800">{file.name}</span>
 <button onClick={() => setFile(null)} className="text-rose-500 hover:underline">Change File</button>
 </div>

 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Page Range to Extract (e.g. 1-2, 4)</label>
 <input
 type="text"
 value={pageRange}
 onChange={(e) => setPageRange(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="flex justify-between items-center">
 <button
 onClick={splitPdf}
 disabled={isProcessing}
 className="px-5 py-2.5 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 {isProcessing ? 'Extracting...' : 'Extract Pages'}
 </button>

 {splitUrl && (
 <a
 href={splitUrl}
 download="split-extracted.pdf"
 className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Extracted PDF</span>
 </a>
 )}
 </div>
 </div>
 )}
 </div>
 );
}

// 3. PDF Rotator
export function PdfRotatorTool() {
 const [file, setFile] = useState<File | null>(null);
 const [angle, setAngle] = useState(90);
 const [rotatedUrl, setRotatedUrl] = useState<string | null>(null);

 const rotatePdf = async () => {
 if (!file) return;
 try {
 const buffer = await file.arrayBuffer();
 const pdf = await PDFDocument.load(buffer);
 const pages = pdf.getPages();

 pages.forEach((page) => {
 const current = page.getRotation().angle;
 page.setRotation(degrees((current + angle) % 360));
 });

 const bytes = await pdf.save();
 const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
 setRotatedUrl(URL.createObjectURL(blob));
 } catch (e) {
 alert('Could not rotate PDF.');
 }
 };

 return (
 <div className="space-y-6">
 {!file ? (
 <PdfDropzone onFileSelect={(list) => setFile(list[0] || null)} />
 ) : (
 <div className="space-y-4">
 <div className="p-3 border rounded-xl bg-stone-50 text-xs flex justify-between">
 <span>{file.name}</span>
 <button onClick={() => setFile(null)} className="text-rose-500">Change File</button>
 </div>

 <div className="flex gap-2">
 {[90, 180, 270].map((deg) => (
 <button
 key={deg}
 onClick={() => setAngle(deg)}
 className={`px-3 py-1.5 text-xs rounded-lg font-semibold ${
 angle === deg ? 'bg-moss-500 text-white' : 'bg-stone-100 '
 }`}
 >
 Rotate {deg}°
 </button>
 ))}
 </div>

 <div className="flex justify-between items-center">
 <button
 onClick={rotatePdf}
 className="px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Apply Rotation
 </button>

 {rotatedUrl && (
 <a
 href={rotatedUrl}
 download="rotated.pdf"
 className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Rotated PDF</span>
 </a>
 )}
 </div>
 </div>
 )}
 </div>
 );
}

// 4. Add PDF Page Numbers
export function PdfPageNumbersTool() {
 const [file, setFile] = useState<File | null>(null);
 const [numberedUrl, setNumberedUrl] = useState<string | null>(null);

 const addPageNumbers = async () => {
 if (!file) return;
 try {
 const buffer = await file.arrayBuffer();
 const pdf = await PDFDocument.load(buffer);
 const pages = pdf.getPages();
 const total = pages.length;

 pages.forEach((page, i) => {
 const { width } = page.getSize();
 page.drawText(`Page ${i + 1} of ${total}`, {
 x: width / 2 - 30,
 y: 20,
 size: 10,
 color: rgb(0.3, 0.3, 0.3),
 });
 });

 const bytes = await pdf.save();
 const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
 setNumberedUrl(URL.createObjectURL(blob));
 } catch {
 alert('Error stamping page numbers.');
 }
 };

 return (
 <div className="space-y-6">
 {!file ? (
 <PdfDropzone onFileSelect={(list) => setFile(list[0] || null)} />
 ) : (
 <div className="space-y-4">
 <div className="p-3 border rounded-xl bg-stone-50 text-xs flex justify-between">
 <span>{file.name}</span>
 <button onClick={() => setFile(null)} className="text-rose-500">Change</button>
 </div>

 <div className="flex justify-between items-center">
 <button
 onClick={addPageNumbers}
 className="px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Stamp"Page X of Y"
 </button>

 {numberedUrl && (
 <a
 href={numberedUrl}
 download="numbered.pdf"
 className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Numbered PDF</span>
 </a>
 )}
 </div>
 </div>
 )}
 </div>
 );
}

// 5. PDF Watermark
export function PdfWatermarkTool() {
 const [file, setFile] = useState<File | null>(null);
 const [watermark, setWatermark] = useState('CONFIDENTIAL');
 const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);

 const stampWatermark = async () => {
 if (!file) return;
 try {
 const buffer = await file.arrayBuffer();
 const pdf = await PDFDocument.load(buffer);
 const pages = pdf.getPages();

 pages.forEach((page) => {
 const { width, height } = page.getSize();
 page.drawText(watermark, {
 x: width / 4,
 y: height / 2,
 size: 48,
 color: rgb(0.8, 0.2, 0.2),
 opacity: 0.35,
 rotate: degrees(45),
 });
 });

 const bytes = await pdf.save();
 const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
 setWatermarkedUrl(URL.createObjectURL(blob));
 } catch {
 alert('Error stamping watermark.');
 }
 };

 return (
 <div className="space-y-6">
 {!file ? (
 <PdfDropzone onFileSelect={(list) => setFile(list[0] || null)} />
 ) : (
 <div className="space-y-4">
 <div className="p-3 border rounded-xl bg-stone-50 text-xs flex justify-between">
 <span>{file.name}</span>
 <button onClick={() => setFile(null)} className="text-rose-500">Change</button>
 </div>

 <div>
 <label className="block text-xs font-semibold text-stone-500 mb-1">Watermark Stamp</label>
 <input
 type="text"
 value={watermark}
 onChange={(e) => setWatermark(e.target.value)}
 className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 bg-white"
 />
 </div>

 <div className="flex justify-between items-center">
 <button
 onClick={stampWatermark}
 className="px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Stamp Watermark
 </button>

 {watermarkedUrl && (
 <a
 href={watermarkedUrl}
 download="watermarked.pdf"
 className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download Watermarked PDF</span>
 </a>
 )}
 </div>
 </div>
 )}
 </div>
 );
}

// 6. Images to PDF Converter
export function ImagesToPdfTool() {
 const [images, setImages] = useState<File[]>([]);
 const [pdfUrl, setPdfUrl] = useState<string | null>(null);

 const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files) {
 setImages(Array.from(e.target.files));
 setPdfUrl(null);
 }
 };

 const convertImages = async () => {
 if (images.length === 0) return;
 try {
 const pdf = await PDFDocument.create();

 for (const file of images) {
 const buffer = await file.arrayBuffer();
 let embeddedImage;
 if (file.type === 'image/png') {
 embeddedImage = await pdf.embedPng(buffer);
 } else {
 embeddedImage = await pdf.embedJpg(buffer);
 }

 // Standard A4: 595 x 842 points
 const page = pdf.addPage([595, 842]);
 const { width, height } = embeddedImage.scaleToFit(550, 800);
 page.drawImage(embeddedImage, {
 x: (595 - width) / 2,
 y: (842 - height) / 2,
 width,
 height,
 });
 }

 const bytes = await pdf.save();
 const blob = new Blob([bytes as unknown as BlobPart], { type: 'application/pdf' });
 setPdfUrl(URL.createObjectURL(blob));
 } catch (err) {
 console.error(err);
 alert('Could not convert images to PDF. Please ensure they are standard JPG or PNG images.');
 }
 };

 return (
 <div className="space-y-6">
 <div className="p-6 border-2 border-dashed rounded-2xl text-center">
 <input
 type="file"
 accept="image/png, image/jpeg"
 multiple
 onChange={handleSelect}
 className="text-xs"
 />
 <p className="text-xs text-stone-500 mt-2">Select one or more PNG or JPG images to compile into a PDF.</p>
 </div>

 {images.length > 0 && (
 <div className="space-y-4">
 <span className="text-xs font-semibold text-stone-500">{images.length} images selected</span>
 <div className="flex justify-between items-center">
 <button
 onClick={convertImages}
 className="px-4 py-2 bg-moss-500 text-white rounded-xl text-xs font-bold"
 >
 Compile to PDF
 </button>

 {pdfUrl && (
 <a
 href={pdfUrl}
 download="compiled-images.pdf"
 className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
 >
 <Download className="w-3.5 h-3.5" />
 <span>Download PDF</span>
 </a>
 )}
 </div>
 </div>
 )}
 </div>
 );
}

// 7. Extract PDF Pages
export function ExtractPdfPagesTool() {
 return <PdfSplitterTool />;
}