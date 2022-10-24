/* eslint-disable no-unused-vars */
import { ethers } from "ethers"

const CLOUDFLARE_ENDPOINT = "https://goerli.prylabs.net"
const MAIN_ENDPOINT = "https://rpc.goerli.mudit.blog"
const ALTERNATE_ENDPOINT = "https://rpc.slock.it/goerli"
const UNSECURE_ENDPOINT = "http://goerli.blockscout.com"
const ALCHEMY_ENDPOINT = process.env.REACT_APP_ALCHEMY_URL

export function createProvider() {
  return new ethers.providers.JsonRpcProvider(
    ALCHEMY_ENDPOINT || MAIN_ENDPOINT,
    5
  )
}
