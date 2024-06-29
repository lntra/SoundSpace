import { News } from '../../../../lib/definitions';

interface NewsAsProps {
    news: News[];
}

const Headers2: React.FC<NewsAsProps> = ({ news }) => {
    if (!news.length) {
        return null;
    }

    const title = news[0]?.title;

    console.log(title)
    
    return <>
        <div className=" drop-shadow-2xl px-4 pb-2 self-end font-['Lato'] bg-placeholder">
            <h1 className="text-[24px] font-bold" >
                {title}
            </h1>
        </div>
    </>
}

export default Headers2
