import * as z from "zod";

//! Validation schema
const noLeadingZeros = z
    .string()
    .regex(/^(0|[1-9]\d*)$/, "Must not have leading zeros");

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

export const priceSchema = noLeadingZeros
    .transform(Number)
    .pipe(
        z.number()
            .min(1, "Price must be greater than 0")
            .max(99_999_999.99, "Price must be less than 99,999,999.99")
    );

export const stockSchema = noLeadingZeros
    .default("1")
    .transform(Number)
    .pipe(
        z.number()
            .int("Stock must be a whole number")
            .min(0, "Stock cannot be negative")
            .max(2_147_483_647, "Stock must be less than 2,147,483,647")
    );

export const statusSchema = z
    .enum(["available", "out_of_stock"], {
        message: "Status must be either available or out_of_stock",
    })
    .default("available");

export const productSchema = z.object({
    category: categorySchema,
    name: productNameSchema,
    description: descriptionSchema,
    price: priceSchema,
    stock: stockSchema.optional(),
    status: statusSchema.optional(),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;