import Web3 from 'web3';
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

export const formatAddress = (addr) => {
    return addr.substring(0, 5) + '...' + addr.substring(addr.length - 4);
    //TODO: Use masking instead of hard coding the mask to enable touch and copy on screen
}

export const formatAddress_1 = (addr) => {
    return [addr.substring(0, 2), ...addr.substring(2, addr.length).match(/.{1,4}/g)].join("  ");
}

export const formatAddressLong = (addr) => {
    return addr.substring(0, 10) + '...' + addr.substring(addr.length - 10);
}

export const formatTokenValue = (value) => {
    return web3.utils.fromWei(String(value)).slice(0, 4);
}

export const formatMobileNumber = (number) => {
    return number.slice(0, 5) + '-' + number.slice(5);
}

export const formatNumber = (value) => {
    if(value/1000 < 1){
        return value
    }
    if(value/1000000 < 1) {
        return String(value/1000) + ' K';
    }
    else{
        return String(value/1000000) + ' M';
    }
}

export const formatDate = (date) => {
    return String(date);
}

export const formatNumWithDecimal = (num, decimal) => {
    let value = num/(10**decimal);
    let result = formatNumber(value);
    return result;
}

export const copyToClipboard = (address) => {
    Clipboard.setString(address);
    Toast.show('Address copied to clipboard!')
}

export const formatUnixTimeStamp = (timeStamp) => {
    let date = new Date(timeStamp * 1000);
    return date.toDateString();
}

export const voteDecision = (number)=> {
    if (number ==0){
        return "AGAINST";
    }else if (number == 1){
        return "FOR";
    }
}