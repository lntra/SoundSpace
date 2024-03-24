import Comments from "../atoms/comments"

const ComentariosPost = () => {
    return <>
        <div className="w-[100%] flex flex-wrap justify-end">
            <Comments></Comments>
            <Comments></Comments>
            <div className="w-[90%]">
                <Comments></Comments>
            </div>
            <div className="w-[80%]">
                <Comments></Comments>
                <Comments></Comments>
            </div>
            <Comments></Comments>
        </div>
    </>
}

export default ComentariosPost