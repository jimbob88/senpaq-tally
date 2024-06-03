import React, {PropsWithChildren} from "react";
import Image from 'next/image';
import logo from "../../../resources/icon.svg";

export default function Layout(props: PropsWithChildren) {
    const {children} = props;
    return (
        <React.Fragment>
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <span className="flex items-center">
                            <Image src={logo} className="mr-3 h-6 w-auto sm:h-9" alt="SenPAQ Tally Logo"/>
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SenPAQ Tally</span>
                        </span>
                    </div>
                </nav>
            </header>
            <main>
                <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                    {children}
                </div>
            </main>
        </React.Fragment>
    );
}