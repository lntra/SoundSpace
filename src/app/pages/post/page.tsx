import NavigationBar from "../../_components/organisms/navigationBar"
import Footer from "../../_components/atoms/footer"
import IconCommunity from "../../_components/assets/community.png"
import BarDotsBlack from "../../_components/atoms/barDotsBlack"
import Bandfoto from "../../_components/assets/bandfotohd.png"
import TextAreaComentario from "../../_components/atoms/textAreaComentario"
import Avaliacao from "../../_components/molecules/avaliacao"
import ComentariosPost from "../../_components/organisms/comentariosPost"

const PostPage = () => {
    return <>
        <NavigationBar></NavigationBar>
        <div className=" text-black bg-gradient-to-b from-sp-tp-page to-bg-indigo-50 pt-5 grid grid-cols-12 grid-rows-auto font-['Lato']">
            <div className="pb-5 col-start-3 col-end-11 row-start-1 row-end-1 bg-indigo-50 border border-fuchsia-700 rounded-[20px]"></div>
            <div className="col-start-4 col-end-10 row-start-1 row-end-1">
                <div className="mt-4 flex items-center justify-between">
                    <img className="w-10 h-10 rounded-full" src={IconCommunity.src} />
                    <div className="ml-3 mr-auto text-base font-semibold font-['Lato']">@TheBandFromOuterSpace posted by user2022 há 2 horas atrás</div>
                    <div className="self-center  text-center origin-center justify-self-center">
                        <BarDotsBlack></BarDotsBlack>
                    </div>
                </div>
                <div className="my-5">
                    <div>
                        <div className="text-3xl font-bold font-['Lato']">Show de TBOS em Belo Horizonte, Minas Gerais, causa grande comoção do povo com a sua última despedida.</div>
                        <div className="my-3 max-w-min text-white text-base font-bold font-['Lato'] bg-sp-purple px-2 py-1 rounded-full mr-1">Informação</div>
                        <div className="text-xl font-medium font-['Lato']">Incrível experiência no show do TBOS em Belo Horizonte! 😍 A energia estava incrível e a despedida deles foi emocionante. Nunca vou esquecer esse momento épico. 👏🎶 #TBOS #ShowInesquecível #DespedidaEmocionante</div>
                    </div>
                    <div className="w-[100%] mt-3">
                        <img className="w-[100%] rounded-[20px]" src={Bandfoto.src} />
                    </div>
                    <Avaliacao></Avaliacao>
                    <TextAreaComentario></TextAreaComentario>
                    <ComentariosPost></ComentariosPost>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>
}

export default PostPage
