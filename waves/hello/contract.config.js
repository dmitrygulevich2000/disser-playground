module.exports = {
  image: "contract-image",
  name: 'Your Contract Name',
  version: '0.0.1', // default=latest
  networks: {
    testnet: {
      seed: '#paste your seed phrase here',
    },

    mainnet: {
      seed: '#paste your seed phrase here'
    },
    sandbox: {
      registry: 'localhost:5000',
      nodeAddress: 'http://localhost:6862',
      seed: 'identify nominee amused melody potato thing shuffle mixture clarify piano game segment indoor embody inmate',
      params: {
        init: () => ({
            param: '${value}'
        })
      }
    }
  }
}