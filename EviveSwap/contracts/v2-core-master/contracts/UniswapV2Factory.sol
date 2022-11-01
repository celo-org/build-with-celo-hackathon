pragma solidity >=0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToWar;
    address public feeToBiodiversity;
    address public feeToClimate;
    address public feeToReFi;
    address public feeToSetter;

    bytes32 public constant INIT_CODE_HASH = keccak256(abi.encodePacked(type(UniswapV2Pair).creationCode));

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB) external returns (address pair) {
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IUniswapV2Pair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToWar(address _feeToWar) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToWar = _feeToWar;
    }

    function setFeeToBiodiversity(address _feeToBiodiversity) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToBiodiversity = _feeToBiodiversity;
    }

    function setFeeToClimate(address _feeToClimate) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToClimate = _feeToClimate;
    }

    function setFeeToReFi(address _feeToReFi) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToReFi = _feeToReFi;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
