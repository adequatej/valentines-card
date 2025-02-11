"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"
import Card from "@/components/Card"

const DynamicConfetti = dynamic(() => import("@/components/Confetti"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md">
        <Card onSuccess={() => setShowConfetti(true)} />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {showConfetti && <DynamicConfetti />}
      </Suspense>
    </main>
  )
}

