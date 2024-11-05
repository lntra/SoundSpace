interface TagProps {
  text: string;
  style?: string;
  onClick?: any;
  notclick?: boolean;
}

import { Lato } from '@next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ["100","300","400","700","900"]
});


const Tag: React.FC<TagProps> = ({ text, style, onClick, notclick }) => {
  return (
    <>
      {!notclick && (
        <div
          onClick={() => onClick(text)}
          className={` ${
            style != ""
              ? style
              : `max-w-min bg-sp-purple lato-font text-base text-white transition-colors duration-200 hover:bg-sp-accent hover:text-black`
          }  mr-1 cursor-pointer whitespace-nowrap rounded-full px-2 py-1`}
        >
          {text}
        </div>
      )}
      {!!notclick && (
        <div
          className={` ${
            style != ""
              ? style
              : `max-w-min bg-sp-purple lato-font text-base text-white`
          }  mr-1 whitespace-nowrap rounded-full px-2 py-1`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Tag;
