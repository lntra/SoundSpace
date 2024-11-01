interface TagsnewsProps {
  title: string;
  content: string;
  dark: boolean;
}

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});


const TextNews: React.FC<TagsnewsProps> = ({ title, content, dark }) => {
  return (
    <>
      <div className="flex flex-wrap break-words">
        <div
          className={`${
            dark ? "text-white" : "text-black"
          } mb-2 w-[100%] grow lato-font text-xl font-bold sm:text-2xl`}
        >
          {title}
        </div>
        <div
          className={`${
            dark ? "text-white" : "text-black"
          } line-clamp-3 w-[100%] grow lato-font text-base font-normal sm:line-clamp-none sm:text-lg`}
        >
          {content}
        </div>
      </div>
    </>
  );
};

export default TextNews;
