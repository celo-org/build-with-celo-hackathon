//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

/*
*@title: CPay
*@notice: 
*/

contract CPay {

    address public deployer;

    struct Card {
        string cardNumber;
        uint256 balance;
    }

    mapping (address => Card) private Cards;

    event NewCard(address indexed _owner, string  _cardNumber);
    event Topup(address indexed _owner, string _cardNumber, uint256 _amount);
    event Withdraw(address indexed _owner, string _cardNumber, uint256 _amount);
    event Spend(address indexed _owner, string _cardNUmber, uint256 _amount);
    event AdminWithdrawal(address indexed _owner, uint256 _amount);

    constructor(){
        deployer = msg.sender;
    }

    modifier OnlyOwner() {
        require(msg.sender != address(0), "Only card holder can access!");
        _;
    }

    modifier RequireBalance(uint256 _amount) {
        require(_amount < Cards[msg.sender].balance, "Balance needs to be greater than requested amount!");
        _;
    }

    modifier OnlyDeployer(){
        require(msg.sender == deployer, "Only the deployer can call this method");
        _;
    }

    function registerCard(string calldata _cardNumber)external returns(bool){
        Card memory card = Card({cardNumber: _cardNumber, balance:0});
        Cards[msg.sender] = card;
        emit NewCard(msg.sender, _cardNumber);
        return true;
    }

    function accountTopup()external payable returns(bool){
        require(bytes(Cards[msg.sender].cardNumber).length != 0, "You need to first register a card");
        Cards[msg.sender].balance += msg.value;
        emit Topup(msg.sender, Cards[msg.sender].cardNumber, msg.value);
        return true;
    }

    function withdraw(uint _amount) external OnlyOwner RequireBalance(_amount) returns(bool){
        payable(msg.sender).transfer(_amount);
        emit Withdraw(msg.sender, Cards[msg.sender].cardNumber, _amount);
        return true;
    }

    function getBalance(address _address) public view returns(uint256 _balance){
        _balance = Cards[_address].balance;
    }

    function spend(uint _amount)external OnlyOwner RequireBalance(_amount){
        Cards[msg.sender].balance += _amount;
        emit Spend(msg.sender, Cards[msg.sender].cardNumber, _amount);
    }

    function getSmartContractBalance() external view returns(uint) {
        return address(this).balance;
    }

    function adminWithdrawalForCardSettlements(uint256 _amount) external OnlyDeployer{
        payable(msg.sender).transfer(_amount);
        emit AdminWithdrawal(deployer, _amount);
    }

}