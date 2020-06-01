pragma solidity 0.5.16;

pragma experimental ABIEncoderV2;
import "./Activities.sol";

/** @title VehicleHistory. */
contract VehicleHistory{
    //vehicle level details are stored in below variables.
    mapping (address=>string) public  vehicleType ;
    mapping(string=>address)  public vehicleNumber;
    mapping (address=>string)  public manufacturer ;
    mapping (address=>string)  public modelname ;
    mapping (address=>uint256) public modelyear ;
    mapping (address=>bool) public upForSell;
    mapping (string=>address) public currentOwner;

    //to have list of vhicles registed
    string[]  public vehiclesList;

    //to have list of vehicles ready for sell
    string[] public readyForSellList;
    //to store all activites of a vehivle
    mapping(address=>Activities) public vechicleActivities;

    //Modifier to check vehicle owner
     modifier ownerOnly(string memory vehicleNbr) {
         require((msg.sender == vehicleNumber[vehicleNbr]&& (msg.sender != currentOwner[vehicleNbr])) || 
         ((msg.sender == currentOwner[vehicleNbr])), "Caller is not owner");
         _;
     }
     
    //an event to notify whenever a vehicle is registed for sell
    event vehicleReadyForSell(address indexed vehicleaddr, string indexed _vehicleNumber);
    event vehicleRegistered(uint numberOfVeh);
    event transferedeth(address toAddre);
    /** @dev to Reigister a vehicle with this DAPP.
     * @param _vehicleNumber Vehicle Number.
     * @param _vehicleType Vehicle Type.
     * @param _date date of rigistration.
     * @param _price price.
     * @param _place place
     * @param  _info any extra info.
     */
    function registerVehicle(string memory _vehicleNumber, string memory _vehicleType, uint256 _date, 
        uint256 _price, string memory  _place, string memory _info, 
        string memory _manufacturer, string memory _modelname ) public{
        uint256 _modelyear=modelyear[msg.sender];
        require(!(_modelyear>0),"Vehicle already registed with this address");
        //vehicle level details are set    
        vehicleNumber[_vehicleNumber]=msg.sender;
        vehicleType[msg.sender]=_vehicleType;
        manufacturer[msg.sender]=_manufacturer;
        modelname[msg.sender]=_modelname;
        modelyear[msg.sender]=uint16(1970 + _date / 31536000);
        vehiclesList.push(_vehicleNumber);
        emit vehicleRegistered(vehiclesList.length);
        //Activity is recorded.
       vechicleActivities[msg.sender]= new Activities("New Registration",_date,_price,_place,_info);
      }
    

 /** @dev to Mark vehicle as ready to sell.
     * @param _vehicleNumber Vehicle Number.
     */
    function readyToSellMycar(string memory _vehicleNumber) public ownerOnly(_vehicleNumber){
        require(!upForSell[msg.sender],"Vechicle has been already marked for sell");
        upForSell[msg.sender]=true;
        readyForSellList.push(_vehicleNumber);
       
    }

  /** @dev to Mark vehicle as sold..
     * @param _vehicleNumber Vehicle Number.
     * @param date date of rigistration.
     * @param price price.
     * @param place place
     * @param  _additionalNotes any extra info.
     * @param  _healthRating rating.
     */   
    function sold(string memory _vehicleNumber,uint date,  uint price, 
    string memory place, string memory _additionalNotes, uint _healthRating ) public payable {
        require(upForSell[vehicleNumber[_vehicleNumber]],"Vechicle is not marked for sell");
        emit transferedeth((vehicleNumber[_vehicleNumber]));
         address payable toAddress=address(uint160(vehicleNumber[_vehicleNumber])); 
         address temp;
        if(temp == currentOwner[_vehicleNumber]){
        toAddress= address(uint160(vehicleNumber[_vehicleNumber])) ;
        }else{
          toAddress= address(uint160(currentOwner[_vehicleNumber]));
        }
        
        addVehicleActvity(_vehicleNumber,"Resell", date, price, place, _additionalNotes, _healthRating);

        uint b = msg.sender.balance;
        require(b >= price*1000000000000000000, "Balance too low.");
        toAddress.transfer(price*1000000000000000000);
        emit transferedeth(toAddress);
        currentOwner[_vehicleNumber]=msg.sender;
        upForSell[vehicleNumber[_vehicleNumber]]=false;
       
    }


    /** @dev to add activities Vhecle has gone through.
     * @param _vehicleNumber Vehicle Number.
     * @param _activityType activity Type.
     * @param date date of rigistration.
     * @param price price.
     * @param place place
     * @param  _additionalNotes any extra info.
     * @param _healthRating health rating of the vehicle
     */
        function addVehicleActvity(string memory _vehicleNumber,string memory _activityType, uint date, uint price, 
    string memory place, string memory _additionalNotes, uint _healthRating) public{
        Activities _activities =vechicleActivities[vehicleNumber[_vehicleNumber]];
        _activities.addActivity(_activityType,date,price,place,_additionalNotes,_healthRating);
          
    }


   /** @dev to return vehicle history..
     * @param _vehicleNumber Vehicle Number.
     */      
    function returnDetail(string memory _vehicleNumber) public  view returns(string[] memory){
        require(upForSell[vehicleNumber[_vehicleNumber]],"Vehicle not ready for sell");
        Activities _activities =vechicleActivities[vehicleNumber[_vehicleNumber]];
        string[] memory test=_activities.returnDetail();
       return test;
    }

    /** @dev to return number of vehicle rigistered..
     * @return uint Vehicles Number.
     */      
    function numberOfRegisteredVehicle() public view returns(uint){
    return vehiclesList.length;
    }

    /** @dev to return number of vehicle ready for sell..
     * @return _vehicleNumber Vehicles Number.
     */   
    function numberOfReadyForSellVehicle() public view returns(uint){
    return readyForSellList.length;
    }



}