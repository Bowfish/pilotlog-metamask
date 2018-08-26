// Import contracts
import LogFactory from '../eth/build/contracts/LogFactory.json'
//import Pilot from '../eth/build/contracts/Pilot.json'
//import License from '../eth/build/contracts/License.json'
//import Logbook from '../eth/build/contracts/Logbook.json'

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
  contracts: [
    LogFactory,
    //Pilot,
    //License,
    //Logbook
  ],
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
