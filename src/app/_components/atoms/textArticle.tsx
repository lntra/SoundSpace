import { News } from "~/lib/definitions";
import React from "react";

interface NewsAsProps {
    news : News[];
}

const TextArticle: React.FC<NewsAsProps> = ({ news }) => {
    
    return (
        <div className="grid grid-cols-12 pt-[18px] mb-24">
            {news.map((e, index) => (
                <React.Fragment key={e.id}>
                    {e.pagecontent.split("\n\n").map((paragraph, idx) => (
                        <>
                            <span key={idx} className="col-span-2"></span>
                                <div key={idx} className="col-span-8 mb-3">
                                    <p className=" text-lg sm:text-[20px] font-['Lato'] text-left">
                                        {paragraph}
                                    </p>
                                </div>
                            <span className="col-span-2"></span>
                        </>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}

export default TextArticle