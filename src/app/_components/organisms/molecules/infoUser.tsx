import { UUID } from "crypto";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../../../trpc/react"

interface InfoUserProps{
    name: string;
    description?: string;
    admin?: boolean;
    id: UUID;
    isfollow: boolean;
    numberLocalFollowing: number;
    dark: boolean;
}

const InfoUser = ({name, dark, description, isfollow, id, admin, numberLocalFollowing} : InfoUserProps) =>{

    console.log(numberLocalFollowing)

    console.log(admin)

    const descriptionSet = localStorage.getItem("description")

    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState(`${descriptionSet !== "null" ? descriptionSet : (description !== null ? description : "Insert bio here")}`); 
    const [edit, setEdit] = useState('');
    const [followerNumber, setFollowerNumber] = useState(0);
    const [followingNumber, setFollowingNumber] = useState(0);

    const { data : followersData, isLoading : followersLoading } = api.user.getUserFollowedCount.useQuery({
        id: id
    })

    useEffect(() => {
        if(followersData){
            if(admin){
                const countNumber = Number(followersData.count);
                console.log(countNumber + "numero estupido")
                setFollowerNumber(countNumber)
            } else {
            if(followersData.count){
                    if(isfollow){
                        const countNumber = Number(followersData.count);
                        setFollowerNumber(countNumber + 1)
                    } 
                    else {
                        setFollowerNumber(followersData.count)
                    }
                }
            }
        }
    },[followersData])

    const { data : followingData, isLoading : followingLoading  } = api.user.getUserFollowingCount.useQuery({
        id: id
    })

    useEffect(() => {
        if(admin){
            setFollowingNumber(numberLocalFollowing)
        } else {
            if(followingData){
                if(followingData.count){
                    setFollowingNumber(followingData.count)
                }
            }
        }
    },[followingData, admin, numberLocalFollowing])

    useEffect(() => {
        if (isfollow === null) {
            return;
        }

        let followImpostor = Number(followerNumber)
        
        if(followImpostor){
            if(admin){
                setFollowerNumber(0)
            } else {
            if (isfollow === true){
                setFollowerNumber(followImpostor + 1)
            } else {
                setFollowerNumber(followImpostor - 1)
            }
        }
        }

    },[isfollow, admin])
    
    const handlePopUp = () => {
        setIsOpen(!isOpen)
        setEdit(text);
    }

    const handleTextChange = (event : any) => {
        setEdit(event.target.value)
    }

    const handleSubmit = () => {
        if (edit.trim() !== "") {
            setText(edit);
            localStorage.setItem("description", edit)
        }
        setIsOpen(false)
    }
     
    return <>
      <div className="drop-shadow-2xl overflow-x-hidden px-4 py-4 sm:px-8 sm:py-4 self-end font-['Lato'] bg-placeholder">
      <h1 className="text-2xl sm:text-[2rem] line-clamp-1 font-bold mb-2">{name}</h1>
            <div className="text-base sm:text-lg">
                <div className="mb-2 flex flex-col sm:flex-row">
                    <Link className="flex hover:text-sp-accent" href={`/pages/profile/${id}/followers`}>
                        <span className="font-bold mr-1">{followerNumber}</span> 
                        <p className="mr-1">Followers</p> 
                    </Link>
                    <p className="hidden sm:block">•</p>
                    <Link className="flex hover:text-sp-accent" href={`/pages/profile/${id}/followings`}>
                        <span className="font-bold mr-1 sm:mx-1">{followingNumber}</span> 
                        <p className="mr-1">Followings</p> 
                    </Link>
                </div>
                {!admin && (
                    <div className="flex max-h-28 overflow-y-auto">
                        <p className="200 break-words">{description}</p> 
                    </div>
                )}
                {!!admin && (
                    <div className="flex max-h-28 overflow-y-auto hover:text-sp-accent hover:cursor-pointer" onClick={handlePopUp}>
                        <p className="200 break-words">{text || "Insert bio here"}</p> 
                    </div>
                )}
                

                
            </div>
        </div>
        {isOpen && (
            <div className="fixed inset-0 top-0 left-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity duration-1000 ease-in-out">
                <div className={`${dark ? "bg-gray-950 text-white" : "bg-white text-gray-500"}  p-6 rounded-lg w-80 relative opacity-100 transition-opacity duration-1000 ease-in-out`}>
                    <button
                    onClick={handlePopUp}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    >
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.8332 4.1665L19.7915 4.17692L12.4998 11.4582L5.20817 4.17692L4.1665 4.1665V5.20817L11.4582 12.4998L4.1665 19.7915V20.8332H5.20817L12.4998 13.5415L19.7915 20.8332H20.8332V19.7915L13.5415 12.4998L20.8332 5.20817V4.1665Z" style={{ fill: 'var(--path-fill-color, #6232DA)', }}/>
                    </svg>
                    </button>
                    <h2 className="text-xl font-bold mb-4">Edit Bio</h2>
                    <textarea
                    value={edit}
                    onChange={handleTextChange}
                    maxLength={200}
                    className="w-full h-40 p-2 border text-black border-gray-300 rounded"
                    placeholder="Type your bio here..."
                    />
                    <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-sp-purpleBright2 text-white px-4 py-2 rounded hover:bg-sp-accent hover:text-black"
                    >
                        Save
                    </button>
                    </div>
                </div>
                </div>
            )
        }
    </>
}

export default InfoUser