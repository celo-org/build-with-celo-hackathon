import React from "react";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <footer className="relative bg-primary-dull border border-primary-light rounded-xl m-4 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-gray-500">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-secondary">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                onClick={() =>
                  window.open("https://twitter.com/Helpi_io", "_blank")
                }
                className="text-primary-dark bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple h-10 w-10 rounded-full outline-none focus:outline-none hover:scale-105 transition-all mr-3"
                type="button"
              >
                <BsTwitter className="m-auto" />
              </button>
              <button
                className="text-primary-dark bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple h-10 w-10 rounded-full outline-none focus:outline-none hover:scale-105 transition-all mr-3"
                type="button"
              >
                <BsLinkedin className="m-auto" />
              </button>
              <button
                onClick={() =>
                  window.open("https://github.com/helpicelo", "_blank")
                }
                className="text-primary-dark bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple h-10 w-10 rounded-full outline-none focus:outline-none hover:scale-105 transition-all mr-3"
                type="button"
              >
                <BsGithub className="m-auto" />
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-secondary text-md font-bold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-secondary text-md font-bold mb-2">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      MIT License
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="text-blueGray-600 bg-clip-text hover:text-transparent hover:bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple font-semibold block pb-2 text-sm"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className=" text-base text-blueGray-500 font-medium py-1">
              Made with ❤️ by
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                href="#"
                className="bg-clip-text text-transparent bg-gradient-to-tr from-grad-green via-grad-blue to-grad-purple hover:text-gray-800"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Helpi Finance{" "}
              </a>
              <span>- All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
