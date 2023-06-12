# checkStats
A test repo to see how stats values(clicks) are increased/updated on certain page of the application

In order to start the test please make sure that: 
1. Node.js is installed in your system https://nodejs.org/en/download
2. npx is installed as well - https://www.npmjs.com/package/npx
3. Once you clone/pulled this repo build the modules with `npm install`
4. Update credentials variable with a real user variable at `./settings/settings.js`
4. Run a test with a command `npx mocha ./tests/checkClicks.spec.js`
5. To run a test through docker make sure you pull `selenium/standalone-chrome image` - then run a command
`docker run -d -p 4444:4444 --shm-size=2g selenium/standalone-chrome` and then run a test
