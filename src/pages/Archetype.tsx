import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useI18n } from "../i18n/index";
import { useFontImporter } from "../components/FontImporter";

type ArchetypeId = "editorial" | "poster" | "menu" | "book" | "hero" | "card";

interface ImportedFont { name: string; family: string; role: "heading" | "body" }

const DEFAULTS: Record<ArchetypeId, { headingFont: string; bodyFont: string; headingSize: number; bodySize: number; lineHeight: number }> = {
  editorial: { headingFont: "Georgia, serif", bodyFont: "Georgia, serif", headingSize: 40, bodySize: 15, lineHeight: 1.7 },
  poster: { headingFont: "Impact, sans-serif", bodyFont: "system-ui, sans-serif", headingSize: 72, bodySize: 16, lineHeight: 1.4 },
  menu: { headingFont: "Georgia, serif", bodyFont: "system-ui, sans-serif", headingSize: 20, bodySize: 13, lineHeight: 1.8 },
  book: { headingFont: "Georgia, serif", bodyFont: "Georgia, serif", headingSize: 28, bodySize: 14, lineHeight: 1.75 },
  hero: { headingFont: "system-ui, sans-serif", bodyFont: "system-ui, sans-serif", headingSize: 56, bodySize: 18, lineHeight: 1.5 },
  card: { headingFont: "system-ui, sans-serif", bodyFont: "system-ui, sans-serif", headingSize: 16, bodySize: 10, lineHeight: 1.4 },
};

export default function Archetype() {
  const { id } = useParams<{ id: string }>();
  const archetypeId = (id ?? "editorial") as ArchetypeId;
  const { t } = useI18n();
  const { importFont } = useFontImporter();

  const def = DEFAULTS[archetypeId] ?? DEFAULTS.editorial;

  const [headingFont, setHeadingFont] = useState(def.headingFont);
  const [bodyFont, setBodyFont] = useState(def.bodyFont);
  const [headingSize, setHeadingSize] = useState(def.headingSize);
  const [bodySize, setBodySize] = useState(def.bodySize);
  const [lineHeight, setLineHeight] = useState(def.lineHeight);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [importedFonts, setImportedFonts] = useState<ImportedFont[]>([]);
  const [showControls, setShowControls] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleFontDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["ttf", "otf", "woff", "woff2"].includes(ext)) return;
    try {
      const loaded = await importFont(file);
      setImportedFonts((prev) => [...prev, { ...loaded, role: "heading" }]);
    } catch { /* ignore invalid font files */ }
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setBgImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const applyFont = (family: string, role: "heading" | "body") => {
    if (role === "heading") setHeadingFont(family);
    else setBodyFont(family);
  };

  const reset = () => {
    setHeadingFont(def.headingFont);
    setBodyFont(def.bodyFont);
    setHeadingSize(def.headingSize);
    setBodySize(def.bodySize);
    setLineHeight(def.lineHeight);
    setBgImage(null);
  };

  const cssExport = `/* Typography Lab — ${t.archetypes[archetypeId]?.name ?? archetypeId} */
:root {
  --font-heading: ${headingFont};
  --font-body: ${bodyFont};
  --text-heading: ${headingSize}px;
  --text-body: ${bodySize}px;
  --leading: ${lineHeight};
}`;

  const info = t.archetypes[archetypeId];

  const renderLayout = () => {
    switch (archetypeId) {
      case "editorial":
        return <EditorialLayout t={t} headingFont={headingFont} bodyFont={bodyFont} headingSize={headingSize} bodySize={bodySize} lineHeight={lineHeight} bgImage={bgImage} />;
      case "poster":
        return <PosterLayout t={t} headingFont={headingFont} bodyFont={bodyFont} headingSize={headingSize} bodySize={bodySize} lineHeight={lineHeight} bgImage={bgImage} />;
      case "menu":
        return <MenuLayout t={t} headingFont={headingFont} bodyFont={bodyFont} headingSize={headingSize} bodySize={bodySize} lineHeight={lineHeight} bgImage={bgImage} />;
      case "book":
        return <BookLayout t={t} headingFont={headingFont} bodyFont={bodyFont} headingSize={headingSize} bodySize={bodySize} lineHeight={lineHeight} />;
      case "hero":
        return <HeroLayout t={t} headingFont={headingFont} bodyFont={bodyFont} headingSize={headingSize} bodySize={bodySize} lineHeight={lineHeight} bgImage={bgImage} />;
      case "card":
        return <CardLayout t={t} headingFont={headingFont} bodyFont={bodyFont} headingSize={headingSize} bodySize={bodySize} lineHeight={lineHeight} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] relative" onDrop={handleFontDrop} onDragOver={(e) => e.preventDefault()}>
      {/* Floating toolbar */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 shadow-2xl shadow-zinc-500/10">
          {/* Font import */}
          <button type="button" onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            {t.editor.importFont}
          </button>
          <input ref={fileRef} type="file" accept=".ttf,.otf,.woff,.woff2" onChange={async (e) => {
            const f = e.target.files?.[0]; if (f) { const loaded = await importFont(f); setImportedFonts((p) => [...p, { ...loaded, role: "heading" }]); }
          }} className="hidden" />

          {/* Image import */}
          <button type="button" onClick={() => imgRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            {t.editor.importImage}
          </button>
          <input ref={imgRef} type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = () => setBgImage(r.result as string); r.readAsDataURL(f); }
          }} className="hidden" />

          <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700" />

          {/* Size controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 w-12 text-right tabular-nums">{headingSize}px</span>
            <input type="range" min={12} max={120} value={headingSize} onChange={(e) => setHeadingSize(Number(e.target.value))} className="slider w-16" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 w-12 text-right tabular-nums">{bodySize}px</span>
            <input type="range" min={8} max={28} value={bodySize} onChange={(e) => setBodySize(Number(e.target.value))} className="slider w-16" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-400 w-12 text-right tabular-nums">{lineHeight.toFixed(2)}</span>
            <input type="range" min={100} max={280} value={Math.round(lineHeight * 100)} onChange={(e) => setLineHeight(Number(e.target.value) / 100)} className="slider w-16" />
          </div>

          <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700" />

          <button type="button" onClick={reset}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">{t.editor.reset}</button>

          <button type="button" onClick={() => navigator.clipboard.writeText(cssExport)}
            className="px-3 py-1.5 text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:opacity-80 transition-opacity">{t.editor.export}</button>
        </div>
      </div>

      {/* Toggle controls button */}
      <button type="button" onClick={() => setShowControls(!showControls)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-all">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>

      {/* Imported font list */}
      {importedFonts.length > 0 && (
        <div className="fixed top-20 right-6 z-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 shadow-lg space-y-1 max-w-48">
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Fonts</span>
          {importedFonts.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs truncate flex-1" style={{ fontFamily: f.family }}>{f.name}</span>
              <button type="button" onClick={() => applyFont(f.family, "heading")} className="text-[9px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">H</button>
              <button type="button" onClick={() => applyFont(f.family, "body")} className="text-[9px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">B</button>
            </div>
          ))}
        </div>
      )}

      {/* Main content area */}
      <div className="max-w-4xl mx-auto px-6 py-8"
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">{info?.name ?? archetypeId}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{info?.desc}</p>
        </div>

        {/* Layout preview */}
        <div className="bg-white dark:bg-zinc-900 shadow-xl ring-1 ring-zinc-900/5 dark:ring-white/5 rounded-2xl overflow-hidden">
          {renderLayout()}
        </div>
      </div>
    </div>
  );
}

/* ── Layout Renderers ─────────────────── */

function EditorialLayout({ t, headingFont, bodyFont, headingSize, bodySize, lineHeight, bgImage }: any) {
  return (
    <div className="p-8 sm:p-12" style={{ fontFamily: bodyFont }}>
      {bgImage && <img src={bgImage} alt="" className="w-full h-48 sm:h-64 object-cover rounded-xl mb-8" />}
      <h1 className="mb-4" style={{ fontFamily: headingFont, fontSize: headingSize, lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.015em" }}>{t.editor.heading}</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-8" style={{ fontSize: bodySize * 1.25, lineHeight: 1.4 }}>{t.editor.subhead}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ fontSize: bodySize, lineHeight }}>
        <div className="sm:col-span-2">
          <p className="mb-4"><span style={{ float: "left", fontFamily: headingFont, fontSize: headingSize * 1.8, lineHeight: 0.75, fontWeight: 700, paddingRight: 10, paddingTop: 4 }}>{t.editor.body.charAt(0)}</span>{t.editor.sampleBodyLong}</p>
          <p>{t.editor.sampleBody}</p>
        </div>
        <blockquote className="text-zinc-400 dark:text-zinc-500 border-l-2 border-zinc-300 dark:border-zinc-700 pl-4" style={{ fontSize: bodySize * 1.5, lineHeight: 1.3, fontStyle: "italic", fontFamily: headingFont }}>
          {t.editor.sampleBody.slice(0, 60)}...
        </blockquote>
      </div>
    </div>
  );
}

function PosterLayout({ t, headingFont, bodyFont, headingSize, bodySize, lineHeight, bgImage }: any) {
  return (
    <div className="text-center p-8 sm:p-12" style={{ fontFamily: bodyFont }}>
      {bgImage && <img src={bgImage} alt="" className="w-full h-40 sm:h-56 object-cover rounded-xl mb-8 opacity-90" />}
      <p className="uppercase tracking-[0.3em] mb-4" style={{ fontSize: bodySize * 0.85, fontWeight: 600, letterSpacing: "0.3em" }}>{t.editor.date}</p>
      <h1 className="mb-3 uppercase" style={{ fontFamily: headingFont, fontSize: headingSize, lineHeight: 1.05, fontWeight: 900, letterSpacing: "-0.03em" }}>{t.editor.heading}</h1>
      <p className="mb-6 uppercase tracking-[0.15em]" style={{ fontSize: bodySize * 1.3, letterSpacing: "0.15em" }}>{t.editor.subhead}</p>
      <div className="w-12 h-px bg-zinc-400 dark:bg-zinc-600 mx-auto mb-6" />
      <p className="max-w-sm mx-auto" style={{ fontSize: bodySize, lineHeight }}>{t.editor.sampleBody.slice(0, 100)}...</p>
      <p className="mt-6 uppercase tracking-[0.2em]" style={{ fontSize: bodySize * 0.85, letterSpacing: "0.2em" }}>{t.editor.location}</p>
    </div>
  );
}

function MenuLayout({ t, headingFont, bodyFont, headingSize, bodySize, bgImage }: any) {
  const items = [
    { name: t.editor.dishName, desc: t.editor.dishDesc, price: t.editor.price },
    { name: "松露奶油蘑菇汤", desc: "新鲜黑松露 · 野生蘑菇 · 法式奶油", price: "¥48" },
    { name: "慢煮三文鱼沙拉", desc: "挪威三文鱼 · 混合时蔬 · 柚子醋汁", price: "¥68" },
  ];
  return (
    <div className="p-8 sm:p-12" style={{ fontFamily: bodyFont }}>
      {bgImage && <img src={bgImage} alt="" className="w-full h-36 object-cover rounded-xl mb-8 opacity-90" />}
      <h1 className="text-center mb-8" style={{ fontFamily: headingFont, fontSize: headingSize, fontWeight: 600, letterSpacing: "0.05em" }}>{t.editor.heading}</h1>
      <div className="max-w-md mx-auto space-y-6">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-medium" style={{ fontSize: bodySize * 1.1 }}>{item.name}</span>
              <span className="tabular-nums ml-4" style={{ fontFamily: headingFont, fontSize: bodySize * 1.05 }}>{item.price}</span>
            </div>
            <p className="text-zinc-400 dark:text-zinc-500" style={{ fontSize: bodySize * 0.85, lineHeight: 1.5 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookLayout({ t, headingFont, bodyFont, headingSize, bodySize, lineHeight }: any) {
  return (
    <div className="p-8 sm:p-12" style={{ fontFamily: bodyFont }}>
      <div className="max-w-md mx-auto">
        <p className="text-center uppercase tracking-[0.2em] mb-8" style={{ fontSize: bodySize * 0.8, letterSpacing: "0.2em" }}>{t.editor.chapter}</p>
        <h1 className="text-center mb-10" style={{ fontFamily: headingFont, fontSize: headingSize, fontWeight: 700, lineHeight: 1.2 }}>{t.editor.heading}</h1>
        <div style={{ fontSize: bodySize, lineHeight }}>
          <p className="mb-4"><span style={{ float: "left", fontFamily: headingFont, fontSize: headingSize * 2.5, lineHeight: 0.72, fontWeight: 700, paddingRight: 10, paddingTop: 6 }}>{t.editor.body.charAt(0)}</span>{t.editor.sampleBodyLong}</p>
          <p className="indent-8 mb-4">{t.editor.sampleBody}</p>
          <p className="indent-8">{t.editor.sampleBody}</p>
        </div>
        <p className="text-center mt-8 text-zinc-400 dark:text-zinc-500 italic" style={{ fontSize: bodySize * 0.9 }}>— {t.editor.author}</p>
      </div>
    </div>
  );
}

function HeroLayout({ t, headingFont, bodyFont, headingSize, bodySize, lineHeight, bgImage }: any) {
  return (
    <div className="relative" style={{ fontFamily: bodyFont }}>
      {bgImage && <img src={bgImage} alt="" className="w-full h-64 sm:h-80 object-cover" />}
      <div className={`p-8 sm:p-12 ${bgImage ? "absolute inset-0 flex flex-col justify-center bg-black/40 text-white" : ""}`}>
        <div className="max-w-lg">
          <p className="uppercase tracking-[0.2em] mb-4 text-xs font-medium opacity-70">{t.editor.subhead}</p>
          <h1 className="mb-4" style={{ fontFamily: headingFont, fontSize: headingSize, lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.02em" }}>{t.editor.heading}</h1>
          <p className="mb-6 opacity-80" style={{ fontSize: bodySize, lineHeight }}>{t.editor.sampleBody.slice(0, 120)}...</p>
          <div className="flex gap-3">
            <span className="px-5 py-2.5 rounded-lg font-medium text-sm" style={{ background: bgImage ? "white" : "#6366f1", color: bgImage ? "#1e1b2e" : "white" }}>{t.editor.cta}</span>
            <span className="px-5 py-2.5 rounded-lg font-medium text-sm border border-current opacity-60">{t.editor.subhead}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardLayout({ t, headingFont, bodyFont, headingSize, bodySize, lineHeight }: any) {
  return (
    <div className="p-8 sm:p-12 flex items-center justify-center" style={{ fontFamily: bodyFont }}>
      <div className="w-80 sm:w-96 bg-[#faf9f7] dark:bg-zinc-800 rounded-xl p-6 shadow-md" style={{ fontFamily: bodyFont }}>
        <h1 className="mb-1" style={{ fontFamily: headingFont, fontSize: headingSize, fontWeight: 700 }}>{t.editor.author}</h1>
        <p className="mb-5 text-zinc-500 dark:text-zinc-400" style={{ fontSize: bodySize * 0.9 }}>{t.editor.subhead}</p>
        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-700 mb-5" />
        <div className="space-y-1.5" style={{ fontSize: bodySize, lineHeight }}>
          <p className="text-zinc-400 dark:text-zinc-500" style={{ fontSize: bodySize * 0.8 }}>contact</p>
          <p>hello@typography-lab.com</p>
          <p>+86 21 1234 5678</p>
        </div>
        <div className="mt-4 space-y-1" style={{ fontSize: bodySize, lineHeight }}>
          <p className="text-zinc-400 dark:text-zinc-500" style={{ fontSize: bodySize * 0.8 }}>address</p>
          <p>{t.editor.location}</p>
        </div>
      </div>
    </div>
  );
}
