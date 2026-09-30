import { ToolDefinition } from '@/types/tools';

export const TOOLS_REGISTRY: ToolDefinition[] = [
  // --- TEXT TOOLS ---
  {
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'text',
    shortDescription: 'Count words, characters, sentences, paragraphs, and estimate reading time in real-time.',
    longDescription: 'Comprehensive live text statistics tool that counts words, characters with/without spaces, sentences, paragraphs, lines, and reading/speaking duration.',
    icon: 'FileText',
    tags: ['words', 'characters', 'count', 'reading time', 'sentences', 'editor'],
    route: '/tools/text/word-counter',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Type or paste your content directly into the editor.',
      'All metrics update immediately as you write.',
      'Copy statistics or your text with a single click.',
    ],
    faqs: [
      { question: 'Is my text sent to a server?', answer: 'No. All counting and analytics happen entirely in your web browser.' },
      { question: 'How is reading time estimated?', answer: 'Reading time is calculated using an average reading speed of 200 words per minute.' }
    ],
    relatedToolSlugs: ['character-counter', 'case-converter', 'readability-score', 'lorem-ipsum'],
  },
  {
    slug: 'character-counter',
    name: 'Character Counter',
    category: 'text',
    shortDescription: 'Count characters with/without spaces with customizable limits and progress indicators.',
    longDescription: 'Precise character count monitor tailored for tweets, SMS, SEO meta descriptions, and input fields with strict length caps.',
    icon: 'Hash',
    tags: ['character', 'limit', 'counter', 'sms', 'twitter', 'length'],
    route: '/tools/text/character-counter',
    processingType: 'client',
    howToUse: [
      'Enter your text in the input box.',
      'Set an optional maximum limit to see remaining allowance.',
      'Monitor the visual progress bar as you approach the cap.'
    ],
    faqs: [
      { question: 'Does this count emojis correctly?', answer: 'Yes, modern Unicode surrogate pairs and emojis are properly calculated.' }
    ],
    relatedToolSlugs: ['word-counter', 'case-converter', 'text-to-slug'],
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    category: 'text',
    shortDescription: 'Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, and camelCase.',
    longDescription: 'Fast string transformer supporting uppercase, lowercase, sentence case, title case, capitalized case, alternating case, and inverse case.',
    icon: 'Type',
    tags: ['case', 'uppercase', 'lowercase', 'titlecase', 'sentencecase'],
    route: '/tools/text/case-converter',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Type or paste your text in the input area.',
      'Click on any transformation button to switch cases instantly.',
      'Copy the converted text directly to clipboard.'
    ],
    faqs: [
      { question: 'Does Title Case follow standard guidelines?', answer: 'Yes, it capitalizes major words while keeping minor prepositions and conjunctions lowercase.' }
    ],
    relatedToolSlugs: ['word-counter', 'text-to-slug', 'reverse-text'],
  },
  {
    slug: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    category: 'text',
    shortDescription: 'Clean lists by stripping repeated rows, trimming whitespace, and sorting results.',
    longDescription: 'De-duplicate text lists, email lists, or database logs with options for case-sensitivity, whitespace trimming, and empty line removal.',
    icon: 'ListFilter',
    tags: ['duplicates', 'cleaner', 'dedupe', 'lines', 'lists'],
    route: '/tools/text/remove-duplicate-lines',
    processingType: 'client',
    howToUse: [
      'Paste your multiline text or list.',
      'Select case-sensitive or whitespace trim options.',
      'Copy or download the de-duplicated list.'
    ],
    faqs: [
      { question: 'Does this preserve the original order?', answer: 'Yes, the first occurrence of each unique line is preserved in sequence.' }
    ],
    relatedToolSlugs: ['sort-lines', 'find-replace'],
  },
  {
    slug: 'sort-lines',
    name: 'Sort Lines',
    category: 'text',
    shortDescription: 'Sort lines alphabetically, numerically, reverse order, or shuffle randomly.',
    longDescription: 'Versatile line sorting tool with options for A-Z, Z-A, numerical sorting, random shuffle, and duplicate filtering.',
    icon: 'ArrowUpDown',
    tags: ['sort', 'alphabetical', 'shuffle', 'order', 'numeric'],
    route: '/tools/text/sort-lines',
    processingType: 'client',
    howToUse: [
      'Enter list items one per line.',
      'Choose your preferred sort criteria.',
      'View sorted output and copy result.'
    ],
    faqs: [
      { question: 'Can it sort numbers properly?', answer: 'Yes, numeric mode sorts by true mathematical value rather than alphabetical order.' }
    ],
    relatedToolSlugs: ['remove-duplicate-lines', 'case-converter'],
  },
  {
    slug: 'find-replace',
    name: 'Find and Replace',
    category: 'text',
    shortDescription: 'Search and replace text with case sensitivity, whole word, and regular expressions.',
    longDescription: 'Powerful text replacement engine with real-time match highlighting, regex validation, and one-click replace all.',
    icon: 'Search',
    tags: ['find', 'replace', 'regex', 'substitute', 'search'],
    route: '/tools/text/find-replace',
    processingType: 'client',
    howToUse: [
      'Paste your source text.',
      'Enter search term or regex pattern and replacement string.',
      'Click Replace All to transform the document.'
    ],
    faqs: [
      { question: 'Are regular expressions supported?', answer: 'Yes, standard JavaScript regex patterns with flags are fully supported.' }
    ],
    relatedToolSlugs: ['text-diff', 'case-converter'],
  },
  {
    slug: 'text-diff',
    name: 'Text Diff Checker',
    category: 'text',
    shortDescription: 'Compare two text snippets side-by-side to highlight additions, deletions, and edits.',
    longDescription: 'Visual text comparison utility showing exact line and word-level modifications between original and revised text.',
    icon: 'GitCompare',
    tags: ['diff', 'compare', 'difference', 'revisions', 'side-by-side'],
    route: '/tools/text/text-diff',
    processingType: 'client',
    howToUse: [
      'Paste original text on the left and modified text on the right.',
      'Click Compare to see color-coded changes.',
      'Green indicates additions; red marks deletions.'
    ],
    faqs: [
      { question: 'Can I compare code files?', answer: 'Yes, code, JSON, configuration files, and prose work seamlessly.' }
    ],
    relatedToolSlugs: ['diff-checker', 'find-replace'],
  },
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    category: 'text',
    shortDescription: 'Generate placeholder dummy text by paragraphs, sentences, or word counts.',
    longDescription: 'Customizable dummy text generator for designers and developers with options for starting with classic Latin or modern filler.',
    icon: 'AlignLeft',
    tags: ['lorem', 'ipsum', 'placeholder', 'dummy text', 'generator'],
    route: '/tools/text/lorem-ipsum',
    processingType: 'client',
    howToUse: [
      'Select count unit (paragraphs, sentences, or words).',
      'Adjust count slider and choose starting options.',
      'Copy generated text or download as TXT.'
    ],
    faqs: [
      { question: 'Where does Lorem Ipsum originate?', answer: 'It is derived from sections of Cicero\'s "De finibus bonorum et malorum" written in 45 BC.' }
    ],
    relatedToolSlugs: ['word-counter', 'text-repeater'],
  },
  {
    slug: 'text-to-slug',
    name: 'Text to Slug',
    category: 'text',
    shortDescription: 'Convert any title or sentence into a clean, URL-friendly web slug.',
    longDescription: 'Generate SEO-friendly URL slugs by removing accents, special characters, and replacing spaces with dashes or underscores.',
    icon: 'Link',
    tags: ['slug', 'url', 'seo', 'permalink', 'kebab-case'],
    route: '/tools/text/text-to-slug',
    processingType: 'client',
    howToUse: [
      'Enter an article title, headline, or phrase.',
      'Select your delimiter (hyphen, underscore, dot).',
      'Copy the sanitized slug for URLs.'
    ],
    faqs: [
      { question: 'Does it remove accents?', answer: 'Yes, accented characters (like é, ü, ñ) are converted to their basic ASCII equivalents.' }
    ],
    relatedToolSlugs: ['case-converter', 'word-counter'],
  },
  {
    slug: 'reverse-text',
    name: 'Reverse Text',
    category: 'text',
    shortDescription: 'Reverse characters, words, or multiline sequences instantly.',
    longDescription: 'Simple utility to flip strings backward by characters, word by word, or line by line.',
    icon: 'RotateCcw',
    tags: ['reverse', 'flip', 'backward', 'mirror'],
    route: '/tools/text/reverse-text',
    processingType: 'client',
    howToUse: [
      'Enter text into the editor.',
      'Choose reverse mode: Characters, Words, Lines, or Word-by-Word.',
      'Copy the mirrored output.'
    ],
    faqs: [
      { question: 'Can it handle emojis?', answer: 'Yes, Unicode grapheme clusters are correctly preserved.' }
    ],
    relatedToolSlugs: ['case-converter', 'text-repeater'],
  },
  {
    slug: 'text-repeater',
    name: 'Text Repeater',
    category: 'text',
    shortDescription: 'Repeat any text or character string multiple times with custom separators.',
    longDescription: 'Multiply any word or phrase with configurable repetition count and custom delimiters (spaces, commas, newlines).',
    icon: 'Repeat',
    tags: ['repeat', 'multiply', 'loop', 'duplicate'],
    route: '/tools/text/text-repeater',
    processingType: 'client',
    howToUse: [
      'Enter the text to repeat.',
      'Choose how many times to repeat it.',
      'Select separator and copy the generated output.'
    ],
    faqs: [
      { question: 'Is there a limit on repetitions?', answer: 'Yes, to prevent browser crashes, repeating is safely capped at 50,000 iterations.' }
    ],
    relatedToolSlugs: ['lorem-ipsum', 'reverse-text'],
  },
  {
    slug: 'fancy-text-generator',
    name: 'Fancy Text Generator',
    category: 'text',
    shortDescription: 'Convert plain text into decorative Unicode font styles for bios, headers, and posts.',
    longDescription: 'Transform standard alphabet characters into Gothic, Cursive, Monospace, Double-Struck, and Bubble text styles.',
    icon: 'Sparkle',
    tags: ['fancy', 'unicode', 'fonts', 'instagram', 'bio', 'stylish'],
    route: '/tools/text/fancy-text-generator',
    processingType: 'client',
    howToUse: [
      'Type your nickname, bio, or status message.',
      'Browse through generated typographic styles.',
      'Click copy on your favorite aesthetic variation.'
    ],
    faqs: [
      { question: 'Are these actual fonts?', answer: 'They are Unicode character symbols that render natively across social media without font installations.' }
    ],
    relatedToolSlugs: ['case-converter', 'text-to-slug'],
  },
  {
    slug: 'text-to-speech',
    name: 'Text to Speech',
    category: 'text',
    shortDescription: 'Convert text to natural spoken audio using browser speech synthesis voices.',
    longDescription: 'Listen to articles, proofread text, or practice pronunciation with pitch, rate, and voice controls using Web Speech API.',
    icon: 'Volume2',
    tags: ['tts', 'speech', 'voice', 'audio', 'reader'],
    route: '/tools/text/text-to-speech',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Type or paste the passage you want to hear.',
      'Select an available system voice, adjust speed and pitch.',
      'Press Play to listen.'
    ],
    faqs: [
      { question: 'Why do voices vary between browsers?', answer: 'Voices are provided by your operating system and browser synthesis engine.' }
    ],
    relatedToolSlugs: ['word-counter', 'readability-score'],
  },
  {
    slug: 'markdown-to-html',
    name: 'Markdown to HTML',
    category: 'text',
    shortDescription: 'Convert Markdown formatted text into clean, sanitized HTML code with live preview.',
    longDescription: 'Live dual-pane editor converting Markdown headings, lists, tables, code blocks, and blockquotes into clean HTML markup.',
    icon: 'FileCode',
    tags: ['markdown', 'html', 'converter', 'preview', 'editor'],
    route: '/tools/text/markdown-to-html',
    processingType: 'client',
    howToUse: [
      'Write or paste Markdown in the left pane.',
      'Inspect rendered layout and generated HTML code.',
      'Copy HTML markup or download as an HTML file.'
    ],
    faqs: [
      { question: 'Is the HTML sanitized?', answer: 'Yes, scripts and insecure attributes are stripped to prevent XSS.' }
    ],
    relatedToolSlugs: ['html-to-text', 'word-counter'],
  },
  {
    slug: 'html-to-text',
    name: 'HTML to Text',
    category: 'text',
    shortDescription: 'Strip HTML tags and convert raw web code into clean, readable plain text.',
    longDescription: 'Extract readable body copy from HTML documents by removing script, style, and markup tags cleanly.',
    icon: 'Code',
    tags: ['html', 'plain text', 'strip tags', 'cleaner'],
    route: '/tools/text/html-to-text',
    processingType: 'client',
    howToUse: [
      'Paste your raw HTML document or snippet.',
      'Choose options like preserving line breaks.',
      'Extract and copy the purified text.'
    ],
    faqs: [
      { question: 'Does it strip style and script tags?', answer: 'Yes, inline scripts and style sheets are completely excised.' }
    ],
    relatedToolSlugs: ['markdown-to-html', 'word-counter'],
  },
  {
    slug: 'readability-score',
    name: 'Readability Score',
    category: 'text',
    shortDescription: 'Calculate Flesch Reading Ease and Grade Level scores for any article or draft.',
    longDescription: 'Analyze sentence complexity, syllable frequency, and Flesch-Kincaid grade levels to ensure clear communication.',
    icon: 'GraduationCap',
    tags: ['readability', 'flesch', 'grade level', 'writing', 'analysis'],
    route: '/tools/text/readability-score',
    processingType: 'client',
    howToUse: [
      'Paste your draft or essay.',
      'View Reading Ease score, grade level rating, and syllable count.',
      'Use the suggestions to simplify complex sentences.'
    ],
    faqs: [
      { question: 'What is a good Flesch score?', answer: 'Scores between 60 and 70 correspond to standard conversational English (understood by 8th-9th graders).' }
    ],
    relatedToolSlugs: ['word-counter', 'character-counter'],
  },

  // --- IMAGE TOOLS ---
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    category: 'images',
    shortDescription: 'Compress JPG, PNG, and WebP images directly in your browser with quality controls.',
    longDescription: 'Reduce image file size by up to 80% without noticeable quality loss. Fast, local canvas compression with instant before/after preview.',
    icon: 'Shrink',
    tags: ['compress', 'optimize', 'shrink', 'jpg', 'png', 'webp'],
    route: '/tools/images/image-compressor',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Drag and drop an image or click to select.',
      'Adjust the quality slider to find your preferred balance.',
      'Check size reduction and download the optimized image.'
    ],
    faqs: [
      { question: 'Are my images uploaded to any server?', answer: 'No. Everything is compressed locally using your browser Canvas API.' }
    ],
    relatedToolSlugs: ['image-resizer', 'compress-to-size', 'image-converter'],
  },
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    category: 'images',
    shortDescription: 'Resize image dimensions by pixels or percentage while locking aspect ratio.',
    longDescription: 'Easily scale images for social media, websites, or email. Includes aspect ratio lock and standard dimension presets.',
    icon: 'Maximize2',
    tags: ['resize', 'scale', 'dimensions', 'crop', 'width', 'height'],
    route: '/tools/images/image-resizer',
    processingType: 'client',
    howToUse: [
      'Upload your image.',
      'Set target width and height, or scale by percentage.',
      'Download your resized image in desired format.'
    ],
    faqs: [
      { question: 'Will resizing blur my image?', answer: 'Downscaling preserves sharpness; upscaling beyond native resolution may introduce softness.' }
    ],
    relatedToolSlugs: ['image-compressor', 'image-cropper'],
  },
  {
    slug: 'image-cropper',
    name: 'Image Cropper',
    category: 'images',
    shortDescription: 'Crop photos to custom dimensions or standard aspect ratios like 1:1, 4:3, and 16:9.',
    longDescription: 'Interactive image cropping tool with draggable crop frame, standard aspect ratio presets, zoom, and rotation controls.',
    icon: 'Crop',
    tags: ['crop', 'cut', 'aspect ratio', 'square', '16:9'],
    route: '/tools/images/image-cropper',
    processingType: 'client',
    howToUse: [
      'Upload the picture you wish to crop.',
      'Select a preset ratio (Square, 16:9, etc.) or freeform.',
      'Adjust the frame and download the cropped result.'
    ],
    faqs: [
      { question: 'Can I keep a transparent background?', answer: 'Yes, PNG outputs preserve transparency in cropped areas.' }
    ],
    relatedToolSlugs: ['rotate-flip', 'image-resizer'],
  },
  {
    slug: 'rotate-flip',
    name: 'Rotate & Flip Image',
    category: 'images',
    shortDescription: 'Rotate images 90, 180, 270 degrees or flip horizontally and vertically.',
    longDescription: 'Quickly correct orientation or mirror photos with one-click rotation and flip controls.',
    icon: 'RotateCw',
    tags: ['rotate', 'flip', 'mirror', 'orientation', 'turn'],
    route: '/tools/images/rotate-flip',
    processingType: 'client',
    howToUse: [
      'Upload your photo.',
      'Use the Rotate or Flip buttons to adjust orientation.',
      'Download the corrected image.'
    ],
    faqs: [
      { question: 'Does rotation affect image resolution?', answer: 'No, full native pixel dimensions are preserved.' }
    ],
    relatedToolSlugs: ['image-cropper', 'image-converter'],
  },
  {
    slug: 'image-converter',
    name: 'Image Converter',
    category: 'images',
    shortDescription: 'Convert between JPG, PNG, and WebP formats instantly with quality control.',
    longDescription: 'Cross-format image conversion tool running client-side with transparency awareness and compression tuning.',
    icon: 'RefreshCw',
    tags: ['convert', 'jpg to png', 'png to jpg', 'webp', 'format'],
    route: '/tools/images/image-converter',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Select an image file in any common format.',
      'Choose your target output format (PNG, JPEG, WebP).',
      'Download your converted image.'
    ],
    faqs: [
      { question: 'What happens to transparency when converting PNG to JPG?', answer: 'Since JPEG does not support transparency, transparent pixels become solid white.' }
    ],
    relatedToolSlugs: ['image-compressor', 'svg-to-png'],
  },
  {
    slug: 'compress-to-size',
    name: 'Compress Image to Target Size',
    category: 'images',
    shortDescription: 'Automatically compress images to under 20KB, 50KB, 100KB, or 200KB for portal uploads.',
    longDescription: 'Iterative compression algorithm that hits strict file size limits required by government forms, job applications, and exam portals.',
    icon: 'Gauge',
    tags: ['target size', 'kb', 'portal', 'exam', 'admission', 'compress'],
    route: '/tools/images/compress-to-size',
    processingType: 'client',
    howToUse: [
      'Upload the photo or document image.',
      'Select your target maximum size (e.g. 50KB or custom value).',
      'The engine calibrates quality iteratively to hit the target.'
    ],
    faqs: [
      { question: 'Can an image always reach 20KB?', answer: 'Very large images may need slight dimension reduction to reach tiny file sizes cleanly.' }
    ],
    relatedToolSlugs: ['image-compressor', 'passport-photo-maker'],
  },
  {
    slug: 'passport-photo-maker',
    name: 'Passport Photo Maker',
    category: 'images',
    shortDescription: 'Format passport and visa photos with standard country sizes and printable grid sheets.',
    longDescription: 'Create compliant 2x2 inch (US), 35x45mm (UK/Schengen/Pakistan), or custom passport photos with background color adjustment and multiple copies on a printable sheet.',
    icon: 'UserCheck',
    tags: ['passport', 'visa', 'id photo', '2x2', 'print sheet'],
    route: '/tools/images/passport-photo-maker',
    processingType: 'client',
    howToUse: [
      'Upload a clear portrait photo.',
      'Pick country standard dimensions and adjust the crop guide.',
      'Download individual photo or a ready-to-print 4x6 / A4 sheet.'
    ],
    faqs: [
      { question: 'Can I print this at a local photo lab?', answer: 'Yes, download the 4x6 inch sheet layout for printing on standard photo paper.' }
    ],
    relatedToolSlugs: ['image-cropper', 'compress-to-size'],
  },
  {
    slug: 'image-to-base64',
    name: 'Image to Base64',
    category: 'images',
    shortDescription: 'Convert any image to Base64 data URI string for embedding in HTML, CSS, or JSON.',
    longDescription: 'Encode images into Base64 format with one-click copy of Data URI, CSS background-image snippet, or raw Base64 string.',
    icon: 'Binary',
    tags: ['base64', 'data uri', 'embed', 'css', 'encode'],
    route: '/tools/images/image-to-base64',
    processingType: 'client',
    howToUse: [
      'Upload any PNG, JPG, SVG, or WebP file.',
      'Copy the generated Data URI string or HTML img tag.',
      'Download as a plain text file if needed.'
    ],
    faqs: [
      { question: 'Why use Base64 images?', answer: 'They eliminate separate HTTP requests by embedding image data directly in HTML or CSS.' }
    ],
    relatedToolSlugs: ['color-picker', 'svg-to-png'],
  },
  {
    slug: 'color-picker',
    name: 'Color Picker from Image',
    category: 'images',
    shortDescription: 'Extract colors from any photo with a precision magnifier loupe and palette generator.',
    longDescription: 'Sample pixels from uploaded images with zoom lens preview, HEX/RGB/HSL conversion, and dominant color palette extraction.',
    icon: 'Pipette',
    tags: ['color picker', 'palette', 'eyedropper', 'hex', 'rgb'],
    route: '/tools/images/color-picker',
    processingType: 'client',
    howToUse: [
      'Upload a screenshot or photo.',
      'Hover over the image to view magnified pixels.',
      'Click to lock color and copy HEX, RGB, or HSL values.'
    ],
    faqs: [
      { question: 'Can I export the extracted color palette?', answer: 'Yes, copy individual codes or export the full palette as CSS variables.' }
    ],
    relatedToolSlugs: ['color-converter', 'image-to-base64'],
  },
  {
    slug: 'svg-to-png',
    name: 'SVG to PNG Converter',
    category: 'images',
    shortDescription: 'Render scalable vector graphics (SVG) into crisp high-resolution PNG images.',
    longDescription: 'Convert SVG code or files into raster PNGs at custom scale multipliers with transparent or solid background options.',
    icon: 'Layers',
    tags: ['svg', 'png', 'vector', 'raster', 'render'],
    route: '/tools/images/svg-to-png',
    processingType: 'client',
    howToUse: [
      'Upload an SVG file or paste raw SVG XML code.',
      'Set target output width and height.',
      'Download the crisp PNG image.'
    ],
    faqs: [
      { question: 'Will the PNG be sharp at high resolutions?', answer: 'Yes! Vectors scale without pixelation before being rendered.' }
    ],
    relatedToolSlugs: ['image-converter', 'favicon-generator'],
  },
  {
    slug: 'favicon-generator',
    name: 'Favicon Generator',
    category: 'images',
    shortDescription: 'Generate all standard website favicon sizes and apple-touch-icons with HTML code.',
    longDescription: 'Turn your logo into 16x16, 32x32, 48x48, 180x180 (Apple Touch), and 192x192 web icon assets with copyable header markup.',
    icon: 'Globe',
    tags: ['favicon', 'ico', 'apple-touch-icon', 'website', 'icon'],
    route: '/tools/images/favicon-generator',
    processingType: 'client',
    howToUse: [
      'Upload a square logo or graphic.',
      'Preview generated favicon sizes.',
      'Download the icon package and copy the HTML link tags.'
    ],
    faqs: [
      { question: 'What size source image should I upload?', answer: 'A 512x512 PNG produces the cleanest results across all scaled sizes.' }
    ],
    relatedToolSlugs: ['svg-to-png', 'image-resizer'],
  },
  {
    slug: 'meme-maker',
    name: 'Meme Maker',
    category: 'images',
    shortDescription: 'Create custom memes with top and bottom text, font styles, and templates.',
    longDescription: 'Fast, browser-based meme generator with classic impact typography, text outlines, custom image uploads, and popular templates.',
    icon: 'Smile',
    tags: ['meme', 'generator', 'caption', 'fun', 'impact'],
    route: '/tools/images/meme-maker',
    processingType: 'client',
    howToUse: [
      'Select a sample template or upload your own image.',
      'Add top and bottom caption text.',
      'Download your meme in high quality.'
    ],
    faqs: [
      { question: 'Does WrenchlyTools add a watermark to my memes?', answer: 'Never! Your generated memes are 100% clean and watermark-free.' }
    ],
    relatedToolSlugs: ['watermark-adder', 'photo-collage'],
  },
  {
    slug: 'watermark-adder',
    name: 'Watermark Adder',
    category: 'images',
    shortDescription: 'Add text watermarks to your photos with opacity, positioning, and tiling options.',
    longDescription: 'Protect photography and design previews with customizable text watermarks, font sizes, opacity sliders, and diagonal angles.',
    icon: 'Shield',
    tags: ['watermark', 'copyright', 'protect', 'branding', 'photo'],
    route: '/tools/images/watermark-adder',
    processingType: 'client',
    howToUse: [
      'Upload your photograph.',
      'Type watermark text, adjust transparency and angle.',
      'Position in center, corner, or repeat across image, then download.'
    ],
    faqs: [
      { question: 'Does adding a watermark lower image quality?', answer: 'No, original resolution is maintained during rendering.' }
    ],
    relatedToolSlugs: ['image-resizer', 'meme-maker'],
  },
  {
    slug: 'photo-collage',
    name: 'Photo Collage Maker',
    category: 'images',
    shortDescription: 'Combine multiple images into attractive grid collage layouts with custom spacing.',
    longDescription: 'Assemble 2 to 6 images into clean visual collages with customizable border spacing, background colors, and aspect ratios.',
    icon: 'LayoutGrid',
    tags: ['collage', 'grid', 'combine', 'photos', 'montage'],
    route: '/tools/images/photo-collage',
    processingType: 'client',
    howToUse: [
      'Upload 2 or more images.',
      'Choose a grid template (e.g. 2x2, side-by-side, banner).',
      'Tweak border gaps and download your compiled collage.'
    ],
    faqs: [
      { question: 'Can I reorder pictures?', answer: 'Yes, simply click move buttons to reorder photos across slots.' }
    ],
    relatedToolSlugs: ['image-cropper', 'image-compressor'],
  },

  // --- CALCULATORS ---
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'calculators',
    shortDescription: 'Calculate exact age in years, months, days, hours, and next birthday countdown.',
    longDescription: 'Accurate chronological age calculator that provides precise breakdown of your age in years, months, weeks, days, hours, and minutes.',
    icon: 'Calendar',
    tags: ['age', 'birthday', 'chronological', 'years', 'months'],
    route: '/tools/calculators/age-calculator',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Select your birth date from the date picker.',
      'Optionally specify a reference date.',
      'View complete age breakdown and countdown to your next birthday.'
    ],
    faqs: [
      { question: 'Does it take leap years into account?', answer: 'Yes, all leap year calendar adjustments are precisely calculated.' }
    ],
    relatedToolSlugs: ['date-difference-calculator', 'days-until-a-date'],
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'calculators',
    shortDescription: 'Solve percentage problems: find X% of Y, calculate percentage increases, and differences.',
    longDescription: 'Multi-purpose percentage utility with formulas for calculating discounts, markups, growth rates, and proportion values.',
    icon: 'Percent',
    tags: ['percentage', 'math', 'increase', 'decrease', 'fraction'],
    route: '/tools/calculators/percentage-calculator',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Choose the percentage formula you need.',
      'Enter input values into the fields.',
      'The result and mathematical formula explanation update instantly.'
    ],
    faqs: [
      { question: 'How is percentage increase calculated?', answer: 'Percentage increase = ((New Value - Old Value) / Old Value) × 100.' }
    ],
    relatedToolSlugs: ['discount-calculator', 'tip-calculator', 'vat-gst-sales-tax'],
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'calculators',
    shortDescription: 'Calculate Body Mass Index for adults with metric and imperial units, plus health range guides.',
    longDescription: 'Check Body Mass Index (BMI) using kilograms/centimeters or pounds/feet-inches with visual category indicator and healthy weight ranges.',
    icon: 'Activity',
    tags: ['bmi', 'health', 'fitness', 'weight', 'body mass index'],
    route: '/tools/calculators/bmi-calculator',
    processingType: 'client',
    howToUse: [
      'Select Metric (kg/cm) or Imperial (lbs/ft-in).',
      'Input height and weight.',
      'View BMI score, WHO category classification, and ideal weight boundaries.'
    ],
    faqs: [
      { question: 'What are the standard WHO categories?', answer: 'Underweight: <18.5, Normal: 18.5–24.9, Overweight: 25–29.9, Obese: ≥30.' }
    ],
    relatedToolSlugs: ['percentage-calculator', 'age-calculator'],
  },
  {
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'calculators',
    shortDescription: 'Calculate semester and cumulative Grade Point Average on standard 4.0 scale.',
    longDescription: 'Academic GPA calculator supporting course credit weights, standard letter grades (A+, A, B, C, etc.), and cumulative semester tracking.',
    icon: 'GraduationCap',
    tags: ['gpa', 'grade', 'college', 'semester', 'academic'],
    route: '/tools/calculators/gpa-calculator',
    processingType: 'client',
    howToUse: [
      'Add your course names, letter grades, and credit hours.',
      'Add or remove courses as needed.',
      'View weighted GPA and overall grade classification.'
    ],
    faqs: [
      { question: 'Can I add prior cumulative GPA?', answer: 'Yes, input prior cumulative GPA and credits to compute total combined GPA.' }
    ],
    relatedToolSlugs: ['percentage-calculator', 'age-calculator'],
  },
  {
    slug: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    category: 'calculators',
    shortDescription: 'Calculate total days, weeks, months, and working days between two dates.',
    longDescription: 'Compute the exact time span between any two calendar dates with options to exclude weekends or calculate business days.',
    icon: 'CalendarDays',
    tags: ['date difference', 'duration', 'days between', 'calendar'],
    route: '/tools/calculators/date-difference-calculator',
    processingType: 'client',
    howToUse: [
      'Select start date and end date.',
      'Toggle weekend inclusion if needed.',
      'Inspect duration in days, weeks, months, and business days.'
    ],
    faqs: [
      { question: 'Does it calculate business days?', answer: 'Yes, it breaks down weekdays versus weekend days.' }
    ],
    relatedToolSlugs: ['days-until-a-date', 'age-calculator'],
  },
  {
    slug: 'days-until-a-date',
    name: 'Days Until a Date',
    category: 'calculators',
    shortDescription: 'Countdown timer and day counter for holidays, exams, vacations, and milestones.',
    longDescription: 'Live event countdown showing days, hours, minutes, and seconds until any future target date.',
    icon: 'Clock',
    tags: ['countdown', 'days until', 'event', 'holiday', 'exam'],
    route: '/tools/calculators/days-until-a-date',
    processingType: 'client',
    howToUse: [
      'Pick a target future date or select a preset holiday.',
      'View real-time ticking countdown and total days remaining.'
    ],
    faqs: [
      { question: 'Does the timer update live?', answer: 'Yes, it ticks down second-by-second in real time.' }
    ],
    relatedToolSlugs: ['date-difference-calculator', 'age-calculator'],
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    category: 'calculators',
    shortDescription: 'Calculate restaurant bill tips and easily split the total among multiple people.',
    longDescription: 'Dining tip calculator with customizable tip percentages, bill rounding, and per-person split breakdown.',
    icon: 'Receipt',
    tags: ['tip', 'bill split', 'restaurant', 'dining', 'gratuity'],
    route: '/tools/calculators/tip-calculator',
    processingType: 'client',
    howToUse: [
      'Enter total check amount.',
      'Select tip percentage (15%, 18%, 20% or custom).',
      'Set number of guests to split total and tip per person.'
    ],
    faqs: [
      { question: 'Can I round the final per-person amount?', answer: 'Yes, one-click rounding helps with cash payments.' }
    ],
    relatedToolSlugs: ['discount-calculator', 'percentage-calculator'],
  },
  {
    slug: 'discount-calculator',
    name: 'Discount Calculator',
    category: 'calculators',
    shortDescription: 'Calculate sale savings, final price, and stacked coupons during shopping.',
    longDescription: 'Shopping calculator for original price, discount percentage, extra promotional coupons, and total money saved.',
    icon: 'Tag',
    tags: ['discount', 'sale', 'shopping', 'coupon', 'savings'],
    route: '/tools/calculators/discount-calculator',
    processingType: 'client',
    howToUse: [
      'Input the sticker price.',
      'Enter primary discount percentage and optional secondary coupon.',
      'View final price and total savings.'
    ],
    faqs: [
      { question: 'How do stacked discounts work?', answer: 'Secondary coupons apply to the already-discounted price, as retail stores standardly do.' }
    ],
    relatedToolSlugs: ['percentage-calculator', 'tip-calculator'],
  },
  {
    slug: 'fuel-cost-calculator',
    name: 'Fuel Cost Calculator',
    category: 'calculators',
    shortDescription: 'Estimate road trip fuel costs based on distance, vehicle consumption, and gas price.',
    longDescription: 'Travel expense calculator for driving trips with fuel economy conversion (MPG or L/100km) and passenger cost splitting.',
    icon: 'Fuel',
    tags: ['fuel', 'gas', 'mileage', 'road trip', 'travel cost'],
    route: '/tools/calculators/fuel-cost-calculator',
    processingType: 'client',
    howToUse: [
      'Enter trip distance in kilometers or miles.',
      'Provide your vehicle mileage / fuel efficiency.',
      'Enter gas price per liter or gallon to calculate total cost.'
    ],
    faqs: [
      { question: 'Can it split costs between passengers?', answer: 'Yes, specify number of travelers to calculate individual share.' }
    ],
    relatedToolSlugs: ['loan-emi-calculator', 'percentage-calculator'],
  },
  {
    slug: 'loan-emi-calculator',
    name: 'Loan & EMI Calculator',
    category: 'calculators',
    shortDescription: 'Calculate monthly loan EMI, total interest, and complete payment breakdown.',
    longDescription: 'Financial loan utility for personal loans, auto loans, and mortgages showing monthly installments, total interest, and principal proportions.',
    icon: 'Landmark',
    tags: ['loan', 'emi', 'interest', 'finance', 'mortgage', 'monthly payment'],
    route: '/tools/calculators/loan-emi-calculator',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Enter principal loan amount.',
      'Input annual interest rate and duration in years or months.',
      'View monthly EMI, total interest payable, and overall cost.'
    ],
    faqs: [
      { question: 'What formula is used for EMI?', answer: 'EMI = [P × R × (1+R)^N] / [(1+R)^N - 1], the banking standard reducing-balance formula.' }
    ],
    relatedToolSlugs: ['compound-interest-calculator', 'mortgage-calculator'],
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'calculators',
    shortDescription: 'Calculate investment growth over time with monthly contributions and compounding frequency.',
    longDescription: 'Wealth growth simulator with starting balance, regular deposits, interest rates, and compounding intervals (monthly, quarterly, annually).',
    icon: 'TrendingUp',
    tags: ['compound interest', 'investing', 'savings', 'future value', 'wealth'],
    route: '/tools/calculators/compound-interest-calculator',
    processingType: 'client',
    howToUse: [
      'Enter initial deposit and monthly recurring contribution.',
      'Set expected annual interest rate and investment duration.',
      'View future portfolio value, principal invested, and total interest earned.'
    ],
    faqs: [
      { question: 'What is the power of compounding?', answer: 'Interest earned generates additional interest over time, creating exponential growth.' }
    ],
    relatedToolSlugs: ['savings-goal-calculator', 'loan-emi-calculator'],
  },
  {
    slug: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    category: 'calculators',
    shortDescription: 'Calculate how much money you need to save each month to reach your financial target.',
    longDescription: 'Financial planning tool determining monthly savings required to buy a house, car, or build an emergency fund by a target date.',
    icon: 'PiggyBank',
    tags: ['savings', 'goal', 'target', 'budget', 'emergency fund'],
    route: '/tools/calculators/savings-goal-calculator',
    processingType: 'client',
    howToUse: [
      'Enter target goal amount.',
      'Provide current savings balance and timeframe in months or years.',
      'Calculate exact monthly contribution required.'
    ],
    faqs: [
      { question: 'Can it account for interest earnings?', answer: 'Yes, enter an estimated interest rate on your savings account.' }
    ],
    relatedToolSlugs: ['compound-interest-calculator', 'loan-emi-calculator'],
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'calculators',
    shortDescription: 'Estimate monthly home mortgage payments including principal, interest, taxes, and insurance.',
    longDescription: 'Comprehensive home loan calculator with down payment calculations, amortization schedule, and property tax estimates.',
    icon: 'Home',
    tags: ['mortgage', 'home loan', 'real estate', 'property', 'interest'],
    route: '/tools/calculators/mortgage-calculator',
    processingType: 'client',
    howToUse: [
      'Enter home purchase price and down payment percentage.',
      'Set loan term (15 or 30 years) and interest rate.',
      'Review monthly principal + interest payment.'
    ],
    faqs: [
      { question: 'How does down payment affect monthly payment?', answer: 'A larger down payment lowers borrowed principal and reduces total interest paid.' }
    ],
    relatedToolSlugs: ['loan-emi-calculator', 'compound-interest-calculator'],
  },
  {
    slug: 'roi-calculator',
    name: 'ROI Calculator',
    category: 'calculators',
    shortDescription: 'Calculate Return on Investment percentage and annualized rate of return.',
    longDescription: 'Measure investment performance across business ventures, stocks, or marketing campaigns with ROI percentage and net profit.',
    icon: 'BarChart2',
    tags: ['roi', 'return on investment', 'profit', 'yield', 'investing'],
    route: '/tools/calculators/roi-calculator',
    processingType: 'client',
    howToUse: [
      'Enter initial investment amount.',
      'Input final return or revenue generated.',
      'Inspect ROI percentage and profit multiplier.'
    ],
    faqs: [
      { question: 'What is the standard formula for ROI?', answer: 'ROI = ((Net Profit) / Cost of Investment) × 100.' }
    ],
    relatedToolSlugs: ['profit-margin-calculator', 'compound-interest-calculator'],
  },
  {
    slug: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    category: 'calculators',
    shortDescription: 'Calculate gross margin, markup percentage, and profit from cost and selling price.',
    longDescription: 'Essential pricing calculator for e-commerce and retail sellers to balance cost of goods, selling price, and profit margins.',
    icon: 'DollarSign',
    tags: ['profit', 'margin', 'markup', 'retail', 'pricing', 'ecommerce'],
    route: '/tools/calculators/profit-margin-calculator',
    processingType: 'client',
    howToUse: [
      'Input your product cost and selling price (or desired margin %).',
      'The tool computes gross profit, margin percentage, and markup percentage.'
    ],
    faqs: [
      { question: 'What is the difference between margin and markup?', answer: 'Margin is profit divided by revenue; markup is profit divided by cost.' }
    ],
    relatedToolSlugs: ['roi-calculator', 'vat-gst-sales-tax'],
  },
  {
    slug: 'vat-gst-sales-tax',
    name: 'VAT / GST / Sales Tax Calculator',
    category: 'calculators',
    shortDescription: 'Add or remove VAT, GST, or sales tax from net and gross amounts instantly.',
    longDescription: 'Quickly compute sales tax with dual modes: add tax to net amount, or extract tax from a tax-inclusive gross total.',
    icon: 'PercentCircle',
    tags: ['vat', 'gst', 'sales tax', 'tax', 'inclusive', 'exclusive'],
    route: '/tools/calculators/vat-gst-sales-tax',
    processingType: 'client',
    howToUse: [
      'Enter base amount.',
      'Enter tax rate (e.g. 5%, 13%, 18%, 20%).',
      'Select Add Tax or Remove Tax mode.'
    ],
    faqs: [
      { question: 'How is tax removed from a gross amount?', answer: 'Net = Gross / (1 + Tax Rate). The tax component is Gross - Net.' }
    ],
    relatedToolSlugs: ['percentage-calculator', 'profit-margin-calculator'],
  },
  {
    slug: 'hourly-to-annual-salary',
    name: 'Hourly to Annual Salary Calculator',
    category: 'calculators',
    shortDescription: 'Convert hourly wage to annual, monthly, bi-weekly, and weekly gross income.',
    longDescription: 'Convert pay rates between hourly wages and annual salary assuming standard working hours (40 hrs/week, 52 weeks/year) or custom schedules.',
    icon: 'Briefcase',
    tags: ['salary', 'wage', 'hourly', 'paycheck', 'annual income'],
    route: '/tools/calculators/hourly-to-annual-salary',
    processingType: 'client',
    howToUse: [
      'Enter hourly rate or annual salary.',
      'Adjust hours worked per week if non-standard.',
      'View comprehensive salary breakdown across all payment frequencies.'
    ],
    faqs: [
      { question: 'How many work hours are in a typical year?', answer: 'A 40-hour work week equals 2,080 working hours across 52 weeks.' }
    ],
    relatedToolSlugs: ['pakistan-income-tax', 'loan-emi-calculator'],
  },
  {
    slug: 'pakistan-income-tax',
    name: 'Pakistan Income Tax Calculator',
    category: 'calculators',
    shortDescription: 'Calculate Pakistan income tax on salary for Tax Year 2024-2025/2025-2026 with monthly breakdown.',
    longDescription: 'Verified tax calculator for salaried individuals in Pakistan based on Federal Board of Revenue (FBR) progressive tax slabs with monthly and yearly take-home salary.',
    icon: 'Calculator',
    tags: ['pakistan', 'income tax', 'fbr', 'salary', 'pkr', 'tax slabs'],
    route: '/tools/calculators/pakistan-income-tax',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Enter your monthly or annual gross salary in PKR.',
      'Select your employment type (Salaried Individual).',
      'Inspect monthly income tax, annual income tax, and net take-home salary.'
    ],
    faqs: [
      { question: 'What is the tax-free threshold in Pakistan?', answer: 'Annual salaried income up to PKR 600,000 (PKR 50,000/month) is taxed at 0%.' },
      { question: 'Are these rates official?', answer: 'Calculations adhere strictly to the Pakistan Finance Act tax brackets for salaried taxpayers.' }
    ],
    relatedToolSlugs: ['salary-after-tax', 'zakat-calculator', 'gold-value-calculator'],
  },
  {
    slug: 'salary-after-tax',
    name: 'Salary After Tax Calculator',
    category: 'calculators',
    shortDescription: 'Calculate net take-home pay after tax brackets, deductions, and contributions.',
    longDescription: 'General take-home pay calculator with custom tax brackets, retirement contributions, and insurance deductions.',
    icon: 'Wallet',
    tags: ['take home pay', 'net salary', 'taxes', 'paycheck', 'deductions'],
    route: '/tools/calculators/salary-after-tax',
    processingType: 'client',
    howToUse: [
      'Enter gross earnings.',
      'Add estimated tax percentage and monthly deductions.',
      'View net pay per month and per pay period.'
    ],
    faqs: [
      { question: 'Why does net pay differ from gross pay?', answer: 'Mandatory taxes and voluntary deductions (healthcare, retirement) are subtracted.' }
    ],
    relatedToolSlugs: ['pakistan-income-tax', 'hourly-to-annual-salary'],
  },
  {
    slug: 'zakat-calculator',
    name: 'Zakat Calculator',
    category: 'calculators',
    shortDescription: 'Calculate payable Zakat (2.5%) across cash, gold, silver, investments, and liabilities.',
    longDescription: 'Comprehensive Islamic wealth assessment calculator for cash in hand, bank balances, gold/silver valuation, trade merchandise, and deductible immediate liabilities against Nisab thresholds.',
    icon: 'Moon',
    tags: ['zakat', 'islamic', 'nisab', 'charity', 'gold', 'silver', '2.5%'],
    route: '/tools/calculators/zakat-calculator',
    processingType: 'client',
    howToUse: [
      'Enter values for cash, bank deposits, gold, and trade goods.',
      'Enter current liabilities and debts due.',
      'Check if net wealth exceeds the Nisab threshold to view 2.5% payable Zakat.'
    ],
    faqs: [
      { question: 'What is the Nisab threshold?', answer: 'Nisab is equivalent to 87.48 grams of gold or 612.36 grams of silver.' }
    ],
    relatedToolSlugs: ['gold-value-calculator', 'pakistan-income-tax'],
  },
  {
    slug: 'gold-value-calculator',
    name: 'Gold Value Calculator',
    category: 'calculators',
    shortDescription: 'Calculate gold value in grams or tolas across 24K, 22K, 21K, and 18K purities.',
    longDescription: 'Gold valuation tool supporting metric grams, ounces, and South Asian tolas (1 tola = 11.664g) with live custom price input and purity adjustments.',
    icon: 'Coins',
    tags: ['gold', 'tola', 'gram', 'karat', '24k', '22k', 'bullion'],
    route: '/tools/calculators/gold-value-calculator',
    processingType: 'client',
    howToUse: [
      'Select unit (Grams, Tolas, Ounces).',
      'Enter total weight and purity (24K, 22K, 21K, 18K).',
      'Input the current market price per unit to see total worth.'
    ],
    faqs: [
      { question: 'How much is 1 tola in grams?', answer: 'In the international metric standard, 1 tola equals 11.664 grams.' }
    ],
    relatedToolSlugs: ['zakat-calculator', 'currency-converter'],
  },
  {
    slug: 'currency-converter',
    name: 'Currency Converter',
    category: 'calculators',
    shortDescription: 'Convert between world currencies with live reference rates and custom rate overrides.',
    longDescription: 'Foreign exchange conversion tool covering USD, EUR, GBP, PKR, INR, AED, SAR, CAD, AUD, and JPY with editable exchange rates and inverse rate calculation.',
    icon: 'BadgeDollarSign',
    tags: ['currency', 'forex', 'usd', 'pkr', 'eur', 'exchange rate'],
    route: '/tools/calculators/currency-converter',
    processingType: 'client',
    howToUse: [
      'Select source and destination currencies.',
      'Enter amount to convert.',
      'Use reference rates or type your own custom bank rate.'
    ],
    faqs: [
      { question: 'Can I customize the exchange rate?', answer: 'Yes, enter any specific rate offered by your bank or money exchange.' }
    ],
    relatedToolSlugs: ['gold-value-calculator', 'percentage-calculator'],
  },

  // --- GENERATORS ---
  {
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'generators',
    shortDescription: 'Create custom QR codes for URLs, WiFi networks, text, and contacts with colors.',
    longDescription: 'Generate high-resolution QR codes with customizable foreground and background colors, error correction levels, and SVG/PNG download.',
    icon: 'QrCode',
    tags: ['qr code', 'barcode', 'wifi qr', 'link qr', 'scan'],
    route: '/tools/generators/qr-code-generator',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Choose data type: URL, Plain Text, or WiFi.',
      'Customize colors and size.',
      'Download as PNG or vector SVG.'
    ],
    faqs: [
      { question: 'Do these QR codes expire?', answer: 'No. They encode static text directly into the pattern and work indefinitely.' }
    ],
    relatedToolSlugs: ['barcode-generator', 'uuid-generator'],
  },
  {
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'generators',
    shortDescription: 'Generate strong, secure passwords using cryptographic browser randomness.',
    longDescription: 'Client-side password creator using window.crypto.getRandomValues() with customizable length, symbols, numbers, and entropy strength score.',
    icon: 'KeyRound',
    tags: ['password', 'security', 'generator', 'strong password', 'crypto'],
    route: '/tools/generators/password-generator',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Adjust length slider (8 to 64 characters).',
      'Toggle uppercase, lowercase, numbers, and symbols.',
      'Copy the generated password with a single click.'
    ],
    faqs: [
      { question: 'Are generated passwords saved anywhere?', answer: 'Never. They are created purely in your browser memory and discarded immediately.' }
    ],
    relatedToolSlugs: ['uuid-generator', 'hash-generator'],
  },
  {
    slug: 'username-generator',
    name: 'Username Generator',
    category: 'generators',
    shortDescription: 'Generate creative, catchy usernames for gaming, social media, and developer profiles.',
    longDescription: 'Produce unique handle ideas based on themes (Tech, Minimalist, Gaming, Creative) with prefix, suffix, and number controls.',
    icon: 'AtSign',
    tags: ['username', 'handle', 'gamertag', 'social media', 'creative'],
    route: '/tools/generators/username-generator',
    processingType: 'client',
    howToUse: [
      'Choose a theme style and optional seed word.',
      'Click Generate to produce fresh handles.',
      'Copy your favorite name.'
    ],
    faqs: [
      { question: 'Can I include random numbers?', answer: 'Yes, toggle the numbers switch to append numbers.' }
    ],
    relatedToolSlugs: ['random-name-generator', 'password-generator'],
  },
  {
    slug: 'random-name-generator',
    name: 'Random Name Generator',
    category: 'generators',
    shortDescription: 'Generate random names for characters, test users, personas, and mock data.',
    longDescription: 'Create diverse first and last names across cultural backgrounds, modern styles, and fantasy genres for mock data and testing.',
    icon: 'UserPlus',
    tags: ['random name', 'persona', 'mock data', 'character', 'testing'],
    route: '/tools/generators/random-name-generator',
    processingType: 'client',
    howToUse: [
      'Select name category and gender filter.',
      'Set batch quantity and click Generate.',
      'Copy individual names or copy entire list.'
    ],
    faqs: [
      { question: 'Can I generate full names?', answer: 'Yes, choose First Name only, Last Name only, or Full Name.' }
    ],
    relatedToolSlugs: ['username-generator', 'random-number-generator'],
  },
  {
    slug: 'random-number-generator',
    name: 'Random Number Generator',
    category: 'generators',
    shortDescription: 'Generate random numbers between min and max ranges with duplicate filtering.',
    longDescription: 'RNG utility supporting integers, decimals, multiple results, unique-only numbers, and sorting for raffles, tests, and math.',
    icon: 'Dice5',
    tags: ['rng', 'random number', 'dice', 'raffle', 'draw', 'lottery'],
    route: '/tools/generators/random-number-generator',
    processingType: 'client',
    howToUse: [
      'Specify minimum and maximum bounds.',
      'Choose how many numbers to generate.',
      'Click Generate to roll results.'
    ],
    faqs: [
      { question: 'Can I prevent duplicate numbers?', answer: 'Yes, enable "No Duplicates" for lottery or raffle draws.' }
    ],
    relatedToolSlugs: ['uuid-generator', 'password-generator'],
  },
  {
    slug: 'uuid-generator',
    name: 'UUID / GUID Generator',
    category: 'generators',
    shortDescription: 'Generate cryptographically random UUID v4 identifiers in bulk.',
    longDescription: 'Create universally unique identifiers (UUID v4) with uppercase/lowercase format, hyphen toggle, and batch export.',
    icon: 'Fingerprint',
    tags: ['uuid', 'guid', 'v4', 'identifier', 'developer', 'id'],
    route: '/tools/generators/uuid-generator',
    processingType: 'client',
    howToUse: [
      'Select number of UUIDs (1 to 50).',
      'Choose formatting options (uppercase, remove hyphens).',
      'Copy all or download as a text file.'
    ],
    faqs: [
      { question: 'Are these true UUID v4?', answer: 'Yes, generated according to RFC 4122 using cryptographic pseudo-random values.' }
    ],
    relatedToolSlugs: ['password-generator', 'hash-generator'],
  },
  {
    slug: 'barcode-generator',
    name: 'Barcode Generator',
    category: 'generators',
    shortDescription: 'Generate standard Code 128, EAN-13, and UPC barcodes with SVG/PNG download.',
    longDescription: 'Create clean product barcodes with configurable line width, height, text visibility, and instant vector/PNG export.',
    icon: 'Barcode',
    tags: ['barcode', 'code128', 'ean13', 'upc', 'inventory', 'retail'],
    route: '/tools/generators/barcode-generator',
    processingType: 'client',
    howToUse: [
      'Select barcode format (Code128, EAN, CODE39).',
      'Enter the alphanumeric value or digits.',
      'Download SVG or PNG barcode image.'
    ],
    faqs: [
      { question: 'Which format should I use for general text?', answer: 'Code 128 is the most versatile for general alphanumeric data.' }
    ],
    relatedToolSlugs: ['qr-code-generator', 'receipt-generator'],
  },
  {
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    category: 'generators',
    shortDescription: 'Create professional business invoices with line items, tax, and PDF download.',
    longDescription: 'Fill out sender, client, line items, taxes, and payment terms, preview in real time, and download or print a clean business invoice.',
    icon: 'FileSpreadsheet',
    tags: ['invoice', 'billing', 'freelance', 'pdf invoice', 'receipt'],
    route: '/tools/generators/invoice-generator',
    processingType: 'client',
    howToUse: [
      'Fill in your business details and client information.',
      'Add items, quantities, and rates.',
      'Print directly or download as a PDF invoice.'
    ],
    faqs: [
      { question: 'Can I choose my currency?', answer: 'Yes, select USD, EUR, GBP, PKR, INR, or any symbol.' }
    ],
    relatedToolSlugs: ['receipt-generator', 'pdf-merger'],
  },
  {
    slug: 'receipt-generator',
    name: 'Receipt Generator',
    category: 'generators',
    shortDescription: 'Generate printable retail and service receipts with items, tax, and payment method.',
    longDescription: 'Simple receipt maker for freelancers, small stores, and pop-up events with itemized totals and print layout.',
    icon: 'Receipt',
    tags: ['receipt', 'proof of payment', 'store', 'invoice', 'print'],
    route: '/tools/generators/receipt-generator',
    processingType: 'client',
    howToUse: [
      'Enter business title, transaction date, and payment type.',
      'Add purchased items and prices.',
      'Print or save as a digital receipt.'
    ],
    faqs: [
      { question: 'Does it auto-calculate totals and taxes?', answer: 'Yes, subtotals, tax additions, and final totals are computed automatically.' }
    ],
    relatedToolSlugs: ['invoice-generator', 'tip-calculator'],
  },
  {
    slug: 'resume-builder',
    name: 'Resume / CV Builder',
    category: 'generators',
    shortDescription: 'Build clean, modern resumes with live preview and PDF export layout.',
    longDescription: 'Structured resume creation tool with sections for contact information, summary, experience, education, and skills.',
    icon: 'FileText',
    tags: ['resume', 'cv', 'curriculum vitae', 'job application', 'career'],
    route: '/tools/generators/resume-builder',
    processingType: 'client',
    howToUse: [
      'Enter your personal summary, job history, and education.',
      'Preview your formatted resume in real time.',
      'Print or export as clean PDF.'
    ],
    faqs: [
      { question: 'Is my resume data stored on a server?', answer: 'No, your information stays securely inside your browser.' }
    ],
    relatedToolSlugs: ['cover-letter-generator', 'invoice-generator'],
  },
  {
    slug: 'signature-generator',
    name: 'Signature Generator',
    category: 'generators',
    shortDescription: 'Draw a handwritten signature or generate elegant cursive signatures for documents.',
    longDescription: 'Digital signature creation canvas with pen smoothing, cursive typography styles, color palette, and transparent PNG download.',
    icon: 'PenTool',
    tags: ['signature', 'sign', 'handwritten', 'cursive', 'e-sign'],
    route: '/tools/generators/signature-generator',
    processingType: 'client',
    howToUse: [
      'Draw with mouse/touch or type your name for stylish cursive fonts.',
      'Choose ink color (black, navy, blue).',
      'Download transparent PNG signature.'
    ],
    faqs: [
      { question: 'Can I use this on legal contracts?', answer: 'It produces a digital visual signature; legal validity depends on your jurisdiction\'s e-signature laws.' }
    ],
    relatedToolSlugs: ['invoice-generator', 'resume-builder'],
  },
  {
    slug: 'cover-letter-generator',
    name: 'Cover Letter Generator',
    category: 'generators',
    shortDescription: 'Generate customized professional job application cover letters in seconds.',
    longDescription: 'Draft compelling cover letters tailored to your target company, role, skills, and chosen tone of voice.',
    icon: 'MailOpen',
    tags: ['cover letter', 'job application', 'career', 'letter', 'hiring'],
    route: '/tools/generators/cover-letter-generator',
    processingType: 'client',
    howToUse: [
      'Enter your name, job title, and employer details.',
      'Select a tone (Professional, Confident, Enthusiastic).',
      'Copy the generated cover letter and edit as needed.'
    ],
    faqs: [
      { question: 'Can I edit the generated letter?', answer: 'Yes, the output is directly editable in the workspace before copying.' }
    ],
    relatedToolSlugs: ['resume-builder', 'email-writer'],
  },
  {
    slug: 'thumbnail-maker',
    name: 'Thumbnail Maker',
    category: 'generators',
    shortDescription: 'Design YouTube and video thumbnails with 1280x720 canvas, overlays, and bold text.',
    longDescription: 'Quickly produce high-click video thumbnails with background gradients, photo uploads, bold text titles, and badges.',
    icon: 'Tv',
    tags: ['thumbnail', 'youtube', 'video banner', 'cover', '1280x720'],
    route: '/tools/generators/thumbnail-maker',
    processingType: 'client',
    howToUse: [
      'Upload a background image or pick a gradient.',
      'Type bold headline text and badges.',
      'Download high-res 1280x720 thumbnail.'
    ],
    faqs: [
      { question: 'Is the canvas sized for YouTube?', answer: 'Yes, it adheres to the standard 1280x720 (16:9) recommendation.' }
    ],
    relatedToolSlugs: ['meme-maker', 'youtube-thumbnail-downloader'],
  },
  {
    slug: 'islamic-date-converter',
    name: 'Islamic Date Converter (Hijri)',
    category: 'generators',
    shortDescription: 'Convert between Gregorian calendar and Islamic Hijri dates with moon-sighting adjustment.',
    longDescription: 'Dual-direction date converter between the Gregorian calendar and Islamic Hijri calendar with adjustable lunar sighting day offset.',
    icon: 'Moon',
    tags: ['islamic date', 'hijri', 'gregorian', 'ramadan', 'eid', 'calendar'],
    route: '/tools/generators/islamic-date-converter',
    processingType: 'client',
    howToUse: [
      'Select Gregorian to Hijri or Hijri to Gregorian.',
      'Choose the date to convert.',
      'Apply optional ±1 or ±2 day adjustment based on your local moon sighting.'
    ],
    faqs: [
      { question: 'Why is an adjustment slider needed?', answer: 'Islamic months depend on regional moon sightings which can differ by 1-2 days from algorithmic tables.' }
    ],
    relatedToolSlugs: ['prayer-times', 'age-calculator'],
  },
  {
    slug: 'prayer-times',
    name: 'Prayer Times Calculator',
    category: 'generators',
    shortDescription: 'Calculate daily Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for major cities.',
    longDescription: 'Accurate Salah timetable calculator supporting multiple calculation methods (Karachi, MWL, ISNA, Umm al-Qura) and Hanafi/Shafi\'i Asr juristic options.',
    icon: 'Compass',
    tags: ['prayer times', 'namaz', 'salah', 'fajr', 'maghrib', 'isha'],
    route: '/tools/generators/prayer-times',
    processingType: 'client',
    howToUse: [
      'Select your city or enter custom coordinates.',
      'Choose calculation convention and Asr juristic method.',
      'View today\'s prayer timetable.'
    ],
    faqs: [
      { question: 'What is the Hanafi Asr difference?', answer: 'Hanafi Asr starts when the shadow of an object equals twice its length plus the noon shadow.' }
    ],
    relatedToolSlugs: ['islamic-date-converter', 'zakat-calculator'],
  },

  // --- DEVELOPER TOOLS ---
  {
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'developer',
    shortDescription: 'Format, prettify, minify, and validate JSON data with clear syntax error locations.',
    longDescription: 'Developer editor that parses JSON strings, provides precise error line and column indicators for syntax mistakes, and reformats with 2-space, 4-space, or minified output.',
    icon: 'Braces',
    tags: ['json', 'formatter', 'validator', 'prettify', 'minify', 'developer'],
    route: '/tools/developer/json-formatter',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Paste your raw JSON code into the editor.',
      'Click Format to beautify or Minify to compress.',
      'Any syntax errors will display with exact line and column feedback.'
    ],
    faqs: [
      { question: 'Can it repair broken quotes?', answer: 'It points to the exact position of missing commas, brackets, or unescaped quotes.' }
    ],
    relatedToolSlugs: ['json-to-csv', 'csv-to-json', 'jwt-decoder'],
  },
  {
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    category: 'developer',
    shortDescription: 'Convert JSON array data into tabular CSV format for Excel and Google Sheets.',
    longDescription: 'Transforms structured JSON objects into clean CSV spreadsheets with automatic header extraction, quote escaping, and file download.',
    icon: 'FileSpreadsheet',
    tags: ['json to csv', 'excel', 'convert', 'sheets', 'tabular'],
    route: '/tools/developer/json-to-csv',
    processingType: 'client',
    howToUse: [
      'Paste an array of JSON objects.',
      'Review the generated tabular preview.',
      'Download as a .csv file or copy raw CSV text.'
    ],
    faqs: [
      { question: 'How are nested objects handled?', answer: 'Nested keys are flattened using dot notation (e.g., user.address.city).' }
    ],
    relatedToolSlugs: ['csv-to-json', 'json-formatter'],
  },
  {
    slug: 'csv-to-json',
    name: 'CSV to JSON Converter',
    category: 'developer',
    shortDescription: 'Convert CSV spreadsheet text into structured JSON arrays or key-value objects.',
    longDescription: 'Parse comma-separated values into JSON format with auto-detection for delimiters, number parsing, and formatted output.',
    icon: 'FileCode2',
    tags: ['csv to json', 'data', 'convert', 'spreadsheet', 'parse'],
    route: '/tools/developer/csv-to-json',
    processingType: 'client',
    howToUse: [
      'Paste your CSV text with header row.',
      'Select delimiter (comma, tab, semicolon).',
      'Copy the converted JSON array.'
    ],
    faqs: [
      { question: 'Does it parse numbers automatically?', answer: 'Yes, numeric strings are parsed to true JavaScript numbers.' }
    ],
    relatedToolSlugs: ['json-to-csv', 'json-formatter'],
  },
  {
    slug: 'base64-encode-decode',
    name: 'Base64 Encode & Decode',
    category: 'developer',
    shortDescription: 'Encode plain text to Base64 or decode Base64 strings safely with UTF-8 support.',
    longDescription: 'Reliable string and credential encoder/decoder supporting special characters, accents, and UTF-8 encoding without truncation.',
    icon: 'Binary',
    tags: ['base64', 'encode', 'decode', 'utf8', 'developer', 'string'],
    route: '/tools/developer/base64-encode-decode',
    processingType: 'client',
    howToUse: [
      'Type or paste text into the input panel.',
      'Select Encode or Decode mode.',
      'Copy output or download as file.'
    ],
    faqs: [
      { question: 'Does it support Unicode and emojis?', answer: 'Yes, full UTF-8 byte encoding is used to prevent character mangling.' }
    ],
    relatedToolSlugs: ['url-encode-decode', 'jwt-decoder'],
  },
  {
    slug: 'url-encode-decode',
    name: 'URL Encode & Decode',
    category: 'developer',
    shortDescription: 'Encode and decode query parameters or complete URLs safely.',
    longDescription: 'Percent-encode special characters in URLs or decode encoded query strings back into human-readable text.',
    icon: 'Link2',
    tags: ['url encode', 'percent encoding', 'uri', 'querystring', 'developer'],
    route: '/tools/developer/url-encode-decode',
    processingType: 'client',
    howToUse: [
      'Paste your URL or query string.',
      'Choose Encode (encodeURIComponent) or Decode.',
      'Inspect parameter breakdown table and copy output.'
    ],
    faqs: [
      { question: 'What characters get encoded?', answer: 'Spaces become %20, symbols like &, ?, = are properly escaped for safe transmission.' }
    ],
    relatedToolSlugs: ['base64-encode-decode', 'text-to-slug'],
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    category: 'developer',
    shortDescription: 'Test regular expressions in real-time with match highlighting and capture groups.',
    longDescription: 'Interactive regex testing sandbox with live pattern evaluation, flags (g, i, m, s), capture group breakdown, and syntax error alerts.',
    icon: 'Regex',
    tags: ['regex', 'regular expression', 'pattern', 'match', 'developer'],
    route: '/tools/developer/regex-tester',
    processingType: 'client',
    howToUse: [
      'Enter your regular expression pattern and flags.',
      'Paste the test string in the box below.',
      'See matches highlighted in color with capture groups listed.'
    ],
    faqs: [
      { question: 'What flags are supported?', answer: 'Global (g), Case-Insensitive (i), Multiline (m), DotAll (s), and Unicode (u).' }
    ],
    relatedToolSlugs: ['find-replace', 'json-formatter'],
  },
  {
    slug: 'hash-generator',
    name: 'Hash Generator',
    category: 'developer',
    shortDescription: 'Generate SHA-256, SHA-384, SHA-512, SHA-1, and MD5 hashes using Web Crypto.',
    longDescription: 'Compute cryptographic hashes of text or strings client-side using native browser crypto algorithms.',
    icon: 'Hash',
    tags: ['hash', 'sha256', 'sha512', 'md5', 'crypto', 'checksum'],
    route: '/tools/developer/hash-generator',
    processingType: 'client',
    howToUse: [
      'Type or paste text into the input.',
      'View SHA-256, SHA-512, SHA-1, and MD5 hashes simultaneously.',
      'Copy the hash in lowercase or uppercase.'
    ],
    faqs: [
      { question: 'Is a hash encryption?', answer: 'No. A cryptographic hash is a one-way mathematical fingerprint that cannot be decrypted.' }
    ],
    relatedToolSlugs: ['uuid-generator', 'password-generator'],
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    category: 'developer',
    shortDescription: 'Decode JSON Web Tokens (JWT) to inspect header, payload claims, and expiration.',
    longDescription: 'Inspect token headers and claims without sending private security tokens to any server. Displays human-readable issued-at (iat) and expiration (exp) dates.',
    icon: 'Key',
    tags: ['jwt', 'json web token', 'decode', 'auth', 'claims', 'token'],
    route: '/tools/developer/jwt-decoder',
    processingType: 'client',
    howToUse: [
      'Paste a JWT token (e.g. eyJhbGciOi...).',
      'Inspect the decoded Header and Payload sections.',
      'Check token expiration status and validity.'
    ],
    faqs: [
      { question: 'Does decoding verify the cryptographic signature?', answer: 'No, decoding simply parses the Base64 claims; verifying the signature requires your private/public secret.' }
    ],
    relatedToolSlugs: ['base64-encode-decode', 'json-formatter'],
  },
  {
    slug: 'timestamp-converter',
    name: 'Timestamp Converter',
    category: 'developer',
    shortDescription: 'Convert Unix epoch timestamps (seconds & milliseconds) to human-readable dates.',
    longDescription: 'Bidirectional timestamp utility: convert Unix seconds or milliseconds to ISO, UTC, and local times, or convert calendar dates to epoch timestamps.',
    icon: 'Clock',
    tags: ['timestamp', 'unix', 'epoch', 'epoch to date', 'developer'],
    route: '/tools/developer/timestamp-converter',
    processingType: 'client',
    howToUse: [
      'Enter an epoch timestamp (seconds or milliseconds) or pick a date.',
      'View conversions in UTC, local time, and relative duration ("5 minutes ago").'
    ],
    faqs: [
      { question: 'What is Unix Epoch?', answer: 'The number of seconds that have elapsed since January 1, 1970 UTC.' }
    ],
    relatedToolSlugs: ['date-difference-calculator', 'cron-helper'],
  },
  {
    slug: 'cron-helper',
    name: 'Cron Expression Helper',
    category: 'developer',
    shortDescription: 'Build, explain, and validate standard cron expressions with human-readable schedules.',
    longDescription: 'Interactive cron schedule builder that translates 5-part cron syntax (minute, hour, day, month, weekday) into clear plain English.',
    icon: 'AlarmClock',
    tags: ['cron', 'schedule', 'cron helper', 'crontab', 'developer'],
    route: '/tools/developer/cron-helper',
    processingType: 'client',
    howToUse: [
      'Use the guided selectors or type a 5-part cron expression (e.g. */15 * * * *).',
      'Read the clear English translation of when the job executes.',
      'View upcoming next run times.'
    ],
    faqs: [
      { question: 'What are the 5 parts of a standard cron string?', answer: 'Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-7).' }
    ],
    relatedToolSlugs: ['timestamp-converter', 'regex-tester'],
  },
  {
    slug: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    category: 'developer',
    shortDescription: 'Design linear, radial, and conic CSS gradients with multi-color stops and code copy.',
    longDescription: 'Visual gradient designer with angle controls, color stop markers, popular curated presets, and ready-to-use CSS background code.',
    icon: 'Palette',
    tags: ['css gradient', 'linear gradient', 'radial', 'generator', 'css'],
    route: '/tools/developer/css-gradient-generator',
    processingType: 'client',
    howToUse: [
      'Choose gradient type (Linear or Radial).',
      'Add or adjust color stop positions and angles.',
      'Copy the generated CSS code into your stylesheet.'
    ],
    faqs: [
      { question: 'Does it support alpha transparency in colors?', answer: 'Yes, full RGBA and HEX transparency stops are supported.' }
    ],
    relatedToolSlugs: ['box-shadow-generator', 'color-converter'],
  },
  {
    slug: 'box-shadow-generator',
    name: 'Box Shadow Generator',
    category: 'developer',
    shortDescription: 'Design subtle, realistic CSS box shadows with layered blurs, spread, and inset.',
    longDescription: 'Visual shadow editor to create modern multi-layer shadows without guesswork. Controls for X/Y offset, blur radius, spread, color, and inset.',
    icon: 'Square',
    tags: ['box shadow', 'css shadow', 'elevation', 'drop shadow', 'css'],
    route: '/tools/developer/box-shadow-generator',
    processingType: 'client',
    howToUse: [
      'Adjust sliders for X/Y offset, blur, and spread.',
      'Tweak opacity and color.',
      'Copy the resulting CSS box-shadow snippet.'
    ],
    faqs: [
      { question: 'Can I add multiple shadow layers?', answer: 'Yes, multi-layer shadows create softer, more realistic depth.' }
    ],
    relatedToolSlugs: ['css-gradient-generator', 'border-radius-generator'],
  },
  {
    slug: 'border-radius-generator',
    name: 'Border Radius Generator',
    category: 'developer',
    shortDescription: 'Design modern rounded corners or organic blob shapes with 8-point CSS border-radius.',
    longDescription: 'Interactive corner curve generator supporting individual corner radius controls or advanced 8-value organic blob shapes.',
    icon: 'Maximize',
    tags: ['border radius', 'css shapes', 'rounded corners', 'blob generator'],
    route: '/tools/developer/border-radius-generator',
    processingType: 'client',
    howToUse: [
      'Adjust the sliders for each corner.',
      'Toggle 8-point organic mode for fluid shapes.',
      'Copy the border-radius CSS property.'
    ],
    faqs: [
      { question: 'What is 8-point border-radius?', answer: 'It specifies horizontal and vertical radii separately for each corner (e.g. 30% 70% 70% 30% / 30% 30% 70% 70%).' }
    ],
    relatedToolSlugs: ['box-shadow-generator', 'css-gradient-generator'],
  },
  {
    slug: 'minify-html-css-js',
    name: 'Minify HTML, CSS & JS',
    category: 'developer',
    shortDescription: 'Minify code by removing unnecessary whitespace, indentation, and comments.',
    longDescription: 'Compress HTML markup, CSS style rules, and JavaScript code client-side to reduce asset payloads and improve web load times.',
    icon: 'Minimize2',
    tags: ['minify', 'compress code', 'html minifier', 'css minifier', 'optimize'],
    route: '/tools/developer/minify-html-css-js',
    processingType: 'client',
    howToUse: [
      'Select code language (CSS, HTML, or JavaScript).',
      'Paste your code into the editor.',
      'Click Minify to view size savings and copy minified output.'
    ],
    faqs: [
      { question: 'Does minification break code execution?', answer: 'No, only superfluous whitespace, line breaks, and comments are stripped.' }
    ],
    relatedToolSlugs: ['json-formatter', 'markdown-to-html'],
  },
  {
    slug: 'color-converter',
    name: 'Color Converter',
    category: 'developer',
    shortDescription: 'Convert colors between HEX, RGB, HSL, HSV, and CMYK with synchronized inputs.',
    longDescription: 'Synchronized color format converter with live color preview, WCAG contrast ratio analysis against black and white, and CSS code snippets.',
    icon: 'Sparkles',
    tags: ['color converter', 'hex to rgb', 'rgb to hsl', 'cmyk', 'contrast'],
    route: '/tools/developer/color-converter',
    processingType: 'client',
    howToUse: [
      'Enter any color value (HEX, RGB, or HSL).',
      'All other format fields update immediately.',
      'Review WCAG contrast ratio for accessibility compliance.'
    ],
    faqs: [
      { question: 'What is WCAG contrast rating?', answer: 'WCAG AA requires at least 4.5:1 contrast for normal body text against its background.' }
    ],
    relatedToolSlugs: ['color-picker', 'css-gradient-generator'],
  },
  {
    slug: 'diff-checker',
    name: 'Code Diff Checker',
    category: 'developer',
    shortDescription: 'Compare code, config files, and data structures with line-by-line difference highlights.',
    longDescription: 'Side-by-side and unified difference comparison engine showing additions, deletions, and modified characters in code and config files.',
    icon: 'FileDiff',
    tags: ['diff checker', 'code diff', 'compare files', 'git diff', 'developer'],
    route: '/tools/developer/diff-checker',
    processingType: 'client',
    howToUse: [
      'Paste original code on the left and modified code on the right.',
      'Inspect highlighted additions (green) and deletions (red).',
      'Switch between split view and unified view.'
    ],
    faqs: [
      { question: 'Can I compare large files?', answer: 'Yes, in-browser diffing computes differences without network latency.' }
    ],
    relatedToolSlugs: ['text-diff', 'json-formatter'],
  },

  // --- CONVERTERS ---
  {
    slug: 'length-converter',
    name: 'Length Converter',
    category: 'converters',
    shortDescription: 'Convert between meters, feet, inches, kilometers, miles, centimeters, and yards.',
    longDescription: 'Accurate unit converter for metric and imperial length measurements with live synchronized conversion table.',
    icon: 'Ruler',
    tags: ['length', 'distance', 'meters', 'feet', 'inches', 'miles', 'converter'],
    route: '/tools/converters/length-converter',
    processingType: 'client',
    howToUse: [
      'Type value and choose source unit.',
      'Select destination unit or view all unit equivalents simultaneously.'
    ],
    faqs: [
      { question: 'How many feet are in a meter?', answer: '1 meter equals approximately 3.28084 feet.' }
    ],
    relatedToolSlugs: ['weight-converter', 'area-converter'],
  },
  {
    slug: 'weight-converter',
    name: 'Weight & Mass Converter',
    category: 'converters',
    shortDescription: 'Convert between kilograms, pounds, ounces, grams, metric tons, and stones.',
    longDescription: 'High-precision mass conversion tool covering metric and imperial measurements for shipping, fitness, and science.',
    icon: 'Scale',
    tags: ['weight', 'mass', 'kg to lbs', 'pounds', 'ounces', 'grams'],
    route: '/tools/converters/weight-converter',
    processingType: 'client',
    howToUse: [
      'Input weight amount.',
      'Pick source and target units (e.g. kg to lbs).',
      'Copy the converted figure.'
    ],
    faqs: [
      { question: 'How many pounds are in 1 kilogram?', answer: '1 kilogram equals 2.20462 pounds.' }
    ],
    relatedToolSlugs: ['length-converter', 'cooking-units-converter'],
  },
  {
    slug: 'temperature-converter',
    name: 'Temperature Converter',
    category: 'converters',
    shortDescription: 'Convert between Celsius, Fahrenheit, Kelvin, and Rankine with exact formulas.',
    longDescription: 'Instant temperature conversion utility accounting for thermal scale offsets and freezing/boiling reference points.',
    icon: 'Thermometer',
    tags: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'weather'],
    route: '/tools/converters/temperature-converter',
    processingType: 'client',
    howToUse: [
      'Enter temperature reading.',
      'Select input unit (°C, °F, K).',
      'View conversions across all scales with underlying formulas.'
    ],
    faqs: [
      { question: 'What is absolute zero?', answer: 'Absolute zero is 0 Kelvin, which equals -273.15°C or -459.67°F.' }
    ],
    relatedToolSlugs: ['speed-converter', 'weight-converter'],
  },
  {
    slug: 'area-converter',
    name: 'Area Converter',
    category: 'converters',
    shortDescription: 'Convert between square meters, square feet, acres, hectares, marlas, and kanals.',
    longDescription: 'Land and property area converter supporting international units as well as South Asian real estate standards (Marla and Kanal).',
    icon: 'Grid',
    tags: ['area', 'land', 'square feet', 'acres', 'hectares', 'marla', 'kanal'],
    route: '/tools/converters/area-converter',
    processingType: 'client',
    howToUse: [
      'Enter land measurement value.',
      'Select source and target units.',
      'View equivalent sizes in acres, square feet, marlas, and kanals.'
    ],
    faqs: [
      { question: 'How many square feet are in 1 Marla?', answer: 'In Pakistan, 1 standard Marla typically equals 225 or 272.25 square feet depending on location (225 sq ft standard).' }
    ],
    relatedToolSlugs: ['length-converter', 'mortgage-calculator'],
  },
  {
    slug: 'speed-converter',
    name: 'Speed Converter',
    category: 'converters',
    shortDescription: 'Convert between km/h, mph, meters per second, knots, and Mach.',
    longDescription: 'Velocity converter for automotive, aviation, nautical navigation, and scientific speed measurements.',
    icon: 'Gauge',
    tags: ['speed', 'velocity', 'kmh', 'mph', 'knots', 'mach'],
    route: '/tools/converters/speed-converter',
    processingType: 'client',
    howToUse: [
      'Enter speed quantity.',
      'Select source and target units (e.g. km/h to mph).',
      'Inspect converted velocity.'
    ],
    faqs: [
      { question: 'What is a knot?', answer: 'A knot is 1 nautical mile per hour, equivalent to 1.852 km/h or ~1.151 mph.' }
    ],
    relatedToolSlugs: ['fuel-cost-calculator', 'time-converter'],
  },
  {
    slug: 'time-converter',
    name: 'Time Converter',
    category: 'converters',
    shortDescription: 'Convert between seconds, minutes, hours, days, weeks, months, and years.',
    longDescription: 'Time duration converter with breakdown across all standard temporal units.',
    icon: 'Hourglass',
    tags: ['time', 'seconds', 'hours', 'days', 'weeks', 'duration'],
    route: '/tools/converters/time-converter',
    processingType: 'client',
    howToUse: [
      'Input time amount.',
      'Choose starting unit.',
      'Inspect duration in seconds, minutes, hours, and days.'
    ],
    faqs: [
      { question: 'How many seconds are in a 24-hour day?', answer: 'There are 86,400 seconds in a standard day.' }
    ],
    relatedToolSlugs: ['timestamp-converter', 'date-difference-calculator'],
  },
  {
    slug: 'data-size-converter',
    name: 'Data Size Converter',
    category: 'converters',
    shortDescription: 'Convert between Bytes, KB, MB, GB, TB, PB (decimal 1000 and binary 1024 KiB/MiB).',
    longDescription: 'Digital storage calculator supporting both decimal storage marketing units (KB, MB, GB) and binary computer memory units (KiB, MiB, GiB).',
    icon: 'HardDrive',
    tags: ['data size', 'bytes', 'mb to gb', 'storage', 'binary', 'gigabytes'],
    route: '/tools/converters/data-size-converter',
    processingType: 'client',
    howToUse: [
      'Enter storage figure.',
      'Select unit (Bytes, KB, MB, GB, TB).',
      'Toggle Decimal (1000) or Binary (1024) standard.'
    ],
    faqs: [
      { question: 'Why does a 1TB hard drive show as 931GB in Windows?', answer: 'Manufacturers define 1TB as 1,000,000,000,000 bytes, while operating systems calculate using binary multiples (1024).' }
    ],
    relatedToolSlugs: ['binary-hex-converter', 'speed-converter'],
  },
  {
    slug: 'cooking-units-converter',
    name: 'Cooking Units Converter',
    category: 'converters',
    shortDescription: 'Convert recipe units: cups, tablespoons, teaspoons, grams, and milliliters by ingredient.',
    longDescription: 'Kitchen recipe conversion calculator that accounts for ingredient density when converting between volume (cups/spoons) and weight (grams/ounces) for flour, sugar, butter, and milk.',
    icon: 'Utensils',
    tags: ['cooking', 'baking', 'cups to grams', 'tablespoons', 'recipe'],
    route: '/tools/converters/cooking-units-converter',
    processingType: 'client',
    howToUse: [
      'Select ingredient (e.g. All-Purpose Flour, Granulated Sugar, Butter).',
      'Input amount and source unit (e.g. 2 cups).',
      'Get exact weight in grams or milliliters.'
    ],
    faqs: [
      { question: 'Why does ingredient matter?', answer: '1 cup of flour weighs ~120g, whereas 1 cup of granulated sugar weighs ~200g due to differing densities.' }
    ],
    relatedToolSlugs: ['weight-converter', 'length-converter'],
  },
  {
    slug: 'number-to-words',
    name: 'Number to Words Converter',
    category: 'converters',
    shortDescription: 'Convert digits into spelled-out English words and check-writing currency formats.',
    longDescription: 'Convert numbers up to trillions into formal English text with options for standard numbers, ordinal numbers (1st, 2nd), and bank check format ("Dollars and Cents").',
    icon: 'FileDigit',
    tags: ['number to words', 'check writing', 'spelling', 'bank check', 'currency'],
    route: '/tools/converters/number-to-words',
    processingType: 'client',
    howToUse: [
      'Enter any integer or decimal number.',
      'Select format: Standard, Currency, or Ordinal.',
      'Copy the spelled-out wording.'
    ],
    faqs: [
      { question: 'Is it suitable for check writing?', answer: 'Yes! Check mode formats cents as fractions (e.g., "and 50/100").' }
    ],
    relatedToolSlugs: ['roman-numerals', 'binary-hex-converter'],
  },
  {
    slug: 'roman-numerals',
    name: 'Roman Numerals Converter',
    category: 'converters',
    shortDescription: 'Convert Roman numerals to Arabic numbers and Arabic numbers to Roman numerals.',
    longDescription: 'Bidirectional Roman numeral converter with validation for standard subtractive notation rules (I, V, X, L, C, D, M) for numbers 1 to 3,999,999.',
    icon: 'BookOpen',
    tags: ['roman numerals', 'numbers', 'converter', 'history', 'arabic numbers'],
    route: '/tools/converters/roman-numerals',
    processingType: 'client',
    howToUse: [
      'Enter Arabic number (e.g. 2026) or Roman numeral (e.g. MMXXVI).',
      'View instant conversion and step-by-step breakdown.'
    ],
    faqs: [
      { question: 'What is the highest standard Roman numeral?', answer: 'Standard notation without overlines supports up to 3,999 (MMMCMXCIX).' }
    ],
    relatedToolSlugs: ['number-to-words', 'binary-hex-converter'],
  },
  {
    slug: 'binary-hex-converter',
    name: 'Binary, Hex & Decimal Converter',
    category: 'converters',
    shortDescription: 'Convert numbers simultaneously between Binary, Octal, Decimal, and Hexadecimal.',
    longDescription: 'Programmer numeral system converter with synchronized inputs across Base-2 (Binary), Base-8 (Octal), Base-10 (Decimal), and Base-16 (Hexadecimal).',
    icon: 'Cpu',
    tags: ['binary', 'hex', 'decimal', 'octal', 'bitwise', 'developer'],
    route: '/tools/converters/binary-hex-converter',
    processingType: 'client',
    howToUse: [
      'Type into any base field (Binary, Hex, Decimal, or Octal).',
      'All other fields update immediately in real-time.',
      'Inspect bit representation and byte groupings.'
    ],
    faqs: [
      { question: 'What does 0x prefix mean?', answer: '0x denotes a hexadecimal number in programming languages.' }
    ],
    relatedToolSlugs: ['hash-generator', 'data-size-converter'],
  },

  // --- PDF TOOLS ---
  {
    slug: 'pdf-merger',
    name: 'PDF Merger',
    category: 'pdf',
    shortDescription: 'Merge multiple PDF files into a single organized document locally in your browser.',
    longDescription: 'Fast, secure PDF combiner using pdf-lib. Drag and drop multiple PDF files, reorder pages, and merge into a single PDF without server uploads.',
    icon: 'Files',
    tags: ['merge pdf', 'combine pdf', 'join', 'pdf-lib', 'documents'],
    route: '/tools/pdf/pdf-merger',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Drop 2 or more PDF documents into the dropzone.',
      'Reorder documents using the up/down arrows.',
      'Click "Merge PDFs" and download your combined document.'
    ],
    faqs: [
      { question: 'Are my PDF files uploaded to a remote server?', answer: 'Never. The entire merge process runs client-side inside your browser via WebAssembly/pdf-lib.' }
    ],
    relatedToolSlugs: ['pdf-splitter', 'pdf-rotator', 'images-to-pdf'],
  },
  {
    slug: 'pdf-splitter',
    name: 'PDF Splitter',
    category: 'pdf',
    shortDescription: 'Extract specific page ranges or split a PDF into separate individual documents.',
    longDescription: 'Split large PDF documents by entering custom page ranges (e.g. 1-3, 5, 7-10) and download extracted sub-documents instantly.',
    icon: 'Scissors',
    tags: ['split pdf', 'extract pages', 'separate', 'pdf pages'],
    route: '/tools/pdf/pdf-splitter',
    processingType: 'client',
    howToUse: [
      'Upload your PDF document.',
      'Specify page ranges to extract (e.g. "1-2, 4").',
      'Download your extracted PDF.'
    ],
    faqs: [
      { question: 'Can I extract single pages?', answer: 'Yes, simply enter individual page numbers like "1, 3, 5".' }
    ],
    relatedToolSlugs: ['pdf-merger', 'extract-pdf-pages'],
  },
  {
    slug: 'pdf-rotator',
    name: 'PDF Rotator',
    category: 'pdf',
    shortDescription: 'Rotate PDF pages permanently by 90, 180, or 270 degrees and save.',
    longDescription: 'Fix upside-down or sideways scanned PDF pages permanently with angle orientation controls.',
    icon: 'RotateCw',
    tags: ['rotate pdf', 'orientation', 'turn', 'flip pdf', 'scanned'],
    route: '/tools/pdf/pdf-rotator',
    processingType: 'client',
    howToUse: [
      'Upload the PDF file.',
      'Select rotation angle (90° clockwise, 180°, or 90° counter-clockwise).',
      'Save and download the corrected document.'
    ],
    faqs: [
      { question: 'Does this recompress the PDF?', answer: 'No, vector text and original image fidelity are preserved untouched.' }
    ],
    relatedToolSlugs: ['pdf-merger', 'pdf-splitter'],
  },
  {
    slug: 'pdf-page-numbers',
    name: 'Add PDF Page Numbers',
    category: 'pdf',
    shortDescription: 'Stamp page numbers onto PDF documents with custom position, format, and font size.',
    longDescription: 'Insert numbering ("Page X of Y", "1, 2, 3") into PDF headers or footers with customizable margin offsets and alignment.',
    icon: 'Hash',
    tags: ['page numbers', 'pdf footer', 'stamp', 'pagination', 'numbering'],
    route: '/tools/pdf/pdf-page-numbers',
    processingType: 'client',
    howToUse: [
      'Upload your PDF document.',
      'Select format ("1", "Page 1", "Page 1 of N") and position (Bottom Center, Bottom Right, etc.).',
      'Download your numbered document.'
    ],
    faqs: [
      { question: 'Can I omit numbering on the cover page?', answer: 'Yes, select starting page 2 to keep the cover page clean.' }
    ],
    relatedToolSlugs: ['pdf-watermark', 'pdf-merger'],
  },
  {
    slug: 'pdf-watermark',
    name: 'Watermark PDF',
    category: 'pdf',
    shortDescription: 'Stamp text watermarks like CONFIDENTIAL or DRAFT across PDF pages.',
    longDescription: 'Protect confidential contracts and draft reports by stamping diagonal or horizontal text watermarks with opacity and size controls.',
    icon: 'Stamp',
    tags: ['watermark pdf', 'confidential', 'draft', 'stamp', 'protect'],
    route: '/tools/pdf/pdf-watermark',
    processingType: 'client',
    howToUse: [
      'Upload the PDF document.',
      'Type watermark text (e.g. "CONFIDENTIAL" or "DRAFT").',
      'Adjust opacity, angle, and font size, then download.'
    ],
    faqs: [
      { question: 'Can watermarks be placed on all pages?', answer: 'Yes, watermarks are automatically stamped across every page in the document.' }
    ],
    relatedToolSlugs: ['pdf-page-numbers', 'pdf-merger'],
  },
  {
    slug: 'images-to-pdf',
    name: 'Images to PDF Converter',
    category: 'pdf',
    shortDescription: 'Convert multiple JPG, PNG, and WebP images into a single clean PDF document.',
    longDescription: 'Turn photo receipts, scanned book pages, or portfolio artwork into a structured PDF with page size (A4, Letter) and fit options.',
    icon: 'Images',
    tags: ['images to pdf', 'jpg to pdf', 'png to pdf', 'photos to pdf', 'scan'],
    route: '/tools/pdf/images-to-pdf',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Upload one or more image files.',
      'Reorder images and choose page orientation (Portrait or Landscape).',
      'Click Convert and download your compiled PDF.'
    ],
    faqs: [
      { question: 'What page sizes are supported?', answer: 'Standard A4 and US Letter sizes with automatic margin scaling.' }
    ],
    relatedToolSlugs: ['pdf-merger', 'image-compressor'],
  },
  {
    slug: 'extract-pdf-pages',
    name: 'Extract PDF Pages',
    category: 'pdf',
    shortDescription: 'Select and export individual pages from a PDF into a new separate document.',
    longDescription: 'Cherry-pick important pages from research papers, ebooks, or legal contracts and save them as a clean new PDF file.',
    icon: 'FileMinus',
    tags: ['extract pages', 'save pages', 'pdf extractor', 'export pages'],
    route: '/tools/pdf/extract-pdf-pages',
    processingType: 'client',
    howToUse: [
      'Upload your PDF document.',
      'Select the specific page numbers you need.',
      'Download a fresh PDF containing only the selected pages.'
    ],
    faqs: [
      { question: 'Does this alter the original file?', answer: 'No, your original file remains untouched on your computer.' }
    ],
    relatedToolSlugs: ['pdf-splitter', 'pdf-merger'],
  },

  // --- AI TOOLS ---
  {
    slug: 'paraphraser',
    name: 'AI Paraphraser',
    category: 'ai',
    shortDescription: 'Rewrite sentences, paragraphs, or essays in Fluent, Formal, Casual, or Simplified tones.',
    longDescription: 'Intelligent paraphrasing utility that restructures sentences to improve flow, clarity, and tone while preserving the original meaning.',
    icon: 'Wand2',
    tags: ['paraphrase', 'rewrite', 'rewording', 'flow', 'ai writing'],
    route: '/tools/ai/paraphraser',
    processingType: 'hybrid',
    howToUse: [
      'Paste your draft sentence or paragraph.',
      'Choose your target tone: Fluent, Formal, Casual, or Simplified.',
      'Click Paraphrase and copy your favorite rewritten version.'
    ],
    faqs: [
      { question: 'How does it protect originality?', answer: 'It restructures grammar patterns and substitutes context-aware synonyms.' }
    ],
    relatedToolSlugs: ['summarizer', 'grammar-checker', 'email-writer'],
  },
  {
    slug: 'grammar-checker',
    name: 'Grammar Checker',
    category: 'ai',
    shortDescription: 'Detect spelling mistakes, grammatical errors, and awkward phrasing with suggestions.',
    longDescription: 'Automated proofreader that highlights punctuation errors, passive voice, spelling typos, and subject-verb disagreements.',
    icon: 'SpellCheck',
    tags: ['grammar', 'spell check', 'proofread', 'editing', 'writing'],
    route: '/tools/ai/grammar-checker',
    processingType: 'hybrid',
    howToUse: [
      'Paste your writing into the proofreading box.',
      'Click Check Grammar to run diagnostic review.',
      'Review suggestions and apply fixes with one click.'
    ],
    faqs: [
      { question: 'Does it check punctuation?', answer: 'Yes, comma splices, missing periods, and apostrophe errors are detected.' }
    ],
    relatedToolSlugs: ['paraphraser', 'readability-score'],
  },
  {
    slug: 'summarizer',
    name: 'AI Text Summarizer',
    category: 'ai',
    shortDescription: 'Condense articles, papers, and transcripts into bullet points or executive summaries.',
    longDescription: 'Extract core arguments and takeaways from lengthy documents with length slider and summary style options.',
    icon: 'FileText',
    tags: ['summarize', 'summary', 'condense', 'bullet points', 'tldr'],
    route: '/tools/ai/summarizer',
    processingType: 'hybrid',
    howToUse: [
      'Paste long article text or meeting notes.',
      'Select output format: Key Bullet Points or Executive Summary paragraph.',
      'Click Summarize to generate condensed digest.'
    ],
    faqs: [
      { question: 'What is the recommended input length?', answer: 'Texts between 200 and 5,000 words yield the most balanced summaries.' }
    ],
    relatedToolSlugs: ['paraphraser', 'word-counter'],
  },
  {
    slug: 'email-writer',
    name: 'Professional Email Writer',
    category: 'ai',
    shortDescription: 'Draft polished business, follow-up, pitch, and customer service emails in seconds.',
    longDescription: 'Generate professional emails by providing simple bullet points, recipient relationship, and desired tone (Polite, Assertive, Formal).',
    icon: 'Mail',
    tags: ['email', 'email writer', 'business', 'follow up', 'communication'],
    route: '/tools/ai/email-writer',
    processingType: 'hybrid',
    howToUse: [
      'Select email purpose (Follow-up, Request, Thank You, Pitch).',
      'Provide recipient name and 2-3 key bullet points.',
      'Generate email with subject line and copy to clipboard.'
    ],
    faqs: [
      { question: 'Does it include a subject line?', answer: 'Yes, every generated email includes an attention-grabbing subject line.' }
    ],
    relatedToolSlugs: ['cover-letter-generator', 'paraphraser'],
  },
  {
    slug: 'youtube-title-generator',
    name: 'YouTube Title & Tag Generator',
    category: 'ai',
    shortDescription: 'Generate high-CTR video titles, descriptions, and tag sets for YouTube creators.',
    longDescription: 'Maximize video click-through rates with hook-driven title formulas and algorithm-optimized metadata tags.',
    icon: 'Youtube',
    tags: ['youtube titles', 'video tags', 'ctr', 'creator', 'seo'],
    route: '/tools/ai/youtube-title-generator',
    processingType: 'hybrid',
    howToUse: [
      'Enter your video topic or core theme.',
      'Select content category (Tech, Vlog, Gaming, Tutorial).',
      'Browse through high-converting title options and copy tags.'
    ],
    faqs: [
      { question: 'How are the titles optimized for CTR?', answer: 'They leverage psychological hooks, curiosity gaps, and clarity formulas proven on YouTube.' }
    ],
    relatedToolSlugs: ['youtube-thumbnail-downloader', 'caption-hashtag-generator'],
  },
  {
    slug: 'caption-hashtag-generator',
    name: 'Caption & Hashtag Generator',
    category: 'ai',
    shortDescription: 'Generate engaging captions and relevant hashtag groups for Instagram, LinkedIn, and X.',
    longDescription: 'Social media copy generator tailored to Instagram, LinkedIn, TikTok, and X with hashtag clusters designed for discoverability.',
    icon: 'Share2',
    tags: ['caption', 'hashtags', 'instagram', 'linkedin', 'social media'],
    route: '/tools/ai/caption-hashtag-generator',
    processingType: 'hybrid',
    howToUse: [
      'Describe what your photo or post is about.',
      'Select target platform (Instagram, LinkedIn, X).',
      'Copy the generated caption and hashtag cluster.'
    ],
    faqs: [
      { question: 'Are the hashtags categorized?', answer: 'Yes, hashtags are grouped into broad, niche, and trending clusters.' }
    ],
    relatedToolSlugs: ['youtube-title-generator', 'product-description-writer'],
  },
  {
    slug: 'product-description-writer',
    name: 'Product Description Writer',
    category: 'ai',
    shortDescription: 'Generate persuasive e-commerce product descriptions with features and benefits.',
    longDescription: 'Turn technical specifications and product features into compelling, benefit-focused sales copy for Shopify, Amazon, and Etsy listings.',
    icon: 'ShoppingBag',
    tags: ['product description', 'ecommerce', 'shopify', 'amazon', 'sales copy'],
    route: '/tools/ai/product-description-writer',
    processingType: 'hybrid',
    howToUse: [
      'Enter product title and key features/specs.',
      'Select brand tone (Luxury, Friendly, Technical).',
      'Generate ready-to-publish e-commerce copy.'
    ],
    faqs: [
      { question: 'Does it format with bullet points?', answer: 'Yes, it provides an engaging hook paragraph plus bulleted feature highlights.' }
    ],
    relatedToolSlugs: ['email-writer', 'caption-hashtag-generator'],
  },
  {
    slug: 'prompt-helper',
    name: 'AI Prompt Helper',
    category: 'ai',
    shortDescription: 'Refine simple ideas into structured, high-quality prompts for LLMs and AI models.',
    longDescription: 'Upgrade vague prompts into structured instructions with clear Persona, Context, Task Requirements, and Output Constraints for better AI answers.',
    icon: 'Terminal',
    tags: ['prompt engineering', 'prompt helper', 'chatgpt', 'gemini', 'claude'],
    route: '/tools/ai/prompt-helper',
    processingType: 'hybrid',
    howToUse: [
      'Type your rough prompt or question idea.',
      'Select desired output format and model type.',
      'Copy the optimized prompt structure.'
    ],
    faqs: [
      { question: 'What makes a prompt effective?', answer: 'Setting clear roles, explicit constraints, few-shot examples, and desired format.' }
    ],
    relatedToolSlugs: ['paraphraser', 'summarizer'],
  },

  // --- CREATOR & YOUTUBE TOOLS ---
  {
    slug: 'youtube-thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    category: 'creator',
    shortDescription: 'Extract and download high-resolution thumbnails (HD, 1080p, 720p) from any YouTube video.',
    longDescription: 'Download maximum resolution, high-definition, and standard thumbnails from any public YouTube URL or video ID with 1-click preview.',
    icon: 'DownloadCloud',
    tags: ['youtube thumbnail', 'download thumbnail', 'yt thumbnail', 'creator'],
    route: '/tools/creator/youtube-thumbnail-downloader',
    isPopular: true,
    processingType: 'client',
    howToUse: [
      'Paste any YouTube video URL or 11-character video ID.',
      'Preview thumbnails in Max Res (1080p), High (720p), and Medium.',
      'Click Download to save the image to your device.'
    ],
    faqs: [
      { question: 'What formats of URLs are supported?', answer: 'Standard links (youtube.com/watch?v=...), short links (youtu.be/...), and Shorts (youtube.com/shorts/...).' }
    ],
    relatedToolSlugs: ['thumbnail-maker', 'youtube-earnings-calculator'],
  },
  {
    slug: 'youtube-earnings-calculator',
    name: 'YouTube Earnings Calculator',
    category: 'creator',
    shortDescription: 'Estimate YouTube channel revenue based on daily views, video niche, and CPM rates.',
    longDescription: 'Estimate daily, monthly, and yearly AdSense earnings using interactive view sliders and niche CPM benchmarks (Finance, Tech, Lifestyle, Gaming).',
    icon: 'TrendingUp',
    tags: ['youtube earnings', 'revenue', 'cpm', 'rpm', 'monetization', 'adsense'],
    route: '/tools/creator/youtube-earnings-calculator',
    processingType: 'client',
    howToUse: [
      'Adjust the daily video views slider.',
      'Select your channel niche or set custom CPM/RPM ($0.50 to $25).',
      'View estimated monthly and annual revenue potential.'
    ],
    faqs: [
      { question: 'What is the difference between CPM and RPM?', answer: 'CPM is what advertisers pay per 1,000 ad impressions; RPM is what the creator actually pockets after YouTube\'s 45% revenue cut.' }
    ],
    relatedToolSlugs: ['youtube-thumbnail-downloader', 'percentage-calculator'],
  },
  {
    slug: 'youtube-tag-extractor',
    name: 'YouTube Tag Extractor',
    category: 'creator',
    shortDescription: 'Extract public SEO keywords and video tags from YouTube videos.',
    longDescription: 'Analyze successful competitor video tags and topic keywords to improve search discoverability for your own uploads.',
    icon: 'Tags',
    tags: ['youtube tags', 'tag extractor', 'video keywords', 'seo', 'creator'],
    route: '/tools/creator/youtube-tag-extractor',
    processingType: 'client',
    howToUse: [
      'Paste the YouTube video link or title topic.',
      'Extract discovered tags and keywords.',
      'Copy individual tags or copy all as a comma-separated list.'
    ],
    faqs: [
      { question: 'Can private video tags be extracted?', answer: 'No, only public video tags embedded in metadata can be accessed.' }
    ],
    relatedToolSlugs: ['youtube-title-generator', 'youtube-thumbnail-downloader'],
  },
  {
    slug: 'channel-name-generator',
    name: 'Channel Name Generator',
    category: 'creator',
    shortDescription: 'Generate creative YouTube, TikTok, and Twitch channel names by niche and style.',
    longDescription: 'Brainstorm memorable brand names for content creators across Gaming, Tech, Cooking, Vlogging, Fitness, and Education.',
    icon: 'Radio',
    tags: ['channel name', 'youtube name', 'gamertag', 'branding', 'creator'],
    route: '/tools/creator/channel-name-generator',
    processingType: 'client',
    howToUse: [
      'Select your content niche and brand personality.',
      'Enter an optional keyword or topic.',
      'Click Generate and copy your favorite names.'
    ],
    faqs: [
      { question: 'Are these names checked for handle availability?', answer: 'Check your favorite handle on YouTube or namecheckers to confirm availability before creating your account.' }
    ],
    relatedToolSlugs: ['username-generator', 'youtube-title-generator'],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_REGISTRY.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((t) => t.category === category);
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((t) => t.isPopular);
}
