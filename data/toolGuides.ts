import type { GuideSection, ToolFAQ } from '@/types/tools';

/**
 * Server-rendered editorial content shown below the interactive tool.
 * Keys are tool slugs. Content is plain text with **bold** and
 * [label](/path) inline markup — rendered by ToolGuideSections.
 */
export interface ToolGuide {
  slug: string;
  /** ISO date (yyyy-mm-dd) the guide content was last fact-checked. */
  lastReviewed: string;
  sections: GuideSection[];
  /** Extra FAQs merged into the page's FAQ section and FAQPage JSON-LD. */
  extraFaqs?: ToolFAQ[];
}

export const TOOL_GUIDES: Record<string, ToolGuide> = {
  'pakistan-income-tax': {
    slug: 'pakistan-income-tax',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'How income tax on salary works in Pakistan',
        paragraphs: [
          'Pakistan taxes salaried individuals on a **progressive slab** system. Each slice of your annual income is taxed at the rate set for that slice, so a pay rise does not push your whole salary into a higher rate. The **Pakistan Income Tax Calculator** applies the slabs set out in the **Finance Act 2026**, which took effect on **1 July 2026** for **Tax Year 2026-27**.',
          'Every figure on this page is annual. Monthly tax is simply the annual figure divided by 12, which is the amount an employer withholds from your salary each month. For the wider picture of slabs, filing dates and reliefs, read our [Pakistan income tax guide](/blog/complete-guide-to-pakistan-income-tax-2025).',
          'The calculator works from your annual income. Enter a monthly salary and it is scaled to a full year before the slabs are applied, then the annual result is divided by 12 again to show the monthly withholding. That is the same sequence an employer follows when it deducts tax from a payslip each month.',
        ],
      },
      {
        heading: 'Tax slabs for Tax Year 2026-27',
        paragraphs: [
          'These are the annual tax slabs for **salaried individuals** under the Finance Act 2026. The rate in each band applies only to the income that falls inside that band, never to the whole amount. Annual income up to **Rs 600,000** — the equivalent of Rs 50,000 a month — sits in the tax-free band.',
        ],
        table: {
          headers: ['Annual taxable income (PKR)', 'Tax rate'],
          rows: [
            ['Up to Rs 600,000', '0% (tax-free)'],
            ['Rs 600,001 – Rs 1,200,000', '1% of the amount exceeding Rs 600,000'],
            ['Rs 1,200,001 – Rs 2,200,000', 'Rs 6,000 + 11% of the amount exceeding Rs 1,200,000'],
            ['Rs 2,200,001 – Rs 3,200,000', 'Rs 116,000 + 20% of the amount exceeding Rs 2,200,000'],
            ['Rs 3,200,001 – Rs 4,100,000', 'Rs 316,000 + 25% of the amount exceeding Rs 3,200,000'],
            ['Rs 4,100,001 – Rs 5,600,000', 'Rs 541,000 + 29% of the amount exceeding Rs 4,100,000'],
            ['Rs 5,600,001 – Rs 7,000,000', 'Rs 976,000 + 32% of the amount exceeding Rs 5,600,000'],
            ['Above Rs 7,000,000', 'Rs 1,424,000 + 35% of the amount exceeding Rs 7,000,000'],
          ],
          caption: 'Salaried individuals — annual slabs for Tax Year 2026-27 (Finance Act 2026), effective 1 July 2026.',
        },
      },
      {
        heading: 'Worked examples',
        paragraphs: [
          '**Monthly salary Rs 100,000.** That is Rs 1,200,000 a year. Only the amount above Rs 600,000 is taxed, at 1%: 1% × 600,000 = **Rs 6,000 a year**, which is **Rs 500 a month**. Take-home pay is Rs 99,500 a month before any other deduction.',
          '**Monthly salary Rs 250,000.** That is Rs 3,000,000 a year, which falls in the Rs 2,200,001 to Rs 3,200,000 band: Rs 116,000 + 20% of the Rs 800,000 that exceeds Rs 2,200,000 = Rs 116,000 + Rs 160,000 = **Rs 276,000 a year**, or **Rs 23,000 a month**.',
          '**Monthly salary Rs 400,000.** That is Rs 4,800,000 a year, inside the Rs 4,100,001 to Rs 5,600,000 band: Rs 541,000 + 29% of the Rs 700,000 that exceeds Rs 4,100,000 = Rs 541,000 + Rs 203,000 = **Rs 744,000 a year**, or **Rs 62,000 a month**.',
          'Notice that none of these totals equal a flat percentage of the whole salary. That is the progressive system doing its job: the early slices stay in the low bands no matter how high the rest climbs.',
          'On the same basis, take-home pay is Rs 227,000 a month on a Rs 250,000 salary and Rs 338,000 on a Rs 400,000 salary — gross minus the tax calculated above. A bonus or arrears payment works the same way: each slab applies only to the income inside its own band, so extra pay is never taxed wholesale at your top rate.',
        ],
      },
      {
        heading: 'How to use the Pakistan income tax calculator',
        paragraphs: [
          'Enter your gross salary as a monthly or annual figure in PKR and choose **Salaried Individual**. The result shows your **monthly income tax**, your **annual income tax**, and your **net take-home salary** for the period you entered.',
          'Gross and net sit side by side, so you can read the deduction and the take-home for the same period without doing the subtraction yourself. That makes it easy to test a raise, a joining bonus or a change in benefits before you commit to anything.',
        ],
        list: [
          'Use a monthly figure to check the deduction on a payslip or a new job offer.',
          'Use an annual figure when you are planning for the tax year or comparing salary bands.',
          'Re-run the figure after a raise or bonus to see which slab the extra income reaches.',
          'Browse the [calculators](/tools/calculators) index for related payroll and finance tools.',
        ],
      },
      {
        heading: 'Before you rely on the number',
        paragraphs: [
          'Treat every result as an **estimate**. Surcharge, exemptions and tax credits can all change your final liability, and approved investments or [Zakat](/tools/calculators/zakat-calculator) contributions may reduce what you owe under the rules. The figures here cover salaried income only, so business income and capital gains follow different rates.',
          'For a filing-ready figure, confirm the amount with FBR or a tax advisor. When you are comparing offers, or checking take-home against a role elsewhere, the [Salary After Tax Calculator](/tools/calculators/salary-after-tax) gives a quick net-pay comparison on a generic bracket set.',
          'Keep the tax year in mind when you quote a number. Band widths and rates change with each Finance Act, so a figure worked out for an earlier year will not match Tax Year 2026-27, and online articles rarely say which year they used.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'Which tax year does this calculator use?',
        answer:
          'It uses the salaried individual slabs for Tax Year 2026-27, as set out in the Finance Act 2026 and effective from 1 July 2026. Earlier tax years used different bands, so check the date on any figure you compare.',
      },
      {
        question: 'Is my whole salary taxed at one rate?',
        answer:
          'No. Pakistan applies progressive slabs: only the slice of income inside each band is taxed at that band\'s rate. Tax on Rs 3,000,000 is therefore not a flat 20% of Rs 3,000,000.',
      },
      {
        question: 'Does the result include surcharge and exemptions?',
        answer:
          'The output is a slab-based estimate. Surcharge, exemptions and tax credits can change your final liability, so confirm any figure you intend to file with FBR or a tax advisor.',
      },
    ],
  },

  'image-compressor': {
    slug: 'image-compressor',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What an image compressor does',
        paragraphs: [
          'An image compressor reduces the file size of a photo or graphic while keeping it looking close to the original. Smaller images load faster on a website, free up space on a device, and clear the size caps that job portals, exam forms and admission systems place on uploads.',
          'Compression here runs **entirely in your browser**, so the file is read on your device and never uploaded to a server. Most photo compression is **lossy**: the encoder discards detail that is hard to notice and packs what remains more tightly. PNG stays **lossless**, which keeps every pixel exact but leaves less to trim. In practice photographs often shrink dramatically — this tool is built around reductions of up to **80%** without a visible drop in quality.',
          'Compression earns its keep whenever a file is too heavy for its job: a blog photo, a hero image on a landing page, an avatar, or an upload capped at a few hundred kilobytes. Screenshots full of small text need more care, because tiny text stays crisp only while the quality setting stays high.',
        ],
      },
      {
        heading: 'How to compress an image',
        list: [
          'Drag and drop an image into the dropzone, or click to select one.',
          'Move the **quality slider** and compare the before and after preview.',
          'Zoom in on faces, text and edges to confirm the detail still holds.',
          'Check the size reduction against the original file size.',
          'Download the optimised image. The original file on your device is left untouched.',
        ],
      },
      {
        heading: 'Choosing a quality setting',
        paragraphs: [
          'There is no single correct number. Start around **80%** for images you plan to publish, then lower the slider until the file clears the limit you need and the preview still looks clean. Inspect at full zoom: faces, fine text and hard edges show compression artefacts first.',
          'Quality reductions are not linear. The first step down from full quality usually saves more file size than the steps that follow, while each further step costs more visible detail. If the preview starts to look blotchy around sharp edges, you have gone far enough.',
          'Match the format to the job. **JPG** suits photographs, **PNG** suits graphics and screenshots with transparency, and **WebP** usually delivers a smaller file at similar quality for web use.',
        ],
      },
      {
        heading: 'Compress, resize or convert?',
        paragraphs: [
          'Compressing only changes how the image is encoded; the pixel dimensions stay the same. When a file is far larger in pixels than where it will be displayed, the [Image Resizer](/tools/images/image-resizer) cuts the dimensions first and usually saves more space. When a portal demands a strict cap such as 50KB or 100KB, [Compress to Target Size](/tools/images/compress-to-size) tunes quality until the file fits. When you need a different format altogether, use the [Image Converter](/tools/images/image-converter).',
          'For a step-by-step walkthrough of quality settings and trade-offs, see our [guide to compressing images without quality loss](/blog/how-to-compress-images-without-quality-loss).',
          'Whichever route you take, keep the untouched original. Compression writes a new file, so the master copy stays at full quality for later edits, re-exports or a stricter size limit down the line.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'What quality percentage should I use?',
        answer:
          'Around 80% is a sensible starting point for photographs. Raise it for images with fine detail or small text, and lower it when you must hit a strict file size limit. Judge by the preview rather than the number alone.',
      },
      {
        question: 'Does compressing change my image format?',
        answer:
          'No. A PNG stays a PNG and a JPG stays a JPG. Use an image converter when you need to switch formats rather than shrink the file.',
      },
      {
        question: 'Should I compress or resize first?',
        answer:
          'If the image is much larger in pixels than where it will be shown, resize first and then compress. Reducing dimensions usually saves more space than re-encoding alone, and it avoids shipping pixels nobody will see.',
      },
    ],
  },

  'word-counter': {
    slug: 'word-counter',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What a word counter measures',
        paragraphs: [
          'A word counter tallies the basic statistics of a piece of writing: **words**, **characters** with and without spaces, sentences, paragraphs and lines. It also estimates **reading time** and speaking time, which is useful when a script, article or caption has to fit a time limit.',
          'Reading time is based on an average of **200 words per minute**, so a 1,000-word draft runs to roughly five minutes at that pace. Speaking time is estimated separately, since reading and talking run at different speeds.',
          'Character counts come in two flavours: **with spaces**, which is the figure most platforms quote, and **without spaces**, which is useful when you are checking how dense a passage is.',
        ],
      },
      {
        heading: 'Reading the statistics',
        paragraphs: ['Each metric answers a slightly different question:'],
        list: [
          '**Words** — length against a brief, a word cap or a reading time.',
          '**Characters** — limits on meta descriptions, captions, forms and messages.',
          '**Sentences** — a quick signal of whether paragraphs have grown unwieldy.',
          '**Paragraphs and lines** — structure, and whether a block is too dense for the screen it sits on.',
          '**Reading time** — whether a draft fits the slot you have in mind.',
        ],
      },
      {
        heading: 'How to use the word counter',
        paragraphs: ['Type or paste your text straight into the editor. Every metric updates as you write, so there is nothing to submit.'],
        list: [
          'Paste a full draft to see its length in one go.',
          'Watch the sentence and paragraph counts while you restructure.',
          'Copy the statistics, or copy the text itself, with a single click.',
        ],
      },
      {
        heading: 'Why word count matters',
        paragraphs: [
          'Limits arrive from every direction: academic word caps, meta descriptions of a fixed length, subtitles and social posts that must fit a box, briefs that ask for 1,200 words. A live count tells you where you stand before you start cutting.',
          'Length is only a rough proxy for quality. Once the count is right, check how the piece reads with the [Readability Score](/tools/text/readability-score), and switch to the [Character Counter](/tools/text/character-counter) when the limit is counted in characters rather than words — meta descriptions and post captions, for example.',
          'A word counter measures volume, not correctness, so give the draft a proofreading pass with a [Grammar Checker](/tools/ai/grammar-checker) before you publish. It also keeps parallel content honest: two answers in an exam, two sections of a report or two captions in a series should not run wildly different lengths unless you mean them to.',
        ],
        list: [
          'Words are split on whitespace, so a hyphenated term such as decision-making counts as one word.',
          'Punctuation attached to a word does not add to the character count without spaces.',
          'Reading and speaking times are estimates at 200 words per minute, not exact durations.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'How many words is a page?',
        answer:
          'There is no fixed answer. A single-spaced page of 12pt text holds roughly 500 words, while a double-spaced page holds closer to 250. Check the count your brief or institution asks for rather than the page count.',
      },
      {
        question: 'Does it count hyphenated words and numbers correctly?',
        answer:
          'Words are separated by whitespace. A hyphenated term such as decision-making counts as one word, and a number such as 2026 counts as one word too.',
      },
      {
        question: 'Does it work for languages written without spaces?',
        answer:
          'For scripts written without spaces, such as Chinese and Japanese, character counts are more meaningful than word counts. Use the character count for those languages.',
      },
    ],
  },

  'pdf-merger': {
    slug: 'pdf-merger',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What a PDF merger does',
        paragraphs: [
          'A PDF merger takes two or more separate PDF files and combines them into a single document, in the order you choose. It is the quickest way to turn scattered scans, invoices, contract pages or application forms into one file you can send.',
          'This merger runs **entirely in your browser**. Files are read on your device and the combined document is built locally, so confidential paperwork is never uploaded to a server. Our [browser-side tools guide](/blog/how-browser-side-tools-protect-privacy) explains how to verify that kind of claim for any tool you use.',
        ],
      },
      {
        heading: 'How to merge PDF files',
        paragraphs: [
          'Order decides everything: the first file you add becomes the opening pages of the output and the last becomes the tail. Fix the sequence with the arrows rather than starting over — the merge builds the new document from the list exactly as you see it.',
        ],
        list: [
          'Drop **two or more** PDF documents into the dropzone.',
          'Reorder them with the up and down arrows until the sequence is right.',
          'Click **Merge PDFs** and download the combined document.',
          'Your original files stay exactly as they were — the merge produces a new file.',
        ],
      },
      {
        heading: 'When merging is the right move',
        paragraphs: [
          'Most merge jobs fall into the same few patterns. Files often arrive in pieces — scans sent as separate attachments, a cover page issued separately, or an application split into a form and its supporting documents.',
        ],
        list: [
          'Join scanned pages from a phone into one document ready for submission.',
          'Attach a signed cover page to the rest of a report.',
          'Assemble a month of invoices or receipts into a single file for an accountant.',
          'Put chapters, appendices or tender documents back into reading order.',
        ],
      },
      {
        heading: 'Merge, split or rotate?',
        paragraphs: [
          'Merging is only one direction of the job. When one document should become several, the [PDF Splitter](/tools/pdf/pdf-splitter) extracts page ranges on demand. If scanned pages arrived sideways, the [PDF Rotator](/tools/pdf/pdf-rotator) corrects the orientation first — fixing orientation before you combine is far easier than rotating pages afterwards.',
          'Working from photos or flat scans instead of PDFs? [Images to PDF](/tools/pdf/images-to-pdf) turns them into a single paged document that you can then merge with everything else.',
        ],
      },
      {
        heading: 'Tips for a clean merge',
        paragraphs: [
          'Check the page order before you download: a cover page buried in the middle is the most common mistake. Keep related files together — invoices for one month, chapters in sequence, form pages in the order the application expects them. Clear filenames such as 01-cover, 02-form, 03-annexes make the order obvious at a glance.',
          'Because processing happens on your device, there is no server upload cap to work around. Very large files simply take longer to combine and use more of your device memory, and scan-heavy documents stay large because every page keeps its images intact.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'Is there a limit to how many PDFs I can merge?',
        answer:
          'Processing runs locally, so there is no server-side file cap. The practical limit is your device memory: extremely large documents take longer to combine.',
      },
      {
        question: 'Does merging reduce PDF quality?',
        answer:
          'No. Existing pages are copied into the new file rather than re-rendered, so text, vector graphics and embedded images keep their original quality.',
      },
      {
        question: 'Can I merge a password-protected PDF?',
        answer:
          'An encrypted PDF has to be unlocked before its pages can be read. Remove the password — with the owner\'s permission — and then merge the unlocked copy.',
      },
    ],
  },

  'json-formatter': {
    slug: 'json-formatter',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What a JSON formatter does',
        paragraphs: [
          'A JSON formatter takes dense, minified or hand-written JSON and rewrites it with consistent indentation so the structure is readable at a glance. The same tool validates the data: when the syntax is wrong, it reports the **line and column** where parsing failed.',
          'Formatting changes whitespace only. Values, key order and nesting come out exactly as they went in, which makes it safe to run over API responses and configuration files before you edit them.',
          'JSON turns up constantly: request and response bodies, configuration files, package manifests, environment exports. It is plain text built from objects, arrays, strings, numbers, booleans and null, so it is easy to read once the whitespace and indentation are back in place.',
        ],
      },
      {
        heading: 'How to format and validate JSON',
        list: [
          'Paste the raw JSON into the editor.',
          'Click **Format** to prettify with clean indentation, or **Minify** to strip whitespace for transport.',
          'Fix any error the validator flags, then copy or download the result.',
        ],
      },
      {
        heading: 'Prettify or minify?',
        paragraphs: [
          '**Prettified** output adds line breaks and indentation so nested structures are legible. That is what you want in a config file, a code review or a debugging session, because a misplaced bracket is obvious when each level sits on its own line.',
          '**Minified** output strips every space and line break that does not affect meaning, so the payload is as compact as it can be. That suits request bodies, cached responses and anything a machine will read straight back. Both forms carry identical data, and validation runs the same way on either.',
        ],
      },
      {
        heading: 'Common JSON errors',
        paragraphs: ['JSON is stricter than a JavaScript object literal. These catch most people:'],
        list: [
          'A **trailing comma** after the last item in an object or array.',
          'Single quotes around keys or strings — JSON requires double quotes.',
          'Unescaped quotation marks or backslashes inside a string.',
          'A missing comma between items, or an unclosed bracket or brace.',
          'Comments, which strict JSON does not allow.',
        ],
      },
      {
        heading: 'What to do with the result',
        paragraphs: [
          'Once the data is clean, move it where it needs to go. [JSON to CSV](/tools/developer/json-to-csv) flattens an array of objects into a spreadsheet for analysis, and [CSV to JSON](/tools/developer/csv-to-json) converts a spreadsheet export back into structured data. When the JSON sits inside a token, the [JWT Decoder](/tools/developer/jwt-decoder) reads its claims without sending the token anywhere.',
          'Formatted JSON is also far easier to compare. Prettify both versions before you check them against each other with the [Code Diff Checker](/tools/developer/diff-checker), and a changed key or a dropped field jumps out immediately instead of hiding inside one long line.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'Does formatting change my data?',
        answer:
          'No. It only alters whitespace and line breaks. Keys, values and their order stay exactly as you pasted them.',
      },
      {
        question: 'Why is a trailing comma an error?',
        answer:
          'Strict JSON does not allow a comma after the final item in an object or array. The validator flags it because parsers reject the document outright.',
      },
      {
        question: 'What is the difference between a JSON object and a JSON array?',
        answer:
          'An object is a set of key-value pairs wrapped in curly braces. An ordered list of values wrapped in square brackets is an array. Either can contain the other, which is exactly why indentation makes nested data readable.',
      },
    ],
  },

  'qr-code-generator': {
    slug: 'qr-code-generator',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What a QR code generator does',
        paragraphs: [
          'A QR code generator turns text into a square barcode that any phone camera can scan. The data is stored **inside the pattern itself** — a link, a plain message, a WiFi login or a contact card — so the code does not depend on a lookup service staying online.',
          'The codes produced here are **static**: they encode the data directly and never expire. Scanning one does not need an internet connection; a connection is only required when the code opens a website.',
          'A camera reads the grid of light and dark modules, finds the three large squares that mark the corners, uses them to work out the angle and size, then decodes the message inside — the same job a barcode scanner does, only in two directions at once.',
        ],
      },
      {
        heading: 'How to create a QR code',
        list: [
          'Choose the data type: **URL**, **plain text** or **WiFi**.',
          'Enter the content, then adjust colours and size to suit the design.',
          'Download as **PNG** for everyday use, or **SVG** when you need vector quality for print.',
        ],
      },
      {
        heading: 'What to encode — and how to keep it scannable',
        paragraphs: [
          'Typical uses include WiFi details for a guest network, a link to a menu or portfolio, event information, and a vCard so a new contact can save your details in a single scan.',
          'Two things decide whether a code actually scans. **Contrast** comes first: keep dark dots on a light background and avoid low-contrast colour pairs. **Size** comes next: a code on a business card can be small because it is read from a few centimetres, while a code on a poster or sign must be large enough for each module to stay clear from the distance people will stand.',
          'Higher **error correction** levels let a code survive smudges, print damage or a small logo placed in the centre, because the encoding carries redundant data.',
        ],
      },
      {
        heading: 'Test before you print',
        paragraphs: [
          'View or print the code at the size it will actually be used, then scan it from the real distance with more than one phone if you can. A code that reads perfectly at ten centimetres on your desk can fail from two metres away on a sign.',
          'Leave clear space around the code so a scanner can find its edges, and avoid laying it over a busy photograph that hides the modules. Once a code is printed on hundreds of leaflets, a scan failure is expensive to fix.',
        ],
      },
      {
        heading: 'QR codes and barcodes',
        paragraphs: [
          'A traditional barcode stores a short string in one dimension. A QR code stores far more in two dimensions, which is why it can hold a full URL or a WiFi password where a barcode would not.',
          'For retail-style labels and packaging, use the [Barcode Generator](/tools/generators/barcode-generator). When you need a machine-readable identifier to embed in a code or link, the [UUID Generator](/tools/generators/uuid-generator) produces one that will never collide.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'Can a QR code store a WiFi password?',
        answer:
          'Yes. Choose the WiFi data type and enter the network name, password and security type. A phone that scans the code can join the network without anyone typing the password.',
      },
      {
        question: 'What is error correction in a QR code?',
        answer:
          'Error correction adds redundant data so a code can still be read when part of it is smudged, damaged or covered. Higher levels tolerate more damage, and some designs place a small logo in the centre.',
      },
      {
        question: 'Do I need an app to scan a QR code?',
        answer:
          'Usually not. The camera app built into recent iOS and Android phones scans QR codes natively, so a separate scanner app is rarely necessary.',
      },
    ],
  },

  'password-generator': {
    slug: 'password-generator',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What a password generator does',
        paragraphs: [
          'A password generator builds a random string from the character sets you enable — uppercase, lowercase, digits and symbols — and shows it instantly. Random characters give an attacker nothing to work from, unlike a familiar word dressed up with substitutions.',
          'Generation uses your browser\'s **cryptographic random source**, and the result is never saved or sent anywhere. Our [browser-side tools guide](/blog/how-browser-side-tools-protect-privacy) shows how to check that kind of claim in a few clicks.',
        ],
      },
      {
        heading: 'How to generate a strong password',
        paragraphs: [
          'If a site caps length or rejects symbols, generate with whatever the field accepts and go as long as it allows — the length slider runs to 64 characters, which is more than any sign-up form needs. Even in a short field, randomness still beats familiarity.',
        ],
        list: [
          'Set the length — **16 characters or more** buys real strength for very little cost.',
          'Keep all four character types on unless the site you are signing up to rejects symbols.',
          'Generate, then **copy** the password straight into your password manager.',
          'Generate a fresh one for every account and never reuse a password.',
        ],
      },
      {
        heading: 'What makes a password strong',
        paragraphs: [
          'Length matters more than cleverness. A 16-character random string has vastly more combinations than a short password with a number bolted on, and length is what defeats guessing and brute-force attempts.',
          'Uniqueness matters just as much. One leaked password should not open your email, your bank and your work accounts, so give every service its own generated string. If you have to remember something by hand, a **passphrase** — several unrelated random words in a row — trades a little strength for memorability.',
        ],
      },
      {
        heading: 'Passwords worth avoiding',
        paragraphs: [
          'Attackers work through leaked lists and dictionaries of common passwords before they try anything clever, so anything guessable from public information falls quickly.',
        ],
        list: [
          'Dictionary words with a number bolted on, such as summer2026.',
          'Names, birthdays, phone numbers or details from your own profile.',
          'Keyboard runs such as qwerty or 123456, and repeated characters.',
          'The same password reused across several sites.',
        ],
      },
      {
        heading: 'Storing what you generate',
        paragraphs: [
          'The tool shows a **strength score** based on length and the size of the character pool: longer strings drawn from more sets score higher. Treat it as a way to compare two options, not as a guarantee.',
          'Store results in a password manager rather than trying to memorise them; you only need to remember the manager\'s master password. Developers who need a stable identifier rather than a secret can use the [UUID Generator](/tools/generators/uuid-generator), and the [Hash Generator](/tools/developer/hash-generator) produces a one-way fingerprint of any text.',
          'Treat the password as one layer rather than the whole lock. Turn on two-factor authentication wherever a service offers it, so that a leaked password on its own stops being enough.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'What is a passphrase?',
        answer:
          'A passphrase is a password made from several random words joined together, typically four. It is easier to type and remember than a symbol-heavy string, and its strength comes from length and unpredictability.',
      },
      {
        question: 'What does the strength score mean?',
        answer:
          'It is an estimate based on the password length and the number of character types in use. Longer strings drawn from a wider pool score higher. Use it to compare options, not as a guarantee of security.',
      },
      {
        question: 'Where should I keep generated passwords?',
        answer:
          'In a password manager. You memorise one master password and the manager fills in the rest, which lets every account hold a unique string without you having to remember any of them.',
      },
    ],
  },

  'percentage-calculator': {
    slug: 'percentage-calculator',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What a percentage calculator does',
        paragraphs: [
          'A percentage calculator answers the three questions people actually ask: **what is X% of Y**, **what percent is A of B**, and **what is the percentage change from A to B**. Each is a short arithmetic step, but doing them by hand under time pressure is where mistakes creep in.',
          'The change formula is: subtract the old value from the new value, divide by the old value, then multiply by 100. A positive result is an increase and a negative result is a decrease.',
        ],
      },
      {
        heading: 'Common percentage problems, worked',
        list: [
          '**What is 15% of 240?** 240 × 15 ÷ 100 = **36**.',
          '**20 is what percent of 80?** 20 ÷ 80 × 100 = **25%**.',
          '**What is the increase from 30 to 45?** 15 ÷ 30 × 100 = **50%**.',
          '**What is 20% off a bill of 4,500?** 4,500 × 20 ÷ 100 = 900, so you pay **3,600**.',
        ],
        paragraphs: [
          'Work each one in two steps — find the amount, then compare it with the base — then sanity-check the result. For 15% of 240, 10% is 24 and 5% is 12, so 36 is right: 10% and 5% are the quickest anchors, being a tenth and a twentieth of the same base.',
        ],
      },
      {
        heading: 'How to use the calculator',
        paragraphs: [
          'Pick the formula that matches your question, type the values into the fields, and read the result together with the formula that produced it. The explanation updates as you type, which makes it easy to check a shop\'s discount claim or a student\'s working.',
        ],
      },
      {
        heading: 'The four formulas behind the tool',
        list: [
          '**X% of Y** = Y × X ÷ 100.',
          '**A as a percentage of B** = A ÷ B × 100.',
          '**Percentage change** = (new − old) ÷ old × 100.',
          '**Original price from a reduced one** = new ÷ (1 − rate ÷ 100).',
        ],
        paragraphs: [
          'A decrease follows the same rule as an increase with the sign flipped: falling from 80 to 60 is a drop of 20 ÷ 80 = **25%**. Note that equal percentages do not cancel out — a 50% rise and a 50% fall do not return you to the start, because the second percentage applies to a different base.',
        ],
      },
      {
        heading: 'Where percentages turn up',
        paragraphs: [
          'Discounts and markdowns are percentages of an original price, and stacked offers apply one reduced figure after another — the [Discount Calculator](/tools/calculators/discount-calculator) handles that case. On a bill, a percentage is added as a tip or as tax: the [Tip Calculator](/tools/calculators/tip-calculator) splits the total, and the [VAT / GST / Sales Tax Calculator](/tools/calculators/vat-gst-sales-tax) both adds a rate to a net amount and pulls it back out of a tax-inclusive total.',
          'Percentages also appear in grades, markups, growth rates and any comparison where the size of a change matters more than the raw numbers.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'How do I find the original number before a percentage increase?',
        answer:
          'Divide the new value by one plus the rate as a decimal. If a figure of 260 came after a 30% increase, then 260 ÷ 1.3 = 200.',
      },
      {
        question: 'What is the difference between percent and percentage points?',
        answer:
          'Percentage points measure the arithmetic gap between two rates, while percent measures relative change. A rate moving from 10% to 15% is a rise of 5 percentage points, which is a 50% increase.',
      },
      {
        question: 'How do I calculate a grade as a percentage?',
        answer:
          'Divide the marks you scored by the marks available, then multiply by 100. A score of 42 out of 60 is 42 ÷ 60 × 100 = 70%.',
      },
    ],
  },

  'resume-builder': {
    slug: 'resume-builder',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What the resume builder does',
        paragraphs: [
          'The resume builder turns your details into a structured, modern CV with a live preview beside the form. It has sections for **contact information, a short summary, work experience, education and skills**, and the preview updates as you type, so you can judge the layout while you write.',
          'Everything stays in your browser. Your work history is not uploaded to a server, which matters for a document carrying your address, phone number and employment history.',
        ],
      },
      {
        heading: 'How to build your resume',
        paragraphs: [
          'Work top to bottom. The live preview shows how much space each section takes, so you can see the trade-off between another bullet point and your page limit before you commit to it.',
        ],
        list: [
          'Fill in contact details first — they anchor the rest of the layout.',
          'Write a two or three line summary aimed at the role you want.',
          'Add experience in reverse-chronological order, most recent first.',
          'Preview as you go and trim anything that pushes you past the length you need.',
          'Print the finished document, or export it as a PDF.',
        ],
      },
      {
        heading: 'What to include',
        paragraphs: [
          'Keep the summary short: who you are, what you do, and the one or two results worth noticing. Under experience, favour outcomes over duties — responsibilities describe a job, results describe you.',
          'List skills you could be questioned about in an interview. Drop older roles once they stop supporting the story, and cut anything that does not help the application in front of you.',
        ],
        list: [
          '**Contact** — city, phone, professional email, and a portfolio or profile link where it helps.',
          '**Summary** — two or three lines written for the role you are applying to.',
          '**Experience** — role, employer, dates, and a few outcome-focused points for each recent position.',
          '**Education** — qualification, institution and year; keep it brief once experience carries the page.',
          '**Skills** — a focused list you can be questioned on, not a wish list.',
        ],
      },
      {
        heading: 'Before you send it',
        paragraphs: [
          'Applications usually read better at one page for early-career candidates and no more than two for experienced ones. Check your length with the [Word Counter](/tools/text/word-counter), tighten the summary until it reads cleanly using the [Readability Score](/tools/text/readability-score), then export a PDF so the layout survives being opened on someone else\'s machine.',
          'Pair the resume with a tailored letter from the [Cover Letter Generator](/tools/generators/cover-letter-generator) to cover the context a resume cannot fit.',
          'Export a fresh copy for each application once you have tailored it, and give the file a clear name — firstname-lastname-role.pdf is far easier for a recruiter to find again than resume-final-v3.pdf. Re-export after every edit, since the PDF captures the document exactly as it stood when you exported it. Finally, read the whole thing aloud once: anything you stumble over is likely to trip up an interviewer too.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'What file format should I submit?',
        answer:
          'A PDF keeps your layout intact on any device, so export and attach that file. Only send another format if the application specifically asks for one.',
      },
      {
        question: 'Can I edit my resume after exporting?',
        answer:
          'Yes. Your details stay in the browser, so change anything and export again. Keep one master version and tailor a copy for each application.',
      },
      {
        question: 'Should I tailor my resume for each job?',
        answer:
          'Yes. Adjust the summary and skills to match the wording of the role, and move the most relevant experience to the top. A targeted single page usually serves you better than a generic two-page document.',
      },
    ],
  },

  'age-calculator': {
    slug: 'age-calculator',
    lastReviewed: '2026-10-07',
    sections: [
      {
        heading: 'What an age calculator does',
        paragraphs: [
          'An age calculator works out the exact span between a date of birth and a chosen date, then breaks it down into **years, months and days** — plus weeks, hours and minutes when you want the finer detail. Leap years and short months are handled for you.',
          'It can also count down to your **next birthday**, which is handy for milestones, eligibility cut-offs and planning.',
        ],
      },
      {
        heading: 'How to use the age calculator',
        paragraphs: [
          'Two dates go in: the date of birth, and the reference date you want the age measured against. Leave the reference date on today for a current age, or move it to any other date — admission cut-offs and anniversary dates are the usual reasons.',
        ],
        list: [
          'Pick your birth date in the date picker.',
          'Optionally set a reference date — today by default, or any past or future date.',
          'Read the full breakdown and the countdown to your next birthday.',
        ],
      },
      {
        heading: 'How age is actually calculated',
        paragraphs: [
          'Age is a calendar calculation, not a division. The reference date is taken apart year by year, month by month and day by day, borrowing days from the previous month whenever the day of the month has not been reached yet.',
          'That is why total days never divide neatly into years: leap years add an extra day roughly every four years, and month lengths vary. The days figure and the years figure measure slightly different things.',
          'Forms want age in **completed years**, and the breakdown follows the same convention: someone who is 29 years and 11 months is 29 on the form, and turns 30 only on the birthday itself. Total days, weeks and hours are there for countdowns and records rather than for paperwork.',
        ],
      },
      {
        heading: 'Where an exact age calculation is used',
        paragraphs: [
          'Most age-related rules are measured on a specific date rather than today. Set the reference date to the date the rule names and the calculator returns completed years, months and days as at that date — which is what forms mean when they ask for age.',
        ],
        list: [
          'School, college and training admission cut-offs.',
          'Employment, pension and insurance eligibility rules.',
          'Sports categories and age-limited competitions.',
          'Legal documents, applications and statutory forms.',
          'Planning: how long until a milestone, an anniversary or a deadline.',
        ],
      },
      {
        heading: 'When an exact age matters',
        paragraphs: [
          'The total days figure tracks how long since a milestone, while the hours and minutes make a precise countdown to a birthday. For the gap between two dates rather than a birth date, use the [Date Difference Calculator](/tools/calculators/date-difference-calculator). When the target is an event rather than a birthday, the [Days Until a Date](/tools/calculators/days-until-a-date) countdown does the job, and the [Islamic Date Converter](/tools/generators/islamic-date-converter) gives the Hijri equivalent of any Gregorian birthday.',
        ],
      },
    ],
    extraFaqs: [
      {
        question: 'When do I actually become a year older?',
        answer:
          'On the anniversary of your birth date. Age counts completed calendar years, so you gain a year on your birthday rather than at the start of the calendar year.',
      },
      {
        question: 'Can I calculate age on a past or future date?',
        answer:
          'Yes. Set the reference date instead of leaving it on today. That is how you check age on an admission cut-off or on a date that has already passed.',
      },
      {
        question: 'Why do my total days not divide by 365?',
        answer:
          'Leap years add an extra day roughly every four years, and your age in years counts calendar years rather than fixed 365-day blocks. The two figures are measuring different spans.',
      },
    ],
  },
};

export function getToolGuide(slug: string): ToolGuide | undefined {
  return TOOL_GUIDES[slug];
}
