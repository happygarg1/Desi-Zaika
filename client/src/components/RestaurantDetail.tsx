import { Badge } from "./ui/badge"
import { Timer } from "lucide-react"
import AvailableMenu from "./AvailableMenu"
import { useRestaurantStore } from "@/store/useRestaurantStore"
import { useEffect } from "react"
import { useParams } from "react-router-dom"


const RestaurantDetail = () => {
      const params=useParams();
    const {singleRestaurant,getSingleRestaurant}=useRestaurantStore();

    useEffect(()=>{
        getSingleRestaurant(params.id!);
        // console.log(singleRestaurant);
        
    },[params.id]);
  return (
    <div className="max-w-6xl mx-auto my-10">
        <div className="w-full">
            <div className="relative w-full h-32 md:h-64 lg:h-72">
                <img src={singleRestaurant?.imageUrl || "Loading..."} alt="res_image" className="object-cover w-full lg:h-[300px] h-[150px] md:h-[250px] rounded-lg shadow-lg"/>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
                <div className="my-5">
                    <h1 className="font-medium text-xl flex justify-start">{singleRestaurant?.restaurantName || "Loading..."}</h1>
                    <div className="flex gap-2 my-2">
                        {
                            singleRestaurant?.cuisines.map((cuisine:string,idx:number)=>(
                                <Badge key={idx}>{cuisine}</Badge>
                            ))
                        }
                    </div>
                    <div className="flex md:flex-row flex-col gap-2 my-5">
                        <div className="flex items-center gap-2">
                            <Timer className="w-5 h-5"/>
                            <h1 className="flex items-center gap-2 font-medium">Delivery Time: {" "}</h1>
                            <span className="text-[#D19254]">
                                {singleRestaurant?.deliveryTime || "Any"}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

          {singleRestaurant?.menus && <AvailableMenu menus={singleRestaurant?.menus}/>}
        </div>
    </div>
  )
}

export default RestaurantDetail