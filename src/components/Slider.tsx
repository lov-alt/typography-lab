interface SliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export default function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = "",
}: SliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-zinc-500">{label}</span>
        <span className="text-xs tabular-nums text-zinc-400">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider"
      />
    </div>
  );
}
