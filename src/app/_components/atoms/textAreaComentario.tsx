"use client"

import { useState } from 'react';
import Button from './button';

const TextAreaComentario = () => {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (event : any) => {
        setText(event.target.value);
        event.target.style.height = 'auto'; // Reset the height
        event.target.style.height = `${event.target.scrollHeight}px`; // Set it to the scroll height
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleCancel = (event: any) => {
        setIsFocused(false);
        setText("");
        event.target.style.height = '48px'
    }

    const handleSubmit = () => {
        console.log("Message sent:", text);
        setText(""); 
    };

    return (
        <>
            <div 
                onFocus={handleFocus}
                className="my-2 flex flex-wrap  rounded-[20px] border border-sp-purpleBright2">
                <textarea
                    rows={3}
                    placeholder="Comente"
                    value={text}
                    onChange={handleChange}
                    style={{ height: '48px' }}
                    className="w-full outline-none resize-none bg-indigo-50 min-h-[48px] h-auto max-h-full p-3 focus:text-black focus:font-normal rounded-[20px] text-slate-600 text-opacity-75 text-base font-bold font-['Lato']"
                >
                    <div className="text-slate-600 text-opacity-75 text-base font-bold font-['Lato']"></div>
                </textarea>
                {isFocused && (
                    <div className="flex w-full justify-end align-bottom mt-2 p-4">
                        <button
                            onClick={handleSubmit}
                            className="bg-sp-purpleBright2 text-white py-1 px-3 mr-2 h-min w-min buttonAdjust:py-2.5 lg:px-1 xl:px-3  min-h-fit self-center rounded-3xl justify-center items-center inline-flex"
                        >
                            Send
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-sp-purpleBright2 text-white py-1 px-3 h-min w-min buttonAdjust:py-2.5 lg:px-1 xl:px-3  min-h-fit self-center rounded-3xl justify-center items-center inline-flex"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default TextAreaComentario;
