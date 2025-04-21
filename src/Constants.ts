interface TestSummary {
  fileName: string
  brand: string
  product: string
  environment: string
  reportPostFix: string
  totalTests: number
  passed: number
  failed: number
  skipped: number
  passRate: string
}

interface Step {
  keyword: string
  name: string
  result: {
    status: string
    duration?: number
    error_message?: string
  }
}

interface Scenario {
  id: string
  name: string
  description: string
  steps: Step[]
  tags: { name: string }[]
  type: string
}

interface Feature {
  id: string
  name: string
  description: string
  elements: Scenario[]
  tags: { name: string }[]
  uri: string
}

export type { TestSummary, Feature, Scenario, Step }
