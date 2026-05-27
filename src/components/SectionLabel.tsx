interface SectionLabelProps {
  label: string;
  badge?: string;
  action?: { label: string; onClick: () => void; disabled?: boolean };
}

export default function SectionLabel({ label, badge, action }: SectionLabelProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">
          {label}
        </span>
        {badge && (
          <span className="text-[11px] tabular-nums text-zinc-400 bg-zinc-100 px-1.5 py-0.5 rounded">
            {badge}
          </span>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          disabled={action.disabled}
          className="text-[11px] font-medium text-indigo-500 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
