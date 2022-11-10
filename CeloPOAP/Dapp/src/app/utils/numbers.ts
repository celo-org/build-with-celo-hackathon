import {utils} from 'ethers';

export function formatPercent(value: any){
    if(!value) {
        return 0;
    }
    const val = utils.formatUnits(  value.toString(),0);
    const s = +val / 100 ;
    return s;
}