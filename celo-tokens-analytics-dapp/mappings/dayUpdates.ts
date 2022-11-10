/* eslint-disable prefer-const */
import {
    BigInt,
    ethereum
} from "@graphprotocol/graph-ts";
import {
    Token,
    TokenDayData,
} from "../../generated/schema";
import { ONE_BI, ZERO_BD, ZERO_BI } from "./helpers";


export function updateTokenDayData(token: Token, event: ethereum.Event): TokenDayData {
    let timestamp = event.block.timestamp.toI32();
    let dayID = timestamp / 86400;
    let dayStartTimestamp = dayID * 86400;
    // @ts-ignore
    let tokenDayID = token.id.toString().concat("-").concat(BigInt.fromI32(dayID).toString());

    let tokenDayData = TokenDayData.load(tokenDayID);
    if (tokenDayData === null) {
        tokenDayData = new TokenDayData(tokenDayID);
        tokenDayData.dayTimestamp = dayStartTimestamp;
        tokenDayData.token = token.id;
        tokenDayData.dailyVolumeToken = ZERO_BD;
        tokenDayData.dailyGasConsumed = ZERO_BD;
        tokenDayData.dailyTxns = ZERO_BI;
    }

    tokenDayData.lastUpdatedTimestamp = token.lastUpdatedTimestamp
    tokenDayData.dailyTxns = tokenDayData.dailyTxns.plus(ONE_BI);
    tokenDayData.save();

    return tokenDayData as TokenDayData;
}
