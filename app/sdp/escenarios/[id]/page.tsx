import { mockScenarios } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import ScenarioReviewClient from "./scenario-review-client"

export function generateStaticParams() {
  return mockScenarios.map((scenario) => ({
    id: scenario.id,
  }))
}

export default async function ScenarioReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const scenario = mockScenarios.find((s) => s.id === id)

  if (!scenario) {
    notFound()
  }

  return <ScenarioReviewClient scenario={scenario} />
}
