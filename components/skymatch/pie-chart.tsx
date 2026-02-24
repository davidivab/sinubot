"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PieChartProps {
  title: string
  data: Array<{
    label: string
    value: number
    color?: string
  }>
  size?: number
}

export function PieChart({ title, data, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const getDefaultColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-cyan-500",
      "bg-orange-500",
      "bg-red-500",
    ]
    return colors[index % colors.length]
  }

  const getRingColor = (bgColor: string) => {
    return bgColor.replace("bg-", "stroke-")
  }

  // Calculate segments for SVG donut chart
  const radius = size / 2
  const strokeWidth = 30
  const innerRadius = radius - strokeWidth
  const circumference = 2 * Math.PI * innerRadius

  let currentAngle = -90 // Start from top

  const segments = data.map((item, index) => {
    const percentage = total > 0 ? (item.value / total) * 100 : 0
    const angle = (percentage / 100) * 360
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
    
    const segment = {
      ...item,
      percentage,
      strokeDasharray,
      strokeDashoffset: -currentAngle * (circumference / 360),
      color: item.color || getDefaultColor(index),
    }

    currentAngle += angle
    return segment
  })

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* SVG Donut Chart */}
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              {segments.map((segment, index) => (
                <circle
                  key={index}
                  cx={radius}
                  cy={radius}
                  r={innerRadius}
                  fill="transparent"
                  className={getRingColor(segment.color)}
                  strokeWidth={strokeWidth}
                  strokeDasharray={segment.strokeDasharray}
                  strokeDashoffset={segment.strokeDashoffset}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "center",
                  }}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {total}
                </div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2">
            {data.map((item, index) => {
              const percentage = total > 0 ? (item.value / total) * 100 : 0
              const color = item.color || getDefaultColor(index)

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`} />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.value} ({percentage.toFixed(1)}%)
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
