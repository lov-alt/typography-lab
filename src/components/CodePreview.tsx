import { useState } from "react";
import { useI18n } from "../i18n/index";
import { FRAMEWORKS, type Framework } from "../generators/index";
import SyntaxHighlight from "./SyntaxHighlight";

interface Props {
  codeMap: Partial<Record<Framework, string>>;
}

export default function CodePreview({ codeMap }: Props) {
  const { t } = useI18n();
  const [format, setFormat] = useState<Framework>("css");
  const [collapsed, setCollapsed] = useState(true);
  const [copied, setCopied] = useState(false);

  const code = codeMap[format] ?? "";

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const available = FRAMEWORKS.filter((f) => f.key in codeMap);

  return (
    <div className="bg-zinc-900 dark:bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 shadow-lg transition-all duration-300">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/60 dark:bg-zinc-900/80 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {!collapsed && (
            <div className="flex gap-0.5 flex-wrap">
              {available.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFormat(f.key)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all duration-200 ${
                    format === f.key
                      ? "bg-zinc-700 text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {!collapsed && (
            <button
              type="button"
              onClick={copy}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition-all duration-200"
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t.code.copied}
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {t.code.copy}
                </>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-all duration-200"
            title={collapsed ? "Show code" : "Hide code"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Code body — collapsible */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          collapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
        }`}
      >
        <div className="p-4">
          <SyntaxHighlight code={code} />
        </div>
      </div>
    </div>
  );
}
