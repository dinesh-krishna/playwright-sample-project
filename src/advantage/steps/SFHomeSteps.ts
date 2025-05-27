import test, { Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import Assert from "@asserts/Assert";
import CommonConstants from "@uiConstants/CommonConstants";
import SFHomePageConstants from "@uiConstants/SFHomePageConstants";
import SFHomePage from "@pages/SFHomePage";

export default class SFHomeSteps {    
    private ui: UIActions;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }
    /**
     * Launch the Application
     */
    public async launchApplication() {
        await test.step(`Launching the application`, async () => {
            await this.ui.goto(process.env.SF_UAT_URL, SFHomePageConstants.HOME_PAGE);
        });
    }
    /**
     * Log into the application
     * @param userName 
     * @param password 
     */
    public async login(userName: string, password: string) {
        await test.step(`Login to application credentials as ${userName} & ${password}`, async () => {
            await this.ui.element(SFHomePage.USER_ICON, SFHomePageConstants.USER_ICON).click();
            await this.enterLoginDetails(userName, password);
        });        
    }
    /**
     * Enter login details
     * @param userName 
     * @param password 
     */
    public async enterLoginDetails(userName: string, password: string) {
        await test.step(`Enter login credentials as ${userName} & ${password}`, async () => {
            await this.ui.editBox(SFHomePage.USER_NAME_TEXTBOX, SFHomePageConstants.USER_NAME).fill(userName);
            await this.ui.editBox(SFHomePage.PASSWORD_TEXTBOX, SFHomePageConstants.PASSWORD).fill(password);
            await this.ui.checkbox(SFHomePage.REMEMBER_ME_CHECKBOX, SFHomePageConstants.REMEMBER_ME_CHECKBOX).check();
            await this.ui.element(SFHomePage.SIGN_IN_BUTTON, SFHomePageConstants.SIGN_IN_BUTTON).click();
        });
    }
    /**
     * Validate logged in user
     * @param userName 
     */
    public async validateLogin(userName: string) {
        await test.step(`Verify that user is successfully logged in as ${userName}`, async () => {
            const user = await this.ui.element(SFHomePage.LOGGED_IN_USER, SFHomePageConstants.USER_NAME).getTextContent();
            await Assert.assertEquals(user, userName, SFHomePageConstants.USER_NAME);
        });        
    }
    /**
     * Validate invalid login
     * @param errorMessage 
     */
    public async validateInvalidLogin(errorMessage: string) {
        await test.step(`Verify that error message ${errorMessage}`, async () => {
            const user = await this.ui.element(SFHomePage.SIGN_IN_ERROR_MESSAGE, SFHomePageConstants.SIGN_IN_ERROR_MESSAGE)
                .getTextContent();
            await Assert.assertEquals(user, errorMessage, SFHomePageConstants.SIGN_IN_ERROR_MESSAGE);
        });
    }
    /**
     * Log out of the application
     */
    public async logout() {
        await test.step(`Logged out of application`, async () => {
            await this.ui.element(SFHomePage.LOGGED_IN_USER, SFHomePageConstants.USER_NAME).click();
            await this.ui.element(SFHomePage.SIGN_OUT_LINK, SFHomePageConstants.SIGN_OUT_LINK).click();
            await this.ui.pauseInSecs(CommonConstants.TWO);
        });
    }
    /**
     * Navigate to Create Account page
     */
    public async navigateToCreateAccount() {
        await test.step(`Navigate to Create Account page`, async () => {
            await this.ui.element(SFHomePage.USER_ICON, SFHomePageConstants.USER_ICON).click();
            await this.ui.element(SFHomePage.CREATE_NEW_ACCOUNT_LINK, SFHomePageConstants.CREATE_NEW_ACCOUNT_LINK).click();
        });
    }
    /**
     * Enters details into Contact Us
     * @param category 
     * @param product 
     * @param email 
     * @param subject 
     */
    public async enterContactUsDetails(category: string, product: string, email: string, subject: string) {
        await test.step(`Entering Contact Us details`, async () => {
            await this.ui.dropdown(SFHomePage.CATEGORY_DROPDOWN, SFHomePageConstants.CATEGORY_DROPDOWN)
                .selectByVisibleText(category);
            await this.ui.dropdown(SFHomePage.PRODUCT_DROPDOWN, SFHomePageConstants.PRODUCT_DROPDOWN)
                .selectByVisibleText(product);
            await this.ui.editBox(SFHomePage.EMAIL_TEXTBOX, SFHomePageConstants.EMAIL_TEXTBOX).fill(email);
            await this.ui.editBox(SFHomePage.SUBJECT_TEXTAREA, SFHomePageConstants.SUBJECT_TEXTAREA).fill(subject);
        });
    }
    /**
     * Click on Send button of Contact Us
     */
    public async sendMessage() {
        await test.step(`Click on Send button of Contact Us`, async () => {
            await this.ui.element(SFHomePage.SEND_BUTTON, SFHomePageConstants.SEND_BUTTON).click();
        });
    }
    /**
     * Verify the success message of Contact Us
     * @param message 
     */
    public async verifySuccessMessage(message: string) {
        await test.step(`Verifying Success Message of Contact Us`, async () => {
            const actualMessage = await this.ui.element(SFHomePage.CONTACT_US_MESSAGE,
                SFHomePageConstants.CONTACT_US_MESSAGE).getTextContent();
            await Assert.assertEquals(actualMessage, message, SFHomePageConstants.CONTACT_US_MESSAGE);
        });
    }
    /**
     * Search for Product
     * @param product 
     */
    public async searchProduct(product: string) {
        await test.step(`Searching for product '${product}'`, async () => {
            await this.ui.element(SFHomePage.SEARCH_ICON, SFHomePageConstants.SEARCH_ICON).click();
            await (await this.ui.editBox(SFHomePage.SEARCH_TEXTBOX, SFHomePageConstants.SEARCH_TEXTBOX).type(product))
                .keyPress(SFHomePageConstants.ENTER_KEY);
            await this.ui.element(SFHomePage.SEARCH_CLOSE_IMAGE, SFHomePageConstants.SEARCH_CLOSE_IMAGE).click();
        });
    }
    /**
     * Navigate to Management Console screen
     */
    public async navigateToManagementConsole() {
        let newPage: Page;
        await test.step(`Navigate to Management Console screen`, async () => {
            await this.ui.waitForLoadingImage();
            await this.ui.element(SFHomePage.HELP_ICON, SFHomePageConstants.HELP_ICON).click();
            newPage = await this.ui.switchToNewWindow(SFHomePage.MANAGEMENT_CONSOLE_LINK,
                SFHomePageConstants.MANAGEMENT_CONSOLE_LINK);
        });
        return newPage;
    }
}
