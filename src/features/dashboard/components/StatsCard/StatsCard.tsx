interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon?: React.ReactNode
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p
              className={`text-sm ${
                isPositive
                  ? 'text-green-600'
                  : isNegative
                    ? 'text-red-600'
                    : 'text-gray-600'
              }`}
            >
              {isPositive && '+'}
              {change}% from last month
            </p>
          )}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </div>
  )
}
