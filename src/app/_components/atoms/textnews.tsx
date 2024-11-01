interface TagsnewsProps {
    title : string,
    content : string,
    dark : boolean
}

const TextNews: React.FC<TagsnewsProps> = ( { title, content, dark }) => {
    return <>
        <div className="flex flex-wrap break-words">
            <div className={`${dark ? "text-white" : "text-black"} text-xl sm:text-2xl font-bold font-['Lato'] mb-2 grow w-[100%]`}>{title}</div>
            <div className={`${dark ? "text-white" : "text-black"} line-clamp-3 sm:line-clamp-none text-base sm:text-lg font-normal font-['Lato'] grow w-[100%]`}>{content}</div>
        </div>
    </>
}

export default TextNews