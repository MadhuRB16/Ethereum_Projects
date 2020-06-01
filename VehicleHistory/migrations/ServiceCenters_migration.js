const ServiceCenters = artifacts.require("ServiceCenters");

module.exports = function(deployer) {
  deployer.deploy(ServiceCenters);
};
