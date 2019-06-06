# explog
Request and response logger middleware for node.js

# API

`const Explog = require('explog')`

 explog(option)

Create a logger middleware function using the given format and options.

## options
 - **level** level for write debug, info, warn, error and 'debug' is default.
 - **transecLog** transections log have incoming and outgoing will display headers url method body queryString and response messages of express | true is default.
 - **preFix** pre-fix of log have date hostname session. you can set false or some string | true is default.

# Examples

 ```
  const Explog = require('explog')

  const app = require('express')()

  app.use(Explog())
 ```

### config

**level** Mean level for display log in debug, info, warn and error

**transecLog** Went you use the express this option will write transection log for you. You will get incoming and outgoing.

  >transecLog: true

  ```
    2019-6-7 01:12:03|DESKTOP-TIK2PIC|7M1pISx7lupSZ4ps2Ys5V4|debug| incoming| __method=GET __url=/?aaa=xxx&xxx=www __headers={"content-type":"application/json","user-agent":"PostmanRuntime/7.13.0","accept":"*/*","cache-control":"no-cache","postman-token":"03190188-698c-468b-8155-23c89cb2d409","host":"localhost:3000","accept-encoding":"gzip, deflate","content-length":"18","connection":"keep-alive"} __body=null
    2019-6-7 01:12:03|DESKTOP-TIK2PIC|7M1pISx7lupSZ4ps2Ys5V4|debug| outgoing| __status_code=201 __headers={"x-powered-by":"Express","content-type":"application/json; charset=utf-8","content-length":"15","etag":"W/\"f-oG2QlW7JG5oBrmRE9qdduyMrDm4\""} __body={"name":"asss"} __response_time=2005ms
  ```
**preFix** This will write `2019-6-7 01:12:03|DESKTOP-TIK2PIC|7M1pISx7lupSZ4ps2Ys5V4|debug` follow $date-time|$hostname|$session $session is ramdom string 22 index a-zA-Z0-9. If you need disable it you will set false but you can costom this with string.

  >preFix: false
  ```
    incoming| __method=GET __url=/?aaa=xxx&xxx=www __headers={"content-type":"application/json","user-agent":"PostmanRuntime/7.13.0","accept":"*/*","cache-control":"no-cache","postman-token":"03190188-698c-468b-8155-23c89cb2d409","host":"localhost:3000","accept-encoding":"gzip, deflate","content-length":"18","connection":"keep-alive"} __body=null
  ```
  >preFix: 'explog'
  ```
    explog|debug|incoming| __method=GET __url=/?aaa=xxx&xxx=www __headers={"content-type":"application/json","user-agent":"PostmanRuntime/7.13.0","accept":"*/*","cache-control":"no-cache","postman-token":"03190188-698c-468b-8155-23c89cb2d409","host":"localhost:3000","accept-encoding":"gzip, deflate","content-length":"18","connection":"keep-alive"} __body=null
  ```

## TODO
 - add color.
 - config transection log to multiple line.
 - write file.

## License

[MIT](LICENSE)