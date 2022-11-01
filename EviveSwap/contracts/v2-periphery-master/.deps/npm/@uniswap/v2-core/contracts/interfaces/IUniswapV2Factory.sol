pragma solidity >=0.5.0;

interface IUniswapV2Factory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    function feeTo() external view returns (address);
    function feeToWar() external view returns (address);
    function feeToBiodiversity() external view returns (address);
    function feeToClimate() external view returns (address);
    function feeToReFi() external view returns (address);
    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint) external view returns (address pair);
    function allPairsLength() external view returns (uint);

    function createPair(address tokenA, address tokenB) external returns (address pair);

    function setFeeTo(address) external;
    function setFeeToWar(address) external;
    function setFeeToBiodiversity(address) external;
    function setFeeToClimate(address) external;
    function setFeeToReFi(address) external;
    function setFeeToSetter(address) external;
}
