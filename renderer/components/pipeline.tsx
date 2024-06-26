import React, { useEffect } from "react";
import FileSelectionStage from "./file_selection_stage";
import WorksheetSelectionStage from "./worksheet_selection_stage";
import CalculateStage from "./calculate_stage";
import { WorkBook } from "xlsx";

export default function Pipeline() {
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [workbook, setWorkbook] = React.useState<WorkBook>(null);
  const [worksheet, setWorksheet] = React.useState<string>(null);

  useEffect(() => {
    if (selectedFile) {
      window.electron.readFile(selectedFile.path).then((workbook: WorkBook) => {
        setWorkbook(workbook);
      });
    } else {
      setWorkbook(null);
    }
  }, [selectedFile]);

  return (
    <React.Fragment>
      <FileSelectionStage
        setSelectedFile={setSelectedFile}
      ></FileSelectionStage>
      <WorksheetSelectionStage
        workbook={workbook}
        setWorksheet={setWorksheet}
      ></WorksheetSelectionStage>
      <CalculateStage
        workbook={workbook}
        worksheet={worksheet}
      ></CalculateStage>
    </React.Fragment>
  );
}
