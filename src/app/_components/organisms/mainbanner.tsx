import Onebigtime from "../assets/onegbigtime.png"
import Mantequilla from "../assets/mantequilla.png"
import Saturday from "../assets/saturday.png"

import Headers from "../molecules/headers"
import Headers2 from "../molecules/headers2"
import Headers3 from "../molecules/headers3"
import PlaceholderComunidade from "../molecules/placeholder"

const MainBanner = () => {
    return <>
        <div className="min-h-[650px] grid grid-cols-12 grid-rows-2 gap-5 bg-gradient-to-br	from-violet-900 to-sp-purple">
            <span className="col-span-1 row-span-2"></span>
            <div className="col-span-4 row-span-2 flex flex-wrap justify-center" 
                style={{
                background: `
                linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                url(${Onebigtime.src}) lightgray 50% / cover no-repeat`,
                border: `1px solid #96429A`,
                borderRadius: `20px`,
                }}>
                <span className="self-end">
                    <Headers></Headers>
                </span>
            </div>
            <div className="col-span-3 row-span-2 flex-wrap">
                <span className="flex min-h-[48.48%]"
                    style={{
                        background: `
                        linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                        url(${Mantequilla.src}) lightgray 50% / cover no-repeat`,
                        border: `1px solid #96429A`,
                        borderRadius: `20px`
                    }}
                    ><Headers2></Headers2>
                </span>
                <span className="flex min-h-[48.48%] mt-5"
                    style={{
                        background: `
                        linear-gradient(0deg, rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.10)), 
                        url(${Saturday.src}) lightgray 50% / cover no-repeat`,
                        border: `1px solid #96429A`,
                        borderRadius: `20px`
                    }}
                    ><Headers3></Headers3>
                </span>
            </div>
            <div className="col-span-3 row-span-2">
                <PlaceholderComunidade></PlaceholderComunidade>
            </div>
            <span className="col-span-1 row-span-2"></span>
        </div>
    </>
}

export default MainBanner