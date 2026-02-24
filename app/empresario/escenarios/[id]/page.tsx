import { mockScenarios } from "@/lib/mock-data"
import { ScenarioDetailClient } from "./scenario-detail-client"

// Required for static export
export function generateStaticParams() {
  return mockScenarios.map((scenario) => ({
    id: scenario.id,
  }))
}

interface ScenarioDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ScenarioDetailPage({ params }: ScenarioDetailPageProps) {
  const { id } = await params
  const scenario = mockScenarios.find((s) => s.id === id) || null

  return <ScenarioDetailClient scenario={scenario} />
}
