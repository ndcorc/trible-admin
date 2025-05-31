import { useEffect } from 'react'
import { useDashboardStore } from '../stores/dashboardStore'

export function useDashboard() {
  const {
    stats,
    chartData,
    loading,
    error,
    fetchStats,
    fetchChartData,
    clearError,
  } = useDashboardStore()

  useEffect(() => {
    fetchStats()
    fetchChartData()
  }, [fetchStats, fetchChartData])

  return {
    stats,
    chartData,
    loading,
    error,
    refetch: () => {
      fetchStats()
      fetchChartData()
    },
    clearError,
  }
}
