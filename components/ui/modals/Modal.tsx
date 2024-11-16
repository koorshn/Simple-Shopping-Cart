import React, { useState } from "react";

type PropsType = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
};

export default function Modal({ setIsOpen, children, title }: PropsType) {
  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className="w-full flex  justify-start h-full modal-container inset-0 z-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`flex overflow-y-auto transform h-2/3  flex-col w-full py-0 gap-1 modal  rounded-t-xl`}
        >
          <div className="flex flex-col pt-2 gap-1 items-center border-b-1 shadow-sm justify-center">
            <div
              onClick={() => setIsOpen(false)}
              className="w-8 h-2 bg-gray-500 rounded-lg"
            ></div>

            <h2 className="text-text_Primary text-xl font-xl font-semibold pb-3">
              {title}
            </h2>
          </div>
          <div className="flex flex-col w-full h-full overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
