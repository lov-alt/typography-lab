/* ── Typography Knowledge Base ────────── */

export interface TypeBlock {
  id: string;
  role: "headline" | "subhead" | "body" | "info" | "date" | "cta";
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
  hasImageZone: boolean;
  blocks: TypeBlock[];
}

export const CONTENT_TYPES: LayoutRule[] = [
  {
    id: "rock-concert",
    name: { zh: "摇滚音乐会", en: "Rock Concert" },
    desc: { zh: "乐队演出、音乐节海报——大字标题、强烈对比、不对称网格", en: "Band gig, music festival poster — bold, high contrast, asymmetric grid" },
    tradition: "Swiss / International Typographic Style (Müller-Brockmann, 1950s)",
    style: ["grid-based", "asymmetric", "high-contrast", "sans-serif"],
    canvasBg: "#e8e5df",
    palette: ["#1a1a1a", "#e63946", "#f1faee", "#457b9d"],
    hasImageZone: true,
    blocks: [
      { id: "band", role: "headline", text: "THE VELVET\nUNDERGROUND", x: 6, y: 10, w: 88, fontSize: 52, fontWeight: 700, lineHeight: 1.05, letterSpacing: -0.02, alignment: "left", color: "#e63946", fontFamily: "heading" },
      { id: "headline", role: "headline", text: "LIVE\nIN CONCERT", x: 6, y: 30, w: 65, fontSize: 96, fontWeight: 900, lineHeight: 0.95, letterSpacing: -0.03, alignment: "left", color: "#1a1a1a", fontFamily: "heading" },
      { id: "date", role: "date", text: "2026.07.15 SAT · 20:00", x: 6, y: 75, w: 40, fontSize: 14, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0.1, alignment: "left", color: "#1a1a1a", fontFamily: "body" },
      { id: "location", role: "info", text: "O2 Academy Brixton\nLondon, UK", x: 6, y: 82, w: 40, fontSize: 13, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0.02, alignment: "left", color: "#457b9d", fontFamily: "body" },
      { id: "cta", role: "cta", text: "TICKETS →", x: 6, y: 91, w: 30, fontSize: 16, fontWeight: 700, lineHeight: 1, letterSpacing: 0.15, alignment: "left", color: "#e63946", fontFamily: "heading" },
    ],
  },
  {
    id: "classical-concert",
    name: { zh: "古典音乐会", en: "Classical Concert" },
    desc: { zh: "交响乐、室内乐、歌剧——优雅衬线体、居中对称、金色点缀", en: "Symphony, chamber music — elegant serif, centered, gold accents" },
    tradition: "Didone / Modern (Bodoni, Didot, 18th–19th century)",
    style: ["high-contrast", "elegant", "refined", "centered"],
    canvasBg: "#faf8f5",
    palette: ["#2c1810", "#8b6914", "#d4a853", "#3d2b1f"],
    hasImageZone: false,
    blocks: [
      { id: "composer", role: "subhead", text: "LUDWIG VAN BEETHOVEN", x: 10, y: 12, w: 80, fontSize: 22, fontWeight: 400, lineHeight: 1.3, letterSpacing: 0.2, alignment: "center", color: "#8b6914", fontFamily: "body" },
      { id: "headline", role: "headline", text: "SYMPHONY\nNO. 9", x: 10, y: 25, w: 80, fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: 0.05, alignment: "center", color: "#2c1810", fontFamily: "heading" },
      { id: "conductor", role: "subhead", text: "Herbert von Karajan · Berlin Philharmonic", x: 15, y: 48, w: 70, fontSize: 16, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0.08, alignment: "center", color: "#3d2b1f", fontFamily: "body" },
      { id: "date", role: "date", text: "2026 · 09 · 22   |   19 : 30", x: 15, y: 58, w: 70, fontSize: 18, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0.15, alignment: "center", color: "#2c1810", fontFamily: "heading" },
      { id: "location", role: "info", text: "Musikverein, Großer Saal\nWien, Österreich", x: 15, y: 68, w: 70, fontSize: 14, fontWeight: 400, lineHeight: 1.6, letterSpacing: 0.1, alignment: "center", color: "#8b6914", fontFamily: "body" },
    ],
  },
  {
    id: "sports-event",
    name: { zh: "体育赛事", en: "Sports Event" },
    desc: { zh: "运动会、锦标赛、马拉松——动态斜体、高能量、强烈方向感", en: "Championship, tournament — dynamic italic, high energy" },
    tradition: "New Wave / Postmodern (Weingart, Greiman, 1970s–80s)",
    style: ["dynamic", "angled", "energetic", "italic"],
    canvasBg: "#0a0a0f",
    palette: ["#ffffff", "#ff6b35", "#00d4aa", "#ffd700"],
    hasImageZone: true,
    blocks: [
      { id: "subhead", role: "subhead", text: "2026 GRAND FINAL", x: 4, y: 20, w: 60, fontSize: 32, fontWeight: 800, lineHeight: 1.1, letterSpacing: 0.2, alignment: "left", color: "#ff6b35", fontFamily: "heading" },
      { id: "headline", role: "headline", text: "CHAMPIONS\nLEAGUE", x: 4, y: 38, w: 92, fontSize: 108, fontWeight: 900, lineHeight: 0.9, letterSpacing: -0.04, alignment: "left", color: "#ffffff", fontFamily: "heading" },
      { id: "vs", role: "subhead", text: "FC BARCELONA  vs  MAN CITY", x: 4, y: 68, w: 70, fontSize: 22, fontWeight: 700, lineHeight: 1.3, letterSpacing: 0.08, alignment: "left", color: "#00d4aa", fontFamily: "body" },
      { id: "date", role: "date", text: "SUNDAY · JUNE 14 · 21:00 CET", x: 4, y: 78, w: 50, fontSize: 14, fontWeight: 600, lineHeight: 1.4, letterSpacing: 0.12, alignment: "left", color: "#e0e0e0", fontFamily: "body" },
      { id: "location", role: "info", text: "WEMBLEY STADIUM, LONDON", x: 4, y: 85, w: 50, fontSize: 12, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0.15, alignment: "left", color: "#ffd700", fontFamily: "body" },
      { id: "cta", role: "cta", text: "GET TICKETS", x: 4, y: 92, w: 40, fontSize: 18, fontWeight: 800, lineHeight: 1, letterSpacing: 0.2, alignment: "left", color: "#ff6b35", fontFamily: "heading" },
    ],
  },
  {
    id: "academic-conference",
    name: { zh: "学术会议", en: "Academic Conference" },
    desc: { zh: "学术研讨、论文发表——清晰层级、人文主义字体、理性冷静", en: "Symposium — clear hierarchy, humanist type, rational" },
    tradition: "Old Style / Humanist (Garamond, Jenson, 15th–16th century)",
    style: ["warm", "readable", "scholarly", "structured"],
    canvasBg: "#fefdfb",
    palette: ["#1a1a2e", "#0f3460", "#e94560", "#e8e8e8"],
    hasImageZone: false,
    blocks: [
      { id: "org", role: "info", text: "INTERNATIONAL SOCIETY OF\nTYPOGRAPHIC DESIGNERS", x: 8, y: 8, w: 50, fontSize: 11, fontWeight: 500, lineHeight: 1.5, letterSpacing: 0.15, alignment: "left", color: "#0f3460", fontFamily: "body" },
      { id: "headline", role: "headline", text: "The Materiality\nof Digital Type", x: 8, y: 22, w: 84, fontSize: 62, fontWeight: 700, lineHeight: 1.08, letterSpacing: -0.015, alignment: "left", color: "#1a1a2e", fontFamily: "heading" },
      { id: "subhead", role: "subhead", text: "15th Annual Conference on Typographic Research", x: 8, y: 52, w: 65, fontSize: 18, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0, alignment: "left", color: "#0f3460", fontFamily: "body" },
      { id: "speaker", role: "subhead", text: "Keynote: Dr. Elena Vasquez · TypeLab Berlin\nPanel: Prof. James Chen · RISD", x: 8, y: 63, w: 55, fontSize: 14, fontWeight: 400, lineHeight: 1.6, letterSpacing: 0.02, alignment: "left", color: "#1a1a2e", fontFamily: "body" },
      { id: "date", role: "date", text: "NOV 3–5, 2026", x: 8, y: 78, w: 40, fontSize: 16, fontWeight: 600, lineHeight: 1.3, letterSpacing: 0.1, alignment: "left", color: "#e94560", fontFamily: "heading" },
      { id: "location", role: "info", text: "ETH Zürich · Hauptgebäude\nRämistrasse 101, Zürich", x: 8, y: 87, w: 40, fontSize: 12, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0.05, alignment: "left", color: "#0f3460", fontFamily: "body" },
    ],
  },
  {
    id: "art-exhibition",
    name: { zh: "艺术展览", en: "Art Exhibition" },
    desc: { zh: "画廊展览、艺术家个展——大量留白、实验性排版、让作品呼吸", en: "Gallery show — generous whitespace, experimental type" },
    tradition: "Minimalism (Rams, Japanese ma, 1960s–present)",
    style: ["minimal", "whitespace", "precise", "calm"],
    canvasBg: "#f4f0eb",
    palette: ["#1c1c1c", "#f4f0eb", "#c4b5a5", "#8c7b6b"],
    hasImageZone: true,
    blocks: [
      { id: "artist", role: "subhead", text: "YAYOI KUSAMA", x: 72, y: 8, w: 22, fontSize: 12, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0.2, alignment: "right", color: "#8c7b6b", fontFamily: "body" },
      { id: "headline", role: "headline", text: "無限の鏡", x: 8, y: 55, w: 84, fontSize: 42, fontWeight: 300, lineHeight: 1.15, letterSpacing: 0.08, alignment: "left", color: "#1c1c1c", fontFamily: "heading" },
      { id: "subhead", role: "subhead", text: "Infinity Mirrors · A Retrospective", x: 8, y: 70, w: 60, fontSize: 16, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0.05, alignment: "left", color: "#8c7b6b", fontFamily: "body" },
      { id: "date", role: "date", text: "2026.03.15 — 2026.09.30", x: 8, y: 80, w: 40, fontSize: 13, fontWeight: 400, lineHeight: 1.5, letterSpacing: 0.1, alignment: "left", color: "#1c1c1c", fontFamily: "body" },
      { id: "location", role: "info", text: "The Museum of Modern Art\n11 West 53 Street, New York", x: 8, y: 88, w: 45, fontSize: 12, fontWeight: 300, lineHeight: 1.5, letterSpacing: 0.05, alignment: "left", color: "#8c7b6b", fontFamily: "body" },
    ],
  },
  {
    id: "product-launch",
    name: { zh: "产品发布", en: "Product Launch" },
    desc: { zh: "科技产品、品牌发布会——极致简洁、精准网格、让产品说话", en: "Tech launch — extreme simplicity, precise grid" },
    tradition: "Minimalism (Rams, Japanese ma, 1960s–present)",
    style: ["minimal", "whitespace", "precise", "essential"],
    canvasBg: "#1a1a1a",
    palette: ["#ffffff", "#a0a0a0", "#6366f1", "#3b82f6"],
    hasImageZone: true,
    blocks: [
      { id: "headline", role: "headline", text: "Think\nDifferent.", x: 8, y: 38, w: 70, fontSize: 80, fontWeight: 300, lineHeight: 1.0, letterSpacing: -0.02, alignment: "left", color: "#ffffff", fontFamily: "heading" },
      { id: "subhead", role: "subhead", text: "Introducing the next generation of creative tools.\nPowered by intelligence, designed for humans.", x: 8, y: 68, w: 45, fontSize: 16, fontWeight: 300, lineHeight: 1.5, letterSpacing: 0, alignment: "left", color: "#a0a0a0", fontFamily: "body" },
      { id: "date", role: "date", text: "Launch Event · 2026.10.12 · 10:00 PDT", x: 8, y: 84, w: 50, fontSize: 13, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0.05, alignment: "left", color: "#6366f1", fontFamily: "body" },
      { id: "cta", role: "cta", text: "Watch the keynote →", x: 8, y: 92, w: 40, fontSize: 15, fontWeight: 600, lineHeight: 1, letterSpacing: 0.02, alignment: "left", color: "#3b82f6", fontFamily: "heading" },
    ],
  },
  {
    id: "film-festival",
    name: { zh: "电影节", en: "Film Festival" },
    desc: { zh: "电影节、影展——戏剧化、电影感、暗色调氛围", en: "Film festival — dramatic, cinematic, dark atmosphere" },
    tradition: "Russian Constructivism (Rodchenko, Lissitzky, 1920s)",
    style: ["geometric", "bold", "diagonal", "red-black"],
    canvasBg: "#0d0d0d",
    palette: ["#ffffff", "#e63946", "#f4a261", "#e9c46a"],
    hasImageZone: true,
    blocks: [
      { id: "headline", role: "headline", text: "CANNES", x: 5, y: 20, w: 90, fontSize: 130, fontWeight: 900, lineHeight: 0.85, letterSpacing: -0.02, alignment: "left", color: "#ffffff", fontFamily: "heading" },
      { id: "subhead", role: "subhead", text: "79th INTERNATIONAL\nFILM FESTIVAL", x: 5, y: 55, w: 60, fontSize: 24, fontWeight: 400, lineHeight: 1.2, letterSpacing: 0.25, alignment: "left", color: "#e63946", fontFamily: "heading" },
      { id: "info", role: "info", text: "PALME D'OR · UN CERTAIN REGARD\nDIRECTORS' FORTNIGHT · CRITICS' WEEK", x: 5, y: 72, w: 55, fontSize: 12, fontWeight: 500, lineHeight: 1.6, letterSpacing: 0.08, alignment: "left", color: "#f4a261", fontFamily: "body" },
      { id: "date", role: "date", text: "14–25 MAI 2026", x: 5, y: 86, w: 40, fontSize: 18, fontWeight: 700, lineHeight: 1.3, letterSpacing: 0.1, alignment: "left", color: "#ffffff", fontFamily: "heading" },
      { id: "location", role: "info", text: "PALAIS DES FESTIVALS · CANNES · FRANCE", x: 5, y: 93, w: 50, fontSize: 11, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0.12, alignment: "left", color: "#e9c46a", fontFamily: "body" },
    ],
  },
  {
    id: "wedding",
    name: { zh: "婚礼请柬", en: "Wedding Invitation" },
    desc: { zh: "婚礼邀请函——古典衬线、居中对称、柔和色调、浪漫留白", en: "Wedding — classic serif, centered, soft tones, romantic" },
    tradition: "Didone / Modern (Bodoni, Didot, 18th–19th century)",
    style: ["elegant", "centered", "romantic", "soft"],
    canvasBg: "#fdfaf5",
    palette: ["#3d2b1f", "#c4a882", "#d4c5b9", "#8b6f5e"],
    hasImageZone: false,
    blocks: [
      { id: "headline", role: "headline", text: "Sarah & James", x: 15, y: 22, w: 70, fontSize: 64, fontWeight: 400, lineHeight: 1.15, letterSpacing: 0.05, alignment: "center", color: "#3d2b1f", fontFamily: "heading" },
      { id: "subhead", role: "subhead", text: "together with their families\ninvite you to celebrate their marriage", x: 18, y: 46, w: 64, fontSize: 16, fontWeight: 400, lineHeight: 1.6, letterSpacing: 0.04, alignment: "center", color: "#8b6f5e", fontFamily: "body" },
      { id: "date", role: "date", text: "SATURDAY · THE TWENTY-THIRD OF AUGUST\nTWO THOUSAND AND TWENTY-SIX", x: 15, y: 62, w: 70, fontSize: 15, fontWeight: 600, lineHeight: 1.6, letterSpacing: 0.12, alignment: "center", color: "#c4a882", fontFamily: "heading" },
      { id: "info", role: "info", text: "CEREMONY AT FOUR IN THE AFTERNOON\nVILLA BALBIANELLO · LAKE COMO · ITALY", x: 15, y: 77, w: 70, fontSize: 13, fontWeight: 400, lineHeight: 1.7, letterSpacing: 0.08, alignment: "center", color: "#8b6f5e", fontFamily: "body" },
      { id: "cta", role: "cta", text: "Répondez s'il vous plaît", x: 20, y: 90, w: 60, fontSize: 12, fontWeight: 400, lineHeight: 1.4, letterSpacing: 0.2, alignment: "center", color: "#c4a882", fontFamily: "heading" },
    ],
  },
];
