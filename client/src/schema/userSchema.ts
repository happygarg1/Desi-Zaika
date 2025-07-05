import {z} from "zod";

export const userSignupSchema=z.object({
    fullname:z.string().min(2,"full name is required"),
    email:z.string().email("invalid email address"),
    password:z.string().min(6,"password must be at least 6 digits"),
    contact:z.string().min(10,"contact number must be 10 digits"),
});

export type SignupInputState=z.infer<typeof userSignupSchema>;

export const userLoginSchema=z.object({
    email:z.string().email("invalid email address"),
    password:z.string().min(6,"password must be at least 6 digits"),
});

export type LoginInputState=z.infer<typeof userLoginSchema>;