interface NumberInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  unit = "",
}: NumberInputProps) {
  return (
    <div>
      <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center gap-0.5 mt-0.5">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (isNaN(v)) return;
            const clamped = Math.max(min ?? -Infinity, Math.min(max ?? Infinity, v));
            onChange(clamped);
          }}
          className="w-full px-2.5 py-1.5 text-xs font-mono border border-zinc-200 rounded-lg focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 transition-all"
          min={min}
          max={max}
        />
        {unit && (
          <span className="text-xs text-zinc-400 font-mono w-6 shrink-0">{unit}</span>
        )}
      </div>
    </div>
  );
}
