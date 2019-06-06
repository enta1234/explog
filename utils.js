/*!
 * explog - utils
 * Copyright(c) 2019 Chantatha Polsamak ucode
 * MIT Licensed
 */

'use strict'
const _log = console.log
const _info = console.info
const _warn = console.warn
const _error = console.error
// const color = {
//   Reset: '\x1b[0m',
//   Red: '\x1b[31m',
//   Green: '\x1b[32m',
//   Yellow: '\x1b[33m',
//   Blue: '\x1b[34m',
//   Magenta: '\x1b[35m'
// }

let conf = {}

function utils (config) {
  conf = config
  conf.level = config.level === 'debug' ? config.level = 0 : config.level === 'info' ? config.level = 1 : config.level === 'warn' ? config.level = 2 : config.level === 'error' ? config.level = 3 : 0
}

utils.prototype.ramdomString = (length) => {
  return new Array(length).join().replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
  })
}

utils.prototype.inComing = (req) => {
  const income = 'incoming| __method=' + req.method + ' __url=' + req.originalUrl + ' __headers=' + JSON.stringify(req.headers) +
  ' __body=' + (req.method === 'GET' ? '' : req.body ? (Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : null) : null)

  req.requestTime = Date.now()

  console.log(income)
}

utils.prototype.getBody = async (res) => {
  var oldWrite = res.write
  var oldEnd = res.end
  var chunks = []
  res.write = function (chunk) {
    chunks.push(chunk)
    oldWrite.apply(res, arguments)
  }
  res.end = function (chunk) {
    if (chunk) { chunks.push(chunk) }
    res.body = Buffer.concat(chunks).toString('utf8')
    oldEnd.apply(res, arguments)
  }
}

utils.prototype.outGoing = async (req, res) => {
  res.on('finish', () => {
    const log = 'outgoing| __status_code=' + res.statusCode + ' __headers=' + JSON.stringify(res._headers) +
    ' __body=' + (res.body || null) +
    ' __response_time=' + (Date.now() - req.requestTime) + 'ms'
    console.log(log)
  })
}

utils.prototype.consoleLog = () => {
  warn(conf)
  info(conf)
  debug(conf)
  error(conf)
}

function debug (config) {
  console.log = function (m) {
    if (config.level === 0) {
      config.preFix
        ? _log(config.preFix + '|debug|', ...arguments)
        : _log(...arguments)
    }
  }
}
function info (config) {
  console.info = function (m) {
    if (config.level <= 1) {
      config.preFix
        ? _info(config.preFix + '|info|', ...arguments)
        : _info(...arguments)
    }
  }
}
function warn (config) {
  console.warn = function (...m) {
    if (config.level <= 2) {
      config.preFix
        ? _warn(config.preFix + '|warn|', ...arguments)
        : _warn(...arguments)
    }
  }
}
function error (config) {
  console.error = function (m) {
    config.preFix
      ? _error(config.preFix + '|error|', ...arguments)
      : _error(...arguments)
  }
}

module.exports = utils
