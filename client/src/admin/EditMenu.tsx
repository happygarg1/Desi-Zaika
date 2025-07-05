import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuformschema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { MenuItem } from "@/types/restaurantType";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"

const EditMenu = ({selectedmenu,editopen,seteditopen}:{selectedmenu:MenuItem,editopen:boolean,seteditopen:Dispatch<SetStateAction<boolean>>}) => {
  const [input,setinput]=useState<menuformschema>({
              name:"",
              description:"",
              price:0,
              image:undefined
          
  })
  const [error,seterrors]=useState<Partial<menuformschema>>({});
  // const loading=false;
  const {loading,editMenu}=useMenuStore();
  const changeeventhandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value,type}=e.target;
    setinput({...input,[name]:type==='number'?Number(value):value});
  }
  const submithandler=async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    // console.log(input);

     const result = menuSchema.safeParse(input);
            if (!result.success) {
                const fielderrors = result.error.formErrors.fieldErrors;
                seterrors(fielderrors as Partial<menuformschema>);
                return;
            }

            try {
            const formData=new FormData();
            formData.append("name",input.name);
            formData.append("description",input.description);
            formData.append("price",input.price.toString());
            if(input.image){
                formData.append("image",input.image);
            }
            await editMenu(selectedmenu._id,formData);
        } catch (error) {
            console.log(error);
            
        }
    }
  useEffect(()=>{
    setinput({
      name:selectedmenu?.name || "",
      description:selectedmenu?.description || "",
      price:selectedmenu?.price || 0,
      image:undefined,
    })
  },[selectedmenu])
  return (
    <Dialog open={editopen} onOpenChange={seteditopen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu</DialogTitle>
            <DialogDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit.</DialogDescription>
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
                            <Input type="file" name="image" onChange={(e)=>setinput({...input,image:e.target.files?.[0] || undefined})} />
                            {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
                        </div>
                        <DialogFooter>
                            {loading?( <Button disabled className="bg-orange hover:bg-hoverOrange w-full"><Loader2 className="mr-2 w-4 h-4 animate-spin"/>Please wait</Button>):( <Button className="bg-orange hover:bg-hoverOrange w-full">submit</Button>)}
                        </DialogFooter>
                    </form>
        </DialogContent>
    </Dialog>
  )
}

export default EditMenu