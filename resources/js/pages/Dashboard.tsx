import { Head } from "@inertiajs/react"
import AnalyticsCard from "@/components/AnalyticsCard"
import RecentPostsList from "@/components/RecentPostList"
import PlatformDistribution from "@/components/PlatformDistribution"
import QuickPost from "@/components/QuickPost"
import NavBar from "@/layouts/NavBar"

interface DashboardProps {
  analytics: {
    totalPosts: number
    scheduledPosts: number
    totalEngagement: number
    growthRate: number
  }
  recentPosts: Array<{
    id: number
    content: string
    platform: string
    status: string
    scheduledAt: string
    engagement: number
  }>
  platformData: Array<{
    name: string
    value: number
  }>
}

export default function Dashboard({ analytics }: DashboardProps) {
  const platformData = [
    {
      "name": "Twitter",
      "value": 120
    },
    {
      "name": "Facebook",
      "value": 300
    },
    {
      "name": "Instagram",
      "value": 200
    },
    {
      "name": "YouTube",
      "value": 150
    }
  ]

  const recentPosts = [
    {
      "id": 1,
      "content": "Excited to launch our new product today! 🚀",
      "platform": "Twitter",
      "status": "Scheduled",
      "scheduledAt": "2025-05-10T10:00:00Z",
      "engagement": 120
    },
    {
      "id": 2,
      "content": "Behind-the-scenes look at our team 💼",
      "platform": "Instagram",
      "status": "Posted",
      "scheduledAt": "2025-05-01T15:30:00Z",
      "engagement": 450
    },
    {
      "id": 3,
      "content": "Join our live webinar next week! 📅",
      "platform": "YouTube",
      "status": "Draft",
      "scheduledAt": "2025-05-15T17:00:00Z",
      "engagement": 75
    },
    {
      "id": 4,
      "content": "New blog post: Top 5 design trends ✨",
      "platform": "Facebook",
      "status": "Posted",
      "scheduledAt": "2025-04-28T09:00:00Z",
      "engagement": 300
    }
  ]

  return (
    <NavBar title={'Dashboard'}>
      <Head title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AnalyticsCard title="Total Posts" value={4} icon="FileText" trend={5} />
        <AnalyticsCard title="Schezaduled Posts" value={2} icon="Calendar" trend={2} />
        <AnalyticsCard title="Total Engagement" value={22} icon="Heart" trend={8} />
        <AnalyticsCard title="Growth Rate" value={`${43}%`} icon="TrendingUp" trend={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Posts</h2>
            <RecentPostsList posts={recentPosts} />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Platform Distribution</h2>
            <PlatformDistribution data={platformData} />
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Post</h2>
            <QuickPost />
          </div>
        </div>
      </div>
    </NavBar>
  )
}

// import { useState } from "react"
// import { Head } from "@inertiajs/react"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// export default function Dashboard() {
//   // Sample data for the dashboard
//   const analyticsData = [
//     { name: "Mon", posts: 4, engagement: 120, reach: 1200 },
//     { name: "Tue", posts: 3, engagement: 98, reach: 980 },
//     { name: "Wed", posts: 5, engagement: 135, reach: 1350 },
//     { name: "Thu", posts: 2, engagement: 75, reach: 750 },
//     { name: "Fri", posts: 6, engagement: 150, reach: 1500 },
//     { name: "Sat", posts: 4, engagement: 110, reach: 1100 },
//     { name: "Sun", posts: 3, engagement: 90, reach: 900 },
//   ]

//   const platforms = [
//     { id: 1, name: "Instagram", connected: true, icon: "instagram" },
//     { id: 2, name: "Twitter", connected: true, icon: "twitter" },
//     { id: 3, name: "Facebook", connected: true, icon: "facebook" },
//     { id: 4, name: "LinkedIn", connected: false, icon: "linkedin" },
//     { id: 5, name: "TikTok", connected: false, icon: "tiktok" },
//   ]

//   const upcomingPosts = [
//     { id: 1, platform: "Instagram", scheduledFor: "2023-06-15T10:00:00", content: "Check out our new product launch!" },
//     {
//       id: 2,
//       platform: "Twitter",
//       scheduledFor: "2023-06-16T14:30:00",
//       content: "Join our webinar on social media strategy",
//     },
//     {
//       id: 3,
//       platform: "Facebook",
//       scheduledFor: "2023-06-17T09:00:00",
//       content: "Weekend special: 20% off all services!",
//     },
//   ]

//   const [activeTab, setActiveTab] = useState("overview")

//   // Platform icon components
//   const PlatformIcon = ({ platform }) => {
//     switch (platform.toLowerCase()) {
//       case "instagram":
//         return (
//           <svg className="h-5 w-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//           </svg>
//         )
//       case "twitter":
//         return (
//           <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//           </svg>
//         )
//       case "facebook":
//         return (
//           <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//             <path
//               fillRule="evenodd"
//               d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//               clipRule="evenodd"
//             />
//           </svg>
//         )
//       case "linkedin":
//         return (
//           <svg className="h-5 w-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
//           </svg>
//         )
//       case "tiktok":
//         return (
//           <svg className="h-5 w-5 text-black" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
//           </svg>
//         )
//       default:
//         return null
//     }
//   }

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   return (
//     <>
//       <Head title="Dashboard - Quickpost" />
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <header className="bg-white shadow">
//           <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
//             <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
//             <div className="flex items-center gap-4">
//               <button className="rounded-md bg-purple-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
//                 Create Post
//               </button>
//               <div className="relative">
//                 <button className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <img
//                     className="h-8 w-8 rounded-full"
//                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                     alt="User avatar"
//                   />
//                   <span>John Doe</span>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="m6 9 6 6 6-6" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main>
//           <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
//             {/* Dashboard tabs */}
//             <div className="mb-6 border-b border-gray-200">
//               <nav className="-mb-px flex space-x-8">
//                 <button
//                   onClick={() => setActiveTab("overview")}
//                   className={`${
//                     activeTab === "overview"
//                       ? "border-purple-500 text-purple-600"
//                       : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                   } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("platforms")}
//                   className={`${
//                     activeTab === "platforms"
//                       ? "border-purple-500 text-purple-600"
//                       : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                   } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
//                 >
//                   Platforms
//                 </button>
//                 <button
//                   onClick={() => setActiveTab("scheduled")}
//                   className={`${
//                     activeTab === "scheduled"
//                       ? "border-purple-500 text-purple-600"
//                       : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
//                   } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
//                 >
//                   Scheduled Posts
//                 </button>
//               </nav>
//             </div>

//             {/* Dashboard content */}
//             {activeTab === "overview" && (
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {/* Stats cards */}
//                 <div className="rounded-lg bg-white p-6 shadow">
//                   <div className="flex items-center">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-md bg-purple-100 text-purple-600">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="M12 20h9"></path>
//                         <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
//                       </svg>
//                     </div>
//                     <div className="ml-4">
//                       <h2 className="text-lg font-medium text-gray-900">Total Posts</h2>
//                       <p className="text-3xl font-bold text-gray-900">127</p>
//                       <p className="text-sm text-green-600">↑ 12% from last month</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-white p-6 shadow">
//                   <div className="flex items-center">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-md bg-purple-100 text-purple-600">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                         <circle cx="9" cy="7" r="4"></circle>
//                         <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//                         <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//                       </svg>
//                     </div>
//                     <div className="ml-4">
//                       <h2 className="text-lg font-medium text-gray-900">Followers</h2>
//                       <p className="text-3xl font-bold text-gray-900">5,482</p>
//                       <p className="text-sm text-green-600">↑ 8% from last month</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="rounded-lg bg-white p-6 shadow">
//                   <div className="flex items-center">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-md bg-purple-100 text-purple-600">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="M12 20V10"></path>
//                         <path d="M18 20V4"></path>
//                         <path d="M6 20v-4"></path>
//                       </svg>
//                     </div>
//                     <div className="ml-4">
//                       <h2 className="text-lg font-medium text-gray-900">Engagement</h2>
//                       <p className="text-3xl font-bold text-gray-900">24.8%</p>
//                       <p className="text-sm text-red-600">↓ 3% from last month</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Chart */}
//                 <div className="col-span-full rounded-lg bg-white p-6 shadow">
//                   <h2 className="mb-4 text-lg font-medium text-gray-900">Weekly Performance</h2>
//                   <div className="h-80">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={analyticsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
//                         <Bar dataKey="posts" fill="#82ca9d" name="Posts" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "platforms" && (
//               <div className="rounded-lg bg-white p-6 shadow">
//                 <h2 className="mb-4 text-lg font-medium text-gray-900">Connected Platforms</h2>
//                 <div className="divide-y divide-gray-200">
//                   {platforms.map((platform) => (
//                     <div key={platform.id} className="flex items-center justify-between py-4">
//                       <div className="flex items-center">
//                         <PlatformIcon platform={platform.icon} />
//                         <span className="ml-3 text-sm font-medium text-gray-900">{platform.name}</span>
//                       </div>
//                       <div>
//                         {platform.connected ? (
//                           <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
//                             Connected
//                           </span>
//                         ) : (
//                           <button className="rounded-md bg-purple-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
//                             Connect
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "scheduled" && (
//               <div className="rounded-lg bg-white p-6 shadow">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-medium text-gray-900">Upcoming Posts</h2>
//                   <button className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
//                     Schedule New Post
//                   </button>
//                 </div>
//                 <div className="divide-y divide-gray-200">
//                   {upcomingPosts.map((post) => (
//                     <div key={post.id} className="py-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <PlatformIcon platform={post.platform} />
//                           <span className="ml-3 text-sm font-medium text-gray-900">{post.platform}</span>
//                         </div>
//                         <span className="text-sm text-gray-500">{formatDate(post.scheduledFor)}</span>
//                       </div>
//                       <p className="mt-2 text-sm text-gray-600">{post.content}</p>
//                       <div className="mt-2 flex space-x-2">
//                         <button className="rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//                           Edit
//                         </button>
//                         <button className="rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-red-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </>
//   )
// }
