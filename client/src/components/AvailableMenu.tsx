import { MenuItem } from "@/types/restaurantType"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import { useCartStore } from "@/store/useCartStore"
import { useNavigate } from "react-router-dom"

const AvailableMenu = ({menus}:{menus:MenuItem[]}) => {
  const {addToCart} = useCartStore();
  const navigate=useNavigate();
  return (
    <div className="md:p-4 my-2">
        <h1 className="text-xl md:text-2xl font-extrabold mb-6 flex justify-start">Available Menus</h1>
        <div className="grid md:grid-cols-3 space-y-4 md:space-y-8">
          {
            menus.map((menu:MenuItem)=>(
                <Card className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                <img src={menu.image} alt="" className="h-[250px] w-[500px]" />

                <CardContent className="p-4">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{menu.name}</h4>
                    <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
                    <h3 className="text-lg font-semibold mt-4">
                      Price: <span className="text-[#D19254]">&#8377;{menu.price}</span>
                    </h3>
                </CardContent>
                <CardFooter className="p-4">
                  <Button onClick={()=>{
                      addToCart(menu);
                      navigate("/cart");
                  }} className="w-full bg-orange hover:bg-hoverOrange">Add to Cart</Button>
                </CardFooter>
            </Card>
            ))
          }
        </div>
    </div>
  )
}

export default AvailableMenu