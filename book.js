const ws = require('ws')
const w = new ws('wss://api-pub.bitfinex.com/ws/2')

w.on('open', () => w.send(msg))


w.on('message', (msg) => console.log(msg.toString()))

let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'book', 
  prec: 'R0',
  symbol: 'tBTCUSD',
  
})

