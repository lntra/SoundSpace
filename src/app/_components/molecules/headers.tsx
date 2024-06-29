import {News} from '../../../../lib/definitions';

interface NewsAsProps {
    news : News[];
}

const Headers: React.FC<NewsAsProps> = ( {news} ) => {
    return (
        <div brightness-100 className="h-[100%] px-4 pb-2 flex flex-wrap justify-center content-end items-end drop-shadow-2xl font-['Lato']">
            <h1 className="text-[32px] font-bold" >{news[0]?.title}</h1>
            <p className="text-base">{news[0]?.content}</p>
        </div>
    );
}

export default Headers