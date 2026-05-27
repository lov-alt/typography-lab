import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFontImporter } from "../components/FontImporter";
import { CONTENT_TYPES, type TypeBlock } from "../data/typography-rules";

const CANVAS_W = 800;
const CANVAS_H = 1100;

export default function Editor() {
  const { id } = useParams<{ id: string }>();
  const { importFont } = useFontImporter();

  const rule = CONTENT_TYPES.find((r) => r.id === id) ?? CONTENT_TYPES[0];
  const [blocks, setBlocks] = useState<TypeBlock[]>(() => rule.blocks.map((b) => ({ ...b })));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [importedFonts, setImportedFonts] = useState<{ name: string; family: string }[]>([]);
  const [scale, setScale] = useState(0.45);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  // Reset blocks when content type changes
  useEffect(() => {
    setBlocks(rule.blocks.map((b) => ({ ...b })));
    setSelectedId(null);
    setBgImage(null);
  }, [id]);

  const selected = blocks.find((b) => b.id === selectedId);

  const updateBlock = useCallback((blockId: string, patch: Partial<TypeBlock>) => {
    setBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, ...patch } : b)));
  }, []);

  const handleFontImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const loaded = await importFont(f);
      setImportedFonts((prev) => [...prev, loaded]);
      if (selectedId) updateBlock(selectedId, { fontFamily: "heading" });
    } catch { /* ignore */ }
  };

  const handleImageImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setBgImage(r.result as string);
    r.readAsDataURL(f);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).dataset.canvasBg === "true") {
      setSelectedId(null);
    }
  };

  const exportCSS = () => {
    if (!selected) return "";
    return `/* ${rule.name.en} — ${rule.tradition} */
.font-${selected.id} {
  font-size: ${selected.fontSize}px;
  font-weight: ${selected.fontWeight};
  line-height: ${selected.lineHeight};
  letter-spacing: ${selected.letterSpacing}em;
  text-align: ${selected.alignment};
  color: ${selected.color};
}`;
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-3.5rem)]">
      {/* ── Left: Canvas ────────────────── */}
      <div className="flex-1 flex items-start justify-center bg-zinc-200/50 dark:bg-zinc-900/50 overflow-auto p-4">
        <div className="relative" style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}>
          {/* Scale slider */}
          <div className="absolute -right-12 top-0 flex flex-col items-center gap-1 z-10">
            <button onClick={() => setScale(Math.min(1, scale + 0.1))} className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">+</button>
            <input type="range" min={20} max={100} value={Math.round(scale * 100)} onChange={(e) => setScale(Number(e.target.value) / 100)}
              className="slider w-20 -rotate-90 origin-center" style={{ width: 60, appearance: "slider-vertical" } as any} />
            <button onClick={() => setScale(Math.max(0.2, scale - 0.1))} className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">−</button>
            <span className="text-[10px] text-zinc-400 tabular-nums">{Math.round(scale * 100)}%</span>
          </div>

          {/* Canvas */}
          <div ref={canvasRef} onClick={handleCanvasClick} data-canvas-bg="true"
            className="relative shadow-2xl cursor-crosshair select-none"
            style={{ width: CANVAS_W, height: CANVAS_H, background: bgImage ? `url(${bgImage}) center/cover no-repeat` : rule.canvasBg }}>
            {blocks.map((block) => (
              <TextBlock key={block.id} block={block} isSelected={block.id === selectedId}
                onSelect={() => setSelectedId(block.id)}
                onMove={(dx, dy) => updateBlock(block.id, { x: block.x + dx / CANVAS_W * 100, y: block.y + dy / CANVAS_H * 100 })}
                importedFonts={importedFonts} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Controls ─────────────── */}
      <div className="w-full lg:w-72 shrink-0 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-y-auto">
        <div className="p-4 space-y-5">
          {/* Content type selector */}
          <div>
            <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 block">Content Type</label>
            <select value={rule.id} onChange={(e) => { window.location.href = `/${e.target.value}`; }}
              className="w-full px-3 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:border-indigo-400">
              {CONTENT_TYPES.map((r) => (
                <option key={r.id} value={r.id}>{r.name.en} — {r.name.zh}</option>
              ))}
            </select>
          </div>

          {/* Design tradition info */}
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{rule.tradition}</span>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {rule.style.map((s) => <span key={s} className="px-1.5 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-700/50 text-[10px]">{s}</span>)}
            </div>
          </div>

          {/* Resources */}
          <div className="flex gap-2">
            <button onClick={() => fileRef.current?.click()} className="flex-1 py-2 text-[11px] font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              + Font
            </button>
            <input ref={fileRef} type="file" accept=".ttf,.otf,.woff,.woff2" onChange={handleFontImport} className="hidden" />
            <button onClick={() => imgRef.current?.click()} className="flex-1 py-2 text-[11px] font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              + Image
            </button>
            <input ref={imgRef} type="file" accept="image/*" onChange={handleImageImport} className="hidden" />
          </div>

          {importedFonts.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400">Imported</span>
              {importedFonts.map((f, i) => (
                <div key={i} className="text-[11px] text-zinc-600 dark:text-zinc-400 truncate" style={{ fontFamily: f.family }}>{f.name}</div>
              ))}
            </div>
          )}

          {/* Selected block controls */}
          {selected ? (
            <>
              <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

              <div className="space-y-3">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">{selected.role} settings</span>

                <div>
                  <div className="flex justify-between text-[10px] text-zinc-400 mb-1"><span>Font Size</span><span className="tabular-nums">{selected.fontSize}px</span></div>
                  <input type="range" min={6} max={200} value={selected.fontSize} onChange={(e) => updateBlock(selected.id, { fontSize: Number(e.target.value) })} className="slider" />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-zinc-400 mb-1"><span>Line Height</span><span className="tabular-nums">{selected.lineHeight.toFixed(2)}</span></div>
                  <input type="range" min={70} max={300} value={Math.round(selected.lineHeight * 100)} onChange={(e) => updateBlock(selected.id, { lineHeight: Number(e.target.value) / 100 })} className="slider" />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-zinc-400 mb-1"><span>Letter Spacing</span><span className="tabular-nums">{selected.letterSpacing.toFixed(2)}em</span></div>
                  <input type="range" min={-10} max={50} value={Math.round(selected.letterSpacing * 100)} onChange={(e) => updateBlock(selected.id, { letterSpacing: Number(e.target.value) / 100 })} className="slider" />
                </div>

                <div>
                  <span className="text-[10px] text-zinc-400 mb-1 block">Alignment</span>
                  <div className="flex gap-1">
                    {(["left", "center", "right"] as const).map((a) => (
                      <button key={a} onClick={() => updateBlock(selected.id, { alignment: a })}
                        className={`flex-1 py-1.5 text-[11px] rounded-lg border transition-colors ${selected.alignment === a ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-zinc-200 text-zinc-500"}`}>{a}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-zinc-400 mb-1 block">Color</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {rule.palette.map((c) => (
                      <button key={c} onClick={() => updateBlock(selected.id, { color: c })}
                        className="w-7 h-7 rounded-lg border-2 transition-all"
                        style={{ background: c, borderColor: selected.color === c ? "#6366f1" : "transparent" }} />
                    ))}
                    <input type="color" value={selected.color} onChange={(e) => updateBlock(selected.id, { color: e.target.value })}
                      className="w-7 h-7 rounded-lg cursor-pointer" />
                  </div>
                </div>

                <button onClick={() => navigator.clipboard.writeText(exportCSS())}
                  className="w-full py-2 text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl hover:opacity-80 transition-opacity">
                  Copy CSS
                </button>
              </div>
            </>
          ) : (
            <p className="text-xs text-zinc-400 text-center py-8">
              Click a text block on the canvas to edit it.<br />
              Drag blocks to reposition.
            </p>
          )}

          {/* Info */}
          <div className="text-[10px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Link to="/" className="hover:text-indigo-500 transition-colors">← Back to all layouts</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Draggable Text Block ────────────── */

function TextBlock({ block, isSelected, onSelect, onMove, importedFonts }: {
  block: TypeBlock;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (dx: number, dy: number) => void;
  importedFonts: { name: string; family: string }[];
}) {
  const dragRef = useRef<{ sx: number; sy: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    dragRef.current = { sx: e.clientX, sy: e.clientY };

    const handleMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      onMove(ev.clientX - dragRef.current.sx, ev.clientY - dragRef.current.sy);
      dragRef.current = { sx: ev.clientX, sy: ev.clientY };
    };
    const handleUp = () => { dragRef.current = null; document.removeEventListener("mousemove", handleMove); document.removeEventListener("mouseup", handleUp); };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  const family = block.fontFamily === "heading"
    ? (importedFonts.length > 0 ? importedFonts[0].family : "inherit")
    : "inherit";

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`absolute cursor-grab active:cursor-grabbing transition-shadow duration-150 ${isSelected ? "ring-2 ring-indigo-400/50 ring-offset-2 z-10" : "hover:ring-1 hover:ring-zinc-300/50"}`}
      style={{
        left: `${block.x}%`,
        top: `${block.y}%`,
        width: `${block.w}%`,
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        lineHeight: block.lineHeight,
        letterSpacing: `${block.letterSpacing}em`,
        textAlign: block.alignment,
        color: block.color,
        fontFamily: family,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {block.text}
    </div>
  );
}
