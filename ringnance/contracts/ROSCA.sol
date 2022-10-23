// SPDX-License-Identifier: GPL-3.0

import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract ROSCA {

    //Celo Alfajores testnet contract's address
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    uint numberOfTontines = 0;
    uint numberOfGroups = 0;
    uint numberOfMembers = 0;
    uint numberOfCotisations = 0;
    uint numberOfPayments = 0;
    uint numberOfMemberCotisations = 0;

    //defining the needed structs 
    struct Tontine {
        address payable owner;
        uint tontineId;
        string name;
        uint amount;
        uint periodMLengthInTime; 
        uint numberOfPeriods;
        uint startingDate;
    }

    struct Group {
        uint groupId;
        uint tontineId;
        uint numberOfGroupMembers;
    }

    struct Member {
        uint memberId;
        string name;
        address payable memberWalletAddress;
    }

    struct Cotisation {
        uint cotisationId; 
        uint tontineId;
        uint currentPeriod;
        uint periodEndDate;

    } 

    struct MemberCotisation {
        uint memberCotisationId;
        uint memberId;
        uint cotisationId;
        bool memberHasFullyContributed;
        uint currentPaidAmount;
    }

    struct Payment {
        uint paymentId;
        uint memberCotisationId;
        uint amount;
        uint paymentDateAndTime;
    }

    //mapping to track the differents structs
    mapping (uint => Tontine ) internal tontines;
    mapping (uint => Group) internal groups;
    mapping (uint => Member) internal members;
    mapping (uint => Cotisation) internal cotisations;
    mapping (uint => MemberCotisation) internal memberCotisations;
    mapping (uint => Payment) internal payments;

    //mapping between the differents structs
    mapping (uint => uint ) internal tontineGroup;
    mapping (uint => uint) groupMembers;
    mapping (uint => uint) tontineCotisations;
    mapping (uint => uint) paymentForMemberCotisations;
    

    //creating a tontine with its name, amount to pay each period and the amount of time in a cotisation period
    function createTontine(string memory _name, uint _amount, uint _periodMLengthInTime, uint _numberOfPeriods, uint _startingDate) public {

        tontines[numberOfTontines+1] = Tontine (
            payable(msg.sender),
            numberOfTontines+1,
            _name,
            _amount,
            _periodMLengthInTime,
            _numberOfPeriods,
            _startingDate
        );
        
        createGroup(numberOfTontines+1);
        createCotisation(numberOfTontines+1,1,(block.timestamp) + _startingDate);
        createMemberCotisation(numberOfMembers, numberOfCotisations);
        numberOfTontines++;
        
    }


    /** creating a group of members for a specific tontine
    *   the creator of the group is added as the first member
    */
    function createGroup(uint _tontineId) public {
        
        groups[numberOfGroups+1] = Group(
            numberOfGroups+1,
            _tontineId,
            1
        );

        tontineGroup[_tontineId] = numberOfGroups+1;
        numberOfGroups++;

        //After creating a group, we shall add him the creator (owner of tthe tontine) as a group member
        createMember("admin", payable(msg.sender));
        addMemberToGroup(members[numberOfMembers].memberId, numberOfGroups+1);
    }

    // now we create members only using their name and wallet address
    function createMember(string memory _name, address payable _memberWalletAddress) public {
        members[numberOfMembers+1] = Member(
            numberOfMembers+1,
            _name,
            payable(_memberWalletAddress)
        );

        numberOfMembers++;
    }

    // Adding a member to a group directly integrate him to this groub's binded tontine
    function addMemberToGroup (uint _memberId, uint _groupId) public {
        groupMembers[_memberId] = _groupId;
        groups[_groupId].numberOfGroupMembers++;
    }

    // a tontine has many period of contribution and each one is a cotisation
    function createCotisation(uint _tontineId, uint _currentPeriod, uint _endDate) public {
        cotisations[numberOfCotisations+1] = Cotisation(
            numberOfCotisations+1,
            _tontineId,
            _currentPeriod,
            _endDate
        );

        tontineCotisations[numberOfCotisations+1] = _tontineId;
        numberOfCotisations++;
    }
    
    // we shall bind the member to a specific cotisation by current amount he paid
    function createMemberCotisation(uint _memberId, uint _cotisationId) public {
        memberCotisations[numberOfMemberCotisations+1] = MemberCotisation(
            numberOfMemberCotisations+1,
            _memberId,
            _cotisationId,
            false,
            0
        );

        numberOfMemberCotisations++;
    }

    /** because a member must be able to contribute via multiples little payments,
     *  we bind each payment to the member's cotisation and we increase the current paid amount
     *  We think the payment table isn't necessary, we can just match the amount to the "member cotisation"
     *  and consider it as payments
     */
    function createPayment(uint _memberCotisationId, uint _amount) public payable {
        //only a member can contribute for himself
        //if(members[memberCotisations[_memberCotisationId].memberId].memberWalletAddress == msg.sender) {
        IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            address(this),
            _amount
          );
        //saving the payment 
        payments[numberOfPayments+1] = Payment(
            numberOfPayments+1,
            _memberCotisationId,
            _amount,
            block.timestamp
        );

        // we should also add a member to a memberCotisation after the first payment
        memberCotisations[_memberCotisationId].currentPaidAmount += _amount;
        if (keccak256(abi.encodePacked(Strings.toString(memberCotisations[_memberCotisationId].currentPaidAmount)))  == keccak256(abi.encodePacked(Strings.toString(getAmount(_memberCotisationId))))) {
            memberCotisations[_memberCotisationId].memberHasFullyContributed = true;
        }

        paymentForMemberCotisations[numberOfPayments+1] = _memberCotisationId;
        numberOfPayments++;
        //}
        
    }

    //This function should pay the total cotisation amount to a designated beneficiary
    function payTheBeneficiary(uint _cotisationId) public payable {

    }
    // a specific function to get the tontine's contribution amount knowing the member cotisation identifier
    function getAmount(uint _memberCotisationId) public view returns (uint) {
        return tontines[cotisations[memberCotisations[_memberCotisationId].cotisationId].tontineId].amount;
    }

    function getContractBalance() public view returns(uint) {
        return IERC20Token(cUsdTokenAddress).balanceOf(address(this));
    }

    /**
     * Functions to read datas from the Truffle Local Network
     * 
     */


    // a test function designed to show some informations about a tontine
    function listGroupOfTontine(uint _tontineId) public view returns (uint, uint, uint, uint) {
        uint groupId = tontineGroup[_tontineId];
        return (
            groups[groupId].tontineId,
            groups[groupId].numberOfGroupMembers,
            _tontineId,
            groupId
        );
    }
    
    function listNumberOfEachElements() public view returns (uint, uint, uint, uint, uint, uint){
        return (
            numberOfTontines,
            numberOfGroups,
            numberOfMembers,
            numberOfCotisations,
            numberOfPayments,
            numberOfMemberCotisations
        );
    }
    
    //we will modify this function to show all members for a specific tontine
    function listMembersOfTontine(uint _tontineId) public view returns (uint) {
        uint groupId = tontineGroup[_tontineId];
        return groups[groupId].numberOfGroupMembers;
    }

    // showing a specific member
    function showMember(uint _memberId) public view returns (Member memory){
        return members[_memberId];
    }

    function getMemberCotisation(uint _memberId, uint _cotisationId) public view returns (MemberCotisation  memory memberCotisation){
       for(uint i = 1; i <= numberOfMemberCotisations; i++) {
            if(keccak256(abi.encodePacked(Strings.toString(memberCotisations[i].memberId))) == keccak256(abi.encodePacked(Strings.toString(_memberId))) && keccak256(abi.encodePacked(Strings.toString(memberCotisations[i].cotisationId))) == keccak256(abi.encodePacked(Strings.toString(_cotisationId)))){
                memberCotisation = memberCotisations[i];  
            }
        }
        return memberCotisation; 
    }

    function hasMemberTotallyContributed(uint _memberId, uint _cotisationId) public view returns (bool status){
        status = false;
        for(uint i = 1; i <= numberOfMemberCotisations; i++) {
            if(keccak256(abi.encodePacked(Strings.toString(memberCotisations[i].memberId))) == keccak256(abi.encodePacked(Strings.toString(_memberId))) && keccak256(abi.encodePacked(Strings.toString(memberCotisations[i].cotisationId))) == keccak256(abi.encodePacked(Strings.toString(_cotisationId))) && memberCotisations[i].memberHasFullyContributed == true){
                status = true;
            }
        }
        return status;
    }
    
    //Ganache Private key : 0xc46eeb86f1e846d2920cce59a6fad5c4656d5211aa9ed5c10d0f62ac0c8a2c6c
    
}
