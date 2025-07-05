import { Loader2, LocateIcon, Mail, MapPin, MapPinHouse, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Input } from "./ui/input"
import { FormEvent, useRef, useState } from "react"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useUserStore } from "@/store/useUserStore"
import { toast } from "sonner"

const Profile = () => {
    const {user,updateProfile}=useUserStore();
    const [isLoading]=useState<boolean>(false);
    const [profiledata,setprofiledata]=useState({
        fullname:user?.fullname || "",
        email:user?.email || "",
        address:user?.address || "",
        city:user?.city || "",
        country:user?.country || "",
        profilePicture:user?.profilePicture || "",
    })
    const imageref=useRef<HTMLInputElement | null>(null);
    const [selectedprofilepicture,setselectedprofilepicture]=useState<string>(user?.profilePicture || "");
    const filechangehandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file=e.target.files?.[0];
        if(file){
            const reader=new FileReader();
            reader.onloadend=()=>{
                const result=reader.result as string;
                 if (!result.startsWith("data:image/")) {
            toast.error("Invalid image format");
      return;
    }
                setselectedprofilepicture(result);
                setprofiledata((prevData)=>({
                    ...prevData,
                    profilePicture:result
                }))
            };
            reader.readAsDataURL(file);
        }
    }
    const changehandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setprofiledata({...profiledata,[name]:value});
    }
    const updateprofilehandler=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        // console.log(profiledata);
        //update profile api implementation

       await updateProfile(profiledata);
    }
  return (
    
    <form onSubmit={updateprofilehandler} className="max-w-7xl mx-auto my-5">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
                    <AvatarImage src={selectedprofilepicture}/>
                    <AvatarFallback>CN</AvatarFallback>
                
                <Input ref={imageref} className="hidden" type="file" accept="image/*" onChange={filechangehandler}/>
                <div onClick={()=>imageref.current?.click()} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer">
                <Plus className="text-white w-8 h-8"/>
                </div>
                </Avatar>
                <Input type="text" name="fullname" value={profiledata?.fullname} onChange={changehandler} className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"/>
            </div>
        </div>

        <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10">
            <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                <Mail className="text-gray-500"/>
                <div className="w-full">
                    <Label>Email</Label>
                    <input disabled name="email" value={profiledata?.email} onChange={changehandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none" />
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                <LocateIcon className="text-gray-500"/>
                <div className="w-full">
                    <Label>Address</Label>
                    <input name="address" value={profiledata?.address} onChange={changehandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none" />
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                <MapPin className="text-gray-500"/>
                <div className="w-full">
                    <Label>City</Label>
                    <input name="city" value={profiledata?.city} onChange={changehandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none" />
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
                <MapPinHouse className="text-gray-500"/>
                <div className="w-full">
                    <Label>Country</Label>
                    <input name="country" value={profiledata?.country} onChange={changehandler} className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none" />
                </div>
            </div>
        </div>

        <div className="text-center">
            {
                isLoading?(
                    <Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 w-4 h-4 animate-spin "/>Please wait</Button>
                ):(
                    <Button className="bg-orange hover:bg-hoverOrange"> Update </Button>
                )
            }
        </div>
    </form>
  )
}

export default Profile