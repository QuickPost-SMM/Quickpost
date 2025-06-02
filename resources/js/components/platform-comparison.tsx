import { useState } from "react"
import { Check, X, Instagram, Facebook, Youtube } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TikTok = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

export function PlatformComparison() {
  const [activeTab, setActiveTab] = useState<keyof typeof platforms>("instagram")

  const platforms = {
    instagram: {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5 text-pink-500" />,
      color: "from-pink-500 to-purple-600",
      features: [
        { name: "Photo Posts", supported: true },
        { name: "Video Reels", supported: true },
        { name: "Stories", supported: true },
        { name: "Direct Messaging", supported: true },
        { name: "Hashtag Analytics", supported: true },
        { name: "Comment Management", supported: true },
        { name: "Audience Insights", supported: true },
        { name: "Competitor Analysis", supported: true },
      ],
    },
    facebook: {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5 text-blue-600" />,
      color: "from-blue-600 to-blue-400",
      features: [
        { name: "Text Posts", supported: true },
        { name: "Photo Albums", supported: true },
        { name: "Videos", supported: true },
        { name: "Stories", supported: true },
        { name: "Group Management", supported: true },
        { name: "Page Insights", supported: true },
        { name: "Ad Integration", supported: true },
        { name: "Event Creation", supported: true },
      ],
    },
    tiktok: {
      name: "TikTok",
      icon: <TikTok />,
      color: "from-cyan-500 to-gray-900",
      features: [
        { name: "Short Videos", supported: true },
        { name: "Duets", supported: true },
        { name: "TikTok Live", supported: true },
        { name: "Trending Music", supported: true },
        { name: "Effect Creation", supported: false },
        { name: "Comment Management", supported: true },
        { name: "Follower Analytics", supported: true },
        { name: "Hashtag Tracking", supported: true },
      ],
    },
    youtube: {
      name: "YouTube",
      icon: <Youtube className="h-5 w-5 " />,
      color: "from-red-600 to-red-500",
      features: [
        { name: "Video Upload", supported: true },
        { name: "Shorts", supported: true },
        { name: "Live Streaming", supported: true },
        { name: "Playlists", supported: true },
        { name: "Comment Moderation", supported: true },
        { name: "Channel Analytics", supported: true },
        { name: "Monetization", supported: false },
        { name: "Subscriber Management", supported: true },
      ],
    },
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="instagram" onValueChange={(value) => setActiveTab(value as keyof typeof platforms)}>
        <TabsList className="grid grid-cols-4 mb-8">
          {(Object.keys(platforms) as (keyof typeof platforms)[]).map((platform) => (
            <TabsTrigger value={platform} key={platform} className="flex gap-2 items-center">
              {platforms[platform].icon}
              <span className="hidden md:inline">{platforms[platform].name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {(Object.keys(platforms) as (keyof typeof platforms)[]).map((platform) => (
          <TabsContent value={platform} key={platform}>
            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${platforms[platform].color} opacity-5 rounded-xl`}
              ></div>
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="p-6 border-b bg-gradient-to-r from-white to-gray-50 ">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${platforms[platform].color} text-white`}>
                      {platforms[platform].icon}
                    </div>
                    <h3 className="text-2xl font-bold">{platforms[platform].name} Management</h3>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Comprehensive tools to optimize your {platforms[platform].name} presence and performance.
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                    {platforms[platform].features.map((feature) => (
                      <div key={feature.name} className="flex items-center gap-3">
                        {feature.supported ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                        <span>{feature.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Button
                      className={`bg-gradient-to-r ${platforms[platform].color} hover:opacity-90 transition-opacity text-white`}
                    >
                      Explore {platforms[platform].name} Features
                    </Button>
                    <Button variant="outline">View Demo</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}