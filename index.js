require('dotenv').config();
const Web3 = require('web3');
const WalletConnectProvider = require('@walletconnect/web3-provider');
const EthereumTx = require('ethereumjs-tx').Transaction;

class ChainTasker {
    constructor() {
        // Example using a public Ethereum gateway (Cloudflare)
        const provider = new WalletConnectProvider({
            rpc: {
              1: "https://cloudflare-eth.com/" // Ethereum Mainnet
              // You can add other network IDs and their public endpoints here
            }
        });

        this.web3 = new Web3(provider);
    }

    async getLatestBlock() {
        return await this.web3.eth.getBlock('latest');
    }

    async getBalances(walletAddresses) {
        const balances = {};
        for (const address of walletAddresses) {
            const balance = await this.web3.eth.getBalance(address);
            balances[address] = this.web3.utils.fromWei(balance, 'ether');
        }
        return balances;
    }

    watchTokenTransfers(tokenAddress, callback) {
        // Standard ERC-20 Token ABI for Transfer event
        const tokenAbi = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            }
        ];
    
        const contract = new this.web3.eth.Contract(tokenAbi, tokenAddress);
        contract.events.Transfer({
            fromBlock: 'latest'
        })
        .on('data', (event) => {
            callback(event.returnValues);
        })
        .on('error', console.error);
    }
    

    async sendTransaction(transactionData) {
        const { from, to, value, gasLimit, gasPrice, data } = transactionData;
        const nonce = await this.web3.eth.getTransactionCount(from, 'latest'); // Get nonce for account
        const txParams = {
            nonce: this.web3.utils.toHex(nonce),
            gasPrice: this.web3.utils.toHex(gasPrice),
            gasLimit: this.web3.utils.toHex(gasLimit),
            to,
            value: this.web3.utils.toHex(value),
            data
        };

        const tx = new EthereumTx(txParams, { 'chain': 'mainnet' }); // Or specify another chain
        const privateKeyBuffer = Buffer.from(process.env.PRIVATE_KEY, 'hex');
        tx.sign(privateKeyBuffer);

        const serializedTx = tx.serialize();
        return await this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    }
}

module.exports = ChainTasker;
