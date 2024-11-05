interface FollowButtonProps {
  followState: boolean;
  handleFollow: () => void;
  handleUnfollow: () => void;
  dark?: boolean;
}

const FollowButton = ({
  dark,
  followState,
  handleFollow,
  handleUnfollow,
}: FollowButtonProps) => {
  return (
    <>
      {!dark && (
        <>
          {!followState && (
            <button
              onClick={handleFollow}
              className="mx-2.5 flex w-[100%] items-center justify-center rounded-[25px] border-[3px] border-solid border-sp-purpleBright2 px-5 py-2.5 text-center hover:border-sp-accent hover:bg-sp-accent hover:outline-offset-8 hover:transition"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 36 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18.5L13.35 20.6H13.5V20.45L24.15 12.5L22.5 14.3L13.2 24.2L13.5 29L17.85 24.2L21 30.5L30 6.5L6 18.5Z"
                  fill="white"
                />
              </svg>
              <p className=" text-base font-bold">Follow</p>
            </button>
          )}
          {!!followState && (
            <button
              onClick={handleUnfollow}
              className="mx-2.5 flex w-[100%] items-center justify-center rounded-[25px] border-[3px] border-solid border-sp-purpleBright2 px-5 py-2.5 text-center hover:border-sp-accent hover:bg-sp-accent hover:outline-offset-8 hover:transition"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 36 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18.5L13.35 20.6H13.5V20.45L24.15 12.5L22.5 14.3L13.2 24.2L13.5 29L17.85 24.2L21 30.5L30 6.5L6 18.5Z"
                  fill="white"
                />
              </svg>
              <p className=" text-base font-bold">Unfollow</p>
            </button>
          )}
        </>
      )}
      {!!dark && (
        <>
          {!followState && (
            <button
              onClick={handleFollow}
              className="flex h-[34px] w-[100%] items-center justify-center rounded-[25px] bg-sp-purpleBright2 px-5 py-2.5 text-center hover:bg-sp-accent hover:text-black  hover:transition"
            >
              <p className=" text-base font-bold">Follow</p>
            </button>
          )}
          {!!followState && (
            <button
              onClick={handleUnfollow}
              className="flex h-[34px] w-[100%] items-center justify-center rounded-[25px] bg-sp-purpleBright2 px-5 py-2.5 text-center hover:bg-sp-accent hover:text-black hover:transition"
            >
              <p className=" text-base font-bold">Unfollow</p>
            </button>
          )}
        </>
      )}
    </>
  );
};

export default FollowButton;
