//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "./TransferHelper.sol";

interface IERC20 {
    function balanceOf(address owner) external returns(uint256 balance);
    function allowance(address owner, address spender) external returns(uint256 remaining);
}

contract Legacies is KeeperCompatible {
    Legacy[] public legacies;
    mapping(address=>uint256) public legacyIndexes;

    struct Legacy {
        address owner;
        address legatee;
        address[] tokens;
        uint256 lastSeen;
        uint256 checkInterval;
        bool fulfilled;
    }

    constructor() {
        //Create dummy legacy to occupy index 0
        create(address(0), 0);
    }

    function create(address _legatee, uint256 _checkInterval) public {
        uint256 _index = legacies.length;
        // Revert if msg.sender already has an active legacy!
        require(legacyIndexes[msg.sender] == 0, "Legacy exist!");
        legacies.push(Legacy(msg.sender, _legatee, new address[](0), block.timestamp, _checkInterval, false));
        legacyIndexes[msg.sender] = _index;
    }

    function cancel() public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        delete legacies[_index];
        legacyIndexes[msg.sender] = 0;
    }
    
    function updateLegacy(address _legatee, uint256 _checkInterval) public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        legacies[_index].checkInterval = _checkInterval;
        legacies[_index].legatee = _legatee;
    }

    function updateCheckInterval(uint256 _checkInterval) public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        legacies[_index].checkInterval = _checkInterval;
    }

    function updateLegatee(address _legatee) public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        legacies[_index].legatee = _legatee;
    }

    function checkIn() public {
        uint256 _index = legacyIndexes[msg.sender];
        require(legacies[_index].owner == msg.sender, "not owner!");
        legacies[_index].lastSeen = block.timestamp;
    }

    function getLegacyTokens(uint256 _index) public view returns(address[] memory) {
        return legacies[_index].tokens;
    }

    function addTokens(address[] memory _tokens) public {
	uint256 _index = legacyIndexes[msg.sender];
        for (uint256 i = 0; i < _tokens.length; i++) {
            IERC20 _token = IERC20(_tokens[i]);
            //Confirm token approval
            require(_token.allowance(msg.sender, address(this)) == type(uint256).max, "not approved!");
            legacies[_index].tokens.push(_tokens[i]);
        }
    }

    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory performData ) {
        upkeepNeeded = false;
        //Get 10 legacies due for fulfillment
        for (uint256 i = 0; i < legacies.length; i++) {
            Legacy memory _legacy = legacies[i];
            if (!_legacy.fulfilled && block.timestamp - _legacy.lastSeen > _legacy.checkInterval) {
                upkeepNeeded = true;
                performData = abi.encode(i);
                break;
            }
        }

    }

    function performUpkeep(bytes calldata performData ) external override {
        //Decode perfromData
        uint256 index = abi.decode(performData, (uint256));

        Legacy memory _legacy = legacies[index];    
        //Confirm performData
        require(block.timestamp - _legacy.lastSeen > _legacy.checkInterval, "not due!" );
        legacies[index].fulfilled = true;

        //Transfer tokens to legatee
        for (uint256 i = 0; i < _legacy.tokens.length; i++) {
  		    address _token = _legacy.tokens[i];
            uint256 _allowed = IERC20(_token).allowance(_legacy.owner, address(this));
            uint256 _balance = IERC20(_token).balanceOf(_legacy.owner);
            // Skip tokens not approved
            if (_allowed < _balance) {
                continue;
            }
            TransferHelper.safeTransferFrom(
                _token,
                _legacy.owner,
                _legacy.legatee,
                _balance
            );
        }
    }
}
