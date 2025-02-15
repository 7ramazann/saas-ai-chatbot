"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"

export default function Home() {
  const { userId } = useAuth()

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Welcome to Our App!</h1>

      <div className="flex gap-4">
        {!userId ? (
          <>
            <Link href="/auth/sign-in">
              <Button variant="default">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </>
        ) : (
          <Link href="/dashboard">
            <Button variant="default">Go to Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
