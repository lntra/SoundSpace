import FollowButton from "../molecules/follow";

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});

interface CommunityBannerProps {
  background?: string;
  icon?: string;
  name?: string;
  followings?: number;
  isFollowed: boolean;
  handleFollow: () => void;
  handleUnfollow: () => void;
  dark: boolean;
}

const CommunityBanner: React.FC<CommunityBannerProps> = ({
  handleFollow,
  handleUnfollow,
  isFollowed,
  followings,
  background,
  icon,
  name,
  dark,
}) => {
  return (
    <>
      <div
        className={`grid-rows-7 mb-1 grid h-[295px] grid-cols-12 gap-1 sm:h-[295px]  ${
          dark ? "bg-gray-950 text-white" : "bg-white text-black"
        }`}
      >
        <div className="col-start-1 col-end-13 row-start-1 row-end-5 h-[200px] sm:row-start-1 sm:row-end-5">
          <div className="h-[100%] max-h-[200px] w-[100%] bg-sp-purple">
            <img
              className=" max-h-[200px] w-full object-cover opacity-25"
              src={background}
              alt={name}
            />
          </div>
        </div>
        <div className="col-start-1 col-end-13 row-start-3 row-end-6 grid auto-rows-min grid-cols-[auto_1fr] gap-2 sm:col-start-2 sm:col-end-12 sm:row-start-4 sm:row-end-6 3xl:col-start-2 3xl:col-end-11">
          <div className="z-10 col-start-1 col-end-1 row-start-1 row-end-4 justify-self-center pl-4 sm:pl-0">
            <img
              className="border-slate-20 h-28 w-28 rounded-full border-[4px] border-indigo-50 object-cover sm:h-32 sm:w-32 sm:min-w-[128px]"
              src={icon}
            />
          </div>
          <div className="col-start-1 col-end-12 row-start-5 row-end-6 grid grid-cols-3 grid-rows-2 pl-4 sm:col-start-2 sm:col-end-2 sm:row-start-2 sm:row-end-4 sm:pl-0">
            <div className="col-start-1 col-end-4 row-start-1 row-end-1 self-end">
              <div
                className={`${
                  dark ? "text-white" : "text-black"
                }  lato-font text-2xl font-bold sm:text-[28px]`}
              >
                {name}
              </div>
            </div>
            <div className="col-start-1 col-end-5 row-start-2 flex ">
              <div
                className={`h-[34px] w-28 ${
                  dark ? "text-white" : "text-white"
                }`}
              >
                <FollowButton
                  dark={true}
                  followState={isFollowed}
                  handleFollow={handleFollow}
                  handleUnfollow={handleUnfollow}
                ></FollowButton>
              </div>
              <div
                className={`ml-2 flex h-[34px] ${
                  dark ? "text-white" : "text-sp-purple"
                }`}
              >
                <div className=" w-[100%] self-center whitespace-nowrap lato-font text-base font-bold">
                  {followings ? followings : 0} members
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityBanner;
