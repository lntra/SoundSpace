import { News } from "lib/definitions";

interface NewsAsProps {
    news : News[];
}

const HeaderNews: React.FC<NewsAsProps> = ({news}) => {
    return <>
        <div className="grid grid-cols-12">
            <span className="col-span-2"></span>
            <div className="col-span-8">
                <div className="col w-[100%] pb-3 mt-6 text-gray-900 text-5xl font-bold font-['Lato']">{news[0]?.title}</div>
                <div className="w-[100%] text-gray-900 pb-1 text-2xl font-medium font-['Lato']">{news[0]?.content}</div>
                <div className="w-[100%] border-solid pb-3 border-b-[5px] border-sp-purpleBright"><span className="text-gray-900 text-base font-normal font-['Lato']">12/11/2023 10h20 - Por </span><span className="text-gray-900 text-base font-bold font-['Lato']">Portal Músical</span></div>
            </div>
            <span className="col-span-2"></span>
        </div>
    </>
}

export default HeaderNews