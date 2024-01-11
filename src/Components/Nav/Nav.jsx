import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';




import {logo} from '../../assets'
import { Link } from "react-router-dom";
 
export default function Nav({theme,isDarkMode,toggleDarkMode}) {
  const [openNav, setOpenNav] = React.useState(false);
  
  
    

 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  
 
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4" id={theme}>
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/">
            <img alt="img" src={logo} className="w-36 h-16"/>
        </Link>
      
      <DarkModeSwitch
            
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={50}
          />
      
  
      </div>
      
    </Navbar>
  );
}