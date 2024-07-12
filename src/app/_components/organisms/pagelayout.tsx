import DropdownMin from "../atoms/dropdownMin"
import User from "../assets/alex.jpg"
import Hands from "../assets/Hands.png"
import InfoUser from "../molecules/infoUser"
import ConfigButton from "../molecules/config"
import CommunityPost from "../molecules/communityPost"
import Tabs from "../molecules/tabs"

const PageLayout = () => {
    return <>
        <span className = "grid grid-cols-pr h-[100%] w-[100%]"
            style={{
                background: 'hsla(267, 41%, 34%, 1)',
                backgroundImage: `
                    linear-gradient(135deg, hsla(267, 41%, 34%, 1) 41%, hsla(297, 40%, 43%, 1) 100%)
                    `,
                filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#53337B', endColorstr='#96429A', GradientType=1)",
              }}
        >
            <div className="col-span-1 h-[100%] pr-[1px] border-r-[2px] border-solid border-sp-purpleBright2 w-[100%] bg-sp-purple min-w-[90px] max-w-[90px] fixed left-0">
                <DropdownMin></DropdownMin>
            </div>
            <span className="col-start-2 col-end-13 h-[100%] w-[100%]">
                <span className="grid grid-cols-12 grid-row-auto h-[100%] w-[100%] ">
                    <div className="row-start-1 row-end-3 col-start-1 col-end-13">
                        <img className="w-[100%] h-[100%] object-cover" src={Hands.src} alt="Mãos" />
                    </div>
                    <div className="row-start-2 row-end-4 col-start-2 col-end-5 justify-self-start place-self-end">
                        <img className=" w-96 h-96 object-cover p-[5px] border-solid rounded-[20px] border-[5px] border-sp-purpleBright2 " src={User.src} />
                    </div>
                    <div className="row-start-3 row-end-4 col-start-5 col-end-12 max-h-[200px] min-h-[170px] pt-3 rounded-[20px] ">
                        <div className="text-white bg-sp-bt-page bg-opacity-10 rounded-[20px] w-[100%] h-[100%] grid grid-cols-auto content-center">
                            <InfoUser></InfoUser>
                            <div className="col-start-2 col-end-3 flex items-center justify-center">
                                <ConfigButton></ConfigButton>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 col-start-2 col-end-12 row-start-4 text-white  font-semibold row-end-6 w-[100%] rounded-[20px] bg-sp-bt-page bg-opacity-10 grid grid-cols-12 auto-rows-auto">
                        <Tabs></Tabs>
                        <div className="col-start-2 col-end-12 mt-4 row-start-2">
                            <div className="row-span-1">
                                <CommunityPost></CommunityPost>
                            </div>
                            <div className="row-span-1">
                                <CommunityPost></CommunityPost>
                            </div>
                            <div className="row-span-1">
                                <CommunityPost></CommunityPost>
                            </div>
                        </div>
                    </div>
                </span>
            </span>
        </span> 
    </>
}

export default PageLayout