import { Link } from "react-router-dom";
import { CONTENT_TYPES } from "../data/typography-rules";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
      <div className="mb-16">
        <p className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.25em] mb-5">Typography Lab</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-5 leading-[1.1]">
          选择内容，<br />自动生成版式
        </h1>
        <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          每种内容类型对应一套排版传统——点击进入后可拖拽文字块、调整字号行高、导入自己的字体和图片
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CONTENT_TYPES.map((rule) => (
          <Link key={rule.id} to={`/${rule.id}`}
            className="group flex gap-4 p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            {/* Mini canvas preview */}
            <div className="w-20 h-28 shrink-0 rounded-lg overflow-hidden shadow-sm relative" style={{ background: rule.canvasBg }}>
              {rule.blocks.slice(0, 4).map((b) => (
                <div key={b.id} className="absolute" style={{
                  left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`,
                  fontSize: `${Math.max(5, b.fontSize * 0.15)}px`,
                  fontWeight: b.fontWeight, color: b.color,
                  textAlign: b.alignment, lineHeight: b.lineHeight * 0.5,
                  letterSpacing: `${b.letterSpacing * 0.2}em`,
                }}>{b.text.slice(0, 30)}</div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {rule.name.zh} <span className="text-zinc-400 font-normal text-sm">{rule.name.en}</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-2">{rule.desc.zh}</p>
              <span className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{rule.tradition.split("(")[0].trim()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
