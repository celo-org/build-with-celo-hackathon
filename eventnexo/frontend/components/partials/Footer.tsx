import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faLinkedin,
  faMedium,
  faReddit,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import AppLogo from "./AppLogo";

export default function Footer() {
  return (
    <footer className="py-12 md:py-20 px-4 sm:px-10">
      <div className="max-w-full lg:max-w-7xl mx-auto py-2 px-4">
        <div className="flex flex-col md:space-x-8 md:flex-row xl:space-x-20">
          <div className="md:w-1/6">
            <div className="">
              <AppLogo />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-16 text-black lg:gap-4 lg:grid-cols-4 xl:gap-10 md:mt-0">
            <div className="flex flex-col">
              <h3 className="text-black text-md font-black">About</h3>
              <ul className="mt-2 flex flex-col space-y-4 text-black text-sm font-normal">
                <li>
                  <Link href="#" passHref>
                    Brand
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-black text-md font-black">Help</h3>
              <ul className="mt-2 flex flex-col space-y-4 text-black text-sm font-normal">
                <li>
                  <Link href="#" passHref>
                    Whitepaper
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    Troubleshooting
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    Customer support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="text-black text-md font-black">Developers</h3>
              <ul className="mt-2 flex flex-col space-y-4 text-black text-sm font-normal">
                <li>
                  <Link href="#" passHref>
                    Github
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    Audits
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex flex-col">
                <h3 className="text-black text-md font-black">
                  Join the community
                </h3>
                <p className="text-sm">
                  Get early access to our news & releasees
                </p>
                <ul className="mt-4 flex flex-row space-x-1">
                  <li>
                    <Link href="#" passHref>
                      <a className="w-10 h-10  text-black flex items-center justify-center text-xl">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" passHref>
                      <a className="w-10 h-10  text-black flex items-center justify-center text-xl">
                        <FontAwesomeIcon icon={faDiscord} />
                      </a>
                    </Link>
                  </li>

                  <li>
                    <Link href="#" passHref>
                      <a className="w-10 h-10  text-black flex items-center justify-center text-xl">
                        <FontAwesomeIcon icon={faReddit} />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" passHref>
                      <a className="w-10 h-10  text-black flex items-center justify-center text-xl">
                        <FontAwesomeIcon icon={faMedium} />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <h4 className="text-sm">&copy; eventnexo 2022. All rights reserved</h4>
      </div>
    </footer>
  );
}
