const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const AdmZip = require('adm-zip');

module.exports = defineConfig({

  "retries":{
    "runMode":1,
    "openMode":0
  },

  // reporter: 'cypress-mochawesome-reporter',
  chromeWebSecurity: false,
  env: {
    CYPRESS_API_BASE_URL: process.env.CYPRESS_API_BASE_URL,
    CYPRESS_PROJECT_URL: process.env.CYPRESS_PROJECT_URL,
    CYPRESS_HOME_URL: process.env.CYPRESS_HOME_URL,
  },

  e2e: {
   downloadsFolder: "cypress/downloads", // Set custom downloads folder
   projectId: 'an8tkj',
    //  projectId: 'zu4k8a',
    setupNodeEvents(on, config) {

      // require('cypress-mochawesome-reporter/plugin')(on);

      on('task', {
        getLatestFile() {
          const downloadsFolder = 'cypress/downloads';
          const files = fs.readdirSync(downloadsFolder);

          const sortedFiles = files
            .map((fileName) => ({
              name: fileName,
              time: fs.statSync(path.join(downloadsFolder, fileName)).mtime.getTime(),
            }))
            .sort((a, b) => b.time - a.time);

          return sortedFiles.length ? path.join(downloadsFolder, sortedFiles[0].name) : null;
        },

        // Task to wait for a ZIP file to be fully downloaded
        waitForDownload({ folderPath, fileType, timeout = 20000 }) {
          return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const checkForFile = () => {
              const files = fs.readdirSync(folderPath)
                .filter((file) => file.endsWith(`.${fileType}`))
                .map((file) => ({
                  name: file,
                  time: fs.statSync(path.join(folderPath, file)).mtime.getTime(),
                }))
                .sort((a, b) => b.time - a.time);

              if (files.length) {
                return resolve(files[0].name); // Return latest file name
              }

              if (Date.now() - startTime > timeout) {
                return reject(new Error("File download timed out"));
              }

              setTimeout(checkForFile, 500); // Check again after 500ms
            };

            checkForFile();
          });
        },

        // Task to unzip a file and return its contents
        unzipFile({ zipPath, extractTo }) {
          const zip = new AdmZip(zipPath);
          zip.extractAllTo(extractTo, true);

          const extractedFiles = fs.readdirSync(extractTo);
          return extractedFiles; // Return list of extracted files
        },
      });

      return config;

      // return {
      //   browsers: config.browsers.filter(
      //     (b) => b.family === 'chromium' && b.name === 'chrome'
      //   ),
      // }
    },
    baseUrl: 'https://www.google.com/',
    viewportHeight: 660,
    viewportWidth: 1000,
    // The specPattern should be part of the e2e object, not inside setupNodeEvents

  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
