import React from "react";

export default function Navbar() {
  return (
    <nav className="relative left-0 flex items-center justify-between w-full h-20 p-8 text-white bg-nav-color">
      <img onClick={ () => { window.open("https://caballabs.com/", "_blank")}} className="w-16 h-16 cursor-pointer" src="logo192.png" alt="logo" />
      <div className="flex items-center space-between">
        <div onClick={ () => { window.open("https://discord.gg/qJ3FBSQQ8T", "_blank")}} className="relative flex items-start flex-shrink-0 p-4 border-2 border-white border-solid rounded-lg cursor-pointer  hover:bg-b-color-hover active:bg-b-color-active w-fit">
          <span>
            <span>Join The Cabal</span>
          </span>
        </div>
      </div>
    </nav>
  );
}
