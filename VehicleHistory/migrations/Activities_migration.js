const Activities = artifacts.require("Activities");

module.exports = function(deployer) {
   deployer.deploy(Activities,"",0,0,"","");
 // deployer.deploy(await Activities());
};


