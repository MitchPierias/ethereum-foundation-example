const Foundation = artifacts.require("Foundation");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Foundation, ["0xca35b7d915458ef540ade6068dfe2f44e8fa733c","0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db"]);
};