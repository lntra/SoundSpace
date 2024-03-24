import Base from "~/app/_components/organisms/base"
import CommunityBanner from "../../_components/atoms/banner"
import Footer from "../../_components/atoms/footer"
import CommunityPostsSection from "../../_components/organisms/communityPosts"
import NavigationBar from "../../_components/organisms/navigationBar"

const CommunityPage = () => {
    return <>
        <main className="bg-sp-greyish text-white">
            <div className=" bg-indigo-50 font-['Lato']">
                <NavigationBar></NavigationBar>
                <CommunityBanner></CommunityBanner>
                <CommunityPostsSection></CommunityPostsSection>
                <Footer></Footer>
            </div>
        </main>
    </>
}

export default CommunityPage