const { By, Builder, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { CREDS, URLS } = require('../settings/settings');
let driver = new Builder().forBrowser('chrome')
.setChromeOptions(
    new chrome.Options().headless())
    .build();

const selectors = {
    inputUsername: By.name('username'),
    inputPassword: By.name('password'),
    loginBtn: By.className('Button--3Zfc6'),
    defaultLink: By.css('.url--1isxt'),
    runReportBtn: By.css('button.Button_primaryVariant--2m7ad'),
    clicksValue: By.xpath('/html/body/div/div/div/div/section/div[1]/div[2]/div/div[2]/div/div/div[1]/div/div[2]/div[2]/div/div[13]')
}

module.exports = class Page {
    async open(path) {
        return await driver.get(path);
    }

    async login(username, password) {
        await driver.findElement(selectors.inputUsername).sendKeys(username, Key.TAB);;
        await driver.findElement(selectors.inputPassword).sendKeys(password, Key.TAB);
        await driver.findElement(selectors.loginBtn).click();
        await driver.wait(until.elementLocated(selectors.defaultLink), 3000);
    }
    async getClickValues() {
        await driver.get(URLS.statisticsUrl);
        await driver.wait(until.elementLocated(selectors.runReportBtn), 3000);
        await driver.findElement(selectors.runReportBtn).click();
        await driver.wait(until.elementLocated(selectors.clicksValue), 6000);
        return await driver.findElement(selectors.clicksValue).getText();
    }

    async openDashboardAndOpenLink() {
        await driver.get(URLS.dashboardUrl);
        await driver.wait(until.elementLocated(selectors.defaultLink), 3000);
        await driver.get(await driver.findElement(selectors.defaultLink).getText());
    }

    async closeBrowser() {
        await driver.quit();
    }
}
