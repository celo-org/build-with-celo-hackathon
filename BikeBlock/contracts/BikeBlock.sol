// 9926f0a469b97df63862bf01d26ef52a8e864b8e5fd1d759dc936e2d3552ce67
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// As for now we are going to treat this contract as escrow
// TODO use celos escrow contract
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title BikeBlock
 * @author Mitchell Tucker (@MitchTODO)
 * @dev Modified ERC721 for bikes to have a digital representation
 * 
 * note 
 * - bikeId  : bytes32 keccak256 hash of bike serial number
 * - tokenId : uint256 of token represents bike digitally 
 *
 */

contract BikeBlock is  ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //address constant private cUSD = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    //address private token;
    IERC20 _token;

    // States for a token
    enum State {
        None,
        Normal, 
        Stolen,
        Found
    }

    // Coordinate for location
    struct Coordinate {
        uint256 lat;
        uint256 long;
    }

    // Stolen details of the stolen bike
    struct Stolen{
        uint256 time;
        Coordinate location;
        uint256 bountyPayOut;
        uint256 index;
    }

    struct RecoveryReport {
        address rescuers; // Who reported a stolen bike
        string assetURI;   // TODO change to bytes Where the stolen bike is
    }


    // Maps tokenId to state of bike
    mapping(uint256 => State) public bikeState;

    // Map bikes serial hash to tokenId (NFT)
    mapping(bytes32 =>  uint256) public bikes;

    // Map tokenId to stolen bike info
    mapping(uint256 => Stolen) public stolenState;

    // Array of stolen bikes 
    uint256[] stolenBikes;

    // Mapping of reportId sent in buy user
    mapping(bytes32 => RecoveryReport) private recovery;
    // Mapping of tokenId to array of reportId's
    mapping(uint256 => bytes32[]) public reports;

    // Events
    event ReportStolenBike(uint256 tokenId);

    // Modifiers
    modifier checkAllowance(uint amount) {
        require(_token.allowance(msg.sender, address(this)) >= amount, "Incorrect allowance amount");
        _;
    }
    
    constructor(address _tokenAddress) 
    ERC721("BikeBlock", "Bike") 
    {
        _token = IERC20(_tokenAddress);
    }


    /**
     * @dev SafeMint for new bike tokens
     * @param _serialHash  keccak256 hash of bike serial number
     * @param _to address of tokne owner
     * @param _uri metadata for the bike
     */
    function safeMint(bytes32 _serialHash, address _to, string memory _uri)
        public
        whenNotPaused
    {
        require(checkIfRegistered(_serialHash),"Bike has already been registered");
        // Increment tokenId
        uint256 newTokenId = _tokenIds.current();
        _beforeTokenTransfer(address(0),_to,newTokenId);
        
        _tokenIds.increment();
        // Mint and set uri
        _safeMint(_to, newTokenId);
        _setTokenURI(newTokenId, _uri);
        // Map serial hash to tokenId and set bike state 
        bikes[_serialHash] = newTokenId;
        bikeState[newTokenId] = State.Normal;
    }

    /**
     * @dev given a serial hash returns the related token id
     * @param bikeId keccak256 hash of bike serial number.
     * @return uint256 token id mapped to the bikeId
     */

    function bikeLookUp(bytes32 bikeId) 
    public 
    view
    returns(uint256)
    {
        return(bikes[bikeId]);
    }



    /**
     * @dev returns state for a given token id
     * @param tokenId id of token
     * @return State enum of current token state
     */
    function getBikeState(uint256 tokenId) 
    public
    view
    returns(State)
    {
        return(bikeState[tokenId]);
    }



    /**
     *@dev returns bool if the bike Id has been registered
     *@param bikeId id of bike to be checked
     *@return bool if bike hash been registered
     * 
     */
    function checkIfRegistered(bytes32 bikeId) 
    public
    view
    returns(bool)
    {
        return(bikes[bikeId] == 0);
    }



    /**
     * @dev returns bool of owner is token owner
     * @param owner address checked for ownership
     * @param tokenId id of token
     * @return Bool if bike is registered
     *
     */
    function isTokenOwner(address owner,uint256 tokenId)
    public 
    view
    returns(bool)
    {
        return(owner == ownerOf(tokenId));
    }



    /**
     * @dev returns bool if given token is in stolen state
     * @param tokenId id of token
     * @return Bool if bike is stolen
     *
     */
    function isStolen(uint256 tokenId)
    public
    view
    returns(bool)
    {
        return(bikeState[tokenId] == State.Stolen);
    }


    /***************** Bike Recovery **********************/

    /**
    *@dev returns amount of reports for a token
    *@param _tokenId token for reports
    *@return uint256 amount of reports
    */
    function getReportCountForToken(uint256 _tokenId) 
    public
    view 
    returns(uint256)
    {
        return(reports[_tokenId].length);
    }

    /**
    *@dev returns reportId 
    *@param _tokenId token for report
    *@param _index index for report
    *@return bytes32 amount of reports
    */
    function getReportAtIndex(uint256 _tokenId,uint256 _index) 
    public
    view
    returns(bytes32)
    {
        return(reports[_tokenId][_index]);
    }

    /**
    *@dev returns recovery report 
    *@param _reportId reportId for report
    *@return RecoveryReport amount of reports
    */
    function getRecoveryReport(bytes32 _reportId)
    public
    view
    returns( RecoveryReport memory)
    {
        return(recovery[_reportId]);
    }

    /**
     * @dev setStolenBike allow bike owner to set bike as stolen
     *
     * TODO add time base reward system
     * TODO Mover over to celo escrow contract
     *      - If bike was not found within a certain time frame reward is returned back to owner
     *
     * @param tokenId id of token (NFT) 
     * @param _time time bike was stolen
     * @param _location location bike was stolen (Might change to address)
     * @param _bountyPayOut amount set for bike bounty
     *
     */

    function setStolenBike(uint256 tokenId,uint256 _time,Coordinate memory _location, uint256 _bountyPayOut) 
    public
    whenNotPaused
    {
        require(isTokenOwner(msg.sender,tokenId),"Not token owner");
        require(_token.allowance(msg.sender, address(this)) >= _bountyPayOut, "Insufficient allowance");
        //require(ercToken.balanceOf(msg.sender) < _bountyPayOut,"Insufficient funds for bounty price.");
        require(_token.transferFrom(msg.sender,address(this),_bountyPayOut),"transfer Failed");

        Stolen memory stolenInfo;
        stolenInfo.time = _time;
        stolenInfo.location = _location;
        stolenInfo.bountyPayOut = _bountyPayOut;
        stolenInfo.index = stolenBikes.length;
        // Set info in stolenState 
        stolenState[tokenId] = stolenInfo; 
        bikeState[tokenId] = State.Stolen;
        // Push to stolenBikes array
        stolenBikes.push(tokenId);         
    }


    /**
     * @dev reportStolenBike allows a user to report a stolen bike
     *
     * @param _serialNumber serial number for a registered bike 
     * @param stolenAssetUri URI containing info on the where abouts of the bike 
     * 
     */
    function reportStolenBike(string memory _serialNumber, string memory stolenAssetUri) 
    public
    {
        // Check if serial number matches with a registered bike
        bytes32 bikeId = keccak256(abi.encodePacked(_serialNumber));
        uint256 tokenId = bikes[bikeId];
        State state = bikeState[tokenId];
    
        require(state != State.None,"Bike isn't registered");
        require(state == State.Stolen,"Bike isn't stolen");
        
        // Create recovery struct with the address who report bike
        RecoveryReport memory report;
        report.assetURI = stolenAssetUri;
        report.rescuers = msg.sender;
        bytes32 reportId = keccak256(abi.encode(report));

        //add report to reovery mapping
        recovery[reportId] = report;

        // Add reportId to array of reports
        reports[tokenId].push(reportId);

        emit ReportStolenBike(tokenId);
    }


    /**
     * @dev payOutBounty allows a token owner to payout bounty
     *
     * @param tokenId token number for to payout boundy
     * @param reportId report that win payout
     * 
     */
    function payOutBounty(uint256 tokenId,bytes32 reportId)
    public 
    {
        require(isTokenOwner(msg.sender,tokenId),"Your not bike owner");
        State state = bikeState[tokenId];
        // Check if bike is stolen 
        require(state == State.Stolen,"Bike is not stolen");
        Stolen memory ss = stolenState[tokenId]; 
        RecoveryReport memory report = recovery[reportId];
        // Transfer to reporter 
        // payout to reporter from contract
      
        require(_token.transfer(report.rescuers,ss.bountyPayOut),"transfer Failed");
        // Set bike state to found
        bikeState[tokenId] = State.Found;
    }


    /**
    *@dev Pause for admin control
    */
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /**
    * @dev See {ERC721Enumerable-_beforeTokenTransfer}.
    */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /**
    * @dev See {ERC721Enumerable-_beforeTokenTransfer}.
    */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    
    /**
    * @dev Fetch meta data for tokenURI
    */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
    * @dev See {IERC165-supportsInterface}.
    */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

}

