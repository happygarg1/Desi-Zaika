import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useUserStore } from "@/store/useUserStore"
import { CheckoutSessionRequest } from "@/types/orderType"
import { useCartStore } from "@/store/useCartStore"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useOrderStore } from "@/store/useOrderStore"
import { Loader2 } from "lucide-react"


const CheckoutConfirmPage = ({open,setopen}:{open:boolean,setopen:Dispatch<SetStateAction<boolean>>}) => {
    const {user} = useUserStore();
    const [input,setinput]=useState({
        name:user?.fullname || "",
        email:user?.email || "",
        contact:user?.contact || "",
        address:user?.address || "",
        city:user?.city || "",
        country:user?.country||"",
    })

    const {cart} = useCartStore();
    const {restaurant}=useRestaurantStore();
    const {createCheckOutSession,loading} = useOrderStore();
    const changeEventHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setinput({...input,[name]:value});
    }
    const checkouthandler=async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        // api implementation start from here
        // console.log(input);
        try {
            const checkoutData:CheckoutSessionRequest={
                cartItems:cart.map((cartItem)=>({
                    menuId:cartItem._id,
                    name:cartItem.name,
                    image:cartItem.image,
                    price:cartItem.price.toString(),
                    quantity:cartItem.quantity.toString(),
                })),
                deliveryDetails:input,
                restaurantId:restaurant?._id as string,
            }
            await createCheckOutSession(checkoutData);
        } catch (error) {
            console.log(error);
            
        }
        
    }
  return (
    <Dialog open={open} onOpenChange={setopen}>
        <DialogContent>
            <DialogTitle>Review your Order</DialogTitle>
            <DialogDescription className="text-xs">
                Lorem ipsum dolor
            </DialogDescription>
            <form onSubmit={checkouthandler} className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
                <div>
                    <Label>FullName</Label>
                    <Input type="text" name="name" value={input.name} onChange={changeEventHandler}/>
                </div>
                <div>
                    <Label>Email</Label>
                    <Input disabled type="email" name="email" value={input.email} onChange={changeEventHandler}/>
                </div>
                <div>
                    <Label>Contact</Label>
                    <Input type="text" name="contact" value={input.contact} onChange={changeEventHandler}/>
                </div>
                <div>
                    <Label>Address</Label>
                    <Input type="text" name="address" value={input.address} onChange={changeEventHandler}/>
                </div>
                <div>
                    <Label>City</Label>
                    <Input type="text" name="city" value={input.city} onChange={changeEventHandler}/>
                </div>
                <div>
                    <Label>Country</Label>
                    <Input type="text" name="country" value={input.country} onChange={changeEventHandler}/>
                </div>
                <DialogFooter className="col-span-2 pt-5">
                    {
                        loading?(
                             <Button disabled className="bg-orange hover:bg-orange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>
                        ):( <Button className="bg-orange hover:bg-orange">Continue to Payment</Button>)
                    }
        </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
  )
}

export default CheckoutConfirmPage