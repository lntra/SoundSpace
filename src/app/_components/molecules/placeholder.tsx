"use client"

import { useEffect, useState } from "react"
import BarHeart from "../atoms/barheart"
import Button from "../atoms/button"
import UserPost from "./UserPost"

interface ResponsiveTextProps {
    text: string;
  }

const ResponsiveText: React.FC<ResponsiveTextProps> = ({ text }) => {
    const [size, setSize] = useState('overflow-hidden text-wrap line-clamp-3');

    useEffect(() => {
        const updateSize = () => {
            if(window.innerWidth < 640) // sm
            {
                setSize('text-wrap	line-clamp-1');
            }
            else if(window.innerWidth < 768) // md
            {
                setSize('overflow-hidden text-wrap line-clamp-1');
            }
            else if(window.innerWidth < 1024) // lg
            {
                setSize('overflow-hidden text-wrap	line-clamp-2');
            }
            else if(window.innerWidth < 1280) // xl
            {
                setSize('overflow-hidden text-wrap	line-clamp-2');
            }
            else if(window.innerWidth < 1600) // custom
            {
                setSize('overflow-hidden text-wrap	line-clamp-2');
            }
            else{
                setSize('overflow-hidden text-wrap line-clamp-3');
            }
        };

        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return <p className={size}>{text}</p>
};

const PlaceholderComunidade = () =>{

    const staticDate = new Date('2024-05-30T10:00:00Z');
    const staticUUID = '123e4567-e89b-12d3-a456-426614174000';

    return <>
        <div className=" min-h-full p-3 bg-indigo-50 rounded-[20px] border-[1px] border-sp-purpleBright2 flex flex-col items-start justify-between">
            <div className="flex-col justify-around align-middle text-gray-900 text-[24px] w-[100%] font-bold font-['Lato'] border-solid border-b-[1px] border-sp-purpleBright2">Destaques da Semana</div>
                
            <div className="flex-col justify-center align-middle items-center w-full">
                <div className="flex text-gray-950 gap-1 pt-2 pb-2 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                    <div className="flex flex-col w-full">
                        <div className="flex text-wrap items-center whitespace-nowrap w-full">
                            <UserPost time={staticDate} userId={staticUUID}></UserPost>
                        </div>
                        <div className="flex flex-row whitespace-nowrap w-full overflow-hidden">
                            <h1 className="text-base font-bold truncate">Alguém para montar uma banda em SP</h1>
                        </div>
                        <div className="text-wrap w-full">
                            <ResponsiveText text={'Recedawdawdawdawadawdawdadawdawdwadadadadadwadawdadwadwadwantemente venho procurando novos integrantes para a minha banda chamada Nova Luz. Mais informações de contato na minha bio.'}></ResponsiveText>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-col justify-center align-middle items-center w-full">
                <div className="flex text-gray-950 gap-1 pt-2 pb-2 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                    <div className="flex flex-col w-full">
                        <div className="flex text-wrap items-center whitespace-nowrap w-full">
                            <UserPost time={staticDate} userId={staticUUID}></UserPost>
                        </div>
                        <div className="flex flex-row whitespace-nowrap w-full overflow-hidden">
                            <h1 className="text-base font-bold truncate">Alguém para montar uma banda em SP</h1>
                        </div>
                        <div className="text-wrap w-full">
                            <ResponsiveText text={'Recedawdawdawdawadawdawdadawdawdwadadadadadwadawdadwadwadwantemente venho procurando novos integrantes para a minha banda chamada Nova Luz. Mais informações de contato na minha bio.'}></ResponsiveText>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-col justify-center align-middle items-center w-full">
                <div className="flex text-gray-950 gap-1 pt-2 pb-2 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                    <div className="flex flex-col w-full">
                        <div className="flex text-wrap items-center whitespace-nowrap w-full">
                            <UserPost time={staticDate} userId={staticUUID}></UserPost>
                        </div>
                        <div className="flex flex-row whitespace-nowrap w-full overflow-hidden">
                            <h1 className="text-base font-bold truncate">Alguém para montar uma banda em SP</h1>
                        </div>
                        <div className="text-wrap w-full">
                            <ResponsiveText text={'Recedawdawdawdawadawdawdadawdawdwadadadadadwadawdadwadwadwantemente venho procurando novos integrantes para a minha banda chamada Nova Luz. Mais informações de contato na minha bio.'}></ResponsiveText>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-col justify-center align-middle items-center w-full">
                <div className="flex text-gray-950 gap-1 pt-2 pb-2 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
                    <div className="flex flex-col w-full">
                        <div className="flex text-wrap items-center whitespace-nowrap w-full">
                            <UserPost time={staticDate} userId={staticUUID}></UserPost>
                        </div>
                        <div className="flex flex-row whitespace-nowrap w-full overflow-hidden">
                            <h1 className="text-base font-bold truncate">Alguém para montar uma banda em SP</h1>
                        </div>
                        <div className="text-wrap w-full">
                            <ResponsiveText text={'Recedawdawdawdawadawdawdadawdawdwadadadadadwadawdadwadwadwantemente venho procurando novos integrantes para a minha banda chamada Nova Luz. Mais informações de contato na minha bio.'}></ResponsiveText>
                        </div>
                    </div>
                </div>
            </div>

            <Button></Button>
        </div>
    </>
}

export default PlaceholderComunidade