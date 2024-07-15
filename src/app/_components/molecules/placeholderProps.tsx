"use client"

import { useEffect, useState } from "react"
import Button from "../atoms/button"
import UserPost from "./UserPost"


const PlaceholderProps = (props: any) =>{

    const staticDate = new Date('2024-05-30T10:00:00Z');
    const staticUUID = '123e4567-e89b-12d3-a456-426614174000';

    return <>
        <div className=" min-h-full p-3 bg-indigo-50 rounded-[20px] border-[1px] border-sp-purpleBright2 flex flex-col items-start justify-between" {... props}>
            {props.title && <div className="flex-col justify-around align-middle text-gray-900 text-[24px] w-[100%] font-bold font-['Lato'] border-solid border-b-[1px] border-sp-purpleBright2">{props.title}</div>}
                
            <div className="flex-col justify-center align-middle items-center w-full">
                {props.children}
            </div>

        </div>
    </>
}

export default PlaceholderProps