import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
// import noodle from "@/assets/noodles.png"
import React, { FormEvent, useState } from "react"
import EditMenu from "./EditMenu";
import { menuformschema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const AddMenu = () => {

    const [input, setinput] = useState<menuformschema>({
        name: "",
        description: "",
        price: 0,
        image: undefined

    })
    const [open, setopen] = useState<boolean>(false);
    const [editopen, seteditopen] = useState<boolean>(false);
    const [selectedmenu, setselectedmenu] = useState<any>();
    const [error, seterrors] = useState<Partial<menuformschema>>({});
    const {loading,createMenu}=useMenuStore();
    const {restaurant}=useRestaurantStore();

    // const loading = false;
    const changeeventhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setinput({ ...input, [name]: type === 'number' ? Number(value) : value })
    }
    const submithandler =async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(input);

        const result = menuSchema.safeParse(input);
        if (!result.success) {
            const fielderrors = result.error.formErrors.fieldErrors;
            seterrors(fielderrors as Partial<menuformschema>);
            return;
        }

        // api implementation
        try {
            const formData=new FormData();
            formData.append("name",input.name);
            formData.append("description",input.description);
            formData.append("price",input.price.toString());
            if(input.image){
                formData.append("image",input.image);
            }
            await createMenu(formData);
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between">
                <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">Available Menus</h1>
                <Dialog open={open} onOpenChange={setopen}>
                    <DialogTrigger>
                        <Button className="bg-orange hover:bg-hoverOrange">
                            <Plus /> Add Menu</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Add New Menu
                            </DialogTitle>
                            <DialogDescription>Create menu</DialogDescription>
                        </DialogHeader>

                        <form action="" onSubmit={submithandler} className="space-y-4">
                            <div>
                                <Label>Name</Label>
                                <Input type="text" name="name" value={input.name} onChange={changeeventhandler} placeholder="Enter menu name" />
                                {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Input type="text" name="description" value={input.description} onChange={changeeventhandler} placeholder="Enter menu description" />
                                {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
                            </div>
                            <div>
                                <Label>Price</Label>
                                <Input type="number" name="price" value={input.price} onChange={changeeventhandler} placeholder="Enter menu price" />
                                {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
                            </div>
                            <div>
                                <Label>Upload menu image</Label>
                                <Input type="file" name="image" onChange={(e) => setinput({ ...input, image: e.target.files?.[0] || undefined })} />
                                {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
                            </div>
                            <DialogFooter>
                                {loading ? (<Button disabled className="bg-orange hover:bg-hoverOrange w-full"><Loader2 className="mr-2 w-4 h-4 animate-spin" />Please wait</Button>) : (<Button className="bg-orange hover:bg-hoverOrange w-full">submit</Button>)}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            {
                restaurant?.menus.map((menu: any, idx: number) => (
                    <div key={idx} className="mt-6 space-y-4">
                        {/* Menu display */}
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
                            <img src={menu.image} alt="" className="md:h-24 md:w-24 h-24 w-full object-cover rounded-lg" />

                            <div className="flex-1">
                                <h1 className="text-lg font-semibold text-gray-800">{menu.name}</h1>
                                <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
                                <h2 className="text-md font-semibold mt-2">
                                    Price: <span className="text-[#D19254]">{menu.price}</span>
                                </h2>
                            </div>

                            <Button onClick={() => {
                                setselectedmenu(menu);
                                seteditopen(true);
                            }} size={"sm"} className="bg-orange hover:bg-hoverOrange mt-2">Edit</Button>
                        </div>

                    </div>
                ))}

            <EditMenu selectedmenu={selectedmenu} editopen={editopen} seteditopen={seteditopen} />
        </div>
    )
}

export default AddMenu