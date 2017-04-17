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

    rl.question("", (userInput) => {
        switch (userInput) {
            case "1":
                addStudentScore();
                break;
            case "2":
                printStudentReport();
                break;
            case "3":
                process.exit();
                break;
            default:
                break;
        }

    });

}

class Student {
    constructor(name, studentID, nation, sclass, scoreArray, totalScore, averageScore) {
        this.name = name;
        this.studentID = studentID;
        this.nation = nation;
        this.sclass = sclass;
        this.scoreArray = scoreArray;
        this.totalScore = totalScore;
        this.averageScore = averageScore;
    }

    updateStudentScore(studentObj) {
        studentObj.scoreArray.forEach((item) => {
            let sameItem = this.scoreArray.find((thisItem) => {
                return thisItem.course === item.course;
            });
            if(sameItem === undefined) {
                this.scoreArray.push(item);
            }else {
                for(let updateItem of this.scoreArray) {
                    if(updateItem.course === item.course) {
                        updateItem.score = item.course;
                    }
                }
            }
        });
        this.totalScore = 0;
        this.scoreArray.forEach((item) => {
            this.totalScore += Number(item.score);
        });
        this.averageScore = this.totalScore / this.scoreArray.length;
    }
}

function generateStudent(input) {
    const infoArray = input.split(",");
    const name = infoArray[0];
    const studentID = infoArray[1];
    const nation = infoArray[2];
    const sclass = infoArray[3];
    let scoreArray = [];
    const totalScore = 0;
    for (let i = 4; i < infoArray.length; i++) {
        this.scoreArray.push(Object.assign({}, {course: infoArray[i].split(":")[0], score: infoArray[i].split(":")[1]}));
        this.totalScore += Number(infoArray[i].split(":")[1]);
    }
    const averageScore = this.totalScore / this.scoreArray.length;
    return new Student(name, studentID, nation, sclass, scoreArray, totalScore, averageScore);
}

function checkStudentInfo(input) {
    return (/^[\u4e00-\u9fa5A-Za-z]+[,0-9]+[,\u4e00-\u9fa5A-Za-z]+[,\u4e00-\u9fa5A-Za-z]+([,\u4e00-\u9fa5A-Za-z]+[:0-9]*)*$/.test(input));
}

function checkStudentID(input) {
    return /^[0-9]+?[,0-9]*$/.test(input);
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
        if (!checkStudentInfo(userInput)) {
            console.log("请按正确的格式输入（格式：姓名, 学号, 学科:成绩, ...）：");
            addStudentInfo();
            return;
        }
        const newStudentObj = generateStudent(userInput);
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

function printStudentReport() {
    buildStudentReportPromptString();
    createReportByInputStudentID();
}

function buildStudentReportPromptString() {
    const promptStr = "请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：";
    console.log(promptStr);
}

function createReportByInputStudentID() {
    rl.question("", (userInput) => {
        if (!(checkStudentID(input) && isThisArrayContainsSameItem(input.split(",")))) {
            console.log("请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：");
            createReportByInputStudentID();
            return;
        }
        let reportStr = "成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n========================\n"
        // let reportStr = "成绩单\n";
        let reportStudent;
        let allStudentAverageScore = 0
        for(let ID of userInput.split(",")) {
            reportStudent = studentArray.find((item) => {
                return item.studentID === ID;
            });
            if(reportStudent === undefined) {
                console.log("所查询的某学生不存在,请从新输入");
                mainMenu();
                return;
            }
            reportStr += `${reportStudent.name}|`;
            for(let scoreItem of reportStudent.scoreArray) {
                reportStr += `${scoreItem.score}|`;
            }
            reportStr += `${reportStudent.averageScore}|${reportStudent.totalScore}\n`;
            allStudentAverageScore += reportStudent.averageScore;
        }
        reportStr += `========================\n全班总分平均数：${allStudentAverageScore}`;
        console.log(reportStr);
        mainMenu();
    });
}
mainMenu();