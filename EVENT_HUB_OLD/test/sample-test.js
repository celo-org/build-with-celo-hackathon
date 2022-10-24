const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RSVP", function () {
  beforeEach(() => {
    const RSVP = await ethers.getContractFactory("RSVP");
    const rsvp = await RSVP.deploy();
    await rsvp.deployed();
  });

  it ('Should create a new event', () => {
    rsvp.createNewEvent(
      "Christmas Party",
      100,
      1,
      7,
      
    )
  })
});
