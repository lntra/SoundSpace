import { ReactNode } from "react";

interface PlaceholderPropsProps {
    title?: string;
    children?: React.ReactNode;
    className?: string;
    size?: string;
}

const PlaceholderProps = ({ title, children, className, size, ...props }: PlaceholderPropsProps) => {
    
    let defaultSizeStyle = "min-h-full"

    if (size != null){
        defaultSizeStyle = size
    }
    
    return (
        <div className={`${defaultSizeStyle} p-3 bg-indigo-50 rounded-[20px] border-[1px] border-sp-purpleBright2 ${className}`} {...props}>
            {title && (
                <div className="flex-col p-3 justify-around align-middle text-gray-900 text-[24px] w-[100%] font-bold font-Lato border-solid border-b-[1px] border-sp-purpleBright2">
                    {title}
                </div>
            )}
            <div className={className}>
                {children}
            </div>
        </div>
    );
}

export default PlaceholderProps;
