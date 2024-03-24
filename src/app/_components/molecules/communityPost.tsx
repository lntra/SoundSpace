import Bandfoto from "../assets/bandfoto.png"
import BarHeart from "../atoms/barheart"
import BarComments from "../atoms/barComments"
import BarDots from "../atoms/BarDots"

const CommunityPost = () => {
    return <>
       <div className="mb-3">
            <div className="w-[100%] h-72 grid grid-cols-sp grid-rows-2">
                <div className="col-start-1 col-end-1 row-start-1 row-end-3 w-14 flex items-start rounded-l-[20px] bg-sp-purpleBright2">
                    <div className="h-[100%] flex flex-wrap items-start justify-center">
                        <div className="mt-4">
                            <div className="self-center justify-self-center text-center">
                                <BarHeart color="white"></BarHeart>
                            </div>
                            <p className="w-[100%] text-center text-base font-semibold">34.4K</p>
                            <div className="mt-1 text-center">
                                <BarComments color="white"></BarComments>
                            </div>
                            <p className="w-[100%] text-center text-base font-semibold">303</p>
                        </div>
                        <div className="mb-4 text-end justify-self-end self-end">
                            <BarDots></BarDots>
                        </div>
                    </div>
                </div>
                <div className="col-start-2 col-end-4 row-span-2 grid grid-cols-auto grid-rows-6 rounded-tr-[20px] rounded-br-[20px] border border-fuchsia-700 bg-indigo-50 w-[100%]">
                    <div className="col-start-1 col-end-1 row-start-2 row-end-6 self-center">
                        <a href="#">
                            <img className="ml-5 w-64 rounded-[20px]" src={Bandfoto.src} />
                        </a>
                    </div>
                    <div className="ml-5 mr-5 col-start-2 col-end-2 row-start-2 row-end-6 text-black flex flex-wrap">
                        <a href="#">
                            <p className="font-semibold text-2xl">Show de TBOS em Belo Horizonte, Minas Gerais, 
                            causa grande comoção do povo com a sua última despedida.</p>
                        </a>
                        <div className="text-end self-end">
                            <p className="text-base">Postado por <a href="" className="font-bold">user2019230n!</a> há 15 minutos</p>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </>
}

export default CommunityPost