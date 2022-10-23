import invoiceAbi from "./invoice.json";
import paysliceAbi from "./payslice.json";
import exchangeAbi from "./exchange.json";
import libraryAbi from "./zuniswaplibrary.json";

const SliceInterface = {
    address: "",
    abi: invoiceAbi
}

const ExchangeInterface = {
    address: "0x369C0Bd35E3961eDbC74A807eA72d1FC75ada368",
    abi: exchangeAbi
}

const PaysliceInterface = {
    address: "0xE73acbf78b7ED830BD5129749Dee6A80c968179F",
    abi: paysliceAbi
}

const ZuniswapV2LibraryInterface = {
    address: "0x07D4554f82caacCB720e8F8DC1F40A4D86D40A04",
    abi: libraryAbi
}

export {SliceInterface, ZuniswapV2LibraryInterface, PaysliceInterface, ExchangeInterface}