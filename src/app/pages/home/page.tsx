import NavigationBar from "../../_components/organisms/navigationBar"

import NewsArea from "~/app/_components/organisms/newsArea";

export default function HomePage() {

    return <>
        <main className="bg-sp-greyish text-white">
            <div className=" bg-white font-['Lato']">
                <NavigationBar></NavigationBar>
                <NewsArea></NewsArea>
            </div>
        </main>
    </>
}


