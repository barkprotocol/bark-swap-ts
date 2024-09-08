"use client";

import { CustomFlowbiteTheme, Flowbite, Navbar } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import Underscore from "../utils/Underscore";
import WalletConnectionButton from "../wallet-connect/WalletConnectionButton";

const customTheme: CustomFlowbiteTheme = {
  navbar: {
    root: {
      base: "sticky top-0 flex z-50 justify-center w-full p-5 bg-sand-100",
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
      base: "flex items-center",
    },
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:items-center md:mt-0 md:flex-row md:space-x-10 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0 text-xl",
      active: {
        on: "bg-sand-200 text-black md:bg-transparent md:text-sand-500",
        off: "border-b border-gray-100 text-gray-700 hover:bg-sand-50 md:border-0 md:hover:bg-transparent md:hover:text-sand-500",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-sand-50 focus:outline-none focus:ring-2 focus:ring-sand-200 md:hidden",
      icon: "h-6 w-6",
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
      base: "z-10 min-w-52 divide-y divide-gray-100 rounded shadow",
      content: "py-1 text-sm text-black",
      divider: "my-1 h-px bg-gray-100",
      header: "block px-4 py-2 text-sm text-black",
      hidden: "invisible opacity-0",
      item: {
        container: "",
        base: "flex min-w-52 cursor-pointer items-center justify-start px-4 py-2 text-sm text-black hover:bg-gray-100",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        light: "border border-gray-200 bg-white text-black",
        auto: "border border-gray-200 bg-white text-black",
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
          <Navbar.Brand as={Link} href="https://barkprotocol.net/">
            <div className="flex items-center">
              <Image
                className="mr-4"
                src="https://ucarecdn.com/dd264726-4f83-4a3a-b36b-bad0fb3f58a5/logolight.png"
                alt="BARK Logo"
                width={40}
                height={40}
                priority
              />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <div className="relative text-black font-bold text-2xl py-2 pl-3 pr-4 md:p-0">
              <Navbar.Link as={Link} href="/dashboard">
                <div className="relative">
                  <span>Dashboard</span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="relative text-sand-500 font-bold text-2xl py-2 pl-3 pr-4 md:p-0">
              <Navbar.Link as={Link} href="https://swap.barkprotocol.net/">
                <div className="relative">
                  <span>Swap</span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="relative text-black font-bold text-2xl py-2 pl-3 pr-4 md:p-0">
              <Navbar.Link as={Link} href="/faq">
                <div className="relative">
                  <span>FAQ</span>
                  <Underscore />
                </div>
              </Navbar.Link>
              <Underscore />
            </div>

            <div className="flex-grow"></div>

            <WalletConnectionButton />
          </Navbar.Collapse>
        </Navbar>
      </Flowbite>
    </header>
  );
}
