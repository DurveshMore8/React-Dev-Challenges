"use client";

import Copy from "@/components/icons/Copy";
import SortAlfa from "@/components/icons/SortAlfa";
import Speaker from "@/components/icons/Speaker";
import TranslateLogo from "@/components/icons/TranslateLogo";
import { languagesISOList } from "@/data/languages";
import { DM_Sans } from "next/font/google";
import { ChangeEvent, ClipboardEvent, useState } from "react";

const dmSans = DM_Sans({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
  subsets: ["latin"],
});

interface TranslateAppProps {}

const TranslateApp: React.FunctionComponent<TranslateAppProps> = () => {
  // holds text on both the text fields
  const [textOne, setTextOne] = useState<string>("");
  const [textTwo, setTextTwo] = useState<string>("");

  // language to be entered
  const [enterLang, setEnterLang] = useState<string>("en");
  // langugage to be translated into
  const [translateLang, setTranslateLang] = useState<string>("fr");

  // handles text in the field
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const maxLength = 500;

    if (e.target.id === "textOne") {
      const newValue = e.target.value.slice(0, maxLength);
      setTextOne(newValue);
    } else if (e.target.id === "textTwo") {
      const newValue = e.target.value.slice(0, maxLength);
      setTextTwo(newValue);
    }
  };

  // handles paste mechnaism to prevent from words overflow in input
  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const maxLength = 500;
    const clipboardData = e.clipboardData;
    const pastedText = clipboardData.getData("text");
    const target = e.target as HTMLTextAreaElement;

    e.preventDefault();

    const currentValue = target.value;
    const remainingSpace = maxLength - currentValue.length;

    const textToPaste = pastedText.slice(0, remainingSpace);

    const newValue =
      currentValue.slice(0, target.selectionStart!) +
      textToPaste +
      currentValue.slice(target.selectionEnd!);
    target.value = newValue.slice(0, maxLength);

    if (target.id === "textOne") {
      setTextOne(target.value);
    } else if (target.id === "textTwo") {
      setTextTwo(target.value);
    }
  };

  // handle translate and show output to second textfield
  const handleTranslateClick = async () => {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${textOne}&langpair=${enterLang}|${translateLang}`
    );

    if (response.status == 200) {
      const data = await response.json();

      const translatedText = data.responseData.translatedText;

      setTextTwo(translatedText);
    }
  };

  // handle audio button click to convert text to speech
  const handleTextToAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech conversion.");
    }
  };

  // handles copying text to clipboard
  const handleCopyClick = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  };

  return (
    <main
      className={`${dmSans.className} h-screen bg-translate-app-bg bg-cover flex justify-center items-center flex-col px-[72px] relative`}
    >
      <section className="absolute top-[10%]">
        <TranslateLogo />
      </section>
      <section className="w-full flex gap-10">
        {/* Box 1 */}
        <div className="bg-[#212936dd] w-full border-2 border-[#3c424f] border-solid rounded-3xl p-6">
          <div className="flex gap-8 items-center text-[#6a707d] font-semibold text-sm">
            <button>Detect Language</button>
            <button
              onClick={() => setEnterLang("en")}
              className={`${
                enterLang === "en" ? "bg-[#4d5463]" : "bg-transparent"
              } ${
                enterLang === "en" ? "text-[#F9FAFB]" : "bg-transparent"
              } px-3 py-1.5 rounded-xl`}
            >
              English
            </button>
            <button
              onClick={() => setEnterLang("fr")}
              className={`${
                enterLang === "fr" ? "bg-[#4d5463]" : "bg-transparent"
              } ${
                enterLang === "fr" ? "text-[#F9FAFB]" : "bg-transparent"
              } px-3 py-1.5 rounded-xl`}
            >
              French
            </button>
            <select
              onChange={(e) => setEnterLang(e.target.value)}
              className={`${
                enterLang !== "en" && enterLang !== "fr"
                  ? "bg-[#4d5463]"
                  : "bg-transparent"
              } ${
                enterLang !== "en" && enterLang !== "fr"
                  ? "text-[#F9FAFB]"
                  : "bg-transparent"
              } border-none outline-none px-3 py-1.5 rounded-xl w-28`}
            >
              {languagesISOList.map((lang, index) => {
                if (lang.language !== "en" && lang.language !== "fr")
                  return (
                    <option key={index} value={lang.isoCode}>
                      {lang.language}
                    </option>
                  );
              })}
            </select>
          </div>
          <hr className="border border-[#3c424f] border-solid my-4" />
          <textarea
            className={`w-full h-60 resize-none outline-none bg-transparent text-[#F9FAFB] font-semibold placeholder:text-[#6a707d] placeholder:font-semibold ${dmSans.className}`}
            id="textOne"
            value={textOne}
            placeholder="Type something here..."
            onChange={handleChange}
            onPaste={handlePaste}
          />
          <span className="flex justify-end items-center text-[#6a707d] font-semibold text-xs my-3">
            {textOne.length}/500
          </span>
          <div className="flex">
            <button
              className="flex-shrink-0 icon-button"
              onClick={() => handleTextToAudio(textOne)}
            >
              <Speaker />
            </button>
            <button
              className="flex-shrink-0 ml-2 icon-button"
              onClick={() => handleCopyClick(textOne)}
            >
              <Copy />
            </button>
            <button
              onClick={handleTranslateClick}
              className="ml-auto flex items-center gap-1.5 bg-[#3662E3] border border-[#7CA9F3] text-[#F9FAFB] font-semibold text-sm rounded-lg px-4 py-1.5"
            >
              <SortAlfa />
              Translate
            </button>
          </div>
        </div>
        {/* Box 2 */}
        <div className="bg-[#121826dd] w-full border-2 border-[#3c424f] border-solid rounded-3xl p-6">
          <div className="flex gap-8 items-center text-[#6a707d] font-semibold text-sm">
            <button
              onClick={() => setTranslateLang("en")}
              className={`${
                translateLang === "en" ? "bg-[#4d5463]" : "bg-transparent"
              } ${
                translateLang === "en" ? "text-[#F9FAFB]" : "bg-transparent"
              } px-3 py-1.5 rounded-xl`}
            >
              English
            </button>
            <button
              onClick={() => setTranslateLang("fr")}
              className={`${
                translateLang === "fr" ? "bg-[#4d5463]" : "bg-transparent"
              } ${
                translateLang === "fr" ? "text-[#F9FAFB]" : "bg-transparent"
              } px-3 py-1.5 rounded-xl`}
            >
              French
            </button>
            <select
              onChange={(e) => setTranslateLang(e.target.value)}
              className={`${
                translateLang !== "en" && translateLang !== "fr"
                  ? "bg-[#4d5463]"
                  : "bg-transparent"
              } ${
                translateLang !== "en" && translateLang !== "fr"
                  ? "text-[#F9FAFB]"
                  : "bg-transparent"
              } border-none outline-none px-3 py-1.5 rounded-xl w-28`}
            >
              {languagesISOList.map((lang, index) => {
                if (lang.language !== "en" && lang.language !== "fr")
                  return (
                    <option key={index} value={lang.isoCode}>
                      {lang.language}
                    </option>
                  );
              })}
            </select>
          </div>
          <hr className="border border-[#3c424f] border-solid my-4" />
          <textarea
            className={`w-full h-60 resize-none outline-none bg-transparent text-[#F9FAFB] font-semibold placeholder:text-[#6a707d] placeholder:font-semibold ${dmSans.className}`}
            id="textTwo"
            value={textTwo}
            placeholder="Translation here..."
            onChange={handleChange}
            onPaste={handlePaste}
            readOnly
          />
          <span className="flex justify-end items-center text-[#6a707d] font-semibold text-xs my-3 invisible">
            {textOne.length}/500
          </span>
          <div className="flex">
            <button
              className="flex-shrink-0 icon-button"
              onClick={() => handleTextToAudio(textTwo)}
            >
              <Speaker />
            </button>
            <button
              className="flex-shrink-0 ml-2 icon-button"
              onClick={() => handleCopyClick(textTwo)}
            >
              <Copy />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TranslateApp;
