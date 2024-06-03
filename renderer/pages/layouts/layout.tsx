import React, {PropsWithChildren} from "react";

export default function Layout(props: PropsWithChildren) {
    const {children} = props;
    return (
        <React.Fragment>
            <header
                className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75">
            </header>
            <main>
                {children}
            </main>
        </React.Fragment>
    );
}