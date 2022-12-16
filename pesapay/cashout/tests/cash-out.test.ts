import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ExampleEntity } from "../generated/schema"
import { FundsWithdrawn } from "../generated/CashOut/CashOut"
import { handleFundsWithdrawn } from "../src/cash-out"
import { createFundsWithdrawnEvent } from "./cash-out-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let withdrawAddressNative = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amountWithdrawnNative = BigInt.fromI32(234)
    let newFundsWithdrawnEvent = createFundsWithdrawnEvent(
      withdrawAddressNative,
      amountWithdrawnNative
    )
    handleFundsWithdrawn(newFundsWithdrawnEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("ExampleEntity", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "withdrawAddressNative",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExampleEntity",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
      "amountWithdrawnNative",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
