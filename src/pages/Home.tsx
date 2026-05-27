import { Link } from "react-router-dom";
import { CONTENT_TYPES } from "../data/typography-rules";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 sm:py-20">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          Typography for&nbsp;everything
        </h1>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 max-w-md leading-relaxed">
          14 layouts · 8 traditions · drag &amp; drop · import fonts · export CSS
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONTENT_TYPES.map((rule) => {
          const isLandscape = rule.canvasW > rule.canvasH;
          return (
            <Link key={rule.id} to={`/${rule.id}`}
              className="group flex flex-col p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              {/* Mini canvas preview */}
              <div className="w-full rounded-lg overflow-hidden shadow-sm mb-3 relative border border-zinc-100 dark:border-zinc-800"
                style={{ aspectRatio: `${rule.canvasW}/${rule.canvasH}`, background: rule.canvasBg }}>
                {rule.blocks.slice(0, 4).map((b) => (
                  <div key={b.id} className="absolute overflow-hidden" style={{
                    left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`,
                    fontSize: `clamp(4px, ${b.fontSize * 0.1}px, 9px)`,
                    fontWeight: b.fontWeight, color: b.color,
                    textAlign: b.alignment, lineHeight: b.lineHeight * 0.5,
                    letterSpacing: `${b.letterSpacing * 0.15}em`,
                  }}>{b.text.slice(0, 40)}</div>
                ))}
              </div>
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {rule.name.zh}
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400">{isLandscape ? "横" : "竖"}</span>
                </div>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed">{rule.desc.zh}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
