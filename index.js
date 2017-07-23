const dgram = require(`dgram`)
const oscmsg = require(`osc-msg`)
const onExit = require(`@lokua/on-exit`)

module.exports = createServer

const defaultConfig = {
  inputPort: 9002,
  inputHost: `0.0.0.0`,
  outputPort: 9001,
  outputHost: `0.0.0.0`,
  exitOnError: false,
  formatAddress: x => `/${x}`,
  debug: true
}

function createServer(configuration = {}) {
  const config = Object.assign({}, defaultConfig, configuration)
  const server = dgram.createSocket(`udp4`)

  server.on(`error`, err => {
    console.error(err)
    if (config.exitOnError) {
      server.close()
      process.exit(1)
    }
  })

  if (config.debug) {
    server.on(`listening`, () => console.log(`osc-server: %j`, config))
  }

  server.bind(config.inputPort)

  onExit(() => server.close())

  const onMessage = fn => {
    server.on(`message`, (msg, rinfo) => {
      const m = oscmsg.decode(msg)
      fn(m.address, m.args[0].value)
    })
  }

  const send = (address, value) => {
    const buffer = oscmsg.encode({
      address: config.formatAddress(address),
      args: [{ type: `float`, value }]
    })
    server.send(buffer, 0, buffer.length, config.outputPort, config.outputHost)
  }

  return {
    onMessage,
    send,
    server,
    config
  }
}
