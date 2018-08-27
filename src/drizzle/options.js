// Import contracts
import LogFactory from '../eth/build/contracts/LogFactory.json'
//import Pilot from '../eth/build/contracts/Pilot.json'
//import License from '../eth/build/contracts/License.json'
//import Logbook from '../eth/build/contracts/Logbook.json'

/*
import Web3 from 'web3'
const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8545');
console.log(web3)
*/

// Redux DevTools
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  /*
  contracts: [
    LogFactory,
  ],
  */

  // ganache
  contracts: [
    LogFactory, // A regular Truffle contract artifact
    /*
    {
      contractName: 'LogFactory',
      web3Contract: new web3.eth.Contract(
        LogFactory.abi,
        '0xA6936FD45e01915084558553a6d436D6E7DcaaCF',
        {data: 'deployedBytecode' }
      ) // An instance of a Web3 contract
    }
    */
  ],

  /*
  // Rinkeby
  contracts: [
    //LogFactory, // A regular Truffle contract artifact
    {
      contractName: 'LogFactory',
      web3Contract: new web3.eth.Contract(
        LogFactory.abi,
        '0x39DF1548b145A0fDDAb2A4675d49508A09812C87',
        {data: 'deployedBytecode' }
      ) // An instance of a Web3 contract
    }
  ],
  */

  /*
  events: {
    SimpleStorage: ['StorageSet']
  },
  */
  polls: {
    //accounts: 1500
  }
}

export default drizzleOptions
