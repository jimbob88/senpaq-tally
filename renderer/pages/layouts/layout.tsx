import React, { PropsWithChildren } from "react";
import Image from "next/image";
import logo from "../../../resources/icon.svg";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div className="flex flex-col h-full rounded-lg">
      <header className="shadow-md">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <span className="flex items-center">
              <Image
                src={logo}
                className="mr-3 h-6 w-auto sm:h-9"
                alt="SenPAQ Tally Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                SenPAQ Tally
              </span>
            </span>
            <span className="flex items-center">
              <button className="w-6 h-6 text-gray-800 dark:text-white">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                  />
                </svg>
              </button>
            </span>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 w-full h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
