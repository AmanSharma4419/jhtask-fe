import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
const Header = ({ handleWriteBlog, handleSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchInput(value);
    handleSearch(value);
  };
  return (
    <>
      <div className="flex justify-between mt-10">
        <div className="flex items-center  ">
          <span className="capitalize font-light text-2xl mx-16">Blogs</span>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="py-1 pr-12 pl-4 border rounded-full focus:outline-none focus:border-blue-400"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <BiSearch className="absolute right-4" />
          </div>
        </div>
        <div className="flex">
          <img
            onClick={() => {
              handleWriteBlog();
            }}
            className="cursor-pointer"
            src="../../Group 7470.png"
            alt=""
          />
          <AiOutlineUser className="w-10 h-8 mx-16" />
        </div>
      </div>
    </>
  );
};

export default Header;
