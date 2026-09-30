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
}

export interface ToolHistoryItem {
  slug: string;
  timestamp: number;
}
