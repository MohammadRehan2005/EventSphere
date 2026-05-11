import React, { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";


export default function Navbar() {

  let [isloggedIn,checkIsloggedIn] = useState(false) 

  return (
    <div className="px-20 py-2 grid grid-cols-2 items-center justify-between border-b border-gray-400">
      <div className="grid grid-cols-[30%_68%] gap-2 border">
        <h1 className="font-extrabold">EventSphere</h1>
        <span className="flex items-center gap-2 text-md text-gray-500 border border-gray-300 rounded-xl p-1">
          <FaSearchLocation />
          <input
            type="text"
            placeholder="Search For events.."
            className="outline-0 pr-5"
          />
        </span>
      </div> 
      <div className="flex border"> 
         <button>
           {
             (isloggedIn ? "logout" : "signIn")
           }
         </button>
         <button>
            <GiHamburgerMenu />
         </button>
      </div>
    </div>
  );
}
