import {utils, WorkBook, writeFileXLSX} from "xlsx";

function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
    return new Set(Array.from(a).filter(x => b.has(x)));
}


export default function CalculateStage(props: { workbook: WorkBook, worksheet: string }) {

    const calculate = () => {
        const sheet = props.workbook.Sheets[props.worksheet];
        const table: Array<Array<string | number | undefined>> = utils.sheet_to_json(sheet, {header: 1});
        console.log(table);
        const header = table[0].filter((title): title is string => typeof title === "string");
        console.log(header);

        const count: Array<Array<{ similar: number, dissimilar: number }>> = [];
        for (let i = 0; i < header.length; i++) {
            count.push(Array.apply(null, Array(header.length)).map(() => {
                return {similar: 0, dissimilar: 0};
            }));
        }


        for (let row = 1; row < table.length; row++) {
            let rowGroups = new Array<string>();
            for (let col = 1; col < table[row].length; col++) {
                let cell = table[row][col];
                if (typeof cell === "string" && /^[a-zA-Z]+$/.exec(cell)) {
                    rowGroups.push(cell);
                }
            }
            console.log(rowGroups);

            if (rowGroups.length !== header.length) {
                throw new Error(`Incorrect configuration, header is not the same as the number of groups, error on row ${row + 1}`);
            }

            rowGroups.forEach((currentGroup, current) => {
                rowGroups.forEach((compareGroup, compareTo) => {
                    if (current !== compareTo) {
                        const compare = intersection(new Set(currentGroup), new Set(compareGroup));
                        console.log(`Comparing ${currentGroup} to ${compareGroup} to produce ${Array.from(compare)}`);
                        if (compare.size === 0) {
                            count[current][compareTo].dissimilar += 1;
                        } else {
                            count[current][compareTo].similar += 1;
                        }
                    }
                })
            })

        }

        const outTable = [];
        outTable.push(["Similar / Dissimilar", ...header]);
        count.forEach((row, rowIdx) => {
            const cellValues = row.map((val, colIdx) => {
                return rowIdx === colIdx ? "-" : `${val.similar} / ${val.dissimilar}`;
            })
            outTable.push([header[rowIdx], ...cellValues]);
        })
        console.log(outTable);

        // Make the EXCEL document
        const worksheet = utils.json_to_sheet(outTable, {skipHeader: true});
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "output");
        writeFileXLSX(workbook, "output.xlsx", { compression: true });
    }

    return (
        <button type="button" onClick={() => calculate()} disabled={props.workbook === null || props.worksheet === null}
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50">Calculate</button>
    );
}