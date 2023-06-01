// require('dotenv').config();

const key = process.env.NEXT_PUBLIC_PINATA_KEY
const secret = process.env.NEXT_PUBLIC_PINATA_SECRET

const axios = require('axios');
const FormData = require('form-data');

export const uploadRescueJSONToIPFS = async(JSONBody: {
    language: string;
    name: string;
    numberOfPeople: string;
    lessthen1: string;
    oneTofive: string;
    sixTothirteen: string;
    forAdults: string;
    above60: string;
    reason: string;
    location: string;
    phoneNo: string;
    moreInfo: string;
    }) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response: { data: { IpfsHash: string; }; }) {
           return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error: { message: any; }) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};


export const uploadDonateJSONtoIPFS = async(JSONBody: {
    language: string;
    name: string;
    location: string;
    phoneNo: string;
    time: string;
    date: string;
    locationOfStay: string;
    periodOfStay: string;
    items: string;
    quentity: number;
    img: string;

}) => {
const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
//making axios POST request to Pinata ⬇️
return axios 
    .post(url, JSONBody, {
        headers: {
            pinata_api_key: key,
            pinata_secret_api_key: secret,
        }
    })
    .then(function (response: { data: { IpfsHash: string; }; }) {
       return {
           success: true,
           pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
       };
    })
    .catch(function (error: { message: any; }) {
        console.log(error)
        return {
            success: false,
            message: error.message,
        }

});
};

export const uploadFileToIPFS = async(file: any) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response: { data: { IpfsHash: string; }; }) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error: { message: any; }) {
            console.log(error)
            return {
                success: false,
                message: error,
            }

    });
};