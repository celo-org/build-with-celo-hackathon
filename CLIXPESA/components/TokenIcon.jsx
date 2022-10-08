import { memo } from 'react'
import { Svg, Circle, Path } from 'react-native-svg'
import { CELO, cEUR, cREAL, cUSD } from '../features/wallet/tokens'

function _TokenIcon({ token, size }) {
  const CeloIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
      <Circle fill="#FBCC5C" cx={50} cy={50} r={50} />
      <Path
        fill="#FFF"
        d="M78.6 44a22.5 22.5 0 0 0-43.3-8.6 22.5 22.5 0 1 0 29.6 29.3A22.7 22.7 0 0 0 78.6 44zM44.1 73a17 17 0 0 1-10.5-30.1V44a22.5 22.5 0 0 0 22.5 22.5h1.4A17 17 0 0 1 44.1 73zm16.4-12.7a17 17 0 0 1-20.7-20.5 17 17 0 0 1 21.3 16.3c-.1 1.5-.3 2.9-.6 4.2zm6.1-3.1v-1.1a22.5 22.5 0 0 0-22.5-22.5h-1.4a17 17 0 1 1 23.9 23.6z"
      />
    </Svg>
  )
  const CUSDIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
      <Circle fill="#45CD85" cx="500" cy="500" r="500" />
      <Path
        d="M479 762c98 0 181-63 212-150h-61c-27 56-85 94-151 94-93 0-169-76-169-169 0-66 38-124 94-151v-61c-87 31-150 114-150 212 0 124 101 225 225 225zm129-275v-82c28 7 50 16 50 40 0 22-19 38-50 42zm-38 76h40v-31c59-7 97-41 97-87 0-64-51-78-99-87v-85c23 2 48 9 71 20v-50c-22-8-46-13-69-14v-30h-40v30c-61 7-96 41-96 84 0 65 50 80 98 89v85c-29-4-60-16-96-35v53c31 15 63 25 94 27v31zm2-209c-28-6-49-16-49-41 0-23 18-37 49-40v81z"
        fill="#FFF"
      />
    </Svg>
  )
  const CEURIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
      <Circle fill="#45CD85" cx="500" cy="500" r="500" />
      <Path
        d="M445 780c98 0 181-63 212-150h-61c-27 56-85 94-151 94-93 0-169-76-169-169 0-66 38-124 94-151v-61c-87 31-150 114-150 212 0 124 101 225 225 225zm188-215c33 0 64-9 90-25v-52c-25 19-55 31-89 31-48 0-86-23-104-61h133l12-40H518c-1-6-1-11-1-17s0-12 1-18h168l12-40H529c18-39 55-62 105-62 27 0 53 7 77 20l14-45c-27-14-59-21-91-21-75 0-134 43-156 107h-44l-12 38h48c-1 7-1 14-1 21s0 13 1 20h-36l-12 38h57c21 64 79 106 154 106z"
        fill="#FFF"
      />
    </Svg>
  )
  const CREALIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" {...props}>
      <Circle fill="#45CD85" cx="500" cy="500" r="500" />
      <Path
        d="M435 779c98 0 181-63 212-150h-61c-27 56-85 94-151 94-93 0-169-76-169-169 0-66 38-124 94-151v-61c-87 31-150 114-150 212 0 124 101 225 225 225zm-15-222h50V432h4c7 0 15-1 21-1l42 126h55l-56-139c26-14 45-46 45-86 0-59-37-91-108-91h-53v316zm50-167V284h8c37 0 53 16 53 53 0 36-16 53-53 53h-8zm216 118 10-81c16 8 26 20 26 39 0 23-12 40-36 42zm-39 78h34l4-34c48-3 81-40 81-89 0-37-18-68-62-84l10-87c12 3 25 9 38 18v-50c-10-6-21-10-32-12l5-36h-34l-3 34c-48 4-78 39-78 87 0 47 28 74 59 86l-10 85c-14-4-30-11-48-22v51c14 7 28 13 41 16l-5 37zm30-216c-16-8-23-21-23-39 0-24 11-39 33-42l-10 81z"
        fill="#FFF"
      />
    </Svg>
  )
  if (token === CELO.address) return <CeloIcon height={size} width={size} />
  else if (token === cUSD.address) return <CUSDIcon height={size} width={size} />
  else if (token === cEUR.address) return <CEURIcon height={size} width={size} />
  else if (token === cREAL.address) return <CREALIcon height={size} width={size} />
}

export const TokenIcon = memo(_TokenIcon)
