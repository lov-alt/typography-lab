import { useRef, useEffect, useState } from "react";

interface Option<T extends string> {
  value: T;
  label?: string;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  columns?: number;
}

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  columns,
}: SegmentedControlProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const activeIndex = options.findIndex((o) => o.value === value);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const buttons = el.querySelectorAll("button");
    const active = buttons[activeIndex];
    if (!active) return;
    const elRect = el.getBoundingClientRect();
    const btnRect = active.getBoundingClientRect();
    setIndicatorStyle({
      left: btnRect.left - elRect.left,
      width: btnRect.width,
    });
  }, [value, activeIndex]);

  return (
    <div
      ref={containerRef}
      className="relative grid gap-1 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
      style={columns ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
    >
      <div
        className="absolute top-1 h-[calc(100%-8px)] bg-white dark:bg-zinc-700 rounded-lg shadow-sm ring-1 ring-zinc-900/5 dark:ring-white/5 transition-all duration-300 ease-out"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`relative z-10 px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-200 ${
              active
                ? "text-indigo-700 dark:text-indigo-300"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            {opt.label ?? opt.value}
          </button>
        );
      })}
    </div>
  );
}
