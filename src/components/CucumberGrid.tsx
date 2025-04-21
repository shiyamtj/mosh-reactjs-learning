import { useEffect, useState } from 'react'
import { Feature, TestSummary } from '../Constants'
import ReportSummaryWidget from './ReportSummaryWidget'

const CucumberGrid = () => {
  const [reportSummaries, setReportSummaries] = useState<TestSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadReports = async () => {
      try {
        // Get all report files from the data directory
        const reportFiles = import.meta.glob('../data/cucumber_report_*.json')
        const summaries: TestSummary[] = []

        for (const path in reportFiles) {
          try {
            // Load the report file
            const module = (await reportFiles[path]()) as { default: Feature[] }
            const report = module.default

            // Extract date from filename
            const matchingStr = path.match(
              /cucumber_report_(.*?)_(.*?)_(.*?)_(.*?)\.json/
            )

            const brand = matchingStr ? matchingStr[1] : 'Unknown Brand'
            const product = matchingStr ? matchingStr[2] : 'Unknown Product'
            const environment = matchingStr
              ? matchingStr[3]
              : 'Unknown Environment'
            const reportPostFix = matchingStr
              ? matchingStr[4]
              : 'Unknown PostFix'

            // Calculate test statistics
            let totalTests = 0
            let passed = 0
            let failed = 0
            let skipped = 0

            report.forEach((feature) => {
              feature.elements.forEach((scenario) => {
                totalTests++

                // Filter out hidden steps (Before/After hooks)
                const visibleSteps = scenario.steps.filter(
                  (step) =>
                    !step.keyword.includes('Before') &&
                    !step.keyword.includes('After')
                )

                if (visibleSteps.length === 0) {
                  skipped++
                } else if (
                  visibleSteps.some((step) => step.result.status === 'failed')
                ) {
                  failed++
                } else if (
                  visibleSteps.every((step) => step.result.status === 'passed')
                ) {
                  passed++
                } else {
                  skipped++
                }
              })
            })

            const passRate =
              totalTests > 0
                ? ((passed / totalTests) * 100).toFixed(2) + '%'
                : 'N/A'

            // Extract filename from path
            const fileName = path.split('/').pop() || path

            summaries.push({
              fileName,
              brand: brand,
              product: product,
              environment: environment,
              reportPostFix: reportPostFix,
              totalTests,
              passed,
              failed,
              skipped,
              passRate,
            })
          } catch (err) {
            console.error(`Error processing ${path}:`, err)
          }
        }

        // Sort summaries by date (newest first)
        // summaries.sort((a, b) => b.date.localeCompare(a.date))
        setReportSummaries(summaries)
        setLoading(false)
      } catch (err) {
        console.error('Error loading reports:', err)
        setError('Failed to load test reports')
        setLoading(false)
      }
    }
    loadReports()
  }, [])

  if (loading) {
    return <div className='loading'>Loading test reports...</div>
  }

  if (error) {
    return <div className='error'>{error}</div>
  }

  if (reportSummaries.length === 0) {
    return <div className='no-data'>No test reports found</div>
  }

  return (
    <>
      {reportSummaries.map((summary, index) => (
        <ReportSummaryWidget key={index} summary={summary} />
      ))}
    </>
  )
}
export default CucumberGrid
