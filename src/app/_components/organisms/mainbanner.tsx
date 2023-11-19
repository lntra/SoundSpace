import Headers from "../molecules/headers"
import Headers2 from "../molecules/headers2"
import Headers3 from "../molecules/headers3"
import PlaceholderComunidade from "../molecules/placeholder"

const MainBanner = () => {
    return <>
        <div className="grid grid-cols-12 grid-rows-2 gap-5">
            <span className="col-span-1 row-span-2"></span>
            <div className="col-span-4 row-span-2 self-end bg-gradient-to-r from-cyan-500 to-blue-500">
                <span className="self-end">
                    <Headers></Headers>
                </span>
            </div>
            <div className="col-span-3 row-span-2 flex flex-wrap">
                <span className="self-end"><Headers2></Headers2></span>
                <span className="self-end"><Headers3></Headers3></span>
            </div>
            <div className="col-span-3 row-span-2">
                <PlaceholderComunidade></PlaceholderComunidade>
            </div>
            <span className="col-span-1 row-span-2"></span>
        </div>
    </>
}

export default MainBanner