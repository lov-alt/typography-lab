interface Token {
  text: string;
  className: string;
}

const RULES: [RegExp, string][] = [
  [/\/\*[\s\S]*?\*\//g, "text-zinc-500"],
  [/\/\/.*/g, "text-zinc-500"],
  [/"[^"]*"/g, "text-emerald-400"],
  [/'[^']*'/g, "text-emerald-400"],
  [/\b(\d+\.?\d*)(px|%|deg|rem|em|vh|vw|s|ms)?\b/g, "text-amber-300"],
  [/\b(#[0-9a-fA-F]{3,8})\b/g, "text-rose-300"],
  [/\b(style|className|div|template|script|RoundedRectangle|Circle|Ellipse|LinearGradient|RadialGradient|Color|Container|BoxDecoration|BoxShadow|ClipOval|ClipRRect|BorderRadius|ClipPath|Offset|fromRGBO)\b/g, "text-purple-300"],
  [/\b(clip-path|border-radius|box-shadow|background|cubic-bezier|transform|linear-gradient|radial-gradient|conic-gradient|inset|polygon|circle|ellipse)\b/g, "text-sky-300"],
  [/\b(cornerRadius|clipShape|shadow|blurRadius|spreadRadius|borderRadius|topLeftRadius|startPoint|endPoint|bottomTrailing|topLeading)\b/g, "text-sky-300"],
  [/"([^"]+)":/g, "text-sky-300"],
];

export default function SyntaxHighlight({ code }: { code: string }) {
  const tokens = tokenize(code);
  const lines = splitLines(tokens);

  return (
    <div className="flex font-mono text-sm leading-relaxed">
      {/* Line numbers */}
      <div className="select-none text-right pr-4 text-zinc-600 shrink-0">
        {lines.map((_, i) => (
          <div key={i} className="h-[1.625rem] text-[11px] leading-[1.625rem]">
            {i + 1}
          </div>
        ))}
      </div>
      {/* Code */}
      <div className="flex-1 overflow-x-auto">
        <pre className="whitespace-pre-wrap break-words m-0">
          <code>
            {lines.map((lineTokens, i) => (
              <div key={i} className="h-[1.625rem] leading-[1.625rem]">
                {lineTokens.map((t, j) => (
                  <span key={j} className={t.className || undefined}>
                    {t.text}
                  </span>
                ))}
                {i < lines.length - 1 && "\n"}
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function tokenize(source: string): Token[] {
  const result: Token[] = [];
  let pos = 0;

  while (pos < source.length) {
    let earliest: { match: RegExpExecArray; className: string } | null = null;

    for (const [re, className] of RULES) {
      re.lastIndex = pos;
      const m = re.exec(source);
      if (m && (!earliest || m.index < earliest.match.index)) {
        earliest = { match: m, className };
      }
    }

    if (earliest) {
      if (earliest.match.index > pos) {
        result.push({ text: source.slice(pos, earliest.match.index), className: "" });
      }
      result.push({ text: earliest.match[0], className: earliest.className });
      pos = earliest.match.index + earliest.match[0].length;
    } else {
      result.push({ text: source.slice(pos), className: "" });
      break;
    }
  }

  return result;
}

function splitLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]];
  for (const token of tokens) {
    const parts = token.text.split(/(?<=\n)/);
    for (const part of parts) {
      if (part === "\n") {
        lines.push([]);
      } else if (part.endsWith("\n")) {
        lines[lines.length - 1].push({ text: part.slice(0, -1), className: token.className });
        lines.push([]);
      } else {
        lines[lines.length - 1].push({ text: part, className: token.className });
      }
    }
  }
  return lines;
}
