// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.7;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './P2PLoan.sol';

struct OfferDetails {
  string id;
  address payable lender;
  string lenderName;
  uint256 principal;
  uint256 minLimit;
  uint256 maxLimit;
  uint256 interest;
  uint256 minDuration; //in days
  uint256 maxDuration; //in days
}

struct RequestDetails {
  string id;
  address payable borrower;
  string borrowerName;
  uint256 borrowerScore;
  uint256 principal;
  uint256 interest;
  uint256 minDuration; //in days
  uint256 maxDuration; //in days
}

contract LoanONRs {
  using SafeMath for uint256;
  using SafeMath for uint256;
  //TODO: generate ids from contract! Cannot guarantee uniqueness is created from frontend
  address private loanAddress;
  //List of all Offers
  OfferDetails[] allOffers;
  mapping(string => uint256) offerIndex;
  mapping(address => OfferDetails[]) myOffers;
  mapping(address => mapping(string => uint256)) myOfferIdx;
  //List of all Requests
  RequestDetails[] allRequests;
  mapping(string => uint256) requestIndex;
  mapping(address => RequestDetails[]) myRequests;
  mapping(address => mapping(string => uint256)) myRequestIdx;

  //Offer events
  event CreatedOffer(address lender, OfferDetails OD);
  //Request events
  event CreatedRequest(address borrower, RequestDetails RqD);

  constructor(address _Loans) {
    loanAddress = _Loans;
  }

  function createOffer(OfferDetails memory _OD) external {
    require(msg.sender == _OD.lender, 'Must be owner');
    allOffers.push(_OD);
    offerIndex[_OD.id] = allOffers.length;
    myOffers[msg.sender].push(_OD);
    myOfferIdx[msg.sender][_OD.id] = myOffers[msg.sender].length;
    emit CreatedOffer(msg.sender, _OD);
  }

  function createRequest(RequestDetails memory _RqD) external {
    require(msg.sender == _RqD.borrower, 'Must be owner');
    allRequests.push(_RqD);
    requestIndex[_RqD.id] = allRequests.length;
    myRequests[msg.sender].push(_RqD);
    myRequestIdx[msg.sender][_RqD.id] = myRequests[msg.sender].length;
    emit CreatedRequest(msg.sender, _RqD);
  }

  function getAllOffers() external view returns (OfferDetails[] memory) {
    return allOffers;
  }

  function getMyOffers() external view returns (OfferDetails[] memory) {
    return myOffers[msg.sender];
  }

  function getAllRequests() external view returns (RequestDetails[] memory) {
    return allRequests;
  }

  function getMyRequests() external view returns (RequestDetails[] memory) {
    return myRequests[msg.sender];
  }

  function doesOfferExist(address lender, string memory offerID)
    external
    view
    returns (bool isExisting)
  {
    isExisting = false;
    if (allOffers.length == 0) return false;
    if (myOffers[lender].length == 0) return false;
    OfferDetails memory thisOffer = myOffers[lender][myOfferIdx[lender][offerID].sub(1)];
    if (keccak256(abi.encode(thisOffer.id)) == keccak256(abi.encode(offerID))) return true;
  }

  function doesRequestExist(address borrower, string memory requestID)
    external
    view
    returns (bool isExisting)
  {
    isExisting = false;
    if (allRequests.length == 0) return false;
    if (myRequests[borrower].length == 0) return false;
    RequestDetails memory thisReq = myRequests[borrower][myRequestIdx[borrower][requestID].sub(1)];
    if (keccak256(abi.encode(thisReq.id)) == keccak256(abi.encode(requestID))) return true;
  }

  function _updateOffer(OfferDetails memory updatedOD) internal returns (bool success) {
    require(myOffers[updatedOD.lender].length > 0, 'No offers');
    myOffers[updatedOD.lender][myOfferIdx[updatedOD.lender][updatedOD.id].sub(1)] = updatedOD;
    allOffers[offerIndex[updatedOD.id].sub(1)] = updatedOD;
    return true;
  }

  function _updateRequest(RequestDetails memory updatedRqD) internal returns (bool success) {
    require(myRequests[updatedRqD.borrower].length > 0, 'No requests');
    myRequests[updatedRqD.borrower][
      myRequestIdx[updatedRqD.borrower][updatedRqD.id].sub(1)
    ] = updatedRqD;
    allRequests[requestIndex[updatedRqD.id].sub(1)] = updatedRqD;
    return true;
  }

  function _removeOffer(address lender, string memory offerID) internal returns (bool success) {
    //Atn! OfferID is never deleted from mappings only reset to zero
    require(myOffers[lender].length > 0, 'No offers');
    //Delete from user list
    if (myOffers[lender].length == 1 || myOfferIdx[lender][offerID] == myOffers[lender].length) {
      delete myOfferIdx[lender][offerID];
      myOffers[lender].pop();
    } else {
      //Replace Offer with last offer in list
      myOffers[lender][myOfferIdx[lender][offerID].sub(1)] = myOffers[lender][
        myOffers[lender].length.sub(1)
      ];
      myOfferIdx[lender][myOffers[lender][myOffers[lender].length.sub(1)].id] = myOfferIdx[lender][
        offerID
      ];
      delete myOfferIdx[lender][offerID];
      myOffers[lender].pop();
    }
    //Delete from allList
    if (allOffers.length == 1 || offerIndex[offerID] == allOffers.length) {
      delete offerIndex[offerID];
      allOffers.pop();
    } else {
      //Replace offer with last offer in list
      allOffers[offerIndex[offerID].sub(1)] = allOffers[allOffers.length.sub(1)];
      offerIndex[allOffers[allOffers.length.sub(1)].id] = offerIndex[offerID];
      delete offerIndex[offerID];
      allOffers.pop();
    }
    return true;
  }

  function _removeRequest(address borrower, string memory requestID)
    internal
    returns (bool success)
  {
    //Atn! requestID is never deleted from mappings only reset to zero
    require(myRequests[borrower].length > 0, 'No requests');
    //Delete from user list
    if (
      myRequests[borrower].length == 1 ||
      myRequestIdx[borrower][requestID] == myRequests[borrower].length
    ) {
      delete myRequestIdx[borrower][requestID];
      myRequests[borrower].pop();
    } else {
      //Replace request with last request in list
      myRequests[borrower][myRequestIdx[borrower][requestID].sub(1)] = myRequests[borrower][
        myRequests[borrower].length.sub(1)
      ];
      myRequestIdx[borrower][
        myRequests[borrower][myRequests[borrower].length.sub(1)].id
      ] = myRequestIdx[borrower][requestID];
      delete myRequestIdx[borrower][requestID];
      myRequests[borrower].pop();
    }
    //Delete from allList
    if (allRequests.length == 1 || requestIndex[requestID] == allRequests.length) {
      delete requestIndex[requestID];
      allRequests.pop();
    } else {
      //Replace request with last request in list
      allRequests[requestIndex[requestID].sub(1)] = allRequests[allRequests.length.sub(1)];
      requestIndex[allRequests[allRequests.length.sub(1)].id] = requestIndex[requestID];
      delete requestIndex[requestID];
      allRequests.pop();
    }
    return true;
  }

  function checkOfferLimits(LoanDetails memory _LD) external view returns (bool good) {
    uint256 thisMinLimit = myOffers[_LD.lender][myOfferIdx[_LD.lender][_LD.id].sub(1)].minLimit;
    uint256 thisMaxLimit = myOffers[_LD.lender][myOfferIdx[_LD.lender][_LD.id].sub(1)].maxLimit;
    require(_LD.principal >= thisMinLimit && _LD.principal <= thisMaxLimit, 'only within limits');
    return true;
  }

  function checkRequestLimits(LoanDetails memory _LD) external view returns (bool good) {
    if (
      myRequests[_LD.borrower][myRequestIdx[_LD.borrower][_LD.id].sub(1)].principal == _LD.principal
    ) return true;
  }

  function updateOfferPrincipal(
    address lender,
    string memory id,
    uint256 amount
  ) external {
    require(msg.sender == loanAddress, 'Not authorised');
    myOffers[lender][myOfferIdx[lender][id].sub(1)].principal = myOffers[lender][
      myOfferIdx[lender][id].sub(1)
    ].principal.sub(amount);
    allOffers[offerIndex[id].sub(1)].principal = allOffers[offerIndex[id].sub(1)].principal.sub(
      amount
    );
    if (allOffers[offerIndex[id].sub(1)].principal < allOffers[offerIndex[id].sub(1)].minLimit) {
      _removeOffer(lender, id);
    }
  }

  function updateRequestPrincipal(
    address borrower,
    string memory id,
    uint256 amount
  ) external {
    require(msg.sender == loanAddress, 'Not authorised');
    myRequests[borrower][myRequestIdx[borrower][id].sub(1)].principal = myRequests[borrower][
      myRequestIdx[borrower][id].sub(1)
    ].principal.sub(amount);
    allRequests[requestIndex[id].sub(1)].principal = allRequests[requestIndex[id].sub(1)]
      .principal
      .sub(amount);
    if (allRequests[requestIndex[id].sub(1)].principal == 0) {
      _removeRequest(borrower, id);
    }
  }
}
