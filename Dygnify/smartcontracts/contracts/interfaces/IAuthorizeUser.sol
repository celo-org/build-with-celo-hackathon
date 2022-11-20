// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface IAuthorizeUser {
    function addToauthorizedUserList(address _user) external;

    function removeFromauthorizedUserList(address _user) external;

    function isUserAuthorized(address _user) external returns (bool);
}
