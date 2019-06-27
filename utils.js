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
const Os = require('os')
const hostname = Os.hostname()
// const color = {
//   Reset: '\x1b[0m',
//   Red: '\x1b[31m',
//   Green: '\x1b[32m',
//   Yellow: '\x1b[33m',
//   Blue: '\x1b[34m',
//   Magenta: '\x1b[35m'
// }

let opt = {}

function utils (config) {
  opt = config
  opt.level = config.level === 'debug' ? config.level = 0 : config.level === 'info' ? config.level = 1 : config.level === 'warn' ? config.level = 2 : config.level === 'error' ? config.level = 3 : 0
}

utils.prototype.inComing = (req) => {
  req.requestTime = Date.now()
  if (!opt.multiple) {
    const income = 'incoming| __method=' + req.method + ' __url=' + req.originalUrl + ' __headers=' + JSON.stringify(req.headers) +
    ' __body=' + JSON.stringify(req.body)
    console.log(income)
  } else {
    console.log('incoming| __method=' + req.method + ' __url=' + req.originalUrl)
    console.log('__headers=' + JSON.stringify(req.headers))
    console.log('__body=' + JSON.stringify(req.body))
  }
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
    if (chunk && typeof chunk === Object) {
      chunks.push(chunk) 
      res.body = Buffer.concat(chunks).toString('utf8')
      oldEnd.apply(res, arguments)
    } else {
      if (!opt.multiple) {
        const log = 'outgoing| __status_code=' + res.statusCode + ' __headers=' + JSON.stringify(res._headers) +
          ' __body=' + chunk.split(/\r\n|\r|\n/g) +
          ' __response_time=' + (Date.now() - res.req.requestTime) + 'ms'
        console.log(log)
      } else {
        console.log('outgoing| __status_code=' + res.statusCode)
        console.log('__headers=' + JSON.stringify(res._headers))
        console.log('__body=' + chunk.split(/\r\n|\r|\n/g))
        console.log('__response_time=' + (Date.now() - res.req.requestTime) + 'ms')
      }
    }
  }
}

utils.prototype.outGoing = async (req, res) => {
  res.on('finish', () => {
    if (!opt.multiple) {
      const log = 'outgoing| __status_code=' + res.statusCode + ' __headers=' + JSON.stringify(res._headers) +
        ' __body=' + JSON.stringify(res.body) +
        ' __response_time=' + (Date.now() - req.requestTime) + 'ms'
      console.log(log)
    } else {
      console.log('outgoing| __status_code=' + res.statusCode)
      console.log('__headers=' + JSON.stringify(res._headers))
      console.log('__body=' + JSON.stringify(res.body))
      console.log('__response_time=' + (Date.now() - req.requestTime) + 'ms')
    }
  })
}

utils.prototype.consoleLog = () => {
  warn(opt)
  info(opt)
  debug(opt)
  error(opt)
}

utils.prototype.getSession = ({ preFix, session }) => {
  // interim code after this verion will gen from regular expressions.
  if (typeof session !== 'number') {
    throw new TypeError('session must be number')
  } else if (session > 3) {
    throw new RangeError('session out of range, must be 0-3')
  }

  let transection = ''
  switch (session) {
    case 0:
      break
    case 1:
      transection = genarater(1, 22)
      break
    case 2:
      transection = genarater(2, 22)
      break
    case 3:
      transection = genarater(3, 22)
      break
    default:
      break
  }

  if (typeof preFix === 'boolean' && preFix === true && session !== 0 && session < 4) {
    return new Date(Date.now()).toLocaleString() + '|' + hostname + '|' + transection
  } else if (typeof preFix === 'boolean' && preFix === true && session === 0) {
    return new Date(Date.now()).toLocaleString() + '|' + hostname
  } else if (typeof preFix !== 'boolean' && session !== 0) {
    return preFix + '|' + transection
  } else {
    return preFix
  }
}

function debug (config) {
  console.log = function (m) {
    if (config.level === 0) {
      config.preFix
        ? _log(config.txtPreFix + '|debug|', ...arguments)
        : _log(...arguments)
    }
  }
}
function info (config) {
  console.info = function (m) {
    if (config.level <= 1) {
      config.preFix
        ? _info(config.txtPreFix + '|info|', ...arguments)
        : _info(...arguments)
    }
  }
}
function warn (config) {
  console.warn = function (...m) {
    if (config.level <= 2) {
      config.preFix
        ? _warn(config.txtPreFix + '|warn|', ...arguments)
        : _warn(...arguments)
    }
  }
}
function error (config) {
  console.error = function (m) {
    config.preFix
      ? _error(config.txtPreFix + '|error|', ...arguments)
      : _error(...arguments)
  }
}

const genarater = (schema, length) => {
  switch (schema) {
    case 1:
      return new Array(length).join().replace(/(.|$)/g, function () {
        return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
      })
    case 2:
      const alp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      return new Array(length).join().replace(/(.|$)/g, function () {
        return alp.charAt(Math.floor(Math.random() * alp.length))
      })
    case 3:
      return new Array(length).join().replace(/(.|$)/g, function () {
        return Math.floor(Math.random() * (9 - 0 + 1) + 0)
      })
    default:
      break
  }
}

module.exports = utils
