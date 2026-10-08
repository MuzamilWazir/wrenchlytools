export const SITE_NAME = 'WrenchlyTools';
export const SITE_DESCRIPTION =
  'The all-in-one digital utility toolbox. Everyday tools for text, images, calculators, generators, developer tasks, converters, and PDFs — done in seconds.';
export const SITE_OG_IMAGE = '/ogimage.png';

/**
 * Public contact address shown on the About and Contact pages.
 * Update this if the mailbox changes.
 */
export const SUPPORT_EMAIL = 'hello@wrenchlytools.com';

/**
 * Absolute base URL used for canonical links, Open Graph URLs and JSON-LD.
 * Set NEXT_PUBLIC_APP_URL (or APP_URL) in the deployment environment.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000';
