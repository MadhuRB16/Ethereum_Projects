const ServiceCenters = artifacts.require("ServiceCenters");

contract(" Service Center ", async accounts => {
    it("should be able to register Service Center", async () => {
        let instance = await ServiceCenters.deployed();
        await instance.addServiceCenter("Test Service Center");
        let serviceCenterName=await instance.returnServiceCenter(accounts[0]);
        assert.equal("Test Service Center",serviceCenterName);
    });

    it("Should be able to check  Service center is valid", async()=>{
        let instance = await ServiceCenters.deployed();
        await instance.addServiceCenter("Test Service Center",{from:accounts[1]});
        let serviceCenterName=await instance.isValidServceCenter(accounts[1]);
        assert.equal(true,serviceCenterName);
    });
});