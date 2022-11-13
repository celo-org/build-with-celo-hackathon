import { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";

export default function Identicon({ address, size, ...rest }) {
  const ref = useRef();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(
        Jazzicon(size, parseInt(address.slice(2, 10), 16))
      );
    }
  }, [address, size]);

  return (
    <div {...rest}>
      <div ref={ref} style={{ width: `${size}px`, height: `${size}px` }} />
    </div>
  );
}
