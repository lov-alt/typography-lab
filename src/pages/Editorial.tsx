import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import CodePreview from "../components/CodePreview";
import Slider from "../components/Slider";
import SectionLabel from "../components/SectionLabel";
import { useI18n } from "../i18n/index";

type LayoutType = "poster" | "magazine-spread" | "brochure" | "book-page";

const LAYOUTS: { value: LayoutType; labelKey: "poster" | "magazineSpread" | "brochure" | "bookPage" }[] = [
  { value: "poster", labelKey: "poster" },
  { value: "magazine-spread", labelKey: "magazineSpread" },
  { value: "brochure", labelKey: "brochure" },
  { value: "book-page", labelKey: "bookPage" },
];

export default function Editorial() {
  const { t } = useI18n();
  const [layout, setLayout] = useState<LayoutType>("poster");
  const [columns, setColumns] = useState(2);
  const [showImage, setShowImage] = useState(true);
  const [showPullQuote, setShowPullQuote] = useState(true);
  const [showDropCap, setShowDropCap] = useState(true);
  const [headingSize, setHeadingSize] = useState(48);
  const [bodySize, setBodySize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [pageWidth, setPageWidth] = useState(680);

  const cssCode = `.layout {
  max-width: ${pageWidth}px;
  font-size: ${bodySize}px;
  line-height: ${lineHeight};
  columns: ${columns};
  column-gap: 2rem;
}
.headline {
  font-size: ${headingSize}px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.drop-cap::first-letter {
  float: left;
  font-size: ${headingSize * 2}px;
  line-height: 0.8;`;

  const isWide = layout === "magazine-spread";
  const previewW = isWide ? Math.min(pageWidth * 1.5, 700) : pageWidth <= 560 ? pageWidth : 560;

  const controls = (
    <>
      <SectionLabel label={t.editorial.layout} />
      <div className="space-y-1">
        {LAYOUTS.map((l) => (
          <button key={l.value} type="button" onClick={() => setLayout(l.value)}
            className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-all ${
              layout === l.value
                ? "border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
            }`}>
            {t.editorial[l.labelKey]}
          </button>
        ))}
      </div>

      <SectionLabel label={t.editorial.columns} />
      <div className="flex gap-1">
        {[1, 2, 3].map((n) => (
          <button key={n} type="button" onClick={() => setColumns(n)}
            className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${
              columns === n ? "border-indigo-300 bg-indigo-50 text-indigo-700 font-medium" : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
            }`}>{n}</button>
        ))}
      </div>

      <SectionLabel label="Text" />
      <Slider label="Heading" value={headingSize} onChange={setHeadingSize} max={96} min={18} unit="px" />
      <Slider label="Body" value={bodySize} onChange={setBodySize} max={24} min={10} unit="px" />
      <Slider label="Line Height" value={Math.round(lineHeight * 100)} onChange={(v) => setLineHeight(v / 100)} max={250} min={100} unit="" />
      <Slider label="Width" value={pageWidth} onChange={setPageWidth} max={900} min={280} unit="px" />

      <div className="space-y-2 pt-1">
        <label className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
          <span>{t.editorial.showImage}</span>
          <input type="checkbox" checked={showImage} onChange={(e) => setShowImage(e.target.checked)} className="rounded accent-indigo-500" />
        </label>
        <label className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
          <span>{t.editorial.showPullQuote}</span>
          <input type="checkbox" checked={showPullQuote} onChange={(e) => setShowPullQuote(e.target.checked)} className="rounded accent-indigo-500" />
        </label>
        <label className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
          <span>{t.editorial.showDropCap}</span>
          <input type="checkbox" checked={showDropCap} onChange={(e) => setShowDropCap(e.target.checked)} className="rounded accent-indigo-500" />
        </label>
      </div>
    </>
  );

  return (
    <ToolLayout title={t.editorial.title} description={t.editorial.description} controls={controls}
      preview={
        <div className="w-full flex justify-center overflow-x-auto">
          <div className="bg-white dark:bg-zinc-900 shadow-xl ring-1 ring-zinc-900/5 dark:ring-white/5 rounded-lg p-6 sm:p-8 transition-all" style={{ maxWidth: previewW }}>
            {/* Poster Layout */}
            {layout === "poster" && (
              <div className="text-center space-y-4">
                {showImage && (
                  <div className="w-full h-32 bg-gradient-to-br from-indigo-400 via-purple-500 to-rose-400 rounded-lg opacity-80" />
                )}
                <h1 style={{ fontSize: headingSize, lineHeight: 1.1, fontWeight: 900, letterSpacing: "-0.03em" }} className="text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                  {t.editorial.headline}
                </h1>
                <p style={{ fontSize: bodySize * 1.4, fontWeight: 300, letterSpacing: "0.15em" }} className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                  {t.editorial.subhead}
                </p>
                <div className="w-16 h-px bg-zinc-300 dark:bg-zinc-700 mx-auto" />
                <p style={{ fontSize: bodySize, lineHeight, maxWidth: pageWidth * 0.6, margin: "0 auto" }} className="text-zinc-600 dark:text-zinc-300">
                  {t.editorial.bodyText}
                </p>
                <p style={{ fontSize: bodySize * 0.85 }} className="text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pt-4">
                  {t.editorial.caption}
                </p>
              </div>
            )}

            {/* Magazine Spread */}
            {layout === "magazine-spread" && (
              <div className="flex gap-6">
                <div className="flex-1 space-y-4">
                  {showImage && (
                    <div className="w-full h-48 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-lg opacity-80" />
                  )}
                  <h1 style={{ fontSize: headingSize, lineHeight: 1.1, fontWeight: 800, letterSpacing: "-0.02em" }} className="text-zinc-900 dark:text-zinc-100">
                    {t.editorial.headline}
                  </h1>
                  <p style={{ fontSize: bodySize * 1.2, fontWeight: 400 }} className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t.editorial.subhead}
                  </p>
                  <div style={{ fontSize: bodySize, lineHeight, columns, columnGap: "1.5rem" }} className="text-zinc-700 dark:text-zinc-300">
                    {showDropCap && (
                      <span style={{ float: "left", fontSize: headingSize * 1.6, lineHeight: 0.8, fontWeight: 700, paddingRight: 8, paddingTop: 4 }} className="text-zinc-900 dark:text-zinc-100">
                        {t.editorial.bodyText.charAt(0)}
                      </span>
                    )}
                    {t.editorial.bodyText}
                  </div>
                </div>
                {showPullQuote && (
                  <div className="w-48 shrink-0 flex items-center">
                    <blockquote style={{ fontSize: bodySize * 1.6, lineHeight: 1.25, fontWeight: 300, fontStyle: "italic" }} className="text-zinc-400 dark:text-zinc-500 border-l-2 border-indigo-300 dark:border-indigo-700 pl-4">
                      {t.editorial.pullQuote}
                    </blockquote>
                  </div>
                )}
              </div>
            )}

            {/* Brochure */}
            {layout === "brochure" && (
              <div className="flex gap-4">
                {[0, 1, 2].map((panel) => (
                  <div key={panel} className="flex-1 space-y-3 p-3" style={{ borderRight: panel < 2 ? "1px solid" : "none", borderColor: "var(--tw-border-color, #e4e4e7)" }}>
                    {showImage && panel === 1 && (
                      <div className="w-full h-24 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-400 rounded-lg opacity-80" />
                    )}
                    {panel === 0 && (
                      <h2 style={{ fontSize: headingSize * 0.6, fontWeight: 800, lineHeight: 1.15 }} className="text-zinc-900 dark:text-zinc-100">
                        {t.editorial.headline}
                      </h2>
                    )}
                    <p style={{ fontSize: bodySize * 0.9, lineHeight: 1.5 }} className="text-zinc-600 dark:text-zinc-300">
                      {t.editorial.bodyText.slice(0, 80)}...
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Book Page */}
            {layout === "book-page" && (
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-center space-y-2">
                  <p style={{ fontSize: bodySize * 0.8, letterSpacing: "0.1em" }} className="text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Chapter I
                  </p>
                  <h1 style={{ fontSize: headingSize, fontWeight: 700, lineHeight: 1.2 }} className="text-zinc-900 dark:text-zinc-100">
                    {t.editorial.headline}
                  </h1>
                  <p style={{ fontSize: bodySize * 0.9, fontStyle: "italic" }} className="text-zinc-500 dark:text-zinc-400">
                    {t.editorial.subhead}
                  </p>
                </div>
                <div className="w-12 h-px bg-zinc-300 dark:bg-zinc-700 mx-auto" />
                <div style={{ fontSize: bodySize, lineHeight }} className="text-zinc-700 dark:text-zinc-300">
                  {showDropCap && (
                    <span style={{ float: "left", fontSize: headingSize * 2, lineHeight: 0.75, fontWeight: 700, paddingRight: 8, paddingTop: 4 }} className="text-zinc-900 dark:text-zinc-100">
                      {t.editorial.bodyText.charAt(0)}
                    </span>
                  )}
                  {t.editorial.bodyText}
                </div>
                <p style={{ fontSize: bodySize, lineHeight }} className="text-zinc-700 dark:text-zinc-300 indent-8">
                  {t.editorial.bodyText}
                </p>
              </div>
            )}
          </div>
        </div>
      }
      code={<CodePreview codeMap={{ css: cssCode }} />}
    />
  );
}
