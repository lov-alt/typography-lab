import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import CodePreview from "../components/CodePreview";
import Slider from "../components/Slider";
import SectionLabel from "../components/SectionLabel";
import { useI18n } from "../i18n/index";

const SCALES: { value: number; label: string }[] = [
  { value: 1.2, label: "Minor Third · 1.200" },
  { value: 1.25, label: "Major Third · 1.250" },
  { value: 1.333, label: "Perfect Fourth · 1.333" },
  { value: 1.414, label: "Augmented Fourth · 1.414" },
  { value: 1.5, label: "Perfect Fifth · 1.500" },
  { value: 1.618, label: "Golden Ratio · 1.618" },
  { value: 0, label: "Custom" },
];

const LEVELS = [
  { key: "h1", label: "H1", role: "heading" },
  { key: "h2", label: "H2", role: "heading" },
  { key: "h3", label: "H3", role: "heading" },
  { key: "h4", label: "H4", role: "heading" },
  { key: "h5", label: "H5", role: "heading" },
  { key: "h6", label: "H6", role: "heading" },
  { key: "body", label: "Body", role: "body" },
  { key: "small", label: "Small", role: "caption" },
  { key: "caption", label: "Caption", role: "caption" },
] as const;

// h1 = base * ratio^6, h2 = base * ratio^5 ... body = base, caption = base / ratio
const LEVEL_POWERS: Record<string, number> = {
  h1: 6, h2: 5, h3: 4, h4: 3, h5: 2, h6: 1, body: 0, small: -1, caption: -2,
};

export default function TypeScale() {
  const { t } = useI18n();
  const [baseSize, setBaseSize] = useState(16);
  const [remBase, setRemBase] = useState(16);
  const [customRatio, setCustomRatio] = useState(1.25);
  const [selectedScale, setSelectedScale] = useState(1.25);

  const effectiveRatio = selectedScale === 0 ? customRatio : selectedScale;

  const handleScale = (v: number) => {
    setSelectedScale(v);
  };

  const handleCustomRatio = (v: number) => {
    setCustomRatio(v);
    setSelectedScale(0);
  };

  const levels = LEVELS.map(({ key, label, role }) => {
    const power = LEVEL_POWERS[key] ?? 0;
    const px = Math.round(baseSize * Math.pow(effectiveRatio, power) * 100) / 100;
    const rem = Math.round((px / remBase) * 1000) / 1000;
    return { key, label, role, px, rem };
  });

  const scaleOpts = SCALES.map((s) => ({ value: s.value, label: s.label }));
  const scaleValue = selectedScale;

  // CSS custom properties export
  const cssCode = `:root {\n${levels.map((l) => `  --text-${l.key}: ${l.rem}rem;  /* ${l.px}px */`).join("\n")}\n  --text-base: ${(baseSize / remBase).toFixed(3)}rem;\n  --leading-base: 1.6;\n}`;
  const twCode = `// tailwind.config.js\ntheme: {\n  fontSize: {\n${levels.map((l) => `    '${l.key}': ['${l.rem}rem', { lineHeight: '${l.role === "heading" ? 1.2 : 1.6}' }],`).join("\n")}\n  },\n}`;
  const jsonCode = JSON.stringify({ baseSize, ratio: effectiveRatio, remBase, scale: Object.fromEntries(levels.map((l) => [l.key, { px: l.px, rem: l.rem }])) }, null, 2);

  const controls = (
    <>
      <SectionLabel label={t.typeScale.baseSize} />
      <Slider label={t.typeScale.baseSize} value={baseSize} onChange={setBaseSize} max={32} min={12} unit="px" />

      <SectionLabel label={t.typeScale.remBase} />
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-400 shrink-0">{t.typeScale.remBase}</span>
        <input type="number" value={remBase} onChange={(e) => setRemBase(Number(e.target.value) || 16)}
          className="w-16 px-2 py-1 text-xs font-mono border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-indigo-400 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300" />
        <span className="text-xs text-zinc-400">px</span>
      </div>

      <SectionLabel label={t.typeScale.scale} />
      <div className="space-y-2">
        {scaleOpts.map((opt) => (
          <button key={opt.value} type="button" onClick={() => handleScale(opt.value)}
            className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-all ${
              scaleValue === opt.value
                ? "border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-medium"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
            }`}>
            {opt.label}
          </button>
        ))}
      </div>

      {selectedScale === 0 && (
        <div>
          <Slider label={t.typeScale.scaleCustom} value={Math.round(customRatio * 1000)} onChange={(v) => handleCustomRatio(v / 1000)} max={3000} min={1000} unit="" />
          <span className="text-xs text-zinc-400">{(customRatio).toFixed(3)}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-zinc-400 pt-2">
        {levels.map((l) => (
          <div key={l.key} className="flex justify-between py-0.5 px-2 rounded bg-zinc-50 dark:bg-zinc-800/50">
            <span className="font-medium">{l.label}</span>
            <span>{l.px}px / {l.rem}rem</span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <ToolLayout title={t.typeScale.title} description={t.typeScale.description} controls={controls}
      preview={
        <div className="w-full space-y-4">
          {levels.map((l) => (
            <div key={l.key} className="group">
              <div className="flex items-baseline gap-3 mb-0.5">
                <span className="text-[10px] font-mono text-zinc-400 w-12 shrink-0">{l.label}</span>
                <span className="text-[10px] font-mono text-zinc-300 w-24 shrink-0">{l.px}px / {l.rem}rem</span>
              </div>
              {l.role === "heading" ? (
                <div style={{ fontSize: `${l.px}px`, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em" }} className="text-zinc-900 dark:text-zinc-100">
                  {t.typeScale.sampleHeading}
                </div>
              ) : l.role === "caption" ? (
                <div style={{ fontSize: `${l.px}px`, lineHeight: 1.5 }} className="text-zinc-400 dark:text-zinc-500 italic">
                  {t.typeScale.sampleCaption}
                </div>
              ) : (
                <div style={{ fontSize: `${l.px}px`, lineHeight: 1.6 }} className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {t.typeScale.sampleBody}
                </div>
              )}
            </div>
          ))}
        </div>
      }
      code={<CodePreview codeMap={{ css: cssCode, tailwind: twCode, json: jsonCode }} />}
    />
  );
}
