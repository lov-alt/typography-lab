export type Framework = "css" | "tailwind" | "react" | "vue" | "svelte" | "swiftui" | "flutter" | "json";

export const FRAMEWORKS: { key: Framework; label: string }[] = [
  { key: "css", label: "CSS" },
  { key: "json", label: "JSON" },
  { key: "tailwind", label: "Tailwind" },
  { key: "react", label: "React" },
  { key: "vue", label: "Vue" },
  { key: "svelte", label: "Svelte" },
  { key: "swiftui", label: "SwiftUI" },
  { key: "flutter", label: "Flutter" },
];

type GenFn = (prop: string, val: string) => string;

/* ── Utility ─────────────────────────── */

function toCamel(s: string): string {
  return s.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function parseHexColor(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function pickColors(val: string): string[] {
  return val
    .split(",")
    .map((s) => s.trim().match(/(#[0-9a-fA-F]+)/)?.[1])
    .filter((c): c is string => c != null);
}

/* ── CSS ─────────────────────────────── */

const genCSS: GenFn = (prop, val) => `${prop}: ${val};`;

/* ── Tailwind ─────────────────────────── */

const genTailwind: GenFn = (prop, val) => {
  const esc = val.replace(/ /g, "_");
  switch (prop) {
    case "border-radius":
      return `rounded-[${val.replace(/px/g, "")}]`;
    default:
      return `[${prop}:${esc}]`;
  }
};

/* ── React ───────────────────────────── */

const genReact: GenFn = (prop, val) => {
  const camel = toCamel(prop);
  return `style={{ ${camel}: "${val.replace(/"/g, '\\"')}" }}`;
};

/* ── Vue ─────────────────────────────── */

const genVue: GenFn = (prop, val) => {
  return `:style="{ ${toCamel(prop)}: '${val}' }"`;
};

/* ── Svelte ──────────────────────────── */

const genSvelte: GenFn = (prop, val) => `style="${prop}: ${val}"`;

/* ── SwiftUI ─────────────────────────── */

const genSwiftUI: GenFn = (prop, val) => {
  switch (prop) {
    case "border-radius": {
      const v = parseFloat(val) || 0;
      return `.cornerRadius(${v})`;
    }
    case "box-shadow": {
      const m = val.match(/(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(#[0-9a-fA-F]+)/);
      if (!m) return `.shadow(radius: 10)`;
      const [, x, y, blur, , color] = m;
      const { r, g, b } = parseHexColor(color);
      return `.shadow(color: Color(red: ${(r / 255).toFixed(2)}, green: ${(g / 255).toFixed(2)}, blue: ${(b / 255).toFixed(2)}), radius: ${blur}, x: ${x}, y: ${y})`;
    }
    case "clip-path": {
      if (val.includes("circle")) return `.clipShape(Circle())`;
      if (val.includes("ellipse")) return `.clipShape(Ellipse())`;
      return `.clipShape(RoundedRectangle(cornerRadius: 0))`;
    }
    case "background": {
      const colors = pickColors(val);
      if (colors.length < 2) return `LinearGradient(colors: [.blue, .purple], startPoint: .top, endPoint: .bottom)`;
      const cs = colors.map((c) => `Color(hex: "${c}")`).join(", ");
      return `LinearGradient(colors: [${cs}], startPoint: .topLeading, endPoint: .bottomTrailing)`;
    }
    default:
      return `.${toCamel(prop)}(${JSON.stringify(val)})`;
  }
};

/* ── Flutter ──────────────────────────── */

const genFlutter: GenFn = (prop, val) => {
  switch (prop) {
    case "border-radius": {
      const v = parseFloat(val) || 16;
      return `borderRadius: BorderRadius.circular(${v})`;
    }
    case "box-shadow": {
      const m = val.match(/(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(#[0-9a-fA-F]+)/);
      if (!m) return "BoxShadow(color: Colors.black26, blurRadius: 10)";
      const [, x, y, blur, spread, color] = m;
      return `boxShadow: [\n  BoxShadow(\n    color: Color(${color}),\n    offset: Offset(${x}, ${y}),\n    blurRadius: ${blur},\n    spreadRadius: ${spread},\n  ),\n]`;
    }
    case "clip-path": {
      if (val.includes("circle") || val.includes("ellipse")) return "ClipOval(child: ...)";
      return "ClipRRect(borderRadius: BorderRadius.circular(0), child: ...)";
    }
    case "background": {
      const colors = pickColors(val);
      if (colors.length < 2) return "LinearGradient(colors: [Colors.blue, Colors.purple])";
      const cs = colors.map((c) => {
        const h = c.replace("#", "");
        return `Color(0xFF${h})`;
      });
      return `LinearGradient(\n  colors: [\n    ${cs.join(",\n    ")},\n  ],\n)`;
    }
    default:
      return `/* ${prop} */\nContainer(decoration: BoxDecoration(...))`;
  }
};

/* ── JSON ─────────────────────────────── */

const genJSON: GenFn = (prop, val) => {
  const camel = toCamel(prop);
  const obj: Record<string, string | number> = { property: prop };
  obj[camel] = val;

  // Parse numeric values
  const numMatch = val.match(/^([\d.]+)(px|%)?/);
  if (numMatch) {
    obj[camel] = val;
  }

  return JSON.stringify(obj, null, 2);
};

/* ── Aggregator ──────────────────────── */

const generators: Record<Framework, GenFn> = {
  css: genCSS,
  json: genJSON,
  tailwind: genTailwind,
  react: genReact,
  vue: genVue,
  svelte: genSvelte,
  swiftui: genSwiftUI,
  flutter: genFlutter,
};

export function generateCode(framework: Framework, property: string, value: string): string {
  return generators[framework](property, value);
}
