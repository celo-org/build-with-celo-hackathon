import {useState} from 'react'
import styles from './fundraiserproject.module.scss'
import Navbar from '../../layouts/navbar/Navbar'
import OtherFundraisers from '../../layouts/otherfundraisers/Otherfundraisers'
import Footer from '../../layouts/footer/Footer'
import Link from 'next/link'
import Image from 'next/image'
import arrowLeftSvg from '../../assets/arrow-left.svg'
import UserIcon from '../../assets/user.svg'
import DonateModal from '../../layouts/donateModal/DonateModal'
import AllDonors from '../../layouts/allDonors/AllDonors'
import Succour_abi from "../../abi/abi.json"
import { useContractRead } from 'wagmi'
import { useRouter } from 'next/router'

const FundraiserProject = () => {
  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"

  const {query} = useRouter()
  const pageId = query.id

  const {data: goFundMe} = useContractRead({
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'returnAllGoFunds'
  })

  const hexToDecimal = (hex:any) => parseInt(hex, 16);

  const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(prev => !prev);
    }

    //handle sharing button
    const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "You are sharing succour information",
          text: "Hello, please come visit my website",
          url: "www.website.com.br",
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
    }
  };

  return (
    <>
    <>
      {/* Modal component is here */}
      <DonateModal showModal={showModal} setShowModal={setShowModal} />
    </>
    <Navbar />

    <section className={styles.fundraiserproject}>
    <div className={styles.wrapper}>
        <div className={styles.left_arrow}>
              <div className={styles.back_arrow}>
              <Link href="/Viewmore/Viewmore">
              <div className={styles.arrow}>
                  <Image src={arrowLeftSvg} alt="" />
              </div>
              </Link>
            </div>
            </div>
            <div className={styles.container}>
              {
                goFundMe?.map((item, index) =>
                index == Number(pageId)?
                <>
                  <div className={styles.fundraiser_container}>
                  <div className={styles.fundraiser_item}>
                    <div className={styles.fundraiser_img}>
                    <Image src="" alt="" />
                    </div>
                    <div className={styles.fundraiser_text}>
                        <div className={styles.fundraiser_titled}>
                          {item[1]}
                        </div>
                        <p className={styles.id}>Funding ID: {("00000" + hexToDecimal(item[0]._hex)).slice(-6)}</p>

                        <p className={styles.fundraiser_desc}>
                          {item[2]}
                        </p>
                    </div>
                  </div>

                </div>
                <div className={styles.fundraiser_donate_content}>
                  <div className={styles.donate_content}>
                    <h1 className={styles.donate_title}>{(hexToDecimal(item[4]._hex)/1e18).toLocaleString()} cUSD raised of {(hexToDecimal(item[3]._hex)/1e18).toLocaleString()}</h1>
                    <div className={styles.boxrate}>
                    <div
                    style={{
                      background: "black",
                      borderRadius: "0px 5px 5px 0px",
                      height: "8px",
                      width: String(hexToDecimal(item[4]._hex)/hexToDecimal(item[3]._hex)/100) + "%"
                    }}
                    ></div>
                    </div>
                    <span>{item[6].length} Donations</span>

                      <button className={styles.donate_btn}
                      onClick={openModal}
                      >Donate</button>

                      <button className={styles.share_btn} onClick={handleShareClick}>Share</button>

                    <ul className={styles.donated_people}>
                        <li className={styles.icon}>
                            <Image src={UserIcon} alt="" />
                        </li>
                    </ul>
                  </div>
              </div>
                </>: ""
                )
              }
        </div>
    </div>
  </section>
      <>
      <AllDonors setShowModal={setShowModal} showModal={showModal} />
      </>
    {/* <OtherFundraisers /> */}
    <Footer />
    </>
  )
}

export default FundraiserProject