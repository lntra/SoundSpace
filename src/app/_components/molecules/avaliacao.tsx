import { useEffect, useState } from "react"
import BarComments from "../atoms/barComments"
import BarHeart from "../atoms/barHeart"

interface AvaliacaoProps {
    likes ?: number;
    comments ?: number;
    likedState: boolean;
    handleLiked: () => void;
    handleUnliked: () => void;
    dark : boolean;
}

const Avaliacao = ( {likes, comments, likedState, handleLiked, handleUnliked, dark} : AvaliacaoProps ) => {

    const [stateHeart, setStateHeart] = useState(likedState ? (dark ? '#a585cc' : '#53337B'): '')

    useEffect(() => {
        setStateHeart(likedState ? (dark ? '#a585cc' : '#53337B') : '')
    },[likedState])

    return <>
        {!likedState && (
            <>
                <div className={`flex ${dark ? "text-white " : "text-black "}`}>
                    <div className="flex items-center ">
                        <div onClick={handleLiked} className="flex justify-center items-center align-middle">
                            <BarHeart pressed={stateHeart} color={stateHeart != "" ? "" : (dark ? "white" : "black")}></BarHeart>
                        </div>
                        <p className="text-base font-semibold">{likes}</p>
                    </div>
                    <div className="flex items-center mx-2">
                        <div className="flex justify-center items-center align-middle">
                            <BarComments color={`${dark ? "white" : "black"}`}></BarComments>
                        </div>
                        <p className="text-base font-semibold">{comments}</p>
                    </div>
                </div>  
            </>
        )}
        {!!likedState && (
            <>
                <div className={`flex ${dark ? "text-white " : "text-black "}`}>
                    <div className="flex items-center ">
                        <div onClick={handleUnliked} className="flex justify-center items-center align-middle">
                            <BarHeart pressed={stateHeart} color={stateHeart != "white" ? "" : (dark ? "white" : "black")}></BarHeart>
                        </div>
                        <p className="text-base font-semibold">{likes}</p>
                    </div>
                    <div className="flex items-center mx-2">
                        <div className="flex justify-center items-center align-middle">
                            <BarComments color={`${dark ? "white" : "black"}`}></BarComments>
                        </div>
                        <p className="text-base font-semibold">{comments}</p>
                    </div>
                </div>  
            </>
        )}
    </>
}

export default Avaliacao