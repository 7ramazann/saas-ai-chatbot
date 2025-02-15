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
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      {/* Sign Out Button */}
      <SignOutButton>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
          Sign Out
        </button>
      </SignOutButton>
    </div>
  )
}
