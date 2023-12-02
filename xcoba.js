const colum = require('columnify')
const path = require('path')
const json = require('./assets/audience.json')
const { execSync } = require('child_process')

const cmd = `
node bin/git.js push-generate
node bin/s_build.js
`
execSync(cmd, {stdio: "inherit"})