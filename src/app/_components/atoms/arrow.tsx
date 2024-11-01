"use client";

import { useState } from "react";

interface ArrowProps {
  directions: string;
}

const Arrow = ({ directions }: ArrowProps) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 150);
  };

  let side = false;

  if (directions == "left") {
    side = true;
  }

  const svgStyle = {
    transform: side ? "rotate(90deg)" : "rotate(270deg)",
  };

  const baseStyle = {
    margin: "0.75rem",
    paddingLeft: side ? "11px" : "14px",
    paddingRight: side ? "9px" : "8px",
    paddingTop: "12px",
    paddingBottom: "12px",
    border: "1px solid #6232DA",
    borderRadius: "50%",
    transition: "background-color 0.1s, color 0.1s",
    backgroundColor: clicked ? "#6232DA" : "transparent",
  };

  return (
    <>
      <button className="h-12 w-12" style={baseStyle} onClick={handleClick}>
        <svg
          style={svgStyle}
          width="21"
          height="14"
          viewBox="0 0 21 14"
          fill={clicked ? "white" : "#white"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.54112 13.3064C10.2006 14.0744 11.2716 14.0744 11.931 13.3064L20.3722 3.47668C21.0316 2.70873 21.0316 1.46159 20.3722 0.693637C19.7127 -0.0743112 18.6417 -0.0743112 17.9823 0.693637L10.7334 9.13492L3.4846 0.69978C2.82513 -0.0681682 1.75416 -0.0681682 1.0947 0.69978C0.435232 1.46773 0.435232 2.71488 1.0947 3.48282L9.53584 13.3126L9.54112 13.3064Z"
            fill="#53337B"
          />
        </svg>
      </button>
    </>
  );
};

export default Arrow;
