// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

interface IAccountManager {
  function getAccount(address) external view returns(address);
  function hasAccount(address) external view returns(bool);
  function createAccount(uint, address) external payable returns(address);
}