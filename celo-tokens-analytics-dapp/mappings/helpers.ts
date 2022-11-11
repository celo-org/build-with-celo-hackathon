/* eslint-disable prefer-const */
import {Address, BigDecimal, BigInt,} from "@graphprotocol/graph-ts";
import {User,} from "../../generated/schema";
import {ERC20} from "../../generated/cEUR/ERC20";
import {ERC20SymbolBytes} from "../../generated/cEUR/ERC20SymbolBytes";
import {ERC20NameBytes} from "../../generated/cEUR/ERC20NameBytes";

export const CELO_ADDRESS = "0x471EcE3750Da237f93B8E339c536989b8978a438";

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let BI_18 = BigInt.fromI32(18);


export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString("1");
    for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
        bd = bd.times(BigDecimal.fromString("10"));
    }
    return bd;
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
    return eth.toBigDecimal().div(exponentToBigDecimal(BI_18));
}

export function convertTokenToDecimal(
    tokenAmount: BigInt,
    exchangeDecimals: BigInt
): BigDecimal {
    if (exchangeDecimals == ZERO_BI) {
        return tokenAmount.toBigDecimal();
    }
    return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals));
}
export function isNullEthValue(value: string): boolean {
    return (
        value ==
        "0x0000000000000000000000000000000000000000000000000000000000000001"
    );
}

export function fetchTokenSymbol(tokenAddress: Address): string {
    if (tokenAddress.toHexString() == CELO_ADDRESS) {
        return "CELO";
    }

    let contract = ERC20.bind(tokenAddress);
    let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);

    let symbolValue = "unknown";
    let symbolResult = contract.try_symbol();
    if (symbolResult.reverted) {
        let symbolResultBytes = contractSymbolBytes.try_symbol();
        if (!symbolResultBytes.reverted) {
            if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
                symbolValue = symbolResultBytes.value.toString();
            }
        }
    } else {
        symbolValue = symbolResult.value;
    }

    return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string {
    if (tokenAddress.toHexString() == CELO_ADDRESS) {
        return "Celo Native Asset";
    }

    let nameValue = "unknown";
    let contract = ERC20.bind(tokenAddress);
    let contractNameBytes = ERC20NameBytes.bind(tokenAddress);
    let nameResult = contract.try_name();
    if (nameResult.reverted) {
        let nameResultBytes = contractNameBytes.try_name();
        if (!nameResultBytes.reverted) {
            if (!isNullEthValue(nameResultBytes.value.toHexString())) {
                nameValue = nameResultBytes.value.toString();
            }
        }
    } else {
        nameValue = nameResult.value;
    }

    return nameValue;
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
    let contract = ERC20.bind(tokenAddress);
    return contract.totalSupply();
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    let contract = ERC20.bind(tokenAddress);
    let decimalValue = 0;
    let decimalResult = contract.try_decimals();
    if (!decimalResult.reverted) {
        decimalValue = decimalResult.value;
    }

    return BigInt.fromI32(decimalValue);
}

export function createUser(address: Address, token: string, blockTimestamp: BigInt): void {
    let userIdentifier = address.toHexString().concat("-").concat(token)
    let user = User.load(userIdentifier);
    if (!user) {
        user = new User(address.toHexString());
        user.user = address
        user.token = token;
    }

    user.lastUpdatedTimestamp = blockTimestamp;
    user.save();
}

