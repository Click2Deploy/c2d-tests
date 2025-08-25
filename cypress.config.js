const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const envPath = process.env.ENV_FILE || '.env';
require('dotenv').config({ path: envPath });

const { CYPRESS_API_BASE_URL, CYPRESS_PROJECT_URL, CYPRESS_HOME_URL } = process.env;

module.exports = defineConfig({

  // Removed cypress-mochawesome-reporter config
  // We now only rely on mocha-multi-reporters via reporter-config.json

  retries: {
    runMode: 1,
    openMode: 0,
  },

  chromeWebSecurity: false,

  env: {
    apiUrl: CYPRESS_API_BASE_URL,
    projectUrl: CYPRESS_PROJECT_URL,
  },

  e2e: {
    baseUrl: CYPRESS_HOME_URL,
    downloadsFolder: "cypress/downloads",
    projectId: '9rdogy',

    setupNodeEvents(on, config) {
      // 🔴 Removed require('cypress-mochawesome-reporter/plugin')(on);

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
                return resolve(files[0].name);
              }

              if (Date.now() - startTime > timeout) {
                return reject(new Error("File download timed out"));
              }

              setTimeout(checkForFile, 500);
            };

            checkForFile();
          });
        },

        unzipFile({ zipPath, extractTo }) {
          const zip = new AdmZip(zipPath);
          zip.extractAllTo(extractTo, true);

          const extractedFiles = fs.readdirSync(extractTo);
          return extractedFiles;
        },
      });

      return config;
    },

    viewportHeight: 660,
    viewportWidth: 1000,
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
