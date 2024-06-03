import React from 'react';
import FileSelectionStage from "./file_selection_stage";
import WorksheetSelectionStage from "./worksheet_selection_stage";
import CalculateStage from "./calculate_stage";

export default function Pipeline() {
    return (
        <React.Fragment>
            <FileSelectionStage></FileSelectionStage>
            <WorksheetSelectionStage></WorksheetSelectionStage>
            <CalculateStage></CalculateStage>
        </React.Fragment>
    )
}