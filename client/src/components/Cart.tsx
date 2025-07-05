import { Minus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import CheckoutConfirmPage from "./CheckoutConfirmPage"
import { useCartStore } from "@/store/useCartStore"
import { CartItem } from "@/types/cartType"

const Cart = () => {
    const [open,setopen]=useState<boolean>(false);
    const {cart,decrementQuantity,incrementQuantity} = useCartStore();

    let totalAmount=cart.reduce((acc,ele)=>{
        return acc + ele.price*ele.quantity;
    },0)
    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button variant="link">Clear All</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Items</TableHead>
                        <TableHead className="text-left">Title</TableHead>
                        <TableHead className="text-left">Price</TableHead>
                        <TableHead className="text-left">Quantity</TableHead>
                        <TableHead className="text-left">Total</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        cart.map((item:CartItem)=>(
                            <TableRow>
                        <TableCell className="text-left">
                            <Avatar>
                                <AvatarImage src={item.image} alt="" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell className="text-left">{item.name}</TableCell>
                        <TableCell className="text-left">{item.price}</TableCell>
                        <TableCell className="text-left">
                            <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                                <Button onClick={()=>decrementQuantity(item._id)} size={'icon'} variant={'outline'} className="rounded-full bg-gray-200 hover:bg-hoverOrange"><Minus /></Button>
                                <Button disabled variant={'outline'} className="border-none">{item.quantity}</Button>
                                <Button onClick={()=>incrementQuantity(item._id)} size={'icon'} variant={'outline'} className="rounded-full bg-gray-200 hover:bg-hoverOrange"><Plus /></Button>
                            </div>
                        </TableCell>
                        <TableCell className="text-left">{item.price*item.quantity}</TableCell>
                        <TableCell className="text-right">
                            <Button size={'icon'} className="bg-orange hover:bg-hoverOrange rounded-full text-justify">x</Button>
                        </TableCell>
                    </TableRow>
                        ))
                    }
                </TableBody>

                <TableFooter>
                    <TableRow className="text-xl font-bold">
                        <TableCell colSpan={5} className="text-left">Total</TableCell>
                        <TableCell className="text-right">{totalAmount}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button onClick={()=> setopen(true)} className="bg-orange hover:bg-hoverOrange">
                    Proceed to CheckOut
                </Button>
            </div>
            <CheckoutConfirmPage open={open} setopen={setopen}/>
        </div>
    )
}

export default Cart