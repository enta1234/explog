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
const fs = require('fs')
const path = require('path')

let opt
let streamTesk = {
  app: []
}

function utils (config) {
  opt = config
  opt.level = config.level === 'debug' ? config.level = 0 : config.level === 'info' ? config.level = 1 : config.level === 'warn' ? config.level = 2 : config.level === 'error' ? config.level = 3 : 0

  createStream(config.appLog.path)
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

utils.prototype.getBody = (res) => {
  var oldWrite = res.write
  var oldEnd = res.end
  var chunks = []
  res.write = function (chunk) {
    chunks.push(chunk)
    oldWrite.apply(res, arguments)
  }
  res.end = function (chunk) {
    if (chunk && typeof chunk === 'object') {
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

utils.prototype.outGoing = (req, res) => {
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

utils.prototype.consoleLog = (conf) => {
  debug(conf)
  info(conf)
  warn(conf)
  error(conf)
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
    if (config.console && config.level === 0) {
      config.preFix
        ? _log(config.txtPreFix + '|debug|', ...arguments)
        : _log(...arguments)
    }
    if (config.writeFile && config.level === 0 && streamTesk.app) {
      config.preFix
        ? writeLog(config.txtPreFix + '|debug|', ...arguments)
        : writeLog(...arguments)
    }
  }
}
function info (config) {
  console.info = function (m) {
    if (config.console && config.level <= 1) {
      config.preFix
        ? _info(config.txtPreFix + '|info|', ...arguments)
        : _info(...arguments)
    }
    if (config.writeFile && config.level <= 1 && streamTesk.app) {
      config.preFix
        ? writeLog(config.txtPreFix + '|info|', ...arguments)
        : writeLog(...arguments)
    }
  }
}
function warn (config) {
  console.warn = function (...m) {
    if (config.console && config.level <= 2) {
      config.preFix
        ? _warn(config.txtPreFix + '|warn|', ...arguments)
        : _warn(...arguments)
    }
    if (config.writeFile && config.level <= 2 && streamTesk.app) {
      config.preFix
        ? writeLog(config.txtPreFix + '|warn|', ...arguments)
        : writeLog(...arguments)
    }
  }
}
function error (config) {
  console.error = function (m) {
    if (config.console) {
      config.preFix
        ? _error(config.txtPreFix + '|error|', ...arguments)
        : _error(...arguments)
    }
    if (config.writeFile && streamTesk.app) {
      config.preFix
        ? writeLog(config.txtPreFix + '|error|', ...arguments)
        : writeLog(...arguments)
    }
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

function createStream (dir) {
  if (fs.existsSync(dir)) {
    try {
      streamTesk.app = fs.createWriteStream(path.join(dir, 'appLog.log'), { flags: 'a' })
    } catch (error) {
      console.log('error: ', error)
      throw error
    }
  } else {
    fs.mkdirSync(dir)
    createStream(dir)
  }
}

function writeLog (...log) {
  try {
    const reTxt = formatLog(...log)
    streamTesk.app.write(reTxt + '\r\n')
  } catch (error) {
    console.log('error: ', error)
  }
}

function formatLog (...txts) {
  let retStr = ''
  if (txts instanceof Array) {
    if (txts.length > 0) {
      for (let i = 0, max = txts.length; i < max; i++) {
        retStr += (i === 1 ? '' : ' ') + toStr(txts[i])
      }
    } else {
      retStr = txts[0]
    }
  } else {
    retStr = toStr(txts)
  }
  return retStr
}

function toStr (txt) {
  if (txt instanceof Error) {
    return txt.stack
  } else if (txt instanceof Object) {
    return JSON.stringify(txt)
  } else {
    return txt
  }
}

module.exports = utils
