interface ButtonProps {
    text?: string;
}

const Button = ({text , ...props}: ButtonProps) => {
    return <>
        <div className="h-min w-[100%] hover:bg-sp-accent buttonAdjust:py-2.5 lg:px-1 xl:px-3  min-h-fit self-center bg-sp-purpleBright2 rounded-3xl justify-center items-center inline-flex">
                <button className="text-white hover:text-black transition-colors duration-200 text-[16px] p-1 font-bold font-['Lato']">{text}</button>
        </div>  
    </>
}

export default Button