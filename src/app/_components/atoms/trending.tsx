import * as React from "react";
import { useState } from "react";

const Trending = () => {
    const [rotationAngle, setRotationAngle] = useState(0);
    const [trending, setTrending] = useState(false);

    const handleClick = () => {
        if (!trending) {
            setRotationAngle(-180)
        } else {
            setRotationAngle(0)
        }
    };

    const handleAnimationEnd = () => {
        setTrending(!trending);
    };

    const svgStyle = {
        transform: `rotate(${rotationAngle}deg)`,
        transition: 'transform 0.2s linear',
    };

    return (
        <>
            <div className="flex flex-wrap justify-center items-center m-6">
                <button className="p-2" onClick={handleClick}>
                    <svg
                        style={svgStyle}
                        onTransitionEnd={handleAnimationEnd}
                        width="21"
                        height="14"
                        viewBox="0 0 21 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.54112 13.3064C10.2006 14.0744 11.2716 14.0744 11.931 13.3064L20.3722 3.47668C21.0316 2.70873 21.0316 1.46159 20.3722 0.693637C19.7127 -0.0743112 18.6417 -0.0743112 17.9823 0.693637L10.7334 9.13492L3.4846 0.69978C2.82513 -0.0681682 1.75416 -0.0681682 1.0947 0.69978C0.435232 1.46773 0.435232 2.71488 1.0947 3.48282L9.53584 13.3126L9.54112 13.3064Z" fill="#96429A"/>
                    </svg>
                </button>
                <h1 className="p-2 text-gray-900 text-[28px] font-bold">Em Alta</h1>
            </div>
        </>
    );
}

export default Trending;
