`use strict`;

const {LoginStatsPage, login, open, closeBrowser, getClickValues, openDashboardAndOpenLink} = require('../po/login-stats.po');
const {URLS, CREDS} =  require('../settings/settings');

const assert = require("assert");


describe(`Check that clicks value is increased`, () => {
    after((done) => {
        closeBrowser();
        done();
    });

    it(`Login to the app and check stats page/get clicks and then compare clicks numbers`, async () => {
        //Login to the app and get clicks value
        await open(URLS.loginUrl);
        await login(CREDS.login, CREDS.password);
        let initialClicks = await getClickValues();
        
        //Proceed and navigate to default Url
        await openDashboardAndOpenLink();
        
        //wait 80 secs and get new click value and make an assertion
        setTimeout(async function(){
            let finalClicks = await getClickValues();
            assert(parseInt(finalClicks)==parseInt(initialClicks+1));
        }, 80000);
    }).timeout(12000);
});
