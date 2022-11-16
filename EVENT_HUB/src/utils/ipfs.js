import axios  from 'axios'

export const eventList = async () => {

  const url = `https://api.pinata.cloud/data/pinList?status=pinned`
  return await axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`
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
      "link": "${link}",
      "owner": "${owner}"
    }
  }`)

  let config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`
    },
    data
  };

  const res = await axios(config);

  return res.data.IpfsHash



}

