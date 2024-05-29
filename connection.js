const crypto = require('crypto') 
const WebSocket = require('ws') 
const fetch = require('node-fetch')
//test

const apiKey = '759ea083c72a2f76748acd587d6037527b5bd75c368' // const apiKey = 'paste key here'
const apiSecret = '8b080a24c1727fa666a10cfcfc220619b7dc8ee8892' // const apiSecret = 'paste secret here'

const nonce = (Date.now() * 1000).toString()
const authPayload = 'AUTH' + nonce 
const authSig = crypto.createHmac('sha384', apiSecret).update(authPayload).digest('hex') 

const payload = {
  apiKey, //API key
  authSig, //Authentication Sig
  nonce, 
  authPayload,
  event: 'auth'
}

const wss = new WebSocket('wss://api.bitfinex.com/ws/2') // Create new Websocket

wss.on('open', () => wss.send(JSON.stringify(payload)))


// to check connection established

wss.on('message', (msg) => console.log(msg.toString()))



