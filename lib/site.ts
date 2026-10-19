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
 * Defaults to the production domain so share previews are never localhost.
 * Override with NEXT_PUBLIC_APP_URL (or APP_URL) for other environments.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL ||
  'https://wrenchlytools.vercel.app';
