import { Web3Storage, File } from "web3.storage";
import { Buffer } from "buffer";

function makeStorageClient() {
  return new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_APIKEY });
}

export async function storeFiles(files) {
  try {
    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  } catch (error) {
    console.log(error);
  }
}

export function makeFileObjects(jsonData, fileName) {
  try {
    if (!jsonData || !fileName) {
      return;
    }
    const buffer = Buffer.from(JSON.stringify(jsonData));
    return [new File([buffer], fileName)];
  } catch (error) {
    console.log(error);
  }
}

export function getIPFSFileURL(cid) {
  if (!cid) {
    return;
  }

  return `https://${cid}.ipfs.dweb.link`;
}

export async function retrieveFiles(cid, firstFileOnly) {
  try {
    if (!cid) {
      return;
    }

    const client = makeStorageClient();
    const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      console.log(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
      return;
    }

    // unpack File objects from the response
    const files = await res.files();

    if (firstFileOnly) {
      return files[0];
    }
    return files;
  } catch (error) {
    console.log(error);
  }
}
