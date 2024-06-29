import NavigationBar from "../../_components/organisms/navigationBar"

import NewsArea from "~/app/_components/organisms/newsArea";

export default async function HomePage() {

    return <>
        <main className="bg-sp-greyish text-white">
            <div className=" bg-indigo-50 font-['Lato']">
                <NavigationBar></NavigationBar>
                <NewsArea></NewsArea>
            </div>
        </main>
    </>
}


