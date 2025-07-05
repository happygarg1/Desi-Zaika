import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFormSchema,
  restaurantFromschema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const Restaurant = () => {
  const [input, setinput] = useState<restaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imagefile: undefined,
  });
  const [errors, seterrors] = useState<Partial<restaurantFormSchema>>({});
  const { loading, restaurant, updateRestaurant, createRestaurant, getRestaurant } =
    useRestaurantStore();
  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setinput({ ...input, [name]: type === "number" ? Number(value) : value });
  };
  const submithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFromschema.safeParse(input);
    if (!result.success) {
      const fielderrors = result.error.formErrors.fieldErrors;
      seterrors(fielderrors as Partial<restaurantFormSchema>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imagefile) {
        formData.append("imageFile", input.imagefile);
      }
      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
      // console.log(input);
      // await createRestaurant()
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchRestaurant = async () => {
        await getRestaurant();
      setinput({
        restaurantName: restaurant?.restaurantName || "",
        city: restaurant?.city || "",
        country: restaurant?.country || "",
        deliveryTime: restaurant?.deliveryTime ?? 0,
        cuisines: restaurant?.cuisines?restaurant.cuisines.map((cuisine:string)=>cuisine):[],
        imagefile: undefined,
      });
    };
    fetchRestaurant()
  }, []);
  // const loading = false;
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add Restaurants</h1>
          <form onSubmit={submithandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant Name */}
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={changeEventHandler}
                  placeholder="Enter your Restaurant Name"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.restaurantName}
                  </span>
                )}
              </div>
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={changeEventHandler}
                  placeholder="Enter your city Name"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.city}
                  </span>
                )}
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={changeEventHandler}
                  placeholder="Enter your country Name"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.country}
                  </span>
                )}
              </div>
              <div>
                <Label>Estimated Delivery Time</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={changeEventHandler}
                  placeholder="Enter your delivery time"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setinput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="e.g. Momos,Biryani"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload Restaurant Image</Label>
                <Input
                  onChange={(e) =>
                    setinput({
                      ...input,
                      imagefile: e.target.files?.[0] || undefined,
                    })
                  }
                  type="file"
                  accept="image/*"
                  name="imagefile"
                />
                {errors && (
                  <span className="text-xs text-red-500 font-medium">
                    {errors.imagefile?.name}
                  </span>
                )}
              </div>
            </div>
            <div>
              {loading ? (
                <Button
                  disabled
                  className="bg-orange hover:bg-hoverOrange mt-4"
                >
                  <Loader2 className="mr-2 h-4 w-4" /> Please Wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange mt-4">
                  {restaurant
                    ? "Update Your Restaurant"
                    : "Add Your Restaurant"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
