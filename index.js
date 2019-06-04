'use strict'

/**
 *
 */

const os = require('os')
const Utils = require('./utils')
const hostname = os.hostname()

let cf = {
  level: 'debug',
  transecLog: true,
  isPreFix: true,
  preFix: ''
}

/**
 * configarution do you need.
 * @param {String} **level** level for write _debug, info, warn, error | 'debug' is default._
 * @param {Boolean} **transecLog** transections log have _incoming and outgoing will display headers url method body queryString and response messages of express | true is default._
 * @param {Boolean} **isPreFix** pre-fix of log have _date hostname session | true is default._
 */
const explog = function (config) {
  const conf = mapConfig(config)
  const utils = new Utils(conf)
  if (conf.isPreFix) {
    const sid = utils.ramdomString(22)
    const date = new Date(Date.now()).toLocaleString()
    conf.preFix = date + '|' + hostname + '|' + sid + '|'
  }

  utils.consoleLog(conf)

  return utils.income
}

function mapConfig (config) {
  if (config) {
    cf.level = config.level.toLowerCase() || cf.level
    cf.transecLog = config.transecLog || cf.transecLog
    cf.isPreFix = config.isPreFix === undefined ? cf.isPreFix : config.isPreFix === cf.isPreFix
  }
  return cf
}

module.exports = explog
