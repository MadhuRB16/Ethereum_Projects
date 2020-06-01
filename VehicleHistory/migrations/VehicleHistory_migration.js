const VehicleHistory = artifacts.require("VehicleHistory");

module.exports = function(deployer) {
  deployer.deploy(VehicleHistory);
};
