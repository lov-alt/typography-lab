import { Link } from "react-router-dom";
import { useI18n } from "../i18n/index";

const toolKeys = ["font-pairing", "type-scale", "measure-rhythm"] as const;

const iconMap: Record<string, React.ReactNode> = {
  "font-pairing": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" /><line x1="4" y1="20" x2="4" y2="18" /><line x1="20" y1="17" x2="20" y2="20" /><line x1="9" y1="4" x2="9" y2="20" /><line x1="15" y1="4" x2="15" y2="11" />
    </svg>
  ),
  "type-scale": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polyline points="4,19 8,10 12,16 16,5 20,12" />
    </svg>
  ),
  "measure-rhythm": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><polyline points="7,12 9,12" /><polyline points="7,18 9,18" />
    </svg>
  ),
};

const gradientMap: Record<string, string> = {
  "font-pairing": "from-violet-400 via-purple-500 to-fuchsia-600",
  "type-scale": "from-indigo-400 via-blue-500 to-cyan-600",
  "measure-rhythm": "from-emerald-400 via-teal-500 to-cyan-600",
};

const pathMap: Record<string, string> = {
  "font-pairing": "/font-pairing",
  "type-scale": "/type-scale",
  "measure-rhythm": "/measure-rhythm",
};

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.2em] mb-4">
          {t.home.tagline}
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          {t.home.heading}
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
          {t.home.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {toolKeys.map((key) => {
          const tool = t.tools[key];
          const gradient = gradientMap[key];
          return (
            <Link key={key} to={pathMap[key]}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 p-6 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-950/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300">
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${gradient} opacity-[0.05] group-hover:opacity-[0.1] rounded-bl-full transition-opacity duration-500`} />
              <div className="relative">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center mb-4 shadow-sm`}>
                  {iconMap[key]}
                </div>
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">{tool.name}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{tool.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-20 text-center">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">{t.home.offline}</p>
        <p className="mt-2">
          <a href="https://github.com/lov-alt/typography-lab" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {t.home.github}
          </a>
        </p>
      </div>
    </div>
  );
}
