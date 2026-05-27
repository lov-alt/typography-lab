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
  code: { copy: "Copy", copied: "Copied" },
  common: { back: "Back to Home", add: "+ Add", del: "Del", darkMode: "Toggle dark mode" },
};

export default en;
