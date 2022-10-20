import React, {Component} from 'react';
import { create } from 'ipfs-core'

class IPFSInfo  {

  static get properties() {
    return {
      _ipfs: {state: true},
      _id: {state: true},
      _version: {state: true},
      _agentVersion: {state: true}
    }
  }

  constructor() {

    this._ipfs = null;
    this._id = null;
    this._version = null;
    this._agentVersion = null;
    this.initIPFS();
  }

  connectedCallback() {
    super.connectedCallback()
    console.log("CALLED");
    
  }

  async initIPFS() {
    const ipfs = await create();
    
    const id = await ipfs.id();
    const version = await ipfs.version();

    this._ipfs = ipfs
    this._id = id.id;
    this._agentVersion = id.agentVersion;
    this._version = version.version;
  }

}

export default IPFSInfo;