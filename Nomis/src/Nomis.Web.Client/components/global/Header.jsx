import React from "react";
import Link from "next/link";
import { mainMenu } from "../../utilities/menu";
import Logo from "../Logo";

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 0);
    });
  }, []);

  return (
    <header className={isScrolled ? "isScrolled" : ""}>
      <div className="wrapper">
        <section>
          <div className="left">
            <Logo />
          </div>
          <nav className="right">
            <ul className="mainMenu">
              {mainMenu.map((item) => (
                <li key={item.title}>
                  <Link href={item.link} passHref>
                    <a target="_blank">{item.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    </header>
  );
}
