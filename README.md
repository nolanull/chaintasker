# ChainTasker

ChainTasker is a Nodejs lib designed to simplify the automation of various Web3 and cryptocurrency tasks. Whether you're monitoring blockchain events, querying wallet balances, or sending transactions, ChainTasker provides an easy-to-use interface for developers working on Ethereum-based projects.

## Features

- **Latest Block Retrieval**: Quickly fetch the most recent block on the blockchain.
- **Balance Checker**: Obtain the Ether balance of one or multiple Ethereum addresses.
- **Token Transfer Monitoring**: Watch for ERC-20 token transfers in real-time, ideal for tracking transactions of interest.
- **Transaction Sending**: Simplify the process of creating, signing, and broadcasting transactions.

## Installation

To add ChainTasker to your project, run the following command:

npm install chaintasker

Ensure you have web3 installed in your project, as ChainTasker depends on it to interact with the Ethereum blockchain.

## Usage

* Initializing ChainTasker

const ChainTasker = require('chaintasker');
const tasker = new ChainTasker('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

* Fetching the Latest Block

async function fetchLatestBlock() {
    const latestBlock = await tasker.getLatestBlock();
    console.log(latestBlock);
}
fetchLatestBlock();

* Checking Wallet Balances

async function checkBalances() {
    const addresses = ['0x...', '0x...']; // Add Ethereum addresses here
    const balances = await tasker.getBalances(addresses);
    console.log(balances);
}
checkBalances();
Watching Token Transfers
javascript
Copy code
function handleTransferEvent(data) {
    console.log(`Token Transfer! From: ${data.from}, To: ${data.to}, Value: ${data.value}`);
}

const tokenAddress = '0x...'; // ERC-20 Token Contract Address
tasker.watchTokenTransfers(tokenAddress, handleTransferEvent);

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.