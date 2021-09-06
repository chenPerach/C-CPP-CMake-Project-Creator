// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Project } from './Project';
import { UserQuery, UserQueryResults } from './user-query';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "test" is now active!');

	context.subscriptions.push( vscode.commands.registerCommand('test.createProject', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Generating project');
		try {
			const q : UserQueryResults = await UserQuery.queryUser();
			const p = new Project(context);
			await p.createProject(q);
		} catch (error) {
			console.log(error);
		}
	}));

}

// this method is called when your extension is deactivated
export function deactivate() {}
