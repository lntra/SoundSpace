"use client"

import { useEffect, useState } from "react"
import Button from "../atoms/button"
import ResponsiveText from "../atoms/responsiveText"
import TextAreaComentario from "../atoms/textAreaComentario"
import PlaceholderProps from "./placeholderProps"
import UserPost from "./UserPost"
import Tag from "../atoms/tag"
import Tagsnews from "../atoms/tagsnews"

interface HighlightsNavProps {
    type?: string;
    tags: string;
    tagsState: ( tagText : string ) => void;
    dark : boolean;
}

const HighlightsNav: React.FC<HighlightsNavProps> = ( {type, tags , tagsState, dark} ) =>{

    const [text, setText] = useState("");

    const [selectedTags, setSelectedTags] = useState("");

    const styleTag = "bg-sp-accent text-black"

    const handleClick = ( tagText : any ) => {
        let updatedTags: string;
        if (selectedTags == (tagText)) {
            updatedTags = "";
        } else {
            updatedTags = tagText;
        }
        setSelectedTags(updatedTags);
        tagsState(updatedTags);
    }

    useEffect(() => {
        if(selectedTags !== "" && selectedTags !== tags){
            setSelectedTags(tags)
        }
    }, [tags]);

    const handleChange = (event : any) => {
        setText(event.target.value);
    };

    const genreTags = ["Rock", "Pop", "Jazz", "Hip-Hop", "Classical", "EDM", "Country", "Blues", "Reggae", "Metal", "Indie", "Acoustic"];
    const moodTags = ["Chill", "Energetic", "Sad", "Happy", "Romantic", "Nostalgic", "Upbeat", "Relaxing"];
    const discussionTags = ["Song Analysis", "Favorite Lyrics", "Music Theory", "New Releases", "Music Trends", "Artist Spotlight", "Album Review", "Concert Experiences","Recommendations"];

    const filteredGenreTags = (genreTags.filter(tag => tag.toLowerCase().includes(text.toLowerCase()))).sort();
    const filteredMoodTags = (moodTags.filter(tag => tag.toLowerCase().includes(text.toLowerCase()))).sort();
    const filteredDiscussionTags = (discussionTags.filter(tag => tag.toLowerCase().includes(text.toLowerCase()))).sort();

return<>
        <PlaceholderProps 
            dark={dark}
            className={`flex flex-col ${type == "home" ? "" : "drop-shadow-lg"} flex-grow items-center  h-full  justify-between w-full`}>
                <div className={`flex-grow overflow-y-auto w-full p-3`}>
                    <div className="w-full">
                        <div className="flex items-center my-2">   
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 5H11.5L18.5 12L13.2 17.2L14 18L20 12L13 5Z" fill="#555777"/>
                                <path d="M10 5H4V11L11 18L17 12L10 5ZM6.8 9C6.1 9 5.5 8.4 5.5 7.8C5.5 7.2 6.1 6.6 6.7 6.6C7.3 6.6 8 7.1 8 7.8C8 8.5 7.4 9 6.8 9Z" fill="#555777"/>
                            </svg>
                            <h1 className="font-bold">TAGS</h1>
                        </div>
                        <div className={`my-2 w-full flex flex-row flex-nowrap rounded-[20px] border border-sp-purpleBright2`}>
                            <textarea
                                placeholder="Search"
                                value={text}
                                onChange={handleChange}
                                className={`w-[80%] max-h-12 overflow-y-hidden outline-none resize-none ${dark ? " bg-gray-950" : " bg-white"} min-h-[48px] p-3 focus:text-black focus:font-normal rounded-[20px] text-slate-600 text-opacity-75 text-base font-bold font-['Lato']`}
                            ></textarea>
                            <div className="h-[48px] flex justify-center items-center">
                                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M39.4 36.6L31 28.2C30.6 27.8 30 27.6 29.4 27.6C31 25.6 32 22.8 32 20C32 13.4 26.6 8 20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C22.8 32 25.6 31 27.6 29.2C27.6 29.8 27.6 30.4 28.2 30.8L36.6 39.2C37 39.6 37.6 39.8 38 39.8C38.4 39.8 39 39.6 39.4 39.2C40.2 38.6 40.2 37.4 39.4 36.6ZM20 29C15 29 11 25 11 20C11 15 15 11 20 11C25 11 29 15 29 20C29 25 25 29 20 29Z" fill="#53337B"/>
                                </svg>
                            </div>
                        </div>
                        <div className="overflow-y-auto">
                            <div className="pt-2">
                                <h2 className="font-semibold text-sm">GENRE</h2>
                                <div className="flex flex-wrap gap-1 text-white">
                                    {filteredGenreTags.map((tag) => <Tag key={tag} onClick={handleClick} 
                                    style={selectedTags.includes(tag) ? styleTag : ""} text={tag}></Tag>)}
                                </div>
                            </div>
                            <div className="pt-2">
                                <h2 className="font-semibold text-sm">MOOD</h2>
                                <div className="flex flex-wrap gap-1 text-white">
                                    {filteredMoodTags.map(tag => <Tag key={tag} onClick={handleClick} 
                                    style={selectedTags.includes(tag) ? styleTag : ""} text={tag}></Tag>)}
                                </div>
                            </div>
                            <div className="pt-2">
                                <h2 className="font-semibold text-sm">DISCUSSION</h2>
                                <div className="flex flex-wrap gap-1 text-white">
                                    {filteredDiscussionTags.map(tag => <Tag key={tag} onClick={handleClick} 
                                    style={selectedTags.includes(tag) ? styleTag : ""} text={tag}></Tag>)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        </PlaceholderProps>
    </>
}

export default HighlightsNav