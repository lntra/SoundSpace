interface ButtonProps {
  text?: string;
}

const Button = ({ text, ...props }: ButtonProps) => {
  return (
    <>
      <div className="inline-flex h-min min-h-fit w-[100%] items-center justify-center  self-center rounded-3xl bg-sp-purpleBright2 hover:bg-sp-accent buttonAdjust:py-2.5 lg:px-1 xl:px-3">
        <button className="p-1 font-['Lato'] text-[16px] font-bold text-white transition-colors duration-200 hover:text-black">
          {text}
        </button>
      </div>
    </>
  );
};

export default Button;
