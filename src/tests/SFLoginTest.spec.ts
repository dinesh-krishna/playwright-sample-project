import SFHomeSteps from "@uiSteps/SFHomeSteps";
import RegistrationSteps from "@uiSteps/RegistrationSteps";
import { test } from "@base-test";
import Allure from "@allure";
import ExcelUtil from "@utils/ExcelUtil";

const SHEET = "SFLoginTest";
let home: SFHomeSteps;
test.beforeEach(async ({ page }) => {
    home = new SFHomeSteps(page);
});

const data1 = ExcelUtil.getTestData(SHEET, "TC01_SF_ValidLogin");
test(`${data1.TestID} - ${data1.Description}`, async () => {
    Allure.attachDetails(data1.Description, data1.Issue);
    await home.launchApplication();
    await home.login(data1.UserName, data1.Password);
    await home.validateLogin(data1.UserName);
    await home.logout();
});


