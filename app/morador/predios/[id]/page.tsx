import { mockProperties } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import PropertyDetailClient from "./property-detail-client"

export function generateStaticParams() {
  return mockProperties.map((property) => ({
    id: property.id,
  }))
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = mockProperties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  return <PropertyDetailClient property={property} />
}
