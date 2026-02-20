"use client"

import { Upload, FileText, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  label: string
  accept?: string
  maxSize?: string
  helpText?: string
}

export function FileUpload({ label, accept = ".pdf,.jpg,.png", maxSize = "10MB", helpText }: FileUploadProps) {
  const [files, setFiles] = useState<string[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFakeDrop = () => {
    setFiles((prev) => [...prev, `documento_${prev.length + 1}.pdf`])
    setIsDragOver(false)
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/30"
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          handleFakeDrop()
        }}
        onClick={handleFakeDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleFakeDrop()}
      >
        <Upload className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Arrastra archivos aqui o <span className="font-medium text-primary">selecciona</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {accept} - Max {maxSize}
        </p>
      </div>
      {helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f, i) => (
            <li key={i} className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 truncate text-foreground">{f}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  setFiles((prev) => prev.filter((_, idx) => idx !== i))
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
