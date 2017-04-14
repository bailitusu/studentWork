'use strict';
xdescribe("MainMenu test", () => {
    it("test mainmenu is right", () => {
        spyOn(console, 'log');
        const printStr = "1.添加学生\n2.生成成绩单\n3.退出\n4.请输入你的选择（1～3）：";
        mainMenu();

        expect(console.log).toHaveBeenCalledWith(printStr);
    });
});

describe("test print prompt string when build student info", () => {
    it("print prompt is right", () => {
        spyOn(console, 'log');
        const printStr = "请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：";
        buildStudentInfoPromptString();

        expect(console.log).toHaveBeenCalledWith(printStr);
    });
});

describe("test input format ", () => {
    it("input studentInfo is right", () => {
        const inputStr = "zc,111,hanzu,class,math:99,chinese:99";
        const type = "studentInfo";

        expect(checkInputFormat(inputStr, type)).toBe(true);
    });

    it("input studentID is right", () => {
        const inputStr = "222,111,543,444";
        const type = "studentID";

        expect(checkInputFormat(inputStr, type)).toBe(true);
    });
});

describe("test input same studentID", () => {
    it("input same studentID", () => {
        const inputArray = [222, 111, 111, 333];

        expect(isThisArrayContainsSameItem(inputArray)).toBe(true);
    });
});