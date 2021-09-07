import { OpenDialogOptions, Uri, window } from 'vscode';

export const getProjectFolder = async () : Promise<Uri> => {
    const options: OpenDialogOptions = {
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false
    };
    const result: Uri[] | undefined = await window.showOpenDialog(Object.assign(options));
    if (result && result.length) {
        console.log(result);
        return Promise.resolve(result[0]);
    } else {
        return Promise.reject("user didn't choose a path");
    }
};