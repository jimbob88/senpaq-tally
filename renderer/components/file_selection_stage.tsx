import React from "react";
import ExcelFileSelector from "./file_selector";

/**
 * The file upload stage
 * @source Icon: https://flowbite.com
 * @param props
 * @constructor
 */
export default function FileSelectionStage(props: {setSelectedFile: React.Dispatch<React.SetStateAction<File>>}) {

    const handleSelectFileChange = (selectedFile: File) => {
        props.setSelectedFile(selectedFile);
    }

    return (
        <ExcelFileSelector onChange={handleSelectFileChange}></ExcelFileSelector>
    );
}