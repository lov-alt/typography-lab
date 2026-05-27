import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import CodePreview from "../components/CodePreview";
import Slider from "../components/Slider";
import SectionLabel from "../components/SectionLabel";
import { useI18n } from "../i18n/index";

export default function MeasureRhythm() {
  const { t } = useI18n();
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [paragraphSpacing, setParagraphSpacing] = useState(1);
  const [containerWidth, setContainerWidth] = useState(680);

  const lineHeightPx = fontSize * lineHeight;
  const avgCharWidth = fontSize * 0.55;
  const cpl = Math.round(containerWidth / avgCharWidth);
  const isOptimal = cpl >= 45 && cpl <= 75;

  const cssCode = `:root {
  --font-size: ${fontSize}px;
  --line-height: ${lineHeight};
  --paragraph-spacing: ${paragraphSpacing}em;
  --measure: ${containerWidth}px;
  --cpl: ${cpl};
}

body {
  font-size: var(--font-size);
  line-height: var(--line-height);
  max-width: var(--measure);
}

p + p { margin-top: var(--paragraph-spacing)em; }`;

  const twCode = `// tailwind.config.js
theme: {
  extend: {
    fontSize: { base: '${fontSize}px' },
    lineHeight: { body: '${lineHeight}' },
    maxWidth: { prose: '${containerWidth}px' },
  },
}`;

  const jsonCode = JSON.stringify({ fontSize, lineHeight, paragraphSpacing, measure: containerWidth, cpl, optimal: isOptimal }, null, 2);


  const controls = (
    <>
      <SectionLabel label={t.measureRhythm.fontSize} />
      <Slider label={t.measureRhythm.fontSize} value={fontSize} onChange={setFontSize} max={28} min={12} unit="px" />

      <SectionLabel label={t.measureRhythm.lineHeight} />
      <Slider label={t.measureRhythm.lineHeight} value={Math.round(lineHeight * 100)} onChange={(v) => setLineHeight(v / 100)} max={250} min={100} unit="" />
      <span className="text-xs text-zinc-400">{lineHeight.toFixed(2)}</span>

      <SectionLabel label={t.measureRhythm.paragraphSpacing} />
      <Slider label={t.measureRhythm.paragraphSpacing} value={Math.round(paragraphSpacing * 100)} onChange={(v) => setParagraphSpacing(v / 100)} max={300} min={0} unit="em" />

      <SectionLabel label={t.measureRhythm.containerWidth} />
      <Slider label={t.measureRhythm.containerWidth} value={containerWidth} onChange={setContainerWidth} max={1200} min={280} unit="px" />

      {/* CPL indicator */}
      <div className={`p-3 rounded-lg border ${isOptimal ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-500/5" : "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-500/5"}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{t.measureRhythm.cpl}</span>
          <span className={`text-sm font-bold font-mono ${isOptimal ? "text-emerald-600" : "text-amber-600"}`}>{cpl}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
          <span>{t.measureRhythm.cplOptimal}: 45–75</span>
          <div className="flex-1 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-400 via-emerald-400 to-amber-400 rounded-full"
              style={{ width: "60%", marginLeft: "10%" }} />
            <div className="relative -top-1.5 w-2 h-3 bg-indigo-600 rounded-full"
              style={{ marginLeft: `${Math.max(0, Math.min(100, (cpl / 100) * 100))}%` }} />
          </div>
        </div>
        {!isOptimal && (
          <p className="text-[10px] text-amber-600 mt-1">
            {cpl < 45 ? "Too narrow — increase container width or reduce font size" : "Too wide — decrease container width or increase font size"}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
        {[
          { label: "CPL", value: cpl },
          { label: "Leading", value: `${lineHeightPx.toFixed(0)}px` },
          { label: "Ratio", value: `1:${lineHeight.toFixed(2)}` },
        ].map((s) => (
          <div key={s.label} className="py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <div className="font-mono font-semibold text-zinc-700 dark:text-zinc-300">{s.value}</div>
            <div className="text-zinc-400">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <ToolLayout title={t.measureRhythm.title} description={t.measureRhythm.description} controls={controls}
      preview={
        <div className="w-full">
          {/* Baseline grid background */}
          <div className="relative" style={{ maxWidth: containerWidth, margin: "0 auto" }}>
            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent ${lineHeightPx - 1}px, rgba(99,102,241,0.08) ${lineHeightPx - 1}px, rgba(99,102,241,0.08) ${lineHeightPx}px)` }} />

            <div style={{ fontSize, lineHeight, maxWidth: containerWidth }}>
              <p style={{ marginBottom: `${paragraphSpacing}em` }} className="text-zinc-700 dark:text-zinc-300">
                {t.measureRhythm.sample}
              </p>
              <p style={{ marginBottom: `${paragraphSpacing}em` }} className="text-zinc-700 dark:text-zinc-300">
                {t.measureRhythm.sample}
              </p>
            </div>
          </div>
        </div>
      }
      code={<CodePreview codeMap={{ css: cssCode, tailwind: twCode, json: jsonCode }} />}
    />
  );
}
