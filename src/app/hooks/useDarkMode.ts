"use client";

import { useEffect, useState } from "react";

interface FormValues {
  darkmode: boolean;
  GeneralReplies: boolean;
  YourReplies: boolean;
  LikedReply: boolean;
  sentPost: boolean;
  PostReplied: boolean;
  PostLiked: boolean;
}

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    const storedSettings = localStorage.getItem("userSettings");
    if (storedSettings) {
      setFormValues(JSON.parse(storedSettings));
    }
  }, []);

  useEffect(() => {
    if (formValues) {
      if (formValues.darkmode) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
  }, [formValues]);

  return { darkMode };
};

export default DarkMode;
