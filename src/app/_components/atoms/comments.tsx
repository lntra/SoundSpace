import BarComments from "./barComments"
import BarHeart from "./barheart"

const Comments = () => {
    return <>
        <div className="w-[100%] py-3 px-5 rounded-[20px] border border-fuchsia-700 grid grid-cols-auto grid-rows-auto my-3">
            <div className="row-start-1 row-end-1 col-start-1 col-end-3 flex items-center">
                <img className="w-10 h-10 rounded-full border border-fuchsia-700" src="https://via.placeholder.com/32x32" />
                <div className="ml-3">
                    <span className="text-base font-bold font-['Lato']">user2022</span>
                    <span className="text-base font-semibold font-['Lato']"> - há 2 horas atrás</span>
                </div>
            </div>
            <div className="row-start-2 row-end-2 col-start-1 col-end-1 flex flex-wrap justify-center w-[40px]">
                <BarHeart color="black"></BarHeart>
                <p className="text-sm font-semibold">13.4K</p>
            </div>
            <div className="row-start-2 row-end-2 col-start-2 col-end-2 ml-3 pt-[4px]">
                <div className="w-[100%] text-gray-900 text-base font-normal font-['Lato']">Comentário: Que foto incrível! Capturou perfeitamente
                a vibe única do show do TBOS. 📸🎶 Aquele solo de guitarra foi simplesmente épico. Quem mais sente saudades desse momento?
                </div>
            </div>
            <div className="row-start-3 row-end-3 col-start-2 col-end-2 flex items-center mt-1">
                <BarComments color="#6C7871"></BarComments>
                <p className="text-sm text-stone-500 font-semibold">Responder</p>
                <BarComments color="#6C7871"></BarComments>
                <p className="text-sm text-stone-500 font-semibold">Esconder</p>
            </div>
        </div>
    </>
}

export default Comments