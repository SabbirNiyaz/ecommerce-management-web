"use client"

import { useEffect } from "react"
import axios from "axios"

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
import { Textarea } from "@/components/ui/textarea"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    productSchema,
    ProductFormInput,
    ProductFormValues,
} from "@/lib/validations/product.schema"
import toast from "react-hot-toast"

// Strips non-digits and removes leading zeros: "01" → "1", "007" → "7"
const sanitizeNumericInput = (value: string) =>
    value.replace(/[^0-9]/g, "").replace(/^0+(\d)/, "$1")

type Props = {
    id: string
}

export default function EditProductForm({ id }: Props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormInput, any, ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            category: "",
            name: "",
            description: "",
            price: "",
            stock: "",
            status: "available",
        },
    })

    // Fetch Product Data
    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem("token")

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                const product = response.data

                // Convert numbers back to strings to match ProductFormInput shape
                reset({
                    category: product.category || "",
                    name: product.name || "",
                    description: product.description || "",
                    price: product.price != null ? String(product.price) : "",
                    stock: product.stock != null ? String(product.stock) : "",
                    status: product.status || "available",
                })

            } catch (err: any) {
                console.log("Error fetching product:", err.message)
            }
        }

        if (id) fetchProduct()
    }, [id, reset])

    // Update Product data
    const onSubmit = async (data: ProductFormValues) => {
        const token = localStorage.getItem("token")

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            // console.log("Updated:", response.data)

            // Success toast
            toast.success("Product Updated successfully!")

        } catch (err: any) {
            // console.log("Update Error:", err.message)
            // Error toast
            toast.error(
                err?.response?.data?.message || "No changes detected"
            )
        }
    }

    const priceRegister = register("price")
    const stockRegister = register("stock")

    return (
        <Card className="border w-2/3 mx-auto p-2 mt-0">
            <CardHeader className="text-center">
                <CardTitle>Update Product</CardTitle>
                <CardDescription>
                    Edit product information below
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>

                        {/* Category */}
                        <Field>
                            <FieldLabel>Category</FieldLabel>
                            <Input
                                placeholder="Enter category"
                                {...register("category")}
                            />
                            {errors.category && (
                                <p className="text-sm text-red-500">
                                    {errors.category.message}
                                </p>
                            )}
                        </Field>

                        {/* Name */}
                        <Field>
                            <FieldLabel>Product Name</FieldLabel>
                            <Input
                                placeholder="Enter product name"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Textarea
                                placeholder="Enter product description"
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </Field>

                        {/* Price */}
                        <Field>
                            <FieldLabel>Price</FieldLabel>
                            <Input
                                type="text"
                                inputMode="numeric"
                                placeholder="Enter price"
                                {...priceRegister}
                                onChange={(e) => {
                                    e.target.value = sanitizeNumericInput(e.target.value)
                                    priceRegister.onChange(e)
                                }}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">
                                    {errors.price.message}
                                </p>
                            )}
                        </Field>

                        {/* Stock */}
                        <Field>
                            <FieldLabel>Stock</FieldLabel>
                            <Input
                                type="text"
                                inputMode="numeric"
                                placeholder="Enter stock quantity"
                                {...stockRegister}
                                onChange={(e) => {
                                    e.target.value = sanitizeNumericInput(e.target.value)
                                    stockRegister.onChange(e)
                                }}
                            />
                            {errors.stock && (
                                <p className="text-sm text-red-500">
                                    {errors.stock.message}
                                </p>
                            )}
                        </Field>

                        {/* Status */}
                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <select
                                className="w-full rounded-md border p-2"
                                {...register("status")}
                            >
                                <option value="available">Available</option>
                                <option value="out_of_stock">Out of Stock</option>
                            </select>
                            {errors.status && (
                                <p className="text-sm text-red-500">
                                    {errors.status.message}
                                </p>
                            )}
                        </Field>

                        {/* Submit */}
                        <Field>
                            <div className="flex justify-center p-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-4 bg-blue-500 hover:bg-blue-600"
                                >
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