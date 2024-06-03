export default function WorksheetSelectionStage(props: {selectedFile: File}) {
    const a = async () => {
        console.log(props);
        if (props.selectedFile) {
            console.log(await window.electron.readFile(props.selectedFile.path));
        }
    };
    a();

    return undefined;
}