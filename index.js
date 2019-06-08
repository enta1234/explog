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
const hostname = Os.hostname()

let cf = {
  level: 'debug',
  transecLog: true,
  multiple: false,
  preFix: true
}

/**
 * configarution do you need.
 * @param {String} **level** level for write debug, info, warn, error | 'debug' is default.
 * @param {Boolean} **transecLog** transections log have _incoming and outgoing will display headers url method body queryString and response messages of express | true is default.
 * @param {Boolean} **multiple** display transections log to multiple line | false is default
 * @param {Boolean} **preFix** pre-fix of log have date hostname session | true is default.
 */
const explog = function (options) {
  const conf = mapConfig(options)
  const utils = new Utils(conf)
  if (conf.preFix) {
    conf.preFix = conf.preFix !== true ? conf.preFix : (new Date(Date.now()).toLocaleString() + '|' + hostname)
  }

  utils.consoleLog(conf)
  return (req, res, next) => {
    utils.inComing(req)
    utils.getBody(res)
    utils.outGoing(req, res)
    next()
  }
}

function mapConfig (options) {
  if (options) {
    cf.level = options.level ? options.level.toLowerCase() : cf.level
    cf.transecLog = options.transecLog || cf.transecLog
    cf.multiple = options.multiple || cf.multiple
    cf.preFix = options.preFix === undefined ? cf.preFix : options.preFix
  }
  return cf
}

module.exports = explog
