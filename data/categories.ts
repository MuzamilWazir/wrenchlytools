import { CategoryInfo, ToolCategory } from '@/types/tools';

export const CATEGORIES: Record<ToolCategory, CategoryInfo> = {
  text: {
    id: 'text',
    name: 'Text Tools',
    slug: 'text',
    description: 'Format, inspect, count, clean, and manipulate text strings in seconds.',
    icon: 'Type',
    accentColor: 'text-blue-500',
  },
  images: {
    id: 'images',
    name: 'Image Tools',
    slug: 'images',
    description: 'Compress, resize, crop, convert, and edit images right in your browser.',
    icon: 'Image',
    accentColor: 'text-emerald-500',
  },
  calculators: {
    id: 'calculators',
    name: 'Calculators',
    slug: 'calculators',
    description: 'Accurate financial, date, health, math, and tax calculation utilities.',
    icon: 'Calculator',
    accentColor: 'text-amber-500',
  },
  generators: {
    id: 'generators',
    name: 'Generators',
    slug: 'generators',
    description: 'Generate secure passwords, QR codes, invoices, UUIDs, and resumes.',
    icon: 'Sparkles',
    accentColor: 'text-indigo-500',
  },
  developer: {
    id: 'developer',
    name: 'Developer Tools',
    slug: 'developer',
    description: 'JSON formatters, regex tester, encoders, hashes, JWT inspector, and minifiers.',
    icon: 'Code2',
    accentColor: 'text-cyan-500',
  },
  converters: {
    id: 'converters',
    name: 'Converters',
    slug: 'converters',
    description: 'High-precision unit conversion for length, weight, currency, data, and more.',
    icon: 'ArrowLeftRight',
    accentColor: 'text-orange-500',
  },
  pdf: {
    id: 'pdf',
    name: 'PDF Tools',
    slug: 'pdf',
    description: 'Merge, split, rotate, watermark, and reorder PDF documents locally.',
    icon: 'FileText',
    accentColor: 'text-rose-500',
  },
  ai: {
    id: 'ai',
    name: 'AI Tools',
    slug: 'ai',
    description: 'Paraphrase, summarize, write emails, check grammar, and craft prompts.',
    icon: 'Bot',
    accentColor: 'text-purple-500',
  },
  creator: {
    id: 'creator',
    name: 'YouTube & Creator Tools',
    slug: 'creator',
    description: 'Thumbnails, channel names, tag extractors, and estimated earnings.',
    icon: 'Video',
    accentColor: 'text-red-500',
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);
