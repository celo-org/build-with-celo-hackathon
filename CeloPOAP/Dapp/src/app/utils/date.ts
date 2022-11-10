import {utils} from 'ethers';

export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function formatEtherDateToJs(bn){
  const val = utils.formatUnits(  bn.toString(),0);
  const s = +val ;

  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  let date = new Date(s * 1000);
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  const seconds = "0" + date.getSeconds();

  const formattedTime = `${monthNames[date.getMonth()].substr(0,3)} ${date.getDate()}, ${date.getFullYear()} ` + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;
}


export function formatDateToJsString(date: Date){
  
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  const seconds = "0" + date.getSeconds();

  const formattedTime = `${monthNames[date.getMonth()].substr(0,3)} ${date.getDate()}, ${date.getFullYear()} ` + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formattedTime;
}



export function getDateFromEther(bn){
  const val = utils.formatUnits(  bn.toString(),0);
  const s = +val ;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  return new Date(s * 1000);
}