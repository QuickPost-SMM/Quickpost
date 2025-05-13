import { FileText, Calendar, Heart, TrendingUp, ArrowUp, ArrowDown } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  value: number | string
  icon: string
  trend: number
}

export default function AnalyticsCard({ title, value, icon, trend }: AnalyticsCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case "FileText":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "Calendar":
        return <Calendar className="h-6 w-6 text-purple-500" />
      case "Heart":
        return <Heart className="h-6 w-6 text-pink-500" />
      case "TrendingUp":
        return <TrendingUp className="h-6 w-6 text-green-500" />
      default:
        return <FileText className="h-6 w-6 text-blue-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        <div className="bg-gray-100 rounded-full p-3">{renderIcon()}</div>
      </div>
      <div className="mt-4 flex items-center">
        {trend > 0 ? (
          <div className="flex items-center text-green-500">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{trend}%</span>
          </div>
        ) : (
          <div className="flex items-center text-red-500">
            <ArrowDown className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
        <span className="text-sm text-gray-500 ml-2">from last month</span>
      </div>
    </div>
  )
}