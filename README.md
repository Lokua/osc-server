# osc-server

## Install

```sh
npm i @lokua/osc-server --save
```

## Usage

```js
const createServer = require(`@lokua/osc-server`)

const { onMessage, send/*, server, config */ } = createServer({
  // below is the default config:
  // ----------------------------
  inputPort: 9002,
  inputHost: `0.0.0.0`,
  outputPort: 9001,
  outputHost: `0.0.0.0`,
  exitOnError: false,
  formatAddress: x => x,
  debug: true
})

onMessage((address, value) => {/* do something */})
send(`someAddress`, 98)
```

## License
MIT
