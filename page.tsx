"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { useUser } from "@/components/user-provider"
import { Eye, EyeOff, Loader2, Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"patient" | "dentist" | "admin">("patient")
  const router = useRouter()
  const { toast } = useToast()
  const { login: authLogin } = useAuth()
  const { login: userLogin } = useUser()
  const { theme, setTheme } = useTheme()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Login with both providers to ensure consistency
      await authLogin(email, password, role)
      await userLogin(email, password, role)

      toast({
        title: "Login successful",
        description: `Welcome back! You've been logged in as a ${role}.`,
        variant: "default",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full hover:bg-background/80"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center animate-in">
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="relative w-full h-[200px] mb-6">
            <Image src="/images/dental-pro-logo.png" alt="Dental Pro Logo" fill className="object-contain" priority />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold">
              <span className="text-dental-blue">Dental</span>
              <span className="text-dental-pink"> Prō</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">Modern Dental Practice Management System</p>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-md">
              Streamline your dental practice with our comprehensive management solution. Manage appointments, patient
              records, billing, and more in one place.
            </p>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto slide-in">
          <Card className="w-full shadow-lg border-primary/20 elegant-card">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <div className="relative w-10 h-10 md:hidden">
                  <Image src="/images/dental-pro-logo.png" alt="Dental Pro Logo" fill className="object-contain" />
                </div>
                <h2 className="text-2xl font-bold md:hidden">
                  <span className="text-dental-blue">Dental</span>
                  <span className="text-dental-pink"> Prō</span>
                </h2>
              </div>
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="patient" className="w-full" onValueChange={(value) => setRole(value as any)}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                  <TabsTrigger value="dentist">Dentist</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>
                <TabsContent value="patient">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="elegant-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="elegant-input"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">Toggle password visibility</span>
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full elegant-button" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="dentist">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dentist-email">Email</Label>
                      <Input
                        id="dentist-email"
                        type="email"
                        placeholder="name@dentalpro.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="elegant-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dentist-password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="dentist-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="elegant-input"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">Toggle password visibility</span>
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full elegant-button" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="admin">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@dentalpro.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="elegant-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="admin-password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="admin-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="elegant-input"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">Toggle password visibility</span>
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full elegant-button" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Create an account
                </Link>
              </div>
              <div className="text-xs text-center text-muted-foreground">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

