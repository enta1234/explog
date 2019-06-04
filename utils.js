const _log = console.log
const _info = console.info
const _warn = console.warn
const _error = console.error
const color = {
  Reset: '\x1b[0m',
  Red: '\x1b[31m',
  Green: '\x1b[32m',
  Yellow: '\x1b[33m',
  Blue: '\x1b[34m',
  Magenta: '\x1b[35m'
}

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

utils.prototype.income = (req, _, next) => {
  let income = 'incoming| __method=' + req.method + ' __url=' + req.originalUrl + ' __headers=' + JSON.stringify(req.headers) +
  ' __body=' + (req.method === 'GET' ? '' : req.body ? (Object.keys(req.body).length > 0 ? req.body : '') : null)
  console.log(income)
  next()
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
      _log(color.Reset + config.preFix + 'debug|', ...arguments)
    }
  }
}
function info (config) {
  console.info = function (m) {
    if (config.level <= 1) {
      _info(color.Blue + config.preFix + 'info|', ...arguments)
    }
  }
}
function warn (config) {
  console.warn = function (m) {
    if (config.level <= 2) {
      _warn(color.Yellow + config.preFix + 'warn|', ...arguments)
    }
  }
}
function error (config) {
  console.error = function (m) {
    _error(color.Red + config.preFix + 'error|', ...arguments)
  }
}

module.exports = utils
