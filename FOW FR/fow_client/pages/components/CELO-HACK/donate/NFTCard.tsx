import React from 'react'

function NFTCard(props: any) {

  const styles = {
    imgbg: `w-72 h-56 flex justify-center items-center rounded-xl bg-sky-600 mb-2`,
    img: `w-8/12 h-4/6 rounded-xl bg-white`,
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className={styles.imgbg}>
        <img src={props.data.NFTinfo} className={styles.img} alt="/" />
      </div>
      <span className='font-bold text-white'>NFT id: {props.data.NFTId}</span>
    </div>
  )
}

export default NFTCard