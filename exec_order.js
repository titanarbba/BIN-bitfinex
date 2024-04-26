const crypto = require('crypto') 
const WebSocket = require('ws') 
const fetch = require("node-fetch");


const apiKey = '65d66c2b2fa51a0149ffc8acec46d0607dff7a89b83' // const apiKey = 'paste key here'
const apiSecret = 'ba8839ccb24d98a45c46063085c484b8c32a22de145' // const apiSecret = 'paste secret here'

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
//...
//authentication code
//....
const inputDetails = {
    "cid": Date.now(),
    "type": "EXCHANGE MARKET",
    "symbol": 'tTESTBTC:TESTUSD',
   //"symbol": 'tBTCUSD',
    "amount": "0.00020",
    "price": "56000"
    
}

const inputPayload = [0, 'on', null, inputDetails] // Note how the payload is constructed here. It consists of an array starting with the CHANNEL_ID, TYPE, and PLACEHOLDER and is followed by the inputDetails object.

//Websocket Listener

wss.on('message', (msg) => {     // The 'message' event is called whenever the ws recieves ANY message
  let response = JSON.parse(msg)
  if (response[1] === 'ws') { //Payload is sent when the wallet snapshot is received. Sending an order before the snapshot can result in a tradable balance error
    wss.send(JSON.stringify(inputPayload));// Submit payload for input
  } 
  console.log(msg.toString()); // ALL ws receipts will be logged to console
})
