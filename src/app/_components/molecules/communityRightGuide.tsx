import PlaceholderProps from "./placeholderProps";

interface CommunityRightGuideProps {
  name?: string;
  description?: string;
  rules?: string[];
  links?: string[];
  dark: boolean;
}

const CommunityRightGuide: React.FC<CommunityRightGuideProps> = ({
  dark,
  name,
  description,
  rules,
  links,
}) => {
  return (
    <>
      <div className="hidden max-h-[567px] w-[18vw] text-textNav lg:block">
        <PlaceholderProps
          dark={dark}
          className="flex h-full flex-col"
          size="max-h-[567px] min-h-[567px]"
        >
          <div
            className={`max-h-[194px] overflow-y-auto ${
              dark ? "text-white" : "text-black "
            } border-b-[1px] border-solid border-sp-purpleBright2`}
          >
            <h1 className="font-bold">{name}</h1>
            <p>{description}</p>
          </div>
          <p className="mt-2 text-[14px] font-bold">RULES</p>
          <div className="min-h-min flex-grow overflow-y-auto border-b-[1px] border-solid border-sp-purpleBright2">
            <div className="max-h-[194px] overflow-y-auto">
              <ol>
                {rules?.map((rule, index) => (
                  <div key={index} className="flex">
                    <div className="p-2">
                      <p className="font-bold">{index + 1}.</p>
                    </div>
                    <li>
                      <strong>{rule.split(":")[0]}:</strong>{" "}
                      {rule.split(":")[1]}
                    </li>
                  </div>
                ))}
              </ol>
            </div>
          </div>
          <p className="mt-2 text-[14px] font-bold">OFFICIAL LINKS</p>
          <div className="max-h-[120px] flex-grow overflow-y-auto">
            <div className="flex max-h-fit flex-col overflow-y-auto">
              <ol>
                {links?.map((link, index) => (
                  <div key={index} className="flex">
                    <div className=" mx-3 my-1 inline-flex min-h-fit w-full items-center justify-center gap-2.5  rounded-3xl bg-sp-purpleBright2 text-white hover:bg-sp-accent hover:text-black">
                      <button className="p-1 lato-font text-[16px] font-bold">
                        {link.split(":")[0]}
                      </button>
                    </div>
                  </div>
                ))}
              </ol>
            </div>
          </div>
        </PlaceholderProps>
      </div>
    </>
  );
};

export default CommunityRightGuide;
