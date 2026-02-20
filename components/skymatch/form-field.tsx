import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { LucideIcon } from "lucide-react"

interface FormFieldProps {
  label: string
  id: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  helpText?: string
  required?: boolean
  icon?: LucideIcon
  disabled?: boolean
}

export function FormField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  helpText,
  required,
  icon: Icon,
  disabled,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={cn(
            Icon && "pl-9",
            error && "border-destructive focus-visible:ring-destructive"
          )}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {helpText && !error && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  )
}
