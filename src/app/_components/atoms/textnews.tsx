interface TagsnewsProps {
    title : string,
    content : string,
}

const TextNews: React.FC<TagsnewsProps> = ( { title, content }) => {
    return <>
        <div className="flex flex-wrap break-words">
            <div className=" text-gray-900 text-2xl font-bold font-['Lato'] mb-2 grow w-[100%]">{title}</div>
            <div className=" text-gray-900 text-lg font-normal font-['Lato'] grow w-[100%]">{content}</div>
        </div>
    </>
}

export default TextNews