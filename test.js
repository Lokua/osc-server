const createServer = require(`./index`)

const server = createServer({
  formatAddress: x => `/prefix/${x}`
})

setInterval(() => {
  server.send(`fader`, Math.random())
}, 250)
