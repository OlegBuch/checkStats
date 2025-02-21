const { By, Builder, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { CREDS, URLS } = require('../settings/settings');
let driver = new Builder().forBrowser('chrome')
    //to run via docker
    //.usingServer('http://localhost:4444/wd/hub/')
    //to run locally 
    /* .setChromeOptions(
        new chrome.Options().headless()) */
    .build();

const selectors = {
    inputUsername: By.name('username'),
    inputPassword: By.name('password'),
    loginBtn: By.css('button:nth-child(2)'),
    defaultLink: By.css('.url--1isxt'),
    runReportBtn: By.xpath('//button[contains(text(), "Run Report")]'),
    clicksValue: By.xpath('//div[contains(@class, "clicks-value-class")]')
}

module.exports = class Page {
    async open(path) {
        return await driver.get(path);
    }

    async login(username, password) {
        await driver.findElement(selectors.inputUsername).sendKeys(username, Key.TAB);
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
