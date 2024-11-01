interface TagsnewsProps {
  title: string;
  content: string;
  dark: boolean;
}

const TextNews: React.FC<TagsnewsProps> = ({ title, content, dark }) => {
  return (
    <>
      <div className="flex flex-wrap break-words">
        <div
          className={`${
            dark ? "text-white" : "text-black"
          } mb-2 w-[100%] grow font-['Lato'] text-xl font-bold sm:text-2xl`}
        >
          {title}
        </div>
        <div
          className={`${
            dark ? "text-white" : "text-black"
          } line-clamp-3 w-[100%] grow font-['Lato'] text-base font-normal sm:line-clamp-none sm:text-lg`}
        >
          {content}
        </div>
      </div>
    </>
  );
};

export default TextNews;
