// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.0;

contract DriverRole {

    // TODO add benifactor address for drivers
    struct Driver {
        bool isDriver;          
        uint256 rate;           // Driver rate 
        string carAssetUrl;      // Car image and description ie four door , two door color
        string infoAssetUrl;     // Driver image, name , age
    }

    event DriverAdded(address indexed account);
    event DriverRemoved(address indexed account);

    //Roles.Role private drivers;
    mapping(address => Driver) private drivers;

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyDriver() {
        require(isDriver(msg.sender),"Sender isn't a driver");
        _;
    }

    /**
    * @dev Checks if given address is a driver
    *
    */
    function isDriver(address account) public view returns (bool) {
        return drivers[account].isDriver;
    }

    function getDriverRate(address account) 
    public 
    view 
    returns (Driver memory) 
    {
        return drivers[account];
    }

    /**
    * @dev Adds driver
    *
    */
    function addDriver(uint256 _startingRate, string memory _carAssetUrl, string memory _profileAssetUrl) 
    public 
    {
        Driver memory driverDetails;
        driverDetails.isDriver = true;
        driverDetails.rate = _startingRate;
        driverDetails.carAssetUrl = _carAssetUrl;
        driverDetails.infoAssetUrl = _profileAssetUrl;
        drivers[msg.sender] = driverDetails;
        emit DriverAdded(msg.sender);
    }

    /**
    * @dev Removes driver
    *
    */
    function removeDriver() 
    public
    virtual
    onlyDriver
    {
        delete drivers[msg.sender];
        emit DriverRemoved(msg.sender);
    }

    /**
    * @dev Allows driver to update rate
    *
    */
    function updateRate(uint256 _newRate) 
    public 
    virtual
    onlyDriver()
    {
        Driver memory driverDetails = drivers[msg.sender];
        driverDetails.rate = _newRate;
        drivers[msg.sender] = driverDetails; 
    }
}