import Link from "next/link";

import Logo from "../Logo";
import { footerMenu } from "../../utilities/menu";

export default function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <section>
          <Logo />
          <p>
            Nomis is a wallet scoring and credentials protocol which helps
            on-chain developers build better DeFi products.
          </p>
          <nav>
            <ul className="menu">
              {footerMenu.map((item) => (
                <li key={item.title}>
                  <Link href={item.link} passHref>
                    <a target="_blank">{item.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href="mailto:gm@nomis.cc">gm@nomis.cc</a>
          <p>2022 © Nomis. All rights reserved.</p>
        </section>
      </div>
    </footer>
  );
}
