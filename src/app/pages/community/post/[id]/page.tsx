"use client"

import NavigationBar from "~/app/_components/organisms/navigationBar"
import Footer from "~/app/_components/atoms/footer"
import IconCommunity from "~/app/_components/assets/community.png"
import BarDotsBlack from "~/app/_components/atoms/barDotsBlack"
import Bandfoto from "~/app/_components/assets/bandfotohd.png"
import TextAreaComentario from "~/app/_components/atoms/textAreaComentario"
import Avaliacao from "~/app/_components/molecules/avaliacao"
import ComentariosPost from "~/app/_components/organisms/comentariosPost"
import Tag from "~/app/_components/atoms/tag"
import Trending from "~/app/_components/atoms/trending"

import { NextPage } from "next"
import { usePathname } from "next/navigation"
import RejectedPage from "~/app/_components/organisms/rejectedPage"
import LoadingPage from "~/app/_components/organisms/loadingPage"
import { api } from "~/trpc/react"

import Link from "next/link"
import { useState } from "react"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime);

const PostPage : NextPage  = () => {

    const [visible, setVisible] = useState<'visible' | 'hidden'>('visible')

    const pathname = usePathname();
    const id = pathname.split("/").pop();

    const { data, isLoading, error } = api.posts.getPostsByID.useQuery({
        postId : id ?? "",
    })

    if(isLoading){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <LoadingPage></LoadingPage>
        </div>
    }

    if(error){
        return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
                <RejectedPage></RejectedPage>
        </div>
    }

    const LinkCommunity = data.postData && data.postData[0]?.community_id;

    return <>
        <NavigationBar></NavigationBar>
        <div className=" text-black bg-gradient-to-b from-sp-tp-page to-bg-white pt-5 grid grid-cols-12 grid-rows-auto font-['Lato']">
            <div className="flex justify-around pb-5 row-start-1 row-end-2 col-start-3 col-span-8">
                <Link href={`/pages/community`} className="flex items-center py-2">
                    <svg
                        width="21"
                        height="14"
                        viewBox="0 0 21 14"
                        fill="#white"
                        xmlns="http://www.w3.org/2000/svg"
                        style={
                            {transform: "rotate(90deg)"}
                        }
                    >
                        <path d="M9.54112 13.3064C10.2006 14.0744 11.2716 14.0744 11.931 13.3064L20.3722 3.47668C21.0316 2.70873 21.0316 1.46159 20.3722 0.693637C19.7127 -0.0743112 18.6417 -0.0743112 17.9823 0.693637L10.7334 9.13492L3.4846 0.69978C2.82513 -0.0681682 1.75416 -0.0681682 1.0947 0.69978C0.435232 1.46773 0.435232 2.71488 1.0947 3.48282L9.53584 13.3126L9.54112 13.3064Z" fill="#6232DA"/>
                    </svg>
                    <p className="mx-1">Back to All Posts</p>
                </Link>
                <Link 
                href={`/pages/community/${LinkCommunity}`}
                className="flex items-center py-2">
                    <p className="mx-1">Go to Community</p>
                    <svg
                        width="21"
                        height="14"
                        viewBox="0 0 21 14"
                        fill="#white"
                        xmlns="http://www.w3.org/2000/svg"
                        style={
                            {transform: "rotate(270deg)"}
                        }
                    >
                        <path d="M9.54112 13.3064C10.2006 14.0744 11.2716 14.0744 11.931 13.3064L20.3722 3.47668C21.0316 2.70873 21.0316 1.46159 20.3722 0.693637C19.7127 -0.0743112 18.6417 -0.0743112 17.9823 0.693637L10.7334 9.13492L3.4846 0.69978C2.82513 -0.0681682 1.75416 -0.0681682 1.0947 0.69978C0.435232 1.46773 0.435232 2.71488 1.0947 3.48282L9.53584 13.3126L9.54112 13.3064Z" fill="#6232DA"/>
                    </svg>
                </Link>
            </div>
            <div className="pb-5 col-start-3 col-end-11 row-start-2 row-end-3 bg-white border border-sp-purpleBright2 rounded-[20px]"></div>
            { data.postData && data.postData[0] &&
                <div className="col-start-4 col-end-10 row-start-2 row-end-3">
                    <div className="mt-4 flex items-center justify-between">
                        <img className="w-10 h-10 rounded-full" src={IconCommunity.src} />
                        <div className="ml-3 mr-auto text-base font-semibold font-['Lato']">@{data.postData[0]?.community_id} posted by {data.postData[0]?.user_id} {dayjs(data.postData[0]?.created_at).fromNow()}</div>
                        <div className="self-center  text-center origin-center justify-self-center">
                            <BarDotsBlack></BarDotsBlack>
                        </div>
                    </div>
                    <div className="my-5">
                        <div>
                            <div className="text-3xl font-bold font-['Lato'] py-2">{data.postData[0]?.content}</div>
                            <div className="flex flex-wrap">
                                <Tag text="Informação"></Tag>
                                <Tag text="Informação"></Tag>
                            </div>
                            <div className="text-xl font-medium font-['Lato'] py-2">{data.postData[0]?.content_post}</div>
                        </div>
                        <div className="w-[100%] mt-3">
                            <img className="w-[100%] rounded-[20px]" src={Bandfoto.src} />
                        </div>
                        <Avaliacao></Avaliacao>
                        <TextAreaComentario></TextAreaComentario>
                        <div className="flex justify-center" style={{visibility: visible }}>
                            <Trending  topics={["Recent", "Trending", "Old", "Best"]}></Trending>
                        </div>
                        <ComentariosPost setVisible={setVisible} postID={data.postData[0].id}></ComentariosPost>
                    </div>
                </div>   
            }
        </div>
        <Footer></Footer>
    </>
}

export default PostPage
