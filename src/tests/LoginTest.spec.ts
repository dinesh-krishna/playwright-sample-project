import HomeSteps from "@uiSteps/HomeSteps";
import RegistrationSteps from "@uiSteps/RegistrationSteps";
import { test } from "@base-test";
import Allure from "@allure";
import ExcelUtil from "@utils/ExcelUtil";

const SHEET = "LoginTest";
let home: HomeSteps;
test.beforeEach(async ({ page }) => {
    home = new HomeSteps(page);
});

const data1 = ExcelUtil.getTestData(SHEET, "TC01_ValidLogin");
test(`${data1.TestID} - ${data1.Description}`, async () => {
    Allure.attachDetails(data1.Description, data1.Issue);
    await home.launchApplication();
    await home.login(data1.UserName, data1.Password);
    await home.validateLogin(data1.UserName);
    await home.logout();
});

const data2 = ExcelUtil.getTestData(SHEET, "TC02_InValidLogin");
test(`${data2.TestID} - ${data2.Description}`, async () => {
    Allure.attachDetails(data2.Description, data2.Issue);
    await home.launchApplication();
    await home.login(data2.UserName, data2.Password);
    await home.validateInvalidLogin(data2.ErrorMessage);
});

const data3 = ExcelUtil.getTestData(SHEET, "TC03_LoginCreateAccount");
test(`${data3.TestID} - ${data3.Description}`, async ({ page }) => {
    Allure.attachDetails(data3.Description, data3.Issue);
    await home.launchApplication();
    await home.navigateToCreateAccount();
    const register = new RegistrationSteps(page);
    await register.alreadyHaveAccount();
    await home.enterLoginDetails(data3.UserName, data3.Password);
    await home.validateLogin(data3.UserName);
    await home.logout();
});


const data4 = ExcelUtil.getTestData(SHEET, "TC04_ValidLogin");
test(`${data4.TestID} - ${data4.Description}`, async () => {
    Allure.attachDetails(data4.Description, data4.Issue);
    await home.launchApplication();
    await home.login(data4.UserName, data4.Password);
    await home.validateLogin(data4.UserName);
    await home.logout();
});

const data5 = ExcelUtil.getTestData(SHEET, "TC05_InValidLogin");
test(`${data5.TestID} - ${data5.Description}`, async () => {
    Allure.attachDetails(data5.Description, data5.Issue);
    await home.launchApplication();
    await home.login(data5.UserName, data5.Password);
    await home.validateInvalidLogin(data5.ErrorMessage);
});

const data6 = ExcelUtil.getTestData(SHEET, "TC06_LoginCreateAccount");
test(`${data6.TestID} - ${data6.Description}`, async ({ page }) => {
    Allure.attachDetails(data6.Description, data6.Issue);
    await home.launchApplication();
    await home.navigateToCreateAccount();
    const register = new RegistrationSteps(page);
    await register.alreadyHaveAccount();
    await home.enterLoginDetails(data6.UserName, data6.Password);
    await home.validateLogin(data6.UserName);
    await home.logout();
});




