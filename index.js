const os = require('os')
const hostname = os.hostname()
const _log = console.log
const _info = console.info
const _warn = console.warn
const _error = console.error
const sid = genSession(22)
const date = new Date(Date.now()).toLocaleString()
const preFix = date + '|' + hostname + '|' + sid + '|'
const color = {
  Reset: '\x1b[0m',
  Red: '\x1b[31m',
  Green: '\x1b[32m',
  Yellow: '\x1b[33m',
  Blue: '\x1b[34m',
  Magenta: '\x1b[35m'
}

const explog = function (c) {
  logs()
  return function (req, res, next) {
    next()
  }
}

function logs (l) {
  switch (l) {
    case 'debug':
      l = 0
      break
    case 'info':
      l = 1
      break
    case 'warn':
      l = 2
      break
    case 'error':
      l = 3
      break
    default:
      l = 0
  }

  console.log = function (m) {
    _log(color.Reset + preFix + 'DEBUG ', ...arguments)
  }
  console.info = function (m) {
    _info(color.Blue + preFix + 'INFO ', ...arguments)
  }
  console.warn = function (m) {
    _warn(color.Yellow + preFix + 'WARN ', ...arguments)
  }
  console.error = function (m) {
    _error(color.Red + preFix + 'ERROR ', ...arguments, '\x1b[0m')
  }
}

function genSession (length) {
  return new Array(length).join().replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0).toString(36)[Math.random() < 0.5 ? 'toString' : 'toUpperCase']()
  })
}

module.exports = explog
