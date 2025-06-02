import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function PricingChart() {
  const [isHovered, setIsHovered] = useState(false)

  const chartData = [
    { name: "Starter", value: 29, color: "bg-purple-400" },
    { name: "Professional", value: 79, color: "bg-purple-600" },
    { name: "Enterprise", value: 199, color: "bg-purple-800" },
  ]

  return (
    <div className="relative w-full h-[300px] md:h-[400px]">
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: -5 }}
        animate={{
          rotate: isHovered ? 0 : -5,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="w-full h-full p-6 shadow-xl overflow-hidden">
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-bold mb-4">Pricing Comparison</h3>
            <div className="flex items-end justify-around h-full pb-10">
              {chartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-1/4">
                  <motion.div
                    className={`${item.color} w-full rounded-t-lg`}
                    initial={{ height: 0 }}
                    animate={{ height: `${(item.value / 200) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  />
                  <div className="text-center mt-2">
                    <div className="font-bold">${item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
              Monthly subscription pricing
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}