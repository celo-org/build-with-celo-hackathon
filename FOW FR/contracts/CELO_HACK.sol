// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CELO_HACK {

    struct RescueDetails {
        uint rescueId;
        address owner;
        string rescueInfo;
        address rescuerAddress;
        bool rescuePickup;
        bool rescueRecieved;
        bool rescueClosed;
    }

    struct DonationDetails {
        uint donationId;
        address owner;
        string donationInfo;
        address donarAddress;
        bool donationPickup;
        bool NFTreceived;
        bool donationReceived;
        bool donationClosed;
    }

    struct NFT {
        uint NFTId;
        address owner;
        string NFTinfo;
    }

    uint rescueCount = 0;
    uint donationCount = 0;
    uint count = 0;

    RescueDetails[] public AllRescueDetails;
    DonationDetails[] public AllDonationDetails;
    NFT[] public AllNFTs;

    address payable public owner;



    constructor() {
        owner = payable(msg.sender);
    }

    function transferOwnership(address _newOwner) public {
        require(msg.sender == owner);
        owner = payable(_newOwner);  
    }

    // -------------------------All Rescue Functions---------------------------------------------

    function SendRescueRequest
    (
        string memory _rescueInfo

    ) public {

        RescueDetails memory tempRescueDetails;

        tempRescueDetails.rescueId = rescueCount;
        tempRescueDetails.owner = owner;
        tempRescueDetails.rescuerAddress = msg.sender;
        tempRescueDetails.rescueInfo = _rescueInfo;

        AllRescueDetails.push(tempRescueDetails);
        rescueCount++;
    }

    function getAllRescueRequest() public view returns(RescueDetails[] memory) {
        return AllRescueDetails;
    }

    function getRescuePickup(uint _rescueId) public {
        require(owner == msg.sender, "Only owner can call this function");  // Here Id starts from (0 -> infinity)
        require(AllRescueDetails[_rescueId].rescueRecieved == false);
        require(AllRescueDetails[_rescueId].rescuePickup == false);
        require(AllRescueDetails[_rescueId].rescueClosed == false);

        AllRescueDetails[_rescueId].rescuePickup = true;
    }

    function getRescueRecieved(uint _rescueId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllRescueDetails[_rescueId].rescuePickup == true);
        require(AllRescueDetails[_rescueId].rescueClosed == false);
        require(AllRescueDetails[_rescueId].rescueRecieved == false);

        AllRescueDetails[_rescueId].rescueRecieved = true;
    }

    function getRescueClosed(uint _rescueId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllRescueDetails[_rescueId].rescuePickup == true);
        require(AllRescueDetails[_rescueId].rescueRecieved == true);
        require(AllRescueDetails[_rescueId].rescueClosed == false);

        AllRescueDetails[_rescueId].rescueClosed = true;
    }

    function getAllMyRescueDetails() public view returns(RescueDetails[] memory) {
        uint totalRescueCount = rescueCount;
        uint rescue = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalRescueCount; i++) {
            if(AllRescueDetails[i].rescuerAddress == msg.sender) {
                rescue++;
            }
        }

        RescueDetails[] memory myRescue = new RescueDetails[](rescue);
        for(uint i = 0; i < totalRescueCount; i++) {
            if(AllRescueDetails[i].rescuerAddress == msg.sender) {
                myRescue[currentIndex] = AllRescueDetails[i];
                currentIndex++;
            }
        }

        return myRescue;

    }

    // -------------------------All Donation Functions---------------------------------------------

    function SendDonationRequest
    (
        string memory _donationInfo

    )public {
        
        DonationDetails memory tempDonationDetails;

        tempDonationDetails.donationId = donationCount;
        tempDonationDetails.owner = owner;
        tempDonationDetails.donarAddress = msg.sender;
        tempDonationDetails.donationInfo = _donationInfo;

        AllDonationDetails.push(tempDonationDetails);
        donationCount++;
    }

    function getAllDonationRequest() public view returns(DonationDetails[] memory) {
        return AllDonationDetails;
    }

    function getDonationPickup(uint _donationId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllDonationDetails[_donationId].donationReceived == false);
        require(AllDonationDetails[_donationId].donationClosed == false);
        require(AllDonationDetails[_donationId].donationPickup == false);

        AllDonationDetails[_donationId].donationPickup = true;
    }


    function createNFT
    (
        uint _donationId,
        string memory _NFTinfo

    ) public {
        require(owner == msg.sender);
        NFT memory tempNFTs;

        tempNFTs.NFTId = count;
        tempNFTs.owner = AllDonationDetails[_donationId].donarAddress;
        tempNFTs.NFTinfo = _NFTinfo;

        AllNFTs.push(tempNFTs);
        AllDonationDetails[_donationId].NFTreceived = true;
        count++;
    }

    function getAllMyNFT() public view returns(NFT[] memory) {
        uint totalNFT = count;
        uint nft = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalNFT; i++) {
            if(AllNFTs[i].owner == msg.sender) {
                nft++;
            }
        }

        NFT[] memory nftOwner = new NFT[](nft);
        for(uint i = 0; i < totalNFT; i++) {
            if(AllNFTs[i].owner == msg.sender) {
                nftOwner[currentIndex] = AllNFTs[i];
                currentIndex++;
            }
        }

        return nftOwner;
    }
    

    function getDonationReceived(uint _donationId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllDonationDetails[_donationId].donationPickup == true);
        require(AllDonationDetails[_donationId].NFTreceived == true);
        require(AllDonationDetails[_donationId].donationReceived == false);
        require(AllDonationDetails[_donationId].donationClosed == false);

        AllDonationDetails[_donationId].donationReceived = true;
    }

    function getDonationClosed(uint _donationId) public {
        require(owner == msg.sender, "Only owner can call this function");
        require(AllDonationDetails[_donationId].donationPickup == true);
        require(AllDonationDetails[_donationId].NFTreceived == true);
        require(AllDonationDetails[_donationId].donationReceived == true);
        require(AllDonationDetails[_donationId].donationClosed == false);

        AllDonationDetails[_donationId].donationClosed = true;
    }

    function getAllMyDonationDetails() public view returns(DonationDetails[] memory) {
        uint totalDonationCount = donationCount;
        uint donation = 0;
        uint currentIndex = 0;

        for(uint i = 0; i < totalDonationCount; i++) {
            if(AllDonationDetails[i].donarAddress == msg.sender) {
                donation++;
            }
        }

        DonationDetails[] memory myDonar = new DonationDetails[](donation);
        for(uint i = 0; i < totalDonationCount; i++) {
            if(AllDonationDetails[i].donarAddress == msg.sender) {
                myDonar[currentIndex] = AllDonationDetails[i];
                currentIndex++;
            }
        }

        return myDonar;
    }

    
}