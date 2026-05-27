import { useEffect, useState, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useI18n } from "./i18n/index";

const tools = [
  { path: "/font-pairing", nameKey: "font-pairing" as const },
  { path: "/type-scale", nameKey: "type-scale" as const },
  { path: "/measure-rhythm", nameKey: "measure-rhythm" as const },
];

export default function App() {
  const { locale, t, setLocale, availableLocales } = useI18n();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("typo-lab-theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const iconKey = useRef(0);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("typo-lab-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#0f0f1a] transition-colors duration-300">
      <header className="border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-[#0f0f1a]/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            {t.app.title}
          </Link>
          <div className="flex items-center gap-2">
            {!isHome && (
              <nav className="flex gap-1">
                {tools.map((tool) => (
                  <Link key={tool.path} to={tool.path}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      location.pathname === tool.path
                        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    }`}>
                    {t.tools[tool.nameKey].name}
                  </Link>
                ))}
              </nav>
            )}
            <div className="relative group">
              <button type="button" className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200">
                {locale === "zh" ? "中" : locale === "ja" ? "日" : "EN"}
              </button>
              <div className="absolute right-0 top-full mt-1 py-1 w-28 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {availableLocales.map((l) => (
                  <button key={l.key} type="button" onClick={() => setLocale(l.key)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      locale === l.key ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 font-medium" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}>{l.label}</button>
                ))}
              </div>
            </div>
            <button onClick={() => { iconKey.current++; setDark(!dark); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
              aria-label={t.common.darkMode}>
              <span key={iconKey.current} className="theme-icon-enter inline-flex">
                {dark ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="8" r="3"/><path d="M8 1v1M8 14v1M1 8h1M14 8h1M3.05 3.05l.7.7M12.25 12.25l.7.7M3.05 12.95l.7-.7M12.25 3.75l.7-.7"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5 5.5 5.5 0 1 0 13.5 9.5Z"/></svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1"><div key={location.pathname} className="page-enter"><Outlet /></div></main>
    </div>
  );
}
