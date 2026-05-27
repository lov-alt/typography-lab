import { Link } from "react-router-dom";
import { useI18n } from "../i18n/index";

type ArchetypeId = "editorial" | "poster" | "menu" | "book" | "hero" | "card";

const ARCHETYPES: { id: ArchetypeId; gradient: string; aspect: string }[] = [
  { id: "editorial", gradient: "from-zinc-600 via-zinc-500 to-zinc-400", aspect: "aspect-[3/4]" },
  { id: "poster", gradient: "from-rose-500 via-red-500 to-orange-500", aspect: "aspect-[2/3]" },
  { id: "menu", gradient: "from-amber-600 via-yellow-600 to-amber-400", aspect: "aspect-[3/4]" },
  { id: "book", gradient: "from-emerald-600 via-green-600 to-teal-500", aspect: "aspect-[2/3]" },
  { id: "hero", gradient: "from-indigo-500 via-blue-600 to-violet-500", aspect: "aspect-[16/9]" },
  { id: "card", gradient: "from-slate-500 via-zinc-500 to-stone-400", aspect: "aspect-[1.6/1]" },
];

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
      <div className="mb-16 sm:mb-20">
        <p className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.25em] mb-5">
          {t.home.tagline}
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-5 leading-[1.1]">
          {t.home.heading}
        </h1>
        <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
          {t.home.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {ARCHETYPES.map((a) => {
          const info = t.archetypes[a.id];
          return (
            <Link key={a.id} to={`/${a.id}`}
              className="group block rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 hover:shadow-2xl hover:shadow-zinc-300/30 dark:hover:shadow-zinc-950/50 hover:-translate-y-1 transition-all duration-400">
              {/* Preview thumbnail */}
              <div className={`${a.aspect} bg-gradient-to-br ${a.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-white/30 text-6xl font-bold select-none">¶</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-4 sm:p-5">
                <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {info.name}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {info.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-16 text-center text-sm text-zinc-400 dark:text-zinc-500">
        <a href="https://github.com/lov-alt/typography-lab" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>
          {t.home.github}
        </a>
      </p>
    </div>
  );
}
