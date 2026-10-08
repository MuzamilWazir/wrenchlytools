export type ToolCategory =
  | 'text'
  | 'images'
  | 'calculators'
  | 'generators'
  | 'developer'
  | 'converters'
  | 'pdf'
  | 'ai'
  | 'creator';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  slug: string;
  description: string;
  icon: string;
  accentColor: string; // Tailwind color class or hex
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  category: ToolCategory;
  shortDescription: string;
  longDescription: string;
  icon: string;
  tags: string[];
  route: string;
  isPopular?: boolean;
  isNew?: boolean;
  processingType: 'client' | 'server' | 'hybrid';
  howToUse: string[];
  faqs: ToolFAQ[];
  relatedToolSlugs: string[];
  /** Full <title> override (used for priority tools where the default template is too generic). */
  seoTitle?: string;
}

export interface GuideTable {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface GuideSection {
  heading: string;
  /** Paragraphs support **bold** and [label](/internal-path) inline markup. */
  paragraphs?: string[];
  /** Bulleted list items, same inline markup as paragraphs. */
  list?: string[];
  table?: GuideTable;
}

export interface ToolHistoryItem {
  slug: string;
  timestamp: number;
}
