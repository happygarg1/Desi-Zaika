import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";


const VerifyEmail = () => {
    const [otp,setotp]=useState<string[]>(["","","","","",""]);
    const inputRef=useRef<any>([]);
    // const navigate=useNavigate();
    // const loading=false;
    const {loading,verifyEmail}=useUserStore();
    const navigate=useNavigate();
    const handleChange=(index:number,value:string)=>{
        if(/^[a-zA-Z0-9]$/.test(value) || value === ""){
            const newotp=[...otp];
            newotp[index]=value;
            setotp(newotp);
        }
        if(value !== "" && index<5){
            inputRef.current[index+1].focus();
        }

    }
    const handlekeydown=(index:number,e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Backspace' && !otp[index] && index > 0){
            inputRef.current[index-1].focus();
        }
    }

    const submithandler=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const verificationCode:string=otp.join("");
        try{
             await verifyEmail(verificationCode);
             navigate("/");
        }
        catch(error){
            console.log(error);
            
        }
    }
  return (
    <div className="flex items-center justify-center h-screen w-full">
        <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
            <div className="text-center">
                <h1 className="font-extrabold text-2xl">Verify your email</h1>
                <p className="text-sm text-gray-600">Enter the six digit code sent to your email</p>
            </div>
            <form onSubmit={submithandler}>
                <div className="flex justify-between gap-x-2">
                    {
                        otp.map((letter:string,idx:number)=>(
                            <Input
                            key={idx}
                            ref={(element)=>(inputRef.current[idx]=element)}
                            type="text"
                            maxLength={1}
                            value={letter}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleChange(idx,e.target.value)}
                            onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>)=> handlekeydown(idx,e)}
                            className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        ))
                    }
                </div>
                {
                    loading?<Button className="disabled bg-orange hover:bg-hoverOrange mt-6 w-full">
                        <Loader2 className="mr-2 w-4 h-4 animate-spin"/>
                        please wait
                    </Button>: (
                        <Button className="bg-orange hover:bg-hoverOrange mt-6 w-full">Verify</Button>
                    )
                }
            </form>
        </div>
    </div>
  )
}

export default VerifyEmail