"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

export default function Home() {
  const { userId } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg">🌟 Welcome to Our App! 🌟</h1>
      <p className="mb-6 text-lg text-center">Experience seamless authentication with a modern interface.</p>

      <div className="flex gap-6">
        {!userId ? (
          <>
            <Link href="/auth/sign-in">
              <Button className="px-6 py-3 bg-white text-blue-600 font-semibold hover:bg-gray-100 transition-all shadow-xl rounded-xl">
                🚪 Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="px-6 py-3 bg-purple-700 text-white font-semibold hover:bg-purple-800 transition-all shadow-xl rounded-xl">
                📝 Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <Button className="px-6 py-3 bg-green-500 text-white font-semibold hover:bg-green-600 transition-all shadow-xl rounded-xl">
              🏠 Go to Dashboard
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}