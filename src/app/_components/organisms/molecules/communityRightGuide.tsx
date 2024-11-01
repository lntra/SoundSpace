import React from "react";
import PlaceholderProps from "../../molecules/placeholderProps"

interface CommunityRightGuideProps{
   name?: string;
   description?: string;
   rules?: string[];
   links?: string[];
   dark : boolean
}

const CommunityRightGuide : React.FC<CommunityRightGuideProps> = ( {dark, name, description, rules, links} ) => {
    return <>
       <div className="hidden lg:block w-[18vw] text-textNav max-h-[567px]">
          <PlaceholderProps dark={dark} className="h-full flex flex-col" size="max-h-[567px] min-h-[567px]">
            <div className={`overflow-y-auto max-h-[194px] ${dark ? "text-white" : "text-black "} border-solid border-b-[1px] border-sp-purpleBright2`}>
               <h1 className="font-bold">{name}</h1>
               <p>
                  {description}
               </p>
            </div>
            <p className="mt-2 text-[14px] font-bold">RULES</p>
            <div className="min-h-min flex-grow overflow-y-auto border-solid border-b-[1px] border-sp-purpleBright2">
               <div className="overflow-y-auto max-h-[194px]">
                  <ol>
                     {rules?.map((rule, index) => 
                        <div className="flex">
                           <div className="p-2">
                              <p className="font-bold">{index + 1}.</p>
                           </div>
                           <li><strong>{rule.split(':')[0]}:</strong> {rule.split(':')[1]}</li>
                        </div>
                     )}
                  </ol>
               </div>
            </div>
            <p className="mt-2 text-[14px] font-bold">OFFICIAL LINKS</p>
            <div className="flex-grow max-h-[120px] overflow-y-auto">
               <div className="overflow-y-auto max-h-fit flex flex-col">
                  <ol>
                     {links?.map((link, index) =>
                        <div className="flex">
                           <div className=" w-full min-h-fit my-1 text-white mx-3 bg-sp-purpleBright2 hover:bg-sp-accent hover:text-black  rounded-3xl justify-center items-center gap-2.5 inline-flex">
                              <button className="text-[16px] p-1 font-bold font-['Lato']">{link.split(":")[0]}</button>
                           </div> 
                        </div>
                     )}
                  </ol>
               </div>
            </div>
          </PlaceholderProps>
       </div>
    </>
}

export default CommunityRightGuide