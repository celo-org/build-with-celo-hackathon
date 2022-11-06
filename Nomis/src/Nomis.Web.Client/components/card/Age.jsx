import Image from "next/image";

import * as Emoji from "../../public/emoji/age";

export default function Age({ wallet }) {
  const age = wallet.stats.walletAge;

  const youngAge = 6;
  const mediumAge = 12;
  const oldAge = 24;

  const newTitle = "At the Beginning of the Path";
  const youngTitle = "Just a Neginner";
  const mediumTitle = "Crypto-Friendly Wallet";
  const oldTitle = "A Pretty Old Wallet";

  const emoji =
    age >= youngAge
      ? age >= mediumAge
        ? age >= oldAge
          ? Emoji.Old
          : Emoji.Medium
        : Emoji.Young
      : Emoji.New;

  const title =
    age >= youngAge
      ? age >= mediumAge
        ? age >= oldAge
          ? oldTitle
          : mediumTitle
        : youngTitle
      : newTitle;

  return (
    <div className="card age">
      <Image src={emoji} width="64" height="64" />
      <h5>{title}</h5>
      <p>
        {age > 0
          ? "This wallet was created " + age + " months ago."
          : "Welcome to the web3 world..."}
      </p>
    </div>
  );
}
