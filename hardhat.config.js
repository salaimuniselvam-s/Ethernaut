require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-ethers");

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY;

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const GOERLI_API_KEY = process.env.GOERLI_API_KEY || "";

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.0",
      },
      {
        version: "0.6.2",
      },
      {
        version: "0.5.0",
      },
      {
        version: "0.8.8",
      },
      {
        version: "0.8.16",
      },
    ],
  },
  networks: {
    goerli: {
      url: GOERLI_API_KEY,
      accounts: [PRIVATE_KEY_2, PRIVATE_KEY],
      chainId: 5,
      gas: 2100000,
      gasPrice: 20000000000,
      saveDeployments: true,
    },
    mumbai: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // apiKey: {
    //   polygonMumbai: POLYGONSCAN_KEY,
    // },
  },
};
