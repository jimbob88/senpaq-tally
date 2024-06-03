import React from "react";
import ExcelFileSelector from "./file_selector";

/**
 * The file upload stage
 * @source Icon: https://flowbite.com
 * @param props
 * @constructor
 */
export default function FileSelectionStage(props: {setSelectedFile: React.Dispatch<React.SetStateAction<boolean>>}) {

    const handleSelectFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files[0]);
    }

    return (
        <ExcelFileSelector onChange={handleSelectFileChange}></ExcelFileSelector>
    );
}