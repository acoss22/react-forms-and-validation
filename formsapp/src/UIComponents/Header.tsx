import React, { useState } from "react";

interface IHeader {
  name: string;
//   onClicked?
}

export const Header = ({ name }: IHeader) => {
 

  const handleClick = () => {
    //navigate 
  
  };

  return (
   <h1>
      {name} 
    </h1>
  );
};
