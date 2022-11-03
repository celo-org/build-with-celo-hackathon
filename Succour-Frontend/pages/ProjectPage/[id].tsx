import {useState} from 'react'
import styles from './projectpage.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import Image from 'next/image'
import Link from 'next/link'
import arrowLeftSvg from '../../assets/arrow-left.svg'
import Donatetime from '../../components/donatetime/Donatetime'
import RelatedProjects from '../../components/relatedProjects/RelatedProjects'

const ProjectPage = () => {
  
  return (
     <>
     <Navbar />
     <div className={styles.projectpage}>
            
      <div className={styles.wrapper}>
         <div className={styles.left}>
          <div className={styles.back_arrow}>
              <Link href="/Projects/Projects">
              <div className={styles.arrow}>
                  <Image src={arrowLeftSvg} alt="" />
                </div>
               </Link>
               </div>
        </div>
        <div className={styles.container}>
          <div className={styles.page_content}>
          <div className={styles.page_info}>
               <h1>John Doe</h1>
               <p className={styles.address}>0x15106aDcb41101434F12D9a666887a1292a397Ec</p>
      
            <div className={styles.status}>
               <p>Project</p>
               <p className={styles.time}>21h ago</p>
            </div>
          </div>
        </div>

           <div className={styles.problem_details}>
            <div className={styles.detail}>
             <h2 className={styles.problem_title}>Women Violation in Iran</h2>
             <span className={styles.proposal_id}>Proposal ID: 001</span>
             <span className={styles.proposal_amount}>Proposed Amount</span>
             <span className={styles.amount}>4500 usdc</span>
            </div>
              <p className={styles.problem_desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dolor adipiscing leo nunc, elit sed sed. Eu sagittis vel faucibus leo. Congue sagittis, nibh ac, vel, ut proin eget adipiscing augue. Tellus vitae ac integer amet et. Purus et enim massa, in sagittis sodales. Sed lorem at dui phasellus a dictumst. Egestas sit interdum amet tortor, et netus. Elit ullamcorper mauris enim curabitur urna. Hac leo mi, mattis risus erat. Tellus sollicitudin in nunc interdum faucibus nisl arcu ultrices. Cursus ullamcorper amet vulputate curabitur in purus vel risus nulla. Cursus sed sociis consectetur amet quam. In cras sed at a. Quis fringilla ac sed dignissim in scelerisque viverra cursus elementum. Lacus urna est non urna. Sed nisl scelerisque pellentesque a pharetra. Libero faucibus turpis mauris, in condimentum. Eu pretium tellus at cursus varius quam maecenas bibendum leo. Amet amet vel in cras aliquet mauris imperdiet 
               condimentum. Neque volutpat urna tortor sagittis fames. Pellentesque nec, ipsum, aliquam lacinia cras vitae diam sit. Eget purus ornare adipiscing fames etiam integer. Facilisis id vivamus massa cursus facilisis sem euismod pellentesque. Aliquam et tincidunt risus sit facilisi. Eu aenean platea a pharetra tincidunt. Lectus arcu ut lectus semper tortor vel, eget tincidunt. Sed et cras sed viverra imperdiet ultrices amet quis. Fringilla massa nullam orci mi lacus. Auctor convallis sit venenatis in porttitor. Duis neque penatibus nunc, non nunc sit mauris. Vulputate pellentesque accumsan, ornare est quam netus. Sed bibendum ut metus, sed parturient commodo. Habitant dictumst augue cum eget ipsum viverra. Morbi nisl rhoncus lectus mollis nec. Ac placerat morbi mi vitae nibh. Donec magna molestie tortor, dui porttitor morbi volutpat viverra pharetra. In cursus enim sed est in nam sem. Diam cras in consectetur quis pellentesque mollis. Vitae sollicitudin adipiscing aliquam ac. Non lobortis pulvinar viverra feugiat gravida et 
               dictum. Cursus arcu id porttitor at nam dui, velit scelerisque. Vitae, pellentesque turpis at volutpat id nibh nisi viverra blandit. Mattis adipiscing nibh quam porttitor in ultrices nibh. Eu convallis netus mauris viverra sed id in. Sit tincidunt et mus tellus, in hendrerit risus, faucibus tortor. Lorem elementum fermentum id aliquam cursus sit. Fames mus scelerisque in aliquam. Et cras nisl aliquam vestibulum, eget quam nulla dolor fermentum. A vitae facilisis feugiat amet aenean. Erat erat ut aliquet blandit in. Orci senectus eu ultrices adipiscing. Quam id tristique vel, a tempus nibh aliquet nunc quisque. Aliquam bibendum ultricies ligula tortor semper integer fames tortor velit. Vel eu morbi nec urna rutrum vitae dolor in. Ultrices in mauris eget malesuada mi a, euismod turpis. Scelerisque arcu lacus eu tellus adipiscing aliquam eu semper. Fringilla faucibus cras in fames nulla amet. Maecenas at sed id diam ac sollicitudin adipiscing. Nisl congue volutpat egestas ut. Et nunc, elementum, aliquam faucibus odio in nunc quam. In ridiculus
                non magnis egestas odio. Malesuada consectetur ac suspendisse dolor vitae sed. Lectus lectus praesent elementum vel, eget at viverra lacinia amet. At aliquet ac sollicitudin pulvinar turpis lobortis pellentesque pellentesque. Egestas vel viverra magna consequat cras sagittis morbi. Sit facilisis malesuada nam urna habitant. Dolor sed aliquet molestie quam egestas pharetra est aliquam. Phasellus enim ultricies ullamcorper dui. Tristique tellus est urna, interdum. Nunc, eget scelerisque eget sed nec. Vulputate condimentum duis laoreet sed est nisl cras. Mattis pellentesque gravida consequat diam lacus. Tempor habitant sed consectetur arcu et. Mattis aliquam tortor lectus varius sed egestas leo sed. Semper dolor, luctus velit at pulvinar non mi nisl massa. Pulvinar amet dolor orci diam faucibus at vivamus nulla. Neque, ullamcorper consectetur sapien ut gravida tristique dignissim varius donec. At urna volutpat, neque posuere quam ipsum. Suspendisse vel magna viverra eget id suscipit sed vivamus id.
                </p>
            </div>
        </div>
      </div>
     </div>
    <Donatetime  />
    {/* <RelatedProjects /> */}
    <Footer />
    </>
  )
}

export default ProjectPage