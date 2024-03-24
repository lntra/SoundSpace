const TextAreaComentario = () => {
    return <>
        <div className="flex flex-wrap">
            <div className="w-[100%] text-slate-600 text-base font-bold font-['Lato']">Comentários:</div>
            <textarea className="w-[100%] resize-y h-10 p-2.5 rounded-[20px] border border-slate-600 justify-start items-center gap-2.5 inline-flex">
                <div className="text-slate-600 text-opacity-75 text-base font-bold font-['Lato']"></div>
            </textarea>
        </div>
    </>
}

export default TextAreaComentario