export interface TypeBlock {
  id: string;
  role: "headline" | "subhead" | "body" | "info" | "date" | "cta" | "price";
  text: string;
  x: number; y: number; w: number;
  fontSize: number; fontWeight: number;
  lineHeight: number; letterSpacing: number;
  alignment: "left" | "center" | "right";
  color: string;
  fontFamily: "heading" | "body";
}

export interface LayoutRule {
  id: string;
  name: Record<"zh" | "en", string>;
  desc: Record<"zh" | "en", string>;
  tradition: string;
  style: string[];
  canvasBg: string;
  palette: string[];
  /** Canvas dimensions in px */
  canvasW: number; canvasH: number;
  blocks: TypeBlock[];
}

const S = (id: string, role: TypeBlock["role"], text: string, x: number, y: number, w: number, fs: number, fw: number, lh: number, ls: number, al: TypeBlock["alignment"], color: string, ff: TypeBlock["fontFamily"]): TypeBlock =>
  ({ id, role, text, x, y, w, fontSize: fs, fontWeight: fw, lineHeight: lh, letterSpacing: ls, alignment: al, color, fontFamily: ff });

export const CONTENT_TYPES: LayoutRule[] = [
  // ── POSTERS (Vertical) ────────────────
  {
    id: "rock-concert",
    name: { zh: "摇滚音乐会海报", en: "Rock Concert Poster" },
    desc: { zh: "Swiss/International Style — 不对称网格、高对比度、几何感", en: "Swiss/International Style — asymmetric grid, high contrast, geometric" },
    tradition: "Swiss / International Typographic Style (Müller-Brockmann, 1950s)",
    style: ["grid", "asymmetric", "high-contrast", "geometric"],
    canvasBg: "#e8e5df", palette: ["#1a1a1a", "#e63946", "#457b9d", "#f1faee"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("band", "headline", "THE VELVET\nUNDERGROUND", 6, 10, 88, 52, 700, 1.05, -0.02, "left", "#e63946", "heading"),
      S("headline", "headline", "LIVE\nIN CONCERT", 6, 30, 65, 96, 900, 0.95, -0.03, "left", "#1a1a1a", "heading"),
      S("date", "date", "2026.07.15 SAT · 20:00", 6, 75, 40, 14, 600, 1.4, 0.1, "left", "#1a1a1a", "body"),
      S("location", "info", "O2 Academy Brixton\nLondon, UK", 6, 82, 40, 13, 400, 1.5, 0.02, "left", "#457b9d", "body"),
      S("cta", "cta", "TICKETS →", 6, 91, 30, 16, 700, 1, 0.15, "left", "#e63946", "heading"),
    ],
  },
  {
    id: "classical-concert",
    name: { zh: "古典音乐会海报", en: "Classical Concert Poster" },
    desc: { zh: "Didone/Modern — 极粗极细对比、居中对称、金色点缀", en: "Didone/Modern — thick/thin contrast, centered, gold accents" },
    tradition: "Didone / Modern (Bodoni, Didot, 18th–19th c.)",
    style: ["high-contrast", "elegant", "centered", "luxury"],
    canvasBg: "#faf8f5", palette: ["#2c1810", "#8b6914", "#d4a853", "#3d2b1f"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("composer", "subhead", "LUDWIG VAN BEETHOVEN", 10, 8, 80, 20, 400, 1.3, 0.25, "center", "#8b6914", "body"),
      S("headline", "headline", "SYMPHONY\nNO. 9", 10, 25, 80, 88, 700, 1.05, 0.05, "center", "#2c1810", "heading"),
      S("conductor", "subhead", "Herbert von Karajan · Berlin Philharmonic", 12, 50, 76, 16, 400, 1.5, 0.08, "center", "#3d2b1f", "body"),
      S("date", "date", "2026 · 09 · 22   |   19 : 30", 12, 60, 76, 18, 600, 1.4, 0.15, "center", "#2c1810", "heading"),
      S("location", "info", "Musikverein, Großer Saal · Wien", 12, 70, 76, 14, 400, 1.6, 0.1, "center", "#8b6914", "body"),
    ],
  },
  {
    id: "sports-event",
    name: { zh: "体育赛事海报", en: "Sports Event Poster" },
    desc: { zh: "New Wave/Postmodern — 动态斜体、高能量、深色背景", en: "New Wave/Postmodern — dynamic italic, high energy, dark bg" },
    tradition: "New Wave / Postmodern (Weingart, Greiman, 1970s–80s)",
    style: ["dynamic", "italic", "energetic", "dark"],
    canvasBg: "#0a0a0f", palette: ["#ffffff", "#ff6b35", "#00d4aa", "#ffd700"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("subhead", "subhead", "2026 GRAND FINAL", 4, 18, 60, 32, 800, 1.1, 0.2, "left", "#ff6b35", "heading"),
      S("headline", "headline", "CHAMPIONS\nLEAGUE", 4, 35, 92, 108, 900, 0.9, -0.04, "left", "#ffffff", "heading"),
      S("vs", "subhead", "FC BARCELONA  vs  MAN CITY", 4, 68, 70, 22, 700, 1.3, 0.08, "left", "#00d4aa", "body"),
      S("date", "date", "SUNDAY · JUNE 14 · 21:00 CET", 4, 78, 50, 14, 600, 1.4, 0.12, "left", "#e0e0e0", "body"),
      S("location", "info", "WEMBLEY STADIUM, LONDON", 4, 85, 50, 12, 400, 1.5, 0.15, "left", "#ffd700", "body"),
      S("cta", "cta", "GET TICKETS", 4, 92, 40, 18, 800, 1, 0.2, "left", "#ff6b35", "heading"),
    ],
  },
  {
    id: "art-exhibition",
    name: { zh: "艺术展览海报", en: "Art Exhibition Poster" },
    desc: { zh: "Minimalism — 大量留白、克制排版、让作品呼吸", en: "Minimalism — generous whitespace, restrained type" },
    tradition: "Minimalism (Rams, Japanese ma, 1960s–present)",
    style: ["minimal", "whitespace", "calm", "essential"],
    canvasBg: "#f4f0eb", palette: ["#1c1c1c", "#c4b5a5", "#8c7b6b", "#f4f0eb"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("artist", "subhead", "YAYOI KUSAMA", 72, 8, 22, 12, 500, 1.4, 0.2, "right", "#8c7b6b", "body"),
      S("headline", "headline", "無限の鏡", 8, 55, 84, 42, 300, 1.15, 0.08, "left", "#1c1c1c", "heading"),
      S("subhead", "subhead", "Infinity Mirrors\nA Retrospective", 8, 70, 60, 16, 400, 1.4, 0.05, "left", "#8c7b6b", "body"),
      S("date", "date", "2026.03.15 — 2026.09.30", 8, 82, 40, 13, 400, 1.5, 0.1, "left", "#1c1c1c", "body"),
      S("location", "info", "MoMA · 11 West 53 Street · New York", 8, 89, 45, 12, 300, 1.5, 0.05, "left", "#8c7b6b", "body"),
    ],
  },
  {
    id: "magazine-cover",
    name: { zh: "杂志封面", en: "Magazine Cover" },
    desc: { zh: "时尚杂志封面 — 刊头大字、多条封面标题、日期定价条、中心图预留区", en: "Fashion magazine cover — masthead, multiple cover lines, date/price strip" },
    tradition: "Magazine Cover Design (Vogue, Harper's Bazaar, 20th c.)",
    style: ["glamorous", "layered", "bold-masthead", "fashion"],
    canvasBg: "#f5f0eb", palette: ["#1a1a1a", "#e63946", "#c4a882", "#ffffff", "#2c1810"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("masthead", "headline", "VOGUE", 5, 4, 90, 72, 900, 0.9, 0.08, "center", "#1a1a1a", "heading"),
      S("cover1", "subhead", "THE NEW\nELEGANCE", 8, 16, 40, 36, 700, 1.05, -0.01, "left", "#e63946", "heading"),
      S("cover2", "subhead", "What to Wear\nThis Summer", 8, 34, 35, 22, 600, 1.15, 0, "left", "#2c1810", "heading"),
      S("cover3", "subhead", "Beauty\nRevolution", 8, 50, 30, 18, 600, 1.15, 0, "left", "#1a1a1a", "heading"),
      S("cover4", "subhead", "PLUS\n50 Best\nDresses", 60, 72, 35, 26, 700, 1.05, -0.01, "left", "#e63946", "heading"),
      S("cover5", "info", "THE CULTURE ISSUE", 8, 62, 40, 13, 500, 1.3, 0.15, "left", "#c4a882", "body"),
      S("date", "date", "JUNE 2026", 8, 94, 20, 12, 600, 1.3, 0.1, "left", "#1a1a1a", "body"),
      S("price", "info", "£4.99", 88, 94, 8, 12, 600, 1.3, 0.05, "right", "#1a1a1a", "body"),
    ],
  },
  // ── LANDSCAPE / HORIZONTAL ────────────
  {
    id: "magazine-spread",
    name: { zh: "杂志跨页", en: "Magazine Spread" },
    desc: { zh: "编辑排版 — 多栏网格、首字下沉、引文侧栏、图片跨页", en: "Editorial — multi-column grid, drop cap, pull quote, full-bleed image" },
    tradition: "Editorial / News Design (Harold Evans, 1970s)",
    style: ["multi-column", "editorial", "rhythmic", "structured"],
    canvasBg: "#faf9f6", palette: ["#1a1a1a", "#6366f1", "#6b7280", "#d4d4d8"],
    canvasW: 1100, canvasH: 780,
    blocks: [
      S("kicker", "subhead", "TYPOGRAPHY", 5, 4, 20, 11, 700, 1.3, 0.2, "left", "#6366f1", "body"),
      S("headline", "headline", "The Lost Art of\nTypesetting in the\nDigital Age", 5, 10, 52, 56, 800, 1.08, -0.015, "left", "#1a1a1a", "heading"),
      S("byline", "info", "By Elena Vasquez · Photography by James Lin", 5, 42, 30, 12, 400, 1.5, 0.02, "left", "#6b7280", "body"),
      S("body1", "body", "In the quiet hours before dawn, when the printing presses of the New York Times begin their nightly ritual, there is a moment of perfect stillness. The plates are locked, the ink is mixed, and a million words wait to be born onto paper. This is where typography lives — not in the glow of a designer's screen, but in the physical act of putting ink to paper.", 5, 50, 28, 13, 400, 1.65, 0, "left", "#1a1a1a", "body"),
      S("body2", "body", "Yet this ritual is disappearing. Digital screens have replaced printed pages. The careful craft of letterpress has given way to the instant gratification of web fonts. But something is lost in this transition — a tactile quality, a sense of permanence, a respect for the word that only print can convey.", 37, 50, 28, 13, 400, 1.65, 0, "left", "#1a1a1a", "body"),
      S("pullquote", "subhead", "\"Type is the\nclothing of\nthought.\"", 68, 14, 26, 32, 300, 1.2, -0.01, "left", "#6366f1", "heading"),
      S("body3", "body", "The question facing today's typographers is not whether to embrace digital tools, but how to preserve the soul of typography in an age of infinite reproducibility. The answer may lie in returning to first principles: hierarchy, rhythm, proportion, and above all, respect for the reader's experience.", 5, 72, 60, 13, 400, 1.65, 0, "left", "#1a1a1a", "body"),
      S("page", "info", "42", 93, 93, 4, 12, 400, 1, 0, "right", "#6b7280", "body"),
    ],
  },
  {
    id: "brochure",
    name: { zh: "三折页宣传册", en: "Tri-Fold Brochure" },
    desc: { zh: "企业宣传册 — 三等分面板、图文交替、清晰信息层级", en: "Corporate brochure — three equal panels, alternating text & image" },
    tradition: "Corporate Design / Swiss (Vignelli, 1960s–70s)",
    style: ["grid", "corporate", "clean", "three-panel"],
    canvasBg: "#ffffff", palette: ["#1a1a2e", "#6366f1", "#3b82f6", "#f8fafc"],
    canvasW: 1100, canvasH: 780,
    blocks: [
      S("headline", "headline", "DESIGN\nTHINKING", 4, 20, 28, 56, 800, 1.05, -0.02, "left", "#1a1a2e", "heading"),
      S("subhead", "subhead", "A Framework for\nCreative Problem Solving", 4, 48, 28, 15, 400, 1.5, 0, "left", "#6366f1", "body"),
      S("body1", "body", "Design thinking is a human-centered approach to innovation that draws from the designer's toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success.", 4, 62, 26, 11, 400, 1.6, 0.01, "left", "#1a1a2e", "body"),
      S("step1", "subhead", "01 EMPATHIZE", 36, 20, 18, 12, 700, 1.4, 0.15, "left", "#6366f1", "body"),
      S("step1b", "body", "Understand the user's needs, wants, and objectives.", 36, 28, 24, 10, 400, 1.5, 0, "left", "#1a1a2e", "body"),
      S("step2", "subhead", "02 DEFINE", 36, 36, 18, 12, 700, 1.4, 0.15, "left", "#6366f1", "body"),
      S("step2b", "body", "Synthesize findings into a clear problem statement.", 36, 44, 24, 10, 400, 1.5, 0, "left", "#1a1a2e", "body"),
      S("step3", "subhead", "03 IDEATE", 36, 52, 18, 12, 700, 1.4, 0.15, "left", "#6366f1", "body"),
      S("step3b", "body", "Generate a wide range of creative solutions.", 36, 60, 24, 10, 400, 1.5, 0, "left", "#1a1a2e", "body"),
      S("panel3h", "headline", "OUR\nWORK", 68, 20, 28, 48, 800, 1.05, -0.02, "left", "#f8fafc", "heading"),
      S("panel3b", "body", "Selected case studies from 2024–2026.\n\n• Global Bank Rebrand\n• Healthcare UX Overhaul\n• Smart City Dashboard", 68, 48, 26, 10, 400, 1.7, 0.01, "left", "#f8fafc", "body"),
      S("cta", "cta", "Learn more →", 68, 80, 20, 13, 600, 1, 0.05, "left", "#3b82f6", "heading"),
    ],
  },
  {
    id: "business-card",
    name: { zh: "名片", en: "Business Card" },
    desc: { zh: "极简名片 — 精确间距、信息优先级、无声的力量", en: "Minimal card — precise spacing, information hierarchy, quiet power" },
    tradition: "Minimalism / Japanese Design",
    style: ["minimal", "precise", "compact", "elegant"],
    canvasBg: "#faf9f6", palette: ["#1a1a1a", "#6366f1", "#9ca3af", "#f5f5f4"],
    canvasW: 1000, canvasH: 600,
    blocks: [
      S("name", "headline", "Alexandra Chen", 6, 30, 40, 48, 600, 1.15, -0.01, "left", "#1a1a1a", "heading"),
      S("title", "subhead", "Creative Director & Typographer", 6, 48, 40, 14, 400, 1.4, 0.05, "left", "#9ca3af", "body"),
      S("divider", "info", "—————————————————", 6, 58, 36, 8, 400, 1, 0.2, "left", "#d4d4d8", "body"),
      S("email", "info", "alex@typographylab.com", 6, 66, 36, 13, 400, 1.6, 0.02, "left", "#1a1a1a", "body"),
      S("phone", "info", "+1 (415) 555-0128", 6, 74, 36, 13, 400, 1.6, 0.02, "left", "#1a1a1a", "body"),
      S("web", "info", "typographylab.com", 6, 82, 36, 13, 400, 1.6, 0.02, "left", "#6366f1", "body"),
      S("logo", "headline", "TL", 88, 78, 8, 36, 300, 1, 0.1, "right", "#e5e5e5", "heading"),
    ],
  },
  {
    id: "certificate",
    name: { zh: "证书 / 奖状", en: "Certificate / Diploma" },
    desc: { zh: "正式证书 — 古典衬线、居中对称、庄重典雅", en: "Formal certificate — classic serif, centered, dignified" },
    tradition: "Old Style / Engraved (18th–19th c. copperplate)",
    style: ["formal", "centered", "ornamental", "dignified"],
    canvasBg: "#fefcf7", palette: ["#2c1810", "#8b6914", "#c4a882", "#1a1a1a"],
    canvasW: 1100, canvasH: 780,
    blocks: [
      S("org", "subhead", "TYPOGRAPHY INSTITUTE OF AMERICA", 10, 6, 80, 14, 500, 1.4, 0.3, "center", "#2c1810", "body"),
      S("ornament", "info", "❧ ❧ ❧", 30, 14, 40, 20, 400, 1, 0.2, "center", "#c4a882", "body"),
      S("title", "subhead", "This Certificate of Excellence is Awarded to", 15, 24, 70, 16, 400, 1.5, 0.08, "center", "#8b6914", "body"),
      S("name", "headline", "Alexandra Chen", 15, 34, 70, 52, 600, 1.2, 0.05, "center", "#2c1810", "heading"),
      S("desc", "body", "In recognition of outstanding achievement in typographic design\nand dedication to the advancement of the typographic arts,\ndemonstrated through exceptional work in editorial and brand typography.", 12, 52, 76, 14, 400, 1.7, 0.02, "center", "#1a1a1a", "body"),
      S("date", "date", "June 15, 2026", 15, 74, 30, 13, 600, 1.5, 0.1, "center", "#2c1810", "body"),
      S("signature", "info", "James Morrison\nPresident", 38, 74, 24, 12, 400, 1.5, 0.05, "center", "#8b6914", "body"),
    ],
  },
  // ── MORE VERTICAL ──────────────────────
  {
    id: "book-page",
    name: { zh: "书籍内页", en: "Book Page" },
    desc: { zh: "小说排版 — 舒适行长、章节标题、段落缩进、页码", en: "Novel interior — comfortable measure, chapter heading, indentation" },
    tradition: "Old Style / Humanist (Garamond, Jenson, 15th–16th c.)",
    style: ["warm", "readable", "scholarly", "human-scale"],
    canvasBg: "#fdfaf6", palette: ["#2c1810", "#6b5b4f", "#8b7b6b", "#c4b5a5"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("chapter", "subhead", "CHAPTER III", 10, 8, 30, 13, 500, 1.4, 0.25, "left", "#6b5b4f", "body"),
      S("headline", "headline", "The Silent Page", 10, 16, 70, 40, 700, 1.2, -0.005, "left", "#2c1810", "heading"),
      S("body1", "body", "She turned the page. The library was silent except for the distant hum of the heating system — a sound so constant it had become a kind of silence itself. Outside, rain traced slow paths down the tall windows, distorting the grey Cambridge sky beyond.", 10, 30, 50, 14, 400, 1.7, 0.005, "left", "#2c1810", "body"),
      S("body2", "body", "The book in her hands was a first edition — 1923, cloth-bound, the spine cracked but holding. She had waited three years to hold it. Now, with the pages fanning beneath her thumb, she found herself unable to read. The anticipation had been too great, and the reality of the object — its smell of old paper and dust, its weight, its provenance — overwhelmed the words.", 10, 52, 50, 14, 400, 1.7, 0.005, "left", "#2c1810", "body"),
      S("body3", "body", "She closed her eyes. Typography, she thought, was not about letters at all. It was about the spaces between them. The silence between notes. The pause between breaths. Every margin, every leading choice, every kerning pair — all in service of the invisible architecture that makes reading possible.", 10, 76, 50, 14, 400, 1.7, 0.005, "left", "#2c1810", "body"),
      S("pagenum", "info", "42", 48, 94, 4, 12, 400, 1.5, 0.05, "center", "#6b5b4f", "body"),
    ],
  },
  {
    id: "menu",
    name: { zh: "餐饮菜单", en: "Restaurant Menu" },
    desc: { zh: "精致菜单 — 菜品与价格两端对齐、分类留白、优雅间隔", en: "Fine dining menu — dish/price alignment, category spacing, elegant rhythm" },
    tradition: "Editorial / Swiss with Old Style warmth",
    style: ["elegant", "structured", "rhythmic", "warm"],
    canvasBg: "#faf8f4", palette: ["#2c1810", "#8b6914", "#c4a882", "#6b5b4f"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("restaurant", "headline", "LE JARDIN", 10, 6, 80, 28, 700, 1.2, 0.15, "center", "#2c1810", "heading"),
      S("subtitle", "subhead", "SEASONAL TASTING MENU", 10, 14, 80, 12, 400, 1.4, 0.25, "center", "#8b6914", "body"),
      S("category1", "subhead", "FIRST COURSE", 12, 24, 76, 13, 600, 1.4, 0.15, "left", "#8b6914", "body"),
      S("dish1", "body", "Heirloom Tomato Gazpacho", 12, 30, 55, 15, 400, 1.6, 0.02, "left", "#2c1810", "body"),
      S("price1", "price", "24", 70, 30, 18, 15, 400, 1.6, 0.05, "right", "#6b5b4f", "body"),
      S("desc1", "body", "Basil oil, micro greens, sourdough croutons", 12, 35, 55, 11, 400, 1.5, 0.01, "left", "#6b5b4f", "body"),
      S("dish2", "body", "Seared Foie Gras", 12, 42, 55, 15, 400, 1.6, 0.02, "left", "#2c1810", "body"),
      S("price2", "price", "32", 70, 42, 18, 15, 400, 1.6, 0.05, "right", "#6b5b4f", "body"),
      S("desc2", "body", "Fig compote, brioche, Sauternes gelée", 12, 47, 55, 11, 400, 1.5, 0.01, "left", "#6b5b4f", "body"),
      S("category2", "subhead", "MAIN COURSE", 12, 56, 76, 13, 600, 1.4, 0.15, "left", "#8b6914", "body"),
      S("dish3", "body", "Pan-Roasted Halibut", 12, 62, 55, 15, 400, 1.6, 0.02, "left", "#2c1810", "body"),
      S("price3", "price", "48", 70, 62, 18, 15, 400, 1.6, 0.05, "right", "#6b5b4f", "body"),
      S("desc3", "body", "Spring pea purée, morels, brown butter", 12, 67, 55, 11, 400, 1.5, 0.01, "left", "#6b5b4f", "body"),
      S("note", "info", "Menu subject to seasonal availability.\nPlease inform your server of any allergies.", 12, 85, 50, 10, 400, 1.5, 0.03, "left", "#c4a882", "body"),
    ],
  },
  {
    id: "newspaper",
    name: { zh: "报纸头版", en: "Newspaper Front Page" },
    desc: { zh: "新闻排版 — 多层级标题、窄栏正文、信息密度高", en: "News layout — multi-level headlines, narrow columns, high density" },
    tradition: "News Design (The Times, NYT, 19th–20th c.)",
    style: ["dense", "hierarchical", "multi-column", "urgent"],
    canvasBg: "#fefefe", palette: ["#1a1a1a", "#cc0000", "#6b7280", "#e5e5e5"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("masthead", "headline", "THE DAILY TYPOGRAPHER", 5, 2, 90, 18, 900, 1.1, 0.15, "center", "#1a1a1a", "heading"),
      S("rule1", "info", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", 5, 6.5, 90, 6, 400, 1, 0.3, "center", "#1a1a1a", "body"),
      S("rule2", "info", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", 5, 8, 90, 6, 400, 1, 0.3, "center", "#1a1a1a", "body"),
      S("vol", "info", "VOL. CXIV · NO. 42,817    |    NEW YORK, SUNDAY, JUNE 14, 2026    |    $3.00", 5, 9.5, 90, 8, 500, 1.3, 0.1, "center", "#6b7280", "body"),
      S("headline", "headline", "TYPOGRAPHIC\nREVOLUTION", 5, 16, 90, 68, 900, 0.95, -0.03, "left", "#1a1a1a", "heading"),
      S("subhead", "subhead", "Designers Worldwide Embrace a Return to Print-First Thinking as Digital Fatigue Reaches a Breaking Point", 5, 36, 55, 16, 500, 1.35, -0.005, "left", "#6b7280", "body"),
      S("byline", "info", "By ELENA VASQUEZ · Design Correspondent", 5, 42, 30, 10, 500, 1.4, 0.05, "left", "#6b7280", "body"),
      S("col1", "body", "PARIS — In a unexpected turn of events that has sent ripples through the global design community, a growing movement of typographers and graphic designers are abandoning their digital-first workflows in favor of a return to print-centered design methodologies.", 5, 48, 28, 11, 400, 1.5, 0.005, "left", "#1a1a1a", "body"),
      S("col2", "body", "The movement, which began quietly in the studios of independent designers across Europe, has now gained significant momentum. Major design schools, including the Royal College of Art and the Basel School of Design, have begun incorporating letterpress and traditional typesetting into their core curricula.", 37, 48, 28, 11, 400, 1.5, 0.005, "left", "#1a1a1a", "body"),
      S("col3", "body", "\"There is something irreplaceable about the physical act of setting type,\" says Marie Dupont, a veteran typographer who has worked with both traditional and digital methods for over four decades. \"When you hold a piece of metal type in your hand, you understand its weight — both literal and metaphorical.\"", 68, 48, 28, 11, 400, 1.5, 0.005, "left", "#1a1a1a", "body"),
      S("col1b", "body", "Industry analysts suggest this trend may represent a broader cultural shift away from the ephemeral nature of digital media toward more permanent, tactile forms of communication.", 5, 68, 28, 11, 400, 1.5, 0.005, "left", "#1a1a1a", "body"),
      S("col2b", "body", "The economic implications are significant. Traditional printing houses that had been on the verge of closure are reporting a 40% increase in demand. Paper mills are struggling to keep up with orders.", 37, 68, 28, 11, 400, 1.5, 0.005, "left", "#1a1a1a", "body"),
      S("col3b", "body", "Continued on Page A12", 68, 68, 28, 11, 600, 1.5, 0.05, "left", "#cc0000", "body"),
      S("rule3", "info", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", 5, 88, 90, 6, 400, 1, 0.3, "center", "#1a1a1a", "body"),
      S("weather", "info", "WEATHER: PARTLY CLOUDY, 72°F    |    INDEX: OP-ED A14 · BUSINESS B1 · ARTS C3 · SPORTS D1", 5, 90, 90, 8, 500, 1.3, 0.08, "center", "#6b7280", "body"),
    ],
  },
  {
    id: "product-launch",
    name: { zh: "产品发布会", en: "Product Launch" },
    desc: { zh: "科技产品 — 极致简洁、暗色背景、让产品说话", en: "Tech launch — extreme simplicity, dark, let product speak" },
    tradition: "Minimalism (Apple-style, 2000s–present)",
    style: ["minimal", "dark", "precise", "essential"],
    canvasBg: "#1a1a1a", palette: ["#ffffff", "#a0a0a0", "#6366f1", "#3b82f6"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("headline", "headline", "Think\nDifferent.", 8, 38, 70, 80, 300, 1.0, -0.02, "left", "#ffffff", "heading"),
      S("subhead", "subhead", "Introducing the next generation of creative tools.\nPowered by intelligence, designed for humans.", 8, 68, 45, 16, 300, 1.5, 0, "left", "#a0a0a0", "body"),
      S("date", "date", "Launch Event · 2026.10.12 · 10:00 PDT", 8, 84, 50, 13, 500, 1.4, 0.05, "left", "#6366f1", "body"),
      S("cta", "cta", "Watch the keynote →", 8, 92, 40, 15, 600, 1, 0.02, "left", "#3b82f6", "heading"),
    ],
  },
  {
    id: "film-festival",
    name: { zh: "电影节", en: "Film Festival" },
    desc: { zh: "影展 — Constructivism风格、几何感、红黑配色", en: "Film festival — Constructivist, geometric, red-black palette" },
    tradition: "Russian Constructivism (Rodchenko, Lissitzky, 1920s)",
    style: ["geometric", "bold", "diagonal", "red-black"],
    canvasBg: "#0d0d0d", palette: ["#ffffff", "#e63946", "#f4a261", "#e9c46a"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("headline", "headline", "CANNES", 5, 20, 90, 130, 900, 0.85, -0.02, "left", "#ffffff", "heading"),
      S("subhead", "subhead", "79th INTERNATIONAL\nFILM FESTIVAL", 5, 55, 60, 24, 400, 1.2, 0.25, "left", "#e63946", "heading"),
      S("info", "info", "PALME D'OR · UN CERTAIN REGARD\nDIRECTORS' FORTNIGHT · CRITICS' WEEK", 5, 72, 55, 12, 500, 1.6, 0.08, "left", "#f4a261", "body"),
      S("date", "date", "14–25 MAI 2026", 5, 86, 40, 18, 700, 1.3, 0.1, "left", "#ffffff", "heading"),
      S("location", "info", "PALAIS DES FESTIVALS · CANNES · FRANCE", 5, 93, 50, 11, 400, 1.4, 0.12, "left", "#e9c46a", "body"),
    ],
  },
  {
    id: "wedding",
    name: { zh: "婚礼请柬", en: "Wedding Invitation" },
    desc: { zh: "浪漫请柬 — Didone衬线、居中对称、柔金色调", en: "Romantic invitation — Didone serif, centered, soft gold" },
    tradition: "Didone / Modern (Bodoni, Didot, 18th–19th c.)",
    style: ["elegant", "centered", "romantic", "soft"],
    canvasBg: "#fdfaf5", palette: ["#3d2b1f", "#c4a882", "#d4c5b9", "#8b6f5e"],
    canvasW: 800, canvasH: 1100,
    blocks: [
      S("headline", "headline", "Sarah & James", 15, 22, 70, 64, 400, 1.15, 0.05, "center", "#3d2b1f", "heading"),
      S("subhead", "subhead", "together with their families\ninvite you to celebrate their marriage", 18, 46, 64, 16, 400, 1.6, 0.04, "center", "#8b6f5e", "body"),
      S("date", "date", "SATURDAY · THE TWENTY-THIRD OF AUGUST\nTWO THOUSAND AND TWENTY-SIX", 15, 62, 70, 15, 600, 1.6, 0.12, "center", "#c4a882", "heading"),
      S("info", "info", "CEREMONY AT FOUR IN THE AFTERNOON\nVILLA BALBIANELLO · LAKE COMO · ITALY", 15, 77, 70, 13, 400, 1.7, 0.08, "center", "#8b6f5e", "body"),
      S("cta", "cta", "Répondez s'il vous plaît", 20, 90, 60, 12, 400, 1.4, 0.2, "center", "#c4a882", "heading"),
    ],
  },
];
