'use strict';
describe("MainMenu test",() => {
    it("test mainmenu is right",() => {
        spyOn(console,'log');
        const printStr = "1.添加学生\n2.生成成绩单\n3.退出\n4.请输入你的选择（1～3）：";
        mainMenu();

        expect(console.log).toHaveBeenCalledWith(printStr);
    });
});