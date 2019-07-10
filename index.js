/*!
 * explog
 * Copyright(c) 2019 Chantatha Polsamak ucode
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

const Utils = require('./utils')
const path = require('path')

let cf = {
  level: 'debug',
  transecLog: true,
  multiple: false,
  preFix: true,
  txtPreFix: '',
  session: 0,
  console: true,
  writeFile: false,
  appLog: {
    path: path.join(__dirname, 'logs'),
    timeRotate: 60
  }
}

/**
 * configarution do you need.
 * @param {String} **level** level for write debug, info, warn, error | 'debug' is default.
 * @param {Boolean} **transecLog** transections log have _incoming and outgoing will display headers url method body queryString and response messages of express | true is default.
 * @param {Boolean} **multiple** display transections log to multiple line | false is default
 * @param {Boolean} **preFix** pre-fix of log have date hostname session | true is default.
 * @param {Number} **session** have 4 option 0 mean don't create session, 1 mean random a-zA-Z0-9 22 digits 2 mean random only alphabet 22 digits and 3 mean only number 22 digits | 0 is default
 * @param {Boolean} **console** true is default
 * @param {Boolean} **writeFile** false is default
 * @param {Number} **timeRotate** default 60 minute, this config will be rotation log file.
 */
const explog = function (options) {
  const conf = mapConfig(options)
  const utils = new Utils(conf)
  conf.txtPreFix = utils.getSession(conf)
  utils.consoleLog(conf)

  return (req, res, next) => {
    conf.txtPreFix = utils.getSession(conf)
    if (conf.transecLog) {
      utils.inComing(req)
      utils.getBody(res)
      utils.outGoing(req, res)
    }
    next()
  }
}

function mapConfig (options) {
  if (options) {
    cf.level = options.level ? options.level.toLowerCase() : cf.level
    cf.transecLog = options.transecLog === false ? options.transecLog : cf.transecLog
    cf.multiple = options.multiple || cf.multiple
    cf.session = options.session || cf.session
    cf.preFix = options.preFix === undefined ? cf.preFix : options.preFix
    cf.console = options.console === false ? options.console : cf.console
    cf.writeFile = options.writeFile === true ? options.writeFile : cf.writeFile
    cf.appLog.timeRotate = options.appLog ? options.appLog.timeRotate : cf.appLog.timeRotate
    cf.appLog.path = options.appLog ? options.appLog.path : cf.appLog.path
  }
  return cf
}

module.exports = explog
