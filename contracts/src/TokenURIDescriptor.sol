// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

string constant SVG_START = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 600 600" font-family="Arial, Helvetica, sans-serif"><rect x="0" y="0" width="100%" height="100%" fill="#';
string constant BG_WOB = "ffeaed";
string constant BG_ENH = "b9e7be";
string constant SVG_HEADER = '" rx="5%" /><g id="logo" fill="#0398b0"><path d="m47 25c-18 0 -18 15 -18 18 0 23 25 32 36 32 2 0 3 -1 3 -3 0 -3 -2 -4 -2 -20c0 -15 -4 -27 -19 -27m29 50c-6 0 -6 1 -6 3 0 1 11 33 28 33 9 0 17 -7 17 -17 0 -8 0 -19 -39 -19m 0 -20a12 12 0 1 0 24 0a12 12 0 1 0 -24 0m-34 38a11 11 0 1 0 22 0a11 11 0 1 0 -22 0z" /></g><g id="text" font-size="80"><text x="140" y="110" font-weight="bolder" fill="#000a">SACUDA</text><text x="50%" y="50%" text-anchor="middle" fill="';
string constant FONT_WOB = 'deeppink">';
string constant FONT_ENH = 'green">';
string constant SVG_USERNAME = '</text><text x="50%" y="64%" text-anchor="middle" font-size="36" fill="';
string constant SVG_SCORE = '</text><text x="50%" y="80%" text-anchor="middle" font-size="48" fill="coral">SCORE: ';
// SCORE (uint -> string)
string constant SVG_END = "</text></g></svg>";

library TokenURIDescriptor {
    function getSVG(
        bool _isEnhancer,
        uint256 _score,
        string memory _userName
    ) internal pure returns (string memory) {
        string memory usernameLine;
        string memory bgColor;
        string memory fontColor;
        string memory userType;
        string memory scoringLine;
        if (_isEnhancer) {
            bgColor = BG_ENH;
            fontColor = FONT_ENH;
            userType = "ENHANCER";
        } else {
            bgColor = BG_WOB;
            fontColor = FONT_WOB;
            userType = "WOB";
            scoringLine = string(
                abi.encodePacked(SVG_SCORE, Strings.toString(_score))
            );
        }
        if (bytes(_userName).length > 0) {
            usernameLine = string(
                abi.encodePacked(SVG_USERNAME, fontColor, _userName)
            );
        }
        return
            string(
                abi.encodePacked(
                    SVG_START,
                    bgColor,
                    SVG_HEADER,
                    fontColor,
                    userType,
                    usernameLine,
                    scoringLine,
                    SVG_END
                )
            );
    }

    function tokenURI(
        bool _isEnhancer,
        uint256 _score,
        uint256 _tokenId,
        string memory _userName,
        string memory _name,
        string memory _symbol
    ) internal pure returns (string memory) {
        string memory o = string(
            abi.encodePacked(
                '{"name":"',
                _name,
                " #",
                Strings.toString(_tokenId),
                " (",
                _userName,
                ")"
            )
        );
        string memory output = string(
            abi.encodePacked(
                o,
                '","symbol":"',
                _symbol,
                '","description":"Sacuda Scoring","image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(getSVG(_isEnhancer, _score, _userName))),
                '"}'
            )
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(bytes(output))
                )
            );
    }
}
