import {z} from "zod";

export const menuSchema=z.object({
    name:z.string().nonempty({message:"name is required"}),
    description:z.string().nonempty({message:"description is required"}),
    price:z.number().min(0,{message:"price cannot be negative"}),
    image:z.instanceof(File).optional().refine((file)=>file?.size!==0,{message:"image file is required"})
});

export type menuformschema=z.infer<typeof menuSchema>;