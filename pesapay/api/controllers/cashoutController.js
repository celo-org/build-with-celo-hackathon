const asynchandler = require("express-async-handler")
const Cashout = require("./models/cashoutModel")

const cashout = asynchandler(async (req, res) => {})

const { ethers } = require("hardhat")
const { signMetaTxRequest } = require("../src/signer")
const { readFileSync, writeFileSync } = require("fs")
require("dotenv").config()
// const { WrapperBuilder } = require("@redstone-finance/evm-connector")
const sdk = require("redstone-sdk")
const protocol = require("redstone-protocol")
const {
  convertStringToBytes32,
} = require("redstone-protocol/dist/src/common/utils")
