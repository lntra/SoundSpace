interface FollowButtonProps {
    followState : boolean;
    handleFollow: () => void;
    handleUnfollow: () => void;
    dark?: boolean;
}

const FollowButton = ( {dark, followState, handleFollow, handleUnfollow} : FollowButtonProps ) =>{
    return <>
        {!dark && (
            <>
            {!followState && (
                <button onClick={handleFollow} className="py-2.5 px-5 mx-2.5 w-[100%] flex items-center justify-center text-center border-solid border-[3px] rounded-[25px] border-sp-purpleBright2 hover:bg-sp-accent hover:border-sp-accent hover:outline-offset-8 hover:transition">
                    <svg width="24" height="24" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18.5L13.35 20.6H13.5V20.45L24.15 12.5L22.5 14.3L13.2 24.2L13.5 29L17.85 24.2L21 30.5L30 6.5L6 18.5Z" fill="white"/>
                    </svg>
                    <p className=" text-base font-bold">Follow</p>
                </button>
            )}
            {!!followState && (
                <button onClick={handleUnfollow} className="py-2.5 px-5 mx-2.5 w-[100%] flex items-center justify-center text-center border-solid border-[3px] rounded-[25px] border-sp-purpleBright2 hover:bg-sp-accent hover:border-sp-accent hover:outline-offset-8 hover:transition">
                    <svg width="24" height="24" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18.5L13.35 20.6H13.5V20.45L24.15 12.5L22.5 14.3L13.2 24.2L13.5 29L17.85 24.2L21 30.5L30 6.5L6 18.5Z" fill="white"/>
                    </svg>
                    <p className=" text-base font-bold">Unfollow</p>
                </button>
            )}
            </>
        )}
        {!!dark && (
        <>
            {!followState && (
                <button onClick={handleFollow} className="py-2.5 h-[34px] px-5 w-[100%] flex items-center bg-sp-purpleBright2 justify-center text-center rounded-[25px] hover:bg-sp-accent hover:text-black  hover:transition">
                    <p className=" text-base font-bold">Follow</p>
                </button>
            )}
            {!!followState && (
                <button onClick={handleUnfollow} className="py-2.5 h-[34px] px-5 w-[100%] flex items-center bg-sp-purpleBright2 justify-center text-center rounded-[25px] hover:bg-sp-accent hover:transition hover:text-black">
                    <p className=" text-base font-bold">Unfollow</p>
                </button>
            )}
        </>
        )}
    </>
}

export default FollowButton