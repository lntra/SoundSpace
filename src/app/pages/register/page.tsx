"use client";

import Link from "next/link";
import SymbolLogo from "../../_components/atoms/symbol";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { TRPCError } from "@trpc/server";
import useDarkMode from "~/app/hooks/useDarkMode";

const RegisterPage = () => {

    const mutation = api.user.register.useMutation();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const [dark, setDarkMode] = useState<boolean>(false);

    const { darkMode } = useDarkMode();

    useEffect(() => {
        if(darkMode){
            setDarkMode(darkMode)

            console.log(darkMode)
        }
        console.log(darkMode)
    },[darkMode])

    console.log(darkMode)

    const inputStyles = dark
    ? "pl-[40px] w-[100%] h-20 rounded-[20px] text-2xl font-medium text-white bg-gray-800"
    : "pl-[40px] w-[100%] h-20 rounded-[20px] text-2xl font-medium text-black bg-white";
    
    const background = {
        background: 'linear-gradient(90deg, #53337B 0%, #96429A 121.92%)'
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if ((email && password && name) !== "") {
            console.log("Submitting login with email:", email);
            console.log("Submitting login with password:", password);
                try{
                    const result = await mutation.mutateAsync({email : email.toLowerCase(), password, name})

                    if(result.id){
                        console.log("Registro bem sucedido", result)
                        router.replace('/pages/login')
                    }
                } catch (error: any) {
                    if (error instanceof TRPCError) {
                      setError(error.message);
                    } else if (error?.message) {
                      setError(error.message);
                    } else {
                      setError("An unexpected error occurred. Please try again.");
                    }
                }
        } else {
            console.error("Uknown Error", error);
            setError("Uknown Error, try again")
        }

        console.log(error)
    };

    return (
      <>
        <div className={`grid grid-cols-12 overflow-y-hidden h-[100vh] font-['Lato'] ${dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
          <div className="col-span-12 lg:col-span-5 flex flex-col items-center">
            <div className="flex flex-wrap flex-col w-[75%] h-[100%] py-[76px] justify-center items-center">
              <div
                className="h-2.5 w-[60%] rounded-[20px]"
                style={{ background: `linear-gradient(270deg, #53337B -107.14%, #96429A 100%)` }}
              ></div>
              <div className={`mt-2 text-4xl font-bold w-[100%] text-center ${dark ? "text-white" : "text-black"}`}>
                Create Account
              </div>
              <div className={`text-center mt-2 text-3xl font-light ${dark ? "text-gray-300" : "text-black"}`}>
                Fill out the form below to join us! We can't wait to welcome you!
              </div>
  
              <form className="w-[100%]" onSubmit={handleSubmit}>
                <div
                  className="w-[100%] p-[1px] mt-16 rounded-[20px]"
                  style={{ background: "linear-gradient(270deg, #53337B, #96429A)" }}
                >
                  <input
                    value={name}
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className={inputStyles}
                  />
                </div>
                <div
                  className="w-[100%] p-[1px] mt-8 rounded-[20px]"
                  style={{ background:  "linear-gradient(270deg, #53337B, #96429A)" }}
                >
                  <input
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className={inputStyles}
                  />
                </div>
                <div
                  className="w-[100%] p-[1px] mt-8 rounded-[20px]"
                  style={{ background:  "linear-gradient(270deg, #53337B, #96429A)" }}
                >
                  <input
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className={inputStyles}
                  />
                </div>
                {error && (
                  <div className="text-red-500 mt-8 text-xl font-bold text-center">
                    {error}
                  </div>
                )}
                <div
                  className="w-[100%] p-[1px] mt-8 rounded-[20px]"
                  style={{ background:  "linear-gradient(270deg, #53337B, #96429A)" }}
                >
                  <button
                     type="submit"
                    className={`w-[100%] h-20 rounded-[20px] text-2xl font-light ${dark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                  >
                      <p className={`text-2xl font-bold ${dark ? 'text-gray-300' : 'text-purple-900'}`}>Continue</p>
                  </button>
                </div>
              </form>
  
              <div className="text-center mt-16">
                <div className={`text-2xl font-light`}>Already have an account?</div>
                <Link prefetch={false} href="/pages/login" className={`text-2xl font-bold ${dark ? "text-gray-300" : "text-purple-900"}`}>
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute right-[5%] hidden lg:flex top-[5%]">
            <p className={`text-opacity-30 text-[40px] font-black ${dark ? 'text-white' : 'text-pink-200'}`}>Soundspace</p>
          </div>
          <div
            style={background}
            className="h-[100vh] hidden col-span-7 lg:grid grid-rows-auto grid-cols-5 justify-items-center content-center"
          >
            <div className="col-start-2 col-end-5 row-start-2 row-end-5">
              <SymbolLogo />
            </div>
          </div>
        </div>
      </>
    );
  };

export default RegisterPage
