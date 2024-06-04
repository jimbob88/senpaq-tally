import React, { useEffect } from "react";

export default function ExcelFileSelector(props: {
  onChange: (selectedFile: File) => void;
}) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  useEffect(() => {
    props.onChange(selectedFile);
  }, [selectedFile]);

  const updateSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
  };

  const cancelFileSelection = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedFile(null);
  };

  const uploadDescription = () => {
    if (selectedFile) {
      return (
        <React.Fragment>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Currently Selected File: {selectedFile.name}
          </p>
          <button
            type="button"
            onClick={cancelFileSelection}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-2"
          >
            Abort
          </button>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <p className="text-center mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-center wb-2 text-xs text-gray-500 dark:text-gray-400">
          CSV, XLS, or XLSX
        </p>
      </React.Fragment>
    );
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
            />
          </svg>
          {uploadDescription()}
        </div>
        <input
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={updateSelectedFile}
          key={selectedFile ? selectedFile.name : null}
        />
      </label>
    </div>
  );
}
