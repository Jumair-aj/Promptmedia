"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)
  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);

  return (
    <nav className="w-full flex-between mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src={"/assets/images/logo.svg"} width={30} height={30} />
        <p className="logo_text">Promptmedia</p>
      </Link>

      {/* PC Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={"assets/images/logo.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button className="black_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>Sign In</button>;
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ?
          <div className="flex">
            <Image
              src={"assets/images/logo.svg"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown(prev => !prev)}
            />
            {toggleDropdown && 
            <div className="dropdown">
              <Link 
              href={'/profile'}
              className="dropdown_link"
              onClick={()=>setToggleDropdown(false)}
              >
              My Profile
              </Link>
              <Link 
              href={'/create-prompt'}
              className="dropdown_link"
              onClick={()=>setToggleDropdown(false)}
              >
              Create Prompt
              </Link>
              <button
              type="button"
              onClick={()=>{
                setToggleDropdown(false);
                signOut();
              }}
              className="mt-5 w-full black_btn"
              >
Sign Out
              </button>
              </div>}
          </div>
          : <>
            {providers &&
              Object.values(providers).map((provider) => {
                <button className="black_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>Sign In</button>;
              })}
          </>}
      </div>
    </nav>
  );
};

export default Nav;
