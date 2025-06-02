import { motion } from "framer-motion"
import { BarChart3, Users, Calendar, Settings } from "lucide-react"

export function DashboardPreview() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-purple-200 dark:border-purple-900 shadow-2xl">
      {/* Header */}
      <div className="bg-card p-2 border-b">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="bg-background p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-purple-600">QuickPost Dashboard</div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Settings className="w-4 h-4 text-purple-600" />
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
              JP
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Posts", value: "247", icon: <Calendar className="w-4 h-4 text-purple-600" /> },
            { label: "Followers", value: "8.5K", icon: <Users className="w-4 h-4 text-purple-600" /> },
            { label: "Engagement", value: "24%", icon: <BarChart3 className="w-4 h-4 text-purple-600" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-card p-3 rounded-lg border">
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                {stat.icon}
              </div>
              <div className="text-lg font-bold mt-1">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Engagement Bar Chart */}
          <div className="bg-card p-3 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-2">Engagement by Platform</div>
            <div className="flex items-end h-24 space-x-2">
              <motion.div
                className="w-1/4 bg-purple-400 rounded-t origin-bottom h-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0.6 }}
                transition={{ duration: 1 }}
              />
              <motion.div
                className="w-1/4 bg-purple-600 rounded-t origin-bottom h-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0.8 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.div
                className="w-1/4 bg-purple-800 rounded-t origin-bottom h-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0.4 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              <motion.div
                className="w-1/4 bg-purple-300 rounded-t origin-bottom h-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 0.7 }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>FB</span>
              <span>IG</span>
              <span>TT</span>
              <span>YT</span>
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-card p-3 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-2">Audience Growth</div>
            <div className="h-24 flex items-center">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <motion.path
                  d="M 0,15 Q 12,5 25,18 T 50,15 T 75,20 T 100,10"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Calendar */}
        <div className="bg-card p-3 rounded-lg border">
          <div className="text-xs text-muted-foreground mb-2">Upcoming Posts</div>
          <div className="space-y-2">
            {[
              { time: "Today, 2:00 PM", title: "Product Launch Announcement", platform: "All Platforms" },
              { time: "Tomorrow, 9:00 AM", title: "Weekly Tips & Tricks", platform: "Instagram, TikTok" },
            ].map((post, i) => (
              <div key={i} className="flex items-center p-2 bg-background rounded border text-xs">
                <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                <div className="flex-1">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-muted-foreground">{post.platform}</div>
                </div>
                <div className="text-muted-foreground">{post.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}