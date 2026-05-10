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
import { productSchema, ProductFormValues } from "@/lib/validations/product.schema"
import { Textarea } from "@/components/ui/textarea"

export default function EditProductForm({ ...props }: React.ComponentProps<typeof Card>) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
    })

    const onSubmit = async (data: ProductFormValues) => {
        console.log("Form Data:", data)

        // TODO: Implement actual addProduct logic here 
    }

    return (
        <Card className="border w-2/3 mx-auto p-2 mt-0">
            <CardHeader className="text-center">
                <CardTitle>Update Product</CardTitle>
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
                            <FieldLabel htmlFor="product_name">Product Name</FieldLabel>
                            <Input
                                id="product_name"
                                placeholder="Enter product name"
                                {...register("product_name")}
                            />
                            {errors.product_name && (
                                <p className="text-sm text-red-500">
                                    {errors.product_name.message}
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
                                {...register("price")}
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
                                {...register("stock")}
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
                                <Button type="submit" disabled={isSubmitting} className="px-8 py-4 bg-red-500 
                                hover:bg-red-600 cursor-pointer">
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