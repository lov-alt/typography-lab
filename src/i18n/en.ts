import type { Translations } from "./zh";

const en: Translations = {
  app: { title: "Typography Lab" },
  home: {
    tagline: "Content-Driven Typography Lab",
    heading: "Right Layout for Every Content",
    subtitle: "Pick content type → Get professional layout → Import your fonts & images → Fine-tune & export",
    github: "GitHub",
  },
  archetypes: {
    editorial: { name: "Editorial Article", desc: "Classic newspaper & magazine layout — multi-column grid, drop caps, pull quotes" },
    poster: { name: "Event Poster", desc: "Bold title hierarchy, dramatic scale contrast, compact information density" },
    menu: { name: "Restaurant Menu", desc: "Elegant dish arrangement, price alignment, category dividers, breathing space" },
    book: { name: "Book Interior", desc: "Classic novel layout — comfortable measure, chapter headings, paragraph indentation" },
    hero: { name: "Landing Hero", desc: "Web hero section — CTA hierarchy, value proposition focus, visual guidance" },
    card: { name: "Business Card", desc: "Precision in minimal space — information priority, alignment grid, power of whitespace" },
  },
  editor: {
    heading: "Heading", subhead: "Subhead", body: "Body", caption: "Caption", cta: "Call to Action",
    price: "$12", dishName: "Signature Ramen", dishDesc: "Premium beef · Hand-pulled noodles · 8hr bone broth",
    date: "2026.06.15", location: "West Bund Art Center, Shanghai", author: "Alex Wang", chapter: "Chapter III",
    sampleBody: "Typography is the craft of endowing human language with a durable visual form. Good type design establishes hierarchy, creates rhythm, and guides the reader through content with effortless clarity. When readers are immersed in the flow of text, they don't notice the typesetting — and that's the mark of successful typography.",
    sampleBodyLong: "In the digital age, typography has evolved from the exclusive craft of print to a part of everyone's daily communication. From instant messages to corporate websites, from personal blogs to business proposals, text is everywhere. However, most people's understanding of typography remains at the level of 'picking a nice font.' True typography is about information architecture — it determines what readers see first, what they see next, what is emphasized, and what is de-emphasized. A good typographic system is like a silent guide, leading readers through the ocean of information.",
    importFont: "Import Font", importImage: "Import Image", fontSize: "Font Size", lineHeight: "Line Height",
    reset: "Reset", export: "Export CSS",
  },
  code: { copy: "Copy", copied: "Copied" },
  common: { back: "Back to Home", darkMode: "Toggle dark mode" },
};

export default en;
