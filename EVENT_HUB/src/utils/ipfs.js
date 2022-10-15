import axios  from 'axios'


export const eventList = async () => {

  const url = `https://api.pinata.cloud/data/pinList?status=pinned`
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYTg1ODU2Yi0xYmUyLTQyY2MtOTRkMC1hZGJhYmIwNjE0MDciLCJlbWFpbCI6ImNqdXN0aW5vYmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjhmMmFlZjI2YzdmYTc3YWNiZmY2Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDAzNmEwZDBjMzZjYzUyOTE3ZDA5MjlkY2ZlMTc4Njk3NTBmNjM1NGE3YzdiODE4ZDQzNGYxY2NlNDFhY2QyZSIsImlhdCI6MTY2Mzg4Mzc5N30.9_TyYUidh1Y-I67a4AXpmlVvf-WSwnq7RjydDDKe7cI'
      }
    })
    .then(function (response) {
      return response.data.rows
    })
    .catch(function (error) {
      console.log(error)
    });
}



export const addToIPFS = async (
  name,
  deposit,
  dateAndTime,
  timestamp,
  capacity,
  link,
  image,
  owner
) => {



  let data = new FormData()

  data.append('file', image, image.name);
  data.append('pinataOptions', '{"cidVersion": 1}');
  data.append('pinataMetadata', `
  {
    "name": "test",
    "keyvalues": { 
      "name": "${name}",
      "deposit": "${deposit}",
      "dateAndTime": "${dateAndTime}",
      "timestamp": "${timestamp}",
      "capacity": "${capacity}",
      "link": "${link}"
    }
  }`)

  var config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYTg1ODU2Yi0xYmUyLTQyY2MtOTRkMC1hZGJhYmIwNjE0MDciLCJlbWFpbCI6ImNqdXN0aW5vYmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjhmMmFlZjI2YzdmYTc3YWNiZmY2Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDAzNmEwZDBjMzZjYzUyOTE3ZDA5MjlkY2ZlMTc4Njk3NTBmNjM1NGE3YzdiODE4ZDQzNGYxY2NlNDFhY2QyZSIsImlhdCI6MTY2Mzg4Mzc5N30.9_TyYUidh1Y-I67a4AXpmlVvf-WSwnq7RjydDDKe7cI',
    },
    data
  };

  const res = await axios(config);

  return res.data.IpfsHash



 //  var data = {
 //    "pinataOptions": {
 //      "cidVersion": 1
 //    },
 //    "pinataMetadata": {
 //      "name": "testing",
 //      "keyvalues": {
 //        "eventDetails":  JSON.stringify({
 //          name,
 //          deposit,
 //          dateAndTime,
 //          timestamp,
 //          capacity,
 //          link,
 //          image,
 //          owner
 //        })
 //      }
 //    },
 //    "pinataContent":
 //      {
 //        name,
 //        deposit,
 //        dateAndTime,
 //        timestamp,
 //        capacity,
 //        link,
 //        image,
 //        owner
 //      }
 //  }
 //
 //  var config = {
 //    method: 'post',
 //    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
 //    headers: {
 //      'Content-Type': 'application/json',
 //      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYTg1ODU2Yi0xYmUyLTQyY2MtOTRkMC1hZGJhYmIwNjE0MDciLCJlbWFpbCI6ImNqdXN0aW5vYmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjhmMmFlZjI2YzdmYTc3YWNiZmY2Iiwic2NvcGVkS2V5U2VjcmV0IjoiNDAzNmEwZDBjMzZjYzUyOTE3ZDA5MjlkY2ZlMTc4Njk3NTBmNjM1NGE3YzdiODE4ZDQzNGYxY2NlNDFhY2QyZSIsImlhdCI6MTY2Mzg4Mzc5N30.9_TyYUidh1Y-I67a4AXpmlVvf-WSwnq7RjydDDKe7cI'
 //    },
 //    data : data
 //  };
 //
 //  const res = await axios(config);
 //
 // console.log(res.data);
 // return res.data


}


// export async function getFromIPFS(hashToGet) {
//   for await (const file of ipfs.cat(hashToGet)) {
//     const content = new BufferList(file).toString();
//
//     return content;
//   }
// }
