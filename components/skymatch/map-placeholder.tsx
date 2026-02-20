"use client"

import { useState } from "react"
import { Plus, Minus, Maximize2, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { intentionConfig } from "@/lib/constants"

interface MapMarker {
  id: string
  label: string
  intention: string
  x: number
  y: number
  lotWidth?: number
  lotHeight?: number
  areaMt2?: number
}

interface MapPlaceholderProps {
  height?: string
  markers?: MapMarker[]
  centerLabel?: string
  showLegend?: boolean
  showControls?: boolean
  showLotAreas?: boolean
  className?: string
}

const intentionFillColors: Record<string, string> = {
  permanecer: "rgba(59,130,246,0.25)",
  asociarse: "rgba(34,197,94,0.25)",
  vender: "rgba(249,115,22,0.25)",
  no_definido: "rgba(107,114,128,0.25)",
}

const intentionStrokeColors: Record<string, string> = {
  permanecer: "rgba(59,130,246,0.8)",
  asociarse: "rgba(34,197,94,0.8)",
  vender: "rgba(249,115,22,0.8)",
  no_definido: "rgba(107,114,128,0.8)",
}

export function MapPlaceholder({
  height = "h-[500px]",
  markers = [],
  centerLabel = "Zona ZIDA - Bogota Sur",
  showLegend = true,
  showControls = true,
  showLotAreas = true,
  className,
}: MapPlaceholderProps) {
  const [zoom, setZoom] = useState(1)
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null)

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.6))
  const handleReset = () => setZoom(1)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border",
        height,
        className
      )}
    >
      {/* Satellite background - gradient placeholder */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 transition-transform duration-300"
        style={{
          transform: `scale(${zoom})`,
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/15 dark:bg-black/35" />

      {/* ZIDA zone boundary */}
      <svg
        className="absolute inset-0 h-full w-full pointer-events-none"
        style={{ transform: `scale(${zoom})` }}
        preserveAspectRatio="none"
      >
        <rect
          x="15%"
          y="15%"
          width="70%"
          height="70%"
          rx="12"
          ry="12"
          fill="rgba(239,68,68,0.06)"
          stroke="rgba(239,68,68,0.5)"
          strokeWidth="2"
          strokeDasharray="8 4"
        />
        <text
          x="50%"
          y="13%"
          textAnchor="middle"
          fill="rgba(239,68,68,0.7)"
          fontSize="11"
          fontWeight="600"
          fontFamily="sans-serif"
        >
          ZONA ZIDA
        </text>
      </svg>

      {/* Lot areas + Markers */}
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
      >
        {markers.map((marker) => {
          const cfg = intentionConfig[marker.intention]
          const isHovered = hoveredMarker === marker.id
          const lw = marker.lotWidth || 3
          const lh = marker.lotHeight || 2.5

          return (
            <div key={marker.id}>
              {/* Lot area rectangle */}
              {showLotAreas && (
                <div
                  className="absolute transition-all duration-200"
                  style={{
                    left: `${marker.x - lw / 2}%`,
                    top: `${marker.y - lh / 2}%`,
                    width: `${lw}%`,
                    height: `${lh}%`,
                    backgroundColor:
                      intentionFillColors[marker.intention] ||
                      "rgba(107,114,128,0.2)",
                    border: `2px solid ${
                      intentionStrokeColors[marker.intention] ||
                      "rgba(107,114,128,0.6)"
                    }`,
                    borderRadius: "3px",
                    opacity: isHovered ? 1 : 0.85,
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                    zIndex: isHovered ? 20 : 10,
                  }}
                />
              )}

              {/* Marker point */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  zIndex: isHovered ? 30 : 15,
                }}
                onMouseEnter={() => setHoveredMarker(marker.id)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                {/* Pulse ring */}
                <div
                  className={cn(
                    "absolute inset-0 -m-1.5 rounded-full animate-ping opacity-30",
                    cfg?.dotColor || "bg-gray-500"
                  )}
                  style={{
                    animationDuration: "2s",
                    display: isHovered ? "block" : "none",
                  }}
                />
                {/* Dot */}
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 border-white shadow-lg transition-transform",
                    cfg?.dotColor || "bg-gray-500",
                    isHovered && "scale-125"
                  )}
                />

                {/* Tooltip */}
                <div
                  className={cn(
                    "absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-mono shadow-md transition-all border",
                    isHovered
                      ? "bg-card text-foreground border-border opacity-100 scale-100"
                      : "bg-card/80 text-foreground/80 border-border/50 opacity-80 scale-95"
                  )}
                >
                  <span className="font-semibold">{marker.label}</span>
                  {marker.areaMt2 && (
                    <span className="ml-1.5 text-muted-foreground">
                      {marker.areaMt2} m&sup2;
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Center label floating chip */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
        <span className="rounded-full bg-card/90 px-3 py-1 text-xs font-medium text-muted-foreground shadow-md backdrop-blur-sm border border-border">
          {centerLabel}
        </span>
      </div>

      {/* Zoom controls */}
      {showControls && (
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-20">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 shadow-md bg-card/90 backdrop-blur-sm"
            onClick={handleZoomIn}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Acercar</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 shadow-md bg-card/90 backdrop-blur-sm"
            onClick={handleZoomOut}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Alejar</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 shadow-md bg-card/90 backdrop-blur-sm mt-1"
            onClick={handleReset}
          >
            <Maximize2 className="h-4 w-4" />
            <span className="sr-only">Restablecer</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 shadow-md bg-card/90 backdrop-blur-sm"
          >
            <Layers className="h-4 w-4" />
            <span className="sr-only">Capas</span>
          </Button>
        </div>
      )}

      {/* Legend */}
      {showLegend && (
        <div className="absolute bottom-3 left-3 rounded-lg bg-card/95 p-3 shadow-md backdrop-blur-sm border border-border z-20">
          <p className="text-[10px] font-semibold text-foreground uppercase tracking-wide mb-1.5">
            Intencion
          </p>
          <div className="space-y-1">
            {Object.entries(intentionConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-3 w-5 rounded-sm border"
                    style={{
                      backgroundColor:
                        intentionFillColors[key] || "rgba(107,114,128,0.2)",
                      borderColor:
                        intentionStrokeColors[key] || "rgba(107,114,128,0.6)",
                    }}
                  />
                  <div className={cn("h-2 w-2 rounded-full", cfg.dotColor)} />
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {cfg.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="h-3 w-5 rounded-sm border-2 border-dashed border-red-400/50 bg-red-500/5" />
              <span className="text-[11px] text-muted-foreground">
                Limite ZIDA
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Scale indicator */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5">
        <div className="h-px w-12 bg-white/80" />
        <span className="text-[9px] text-white/80 font-mono">
          ~{Math.round(200 / zoom)}m
        </span>
      </div>
    </div>
  )
}
