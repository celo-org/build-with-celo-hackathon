import {useState} from 'react'
import styles from './fundraiserproject.module.scss'
import Navbar from '../../layouts/navbar/Navbar'
import OtherFundraisers from '../../layouts/otherfundraisers/Otherfundraisers'
import Footer from '../../layouts/footer/Footer'
import Link from 'next/link'
import Image from 'next/image'
import arrowLeftSvg from '../../assets/arrow-left.svg'
import UserIcon from '../../assets/user.svg'
import arrowRight from '../../assets/arrow-right.svg'
import DonateModal from '../../layouts/donateModal/DonateModal'
import AllDonors from '../../layouts/allDonors/AllDonors'

const FundraiserProject = () => {

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
               <div className={styles.fundraiser_container}>
                 <div className={styles.fundraiser_item}>
                    <div className={styles.fundraiser_img}>
                    <Image src="" alt="" />
                    </div> 
                    <div className={styles.fundraiser_text}>
                       <div className={styles.fundraiser_titled}>
                         Help sam fight Pancreatic Cancer
                       </div>
                       <p className={styles.id}>Funding ID: 001</p>

                       <p className={styles.fundraiser_desc}>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor adipiscing leo nunc, elit sed sed. Eu sagittis vel faucibus leo. Congue sagittis, nibh ac, vel, ut proin eget adipiscing augue. Tellus vitae ac integer amet et. Purus et enim massa, in sagittis sodales. Sed lorem at dui phasellus a dictumst. Egestas sit interdum amet tortor, et netus. Elit ullamcorper mauris enim curabitur urna. Hac leo mi, mattis risus erat. Tellus sollicitudin in nunc interdum faucibus nisl arcu ultrices. Cursus ullamcorper amet vulputate curabitur in purus vel risus nulla. Cursus sed sociis consectetur amet quam. In cras sed at a. Quis fringilla ac sed dignissim in scelerisque viverra cursus elementum. Lacus urna est non urna. Sed nisl scelerisque pellentesque a pharetra. Libero faucibus turpis mauris, in condimentum. Eu pretium tellus at cursus varius quam maecenas bibendum leo. Amet amet vel in cras aliquet mauris imperdiet 
                       </p>

                        <p className={styles.fundraiser_desc}>
                         condimentum. Neque volutpat urna tortor sagittis fames. Pellentesque nec, ipsum, aliquam lacinia cras vitae diam sit. Eget purus ornare adipiscing fames etiam integer. Facilisis id vivamus massa cursus facilisis sem euismod pellentesque. Aliquam et tincidunt risus sit facilisi. Eu aenean platea a pharetra tincidunt. Lectus arcu ut lectus semper tortor vel, eget tincidunt. Sed et cras sed viverra imperdiet ultrices amet quis. Fringilla massa nullam orci mi lacus. Auctor convallis sit venenatis in porttitor. Duis neque penatibus nunc, non nunc sit mauris. Vulputate pellentesque accumsan, ornare est quam netus. Sed bibendum ut metus, sed parturient commodo. Habitant dictumst augue cum eget ipsum viverra. Morbi nisl rhoncus lectus mollis nec. Ac placerat morbi mi vitae nibh. Donec magna molestie tortor, dui porttitor morbi volutpat viverra pharetra. In cursus enim sed est in nam sem. Diam cras in consectetur quis pellentesque mollis. Vitae sollicitudin adipiscing aliquam ac. Non lobortis pulvinar viverra feugiat gravida et
                        </p>
                    </div>
                 </div>
                 
               </div>

               <div className={styles.fundraiser_donate_content}>
                   <div className={styles.donate_content}>
                     <h1 className={styles.donate_title}>6000USDC raised of 10,000usdc</h1>
                      <div className={styles.boxrate}>
                         <div className={styles.box}></div>
                      </div>
                      <span>45 Donations</span>

                        <button className={styles.donate_btn}
                        onClick={openModal}
                        >Donate</button>
  
                        <button className={styles.share_btn} onClick={handleShareClick}>Share</button>
        
                      <ul className={styles.donated_people}>
                         <li className={styles.icon}>
                              <Image src={UserIcon} alt="" />
                         </li>

                         <li className={styles.people_donated}>
                           5 people just donated
                         </li>

                          <li className={styles.link} onClick={openModal}>
                           See all <Image src={arrowRight} width={20} height={20} alt=" " />
                         </li>
                      </ul>
                   </div>
               </div>
          </div>
      </div>
    </section>
        <>
        <AllDonors setShowModal={setShowModal} showModal={showModal} />
       </>
    <OtherFundraisers />
    <Footer />
    </>
  )
}

export default FundraiserProject
