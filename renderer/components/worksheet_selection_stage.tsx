import React, {useEffect} from "react";
import {WorkBook} from "xlsx";

export default function WorksheetSelectionStage(props: { workbook: WorkBook }) {
    return (
        <React.Fragment>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select
                the worksheet</label>
            <select defaultValue={0} id="countries" disabled={props.workbook === null}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Choose a worksheet</option>
                {props.workbook && props.workbook.SheetNames.map(sheetName => <option value={sheetName}
                                                                                      key={sheetName}>{sheetName}</option>)}
            </select>
        </React.Fragment>
    );
}