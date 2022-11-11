// SPDX-License-Identifier: GPLv3
// koral.earth smart contracts

pragma solidity ^0.8.0;

struct Contribution {
  // amount in CELO wei
  uint amount;

  // carbon offsetting project ID
  string projectId;
}