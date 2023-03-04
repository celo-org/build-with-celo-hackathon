/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import React from 'react';

export const getStaticProps: GetStaticProps = async(contex) => {

  return {
    revalidate: 5,
    props: {
      data: {
        NFTinfo: null,
        NFTId: 0,
      }
    }
  }

}

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
      <span className='font-bold text-black'>NFT id: {props.data.NFTId}</span>
    </div>
  )
}

export default NFTCard