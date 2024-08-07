const NavLeftGuide = () =>{
    return <>
        <div className="flex-col text-textNav font-bold gap-4 border-solid border-b-[1px] border-sp-purpleBright2">
            <button className="flex items-center m-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5.4L10 6.7V5H8V8L4 10.6L4.6 11.4L12 6.6L19.4 11.4L20 10.6L12 5.4Z" fill="#555777"/>
                    <path d="M12 8L6 12V19H11V16H13V19H18V12L12 8Z" fill="#555777"/>
                </svg>
                <p>Home</p>
            </button>
            <button className="flex items-center m-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6H16L17.29 7.29L13 11.59L10 8.59L4 14.59V17.41L10 11.41L13 14.41L18.71 8.71L19.99 10L20 6Z" fill="#555777"/>
                </svg>
                <p>Trending</p>
            </button>
            <button className="flex items-center m-2">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 7V16.4C9.6 16.2 9.1 16 8.5 16C7.1 16 6 16.9 6 18C6 19.1 7.1 20 8.5 20C9.9 20 11 19.1 11 18V10.7L18 8.4V13.5C17.6 13.2 17.1 13 16.5 13C15.1 13 14 13.9 14 15C14 16.1 15.1 17 16.5 17C17.9 17 19 16.1 19 15V4L10 7Z" fill="#555777"/>
                </svg>
                <p>All</p>
            </button>
        </div>
    </>
}

export default NavLeftGuide