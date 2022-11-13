import React, { useState, useMemo, useCallback, useContext,  useEffect  } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { useTheme } from 'next-themes';
import Image from 'next/image';


import Select from 'react-select';

import { Button, Input, Loader } from '../components';
import images from '../assets';
import { NFTContext } from '../context/NFTContext';





import { createContext } from 'react';






const CreateNFT = () => {
  const { uploadToIPFS, createNFT, isLoadingNFT } = useContext(NFTContext);
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ name: '', description: '', price: '' });
  const { theme } = useTheme();
  const router = useRouter();
const loyalty = [
  { label: "Level 1", value: 1 },
  { label: "Level 2", value: 2 },
  { label: "Level 3", value: 3 },
];
const game = [
  { label: "game 1", value: 1 },
  { label: "game 2", value: 2 },
  { label: "game 3", value: 3 },
  { label: "game 4", value: 4 },
];
const tax = [
  { label: "1%", value: 1 },
  { label: "2%", value: 2 },
  { label: "0.5%", value: 3 },
  { label: "0%", value: 4 },
];
const royalty = [
  { label: "Level 1", value: 1 },
  { label: "Level 2", value: 2 },
  { label: "Level 3", value: 3 },
  { label: "Level 4", value: 4 },
];
const form = [
  { label: "Management", value: 1 },
  { label: "ORG", value: 2 },
  { label: "DEV", value: 3 },
  { label: "CUSTOM", value: 4 },
];
const rewards = [
  { label: "20:100", value: 1 },
  { label: "30:100", value: 2 },
  { label: "2:100", value: 3 },
  { label: "1:100", value: 4 },
];
const token = [
  { label: "Winr", value: 1 },
  { label: "Food ", value: 2 },
  { label: "Pellets", value: 3 },
  { label: "Gas", value: 4 },
];
const tags = [
  { label: "Trippy", value: 1 },
  { label: "Hand-made", value: 2 },
  { label: "Rare", value: 3 },
  { label: "Collectable", value: 4 },
  { label: "AI-Generated", value: 5 },
  { label: "Event-Themed", value: 6 },
  { label: "Event-King", value: 7 },
  { label: "Clone", value: 8 },
  { label: "Base", value: 9 },
  { label: "Common", value: 10 },
  { label: "Game-Winner", value: 11 },
  { label: "SRM", value: 12 },
  { label: "CIT", value: 13 },
  { label: "VIT", value: 14 },
  { label: "REC", value: 15 },
  { label: "DGVC", value: 16 },
  { label: "Rotract-Chola", value: 17 },
  { label: "Milan", value: 18 },
  { label: "Fizz", value: 19 },
  { label: "Rotract-SRM", value: 20 },
  { label: "MCC", value: 21 },
  { label: "NSS", value: 22 },
  { label: "ID-Theme", value: 23 },
  { label: "Real", value: 24 },
  { label: "Asset", value: 25 },
  { label: "Fiat", value: 26 },
  { label: "Funny", value: 27 },
  { label: "Cheapest", value: 28 },
  { label: "Gurunanak", value: 29 },
  { label: "Vel-Tech", value: 30 },
];












  if (isLoadingNFT) {
    <div className="flexStart min-h-screen">
      <Loader />
    </div>;
  }

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    console.log(url);
    setFileUrl(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(() => (
    `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed ${isDragActive && 'border-file-active'} ${isDragAccept && 'border-file-accept'} ${isDragReject && 'border-file-reject'}`
  ), [isDragActive, isDragAccept, isDragReject]);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Create new NFT</h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload File</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM Max 100mb.</p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drag and Drop File</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">or Browse media on your device</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) => setFormInput({ ...formInput, description: e.target.value })}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />






  <Input
          inputType="input"
          title="NFT ipfs Link"
          placeholder="https://dogimages.ipfs.com"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
   <Input
          inputType="input"
          title="NFT Metadata ipfs link"
          placeholder="https://dogimagesmeta.json.ipfs.com"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
   <Input
          inputType="input"
          title="ABIS link"
          placeholder="https://sd32kjls.ipfs.com"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <Input
          inputType="input"
          title="Name"
          placeholder="Eg.TrippyProf"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
  <Input
          inputType="input"
          title="EVENT NAME"
          placeholder="Eg.FIZZ"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
  <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">EVENT LOGO</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM Max 100mb.</p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drag and Drop File</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">or Browse media on your device</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
 <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">EVENT BANNER</p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM Max 100mb.</p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drag and Drop File</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">or Browse media on your device</p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
  <Input
          inputType="input"
          title="Name"
          placeholder="Eg.TrippyProf"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
      <Input
          inputType="input"
          title="Designer-Name"
          placeholder="Eg.AWS-Student"
          handleClick={(e) => setFormInput({ ...formInput, dname: e.target.value })}
        />
  <Input
          inputType="input"
          title="Theme"
          placeholder="Eg.Psychedellic"
          handleClick={(e) => setFormInput({ ...formInput, theme: e.target.value })}
        />

  <Input
          inputType="input"
          title="Owner"
          placeholder="Eg.RotractSRMVDP"
          handleClick={(e) => setFormInput({ ...formInput, owner: e.target.value })}
        />
  <Input
          inputType="input"
          title="Genre"
          placeholder="Eg.FundraisingNFT"
          handleClick={(e) => setFormInput({ ...formInput, genre: e.target.value })}
        />

  <Input

          inputType="input"
          title="Loyalty"
          placeholder="Eg.level 1"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
{/* need to connect select dropdown in form handleclick triggor here

*/}
<Select options={ loyalty } />

  <Input

          inputType="input"
          title="game algorithim"
          placeholder="Eg.game2"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
{/* need to connect select dropdown in form handleclick triggor here

*/}
<Select options={ game } />
  <Input

          inputType="input"
          title="Tags"
          placeholder="Eg.Trippy,Funny,Detialed,Reference,Artistic,Hand-made,Rare,"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
{/* need to connect select dropdown in form handleclick triggor here

*/}
<Select options={ tags } isMulti />
        <Input
          inputType="textarea"
          title="NFT-Story"
          placeholder="NFT Description"
          handleClick={(e) => setFormInput({ ...formInput, description: e.target.value })}
        />
        <Input
          inputType="number"
          title="BasePrice"
          placeholder="NFT Base Price "
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />
   <Input
          inputType="number"
          title="FloorPrice"
          placeholder="NFT Floor Price"
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />
   <Input
          inputType="number"
          title="Compensation Price"
          placeholder="NFT Compensation Price"
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />
    <Input

          inputType="input"
          title="Tax"
          placeholder="Eg.2%"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
or
   <Input
          inputType="number"
          title="FUND RAISED PER PERSON"
          placeholder="NFT Compensation Price"
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />
or
   <Input
          inputType="number"
          title="TOTAL FUNDRAISED"
          placeholder="Total amount needed for event"
          handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
        />

{/* need to connect select dropdown in form handleclick triggor here

*/}
<Select options={ tax } /> 
 <Input

          inputType="input"
          title="Royalty Level"
          placeholder="Eg.Level1"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
{/* need to connect select dropdown in form handleclick triggor here

*/}
<Select options={ royalty } />
  <Input

          inputType="input"
          title="Tokens Types"
          placeholder="Eg.Food,WINR,Pellets"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
{/* need to connect select dropdown in form handleclick triggor here

*/}
<Select options={ token } isMulti />
  <Input

          inputType="input"
          title="Lucky-rewards algorithim"
          placeholder="Eg.20:40"
          handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
{/* need to connect select dropdown in form handleclick triggor here

*/}
<Select options={ rewards } />
        













        <div className="mt-10 w-full flex justify-center">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => createNFT(formInput, fileUrl, router)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
