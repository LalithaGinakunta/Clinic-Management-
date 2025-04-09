"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SmileIcon as Tooth, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegistrationSuccessPage() {
  const router = useRouter()

  // Auto-redirect to login after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full">
            <Tooth className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">DentalCare Pro</h1>
          <p className="text-muted-foreground text-center">Dental Clinic Management System</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-center">Registration Successful!</CardTitle>
              <CardDescription className="text-center mt-2">Your account has been created successfully</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p>Thank you for registering with DentalCare Pro. You can now log in to access the system.</p>
            <p className="text-sm text-muted-foreground mt-4">
              You will be redirected to the login page in 5 seconds...
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/login">Continue to Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

