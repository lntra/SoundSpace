"use client"

import { useState } from "react"

const Tabs = () => {

    const bordaDesativada = "border-sp-purpleBright2"
    const bordaAtivada = "border-sp-accent text-sp-accent"

    const [active, setActive] = useState("False");
    const [item, setItem] = useState();

    const handleClick = (props? : any) => {
        setActive("True");
        setItem(props);
    }

    return <>
        <div className="px-16 col-start-1 col-end-13 row-start-1 row-end-2 flex flex-row w-[100%] min-h-[70px]">
            <button onClick={() => handleClick(1)} className={`flex items-center px-4 border-b-[3px] ${active == "True" && item == 1 ? bordaAtivada : bordaDesativada} hover:transition hover:border-sp-accent`}>
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.0002 23.1502C30.0002 20.9002 27.7502 18.9502 25.2002 18.2002C23.2502 20.4502 19.3502 21.8002 15.6002 21.8002C15.4502 21.8002 15.1502 21.8002 15.0002 21.8002C15.0002 21.8002 15.0002 21.8002 14.8502 21.8002C14.7002 22.2502 14.7002 22.5502 14.7002 23.0002C14.7002 26.0002 18.0002 28.4002 22.2002 28.4002C22.5002 28.4002 22.8002 28.4002 23.1002 28.4002C23.7002 29.1502 25.6502 30.5002 28.2002 30.5002C28.2002 30.5002 27.0002 29.9002 27.0002 27.8002C27.0002 26.9002 30.0002 25.1002 30.0002 23.1502Z" fill={`${active == "True" && item == 1 ? "#A9FB1A" : "white"}`}/>
                    <path d="M25.5 13.4C25.5 9.65 21.3 6.5 15.9 6.5C10.5 6.5 6 9.65 6 13.4C6 15.95 9 18.2 10.5 19.4C10.5 22.1 8.4 23 8.4 23C11.85 23 13.8 21.35 14.7 20.3C15 20.3 15.45 20.3 15.9 20.3C21.15 20.45 25.5 17.3 25.5 13.4Z" fill={`${active == "True" && item == 1 ? "#A9FB1A" : "white"}`}/>
                </svg>
                <p className="px-2 text-lg">COMENTÁRIOS</p>
            </button>
            <button onClick={() => handleClick(2)} className={`flex items-center px-4 border-b-[3px] ${active == "True" && item == 2 ? bordaAtivada : bordaDesativada} hover:transition hover:border-sp-accent`}>
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 18.5L13.35 20.6H13.5V20.45L24.15 12.5L22.5 14.3L13.2 24.2L13.5 29L17.85 24.2L21 30.5L30 6.5L6 18.5Z" fill={`${active == "True" && item == 2 ? "#A9FB1A" : "white"}`}/>
                </svg>
                <p className="px-2 text-lg">POSTS</p>
            </button>
            <button onClick={() => handleClick(3)} className={`flex items-center px-4 border-b-[3px] ${active == "True" && item == 3 ? bordaAtivada : bordaDesativada} hover:transition hover:border-sp-accent`}>
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.2719 6.77925C21.2719 6.77925 16.9253 7.94393 16.641 12.6788C14.0275 8.72039 9.68081 9.88507 9.68081 9.88507C6.49325 10.7392 4.58407 14.046 5.43817 17.2335C7.02991 23.174 20.5233 27.1677 20.5233 27.1677C20.5233 27.1677 30.1733 16.8174 28.6204 11.0219C27.7663 7.83433 24.4595 5.92514 21.2719 6.77925Z" fill={`${active == "True" && item == 3 ? "#A9FB1A" : "white"}`}/>
                    <path d="M24.1982 24.303C23.8345 24.6461 23.8344 24.646 23.8343 24.6459L23.834 24.6456L23.8331 24.6446L23.8298 24.641L23.8176 24.6281L23.7724 24.5792C23.7333 24.5367 23.6765 24.4745 23.605 24.3946C23.462 24.2348 23.2595 24.0038 23.0196 23.7169C22.5405 23.144 21.909 22.344 21.3031 21.4396C20.699 20.5379 20.1101 19.5171 19.7268 18.5036C19.3474 17.5004 19.1446 16.4393 19.3986 15.4913C19.9291 13.5113 21.9718 12.3184 23.9462 12.8474L23.8168 13.3304C23.9462 12.8474 23.9464 12.8475 23.9467 12.8475L23.9473 12.8477L23.9485 12.848L23.9517 12.8489L23.9607 12.8514L23.9883 12.8596C24.0109 12.8665 24.0418 12.8763 24.0799 12.8894C24.1559 12.9156 24.261 12.9552 24.3859 13.0109C24.6347 13.1218 24.9679 13.2995 25.3076 13.5681C25.8039 13.9607 26.3117 14.5475 26.5871 15.3874C27.2455 14.7977 27.9787 14.5435 28.6049 14.4516C29.0334 14.3888 29.4107 14.4015 29.6817 14.4299C29.8177 14.4441 29.9285 14.4624 30.0074 14.4777C30.047 14.4854 30.0786 14.4923 30.1017 14.4977L30.1297 14.5044L30.1387 14.5067L30.1419 14.5075L30.1432 14.5079L30.1437 14.508C30.144 14.5081 30.1442 14.5082 30.0148 14.9911L30.1442 14.5082C32.1186 15.0372 33.2911 17.0917 32.7606 19.0716C32.5112 20.0023 31.8053 20.8104 30.9782 21.484C30.1414 22.1656 29.1212 22.7573 28.1465 23.2408C27.169 23.7257 26.2207 24.1099 25.5181 24.3725C25.1663 24.5041 24.875 24.6056 24.6709 24.6744C24.5688 24.7088 24.4884 24.7351 24.4332 24.7529L24.3695 24.7733L24.3525 24.7786L24.3479 24.78L24.3466 24.7804L24.3462 24.7806C24.346 24.7806 24.3459 24.7807 24.1982 24.303ZM24.1982 24.303L23.8345 24.6461L24.0483 24.8727L24.3459 24.7807L24.1982 24.303Z" fill={`${active == "True" && item == 3 ? "#A9FB1A" : "white"}`} stroke="#53337B"/>
                </svg>
                <p className="px-2 text-lg">CURTIDAS</p>
            </button>
            <button onClick={() => handleClick(4)} className={`flex items-center px-4 border-b-[3px] ${active == "True" && item == 4 ? bordaAtivada : bordaDesativada} hover:transition hover:border-sp-accent`}>
                <svg width="36" height="35" viewBox="0 2 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6.25V10.75H19.5L15 6.25Z" fill={`${active == "True" && item == 4 ? "#A9FB1A" : "white"}`}/>
                    <path d="M19.5 12.25H13.5V6.25H6V24.25H19.5V12.25Z" fill={`${active == "True" && item == 4 ? "#A9FB1A" : "white"}`}/>
                    <path d="M25.5 12.25V16.75H30L25.5 12.25Z" fill={`${active == "True" && item == 4 ? "#A9FB1A" : "white"}`}/>
                    <path d="M24 12.25H21V25.75H16.5V30.25H30V18.25H24V12.25Z" fill={`${active == "True" && item == 4 ? "#A9FB1A" : "white"}`}/>
                </svg>
                <p className="px-2 text-lg">SALVOS</p>
            </button>
            <span className="flex-grow border-b-[3px] border-sp-purpleBright2"></span>
        </div>
    </>
}

export default Tabs