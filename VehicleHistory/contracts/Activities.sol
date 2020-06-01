pragma solidity 0.5.16;

pragma experimental ABIEncoderV2;

/** @title Activities. */
contract Activities{
    //activity object. 
  struct  activity {
        string activityType;
        uint256 date;
        uint256 price;
        string place;
        string additionalNotes;
        uint256 healthRating;
    }
    //list of objects
     activity[] public activitiesList;
     //constructor
    constructor (string memory _activityType, uint256 _date, 
        uint256 _price, string memory  _place, string memory _info) public{
            
        activitiesList.push(activity(_activityType,_date,_price,_place,_info,10));
     
    }
    
    /** @dev to add activities Vhecle has gone through.
     * @param _activityType activity Type.
     * @param datae date of rigistration.
     * @param price price.
     * @param place place
     * @param  _additionalNotes any extra info.
     * @param _healthRating health rating of the vehicle
     */
    function addActivity(string memory _activityType, uint datae, uint price, 
            string memory place, string memory _additionalNotes, uint _healthRating) public { 
         activitiesList.push(activity(_activityType,datae,price,place,_additionalNotes,_healthRating));
     }

   /** @dev to return vehicle history..
     */  
      function  returnDetail()public  view returns(string[] memory ){
          uint  index=0;
          uint temp=0;
          uint lenghtofStringArray;
          uint activitylistLength= activitiesList.length;
          lenghtofStringArray=activitylistLength*6+activitylistLength;
         string[] memory st=new string[](lenghtofStringArray);
           while(index<activitylistLength){
               st[temp]=">>";
             temp++;
            activity memory  _activity=activitiesList[index];
            st[temp]=_activity.activityType;
                temp++;
               st[temp]=uint2str(_activity.date);
                temp++;
               st[temp]=uint2str(_activity.price);
                temp++;
               st[temp]=_activity.place;
              temp++;
               st[temp]=_activity.additionalNotes;
               temp++;
               st[temp]=uint2str(_activity.healthRating);
               temp++;
               index++;
           }
          return st;
      }

//integer to string converter
function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
    if (_i == 0) {
        return "0";
    }
    uint j = _i;
    uint len;
    while (j != 0) {
        len++;
        j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint k = len - 1;
    while (_i != 0) {
        bstr[k--] = byte(uint8(48 + _i % 10));
        _i /= 10;
    }
    return string(bstr);
}
}
