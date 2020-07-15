const Web3 = require('web3')

const web3 = new Web3(new Web3.providers.WebsocketProvider('http://127.0.0.1:8545'))

console.log(web3.version)

web3.eth.isSyncing().then(console.log)

const abi = require('./solrouter.json')
//GNT4 on ropsten
const contract = new web3.eth.Contract(abi, '0x219DaB9993AAcf345B25D89AA5ACa639CC70e65d')

let lastBlock = 0
let newQueries = []
setInterval(async function() {
    newQueries = []
  await contract.getPastEvents('allEvents', {fromBlock: lastBlock, toBlock: 'latest'},
    function(error, events){
      if(error){
        console.log(error)
      }
      if(events){
        console.log(events);
        if(events.length > 0){
            lastBlock = events[events.length - 1].blocknumber;
            for(let e of events){
                if(e.event == "queried"){
                    newQueries.push(e)
                }
            }
        }
        return newQueries
      }
    }
  )
},10000)


