import { useRouter } from 'next/router'
import useSWR from 'swr'
import { IBM_Plex_Mono } from '@next/font/google'
import Tree from '../../public/HexagonTree.png'

const ibm = IBM_Plex_Mono({
  weight : "400",
  subsets : [
      "latin"
  ]
});

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Badge() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.address && `/api/badge/${query.address}`,
    fetcher
  )

  if (error) return <div>{error.response}</div>
  if (!data) return <div>Loading...</div>

  return (
    // <svg viewBox="0 0 800 600" width="800" height="600" xmlns="http://www.w3.org/2000/svg">
    //   <style>
    //     {/* .small { font: italic 13px sans-serif;}
    //     .heavy { font: bold 30px sans-serif;} */}
    //   </style>
    //   <line x1="20" y1="500" x2="820" y2="500" stroke="green" strokeWidth="2"></line>
    //   <line x1="20" y1="0" x2="20" y2="500" stroke="green" stroke-width="2"></line>
    //   <path d="M 20 500 L 40 440 L 60 400 L 80 460 L 100 180 L 380 400" stroke="orange" stroke-width="1" fill="none">
    //   </path>
    //   <text x="20" y="35" class="small">{data.name}</text>
    //   <text x="20" y="65">{data.height} co2 offset</text>
    // </svg>

<svg width="750px" height="306px" viewBox="0 0 750 306" version="1.1" xmlns="http://www.w3.org/2000/svg" >
    <g id="Embed-SVG-to-Generate" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect fill="#FFFFFF" x="0" y="0" width="750" height="306"></rect>
        <rect id="Rectangle" stroke="#000000" strokeWidth="3" x="10.5" y="10.5" width="727" height="232" rx="3"></rect>
        <rect id="Rectangle" fill="#000000" x="9" y="239" width="730" height="57"></rect>
        <text id="AMADAO-VERIFIED-SPON" fontSize="36" fontWeight="normal" letterSpacing="0.33882336" fill="#FFFFFF">
            <tspan x="90.703531" y="281">AMADAO VERIFIED SPONSOR </tspan>
        </text>
        <g id="Group" transform="translate(267.927486, 12.921477)">
          <image href={Tree.src} width="200" height="225"/>
        </g>
        <text id="CO2-Offset"  fontSize="80" fontWeight="normal" line-spacing="70" fill="#0A0615">
            <tspan x="42" y="130">CO2</tspan>
            <tspan x="60" y="211.568237" fontSize="48">Offset</tspan>
        </text>
        <a href={`./detail/${query.address}`} target="_blank">
          <g id="link-solid" transform="translate(690.000000, 251.000000)" fill="#FFFFFF" fillRule="nonzero">
            <path d="M21.2608644,11.9072706 C25.1500997,15.7697885 25.0967217,21.9623847 21.2842986,25.7656819 C21.2771381,25.7734317 21.2686758,25.7818272 21.2608644,25.7895769 L16.8864755,30.1294121 C13.0282905,33.957121 6.7512378,33.9566043 2.89363871,30.1294121 C-0.964546236,26.3023491 -0.964546236,20.0741689 2.89363871,16.2471058 L5.30905647,13.8507676 C5.94959198,13.2152918 7.05269308,13.6376507 7.08576138,14.5357125 C7.12794298,15.6802149 7.33481512,16.8300774 7.71653263,17.9404811 C7.84581144,18.316471 7.75344153,18.7323719 7.47027797,19.0132987 L6.61837876,19.8584687 C4.79402425,21.6684125 4.73680569,24.6154964 6.54319395,26.4431354 C8.36741826,28.2887924 11.3658275,28.2997712 13.2040472,26.4760716 L17.5784361,22.1368822 C19.4135313,20.3162826 19.4058501,17.3735901 17.5784361,15.5606111 C17.3375192,15.3220493 17.0948448,15.1367022 16.905288,15.0072175 C16.6333728,14.8219683 16.4657034,14.5201195 16.4530725,14.1931109 C16.4272948,13.5106847 16.6710108,12.8074635 17.2145547,12.2682131 L18.5850663,10.9084627 C18.9444562,10.5519116 19.5082446,10.5081258 19.9249833,10.7966732 C20.4022399,11.1272947 20.8492565,11.4989261 21.2608644,11.9072706 Z M30.1063655,2.87059886 C26.2487613,-0.956607959 19.9717001,-0.957124608 16.1135099,2.87059886 L11.7391152,7.21045068 C11.7313038,7.21820042 11.7228414,7.22659596 11.7156809,7.2343457 C7.90331778,11.0376575 7.84987465,17.2302773 11.7391152,21.09281 C12.1506993,21.5011376 12.5976952,21.8727492 13.074933,22.2033471 C13.4916722,22.4918956 14.0555265,22.448045 14.4148517,22.0915572 L15.7853652,20.7318015 C16.3289098,20.1925491 16.5726261,19.4893252 16.5468484,18.8068964 C16.5342175,18.4798865 16.3665479,18.1780366 16.0946323,17.9927867 C15.9050752,17.8633015 15.6624005,17.6779537 15.4214833,17.439391 C13.5940669,15.626405 13.5863856,12.6837013 15.4214833,10.8630947 L19.795878,6.52388871 C21.6341003,4.70018223 24.6324484,4.71116102 26.4567403,6.55682508 C28.263131,8.38447101 28.2059774,11.3315662 26.3815554,13.1415169 L25.529655,13.9866901 C25.2464911,14.2676181 25.154121,14.6835205 25.2834,15.0595118 C25.6651181,16.1699198 25.8719905,17.3197868 25.9141721,18.4642935 C25.9473056,19.3623587 27.0503431,19.7847193 27.6908794,19.149241 L30.1063004,16.7528936 C33.9645557,12.9258805 33.9645557,6.69767652 30.1063655,2.87059886 L30.1063655,2.87059886 Z" id="Shape"></path>
          </g>
        </a>
        <text id="2,365-Tons" fontSize="80" fontWeight="normal" line-spacing="70" fill="#0A0615">
            <tspan x="511" y="130">{data.response}</tspan>
            <tspan x="725.72" y="141.568237" fontSize="90"></tspan>
            <tspan x="530" y="211.568237" fontSize="48">Tons</tspan>
        </text>
    </g>
</svg>


  )
}
