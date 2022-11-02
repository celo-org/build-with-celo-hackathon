// require('dotenv').config();

const key = process.env.NEXT_PUBLIC_PINATA_KEY
const secret = process.env.NEXT_PUBLIC_PINATA_SECRET
// const key = "a05892eb2f6d9fb84e63"
// const secret = "6b48a733a482dd4bd019e7ff8d24fa89c63f06155ca624d4c0b20aaee1ef36c3"

const axios = require('axios');
const FormData = require('form-data');

export const uploadRescueJSONToIPFS = async(JSONBody: {
        language: string;
        name: string;
        numberOfPeople: string;
        ageGroup: string;
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