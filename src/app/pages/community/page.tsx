import CommunityBanner from "../../_components/atoms/banner"
import Footer from "../../_components/atoms/footer"
import CommunityPostsSection from "../../_components/organisms/communityPosts"
import NavigationBar from "../../_components/organisms/navigationBar"

const CommunityPage = () => {
    return <>
        <main className="text-white">
            <div className="font-['Lato']">
                <NavigationBar></NavigationBar>
                <div className="bg-gradient-to-b from-sp-tp-page to-indigo-50">
                    <CommunityBanner></CommunityBanner>
                    <CommunityPostsSection></CommunityPostsSection>
                    <Footer></Footer>
                </div>
            </div>
        </main>
    </>
}

export default CommunityPage