#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
let condition = true;
// Print welcon message 
console.log(chalk.underline.magenta(` \n  \t======== welcom to my "TODO LIST"========> \t \n `));
let main = async () => {
    while (condition) {
        let quest = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.blueBright("\n select an option you want to do: \n \n"),
                choices: ["Add Task", "Delete Task", "View TODO LIST", "Update Task", "Exit"],
            }
        ]);
        if (quest.choice === "Add Task") {
            await addTask();
        }
        ;
        if (quest.choice === "Delete Task") {
            await deleteTask();
        }
        ;
        if (quest.choice === "View TODO LIST") {
            await viewTask();
        }
        ;
        if (quest.choice === "Update Task") {
            await updateTask();
        }
        ;
        if (quest.choice === "Exit") {
            condition = false;
        }
        ;
    }
};
// function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.yellow(" \n Enter Your New Task: \n")
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.yellowBright(`\n  ${newTask.task}`), "task added successfully in 'TODO List':  ");
    console.log("_".repeat(60));
};
// function to view all todo list
let viewTask = async () => {
    console.log(chalk.yellow("\n your TODO LIST: "));
    todoList.forEach((task, index) => { console.log(` ${index + 1}:${task}`); });
    console.log("_".repeat(60));
};
// function to delete a task 
let deleteTask = async () => {
    await viewTask();
    let taskindex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.red(" Enter the index number of the task you want to delete, ")
        }
    ]);
    let deleteTask = todoList.splice(taskindex.index - 1, 1);
    console.log(` \n ${deleteTask} `, chalk.yellow("this task has been deleted successfully from your 'TODO LIST \n"));
};
// function to Update a task
let updateTask = async () => {
    await viewTask();
    let update_Task = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.blue(" \n Enter the index no. of the task you want to update: ")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.magentaBright("Now enter New Task name: ")
        }
    ]);
    todoList[update_Task.index - 1] = update_Task.new_task;
    console.log(chalk.yellow(`\n task at index no.${update_Task.index} update Successfully 

        [for update list check option "view TODO List] `));
    console.log("_".repeat(60));
};
main();
