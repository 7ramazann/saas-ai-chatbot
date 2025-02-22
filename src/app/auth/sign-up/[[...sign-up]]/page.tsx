"use client"

import {SignUp} from "@clerk/nextjs"

export default function SignUpPage() {

  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <SignUp afterSignUpUrl="/dashboard"/>
        </div>
      </div>
)
}
