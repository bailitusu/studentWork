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
        }
        rl.close();
    });
}
