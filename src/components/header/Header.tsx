"use client";

import { CustomFlowbiteTheme, Flowbite, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import Underscore from "../utils/Underscore";
import WalletConnectionButton from "../wallet-connect/WalletConnectionButton";

const customTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: "sticky top-0 flex z-50 justify-center w-full text-sm p-5 bg-transparent", // Set background to transparent
      rounded: {
        on: "rounded",
        off: "",
      },
      bordered: {
        on: "border",
        off: "",
      },
      inner: {
        base: "flex flex-wrap max-w-screen-xl w-full items-center justify-between",
        fluid: {
          on: "",
          off: "container",
        },
      },
    },
    brand: {
      base: "flex items-center ml-8", // Add margin-left for spacing
    },
    collapse: {
      base: "w-full md:block md:w-auto grow md:ml-4",
      list: "mt-4 flex flex-col md:items-center md:mt-0 md:flex-row md:space-x-10 md:text-xs md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0 text-sm",
      active: {
        on: "bg-transparent text-cream md:text-cyan-dark", // Set background to transparent
        off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 md:border-0 md:hover:bg-transparent md:hover:text-black-700",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-xs text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden",
      icon: "h-5 w-5 shrink-0",
    },
  },
  dropdown: {
    floating: {
      animation: "transition-opacity",
      arrow: {
        base: "absolute z-10 h-2 w-2 rotate-45",
        style: {
          light: "bg-white",
          auto: "bg-white",
        },
        placement: "-4px",
      },
      base: "z-10 min-w-52 divide-y divide-gray-100 rounded shadow focus:outline-none",
      content: "py-1 text-xs text-black",
      divider: "my-1 h-px bg-gray-100",
      header: "block px-4 py-2 text-xs text-black",
      hidden: "invisible opacity-0",
      item: {
        container: "",
        base: "flex min-w-52 cursor-pointer items-center justify-start px-4 py-2 text-xs text-black hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        light: "border border-gray-200 bg-cream text-black", // Remove purple and use black text
        auto: "border border-gray-200 bg-cream text-black",
      },
      target: "w-fit",
    },
    inlineWrapper: "flex items-center",
  },
};

export default function Header() {
  return (
    <header>
      <Flowbite theme={{ theme: customTheme }}>
        <Navbar fluid>
          <Navbar.Brand as={Link} href="https://trade.barkprotocol.net/">
            <div className="relative flex items-center ml-8"> {/* Add margin-left for spacing */}
              <Image
                src="https://ucarecdn.com/d63c1594-27cb-4b9e-afd1-8e5a9c790db9/logodark.svg"
                alt="BARK Logo"
                width={140} // Increase width for more space
                height={60} // Increase height for more space
                priority
              />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <div className="relative group text-black font-bold text-ml py-2 pl-3 pr-4 md:p-0"> {/* Smaller font size */}
              <Navbar.Link as={Link} href="https://swap.barkprotocol.net/">
                <div className="relative flex items-center">
                  <span></span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="relative group text-black font-bold text-ml py-2 pl-3 pr-4 md:p-0"> {/* Smaller font size */}
              <Navbar.Link as={Link} href="/dashboard">
                <div className="relative flex items-center">
                  <span>Dashboard</span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="relative group text-black font-bold text-ml py-2 pl-3 pr-4 md:p-0"> {/* Smaller font size */}
              <Navbar.Link as={Link} href="/FAQ">
                <div className="relative flex items-center">
                  <span>FAQ</span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="grow"></div>

            <WalletConnectionButton className="mr-8 text-xs" /> {/* Smaller button size and margin-right for spacing */}
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
    </header>
  );
}
