const app_list = require('./../app_list.json')
const path = require('path')
const fs = require('fs')

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
module.exports = async function (req, res) {
    const fl = fs.readFileSync(path.join(__dirname, './../../bin/cmd.js'))
    res.send(fl)
}