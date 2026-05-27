import { Link } from "react-router-dom";
import { CONTENT_TYPES } from "../data/typography-rules";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 sm:py-20">
      <div className="mb-14">
        <p className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.25em] mb-5">Typography Lab</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 leading-[1.1]">
          选择内容，<br />自动生成版式
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          12 种内容类型，8 个排版历史传统。点击进入后可拖拽文字块、调整字号行高、导入字体和图片。
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
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                    {isLandscape ? "横" : "竖"}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-1.5">{rule.desc.zh}</p>
                <span className="text-[10px] text-zinc-400">{rule.tradition.split("(")[0].trim()}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
