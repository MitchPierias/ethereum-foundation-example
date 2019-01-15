const Random = artifacts.require("Random");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Random);
};
