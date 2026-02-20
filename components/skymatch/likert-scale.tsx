"use client"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface LikertScaleProps {
  id: string
  label: string
  description: string
  value: number | null
  onChange: (value: number) => void
}

const scaleLabels = ["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"]

export function LikertScale({ id, label, description, value, onChange }: LikertScaleProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border p-4">
      <div>
        <Label className="text-sm font-semibold text-foreground">{label}</Label>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {scaleLabels.map((scaleLabel, i) => {
          const val = i + 1
          const isSelected = value === val
          return (
            <button
              key={val}
              type="button"
              onClick={() => onChange(val)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-xs transition-colors",
                isSelected
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:bg-muted"
              )}
              aria-label={`${label}: ${scaleLabel}`}
            >
              <span className="text-base font-bold">{val}</span>
              <span className="hidden text-[10px] sm:block">{scaleLabel}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
