interface TagProps{
    text: string
    style?: string
}

const Tag: React.FC<TagProps> = ( {text, style} ) => {
    return <>
        <div className={ style != undefined ? style : `m-1 max-w-min text-white text-base font-bold font-['Lato'] bg-sp-purple px-2 py-1 rounded-full mr-1`}>
            {text}
        </div>
    </>
}

export default Tag