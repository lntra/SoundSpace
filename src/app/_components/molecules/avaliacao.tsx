import BarComments from "../atoms/barComments"
import BarHeart from "../atoms/barheart"

const Avaliacao = () => {
    return <>
        <div className="flex items-center mt-3">
            <div className="self-center justify-self-center text-center">
                <BarHeart color="black"></BarHeart>
            </div>
            <p className=" h-[32px] text-center text-base font-semibold">34.4K</p>
            <div className="ml-3 self-center justify-self-center text-center">
                <BarComments color="black"></BarComments>
            </div>
            <p className="h-[32px] text-center text-base font-semibold">303</p>
        </div>
    </>
}

export default Avaliacao