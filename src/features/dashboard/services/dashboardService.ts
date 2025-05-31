import type { DashboardStats, ChartData } from '../types/dashboard.types'

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    // In a real app, you'd fetch this from Firestore
    // For now, return mock data
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          totalUsers: 1234,
          totalRevenue: 98765,
          totalOrders: 567,
          conversionRate: 3.2,
        })
      }, 1000)
    })
  },

  async getChartData(): Promise<ChartData[]> {
    // Mock chart data - in real app, fetch from Firestore
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 600 },
          { name: 'Apr', value: 800 },
          { name: 'May', value: 500 },
          { name: 'Jun', value: 700 },
        ])
      }, 800)
    })
  },
}
