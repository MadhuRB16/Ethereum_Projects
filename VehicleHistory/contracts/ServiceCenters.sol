pragma solidity 0.5.16;

/** @title Service Center . */
contract ServiceCenters{
    mapping(address=>bool) serviceneterAddrs; //to know transacting address is registered or not. 
    mapping(address=>string) serviceCenters; // to store service center name.
    event ServiceCenterRigistered(address registeredAddress);
     /** @dev to record service center.
     * @param _servicecenter Service Center name.
     */
   function addServiceCenter(string memory _servicecenter) public{
        require(!serviceneterAddrs[msg.sender],"ServiceCenter already Rigistered");
        serviceneterAddrs[msg.sender]=true;
        serviceCenters[msg.sender]=_servicecenter;
        emit ServiceCenterRigistered(msg.sender);
    }
     /** @dev to fetch servcice center name with respect to address.
     * @param _serviceCenter Service Center address.
      *@return _servicecenter service center name
     */
    function returnServiceCenter(address _serviceCenter)public view returns(string memory _servicecenter){
        require(serviceneterAddrs[_serviceCenter],"ServiceCenter is not Rigistered");
        return serviceCenters[msg.sender];
    }
     /** @dev to know if there exists a service center with respect to address.
     * @param _serviceCenter Service Center address.
      *@return bool returns true if exists else false.
     */
    function isValidServceCenter(address _serviceCenter) public view returns(bool){
        return serviceneterAddrs[_serviceCenter];
    }
}