const Migrations = artifacts.require("Migrations");
const Random = artifacts.require("Random");
const Foundation = artifacts.require("Foundation");

const ADMIN_ACCOUNTS = ["0x1B1ca9C3f38d1237d656958c310bc732D3D917eA","0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db"];

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  // deployment steps
  deployer.deploy(Random);
  deployer.link(Random, Foundation);
  deployer.deploy(Foundation, ADMIN_ACCOUNTS);
};