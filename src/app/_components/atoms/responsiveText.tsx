import { useEffect, useState } from "react";

interface ResponsiveTextProps {
    text: string;
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({ text }) => {
    const [size, setSize] = useState('overflow-hidden text-wrap line-clamp-3');

    useEffect(() => {
        const updateSize = () => {
            if(window.innerWidth < 640) // sm
            {
                setSize('text-wrap	line-clamp-1');
            }
            else if(window.innerWidth < 768) // md
            {
                setSize('overflow-hidden text-wrap line-clamp-1');
            }
            else if(window.innerWidth < 1024) // lg
            {
                setSize('overflow-hidden text-wrap	line-clamp-2');
            }
            else if(window.innerWidth < 1280) // xl
            {
                setSize('overflow-hidden text-wrap	line-clamp-2');
            }
            else if(window.innerWidth < 1600) // custom
            {
                setSize('overflow-hidden text-wrap	line-clamp-2');
            }
            else{
                setSize('overflow-hidden text-wrap line-clamp-2');
            }
        };

        updateSize();

        window.addEventListener('resize', updateSize);

        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

    return <p className={size}>{text}</p>
};

export default ResponsiveText