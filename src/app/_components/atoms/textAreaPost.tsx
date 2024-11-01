"use client"

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Button from './button';
import { UUID } from 'crypto';
import { Comments, Posts } from '~/lib/definitions';
import { useRouter } from "next/navigation";

interface TextAreaComentarioProps {
    //COMMENTS INFO
    community_id: UUID;
    community_name: string;
    community_icon?: string;
    //USER INFO
    user_id : UUID;
    user_name : string;
    user_icon : string;
    //Style
    dark: boolean
}

const getCurrentPosts = () : Posts[] => {
    const storedPosts = localStorage.getItem('userPosts');
    return storedPosts ? JSON.parse(storedPosts) : [];
}

const TextAreaPost = ( {community_id, community_name, community_icon, user_id, user_name, user_icon, dark} : TextAreaComentarioProps ) => {

    const router = useRouter();

    const [userPosts, setuserPosts] = useState<Posts[]>(getCurrentPosts())

    useEffect(() => {
        localStorage.setItem("userPosts", JSON.stringify(userPosts));
    },[userPosts])

    const [isFocused, setIsFocused] = useState(false);
    const [size, setSize] = useState("48");

    const [sizeDesc, setSizeDesc] = useState("48");

    const [active, setActive] = useState("False");
    const [item, setItem] = useState(null);

    const [tagInput, setTagInput] = useState("");

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    //data to post

    const [text, setText] = useState("");
    const [description, setDescription] = useState("");
    const [postImage, setPostImage] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    
    useEffect(() => {
        if (textAreaRef.current) {
          textAreaRef.current.style.height = "auto"; 
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set it to the scroll height
        }
      }, [text]);
    
      useEffect(() => {
        if (descriptionRef.current) {
          descriptionRef.current.style.height = "auto"; 
          descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`; // Set it to the scroll height
        }
      }, [description]);

    const handleTab = (props? : any) => {
        setActive("True");
        setItem((item === props ? null : props));
    }

    const handleChange = (event : any) => {
        setText(event.target.value);
    };

    const handleChangeDescription = (event : any) => {
        setDescription(event.target.value);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleCancel = () => {
        setText("");
        setPostImage("")
        setDescription("")
        setTags([])
        setSize("48")
        setIsFocused(false);
        setActive("False");
        setItem(null)
    }

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !tags.includes(trimmedTag)) {
          setTags([...tags, trimmedTag]);
          setTagInput(""); 
        }
      };

      const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
      };

      const handleUpload = (event: any) => {
        const file = event.target.files?.[0];
        
        const maxSizeInMB = 0.5;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file && file.size > maxSizeInBytes) {
            alert(`File is too large! Please upload an image smaller than ${maxSizeInMB}MB.`);
            return;
        }

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setPostImage(reader.result)
            }
          };
          reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if(text !== ""){
            console.log("Message sent:", text);

            const newPost : Posts = 
            {
                //post
                id: crypto.randomUUID() as UUID,
                user_id: user_id,
                community_id: community_id,
                content: text,
                content_post: description,
                created_at: new Date,
                tags: ( tags.length > 0 ? tags : undefined ) ,
                url_image: ( postImage !== "" ? postImage : undefined ),
                likes: 0,
                comments: 0,
                //user
                community_name: community_name,
                user_name: user_name,
                community_icon: community_icon,
            }
            
            setuserPosts([...userPosts, newPost])
    
            if(postImage !== "") {
            }
    
            setTags([])
            setDescription("")
            setText(""); 
            setPostImage("")

            setSize("48")
            setIsFocused(false);
            setActive("False");
            
            router.refresh()
        }
    };

    const bordaDesativada = "border-sp-purpleBright2"
    const bordaAtivada = "border-sp-accent text-sp-accent"


    return (
        <>
            <div 
                onFocus={handleFocus}
                className={`my-2 flex ${dark ? "bg-gray-950" : ""} flex-wrap rounded-[20px] border border-sp-purpleBright2`}>
                {isFocused && (
                    <div className="flex w-full justify-start py-4 align-top">
                        <button onClick={() => handleTab(1)} className={`flex items-center px-4 border-b-[3px] ${ active == "True" && item == 1 ? bordaAtivada : bordaDesativada} hover:transition hover:border-sp-accent text-sp-purpleBright2 hover:text-sp-accent`}>
                            <p className="px-2 text-lg">IMAGE</p>
                        </button>
                        <button onClick={() => handleTab(2)} className={`flex items-center px-4 border-b-[3px] ${ active == "True" && item == 2 ? bordaAtivada : bordaDesativada} hover:transition hover:border-sp-accent text-sp-purpleBright2 hover:text-sp-accent`}>
                            <p className="px-2 text-lg">DESCRIPTION</p>
                        </button>
                        <button onClick={() => handleTab(3)} className={`flex items-center px-4 border-b-[3px] ${ active == "True" && item == 3 ? bordaAtivada : bordaDesativada} hover:transition hover:border-sp-accent text-sp-purpleBright2 hover:text-sp-accent`}>
                            <p className="px-2 text-lg">TAGS</p>
                        </button>
                    </div>
                )}

                <div className="flex flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <div
                            key={index}
                            className={`flex items-start px-2 py-1 m-1 border rounded-full ${dark ? "bg-gray-950 text-white" : " text-sp-purpleBright2"}  border-sp-purpleBright2`}
                        >
                            <span className="mr-2">{tag}</span>
                            <button
                            onClick={() => handleRemoveTag(index)}
                            className="text-sp-purpleBright2 hover:text-red-400"
                            >
                            &times;
                            </button>
                        </div>
                    ))}
                </div>
                
                <textarea
                    rows={3}
                    placeholder="Create a Post"
                    value={text}
                    ref={textAreaRef}
                    onChange={handleChange}
                    style={{  height: `${size}px` }}
                    className={`w-full outline-none resize-none ${dark ? "bg-gray-950 text-slate-200 focus:text-white" : "bg-[#f5f7ff] text-slate-600 focus:text-black "} min-h-[48px] h-auto max-h-full p-3 focus:text-black focus:font-normal rounded-[20px] text-slate-600 text-opacity-75 text-base font-bold font-['Lato']`}
                >
                    <div className="text-slate-600  text-opacity-75 text-base font-bold font-['Lato']"></div>
                </textarea>
                {postImage !== "" && (
                    <div className='w-full p-3 flex justify-center'>
                        <img className=' shadow-md' src={postImage} alt="" />
                    </div>
                )}
                {active == "True" && item == 1 && (
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-64 border-[3px] border-gray-300 border-dashed rounded-lg cursor-pointer ${dark ? "bg-gray-950 hover:bg-gray-800" : "bg-[#f5f7ff] hover:bg-gray-200"}`}>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-sp-purpleBright2 dark:text-sp-purpleBright2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-sp-purpleBright2 dark:text-sp-purpleBright2"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-sp-purpleBright2 dark:text-sp-purpleBright2">PNG, JPG or GIF</p>
                            </div>
                            <input 
                                id="dropzone-file" 
                                type="file" 
                                className="hidden" 
                                accept=".png,.jpg,.jpeg"
                                onChange={(e) => handleUpload(e)}
                            />
                        </label>
                    </div> 
                )}
                {active == "True" && item == 2 && (
                    <textarea
                            rows={3}
                            placeholder="Description"
                            value={description}
                            ref={descriptionRef}
                            onChange={handleChangeDescription}
                            style={{  height: `${sizeDesc}px` }}
                            className={`w-full outline-none border-[3px] border-dashed ${dark ? "bg-gray-950 text-slate-200 focus:text-white" : "bg-[#f5f7ff] text-slate-600 focus:text-black "}  min-h-[96px] resize-none h-auto max-h-full p-3 focus:font-normal text-opacity-75 text-base font-bold font-['Lato']`}
                    >
                        <div className="text-opacity-75 text-base font-bold font-['Lato']"></div>
                    </textarea>
                )}
                {active == "True" && item == 3 && (
                    <div className="w-full">
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagChange}
                            placeholder="Add a tag and press the button"
                            className={`flex-1 border-[3px] w-full text-start border-dashed outline-none resize-none ${dark ? "bg-gray-950 text-slate-200 focus:text-white" : "bg-[#f5f7ff] text-slate-600 focus:text-black "} min-h-[48px] h-auto max-h-full p-3 focus:font-normal rounded-[20px] text-opacity-75 text-base font-bold font-['Lato']`}
                        />
                    </div>
                )}
                {isFocused && (
                    <div className="flex w-full justify-end align-bottom mt-2 p-4">
                        {active && item === 3 && (
                            <button
                                onClick={handleAddTag}
                                className="bg-sp-purpleBright2 transition-all duration-200 hover:bg-sp-accent hover:text-black text-white whitespace-nowrap py-1 px-3 mr-2 h-min w-min buttonAdjust:py-2.5 lg:px-1 xl:px-3  min-h-fit self-center rounded-3xl justify-center items-center inline-flex"
                            >
                                Add Tag
                            </button>
                        )}
                        <button
                            onClick={handleSubmit}
                            className="bg-sp-purpleBright2 transition-all duration-200 hover:bg-sp-accent hover:text-black text-white py-1 px-3 mr-2 h-min w-min buttonAdjust:py-2.5 lg:px-1 xl:px-3  min-h-fit self-center rounded-3xl justify-center items-center inline-flex"
                        >
                            Post
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-sp-purpleBright2 transition-all duration-200 hover:bg-sp-accent hover:text-black text-white py-1 px-3 h-min w-min buttonAdjust:py-2.5 lg:px-1 xl:px-3  min-h-fit self-center rounded-3xl justify-center items-center inline-flex"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default TextAreaPost;
