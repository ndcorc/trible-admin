export interface DashboardStats {
  totalUsers: number
  totalRevenue: number
  totalOrders: number
  conversionRate: number
}

export interface ChartData {
  name: string
  value: number
  date?: string
}

export interface DashboardState {
  stats: DashboardStats | null
  chartData: ChartData[]
  loading: boolean
  error: string | null
}

export interface DashboardActions {
  fetchStats: () => Promise<void>
  fetchChartData: () => Promise<void>
  clearError: () => void
}

export type DashboardStore = DashboardState & DashboardActions
