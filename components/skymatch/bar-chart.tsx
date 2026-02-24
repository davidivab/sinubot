"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BarChartProps {
  title: string
  data: Array<{
    label: string
    value: number
    color?: string
  }>
  maxValue?: number
  showPercentage?: boolean
  height?: number
}

export function BarChart({
  title,
  data,
  maxValue,
  showPercentage = false,
  height = 300,
}: BarChartProps) {
  const max = maxValue || Math.max(...data.map((d) => d.value))

  const getDefaultColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-amber-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-cyan-500",
      "bg-orange-500",
    ]
    return colors[index % colors.length]
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4" style={{ minHeight: `${height}px` }}>
          {data.map((item, index) => {
            const percentage = max > 0 ? (item.value / max) * 100 : 0
            const color = item.color || getDefaultColor(index)

            return (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">
                    {item.label}
                  </span>
                  <span className="text-muted-foreground">
                    {showPercentage
                      ? `${percentage.toFixed(1)}%`
                      : item.value.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`${color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
