import React from "react";
import {Link} from "react-router-dom";
const NavItem = ({itemName, itemLink}) => {
  return (
    <>
      <li className="mr-4 hover:scale-125 transition-all duration-300 ease-in-out ">
        <Link
          to={itemLink}
          className="transition duration-300"
        >
          {itemName}
        </Link>
      </li>
    </>
  );
};

export default NavItem;
