import React from "react";

export default function Navbar() {
  return (
    <nav className="relative text-white flex justify-between items-center left-0 h-20 w-full p-8 bg-nav-color">
      <img onClick={ () => { window.open("https://caballabs.com/", "_blank")}} className="w-16 h-16 cursor-pointer" src="logo192.png" alt="logo" />
      <div className="flex space-between items-center">
        <div onClick={ () => { window.open("https://discord.gg/Jv9Za474", "_blank")}} className=" hover:bg-b-color-hover active:bg-b-color-active flex p-4 relative items-start flex-shrink-0 border-solid border-2 cursor-pointer border-white rounded-lg w-fit ">
          <span>
            <span>Join The Cabal</span>
          </span>
        </div>
      </div>
    </nav>
  );
}
