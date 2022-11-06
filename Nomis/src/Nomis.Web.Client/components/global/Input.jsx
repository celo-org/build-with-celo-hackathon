import React from "react";
import { useRouter } from "next/router";

import { blockchains } from "../../utilities/blockchains";

import { useHotkeys } from "react-hotkeys-hook";

export default function Input({ fullAddress, blockchain }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [address, setAddress] = React.useState(fullAddress ? fullAddress : "");

  const router = useRouter();
  const www = "";

  const [isMac, setIsMac] = React.useState(null);
  React.useEffect(() => {
    const userAgent = window.navigator.userAgent;
    setIsMac(userAgent.search("Mac") !== -1 ? true : false);
  });

  const handleClick = async () => {
    await router.push(`${www}/score/${blockchains[0].slug}/${address}`);
  };

  const handleEnter = async (e) => {
    if (e.keyCode === 13) {
      await router.push(`${www}/score/${blockchains[0].slug}/${address}`);
    }
  };

  const [hide, setHide] = React.useState(false);

  const inputRef = React.useRef();
  useHotkeys("ctrl+/", () => {
    inputRef.current.focus();
  });

  return (
    <div className="Input">
      <ul className="blockchains">
        <li className="blockchain">
          <img src={blockchains[0].icon} alt={blockchains[0].item} />
          <span>{blockchains[0].item}</span>
        </li>
      </ul>
      <div className="field">
        <div className="inputWrapper">
          <input
            ref={inputRef}
            type="text"
            id="fullAddress"
            placeholder={blockchains[0].placeholder}
            name="address"
            required
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={handleEnter}
            defaultValue={fullAddress}
            autoComplete="false"
            onFocus={() => setHide(!hide)}
            onBlur={() => setHide(!hide)}
          />
          <div className="shortcut">{isMac ? "cmd+/" : "ctrl+/"}</div>
        </div>
        <button onClick={handleClick} className="button callout"></button>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const query = context.query;
  return { props: { query: query } };
}
