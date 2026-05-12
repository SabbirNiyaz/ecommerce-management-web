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
import { signupSchema, SignupFormValues } from "@/lib/validations/auth.schema"
import axios from "axios"
import { useState } from "react"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  // Add state for the response message
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const onSubmit = async (data: SignupFormValues) => {
    // console.log("Form Data:", data)

    // Send data without confirmPassword
    const { confirmPassword, ...payload } = data;

    // TODO: Call API
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signup`, payload)
      // console.log("Success:", response.data)
      setStatus({ type: 'success', message: response.data.message });
      reset();

    } catch (err: any) {
      console.log("Error:", err.response?.data || err.message)
      setStatus({ type: 'error', message: err.response?.data?.message || 'Something went wrong' });
    }
  }

  return (
    <Card {...props} className="dark:bg-slate-950 border dark:border-slate-800">
      <CardHeader className="text-center">

        {/* Dynamic status message */}
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

        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>

            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                placeholder="Enter your full name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                placeholder="example@domain.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </Field>

            {/* Password */}
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

            {/* Confirm Password */}
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </Field>

            {/* Buttons */}
            <Field>
              <div className="flex flex-col gap-2">
                <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>

                <Button className="bg-red-500 hover:bg-red-700 text-white cursor-pointer" type="button">
                  Sign up with Google
                </Button>
              </div>

              <FieldDescription className="text-center mt-2">
                Already have an account?{" "}
                <a href="/signin" className="underline">
                  Sign in
                </a>
              </FieldDescription>
            </Field>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}