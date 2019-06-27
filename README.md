# explog
Request and response logger middleware for node.js

# API

```js
 const Explog = require('explog')

 explog({
  level: 'debug', // default
  transecLog: true, // default
  preFix: true, // default
  multiple: false, // default
  session: 0 // default
})
 ```

Create a logger middleware function using the given format and options.

## options
 - **level** level for write debug, info, warn, error and 'debug' is default.
 - **transecLog** transections log have incoming and outgoing will display headers url method body queryString and response messages of express | true is default.
 - **preFix** pre-fix of log have date hostname session. you can set false or some string | true is default.
 - **multiple** display transections log to multiple line | false is default
 - **session** session in transection log(incoming & outgoing) we have 4 option 0 mean don't create session, 1 mean random a-zA-Z0-9 22 digits 2 mean random only alphabet 22 digits and 3 mean only number 22 digits | 0 is default

 > shall use preFix to hard custom session.

# Examples

 ```js
  const Explog = require('explog')

  const app = require('express')()

  app.use(Explog())
 ```

### config

**level** Mean level for display log in debug, info, warn and error

  ```js
    console.log('asd', {age: 25}) // debug
    console.info(2131) // debug, info
    console.warn(JSON.stringify({name: "foo"})) // debug, info, warn
    console.error(new Error('test')) // debug, info, warn, error
  ```
  >output with pre-fix
  ```
    2019-6-7 10:12:26|DESKTOP-TIK2PIC|debug| asd { naue: 'aaaa' }
    2019-6-7 10:12:26|DESKTOP-TIK2PIC|info| 2131
    2019-6-7 10:12:26|DESKTOP-TIK2PIC|warn| {"name":"foo"}
    2019-6-7 10:12:26|DESKTOP-TIK2PIC|error| Error: test
        at Object.<anonymous> (C:\CODE\github\enta1234\explog\test.js:26:15)
        at Module._compile (module.js:653:30)
        at Object.Module._extensions..js (module.js:664:10)
        at Module.load (module.js:566:32)
        at tryModuleLoad (module.js:506:12)
        at Function.Module._load (module.js:498:3)
        at Function.Module.runMain (module.js:694:10)
        at startup (bootstrap_node.js:204:16)
        at bootstrap_node.js:625:3
  ```
  >output without pre-fix
  ```
    asd { naue: 'aaaa' }
    2131
    {"name":"foo"}
    Error: test
        at Object.<anonymous> (C:\CODE\github\enta1234\explog\test.js:26:15)
        at Module._compile (module.js:653:30)
        at Object.Module._extensions..js (module.js:664:10)
        at Module.load (module.js:566:32)
        at tryModuleLoad (module.js:506:12)
        at Function.Module._load (module.js:498:3)
        at Function.Module.runMain (module.js:694:10)
        at startup (bootstrap_node.js:204:16)
        at bootstrap_node.js:625:3
  ```

**transecLog** When you use express this option will write transection log for you. You will get incoming and outgoing.

  >transecLog: true

  ```js
    2019-6-7 01:12:03|DESKTOP-TIK2PIC|debug| incoming| __method=GET __url=/?aaa=xxx&xxx=www __headers={"content-type":"application/json","user-agent":"PostmanRuntime/7.13.0","accept":"*/*","cache-control":"no-cache","postman-token":"03190188-698c-468b-8155-23c89cb2d409","host":"localhost:3000","accept-encoding":"gzip, deflate","content-length":"18","connection":"keep-alive"} __body=null
    2019-6-7 01:12:03|DESKTOP-TIK2PIC|debug| outgoing| __status_code=201 __headers={"x-powered-by":"Express","content-type":"application/json; charset=utf-8","content-length":"15","etag":"W/\"f-oG2QlW7JG5oBrmRE9qdduyMrDm4\""} __body={"name":"asss"} __response_time=2005ms
  ```
**preFix** This will write `2019-6-7 01:12:03|DESKTOP-TIK2PIC|debug` follow $date-time|$hostname If you need disable it you will set false but you can custom this with string.

  >preFix: false
  ```js
    incoming| __method=GET __url=/?aaa=xxx&xxx=www __headers={"content-type":"application/json","user-agent":"PostmanRuntime/7.13.0","accept":"*/*","cache-control":"no-cache","postman-token":"03190188-698c-468b-8155-23c89cb2d409","host":"localhost:3000","accept-encoding":"gzip, deflate","content-length":"18","connection":"keep-alive"} __body=null
  ```
  >preFix: 'explog'
  ```js
    explog|debug|incoming| __method=GET __url=/?aaa=xxx&xxx=www __headers={"content-type":"application/json","user-agent":"PostmanRuntime/7.13.0","accept":"*/*","cache-control":"no-cache","postman-token":"03190188-698c-468b-8155-23c89cb2d409","host":"localhost:3000","accept-encoding":"gzip, deflate","content-length":"18","connection":"keep-alive"} __body=null
  ```

## TODO
 - [x] custom pre-fix
 - [x] config transection log to multiple line.
 - [X] add session log to console.
 - [ ] ~~add color.~~
 - [ ] handle 404 page not found.
 - [ ] write file.
 - [ ] summary log.
 - [ ] detail log.

## License

[ISC](LICENSE)