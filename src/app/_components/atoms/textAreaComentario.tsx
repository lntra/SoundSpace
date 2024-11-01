"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { type UUID } from "crypto";
import { type Comments } from "~/lib/definitions";
import { useRouter } from "next/navigation";

interface TextAreaComentarioProps {
  //ROOT OR REPLY
  started: boolean;
  setStarted?: Dispatch<SetStateAction<boolean>>;
  parent_id?: UUID;
  setVisible?: Dispatch<SetStateAction<"visible" | "hidden">>;
  //COMMENTS INFO
  userComments: Comments[];
  setUserComments?: Dispatch<SetStateAction<Comments[]>>;
  post_id: UUID;
  //USER INFO
  user_id: UUID;
  user_name: string;
  user_icon: string;
  //style
  dark: boolean;
}

const TextAreaComentario = ({
  userComments,
  setUserComments,
  setVisible,
  started,
  setStarted,
  parent_id,
  post_id,
  user_id,
  user_name,
  user_icon,
  dark,
}: TextAreaComentarioProps) => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("userComments", JSON.stringify(userComments));
  }, [userComments]);

  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [size, setSize] = useState("48");

  const handleChange = (event: any) => {
    setText(event.target.value);
    setSize(`${event.target.scrollHeight}`);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    setText("");
    setSize("48");
    setIsFocused(false);
    if (setStarted) setStarted(false);
  };

  const handleSubmit = () => {
    console.log("Message sent:", text);

    console.log(started);

    console.log(parent_id);

    if (setVisible) {
      setVisible("visible");
    }

    if (!started) {
      const newComment: Comments = {
        id: crypto.randomUUID() as UUID,
        post_id: post_id,
        user_id: user_id,
        user_name: user_name,
        user_icon: user_icon,
        parent_comment_id: null,
        created_at: new Date(),
        content: text,
        likes: 0,
      };
      if (setUserComments) setUserComments([...userComments, newComment]);
    }

    if (!!started && parent_id && setStarted) {
      const newCommentReply: Comments = {
        id: crypto.randomUUID() as UUID,
        post_id: post_id,
        user_id: user_id,
        user_name: user_name,
        user_icon: user_icon,
        parent_comment_id: parent_id,
        created_at: new Date(),
        content: text,
        likes: 0,
      };
      if (setUserComments) setUserComments([...userComments, newCommentReply]);
    }

    setText("");
    setSize("48");
    setIsFocused(false);
    if (started && setStarted) setStarted(false);
  };

  return (
    <>
      <div
        onFocus={handleFocus}
        className={`my-2 flex flex-wrap rounded-[20px] border border-sp-purpleBright2`}
      >
        <textarea
          rows={3}
          placeholder="Comment"
          value={text}
          onChange={handleChange}
          style={{ height: `${size}px` }}
          className={`w-full resize-none outline-none ${
            dark
              ? "bg-gray-950 text-slate-200 focus:text-white"
              : "bg-none text-slate-600 focus:text-black "
          } h-auto max-h-full min-h-[48px] rounded-[20px] p-3 font-['Lato']  text-base font-bold text-opacity-75 focus:font-normal`}
        >
          <div className="font-['Lato'] text-base font-bold text-slate-600 text-opacity-75"></div>
        </textarea>
        {isFocused && (
          <div className="mt-2 flex w-full justify-end p-4 align-bottom">
            <button
              onClick={handleSubmit}
              className="mr-2 inline-flex h-min min-h-fit w-min items-center justify-center self-center rounded-3xl bg-sp-purpleBright2  px-3 py-1 text-white buttonAdjust:py-2.5 lg:px-1 xl:px-3"
            >
              Send
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex h-min min-h-fit w-min items-center justify-center self-center rounded-3xl bg-sp-purpleBright2  px-3 py-1 text-white buttonAdjust:py-2.5 lg:px-1 xl:px-3"
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
