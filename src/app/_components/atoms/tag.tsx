interface TagProps{
    text: string
    style?: string
    onClick?: any
    notclick?: boolean
}

const Tag: React.FC<TagProps> = ( {text, style, onClick, notclick} ) => {
    return <>
        {!notclick && (
            <div onClick={() => onClick(text)} className={` ${style != "" ? style : `max-w-min text-white text-base bg-sp-purple font-['Lato'] hover:bg-sp-accent hover:text-black transition-colors duration-200`}  px-2 py-1 rounded-full mr-1 whitespace-nowrap cursor-pointer`}>
                {text}
            </div>
        )}
        {!!notclick && (
            <div className={` ${style != "" ? style : `max-w-min text-white text-base bg-sp-purple font-['Lato']`}  px-2 py-1 rounded-full mr-1 whitespace-nowrap`}>
                {text}
            </div>
        )}
    </>
}

export default Tag