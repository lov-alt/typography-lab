import { useRef, useCallback } from "react";

interface LoadedFont {
  name: string;
  family: string;
  url: string;
}

export function useFontImporter() {
  const styleRef = useRef<HTMLStyleElement | null>(null);

  const importFont = useCallback((file: File): Promise<LoadedFont> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        const baseName = file.name.replace(/\.(ttf|otf|woff2?)$/i, "");
        const family = `local-${baseName.replace(/[^a-zA-Z0-9]/g, "-")}`;

        if (!styleRef.current) {
          styleRef.current = document.createElement("style");
          document.head.appendChild(styleRef.current);
        }

        const format = file.name.endsWith(".woff2") ? "woff2"
          : file.name.endsWith(".woff") ? "woff"
          : file.name.endsWith(".otf") ? "opentype"
          : "truetype";

        styleRef.current.textContent += `
@font-face {
  font-family: "${family}";
  src: url("${url}") format("${format}");
  font-display: swap;
}`;
        resolve({ name: baseName, family, url });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, []);

  return { importFont };
}
