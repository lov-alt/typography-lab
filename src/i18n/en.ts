import type { Translations } from "./zh";

const en: Translations = {
  app: { title: "Typography Lab" },
  home: {
    tagline: "Open Source Typography Tools",
    heading: "Typography Lab",
    subtitle: "Open source typography visual lab — font pairing, type scales, measure & rhythm",
    offline: "All data stored locally — works without internet",
    github: "GitHub",
  },
  tools: {
    "font-pairing": { name: "Font Pairing", desc: "Google Fonts pairing preview with category filters and live heading+body combinations" },
    "type-scale": { name: "Type Scale", desc: "7 modular scales — visual h1-h6+body+caption ramp with px/rem values" },
    "measure-rhythm": { name: "Measure & Rhythm", desc: "CPL calculator, line-height/spacing controls, baseline grid" },
    editorial: { name: "Editorial", desc: "Layout preview — poster, magazine spread, multi-column, real-world typography verification" },
  },
  typeScale: {
    title: "Type Scale", description: "Modular typographic scale — 7 ratios + 9-level visual ramp",
    baseSize: "Base Size", scale: "Scale Ratio", scaleCustom: "Custom", remBase: "rem base (1rem = )",
    heading: "Heading", body: "Body", caption: "Caption",
    sampleHeading: "The quick brown fox", sampleCaption: "— Typography Lab · Open Source Type Tool",
    sampleBody: "Typography is the craft of endowing human language with a durable visual form. Good type design establishes hierarchy, creates rhythm, and guides the reader through content with effortless clarity.",
  },
  fontPairing: {
    title: "Font Pairing", description: "Google Fonts pairing — heading + body combination preview",
    headingFont: "Heading Font", bodyFont: "Body Font",
    category: "Category", all: "All", serif: "Serif", sansSerif: "Sans Serif",
    display: "Display", mono: "Monospace", handwriting: "Handwriting",
    search: "Search fonts...", preset: "Classic Pairs",
    sampleTitle: "The quick brown fox jumps over the lazy dog",
    sampleBodyEn: "Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.",
    weight: "Weight",
  },
  measureRhythm: {
    title: "Measure & Rhythm", description: "CPL calculator + baseline grid visualization",
    fontSize: "Font Size", lineHeight: "Line Height", paragraphSpacing: "Paragraph Spacing",
    containerWidth: "Container Width", cpl: "Characters Per Line", cplOptimal: "Optimal range",
    baselineGrid: "Baseline Grid",
    sample: "Typography is the craft of endowing human language with a durable visual form. Good type design establishes hierarchy, creates rhythm, and guides the reader through content with effortless clarity.",
  },
  editorial: {
    title: "Editorial Layout", description: "Layout preview — poster, magazine spread, multi-column, verify typography in real contexts",
    layout: "Layout Type", poster: "Poster", magazineSpread: "Magazine Spread", brochure: "Brochure", bookPage: "Book Page",
    columns: "Columns", showImage: "Image Placeholder", showPullQuote: "Pull Quote", showDropCap: "Drop Cap",
    headline: "The Art of Type", subhead: "Font · Rhythm · Proportion",
    bodyText: "Good typography is invisible art. When readers are immersed in the flow of text, they don't notice the font choices, the leading settings, or the measure calculations — but these are precisely where the typographer poured their craft. Every pixel of spacing is the result of deliberate consideration.",
    pullQuote: "Design is not decoration. It is communication. Good typography lets the words speak for themselves.",
    caption: "Typography Lab · Open Source Type Tool",
  },
  code: { copy: "Copy", copied: "Copied" },
  common: { back: "Back to Home", add: "+ Add", del: "Del", darkMode: "Toggle dark mode" },
};

export default en;
