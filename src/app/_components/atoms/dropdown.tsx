'use client'

import Link from "next/link";
import User from "../assets/alex.jpg"
import { useEffect, useRef, useState } from "react";
import { UUID } from "crypto";
import { useRouter } from "next/navigation";

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

interface Notifications {
    content: string;
    user?: string;
    postId?: UUID;
    img?: string;
    seen?: boolean;
    created_at?: Date;
}

interface DropdownBarProps{
    name: string,
    image?: string,
    id: UUID,
    dark : boolean
}

const getNotifications = () : Notifications[] => {
    const storedNotificaitons = localStorage.getItem('userNotifications');
    return storedNotificaitons ? JSON.parse(storedNotificaitons) : [];
};

const DropdownBar = ({name, image, id, dark} : DropdownBarProps) => {

    const [notifications, setNotifications] = useState<Notifications[]>(() => getNotifications())

    const [hasUnseenNotifications, setHasUnseenNotifications] = useState(true)

    useEffect(() => {
        if(!notifications){
            return;
        }
        setHasUnseenNotifications(notifications.some(notification => notification.seen === false));
    },[notifications])

    const handleClickNotification = () => {
        setNavNotification(!navNotification)
        
        const updatedNotifications = notifications.map(notification => 
            notification.seen ? notification : { ...notification, seen: true }
        );

        setNotifications(updatedNotifications);

        localStorage.setItem('userNotifications', JSON.stringify(updatedNotifications));
    }

    const [navNotification, setNavNotification] = useState(false); 
    const dropdownStateNotification = useRef<HTMLDivElement>(null);
    
    const router = useRouter();

    const imageUser = localStorage.getItem("profileImage") 

    const [profileImage, setProfileImage] = useState(
         (imageUser ?  imageUser : "https://placehold.co/400x400/DFE0F1/6232DA?font=lato&text=Icon")
    );

    const [nav, setNav] = useState(false); 
    const dropdownState = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (nav && dropdownState.current && !dropdownState.current.contains(e.target as Node) && 
        dropdownStateNotification.current && !dropdownStateNotification.current.contains(e.target as Node)) 
        {
            setNav(false);
            setNavNotification(false);
        }
    }

    const handleLogOut = () => {
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        router.replace('/pages/login');
    }

    useEffect(() => {
        if (nav) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [nav]);

    return <>
        <button onClick={() => setNav(!nav)} className="cursor-pointer">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12C8 10.8954 8.89543 10 10 10H38C39.1046 10 40 10.8954 40 12C40 13.1046 39.1046 14 38 14H10C8.89543 14 8 13.1046 8 12Z" fill={`${dark ? "#a585cc" : "#53337B"}`}/>
                    <path d="M8 20C8 18.8954 8.89543 18 10 18H38C39.1046 18 40 18.8954 40 20C40 21.1046 39.1046 22 38 22H10C8.89543 22 8 21.1046 8 20Z" fill={`${dark ? "#a585cc" : "#53337B"}`}/>
                    <path d="M8 28C8 26.8954 8.89543 26 10 26H38C39.1046 26 40 26.8954 40 28C40 29.1046 39.1046 30 38 30H10C8.89543 30 8 29.1046 8 28Z" fill={`${dark ? "#a585cc" : "#53337B"}`}/>
                    <path d="M8 36C8 34.8954 8.89543 34 10 34H38C39.1046 34 40 34.8954 40 36C40 37.1046 39.1046 38 38 38H10C8.89543 38 8 37.1046 8 36Z" fill={`${dark ? "#a585cc" : "#53337B"}`}/>
            </svg>
        </button>
        {nav && <div className="fixed inset-0 bg-black opacity-50  z-40" onClick={() => setNav(!nav)} />}
        <div 
                ref={dropdownState}
                className={
                    nav
                        ? "fixed top-0 left-0 w-[100vw] sm:w-[300px] h-screen bg-sp-purple z-50 duration-300"
                        : "fixed top-0 left-[-105%] w-[100vw] sm:w-[300px] h-screen bg-sp-purple z-50 duration-300"
                }>
            <button onClick={() => {setNav(!nav); if(navNotification){setNavNotification(false)}} } className="absolute right-4 top-4 cursor-pointer">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.8332 4.1665L19.7915 4.17692L12.4998 11.4582L5.20817 4.17692L4.1665 4.1665V5.20817L11.4582 12.4998L4.1665 19.7915V20.8332H5.20817L12.4998 13.5415L19.7915 20.8332H20.8332V19.7915L13.5415 12.4998L20.8332 5.20817V4.1665Z" style={{ fill: 'var(--path-fill-color, white)' }}/>
                </svg>
            </button>
            <div className={`flex flex-col px-6 pt-3 justify-start h-[100vh]  text-white`}>
                <div className="flex flex-row pb-3 border-solid border-b-[1px] border-sp-accent ">
                    <Link href={`/pages/profile/${id}`}>
                        <img className="object-cover w-16 h-16 rounded-full" src={`${profileImage}`} alt={`Usuário ${name}`} />
                    </Link>
                    <div className="flex flex-col justify-center pl-2">
                        <p className="text-sm">Welcome,</p>
                        <Link href={`/pages/profile/${id}`}>
                            <p className="font-bold text-lg cursor-pointer hover:text-sp-accent group transition-colors duration-200">{name}</p>
                        </Link>
                    </div>
                </div>
                <Link href="/pages/community" prefetch={false}>
                    <div className="flex flex-wrap py-5 border-solid border-b-[1px] border-sp-accent hover:text-sp-accent group transition-colors duration-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className="group transition-colors duration-200-hover:fill-sp-accent" 
                            d="M9.3 12.7998C8.9 12.7998 8.4 12.5998 8.4 12.1998C8.4 11.7998 8.9 11.8998 9.3 11.1998C9.3 11.1998 11.1 6.2998 7.5 6.2998C3.9 6.2998 5.7 11.1998 5.7 11.1998C6.1 11.8998 6.6 11.7998 6.6 12.1998C6.6 12.5998 6.1 12.7998 5.7 12.7998C5.1 12.8998 4.6 12.7998 4 13.3998V19.0998H9C9.2 17.3998 9.7 13.8998 10.1 12.9998L10.2 12.8998C10 12.7998 9.7 12.7998 9.3 12.7998Z" style={{ fill: 'var(--path-fill-color, white)' }}/>
                            <path className="group transition-colors duration-200-hover:fill-sp-accent"
                            d="M20 12.6C19.3 11.8 18.7 11.9 18 11.8C17.5 11.7 16.9 11.6 16.9 11.1C16.9 10.6 17.5 10.8 18 9.9C18 9.9 20.1 4 15.8 4C11.4 4.1 13.5 10 13.5 10C14 10.8 14.6 10.7 14.6 11.1C14.6 11.6 14 11.7 13.5 11.8C12.6 11.9 11.8 11.8 11 13.3C10.6 14.2 10 19.1 10 19.1H20V12.6Z" style={{ fill: 'var(--path-fill-color, white)' }}/>
                        </svg>
                        <p className="pl-1">Communities</p>
                    </div>
                </Link>
                <div onClick={handleClickNotification} className="flex cursor-pointer align-middle  flex-wrap py-5 border-solid border-b-[1px] border-sp-accent hover:text-sp-accent group transition-colors duration-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.99978 18H13.9998C13.9998 18 14.0998 20 11.9998 20C9.89978 20 9.99978 18 9.99978 18Z" style={{ fill: 'var(--path-fill-color, white)' }}/>
                            <path d="M16.7 15.4C16.2 15.2 16 14.7 16 14.2V9C16 9 15.8 6.6 13 6.1V5C13 5 13.1 4 12 4C10.9 4 11 5 11 5V6.1C8.2 6.6 8 9 8 9V14.2C8 14.7 7.7 15.2 7.3 15.4L6 16V17H18V16L16.7 15.4ZM10 8.8V16H8C8.8 16 9 15 9 15V9C9 9 9 8.2 9.7 7.6C10.4 6.9 11 7 11 7C11 7 10 7.7 10 8.8Z" style={{ fill: 'var(--path-fill-color, white)' }}/>
                        </svg>
                        <p className="px-1">Notifications</p>
                        {hasUnseenNotifications && (
                            <div className="ring-container scale-75 flex items-center justify-center">
                                <div className="ringring"></div>
                                <div className="circle "></div>
                            </div>
                        )}
                </div>
                <Link href="/pages/home" prefetch={false}>
                    <div className="flex flex-wrap py-5 border-solid border-b-[1px] border-sp-accent hover:text-sp-accent group transition-colors duration-200">
                        <svg width="24" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.8387 10.3306L6.91943 23.9997V10.3306H13.8387Z" style={{ fill: 'var(--path-fill-color, white)' }}/>
                            <path d="M0.000161648 13.6689L6.91944 -0.000175476L6.91943 13.6689L0.000161648 13.6689Z" style={{ fill: 'var(--path-fill-color, white)' }}/>
                        </svg>
                        <p className="pl-1">Home</p>
                    </div>
                </Link>
                <Link href={`/pages/profile/${id}`} prefetch={false}>
                    <div className="flex flex-wrap py-5 border-solid border-b-[1px] border-sp-accent hover:text-sp-accent group transition-colors duration-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9 4C6.3 4 9 11.3 9 11.3C9.6 12.3 10.4 12.1 10.4 12.8C10.4 13.4 9.7 13.6 9 13.7C7.9 13.7 6.9 13.5 5.9 15.3C5.3 16.4 5 20 5 20H18.7C18.7 20 18.4 16.4 17.9 15.3C16.9 13.4 15.9 13.7 14.8 13.6C14.1 13.5 13.4 13.3 13.4 12.7C13.4 12.1 14.2 12.3 14.8 11.2C14.8 11.3 17.5 4 11.9 4V4Z" style={{ fill: 'var(--path-fill-color, white)' }}/>
                        </svg>
                        <p className="pl-1">Profile</p>
                    </div>
                </Link>
                <div className="mt-auto" onClick={handleLogOut} >
                    <div className="flex flex-wrap items-center justify-center py-5 border-solid border-t-[1px] border-sp-accent hover:border-red-500 hover:text-red-500 group transition-colors duration-200">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4ZM13 17H11V10H13V17ZM13 9H11V7H13V9Z" style={{ fill: 'var(--path-fill-colorDisconnect, white)' }}/>
                        </svg>
                        <p className="pl-1">Disconnect</p>
                    </div>
                </div>
            </div>
        </div>    
        <div 
                ref={dropdownStateNotification}
                className={
                    navNotification
                        ? "fixed p-3 border-x-[1px] border-y-[1px] sm:border-y-[1px] px-3 sm:border-r-[1px] rounded-3xl sm:rounded-l-none sm:rounded-r-3xl top-[153px] left-[25vw] sm:left-[300px] w-[75%] sm:w-[300px] h-[660px] bg-sp-purple z-50 duration-300  border-sp-accent border-l-[1px] border-l-sp-accent sm:border-l-[#432d65] overflow-hidden "
                        : "fixed top-[153px] left-[-100%] w-[300px] h-[660px] bg-sp-purple z-10 duration-300"
                }>
                <div className="overflow-y-auto h-full pr-2">
                {notifications && notifications.map((notification, index) => (
                    <>
                    <Link key={index} href={`/pages/community/display`} className="flex items-center gap-2 hover:bg-[#432d65] hover:cursor-pointer justify-center border-b-[1px] p-5 border-sp-accent">
                        <img className="w-8 h-8" src={`${notification.img}`} alt="" />
                        <div className="flex flex-col">
                            <p className="text-sm text-white font-medium">{notification.content}</p>
                            <p className="text-xs font-bold text-gray-300">{dayjs(notification.created_at).fromNow()}</p>
                        </div>
                    </Link>
                    </>
                ))}
                </div>
        </div>
    </>
}

export default DropdownBar;