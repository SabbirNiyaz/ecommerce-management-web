import * as z from "zod";

//! Validation Schemas

export const profileImageSchema = z
    .string()
    .url("Profile image must be a valid URL")
    .optional();

export const bioSchema = z
    .string()
    .min(10, "Bio must be at least 10 characters long")
    .max(255, "Bio must be less than 255 characters long")
    .trim()
    .optional();

export const addressSchema = z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(255, "Address must be less than 255 characters long")
    .trim()
    .optional();

export const phoneSchema = z
    .string()
    .regex(
        /^(\+8801|01)[3-9]\d{8}$/,
        "Phone number must be a valid Bangladeshi number"
    )
    .optional();

export const isActiveSchema = z
    .boolean()
    .default(true)
    .optional();

//! Profile Schema
export const profileSchema = z.object({
    profileImage: profileImageSchema,
    bio: bioSchema,
    address: addressSchema,
    phone: phoneSchema,
    isActive: isActiveSchema,
});

export type ProfileFormValues = z.infer<typeof profileSchema>;