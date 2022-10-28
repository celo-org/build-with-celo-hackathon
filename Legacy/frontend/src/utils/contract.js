export const legacyAddress = "0xC85d80669400Ea6a6AED0fed4b5E69810398a7eA"

export const legacyAbi = [
    "function legacies(uint256) view returns (address, address, uint256, uint256, bool)",
    "function legacyIndexes(address owner) view returns(uint256)",
    "function create(address _legatee, uint256 _checkInterval)",
    "function addTokens(address[] memory _tokens)",
    "function checkIn()",
    "function getLegacyTokens(uint256 _index) view returns(address[] memory)",
    "function updateLegacy(address _legatee, uint256 _checkInterval)"
]