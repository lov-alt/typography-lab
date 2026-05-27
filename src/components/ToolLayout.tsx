import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/index";

interface Props {
  title: string;
  description: string;
  controls: ReactNode;
  preview: ReactNode;
  code: ReactNode;
}

export default function ToolLayout({ title, description, controls, preview, code }: Props) {
  const { t } = useI18n();
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          aria-label={t.common.back}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-5 sticky top-20 shadow-sm">
            {controls}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex items-center justify-center min-h-[360px] shadow-sm">
            {preview}
          </div>
          {code}
        </div>
      </div>
    </div>
  );
}
