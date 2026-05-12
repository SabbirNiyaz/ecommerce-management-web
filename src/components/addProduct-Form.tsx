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
import { Textarea } from "./ui/textarea"
import { ProductFormValues, productSchema } from "@/lib/validations/product.schema"
import axios from "axios"
import { useState } from "react"

export function AddProductForm({ ...props }: React.ComponentProps<typeof Card>) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            category: '',
            name: '',
            description: '',
            price: 0,
            stock: 0,
        }
    })

    const [isSuccess, setIsSuccess] = useState(false)

    const onSubmit = async (data: ProductFormValues) => {
        // console.log("Form Data:", data)

        // Get token from localStorage
        const token = localStorage.getItem("token")

        // TODO: API Call
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products`,
                data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            )
            // console.log("Success: ", response.data)

            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000)

            reset();

        } catch (err: any) {
            console.log("Error:", err.response?.data || err.message)
        }
    }

    return (
        <Card {...props} className="border w-2/3 mx-auto p-2 mt-0">
            <CardHeader className="text-center">

                {
                    isSuccess && <p className="text-sm mt-2 px-4 py-3 rounded-md mb-2 bg-green-100 text-green-700 
                    dark:bg-green-900/30 dark:text-green-400">
                        Product added successfully
                    </p>
                }

                <CardTitle>Add Product</CardTitle>
                <CardDescription>
                    Enter your product information below
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>

                        {/* Category */}
                        <Field>
                            <FieldLabel htmlFor="category">Category</FieldLabel>
                            <Input
                                id="category"
                                placeholder="Enter category"
                                {...register("category")}
                            />
                            {errors.category && (
                                <p className="text-sm text-red-500">
                                    {errors.category.message}
                                </p>
                            )}
                        </Field>

                        {/* Product Name */}
                        <Field>
                            <FieldLabel htmlFor="name">Product Name</FieldLabel>
                            <Input
                                id="name"
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
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea
                                id="description"
                                placeholder="Enter product description"
                                className="w-full rounded-md border p-2"
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
                            <FieldLabel htmlFor="price">Price</FieldLabel>
                            <Input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                {...register("price", { valueAsNumber: true })}
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">
                                    {errors.price.message}
                                </p>
                            )}
                        </Field>

                        {/* Stock */}
                        <Field>
                            <FieldLabel htmlFor="stock">Stock</FieldLabel>
                            <Input
                                id="stock"
                                type="number"
                                placeholder="Enter stock quantity"
                                {...register("stock", { valueAsNumber: true })}
                            />
                            {errors.stock && (
                                <p className="text-sm text-red-500">
                                    {errors.stock.message}
                                </p>
                            )}
                        </Field>

                        {/* Status */}
                        <Field>
                            <FieldLabel htmlFor="status">Status</FieldLabel>
                            <select
                                id="status"
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

                        {/* Buttons */}
                        <Field>
                            <div className="flex justify-center p-2">
                                <Button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-blue-600 hover:bg-blue-700
                                 cursor-pointer">
                                    {isSubmitting ? "Adding..." : "Add"}
                                </Button>
                            </div>
                        </Field>

                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}