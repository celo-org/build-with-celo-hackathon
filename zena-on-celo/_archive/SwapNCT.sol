pragma solidity 0.8.17;

import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract SwapNCT {
  address internal constant UNISWAP_ROUTER_ADDRESS = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D ;

  IUniswapV2Router02 public uniswapRouter;
  address private NctAlfajores = 0xfb60a08855389F3c0A66b29aB9eFa911ed5cbCB5;

  constructor() {
    uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
  }

  function pay(uint paymentAmountInNct) public payable {
      if (msg.value > 0) {
          convertEthToNct(paymentAmountInNcty);
      } 
    //   else {
    //       require(daiToken.transferFrom(msg.sender, address(this), paymentAmountInDai);
    //   }
      // do something with that DAI
      
}

  function convertEthToNct(uint nctAmount) public payable {
    uint deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
    uniswapRouter.swapETHForExactTokens{ value: msg.value }(nctAmount, getPathForETHtoNCT(), address(this), deadline);
    
    // refund leftover ETH to user
    (bool success,) = msg.sender.call{ value: address(this).balance }("");
    require(success, "refund failed");
  }
  
  function getEstimatedETHforNCT(uint nctAmount) public view returns (uint[] memory) {
    return uniswapRouter.getAmountsIn(nctAmount, getPathForETHtoNCT());
  }

  function getPathForETHtoNCT() private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = NctAlfajores;
    
    return path;
  }
  
  // important to receive ETH
  receive() payable external {}
}