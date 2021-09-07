import * as vscode from 'vscode';
import {getProjectFolder} from "./vscode-ui";
import * as path from "path";
import * as fs from "fs-extra";
import { UserQueryResults } from './user-query';

export const createProject = async (context : vscode.ExtensionContext, results : UserQueryResults) : Promise<void> => {

    const directories: string[] = ['src','include','build','.vscode'];


    const  createFiles = async (data:UserQueryResults,location:string) => {
        try {
            const tasksPath = path.join(context.extensionPath, 'Templates', 'tasks.json');
            const launchPath = path.join(context.extensionPath, 'Templates', 'launch.json');
            const ignorePath = path.join(context.extensionPath, 'Templates', '.gitignore');

            const mainPath = path.join(context.extensionPath, 'Templates', data.type, `main.${data.type}`);
            const cmakefilePath = path.join(context.extensionPath, 'Templates', data.type, 'CMakeLists.txt');
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
    };
    const  createFolders = async (location :string) => {
        directories.forEach((dir: string) => {
            try {
                fs.ensureDirSync(path.join(location, dir));
            } catch (err) {
                console.error(err);
            }
        });
    };
    const location : vscode.Uri = await getProjectFolder();
    if(location && location.fsPath){
        await vscode.commands.executeCommand('vscode.openFolder',location);
        await createFolders(location.fsPath);
        await createFiles(results,location.fsPath);
    }
};