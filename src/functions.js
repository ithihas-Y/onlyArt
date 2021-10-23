import abi from './abis/OATToken.json'
import Web3 from 'web3'

const rpcUrl = 'https://speedy-nodes-nyc.moralis.io/c63aa27dafeaf0a01db49ea9/eth/ropsten'

const web3 = new Web3(rpcUrl)

const contract = new web3.eth.Contract(abi.abi,'0x0Fc16D583221Cc80cb2322c4fC23375f2d961abD')

const ethereum = window.ethereum

export async function buyOat(amount) { 
    try {
        const tokenValueWei = await contract.methods.tokenValueWEI().call()
        if (typeof ethereum !== "undefined" && ethereum !== "") {
          const tx = contract.methods.buy(amount).encodeABI()
          const transactionParameters = {
            to: contract.options.address,
            from: ethereum.selectedAddress,
            value:'0x'+parseInt(amount*tokenValueWei).toString(16),
            data: tx,
          }
          const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
        } else {
          console.log("Please install MetaMask!")
        }
      } catch (e) {
        console.log(e.message)
      }
}

export async function claimReflection() { 
    try {
        if (typeof ethereum !== "undefined" && ethereum !== "") {
          const tx = contract.methods.claimReflection().encodeABI()
          const transactionParameters = {
            to: contract.options.address,
            from: ethereum.selectedAddress,
            data: tx,
          }
          const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          })
        } else {
          console.log("Please install MetaMask!")
        }
      } catch (e) {
        console.log(e.message)
      }
}
