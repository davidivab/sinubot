import { MapPin, Ruler, FileText } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Property } from "@/lib/types"
import { statusLabels, intentionConfig, ownershipLabels } from "@/lib/constants"

interface PropertyCardProps {
  property: Property
  onClick?: () => void
}

export function PropertyCard({ property, onClick }: PropertyCardProps) {
  const statusCfg = statusLabels[property.status]
  const intentionCfg = intentionConfig[property.intention]

  return (
    <Card
      className={cn(
        "border border-border transition-shadow hover:shadow-md cursor-pointer",
        onClick && "hover:border-primary/30"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-mono text-sm font-semibold text-foreground">{property.chipCode}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{property.direccion}</span>
            </div>
          </div>
          <Badge variant="secondary" className={cn("shrink-0 text-[10px]", statusCfg?.className)}>
            {statusCfg?.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Ruler className="h-3 w-3" />
            {property.areaMt2} m&sup2;
          </span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <FileText className="h-3 w-3" />
            {ownershipLabels[property.ownershipType]}
          </span>
          <Badge variant="outline" className={cn("ml-auto text-[10px]", intentionCfg?.className)}>
            {intentionCfg?.label}
          </Badge>
        </div>
        {!property.caracterizacionCompleta && (
          <p className="mt-3 text-[11px] text-yellow-600 dark:text-yellow-400">
            Caracterizacion pendiente
          </p>
        )}
      </CardContent>
    </Card>
  )
}
