# explog
Request and response logger middleware for node.js

# API

`const explog = require('explog')`

###explog(option)

Create a logger middleware function using the given format and options.

## options

 - **level** level for write debug, info, warn, error and 'debug' is default.
 - **transecLog** transections log have incoming and outgoing will display headers url method body queryString and response messages of express | true is default.
 - **isPreFix** pre-fix of log have date hostname session | true is default.