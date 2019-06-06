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

const Os = require('os')
const Utils = require('./utils')
const OnHeader = require('on-headers')
const hostname = Os.hostname()

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
  return (req, res, next) => {
    utils.income(req, res)

    OnHeader(res, () => {
      const log = 'outgoing| __status_code=' + res.statusCode + ' __headers=' + JSON.stringify(res._headers) +
      ' __body=' + (res.body || null) +
      ' __response_time=' + (Date.now() - req.requestTime) + 'ms'
      console.log(log)
    })

    next()
  }
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
