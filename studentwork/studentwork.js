'use strict';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let studentArray = [];

function mainMenu() {
    const printStr = "1.添加学生\n2.生成成绩单\n3.退出\n4.请输入你的选择（1～3）：";
    console.log(printStr);
    let exitFlag = false;

        rl.question("", (userInput) => {
            switch (userInput) {
                case "1":
                    addStudentScore();
                    break;
                case "2":
                    printReport();
                    break;
                case "3":
                    // thisSoftExit();
                    exitFlag = true;
                    break;
                default:
                    break;
            }
            console.log("run -- main")

        });

}
// mainMenu();
// let Student = function (input) {
//     const infoArray = input.split(",");
//     this.name = infoArray[0];
//     this.studentID = infoArray[1];
//     this.nation = infoArray[2];
//     this.sclass = infoArray[3];
//     this.scoreArray = [];
//     for (let i = 4; i < infoArray.length; i++) {
//         this.scoreArray.push(Object.assign({}, {course: infoArray[i].split(":")[0], score: infoArray[i].split(":")[1]}));
//     }
// };
class Student {
    constructor(input) {
        const infoArray = input.split(",");
        this.name = infoArray[0];
        this.studentID = infoArray[1];
        this.nation = infoArray[2];
        this.sclass = infoArray[3];
        this.scoreArray = [];
        for (let i = 4; i < infoArray.length; i++) {
            this.scoreArray.push(Object.assign({}, {course: infoArray[i].split(":")[0], score: infoArray[i].split(":")[1]}));
        }
    }
    updateStudentScore(studentObj) {
        this.scoreArray = studentObj.scoreArray;
    }
}
// let stdobj = new Student("zc,111,han,banji,math:99,yuwen:99");



function checkInputFormat(input, type) {
    switch (type) {
        case "studentID":
            if (/^[0-9]+?[,0-9]*$/.test(input)) {
                return !isThisArrayContainsSameItem(input.split(","));
            }
            return false;
        case "studentInfo":
            return (/^[\u4e00-\u9fa5A-Za-z]+[,0-9]+[,\u4e00-\u9fa5A-Za-z]+[,\u4e00-\u9fa5A-Za-z]+[,\u4e00-\u9fa5A-Za-z]+[:0-9]+?[,\u4e00-\u9fa5A-Za-z]+[:0-9]*$/.test(input));
    }
}
function isExistThisStudent(obj) {
    for (let item of studentArray) {
        if (item.studentID === obj.studentID) {
            return true;
        }
    }
    return false;
}

function isThisArrayContainsSameItem(inputArray) {
    return inputArray.filter((element, index , thisArray) => {
        return thisArray.indexOf(element, index+1) > -1;
        }) > 0;
}

function buildStudentInfoPromptString() {
    const promptStr = "请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：";
    console.log(promptStr);
}

function addStudentInfo() {
    rl.question("", (userInput) => {
        if (!checkInputFormat(userInput, "studentInfo")) {
            console.log("请按正确的格式输入（格式：姓名, 学号, 学科:成绩, ...）：");
            addStudentInfo();
            return;
        }
        const newStudentObj = new Student(userInput);
        if(!isExistThisStudent(newStudentObj)) {
            studentArray.push(newStudentObj);
            console.log(`学生${newStudentObj.name}的成绩被添加`);
        }else {
            studentArray.find((item) => {
                return item.studentID === newStudentObj.studentID;
            }).updateStudentScore(newStudentObj);
            console.log("该学生的成绩已经更新");
        }
        mainMenu();
    });

}

function addStudentScore() {
    buildStudentInfoPromptString();
    addStudentInfo();
}


