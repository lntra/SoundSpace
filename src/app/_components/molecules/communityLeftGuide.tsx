import { UUID } from "crypto";
import Arrow from "../atoms/arrow";
import Button from "../atoms/button";
import FollowList from "../atoms/followList";
import NavLeftGuide from "../atoms/navLeftGuide";
import PlaceholderProps from "./placeholderProps";
import UserPost from "./UserPost";
import { api } from "~/trpc/react";
import Image from "next/image"
import placeholder from "../../_components/assets/placeholder.png";
import { Communities, Following_commmunity } from "~/lib/definitions";
import { cp } from "fs";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Highlights from "../atoms/highlight";

interface CommunityLeftGuideProps {
    userId : UUID,
    setForYou : Dispatch<SetStateAction<boolean>>,
    forYouRoute: boolean
    dark : boolean
}

const getFollowedCommunities = () : Communities[] => {
    const storedFollowedCommunities = localStorage.getItem('followedCommunities');
    return storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : [];
};

const CommunityLeftGuide = ( {userId, forYouRoute, setForYou, dark} : CommunityLeftGuideProps ) => {

    const[localRoute, setLocalRoute] = useState<boolean>(false)

    const {data, isLoading, error} = api.user.getUserFollowingCommunities.useInfiniteQuery({
        userId : userId
    })

    const [reload, setReload] = useState(false)

    const [localFollowing, setLocalFollowing] = useState<Communities[]>(() => getFollowedCommunities());

    useEffect(() => {

        if(!data || !localFollowing){
            return;
        }

        if(localFollowing.length > 0) {
            setLocalRoute(true);
        } else {
            setReload(!reload)
        }

    },[data, localFollowing, reload])

    useEffect(() => {
        const storedFollowedCommunities = localStorage.getItem('followedCommunities');
        setLocalFollowing(storedFollowedCommunities ? JSON.parse(storedFollowedCommunities) : []);
    },[])

    return (
        <div className="w-full lg:w-[18vw] h-[vh] min-h-[567px]">
            <PlaceholderProps dark={dark} className="h-full flex flex-col" size="max-h-[567px] min-h-[567px]">
                <div className={`flex-grow overflow-y-auto w-full p-3`}>
                    <NavLeftGuide forYouRoute={forYouRoute} setForYou={setForYou} />
                    <div className="w-full min-h-max flex-grow">
                    <p className={`mt-2 text-[14px] ${dark ? "text-white " : "text-textNav"} font-bold`}>FOLLOWING</p>
                    {!localRoute && (
                        <>
                            {(localFollowing.length > 0)  ?  (
                                <>
                                    <div className="flex-col text-textNav font-bold gap-4 w-full min-h-max">         
                                        {data?.pages.map((page, index) => (
                                            <div key={index} className={`${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} `} >
                                                {page.allCommunities
                                                .map((community : Following_commmunity) => (
                                                    <Link href={`/pages/community/${community.community_id}`} className={`${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"}  flex p-2 items-center border-solid border-b-[1px] border-sp-purpleBright2`}>
                                                        <div className="w-[36px] h-[36px] min-w-[36px] min-h-[36px] mr-2 rounded-full overflow-hidden border-solid border-[1px] border-sp-purpleBright2">
                                                            <Image
                                                                src={`${community.community_icon || placeholder}`}
                                                                alt="Community Image Placeholder"
                                                                width={36}
                                                                height={36}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-normal">{community.community_name}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>    
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="p-3 gap-1 flex flex-col">
                                <h1 className="font-bold self-center">Recommendations</h1>
                                <Link href={`/pages/community/97f4d418-eb4a-425d-97d0-83f6acbc435a`}>
                                    <div className={`${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} flex items-center align-middle border-b-[1px] py-2 border-sp-purpleBright2`}>
                                        <UserPost 
                                            dark={dark}
                                            img="https://fastly.picsum.photos/id/446/3072/1728.jpg?hmac=62VykY0FNeXxvrUhPIGiucHvYI1qd_VzMTmk98U-D5Y"
                                            textStyle="text-base" style="w-8 h-8 mr-2 rounded-full" 
                                            text="The Band, from Outer Space" 
                                            userId="97f4d418-eb4a-425d-97d0-83f6acbc435a" 
                                        />
                                        <div className="hidden xl:block">
                                        <Highlights text="HOT" />
                                        </div>
                                    </div>
                                </Link>
                                <Link href={`/pages/community/${"3edb55a2-a037-48a7-81af-d19c99b00dc1"}`}>
                                <div className={` ${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} flex items-center align-middle border-b-[1px] py-2 border-sp-purpleBright2`}>
                                        <UserPost 
                                        dark={dark}
                                        img={`https://fastly.picsum.photos/id/548/5000/3333.jpg?hmac=BdycqoDMwkZoSovCL9E2F8MAyqdhkHVj8yYkHvkkkVM`}
                                        textStyle="text-base" style="w-8 h-8 mr-2 rounded-full" text="SunDown" userId={'3edb55a2-a037-48a7-81af-d19c99b00dc1'}></UserPost>
                                        <div className="hidden xl:block">
                                        <Highlights text="HOT"></Highlights>
                                        </div>
                                </div>
                                </Link>
                                <Link href={`/pages/community/${"0a8d5e32-1e4f-4a9a-9f5d-1c1234567890"}`}>
                                    <div className={` ${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} flex items-center align-middle border-b-[1px] py-2 border-sp-purpleBright2`}>
                                            <UserPost 
                                            dark={dark}
                                            img={`https://fastly.picsum.photos/id/672/5000/3333.jpg?hmac=u6anJjrup8TAGrJxZSY3u-9OmftJ1Dn4P_6vPqF7a7U`}
                                            textStyle="text-base" style="w-8 h-8 mr-2 rounded-full" text="Indie Harmony" userId={'0a8d5e32-1e4f-4a9a-9f5d-1c1234567890'}></UserPost>
                                    </div>
                                </Link>
                                <Link href={`/pages/community/${"1b9e3c45-2d5a-4e6b-bc5a-2d1234567890"}`}>
                                    <div className={` ${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} flex items-center align-middle border-b-[1px] py-2 border-sp-purpleBright2`}>
                                            <UserPost 
                                            dark={dark}
                                            img={`https://fastly.picsum.photos/id/815/2074/1383.jpg?hmac=z5kVymrNUTKCDBhKG3oays-sesL-_APZSoaWQJInU4s`}
                                            textStyle="text-base" style="w-8 h-8 mr-2 rounded-full" text="Pop Vibes" userId={'1b9e3c45-2d5a-4e6b-bc5a-2d1234567890'}></UserPost>
                                    </div>
                                </Link>
                                <Link href={`/pages/community/${"2c0f4e56-3e7b-4f8b-cd6a-3e1234567890"}`}>
                                    <div className={` ${dark ? "hover:bg-gray-800" : "hover:bg-gray-200"} flex items-center align-middle py-2`}>
                                            <UserPost 
                                            dark={dark}
                                            img={`https://fastly.picsum.photos/id/755/5000/3800.jpg?hmac=kHxjzz3TQ4ZQLtUF3fNgIiBMwHc04Kf9xg9jfYsabxM`}
                                            textStyle="text-base" style="w-8 h-8 mr-2 rounded-full" text="Jazz Lounge" userId={'2c0f4e56-3e7b-4f8b-cd6a-3e1234567890'}></UserPost>
                                    </div>
                                </Link>
                            </div>
                            )
                        }
                        </>
                    )}
                    {!!localRoute && (
                        <>
                            <div className="flex-col text-textNav font-bold gap-4 w-full min-h-max">         
                                {
                                localFollowing.map((page, index) => (
                                    <div key={index} className={`${dark ? "hover:bg-gray-800 text-white" : "hover:bg-gray-200"} `}  >
                                        <Link href={`/pages/community/${page.id}`} className="flex p-2 items-center border-solid border-b-[1px] border-sp-purpleBright2">
                                            <div className="w-[36px] h-[36px] min-w-[36px] min-h-[36px] mr-2 rounded-full overflow-hidden border-solid border-[1px] border-sp-purpleBright2">
                                                <Image
                                                    src={`${page.url_icon || placeholder}`}
                                                    alt="Community Image Placeholder"
                                                    width={36}
                                                    height={36}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-normal">{page.name}</p>
                                            </div>
                                        </Link>
                                    </div>    
                                ))
                                
                                
                                }
                            </div>    
                        </>
                    )}
                    </div>
                </div>
            </PlaceholderProps>
        </div>
    );
};

export default CommunityLeftGuide;
