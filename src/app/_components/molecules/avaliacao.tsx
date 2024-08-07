import { useState } from "react"
import BarComments from "../atoms/barComments"
import BarHeart from "../atoms/barHeart"

const Avaliacao = () => {

    const [stateHeart, setStateHeart] = useState("")

    const handleclick = () => {
        if(stateHeart == ""){
            setStateHeart("#53337B")
        }
        else{
            setStateHeart("")
        }
    }

    return <>
        <div className="mt-3 flex">
            <div className="flex items-center mx-2">
                <div onClick={handleclick} className="flex justify-center items-center align-middle">
                    <BarHeart pressed={stateHeart} color={stateHeart != "" ? "" : "#53337B"}></BarHeart>
                </div>
                <p className="text-base font-semibold">34.4K</p>
            </div>
            <div className="flex items-center mx-2">
                <div className="flex justify-center items-center align-middle">
                    <BarComments color="black"></BarComments>
                </div>
                <p className="text-base font-semibold">303</p>
            </div>
        </div>
    </>
}

export default Avaliacao