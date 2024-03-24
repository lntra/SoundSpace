import Tagsnews from "../atoms/tagsnews"
import TextNews from "../atoms/textnews"
import Radiohead from "../assets/band.png"
import PlaceholderComunidade from "./placeholder"

const News = () => {
    return <>
        <div className="grid grid-cols-12 grid-rows-auto gap-5">
            <span className="col-span-1 row-start-1 row-end-2"></span>
            <div className="col-span-7 row-start-1 row-end-2 grid grid-cols-7 grid-rows-2 gap-5 pb-3 border-solid border-b-[1px] border-sp-purpleBright">
                <img className="col-span-3 row-span-2 w-full" src={Radiohead.src} alt="Banda" />
                <div className="col-span-4 row-span-2 flex flex-wrap justify-start content-center items-center">
                    <Tagsnews></Tagsnews>
                    <TextNews></TextNews>
                </div>
            </div>
            <span className="col-span-1 row-start-2 row-end-3"></span>
            <div className="col-span-7 row-start-2 row-end-3 grid grid-cols-7 grid-rows-2 gap-5 pb-3 border-solid border-b-[1px] border-sp-purpleBright">
                <img className="col-span-3 row-span-2 w-full" src={Radiohead.src} alt="Banda" />
                <div className="col-span-4 row-span-2 flex flex-wrap justify-start content-center items-center">
                    <Tagsnews></Tagsnews>
                    <TextNews></TextNews>
                </div>
            </div>
            <span className="col-span-1 row-start-3 row-end-4"></span>
            <div className="col-span-7 row-start-3 row-end-4 grid grid-cols-7 grid-rows-2 gap-5 pb-3 border-solid border-b-[1px] border-sp-purpleBright">
                <img className="col-span-3 row-span-2 w-full" src={Radiohead.src} alt="Banda" />
                <div className="col-span-4 row-span-2 flex flex-wrap justify-start content-center items-center">
                    <Tagsnews></Tagsnews>
                    <TextNews></TextNews>
                </div>
            </div>
            <span className="col-span-1 row-start-4 row-end-5"></span>
            <div className="col-span-7 row-start-4 row-end-5 grid grid-cols-7 grid-rows-2 gap-5 pb-3 border-solid border-b-[1px] border-sp-purpleBright">
                <img className="col-span-3 row-span-2 w-full" src={Radiohead.src} alt="Banda" />
                <div className="col-span-4 row-span-2 flex flex-wrap justify-start content-center items-center">
                    <Tagsnews></Tagsnews>
                    <TextNews></TextNews>
                </div>
            </div>
            <span className="col-span-1 row-start-5 row-end-6"></span>
            <div className="col-span-7 row-start-5 row-end-6 grid grid-cols-7 grid-rows-2 gap-5 pb-3">
                <img className="col-span-3 row-span-2 w-full" src={Radiohead.src} alt="Banda" />
                <div className="col-span-4 row-span-2 flex flex-wrap justify-start content-center items-center">
                    <Tagsnews></Tagsnews>
                    <TextNews></TextNews>
                </div>
            </div>
            <div className="col-span-3 row-span-3 h-[350px]">
                <PlaceholderComunidade></PlaceholderComunidade>
            </div>
        </div>
    </>
}

export default News