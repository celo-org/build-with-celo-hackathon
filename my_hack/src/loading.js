import React from 'react';
import Lottie from 'react-lottie';
import * as loading from './loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const Loading = () => {
  return (
    <div style={{marginTop: '15rem'}}>
        <h2 className="text-center">Connect Wallet To Use Dapp</h2>
        <Lottie options={defaultOptions} height={120} width={120} />
    </div>
  )
}

export default Loading;
