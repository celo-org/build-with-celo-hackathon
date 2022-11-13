import { create } from "ipfs-http-client";
import axios from "axios";

const authorization =
  "Basic " +
  Buffer.from(
    process.env.REACT_APP_PROJECT_ID +
      ":" +
      process.env.REACT_APP_PROJECT_SECRET
  ).toString("base64");

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
  headers: {
    authorization,
  },
});

export const uploadToIpfs = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const added = await client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    return `https://diac.infura-ipfs.io/ipfs/${added.path}`;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
};

export const createNft = async (
  performActions,
  { title, description, ipfsImage, startPrice, endAt }
) => {
  await performActions(async (kit) => {
    if (!title || !description || !ipfsImage) return;
    const { defaultAccount } = kit;

    // convert NFT metadata to JSON format
    const data = JSON.stringify({
      title,
      description,
      image: ipfsImage,
    });

    try {
      const added = await client.add(data);
      const url = `https://diac.infura-ipfs.io/ipfs/${added.path}`;

      const transaction = await window.contract.methods
        .createAuction(title, description, url, startPrice, endAt)
        .send({ from: defaultAccount });

      return transaction;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  });
};

export const bid = async (performActions, id, amount) => {
  await performActions(async (kit) => {
    if (!id) return;
    const { defaultAccount } = kit;

    try {
      const transaction = await window.contract.methods.bid(id).send({
        from: defaultAccount,
        value: amount * 10 ** 18,
      });
      window.location.reload();

      return transaction;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  });
};

export const timeUp = async (performActions, id) => {
  await performActions(async (kit) => {
    if (!id) return;
    const { defaultAccount } = kit;

    try {
      const transaction = await window.contract.methods.timeUp(id).send({
        from: defaultAccount,
      });
      window.location.reload();

      return transaction;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  });
};

export const getAuction = async () => {
  if (!window.contract) return;
  const returnedAuction = [];
  const myReturnedAuction = [];
  const auctions = await window.contract.methods.getAuctions().call();
  const myAuctions = await window.contract.methods.getUserAuctions().call();
  for (let i = 1; i < auctions.length; i++) {
    const auction = new Promise(async (resolve) => {
      const bid = await window.contract.methods
        .getUserBid(auctions[i].id)
        .call();
      const uri = await window.contract.methods.tokenURI(i).call();
      const image = await axios.get(
        uri.replace("ipfs.infura.", "diac.infura-ipfs.")
      );
      resolve({
        ...auctions[i],
        image: image.data.image,
        bid,
      });
    });
    parseInt(auctions[i].endTime) * 1000 > Date.now() &&
      returnedAuction.push(auction);
  }
  for (let i = 1; i < myAuctions.length; i++) {
    const auction = new Promise(async (resolve) => {
      const bid = await window.contract.methods
        .getUserBid(myAuctions[i].id)
        .call();
      const uri = await window.contract.methods.tokenURI(i).call();
      const image = await axios.get(
        uri.replace("ipfs.infura.", "diac.infura-ipfs.")
      );
      resolve({
        ...myAuctions[i],
        image: image.data.image,
        bid,
      });
    });
    myAuctions[i].startPrice > 0 && myReturnedAuction.push(auction);
  }
  console.log(myAuctions, auctions, "jjjj");
  return {
    auctions: await Promise.all(returnedAuction),
    myAuctions: await Promise.all(myReturnedAuction),
  };
};

export const getTimeRemaining = async (id) => {
  const d = await window.contract.methods.getTimeRemaining(id).call();
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  const mDisplay =
    m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "0 minute";
  const sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "0 seconds";
  return hDisplay + mDisplay + sDisplay;
};
