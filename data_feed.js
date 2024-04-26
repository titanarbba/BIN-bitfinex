"
const ws = require('ws')
const w = new ws('wss://api-pub.bitfinex.com/ws/2')

w.on('message', (msg) => console.log(msg.toString()))




let msg = JSON.stringify({ 
  event: 'subscribe', 
  channel: 'ticker', 
  symbol: 'tBTCUSD',
 
  
})

/*let msg2 = JSON.stringify({ 
    event: 'subscribe', 
    channel: 'ticker', 
    symbol: 'tETHUSD',
   
    
  })*/


w.on('open', () => w.send(msg.toString()))

//w.on('open', () => w.send(msg2.toString()))






"
