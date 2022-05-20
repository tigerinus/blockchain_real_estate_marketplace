const fs = require('fs');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
const process = require("node:process");

const INFURA_KEY = fs.readFileSync(".key").toString().trim();
const MNEMONIC = fs.readFileSync(".secret").toString().trim();
const CONTRACT_ADDRESS = "0x720484c6c3f25Dfc49de0fD7cc720B88D3103fA0";
const OWNER_ADDRESS = "0x7be53c45fA6567e26Ea9cC1E2636AB910bb75511";
const NETWORK = "rinkeby";
const contract = require('./build/contracts/SolnSquareVerifier.json');
const ABI = contract.abi;

async function main(tokenId) {
  if (tokenId === undefined) {
    console.log("Usage: node mint.js <tokenId>");
    process.exit(1);
  }

  console.log("start main");
  const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
  const web3Instance = new web3(provider)
  console.log("finished set provider ");
  if (CONTRACT_ADDRESS) {
    //check abi and address
    console.log("CONTRACT_ADDRESS :" + CONTRACT_ADDRESS);
    const token = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS, { gasLimit: "4500000" })
    const zokratesProof = require("../zokrates/code/square/proof.json");

    console.log("zokratesProof :" + JSON.stringify(zokratesProof.proof.a));

    try {
      console.log("OWNER_ADDRESS " + OWNER_ADDRESS + "\n");
      let tx2 = await token.methods
        .mint(OWNER_ADDRESS, tokenId)
        .send({ from: OWNER_ADDRESS });

      console.log("Minted item. Transaction: " + tx2.transactionHash);
    } catch (e) {
      console.log("error into minted function " + e);
    } finally {
      process.exit(0);
    }
  }
}

main(process.argv[2]);
