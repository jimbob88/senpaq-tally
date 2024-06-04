import React from "react";
import { utils, WorkBook, writeFileXLSX } from "xlsx";

function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set(Array.from(a).filter((x) => b.has(x)));
}

type Tally = Array<Array<{ similar: number; dissimilar: number }>>;
type Table = Array<Array<string | number | undefined>>;

/** Make a square tally table for similar and dissimilar */
function setupTally(dimension: number): Tally {
  const count: Tally = [];
  for (let i = 0; i < dimension; i++) {
    count.push(
      [...Array(dimension)].map(() => {
        return { similar: 0, dissimilar: 0 };
      }),
    );
  }
  return count;
}

function tallyToTable(productNames: string[], tally: Tally): string[][] {
  const table = [];
  table.push(["Similar / Dissimilar", ...productNames]);
  tally.forEach((row, rowIdx) => {
    const cellValues = row.map((val, colIdx) => {
      return rowIdx === colIdx ? "-" : `${val.similar} / ${val.dissimilar}`;
    });
    table.push([productNames[rowIdx], ...cellValues]);
  });
  return table;
}

function isAlpha(x: string | number | undefined): boolean {
  return typeof x === "string" && /^[a-zA-Z]+$/.test(x);
}

function isSimilar(group1: string, group2: string): boolean {
  const compare = intersection(new Set(group1), new Set(group2));
  return compare.size !== 0;
}

function doTally(table: Table, tally: Tally, productCount: number) {
  for (let row = 1; row < table.length; row++) {
    const rowGroups = table[row]
      .slice(1)
      .filter((cell): cell is string => isAlpha(cell));

    if (rowGroups.length !== productCount) {
      throw new Error(
        `Incorrect configuration, header is not the same as the number of groups, error on row ${row + 1}`,
      );
    }

    for (let current = 0; current < rowGroups.length; current++) {
      for (
        let compareTo = current + 1;
        compareTo < rowGroups.length;
        compareTo++
      ) {
        if (isSimilar(rowGroups[current], rowGroups[compareTo])) {
          tally[current][compareTo].similar += 1;
          tally[compareTo][current].similar += 1;
        } else {
          tally[current][compareTo].dissimilar += 1;
          tally[compareTo][current].dissimilar += 1;
        }
      }
    }
  }
}

function makeExcelTally(workbook: WorkBook, worksheet: string) {
  const sheet = workbook.Sheets[worksheet];
  const table: Table = utils.sheet_to_json(sheet, { header: 1 });
  const productNames = table[0].filter(
    (title): title is string => typeof title === "string",
  );

  const count: Tally = setupTally(productNames.length);

  doTally(table, count, productNames.length);

  const outTable = tallyToTable(productNames, count);

  // Make the EXCEL document
  const outWorksheet = utils.json_to_sheet(outTable, { skipHeader: true });
  const outWorkbook = utils.book_new();
  utils.book_append_sheet(outWorkbook, outWorksheet, "output");
  writeFileXLSX(outWorkbook, "output.xlsx", { compression: true });
}

export default function CalculateStage(props: {
  workbook: WorkBook;
  worksheet: string;
}) {
  const calculate = () => {
    makeExcelTally(props.workbook, props.worksheet);
  };

  return (
    <button
      type="button"
      onClick={() => calculate()}
      disabled={props.workbook === null || props.worksheet === null}
      className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
    >
      Calculate
    </button>
  );
}
