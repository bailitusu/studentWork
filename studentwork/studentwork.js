'use strict';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    const printStr = "1.添加学生\n2.生成成绩单\n3.退出\n4.请输入你的选择（1～3）：";
    console.log(printStr);
    rl.question("",(userInput) => {
        switch (userInput) {
            case "1":
                addStudentAchievement();
                break;
            case "2":
                printReport();
                break;
            case "3":
                thisSoftExit();
                break;
            default:
                break;
        }
        rl.close();
    });
}

function buildStudentInfoPromptString() {
    const promptStr = "请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交："
    console.log(promptStr);
}

let Student = function (input) {
    const infoArray = input.split(",");
    this.name = infoArray[0];
    this.studentID = infoArray[1];
    this.nation = infoArray[2];
    this.sclass = infoArray[3];
    this.course = infoArray[4];
    this.score = infoArray[5];
};

const studentArray = [];

function checkInputFormat(input,type) {
    switch (type) {
        case "studentID":
            return (/^[0-9]+?[,0-9]*$/.test(input));
        case "studentInfo":
            return (/^[A-Za-z]+[,0-9]+[,A-Za-z]+[:0-9]+?[,A-Za-z]+[:0-9]*$/.test(input));
    }
}

// function addStudentInfo() {
//     rl.question("",(userInput) => {
//         if(!checkInputFormat(userInput,"studentInfo")) {
//             rl.close();
//             return console.log("请按正确的格式输入（格式：姓名, 学号, 学科:成绩, ...）：");
//         }
//         const infoArray = userInput.split(",");
//     });
// }
