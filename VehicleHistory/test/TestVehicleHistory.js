const VehicleHistory = artifacts.require("VehicleHistory");

contract(" Vehicle History Tracking ", async accounts => {
    it("should be able to register a vehicle", async () => {
      let instance = await VehicleHistory.deployed();
        await  instance.registerVehicle("0011","Car","1590060034","700000","Bangalore","","MZ","Celerio ZXI(o)",{from:accounts[0]});
       let registedVehicle= await instance.vehicleNumber("0011");
        assert.equal(accounts[0], registedVehicle);
        const allEventsB = await instance.getPastEvents("vehicleRegistered",{}, {fromBlock: 0, toBlock: 'latest'});
        //console.log(allEventsB.returnValues.numberOfVeh);
    });
    it("Vechicle type should be stored",async()=>{
        let instance = await VehicleHistory.deployed();
        await  instance.registerVehicle("0022","Car","1590060034","700000","Bangalore","","MZ","Celerio ZXI(o)",{from:accounts[1]});
        let vehicleType=await instance.vehicleType(accounts[1]);
        assert.equal(vehicleType, "Car");
    });



    it("Vechicle manufacturer should be stored",async()=>{
        let instance = await VehicleHistory.deployed();
        await  instance.registerVehicle("0044","Car","1590060034","700000","Bangalore","","MZ","Celerio ZXI(o)",{from:accounts[3]});
        let manuftcr=await instance.manufacturer(accounts[3]);
        assert.equal(manuftcr, "MZ");
    });

    it("Vechicle model name should be stored",async()=>{
        let instance = await VehicleHistory.deployed();
        await  instance.registerVehicle("0055","Car","1590060034","700000","Bangalore","","MZ","Celerio ZXI(o)",{from:accounts[4]});
        let modelaNam=await instance.modelname(accounts[4]);
        assert.equal(modelaNam, "Celerio ZXI(o)");
    });

    it("Vechicle mode lyear should be stored",async()=>{
        let instance = await VehicleHistory.deployed();
        await  instance.registerVehicle("0066","Car","1590060034","700000","Bangalore","","MZ","Celerio ZXI(o)",{from:accounts[5]});
        let model=await instance.modelyear(accounts[5]);
        assert.equal(model, "2020");
    });

    it("Vechicle  should be made ready for sell",async()=>{
        let instance = await VehicleHistory.deployed();
        await  instance.registerVehicle("0077","Car","1590060034","700000","Bangalore","","MZ","Celerio ZXI(o)",{from:accounts[6]});
        await instance.readyToSellMycar("0077",{from:accounts[6]});
        assert.equal(await instance.upForSell(accounts[6]), true);
    });

    it("Vechicle History should be returned",async()=>{
        let instance = await VehicleHistory.deployed();
        await  instance.registerVehicle("6439","Car","1590060034","700000","Bangalore","","MZ","Celerio ZXI(o)",{from:accounts[7]});
        await  instance.addVehicleActvity("6439","Service2","1590050038","10000","Bangalore","Genral Serice","8");
        await instance.readyToSellMycar("6439",{from:accounts[7]});
        console.log("Returned value is: "+await instance.returnDetail("6439")+"healthRating: ");
        assert.equal("Car", "Car");
    })

    it("Vechicle  should be able to sell",async()=>{
        let instance = await VehicleHistory.deployed();
        await instance.registerVehicle("640","Car","1590060034","700000","Bangalore","","MZ","Celerio ZXI(o)",{from:accounts[8]});
        await instance.addVehicleActvity("640","Service2","1590050038","10000","Bangalore","Genral Serice","8");
        await instance.readyToSellMycar("640",{from:accounts[8]});
        console.log("Returned value is: "+await instance.returnDetail("640"));
        let balaceBfr=await web3.eth.getBalance(accounts[8])
        await instance.sold("640","1590050067","10","Bangalore","sold from to ","8",{from:accounts[1], value: web3.utils.toWei('10', "ether")});
        let balanceafter=await web3.eth.getBalance(accounts[8]);
        assert.equal(balaceBfr, balanceafter-web3.utils.toWei('10', "ether"));
    });

});