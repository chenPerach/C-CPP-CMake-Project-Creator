import * as vscode from "vscode";
export interface UserQueryResults {
    type: string;
    name: string;
    standard: string;
}
export class UserQuery {

    private static async projectType() {
        const types: string[] = ['cpp', 'c'];
        const res: string | undefined = await vscode.window.showQuickPick(types);
        if(res){
            return res;
        }else{
         throw new Error("user didn't enter project type");
        }
    }
    private static async projectName() : Promise<string>{

        const res = await vscode.window.showInputBox();
        if(res){
            return res.replace(/ /g,"-");
        }else{
            throw new Error("no project name");
        }
    }

    private static async standard(type: string | undefined): Promise<string>{
        const cpp: string[] = ['98', '11', '17', '20'];
        const c: string[] = ['90', '99', '11', '18'];
        const res : string | undefined = await vscode.window.showQuickPick(type === 'cpp'?cpp:c);
        if(res){
            return res;
        }else{
            throw new Error("user didn't ender standard");
        }
    }
    static async  queryUser() : Promise<UserQueryResults>{
        const type: string = await this.projectType();
        const standard: string = await this.standard(type);
        const name: string  = await this.projectName();

        return {
            name: name,
            type: type,
            standard: standard
        };
    }

}