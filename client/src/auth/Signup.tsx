import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignupInputState, userSignupSchema } from "@/schema/userSchema"
import { useUserStore } from "@/store/useUserStore"
import { Loader2, LockKeyhole, Mail, PhoneCall, User } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// there is two ways todefine type in typescript

// interface SignupInputState{
//     fullname:string;
//     email:string;
//     password:string;
//     contact:string;
// }
// type LoginInputState2={
//     email:string;
//     password:string;
// }

const Signup = () => {
    const [input,setinput]=useState<SignupInputState>({
      fullname:"",
        email:"",
        password:"",
        contact:"",
    });
    const [errors,setErrors]=useState<Partial<SignupInputState>>({})
    const {signup,loading} = useUserStore();
    const navigate=useNavigate();

    const changeEventHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setinput({...input,[name]:value});
    }
    const loginSubmitHandler=async (e:FormEvent)=>{
        e.preventDefault();
        // form validation check start
        const result=userSignupSchema.safeParse(input);
        if(!result.success){
            const fieldErrors=result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<SignupInputState>);
            return;  
        }
        // api implementation start here

        // console.log(input);
        try{
            await signup(input);
            navigate("/verify-email");
        }catch(error){
            console.log(error);
            
        }
    }
    // const loading = false;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">Foodie's World</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="text" name="fullname" placeholder="Enter your Full Name" value={input.fullname} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1" />
                        <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red-500">{errors.fullname}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="email" name="email" placeholder="Enter your email" value={input.email} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1" />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red-500">{errors.email}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="Password" name="password" placeholder="Enter your Password" value={input.password} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1" />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red-500">{errors.password}</span>
                        }
                    </div>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        <Input type="text" name="contact" placeholder="Enter your phone number" value={input.contact} onChange={changeEventHandler} className="pl-10 focus-visible:ring-1" />
                        <PhoneCall className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                        {
                            errors && <span className="text-sm text-red-500">{errors.contact}</span>
                        }
                    </div>
                </div>

                <div className="mb-10">
                    {loading ? <Button disabled className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="mr-4 h-4 w-4 animate-spin" />Please wait</Button> : <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">Signup</Button>}
                </div>

                <Separator/>

                <p className="mt-2">
                    Already have an account?{" "}
                    <Link to="/login"  className="text-blue-500">Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup