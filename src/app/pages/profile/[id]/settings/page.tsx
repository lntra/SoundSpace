"use client"

import { usePathname } from "next/navigation"


import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import DropdownMin from "~/app/_components/atoms/dropdownMin"
import { api } from "~/trpc/react"
import { Comments, Followers } from "~/lib/definitions"
import Link from "next/link"
import NoResults from "~/app/_components/atoms/noResults"
import useSessionData from "~/app/hooks/useSessionData"
import { useEffect, useState } from "react"
import LoadingPage from "~/app/_components/organisms/loadingPage"
import { NextPage } from "next"
import Switch from '@mui/material/Switch';
import { UUID } from "node:crypto"

dayjs.extend(relativeTime);

interface Blocked {
    userId : UUID,
    userName: string,
}

interface FormValues {
    [key: string]: boolean;
    darkmode: boolean;
    GeneralReplies: boolean;
    YourReplies: boolean;
    LikedReply: boolean;
    sentPost: boolean;
    PostReplied: boolean;
    PostLiked: boolean;
};

const getCurrentBlocked = () : Blocked[] => {
    const storedBlocked = localStorage.getItem('userBlocked');
    return storedBlocked ? JSON.parse(storedBlocked) : [];
}

const Settings : NextPage = () => {

    const pathname = usePathname();

    const name = pathname.split("/")[3] || "";
    
    const { data , isLoading, error } = api.user.getUserFollowed.useInfiniteQuery(
        { userId: name as string},
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            enabled: name !== ""
        }
    )

    const { data : session } = useSessionData();

    const [isAdmin, setIsAdmin] = useState(false) 

    const [sessionId, setSessionId] = useState("");

    const [blocked, setBlocked] = useState(getCurrentBlocked);

    const [formValues, setFormValues] = useState<FormValues>({
        //darkmode
        darkmode: false,
        //comments
        GeneralReplies: false,
        YourReplies: true,
        LikedReply: true,
        //friends
        sentPost: true,
        //post
        PostReplied: true,
        PostLiked: false,
    });

    useEffect(() => {
        const storedSettings = localStorage.getItem("userSettings");
        if (storedSettings) {
          setFormValues(JSON.parse(storedSettings));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("userSettings", JSON.stringify(formValues));
      }, [formValues]);

    console.log(JSON.stringify(formValues))

    useEffect(() => {
        if(session && name){
            setIsAdmin(session.user.id === name)
        }
        return;
    },[session, name])

    useEffect(() => {
        setSessionId(session?.user.id as string)
    },[session]) 

    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[0.01] z-50">
                <LoadingPage></LoadingPage>
        </div>
    }

    const handleBlock = (name : string) => {
        const existe = blocked.filter((block : Blocked) => block.userName !== name);
        setBlocked(existe)
        localStorage.setItem("userBlocked", JSON.stringify(existe));
    }

    const handleToggle = (key: string) => {
        setFormValues((prev) => ({
          ...prev,
          [key]: !prev[key],
        }));
      };

    return <>
        <span className="grid grid-cols-pr min-h-screen w-[100%] header-background bg-sp-purple">
            <div className="col-span-1 h-[100%] pr-[1px] w-[100%] bg-sp-purple min-w-[90px] max-w-[90px] fixed left-0">
                <DropdownMin link={sessionId}></DropdownMin>
            </div>
            <div className="col-start-2 col-end-13 h-[100%] w-[100%] z-50 font-[Lato]">
                <div className="grid grid-rows-auto grid-cols-10 w-[100%]">
                    <div className="w-[100%] min-h-[71vh] 3xl:col-start-3 3xl:col-end-9 xl:col-start-3 xl:col-end-9 lg:col-start-2 lg:col-end-10 col-start-2 col-end-10 mt-4">
                    
                    {!isAdmin && (
                        <div className="h-[60vh] col-start-2 col-end-12 mt-4 row-start-2">
                            <NoResults text={`You don't have permission to see this user's settings`} dark={true}></NoResults>
                        </div>
                    )}

                    {!!isAdmin && (
                        <div>
                            <div className="p-2 h-full">
                                <div className="mt-5 col-start-2 col-end-12 row-start-8 row-end-9 text-white font-semibold h-[90.75vh] w-[100%] rounded-[20px] bg-black bg-opacity-40 grid grid-cols-12 auto-rows-auto pb-5 mb-5">
                                    <div className="p-4 col-span-12">
                                        <h1 className="text-[28px] border-b-2 border-sp-purpleBright2 font-bold">{session?.user.name as string}'s Settings</h1>
                                        <div>
                                            
                                        <div className="p-4 border-b-2 border-sp-purpleBright2">
                                                <div className="flex justify-between gap-4">
                                                    <div className="flex flex-col w-[50%]">
                                                        <h1 className="text-2xl">Blocked</h1>
                                                        <p className="text-lg">Control the list of blocked users.</p>
                                                        {blocked.length < 1 && (
                                                            <div>
                                                                <h1 className="font-light text-gray-200">It seems you have no users blocked</h1>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col align-middle items-center overflow-y-auto h-min max-h-[162px] w-[50%]"> 
                                                        <div className="w-[50%] ">
                                                            {blocked.length > 0 && ( 
                                                                <div className=" ">
                                                                    {blocked.map((block,index) => (
                                                                        <div key={index} className="p-2 border-2 border-white rounded-full flex justify-between my-2">
                                                                            <p>{block.userName}</p>
                                                                            <button onClick={() => handleBlock(block.userName)} className="hover:text-red-500 text-base font-bold">X</button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 border-b-2 border-sp-purpleBright2">
                                                <div className="flex justify-between gap-4">
                                                    <div className="flex flex-col w-[50%]">
                                                        <h1 className="text-2xl font-semibold">Notifications</h1>
                                                        <p className="text-lg">Select when you will be notified considering the following situations.</p>

                                                        <h1 className="p-4 text-xl font-semibold">Comments</h1>
                                                        <div className="flex flex-col justify-center align-middle border-l-2 border-white">
                                                            {[
                                                            { label: 'New Replies in a Discussion You Joined', key: 'GeneralReplies' },
                                                            { label: 'Replied to on comments', key: 'YourReplies' },
                                                            { label: 'Likes to your reply', key: 'LikedReply' }
                                                            ].map(({ label, key }) => (
                                                            <div key={key} className="flex justify-center align-middle text-center my-2">
                                                                <p className="text-start w-[80%] align-middle p-4">{label}</p>
                                                                <div className="flex justify-center items-center gap-2">
                                                                <button
                                                                    onClick={() => handleToggle(key)}
                                                                    className={`p-4 w-[60px] h-[60px] border-2 border-sp-purpleBright2 rounded-full  hover:border-sp-accent hover:bg-sp-accent hover:text-black transition-colors duration-200 ${formValues[key] ? 'bg-sp-accent text-black' : ''}`}
                                                                >
                                                                    Yes
                                                                </button>
                                                                <button
                                                                    onClick={() => handleToggle(key)}
                                                                    className={`p-4 w-[60px] h-[60px] border-2 border-sp-purpleBright2 rounded-full hover:border-sp-accent hover:bg-sp-accent hover:text-black transition-colors duration-200 ${!formValues[key] ? 'bg-sp-accent text-black' : ''}`}
                                                                >
                                                                    No
                                                                </button>
                                                                </div>
                                                            </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                        <div className="flex flex-col align-bottom justify-end">
                                                            
                                                            <h1 className="p-4 text-xl font-semibold">Friends</h1>
                                                            <div className="flex flex-col justify-center align-middle border-l-2 border-white">
                                                                {[
                                                                { label: 'Sent Post by a Friend', key: 'sentPost' }
                                                                ].map(({ label, key }) => (
                                                                <div key={key} className="flex justify-center align-middle text-center my-2">
                                                                    <p className="text-start w-[80%] align-middle p-4">{label}</p>
                                                                    <div className="flex justify-center items-center gap-2">
                                                                    <button
                                                                        onClick={() => handleToggle(key)}
                                                                        className={`p-4 w-[60px] h-[60px] border-2 border-sp-purpleBright2 rounded-full  hover:border-sp-accent hover:bg-sp-accent hover:text-black transition-colors duration-200 ${formValues[key] ? 'bg-sp-accent text-black' : ''}`}
                                                                    >
                                                                        Yes
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleToggle(key)}
                                                                        className={`p-4 w-[60px] h-[60px] border-2 border-sp-purpleBright2 rounded-full hover:border-sp-accent hover:bg-sp-accent hover:text-black transition-colors duration-200 ${!formValues[key] ? 'bg-sp-accent text-black' : ''}`}
                                                                    >
                                                                        No
                                                                    </button>
                                                                    </div>
                                                                </div>
                                                                ))}
                                                            </div>

                                                            <h1 className="p-4 text-xl font-semibold">Posts</h1>
                                                            <div className="flex flex-col justify-center align-middle border-l-2 border-white">
                                                                {[
                                                                { label: 'New replies on your post', key: 'PostReplied' },
                                                                { label: 'Likes on your post', key: 'PostLiked' },
                                                                ].map(({ label, key }) => (
                                                                <div key={key} className="flex justify-center align-middle text-center my-2">
                                                                    <p className="text-start w-[80%] align-middle p-4">{label}</p>
                                                                    <div className="flex justify-center items-center gap-2">
                                                                    <button
                                                                        onClick={() => handleToggle(key)}
                                                                        className={`p-4 w-[60px] h-[60px] border-2 border-sp-purpleBright2 rounded-full  hover:border-sp-accent hover:bg-sp-accent hover:text-black transition-colors duration-200 ${formValues[key] ? 'bg-sp-accent text-black' : ''}`}
                                                                    >
                                                                        Yes
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleToggle(key)}
                                                                        className={`p-4 w-[60px] h-[60px] border-2 border-sp-purpleBright2 rounded-full hover:border-sp-accent hover:bg-sp-accent hover:text-black transition-colors duration-200 ${!formValues[key] ? 'bg-sp-accent text-black' : ''}`}
                                                                    >
                                                                        No
                                                                    </button>
                                                                    </div>
                                                                </div>
                                                                ))}
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="p-4  border-sp-purpleBright2 h-max">
                                                <h1 className="text-2xl">Theme</h1>
                                                <p className="text-lg">Select which type of Theme you prefer for the main site.</p>
                                                <div>
                                                        <div className="flex flex-col justify-center align-middle border-l-2 border-white">
                                                            {[
                                                            { label: 'Darkmode', key: 'darkmode' },
                                                            ].map(({ label, key }) => (
                                                            <div key={key} className="flex justify-between w-[50%] align-middle text-center my-2">
                                                                <p className="text-start w-[80%] align-middle p-4">{label}</p>
                                                                <div className="flex justify-center items-center gap-2">
                                                                <button
                                                                    onClick={() => handleToggle(key)}
                                                                    className={`p-4 w-[60px] h-[60px] border-2 border-sp-purpleBright2 rounded-full  hover:border-sp-accent hover:bg-sp-accent hover:text-black transition-colors duration-200 ${formValues[key] ? 'bg-sp-accent text-black' : ''}`}
                                                                >
                                                                    Yes
                                                                </button>
                                                                <button
                                                                    onClick={() => handleToggle(key)}
                                                                    className={`p-4 w-[60px] h-[60px] border-2 border-sp-purpleBright2 rounded-full hover:border-sp-accent hover:bg-sp-accent hover:text-black transition-colors duration-200 ${!formValues[key] ? 'bg-sp-accent text-black' : ''}`}
                                                                >
                                                                    No
                                                                </button>
                                                                </div>
                                                            </div>
                                                            ))}
                                                        </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} 

                    </div>
                </div>
            </div>
        </span>
    </>
}

export default Settings
