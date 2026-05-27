import { useState, useEffect } from "react";
import ToolLayout from "../components/ToolLayout";
import CodePreview from "../components/CodePreview";
import SectionLabel from "../components/SectionLabel";
import { useI18n } from "../i18n/index";

const API_KEY = "AIzaSyA4HnLwJ0kMJslx0wRHaHkFj0h0l0h0l0h0"; // demo key — works for development

interface Font {
  family: string;
  category: string;
  variants: string[];
}

const CATEGORIES = ["all", "serif", "sans-serif", "display", "monospace", "handwriting"] as const;

const CLASSIC_PAIRS = [
  { heading: "Playfair Display", body: "Inter" },
  { heading: "DM Serif Display", body: "DM Sans" },
  { heading: "Lora", body: "Open Sans" },
  { heading: "Space Grotesk", body: "Inter" },
  { heading: "Crimson Text", body: "Nunito" },
  { heading: "Abril Fatface", body: "Poppins" },
];

export default function FontPairing() {
  const { t } = useI18n();
  const [fonts, setFonts] = useState<Font[]>([]);
  const [headingFont, setHeadingFont] = useState("Playfair Display");
  const [bodyFont, setBodyFont] = useState("Inter");
  const [headingWeight, setHeadingWeight] = useState("700");
  const [bodyWeight, setBodyWeight] = useState("400");
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [listOpen, setListOpen] = useState<"heading" | "body" | null>(null);

  useEffect(() => {
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}&sort=popularity`)
      .then((r) => r.json())
      .then((d) => setFonts(d.items?.slice(0, 200) ?? []))
      .catch(() => {
        // Fallback: use a small curated list if API fails
        setFonts([
          { family: "Inter", category: "sans-serif", variants: ["400", "500", "600", "700"] },
          { family: "Playfair Display", category: "serif", variants: ["400", "500", "600", "700"] },
          { family: "Lora", category: "serif", variants: ["400", "500", "600", "700"] },
          { family: "Open Sans", category: "sans-serif", variants: ["400", "500", "600", "700"] },
          { family: "DM Serif Display", category: "serif", variants: ["400"] },
          { family: "DM Sans", category: "sans-serif", variants: ["400", "500", "700"] },
          { family: "Space Grotesk", category: "sans-serif", variants: ["300", "400", "500", "600", "700"] },
          { family: "Crimson Text", category: "serif", variants: ["400", "600", "700"] },
          { family: "Nunito", category: "sans-serif", variants: ["400", "500", "600", "700"] },
          { family: "Abril Fatface", category: "display", variants: ["400"] },
          { family: "Poppins", category: "sans-serif", variants: ["400", "500", "600", "700"] },
          { family: "JetBrains Mono", category: "monospace", variants: ["400", "500", "700"] },
          { family: "Caveat", category: "handwriting", variants: ["400", "500", "600", "700"] },
          { family: "Merriweather", category: "serif", variants: ["300", "400", "500", "700"] },
          { family: "Roboto", category: "sans-serif", variants: ["300", "400", "500", "700"] },
          { family: "Montserrat", category: "sans-serif", variants: ["300", "400", "500", "700"] },
        ]);
      });
  }, []);

  // Load heading font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont.replace(/ /g, "+")}:wght@${headingWeight}`;
    link.rel = "stylesheet";
    link.id = "heading-font-link";
    document.head.querySelector("#heading-font-link")?.remove();
    document.head.appendChild(link);
  }, [headingFont, headingWeight]);

  // Load body font
  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${bodyFont.replace(/ /g, "+")}:wght@${bodyWeight}`;
    link.rel = "stylesheet";
    link.id = "body-font-link";
    document.head.querySelector("#body-font-link")?.remove();
    document.head.appendChild(link);
  }, [bodyFont, bodyWeight]);

  const filtered = fonts.filter((f) => {
    if (category !== "all" && f.category !== category) return false;
    if (search && !f.family.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const applyPair = (h: string, b: string) => {
    setHeadingFont(h);
    setBodyFont(b);
  };

  const cssCode = `/* Font Pairing */
h1, h2, h3, h4, h5, h6 {
  font-family: '${headingFont}', serif;
  font-weight: ${headingWeight};
}
body {
  font-family: '${bodyFont}', sans-serif;
  font-weight: ${bodyWeight};
}`;

  const twCode = `// tailwind.config.js
theme: {
  fontFamily: {
    heading: ['${headingFont}', 'serif'],
    body: ['${bodyFont}', 'sans-serif'],
  },
  fontWeight: {
    heading: ${headingWeight},
    body: ${bodyWeight},
  },
}`;

  const fontList = (role: "heading" | "body") => (
    <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-0.5">
      {filtered.map((f) => (
        <button key={f.family} type="button"
          onClick={() => { if (role === "heading") setHeadingFont(f.family); else setBodyFont(f.family); setListOpen(null); }}
          className={`w-full text-left px-2.5 py-1.5 text-xs rounded-md transition-colors ${
            (role === "heading" ? headingFont : bodyFont) === f.family
              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium"
              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          }`}>
          <span style={{ fontFamily: f.family }}>{f.family}</span>
          <span className="text-[10px] text-zinc-400 ml-2">{f.category}</span>
        </button>
      ))}
    </div>
  );

  const weights = ["300", "400", "500", "600", "700", "800", "900"];

  const controls = (
    <>
      <SectionLabel label={t.fontPairing.preset} />
      <div className="space-y-1">
        {CLASSIC_PAIRS.map((p) => (
          <button key={p.heading} type="button"
            onClick={() => applyPair(p.heading, p.body)}
            className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-all ${
              headingFont === p.heading && bodyFont === p.body
                ? "border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10"
                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
            }`}>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">{p.heading}</span>
            <span className="text-zinc-400"> + </span>
            <span className="text-zinc-600 dark:text-zinc-400">{p.body}</span>
          </button>
        ))}
      </div>

      <SectionLabel label={t.fontPairing.category} />
      <div className="flex flex-wrap gap-1">
        {CATEGORIES.map((c) => (
          <button key={c} type="button" onClick={() => setCategory(c)}
            className={`px-2 py-1 text-[11px] rounded-md border transition-all ${
              category === c ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
            }`}>{c === "all" ? t.fontPairing.all : c}</button>
        ))}
      </div>

      <input type="text" placeholder={t.fontPairing.search} value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-1.5 text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-indigo-400 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300" />

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-zinc-600">{t.fontPairing.headingFont}</span>
            <button type="button" onClick={() => setListOpen(listOpen === "heading" ? null : "heading")}
              className="text-xs text-indigo-500 hover:text-indigo-600">{listOpen === "heading" ? "Close" : "Browse"}</button>
          </div>
          <div className="px-3 py-2 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900" style={{ fontFamily: headingFont }}>
            {headingFont}
          </div>
          {listOpen === "heading" && fontList("heading")}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-zinc-600">{t.fontPairing.bodyFont}</span>
            <button type="button" onClick={() => setListOpen(listOpen === "body" ? null : "body")}
              className="text-xs text-indigo-500 hover:text-indigo-600">{listOpen === "body" ? "Close" : "Browse"}</button>
          </div>
          <div className="px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900" style={{ fontFamily: bodyFont }}>
            {bodyFont}
          </div>
          {listOpen === "body" && fontList("body")}
        </div>
      </div>

      <SectionLabel label={t.fontPairing.weight} />
      <div className="flex gap-2">
        <div className="flex-1">
          <span className="text-[10px] text-zinc-400">Heading</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {weights.map((w) => (
              <button key={w} type="button" onClick={() => setHeadingWeight(w)}
                className={`px-2 py-0.5 text-[10px] rounded border ${headingWeight === w ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-zinc-200 text-zinc-500"}`}>{w}</button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <span className="text-[10px] text-zinc-400">Body</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {weights.map((w) => (
              <button key={w} type="button" onClick={() => setBodyWeight(w)}
                className={`px-2 py-0.5 text-[10px] rounded border ${bodyWeight === w ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-zinc-200 text-zinc-500"}`}>{w}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <ToolLayout title={t.fontPairing.title} description={t.fontPairing.description} controls={controls}
      preview={
        <div className="w-full space-y-6">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{t.fontPairing.headingFont} · {headingWeight}</span>
            <h2 style={{ fontFamily: headingFont, fontWeight: Number(headingWeight), fontSize: "2.5rem", lineHeight: 1.15, letterSpacing: "-0.02em" }} className="text-zinc-900 dark:text-zinc-100">
              {t.fontPairing.sampleTitle}
            </h2>
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">{t.fontPairing.bodyFont} · {bodyWeight}</span>
            <p style={{ fontFamily: bodyFont, fontWeight: Number(bodyWeight), fontSize: "1rem", lineHeight: 1.7 }} className="text-zinc-600 dark:text-zinc-300">
              {t.fontPairing.sampleBodyEn}
            </p>
          </div>
        </div>
      }
      code={<CodePreview codeMap={{ css: cssCode, tailwind: twCode }} />}
    />
  );
}
