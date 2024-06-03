import React from 'react';
import FileSelectionStage from "./file_selection_stage";
import WorksheetSelectionStage from "./worksheet_selection_stage";
import CalculateStage from "./calculate_stage";

export default function Pipeline() {
    const [selectedFile, setSelectedFile] = React.useState<File>();
    const [selectedWorksheet, setSelectedWorksheet] = React.useState<boolean>();

    return (
        <React.Fragment>
            <FileSelectionStage setSelectedFile={setSelectedFile}></FileSelectionStage>
            <WorksheetSelectionStage selectedFile={selectedFile}></WorksheetSelectionStage>
            <CalculateStage isEnabled={selectedWorksheet}></CalculateStage>
        </React.Fragment>
    )
}