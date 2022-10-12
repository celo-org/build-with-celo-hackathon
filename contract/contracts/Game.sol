// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

///@title Guessing Game built on Celo
///@notice Quzzle game with reward and answers stored on-chain
contract Game {

    ///@dev cUSD instance
    IERC20 public cUSD;
    ///@dev id of the current question
    uint public id;

    ///@dev struct to define the what to store for each question
    ///@param answer hashed answer to question
    ///@param reward reward for the question 
    struct Question {
        bytes32 answer;
        uint reward;
    }
    
    event solved(address indexed _player, uint _id, uint _reward);

    ///@notice mapping to store the questions and related details
    mapping(uint => Question) public questions;

    ///@param _cUSD address of the cUSD contract
    constructor(address _cUSD) {
        cUSD = IERC20(_cUSD);
    }

    
    ///@notice This function creates a quzzle
    ///@param _answer hashed answer to the question
    ///@param _reward amount of cUSD reward it should be greater than 5 cUSD
    function create(bytes32 _answer, uint _reward) public {
        require(_reward >= 5, "reward should be greater than 4 cUSD!");
        require(cUSD.allowance(msg.sender, address(this)) >= _reward, "allowance should more than reward!");

        cUSD.transferFrom(msg.sender, address(this), _reward);
        questions[id] = Question(_answer, _reward);
        id++;
    }

    
    ///@notice This function checks if answer and if correct, sends the reward to the solver
    ///@param _id id of the question
    ///@param _answer answer to the question in string format
    function guess(uint _id, string calldata _answer) public {
        bytes32 hashedAnswer = keccak256(abi.encodePacked(_answer));

        if (questions[_id].answer == hashedAnswer) {
            uint _reward = questions[_id].reward;
            questions[_id].reward = 0;
            cUSD.transfer(msg.sender, _reward);
            emit solved(msg.sender, _id, _reward);
        } else {
            revert("Wrong answer!");
        }
    }
}
