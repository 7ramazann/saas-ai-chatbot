
"use client"

import { useAuth, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { userId } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!userId) {
      router.push("/auth/sign-in")
    }
  }, [userId, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-green-400 to-blue-300 text-gray-800">
      <div className="bg-white shadow-2xl rounded-xl p-10 border border-gray-300 text-center">
        <h1 className="text-4xl font-bold mb-6">📊 Dashboard</h1>
        <p className="text-lg mb-6">Welcome to your personalized dashboard! 🎯</p>

        {/* Sign Out Button */}
        <SignOutButton>
          <button className="px-6 py-3 bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-xl rounded-xl">
            🔒 Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  )
}
