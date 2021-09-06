import * as vscode from 'vscode';
import {VSCodeUI} from "./vscode-ui";
import * as path from "path";
import * as fs from "fs-extra";
import { UserQuery, UserQueryResults } from './user-query';

export class Project {

    directories: string[] = ['src','include','build','.vscode'];

    private context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext){
        this.context = context;
    }
    async createFiles(data:UserQueryResults,location:string){
        try {
            const tasksPath = path.join(this.context.extensionPath, 'Templates', 'tasks.json');
            const launchPath = path.join(this.context.extensionPath, 'Templates', 'launch.json');
            const ignorePath = path.join(this.context.extensionPath, 'Templates', '.gitignore');

            const mainPath = path.join(this.context.extensionPath, 'Templates', data.type, `main.${data.type}`);
            const cmakefilePath = path.join(this.context.extensionPath, 'Templates', data.type, 'CMakeLists.txt');
            var cmakefile = fs.readFileSync(cmakefilePath, 'utf-8').replace("<name>",data.name).replace("<version>",data.standard);
            var launchfile = fs.readFileSync(launchPath, 'utf-8').replace(/<name>/g,data.name);
            fs.writeFileSync(path.join(location, '.vscode', 'tasks.json'), fs.readFileSync(tasksPath, 'utf-8'));
            fs.writeFileSync(path.join(location, '.vscode', 'launch.json'), launchfile);
            fs.writeFileSync(path.join(location, 'src', `main.${data.type}`), fs.readFileSync(mainPath, 'utf-8'));
            fs.writeFileSync(path.join(location, 'CMakeLists.txt'), cmakefile);
            fs.writeFileSync(path.join(location, '.gitignore'), fs.readFileSync(ignorePath, 'utf-8'));

            vscode.workspace.openTextDocument(path.join(location, 'src', 'main.cpp'))
                .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
        } catch (err) {
            console.error(err);
        }
    }
    async createFolders(location :string){
        this.directories.forEach((dir: string) => {
            try {
                fs.ensureDirSync(path.join(location, dir));
            } catch (err) {
                console.error(err);
            }
        });
    }
    async createProject(data:UserQueryResults){
        const location : vscode.Uri = await VSCodeUI.openDialogForFolder();
        if(location && location.fsPath){
            await vscode.commands.executeCommand('vscode.openFolder',location);
            await this.createFolders(location.fsPath);
            await this.createFiles(data,location.fsPath);
        }

    }
}