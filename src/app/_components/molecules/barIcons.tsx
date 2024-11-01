"use client"

import Link from "next/link";
import DropdownBar from "../atoms/dropdown";
import SearchBar from "../atoms/search";
import LogoSoundSpace from "../atoms/soundspacelogo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from "clsx";  
import { UUID } from "crypto";

interface BarComponentsProps {
    text : Dispatch<SetStateAction<string>>;
    value : string;
    change : ( event : boolean ) => void;
    name: string;
    image?: string;
    id: UUID;
    dark: boolean;
}

const BarComponents = ( {dark, text , value , change, name, image, id} : BarComponentsProps ) => {

    const [bar, setBar] = useState(false);

    const [transition, setTransition] = useState(false);

    const handleTransitionEnd = () =>{
        setBar(!bar)
        text("")
    }

    const handleSearchClick = () => {
        setTransition(!transition);
        change(false);
    };

    const handleTextChange = ( event : any ) => {
        const newValue = event.target.value;
        text(newValue); 
    }
    
    useEffect(() => {
        if(value === ""){
            change(false);
        } else {
            change(true);
        }
    },[value])

    console.log(bar, transition, value)

    const shouldRender = (!bar && !transition) || (bar && value === "" && !transition);
    console.log('Should Render:', shouldRender);


    return (
        <div className={`relative font-[Lato] z-50 flex flex-row justify-between py-4 h-[80px] px-4 ${dark ? "bg-gray-950 text-white" : "bg-white text-black"} overflow-hidden`}>
            <div
                onTransitionEnd={handleTransitionEnd}
                className={clsx(
                    "absolute inset-0 flex justify-between transition-all duration-300",
                    transition ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="grid grid-cols-12 flex-grow items-center align-middle">
                    <div className={`border ${dark ? "border-gray-600" : "border-sp-purpleBright2"} rounded-3xl flex-grow p-1 col-start-2 col-end-12`}>
                        <div className="flex h-12 items-center justify-center">
                            <textarea 
                                placeholder="Search..." 
                                value={value} 
                                onChange={handleTextChange} 
                                className={`w-full mx-4 h-8 outline-none resize-none text-2xl ${dark ? "bg-gray-950 text-white" : "bg-white text-black"}`}
                            />
                        </div>
                    </div>
                    <button onClick={handleSearchClick} className="ml-4 cursor-pointer">
                        <svg
                            width="36"
                            height="36"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.8332 4.1665L19.7915 4.17692L12.4998 11.4582L5.20817 4.17692L4.1665 4.1665V5.20817L11.4582 12.4998L4.1665 19.7915V20.8332H5.20817L12.4998 13.5415L19.7915 20.8332H20.8332V19.7915L13.5415 12.4998L20.8332 5.20817V4.1665Z"
                                style={{ fill: dark ? "#A9FB1A" : "#6232DA" }}
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {shouldRender && (
                <>
                    <DropdownBar dark={dark} id={id} name={name} image={image} />
                    <Link href="/pages/home" prefetch={false}>
                        <LogoSoundSpace dark={dark}/>
                    </Link>
                    <SearchBar dark={dark} click={handleSearchClick} />
                </>
            )}
        </div>
    );
};

export default BarComponents;
