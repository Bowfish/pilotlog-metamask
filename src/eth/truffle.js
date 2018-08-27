var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "glide install invest eagle fatigue swim gorilla tornado field dance sustain kite right clock grape"

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    /*
    // see: https://github.com/trufflesuite/truffle/releases/tag/v5.0.0-beta.0#new-migrations
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/c200fd3075244d7298791c898aeeb728")
      },
      network_id: 4,
      gas: 5500000,           // Default gas to send per transaction
      gasPrice: 10000000000,  // 10 gwei (default: 20 gwei)
      confirmations: 2,       // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,     // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true
    }
    */
    /*
    rinkeby: {
      network_id: 4,
      host: '127.0.0.1',
      port: 8545,
      gas: 4000000
    }
    */
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
};
