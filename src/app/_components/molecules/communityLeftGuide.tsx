import PlaceholderComunidade from "./placeholder"
import PlaceholderProps from "./placeholderProps"
import UserPost from "./UserPost"

const CommunityLeftGuide = () => {
    const staticDate = new Date('2024-05-30T10:00:00Z');
    const staticUUID = '123e4567-e89b-12d3-a456-426614174000';

    return <>
       <div className="w-[20vw] h-[60vh] px-5">
         <PlaceholderProps>
            <div className="flex text-gray-950 gap-1 pt-2 pb-2 border-solid border-b-[1px] w-full border-sp-purpleBright2 overflow-hidden">
               <div className="flex flex-col w-full">
                  <div className="flex text-wrap items-center whitespace-nowrap w-full">
                        <UserPost time={staticDate} userId={staticUUID}></UserPost>
                  </div>
                  <div className="flex flex-row whitespace-nowrap w-full overflow-hidden">
                        <h1 className="text-base font-bold truncate">Alguém para montar uma banda em SP</h1>
                  </div>
                        <div className="text-wrap w-full">
                  </div>
               </div>
            </div>
         </PlaceholderProps>
       </div>
    </>
}

export default CommunityLeftGuide