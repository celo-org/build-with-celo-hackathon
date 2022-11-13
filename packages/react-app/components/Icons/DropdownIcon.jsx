import React from 'react'

const DropdownIcon = ({showDetails}) => {
  return (
    <>
        <span className="pointer-events-none">
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className={`w-3 ml-3 ${showDetails && '-rotate-90' }`}
                role="img"
                viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                
                    <path d="M8.00099 11.7C7.53432 11.7 7.06766 11.5201 6.71432 11.1667L2.36766 6.82005C2.17432 6.62672 2.17432 6.30672 2.36766 6.11338C2.56099 5.92005 2.88099 5.92005 3.07432 6.11338L7.42099 10.4601C7.74099 10.7801 8.26099 10.7801 8.58099 10.4601L12.9277 6.11338C13.121 5.92005 13.441 5.92005 13.6343 6.11338C13.8277 6.30672 13.8277 6.62672 13.6343 6.82005L9.28766 11.1667C8.93432 11.5201 8.46766 11.7 8.00099 11.7Z" fill="#4A4957"/>
            </svg>
        </span>
    </>
  )
}

export default DropdownIcon