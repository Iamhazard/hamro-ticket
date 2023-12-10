"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { NAV_LINKS } from "./NavLinks";

const NavBar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const handleToggleDropdown = () => {
    setDropDownMenu(!dropDownMenu);
  };
  return (
    <nav className=" bg-[#1C1C24] shadowNav w-full ">
      <div className="max-container flexBetween ">
        <Link href="/" className="flex gap-2 flexCenter">
          <Image
            className="gap-2"
            src="/Assets/tickticketing.svg"
            alt="logo"
            width={199}
            height={36}
          />
        </Link>
        <ul className="hidden  gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.key} className="relative gap-4 h-fit">
              <Link
                href={link.href}
                className="regular-16 flexCenter text-white leading-tight shadow-xl ">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="lg:flexCenter hidden gap-4">
          <button type="button" className="  py-2 px-3 btn-black ">
            Login
          </button>
          <button type="buttin" className="   btn-red">
            Register
          </button>
        </div>
        <button
          className="flex items-center text-blue-600 p-3 lg:hidden"
          onClick={handleToggleDropdown}>
          <Image
            src="/assets/menu.svg"
            alt="menu"
            width={32}
            height={32}
            className="inline-block cursor-pointer"
          />
        </button>
        {dropDownMenu && (
          <div className="navbar-menu relative z-50">
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                <Link
                  href="/"
                  className="mr-auto text-3xl font-bold leading-none">
                  <Image
                    src="/Assets/tickticketing.svg"
                    alt="logo"
                    width={74}
                    height={29}
                  />
                </Link>
                <button className="navbar-close" onClick={handleToggleDropdown}>
                  <svg
                    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div>
                {/* mobile */}
                <ul>
                  {NAV_LINKS.map((link) => (
                    <li key={link.key} className="mb-1">
                      <Link href={link.href}>
                        <div className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded">
                          {link.label}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto ">
                <div className="pt-6 px-4 space-x-2">
                  <Link href="/login">
                    <button type="button" className="btn-black  shadow-xl">
                      Login
                    </button>
                  </Link>
                  <button className="btn-red">Register</button>
                </div>
                <p className="my-4 text-xs text-center text-black">
                  <span>Copyright © 2023</span>
                </p>
              </div>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
