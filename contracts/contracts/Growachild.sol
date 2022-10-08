// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.2;
 
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import 'hardhat/console.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
 
contract Growachild is
  Initializable,
  ERC20Upgradeable,
  ReentrancyGuardUpgradeable,
  OwnableUpgradeable
{

    uint256 private totalKidsCount;
    using Counters for Counters.Counter;
    Counters.Counter public _campaignID;
    Counters.Counter public _userid;

    struct NGO {
        string name;
        string description;
        string registrationNo;
        string registeredByGovt;
        uint256 serviceSince;
        string ngoAddress;
        string country;
        uint256 campaignCount;
    }

    struct Campaign {
        uint256 campaignID;
        address ngo;
        string campaignPic;
        string name;
        string description;
        uint256 noOfBeneficiaries;
        uint256 dailyFundNeed;
        uint256 availableBalance;
        uint256 totalReceived;
        uint256 totalUsed;
    }

    struct Users {
        uint256 campaignID;
        address userAddress;
        uint256 depositAmount;
        address ngoAddress;
    }
 
  mapping(address => NGO) public ngoDetails;
  address[] private ngoKeys;
  mapping(uint256 => Campaign) public campaignDetails;
  mapping(uint256 => Users) public userDetails;
  mapping(uint256 => bool) private campaignStatus;

  //campaignid => block.timestamp
  mapping(uint256 => uint) private taskCompleted;
  mapping(uint256 => uint) private lastWithdrawn;

     function initialize() public initializer 
     {
    __ERC20_init('', '');
    __ReentrancyGuard_init();
    __Ownable_init();
      }
  modifier onlyLiveCampaign(uint256 _campaignID){
    require(campaignStatus[_campaignID],"Campaign forzen.");
    _;
  }
  
  function completedTask(uint256 campId) external {
    taskCompleted[campId] = block.timestamp;
  }
  function freezeUnfreezeCampaign(uint256 campainId) external onlyOwner nonReentrant{
    campaignStatus[campainId] = !campaignStatus[campainId];
  }

  function withdrawDailyFund(uint256 campainId,address _token) external onlyLiveCampaign(campainId){
    require(msg.sender == campaignDetails[campainId].ngo,"Access Denied");
    require(campaignDetails[campainId].availableBalance > 0,"Insufficient Balance");
    require(taskCompleted[campainId] >= block.timestamp - 1 days,"Daily Task Pending");
    require(lastWithdrawn[campainId] < block.timestamp - 1 days,"Exhausted daily withdrawal limit");

    uint256 dailyLimit = campaignDetails[campainId].dailyFundNeed;
    uint256 available = campaignDetails[campainId].availableBalance;
    lastWithdrawn[campainId] = block.timestamp; 

    if(dailyLimit <= available){
      campaignDetails[campainId].availableBalance -= dailyLimit;
      campaignDetails[campainId].totalUsed += dailyLimit;
      
      IERC20Upgradeable(_token).transfer(payable(msg.sender),dailyLimit);
    }else{
      campaignDetails[campainId].availableBalance = 0;
      campaignDetails[campainId].totalUsed += available;
      IERC20Upgradeable(_token).transfer(payable(msg.sender),available);
    } 
  }

  function checkRegistration() public view returns (bool){
      if(ngoDetails[msg.sender].serviceSince == 0){
          return false;
      }else{
          return true;
      }
  }

  function registerNGO(string memory _name, string memory _description, string memory _registrationNo, string memory _registeredByGovt, uint256 _serviceSince, string memory ngoAddress, string memory _country) external nonReentrant {
      require(!checkRegistration(),"You are already registered.");
      ngoDetails[msg.sender] = NGO(_name,_description,_registrationNo,_registeredByGovt,_serviceSince,ngoAddress,_country,0);
      ngoKeys.push(msg.sender);
  }

  function registerCampign(string memory _name, string memory _campaignPic, string memory _description,uint256 _noOfBeneficiaries, uint256 _dailyFundNeed) external nonReentrant {
      _campaignID.increment();
      uint256 slno = _campaignID.current();
      campaignDetails[slno] = Campaign(slno,msg.sender,_campaignPic,_name,_description,_noOfBeneficiaries,_dailyFundNeed,0,0,0);
      ngoDetails[msg.sender].campaignCount += 1;
      totalKidsCount += _noOfBeneficiaries;
      campaignStatus[slno] = true;
  }

  function getTotalKidsCount() external view returns(uint256){
    return totalKidsCount;
  }

  function getAllCampaigns()
    external
    view
    returns (Campaign[] memory)
  {
    uint256 totalCampaignCount = _campaignID.current();
    uint256 currentIndex = 0;
    Campaign[] memory items = new Campaign[](totalCampaignCount);

        for(uint256 i = 1; i <= totalCampaignCount; i++){
            Campaign storage currentItem = campaignDetails[i];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
    
    return items;
  }
  function getNGODetails(address _addr) public view returns(NGO[] memory){
      
      NGO[] memory items = new NGO[](1);
      NGO storage currentItem = ngoDetails[_addr];
      items[0]= currentItem;
      return  items;
      
  }

  function getCampaignDetails(uint256 id) external view returns (Campaign[] memory){
    
    Campaign[] memory items = new Campaign[](1);
    Campaign storage currentItem = campaignDetails[id];
    items[0] = currentItem;
    return items;
  }

  function deposit(uint256 _ids, uint256 amount, address _token) external payable onlyLiveCampaign(_ids) nonReentrant {
      IERC20Upgradeable(_token).transferFrom(payable(msg.sender),payable(address(this)),amount);
      uint256 slno = _userid.current();
      bool matchFound = false;

      for (uint256 i = 1; i <= slno; i++){
          if(userDetails[i].userAddress == msg.sender && userDetails[i].campaignID == _ids){
            userDetails[i].depositAmount += amount;
            matchFound = true;
            break;
          }
      }

      if(matchFound == false){
          _userid.increment();
          userDetails[_userid.current()] = Users(_ids,msg.sender,amount,campaignDetails[_ids].ngo );
      }
      campaignDetails[_ids].availableBalance += amount;
      campaignDetails[_ids].totalReceived += amount;
  }

  function getMyCampaigns() external view returns (Campaign[] memory){
    uint256 liveCampaignsCount = ngoDetails[msg.sender].campaignCount;

    uint256 totalCampaignCount = _campaignID.current();
    uint256 currentIndex = 0;
    Campaign[] memory items = new Campaign[](liveCampaignsCount);

        for(uint256 i = 1; i <= totalCampaignCount; i++){
          if(campaignDetails[i].ngo == msg.sender){
            Campaign storage currentItem = campaignDetails[i];
            items[currentIndex] = currentItem;
            currentIndex += 1;
          }
        }
    
    return items;
  }

  function getMyDonations() external view returns(Users[] memory){
    uint256 totalUserCount = _userid.current();
    uint256 currentIndex = 0;
    Users[] memory items = new Users[](totalUserCount);

        for(uint256 i = 1; i <= totalUserCount; i++){
          if(userDetails[i].userAddress == msg.sender){
            Users storage currentItem = userDetails[i];
            items[currentIndex] = currentItem;
            currentIndex += 1;
          }
        }
    
    return items;
  }
  
}