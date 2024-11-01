import { type News } from "~/lib/definitions";
import React from "react";

interface NewsAsProps {
  news: News[];
}

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});


const TextArticle: React.FC<NewsAsProps> = ({ news }) => {
  return (
    <div className="mb-24 grid grid-cols-12 pt-[18px]">
      {news.map((e, index) => (
        <React.Fragment key={e.id}>
          {e.pagecontent.split("\n\n").map((paragraph, idx) => (
            <>
              <span key={idx} className="col-span-2"></span>
              <div key={idx} className="col-span-8 mb-3">
                <p className=" text-left lato-font text-lg sm:text-[20px]">
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
};

export default TextArticle;
