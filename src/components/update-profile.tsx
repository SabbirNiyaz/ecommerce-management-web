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
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfileFormValues, profileSchema } from "@/lib/validations/profile.schema"
import { Textarea } from "@/components/ui/textarea"
import { useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function UpdateProfileForm({
    searchParams,
    ...props
}: React.ComponentProps<typeof Card> & { searchParams?: unknown }) {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            profileImage: '',
            bio: '',
            address: '',
            phone: '',
            isActive: false
        }
    })

    const token = localStorage.getItem("token")

    // Fetch current form data
    useEffect(() => {
        const fetchProfile = async () => {

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const profile = response.data

                reset({
                    profileImage: profile.profileImage || '',
                    bio: profile.bio || '',
                    address: profile.address || '',
                    phone: profile.phone || '',
                    isActive: Boolean(profile.isActive),

                })

            } catch (err: any) {
                console.log("Error fetching profile:", err.message)
            }
        }

        fetchProfile()
    }, [reset])


    const onSubmit = async (data: ProfileFormValues) => {
        // console.log("Form Data:", data)

        // TODO: API Call
        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/profile-update`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            // console.log("Updated:", response.data)

            if (response.data.success === true) {
                toast.success("Profile updated successfully!")
                router.push("/dashboard/profile")
            }

        } catch (err: any) {
            // console.log("Update Error:", err.message)
            // Error toast
            toast.error(
                err?.response?.data?.message || "No changes detected"
            )
        }
    }

    return (
        <Card {...props} className="border w-2/3 mx-auto p-2 mt-0">
            <CardHeader className="text-center">
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>
                    Enter your profile information below
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>

                        {/* Profile Image */}
                        <Field>
                            <FieldLabel htmlFor="profileImage">Profile Image URL</FieldLabel>
                            <Input
                                id="profileImage"
                                placeholder="Enter profile image URL"
                                {...register("profileImage")}
                            />
                            {errors.profileImage && (
                                <p className="text-sm text-red-500">
                                    {errors.profileImage.message}
                                </p>
                            )}
                        </Field>

                        {/* Bio */}
                        <Field>
                            <FieldLabel htmlFor="bio">Bio</FieldLabel>
                            <Textarea
                                id="bio"
                                placeholder="Enter your bio"
                                className="w-full rounded-md border p-2"
                                {...register("bio")}
                            />
                            {errors.bio && (
                                <p className="text-sm text-red-500">
                                    {errors.bio.message}
                                </p>
                            )}
                        </Field>

                        {/* Address */}
                        <Field>
                            <FieldLabel htmlFor="address">Address</FieldLabel>
                            <Textarea
                                id="address"
                                placeholder="Enter your address"
                                className="w-full rounded-md border p-2"
                                {...register("address")}
                            />
                            {errors.address && (
                                <p className="text-sm text-red-500">
                                    {errors.address.message}
                                </p>
                            )}
                        </Field>

                        {/* Phone */}
                        <Field>
                            <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                            <Input
                                id="phone"
                                type="text"
                                placeholder="Enter phone number"
                                {...register("phone")}
                            />
                            {errors.phone && (
                                <p className="text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </Field>

                        {/* Active Status */}
                        <Field>
                            <FieldLabel htmlFor="isActive">Account Status</FieldLabel>
                            <select
                                id="isActive"
                                className="w-full rounded-md border p-2"
                                {...register("isActive", {
                                    setValueAs: (value) => value === "true",
                                })}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                            {errors.isActive && (
                                <p className="text-sm text-red-500">
                                    {errors.isActive.message}
                                </p>
                            )}
                        </Field>

                        {/* Buttons */}
                        <Field>
                            <div className="flex justify-center p-2">
                                <Button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-blue-600 
                                hover:bg-blue-700 cursor-pointer">
                                    {isSubmitting ? "Updating..." : "Update"}
                                </Button>
                            </div>
                        </Field>

                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}