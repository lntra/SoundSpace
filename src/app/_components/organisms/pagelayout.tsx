import DropdownMin from "../atoms/dropdownMin"
import User from "../assets/alex.jpg"
import Hands from "../assets/Hands.png"
import InfoUser from "../molecules/infoUser"
import ConfigButton from "../molecules/config"
import CommunityPost from "../molecules/communityPost"
import Tabs from "../molecules/tabs"

const PageLayout = () => {
    return <>
        <style>
            {`

            html {
                background: #6232DA;
            }

            /* width */
            ::-webkit-scrollbar {
                width: 10px;
            }
            
            /* Track */
            ::-webkit-scrollbar-track {
                background: #DFE0F1;
                border-radius: 5px;
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
                background: #6232DA;
                border-radius: 5px;
            }
            
            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
                background: #A9FB1A;
            }
            `}
        </style>
        <span className = "grid grid-cols-pr h-[100%] w-[100%] header-background"
            style={{
     //           background: 'hsla(267, 41%, 34%, 1)',
             //   backgroundImage: 'linear-gradient(45deg, hsla(267, 41%, 34%, 1) 0%, hsla(316, 8%, 39%, 1) 55%, hsla(55, 16%, 42%, 1) 82%, hsla(68, 36%, 45%, 1) 100%)',
                //filter: "progid: DXImageTransform.Microsoft.gradient( startColorstr='#53337a', endColorstr='#6B5C67', GradientType=1 )"
              }}
        >
            <div className="col-span-1 h-[100%] pr-[1px] w-[100%] bg-sp-purple min-w-[90px] max-w-[90px] fixed left-0">
                <DropdownMin></DropdownMin>
            </div>
            <span className="col-start-2 col-end-13 h-[100%] w-[100%] z-50">
                <span className="grid grid-cols-12 grid-row-auto h-[100%] w-[100%] ">
                    <div className="row-start-1 row-end-5 max-h-[35vh] col-start-1 col-end-13">
                        <img className="w-[100%] h-[100%] max-h-max object-cover" src={Hands.src} alt="Mãos" />
                    </div>
                    <div className="row-start-2 row-end-7 col-start-2 col-end-5 justify-self-start place-self-end">
                        <img className="w-96 h-96 object-cover p-[5px] border-solid rounded-[20px] border-[6px] border-sp-purpleBright2 hover:border-[6px] hover:border-sp-accent " src={User.src} />
                    </div>
                    <div className="row-start-5 row-end-7 col-start-6 col-end-12 max-h-[200px] min-h-[170px] pt-3 rounded-[20px] ">
                        <div className="text-white bg-black bg-opacity-40 rounded-[20px] w-[100%] h-[100%] grid grid-cols-auto content-center">
                            <InfoUser></InfoUser>
                            <div className="col-start-2 col-end-3 flex items-center justify-center">
                                <ConfigButton></ConfigButton>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 col-start-2 col-end-12 row-start-8 row-end-9 text-white font-semibold  w-[100%] rounded-[20px] bg-black bg-opacity-40 grid grid-cols-12 auto-rows-auto pb-14 mb-5">
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