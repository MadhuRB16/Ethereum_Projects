import React, { Component } from 'react'
import './App.css';
import Web3 from 'web3';
import VehicleHistory from './contracts/VehicleHistory.json';
import ServiceCenters from './contracts/ServiceCenters.json';
class App extends Component {
  componentWillMount() {
    this.loadBlockchainData()
  }

async loadBlockchainData(){
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkName= await web3.eth.net.getNetworkType();
  const account=accounts[0];
 
console.log(account+" networkName "+networkName);
  const networkId = await web3.eth.net.getId();

  var VehicleHistoryInst;
  try{
    VehicleHistoryInst = new web3.eth.Contract(VehicleHistory.abi,"0xf713AF0434C07825E2D1ef134c74EdB9f683F2d9");
    this.setState({VehicleHistoryInst2:VehicleHistoryInst});
    }catch(error){
     console.log('error while getting Contract details'+console.error);
  }
var numberOfregVe;
var numberofVe;

  let numberOfRegistered;
  let numberOfReady;
  try{
    numberOfRegistered=await VehicleHistoryInst.methods.numberOfRegisteredVehicle().call();
  }catch(error){
    console.log('error while fetching numberOfRegistered'+console.error);
  }
  try{
    numberOfReady=await VehicleHistoryInst.methods.numberOfReadyForSellVehicle().call();
  }catch(error){
    console.log('error while fetching numberOfReady'+console.error);
  }
  this.setState({numberOfRegistered,numberOfReady});
  console.log(numberOfRegistered+'-'+numberOfReady);

  if(numberOfReady>0){
   await this.displayVehicles(VehicleHistoryInst,numberOfReady);
  }
}

constructor(props) {
  super(props)
  this.state = {
    numberOfRegistered:0,
     numberOfReady:0,
     readyVehicleLst:[],
     vehicleTypeLst:[],
     vehicleModelYearLst:[],
     vehicleManufacturerLst:[],
     vehicleModelNameLst:[],
     VehicleHistoryInst2:Object,
     acctiveAccont:''
     
  }
}

 render() {

const readyVehicles=this.state.readyVehicleLst;
const vehicleHistory=this.state.vehicleHistory;

  return (
    <div className="contain">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <div>
              <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="" target="_blank">Dapp to track History of Vehicles</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="text-center">
      <h2>  {this.state.numberOfRegistered}  vehicles are Registered with this app </h2>
      <h2>  {this.state.numberOfReady} vehicles are available for public view </h2>
        </div>
        <div>
     <button onClick={this.RegisterNewVehicle} className="btn btn-primary m-2" > Register New Vehicle</button>
     <button onClick={this.addAVehiclectivity} className="btn btn-primary m-2" > Add an Activity</button>
     <button onClick={this.openAddServiceCenter} className="btn btn-primary m-2" > Register a Automobile Service Center</button>
     <button onClick={this.openReadyForSell} className="btn btn-primary m-2" > Mark for Resell </button>
     <button onClick={this.openMarAsSold} className="btn btn-primary m-2" > Purchase</button>
   </div>
   <div>
   <div class="form-popup" id="myForm">
  <div class="form-container">
    <h1>Rigister New Vehicle</h1>

    <label for="VNumber"><b>Vehicle Number:</b></label>
    <input type="text" placeholder="Enter Vehicle Number" name="vnumber" id="vnumber" required></input>
    <label for="cars"><b>Vehicle Type:</b></label>
  <select id="vtype" name="Type" class="dropdown">
    <option value="Car">Car</option>
    <option value="Bike">Bike</option>
  </select>
    <label for="vprice"><b>Price:</b></label>
    <input type="number" placeholder="Enter Price" name="vprice" id="vprice" required></input>
    <label for="vplace"><b>Place:</b></label>
    <input type="text" placeholder="Enter place of registration" name="vplace" id="vplace" required></input>
    <label for="vmanufactureer"><b>Manufacturer:</b></label>
    <input type="text" placeholder="Enter Manufacturer Name" name="vmanufactureer" id="vmanufactureer" required></input>
    <label for="vmodel"><b>Model:</b></label>
    <input type="text" placeholder="Enter Model Name" name="vmodel" id="vmodel" required></input>
   <button onClick={this.register} className="btn btn-primary m-2" >Register</button>
   <button onClick={this.closeForm} className="btnc btn-primary m-2" >Cancel</button>
  </div>
</div>

<div class="form-popup" id="addActivity">
  <div class="form-container">
    <h1>Add a Vehicle Activity</h1>
    <label for="VNumber"><b>Vehicle Number:</b></label>
    <input type="text" placeholder="Enter Vehicle Number" name="vnumber1" id="vnumber1" required></input>
    <label for="vactivity"><b>Activity Name:</b></label>
    <input type="text" placeholder="Enter Activity Name" name="vactivity" id="vactivity" required></input>
    <label for="vprice"><b>Price:</b></label>
    <input type="number" placeholder="Enter Price " name="vprice1" id="vprice1" required></input>
    <label for="vplace"><b>Place:</b></label>
    <input type="text" placeholder="Enter place of registration" name="vplace1" id="vplace1" required></input>
    <label for="vnotes"><b>Short Description of the Activity:</b></label>
    <input type="text" placeholder="Enter Short Description of the Activity" name="vnotes" id="vnotes" required></input>
    <label for="Vrating"><b>Vehicle Rating(out of 10):</b></label>
    <input type="number" placeholder="Enter Current health rating of the Vehicle" name="Vrating" id="Vrating" required></input>
   <button onClick={this.addActivity} className="btn btn-primary m-2" >Add Activity</button>
   <button onClick={this.closeActivityForm} className="btnc btn-primary m-2" >Cancel</button>
  </div>
</div>

<div class="form-popup" id="markAsSold">
  <div class="form-container">
    <h1>Purchase the Vehicle</h1>
    <label for="VNumber"><b>Vehicle Number:</b></label>
    <input type="text" placeholder="Enter Vehicle Number" name="vnumber20" id="vnumber20" required></input>
    <label for="vactivity"><b>Activity Name:</b></label>
    <input type="hidden" placeholder="Enter Activity Name" name="vactivity" id="vactivity" value="Resell"></input>
    <label for="vprice"><b>Price:</b></label>
    <input type="number" placeholder="Enter Price in Ether" name="vprice20" id="vprice20" required></input>
    <label for="vplace"><b>Place:</b></label>
    <input type="text" placeholder="Enter place of registration" name="vplace20" id="vplace20" required></input>
    <label for="vnotes"><b>Short Description of the Activity:</b></label>
    <input type="text" placeholder="Enter Short Description of the Activity" name="vnotes20" id="vnotes20" required></input>
    <label for="Vrating"><b>Vehicle Rating(out of 10):</b></label>
    <input type="number" placeholder="Enter Current health rating of the Vehicle" name="Vrating20" id="Vrating20" required></input>
    <button onClick={this.markAsSold} className="btn btn-primary m-2" >Submit</button>
   <button onClick={this.closemarkAsSold} className="btnc btn-primary m-2" >Cancel</button>
  </div>
</div>



<div class="form-popup" id="readyForSell">
  <div class="form-container">
    <h1>Mark for Sell</h1>
    <label for="VNumber"><b>Vehicle Number:</b></label>
    <input type="text" placeholder="Enter Vehicle Number" name="vnumber2" id="vnumber2" required></input>
    <button onClick={this.readyForSell} className="btn btn-primary m-2" >Submit</button>
   <button onClick={this.closeReadyForSell} className="btnc btn-primary m-2" >Cancel</button>
    </div>
</div>





<div class="form-popup" id="addSericeCenter">
  <div class="form-container">
    <h1>Mark for Sell</h1>
    <label for="VNumber"><b>Service Center Name:</b></label>
    <input type="text" placeholder="Enter Service Center Name" name="vServiceCenter" id="vServiceCenter" required></input>
    <button onClick={this.addServiceCenter} className="btn btn-primary m-2" >Submit</button>
   <button onClick={this.closaddServiceCenter} className="btnc btn-primary m-2" >Cancel</button>
    </div>
</div>

<br></br>
   </div>
   <div class="first admonition-title text-center">
     <h2>Vehicles ready for View</h2>
   </div>
  
    <div id="VehicleDeatils" class="VehicleView" >
    </div>
   </div>

  );
}

 


async displayVehicles(VehicleHistoryInst,numberOfReady){
  var vehicleNumber;
  for(var i=0;i<numberOfReady;i++){
    try{
      vehicleNumber = await VehicleHistoryInst.methods.readyForSellList(i).call();
   this.setState({
      readyVehicleLst: [...this.state.readyVehicleLst, vehicleNumber]
    });
    const vehicleAddrs=await VehicleHistoryInst.methods.vehicleNumber(vehicleNumber).call();
    const vehicleType=await VehicleHistoryInst.methods.vehicleType(vehicleAddrs).call();
    this.setState({
      vehicleTypeLst: [...this.state.vehicleTypeLst, vehicleType]
    });
    const vehicleModelYear=await VehicleHistoryInst.methods.modelyear(vehicleAddrs).call();
    this.setState({
      vehicleModelYearLst: [...this.state.vehicleModelYearLst, vehicleModelYear]
    });
    const vehicleManufacturer=await VehicleHistoryInst.methods.manufacturer(vehicleAddrs).call();
    this.setState({
      vehicleManufacturerLst: [...this.state.vehicleManufacturerLst, vehicleManufacturer]
    });
    const vehicleModelName=await VehicleHistoryInst.methods.modelname(vehicleAddrs).call();
    this.setState({
      vehicleModelNameLst: [...this.state.vehicleModelNameLst, vehicleModelName]
    });
    
  }catch(error){
    console.log(error);
  }
  }
  console.log(this.state.readyVehicleLst);

  var htmlContent='';
for (var i=0;i<this.state.readyVehicleLst.length;i++){
htmlContent=htmlContent+'<h4> Vehicle Number: '+this.state.readyVehicleLst[i]+' ||  vehicle Type: ||'+this.state.vehicleTypeLst[i]+
'  || Year of Manufacture: '+this.state.vehicleModelYearLst[i]+' || '+this.state.vehicleManufacturerLst[i]+' , '+this.state.vehicleModelNameLst[i]+
' <button onClick=showVehicleHistory("'+this.state.readyVehicleLst[i]+'") class="btn btn-primary m-2" > veiw Detail</button> </h4> <div id="'+
this.state.readyVehicleLst[i]+'"></div>';

}
document.getElementById("VehicleDeatils").innerHTML=htmlContent;

}

async RegisterNewVehicle(){
 document.getElementById("myForm").style.display = "block";
}
async register() {
   const vnumb=document.getElementById("vnumber").value;
   const vprice=document.getElementById("vprice").value;
   const vplace=document.getElementById("vplace").value;
   const vmanufactureer=document.getElementById("vmanufactureer").value;
   const vmodel=document.getElementById("vmodel").value;
   let date = (new Date()).getTime();
   let today = (date / 1000).toFixed();
  var e = document.getElementById("vtype");
  var vtype = e.options[e.selectedIndex].value;
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkName= await web3.eth.net.getNetworkType();
  const account=accounts[0];
  console.log(account+" networkName "+networkName);
  const networkId = await web3.eth.net.getId();
  let VehicleHistoryInst;
  try{
  VehicleHistoryInst = new web3.eth.Contract(VehicleHistory.abi,"0xf713AF0434C07825E2D1ef134c74EdB9f683F2d9");
  await VehicleHistoryInst.methods.registerVehicle(vnumb,vtype,today,vprice,vplace,"",vmanufactureer,vmodel).send({from:account});
  alert('Vehicle Registartion is Sucessfull');
  }catch(errr){
    alert('All The fielda are mandator. Please enter all the fields');
    return;
  }

  try{
    console.log('before even call');
   var numberOfregVe= await VehicleHistoryInst.getPastEvents("vehicleRegistered",{}, {fromBlock: 0, toBlock: 'latest'});
    console.log('Number1 of Vehicle '+numberOfregVe);
    var x=numberOfregVe.map((event) => event.returnValues.numberOfVeh);
    var numberOfRegistered=x[x.length-1];
    this.setState({numberOfRegistered,numberOfRegistered});
  }catch(error){
    console.log('error while watching event'+console.error);
  }
  document.getElementById("myForm").style.display = "none";
  window.location.reload();
}
closeForm(){
  document.getElementById("myForm").style.display = "none";
}


async addAVehiclectivity(){
  let serviceCenterInst;
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkName= await web3.eth.net.getNetworkType();
  const account=accounts[0];
  console.log('account '+account);
  try{
    serviceCenterInst = new web3.eth.Contract(ServiceCenters.abi,"0x3b6b06da3E225426362eE96b3cda67305cFfc063");
    var serviceCenterAddress= await serviceCenterInst.getPastEvents("ServiceCenterRigistered",{fromBlock: 0, toBlock: 'latest'});
    console.log(serviceCenterAddress);
    var _account=serviceCenterAddress.map((event)=>event.returnValues.registeredAddress);
    console.log('ServiceCenter account '+_account);
    if(_account!=account){
      alert('Service center is not registered. Please reister Service center');
      return;
    }
  }catch(error){

    console.log(error)
  }
  document.getElementById("addActivity").style.display = "block";
}

async addActivity(){

  const activiTyName=document.getElementById("vactivity").value;
  const vnumb=document.getElementById("vnumber1").value;
  const vprice=document.getElementById("vprice1").value;
  const vplace=document.getElementById("vplace1").value; 
  const vnotes=document.getElementById("vnotes").value; 
  const Vrating=document.getElementById("Vrating").value;
  if(Vrating>10 || Vrating<1){
    alert('Vehicle Rating should be between 1 and 10. 1 being bad and 10 besing best');
    return;
  }
  let date = (new Date()).getTime();
  let today = (date / 1000).toFixed();
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkName= await web3.eth.net.getNetworkType();
  const account=accounts[0];
  console.log(account+" networkName "+networkName);


  let serviceCenterInst;
  let isValidServiceCenter;
  try{
    serviceCenterInst = new web3.eth.Contract(ServiceCenters.abi,"0x3b6b06da3E225426362eE96b3cda67305cFfc063");
    isValidServiceCenter=await serviceCenterInst.methods.isValidServceCenter(account).call();
     }catch(errr){
      console.log(errr);
      return;
    }

if(!isValidServiceCenter){
alert('You are not Authoraised to do this transaction. Please register as Service Center');
return;
}

  let VehicleHistoryInst;
  try{
  VehicleHistoryInst = new web3.eth.Contract(VehicleHistory.abi,"0xf713AF0434C07825E2D1ef134c74EdB9f683F2d9");
  await VehicleHistoryInst.methods.addVehicleActvity(vnumb,activiTyName,today,vprice,vplace,vnotes,Vrating).send({from:account});
  alert('Activity is recored Sucessfully');
  }catch(errr){
    alert('Vehicle Number you have entered might not be registed, Note:- All The fielda are mandator. Please enter all the fields');
    console.log(errr);
    return;
  }
  window.location.reload();
  document.getElementById("addActivity").style.display = "none";
}

closeActivityForm(){
  document.getElementById("addActivity").style.display = "none";
}

openReadyForSell(){
  document.getElementById("readyForSell").style.display = "block";
}

async readyForSell(){
  const vnumb=document.getElementById("vnumber2").value;
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkName= await web3.eth.net.getNetworkType();
  const account=accounts[0];
  console.log(account+" networkName "+networkName);
  let VehicleHistoryInst;
  try{
    VehicleHistoryInst = new web3.eth.Contract(VehicleHistory.abi,"0xf713AF0434C07825E2D1ef134c74EdB9f683F2d9");
    await VehicleHistoryInst.methods.readyToSellMycar(vnumb).send({from:account});
    alert('Vehicle is marked Ready for Sell Sucessfully');
    }catch(errr){
      alert('Vehicle Number you have entered might not be registed or you are not the Owner of this Vehicle');
      console.log(errr);
      return;
    }

    window.location.reload();
  document.getElementById("readyForSell").style.display = "none";
}
closeReadyForSell(){

  document.getElementById("readyForSell").style.display = "none";
}


openMarAsSold(){
  document.getElementById("markAsSold").style.display = "block";
}

async markAsSold(){
  const vnumb=document.getElementById("vnumber20").value;
   const vprice=document.getElementById("vprice20").value;
  const vplace=document.getElementById("vplace20").value; 
  const vnotes=document.getElementById("vnotes20").value; 
  const Vrating=document.getElementById("Vrating20").value;
  let date = (new Date()).getTime();
  let today = (date / 1000).toFixed();
   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkName= await web3.eth.net.getNetworkType();
  const account=accounts[0];
  console.log(account+" networkName "+networkName);
  let VehicleHistoryInst;
  try{
    VehicleHistoryInst = new web3.eth.Contract(VehicleHistory.abi,"0xf713AF0434C07825E2D1ef134c74EdB9f683F2d9");
    await VehicleHistoryInst.methods.sold(vnumb,today,vprice,vplace,vnotes,Vrating).send({from:account, value:web3.utils.toWei(vprice, "ether")});
    alert('Vehicle is marked sold Sucessfully');
    }catch(errr){
      alert('Vehicle Number you have entered might not be registed');
      console.log(errr);
      return;
    }
    window.location.reload();
  document.getElementById("markAsSold").style.display = "none";
}

closemarkAsSold(){
  document.getElementById("markAsSold").style.display = "none";

}


openAddServiceCenter(){
  document.getElementById("addSericeCenter").style.display = "block";
}

async addServiceCenter(){
  const vServiceCenter=document.getElementById("vServiceCenter").value;
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkName= await web3.eth.net.getNetworkType();
  const account=accounts[0];
  console.log(account+" networkName "+networkName);
  let serviceCenterInst;
   try{
    serviceCenterInst = new web3.eth.Contract(ServiceCenters.abi,"0x3b6b06da3E225426362eE96b3cda67305cFfc063");
    await serviceCenterInst.methods.addServiceCenter(vServiceCenter).send({from:account});
    alert('Service Center added Sucessfully');
    }catch(errr){
      alert('Service Center has been alreadt registered registed');
      console.log(errr);
      return;
    }

  document.getElementById("addSericeCenter").style.display = "none";
}

closaddServiceCenter(){
  document.getElementById("addSericeCenter").style.display = "none";

}




}
export default App;
