import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useFontImporter } from "../components/FontImporter";
import { CONTENT_TYPES, type TypeBlock } from "../data/typography-rules";

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const { importFont } = useFontImporter();
  const rule = CONTENT_TYPES.find((r) => r.id === id) ?? CONTENT_TYPES[0];
  const [blocks, setBlocks] = useState<TypeBlock[]>(() => rule.blocks.map((b) => ({ ...b })));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [fonts, setFonts] = useState<{ name: string; family: string }[]>([]);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    setBlocks(rule.blocks.map((b) => ({ ...b })));
    setSelectedId(null);
    setBgImage(null);
  }, [id]);

  const selected = blocks.find((b) => b.id === selectedId);

  const updateBlock = (blockId: string, patch: Partial<TypeBlock>) => {
    setBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, ...patch } : b)));
  };

  /* ── Drag text blocks on canvas ───── */

  const handleBlockMouseDown = useCallback((e: React.MouseEvent, blockId: string) => {
    e.stopPropagation();
    setSelectedId(blockId);
    const block = blocks.find((b) => b.id === blockId);
    if (!block) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const origX = block.x;
    const origY = block.y;

    const onMove = (ev: MouseEvent) => {
      const dx = ((ev.clientX - startX) / rule.canvasW) * 100;
      const dy = ((ev.clientY - startY) / rule.canvasH) * 100;
      updateBlock(blockId, { x: origX + dx, y: origY + dy });
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [blocks, rule.canvasW, rule.canvasH]);

  /* ── File drop on canvas ───────────── */

  const handleFileDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext && ["ttf", "otf", "woff", "woff2"].includes(ext)) {
      try { const f = await importFont(file); setFonts((p) => [...p, f]); } catch { /* skip */ }
    } else if (file.type.startsWith("image/")) {
      const r = new FileReader();
      r.onload = () => setBgImage(r.result as string);
      r.readAsDataURL(file);
    }
  }, [importFont]);

  /* ── Export ─────────────────────────── */

  const exportCSS = selected
    ? `font-size: ${selected.fontSize}px;\nfont-weight: ${selected.fontWeight};\nline-height: ${selected.lineHeight};\nletter-spacing: ${selected.letterSpacing}em;\ntext-align: ${selected.alignment};\ncolor: ${selected.color};`
    : "";

  /* ── Canvas scale ───────────────────── */

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(600);
  useEffect(() => {
    const obs = new ResizeObserver(() => {
      if (containerRef.current) setContainerW(containerRef.current.clientWidth - 32);
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);
  const scale = Math.min(1, containerW / rule.canvasW);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
      {/* ── Canvas ──────────────────────── */}
      <div ref={containerRef} className="flex-1 bg-zinc-200/50 dark:bg-zinc-900/50 overflow-auto p-4">
        <div className="mx-auto" style={{ width: rule.canvasW * scale }}>
          <div
            className={`relative shadow-2xl mx-auto transition-colors ${dragOver ? "ring-4 ring-indigo-400 ring-offset-4" : ""}`}
            style={{ width: rule.canvasW * scale, height: rule.canvasH * scale }}
            onDrop={handleFileDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
          >
            {/* Canvas surface */}
            <div
              className="absolute inset-0 select-none"
              style={{ background: bgImage ? `url(${bgImage}) center/cover no-repeat` : rule.canvasBg }}
              onClick={() => setSelectedId(null)}
            >
              {/* Drop hint */}
              {dragOver && (
                <div className="absolute inset-0 bg-indigo-500/15 flex items-center justify-center z-20">
                  <span className="text-sm font-medium text-indigo-600 bg-white/90 px-4 py-2 rounded-xl shadow-lg">
                    Drop font or image here
                  </span>
                </div>
              )}
            </div>
            {/* Text blocks */}
            {blocks.map((block) => (
              <TextBlock key={block.id} block={block} scale={scale}
                isSelected={block.id === selectedId}
                onMouseDown={(e) => handleBlockMouseDown(e, block.id)}
                fonts={fonts}
              />
            ))}
            {/* Orientation badge */}
            <div className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-zinc-500 pointer-events-none">
              {rule.canvasW}x{rule.canvasH}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel ─────────────────── */}
      <div className="w-full lg:w-72 shrink-0 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Content type */}
          <select value={rule.id}
            onChange={(e) => { window.location.href = `/${e.target.value}`; }}
            className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400">
            {CONTENT_TYPES.map((r) => (
              <option key={r.id} value={r.id}>{r.name.zh} · {r.name.en}</option>
            ))}
          </select>

          {/* Design tradition */}
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
            <p className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">{rule.tradition}</p>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {rule.style.map((s) => <span key={s} className="px-1.5 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-700/50 text-[10px] text-zinc-500 dark:text-zinc-400">{s}</span>)}
            </div>
          </div>

          {/* Import buttons */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-500 hover:border-indigo-400 hover:text-indigo-500 cursor-pointer transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Import Font (.ttf, .otf, .woff2)
              <input type="file" accept=".ttf,.otf,.woff,.woff2" className="hidden"
                onChange={async (e) => { const f = e.target.files?.[0]; if (f) { try { const l = await importFont(f); setFonts((p) => [...p, l]); } catch { /* */ } } }} />
            </label>
            <label className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-zinc-500 hover:border-indigo-400 hover:text-indigo-500 cursor-pointer transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
              Background Image
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = () => setBgImage(r.result as string); r.readAsDataURL(f); } }} />
            </label>
          </div>

          {fonts.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Fonts ({fonts.length})</span>
              {fonts.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                  <span className="truncate flex-1" style={{ fontFamily: f.family }}>{f.name}</span>
                  <button onClick={() => selectedId && updateBlock(selectedId, { fontFamily: "heading" })} className="text-[9px] px-1 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50">H</button>
                  <button onClick={() => selectedId && updateBlock(selectedId, { fontFamily: "body" })} className="text-[9px] px-1 rounded border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50">B</button>
                </div>
              ))}
            </div>
          )}

          {!selected && (
            <p className="text-xs text-zinc-400 text-center py-6">
              Click a text block to edit it.<br />Drag blocks to reposition.<br />Drop font/image files onto the canvas.
            </p>
          )}

          {/* Selected block editor */}
          {selected && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">{selected.role}</span>
              <SliderField label="Font Size" value={selected.fontSize} min={6} max={200} unit="px" onChange={(v) => updateBlock(selected.id, { fontSize: v })} />
              <SliderField label="Line Height" value={Math.round(selected.lineHeight * 100)} min={70} max={300} unit="" display={`${selected.lineHeight.toFixed(2)}`} onChange={(v) => updateBlock(selected.id, { lineHeight: v / 100 })} />
              <SliderField label="Letter Spacing" value={Math.round(selected.letterSpacing * 100)} min={-10} max={50} unit="em" display={`${selected.letterSpacing.toFixed(2)}`} onChange={(v) => updateBlock(selected.id, { letterSpacing: v / 100 })} />

              <div>
                <span className="text-[10px] text-zinc-400 mb-1 block">Alignment</span>
                <div className="flex gap-1">
                  {(["left", "center", "right"] as const).map((a) => (
                    <button key={a} onClick={() => updateBlock(selected.id, { alignment: a })}
                      className={`flex-1 py-1.5 text-[11px] rounded-lg border ${selected.alignment === a ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-zinc-200 text-zinc-500 hover:bg-zinc-50"}`}>{a}</button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 mb-1 block">Color</span>
                <div className="flex gap-1.5 flex-wrap">
                  {rule.palette.map((c) => (
                    <button key={c} onClick={() => updateBlock(selected.id, { color: c })}
                      className="w-7 h-7 rounded-lg border-2 transition-all" style={{ background: c, borderColor: selected.color === c ? "#6366f1" : "transparent" }} />
                  ))}
                  <input type="color" value={selected.color} onChange={(e) => updateBlock(selected.id, { color: e.target.value })} className="w-7 h-7 rounded-lg cursor-pointer" />
                </div>
              </div>

              <button onClick={() => navigator.clipboard.writeText(exportCSS)}
                className="w-full py-2.5 text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:opacity-80 transition-opacity">
                Copy CSS
              </button>
            </div>
          )}

          <div className="text-[10px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Link to="/" className="hover:text-indigo-500 transition-colors">← 返回首页</Link>
            {bgImage && <button onClick={() => setBgImage(null)} className="ml-3 hover:text-rose-500 transition-colors">移除背景</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slider ──────────────────────────── */

function SliderField({ label, value, min, max, unit, display, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; display?: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
        <span>{label}</span>
        <span className="tabular-nums">{display ?? value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="slider" />
    </div>
  );
}

/* ── Draggable Text Block ────────────── */

function TextBlock({ block, scale, isSelected, onMouseDown, fonts }: {
  block: TypeBlock; scale: number; isSelected: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  fonts: { name: string; family: string }[];
}) {
  const ff = block.fontFamily === "heading" && fonts.length > 0 ? fonts[0].family : "inherit";

  return (
    <div
      onMouseDown={onMouseDown}
      className={`absolute cursor-grab active:cursor-grabbing transition-shadow duration-150 ${
        isSelected ? "ring-2 ring-indigo-400/50 z-10" : "hover:ring-1 hover:ring-zinc-400/30"
      }`}
      style={{
        left: `${block.x}%`, top: `${block.y}%`, width: `${block.w}%`,
        fontSize: block.fontSize * scale,
        fontWeight: block.fontWeight, lineHeight: block.lineHeight,
        letterSpacing: `${block.letterSpacing}em`, textAlign: block.alignment,
        color: block.color, fontFamily: ff,
        whiteSpace: "pre-wrap", wordBreak: "break-word",
        transform: "translate(0, 0)",
      }}
    >
      {block.text}
    </div>
  );
}
