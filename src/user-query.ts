import * as vscode from "vscode";
export interface UserQueryResults {
    type: string;
    name: string;
    standard: string;
}
export const queryUser = async () : Promise<UserQueryResults> => {

    const projectType = async (): Promise<string> => {
        const types: string[] = ['cpp', 'c'];
        const res: string | undefined = await vscode.window.showQuickPick(types,{
            title: "choose project type."
        });
        if (res) {
            return res;
        } else {
            throw new Error("user didn't enter project type");
        }
    };
    const projectName = async (): Promise<string> => {

        const res = await vscode.window.showInputBox({title: "project name."});
        if (res) {
            return res.replace(/ /g, "-");
        } else {
            throw new Error("no project name");
        }
    };

    const getStandard = async (type: string | undefined): Promise<string> => {
        const cpp: string[] = ['98', '11', '17', '20'];
        const c: string[] = ['90', '99', '11'];
        const res: string | undefined = await vscode.window.showQuickPick(type === 'cpp' ? cpp : c,{
            title: `choose ${type} version.`
        });
        if (res) {
            return res;
        } else {
            throw new Error("user didn't ender standard");
        }
    };
    const type: string = await projectType();
    const standard: string = await getStandard(type);
    const name: string = await projectName();

    return {
        name: name,
        type: type,
        standard: standard
    };

};