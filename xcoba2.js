const root = require('child_process').execSync('npm root -g').toString().trim()
const papa = require(`${root}/papaparse`)