import BottomPage from "../../_components/organisms/bottompage"
import MainBanner from "../../_components/organisms/mainbanner"
import NavigationBar from "../../_components/organisms/navigationBar"

const HomePage = () => {
    return <>
        <main className="bg-sp-greyish text-white">
            <div className=" bg-indigo-50 font-['Lato']">
                <NavigationBar></NavigationBar>
                <MainBanner></MainBanner>
                <BottomPage></BottomPage>
            </div>
        </main>
    </>
}

export default HomePage