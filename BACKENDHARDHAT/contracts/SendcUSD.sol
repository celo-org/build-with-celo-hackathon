// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.2;
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
contract sendCeloOrEth{
    uint testbalance ;
    address payable receiver;
    address payable owner;
    event Transfer(address indexed from, address indexed to, uint256 value);
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

// constructor(){
//     owner = payable (msg.sender);
// }

    function donatecUSD( address payable  _receiver)public payable {
        receiver = _receiver;
      
      _receiver.transfer(msg.value);

   
            
       
       
    }
    function checkBalance() public view  returns(uint){
        return IERC20Token(cUsdTokenAddress).balanceOf(msg.sender);
    }
    
    function getbalanceofreceiver()public view returns(uint){
        return IERC20Token(cUsdTokenAddress).balanceOf(receiver);
    }
    
    receive() external payable {
            // React to receiving ether
        }
        fallback() external payable {
            // React to receiving ether
        }

}