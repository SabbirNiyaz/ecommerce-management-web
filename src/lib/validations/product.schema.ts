import * as z from "zod";

//! Validation Schemas

export const categorySchema = z
    .string()
    .min(2, "Category must be at least 2 characters long")
    .max(50, "Category must be less than 50 characters long")
    .trim();

export const productNameSchema = z
    .string()
    .min(2, "Product name must be at least 2 characters long")
    .max(100, "Product name must be less than 100 characters long")
    .trim();

export const descriptionSchema = z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(255, "Description must be less than 255 characters long")
    .trim();

export const priceSchema = z
    .number({
        error: "Price is required",
    })
    .min(1, "Price must be greater than 0");

export const stockSchema = z
    .number({
        error: "Stock is required",
    })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .default(1);

export const statusSchema = z
    .enum(["available", "out_of_stock"], {
        message: "Status must be either available or out_of_stock",
    })
    .default("available");

//! Add Product Schema
export const productSchema = z.object({
    category: categorySchema,
    product_name: productNameSchema,
    description: descriptionSchema,
    price: priceSchema,
    stock: stockSchema.optional(),
    status: statusSchema.optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;