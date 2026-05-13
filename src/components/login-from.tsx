"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormValues } from "@/lib/validations/auth.schema"
import axios from "axios"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation" 
export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

  const router = useRouter()
  const searchParams = useSearchParams()                    

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signin`, data)

      if (response.data.success === false) {
        setStatus({ type: 'error', message: response.data.message })
        return
      }

      setStatus({ type: 'success', message: response.data.message })

      const token = response.data.data.token

      // Save to cookie (middleware can read this)
      document.cookie = `accessToken=${token}; path=/; max-age=${60 * 60 * 24 * 7}`

      // Optional: also keep in localStorage for client-side use (e.g. reading user info)
      localStorage.setItem("token", token)

      // Redirect to the originally intended page, fallback to /dashboard
      const redirectTo = searchParams.get("redirect") || "/dashboard"
      router.push(redirectTo)

    } catch (err: any) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Something went wrong' })
    }
  }

  return (
    <Card {...props} className="dark:bg-slate-950 border dark:border-slate-800">
      <CardHeader className="text-center">
        {status && (
          <div
            className={`text-sm px-4 py-2 rounded-md mb-2 ${status.type === 'success'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}
          >
            {status.message}
          </div>
        )}
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your information below to sign in
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="any@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </Field>

            <Field>
              <div className="flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
                <Button className="bg-red-500 hover:bg-red-700 text-white cursor-pointer" type="button">
                  Sign in with Google
                </Button>
              </div>
              <FieldDescription className="text-center mt-2">
                Don't have an account?{" "}
                <a href="/signup" className="underline">Sign up</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}