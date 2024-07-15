import { ReactNode } from "react";

interface PlaceholderPropsProps {
    title?: string;
    children?: React.ReactNode;
}

const PlaceholderProps = ({ title, children, ...props }: PlaceholderPropsProps) => {
    return (
        <div className="min-h-full p-3 bg-indigo-50 rounded-[20px] border-[1px] border-sp-purpleBright2 flex flex-col items-start justify-between" {...props}>
            {title && (
                <div className="flex-col justify-around align-middle text-gray-900 text-[24px] w-[100%] font-bold font-Lato border-solid border-b-[1px] border-sp-purpleBright2">
                    {title}
                </div>
            )}
                
            <div className="flex-col justify-center align-middle items-center w-full">
                {children}
            </div>
        </div>
    );
}

export default PlaceholderProps;