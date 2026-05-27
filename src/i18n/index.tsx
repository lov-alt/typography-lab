import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import zh from "./zh";
import en from "./en";
import ja from "./ja";
import type { Translations } from "./zh";

export type Locale = "zh" | "en" | "ja";

const LOCALE_KEY = "css-toolbox-locale";

const locales: Record<Locale, { label: string; data: Translations }> = {
  zh: { label: "中文", data: zh },
  en: { label: "EN", data: en },
  ja: { label: "日本語", data: ja },
};

function detectLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
  if (stored && stored in locales) return stored;
  const nav = navigator.language.slice(0, 2);
  if (nav === "zh") return "zh";
  if (nav === "ja") return "ja";
  return "en";
}

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
  availableLocales: { key: Locale; label: string }[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }): ReactNode {
  const [locale, setLocaleState] = useState(detectLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(LOCALE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const availableLocales = Object.entries(locales).map(([key, { label }]) => ({
    key: key as Locale,
    label,
  }));

  return (
    <I18nContext.Provider value={{ locale, t: locales[locale].data, setLocale, availableLocales }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
