"use client";

import Copy from "@/components/icons/Copy";
import SortAlfa from "@/components/icons/SortAlfa";
import Speaker from "@/components/icons/Speaker";
import TranslateLogo from "@/components/icons/TranslateLogo";
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
  const [textOne, setTextOne] = useState<string>("");
  const [textTwo, setTextTwo] = useState<string>("");

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
            <button className="bg-[#4d5463] text-[#F9FAFB] px-3 py-1.5 rounded-xl">
              English
            </button>
            <button>French</button>
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
            <button className="flex-shrink-0 icon-button">
              <Speaker />
            </button>
            <button className="flex-shrink-0 ml-2 icon-button">
              <Copy />
            </button>
            <button className="ml-auto flex items-center gap-1.5 bg-[#3662E3] border border-[#7CA9F3] text-[#F9FAFB] font-semibold text-sm rounded-lg px-4 py-1.5">
              <SortAlfa />
              Translate
            </button>
          </div>
        </div>
        {/* Box 2 */}
        <div className="bg-[#121826dd] w-full border-2 border-[#3c424f] border-solid rounded-3xl p-6">
          <div className="flex gap-8 items-center text-[#6a707d] font-semibold text-sm">
            <button>English</button>
            <button className="bg-[#4d5463] text-[#F9FAFB] px-3 py-1.5 rounded-xl">
              French
            </button>
            <button>Spanish</button>
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
            <button className="flex-shrink-0 icon-button">
              <Speaker />
            </button>
            <button className="flex-shrink-0 ml-2 icon-button">
              <Copy />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TranslateApp;
