import BottomPage from "../../_components/organisms/bottompage"
import MainBanner from "../../_components/organisms/mainbanner"
import NavigationBar from "../../_components/organisms/navigationBar"

import { api } from "~/trpc/server";

export default async function HomePage() {
    const latestNews = await api.home.getNews.query({current : 0});
  
    const headerNews = latestNews.newsArticles.slice(0, 3);

    const downNews = latestNews.newsArticles.slice(3);

    return <>
        <main className="bg-sp-greyish text-white">
            <div className=" bg-indigo-50 font-['Lato']">
                <NavigationBar></NavigationBar>
                <MainBanner news={headerNews}></MainBanner>
                <BottomPage></BottomPage>
            </div>
        </main>
    </>
}

async function HomeShowcase() {
    const latestNews = await api.home.getNews.query({current : 0});
  
    const headerNews = latestNews.newsArticles.slice(0, 3);
    const downNews = latestNews.newsArticles.slice(3);

    return (
      <div>
        <ul>
          {latestNews.newsArticles?.map((e) => (
            <li key={e.id}>
              <h2>{e.title}</h2>
              <p>{e.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

