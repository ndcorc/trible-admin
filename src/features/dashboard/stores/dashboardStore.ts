import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { DashboardStore } from '../types/dashboard.types'
import { dashboardService } from '../services/dashboardService'

export const useDashboardStore = create<DashboardStore>()(
  devtools(
    (set, get) => ({
      // State
      stats: null,
      chartData: [],
      loading: false,
      error: null,

      // Actions
      fetchStats: async () => {
        set({ loading: true, error: null })
        try {
          const stats = await dashboardService.getStats()
          set({ stats, loading: false })
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : 'Failed to fetch stats',
            loading: false,
          })
        }
      },

      fetchChartData: async () => {
        set({ loading: true, error: null })
        try {
          const chartData = await dashboardService.getChartData()
          set({ chartData, loading: false })
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : 'Failed to fetch chart data',
            loading: false,
          })
        }
      },

      clearError: () => set({ error: null }),
    }),
    { name: 'dashboard-store' }
  )
)
