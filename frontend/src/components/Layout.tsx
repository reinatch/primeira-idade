import React, { PropsWithChildren, ReactNode, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { Movie } from "../types";
import { GetServerSideProps } from "next";
import { Navbar } from "./navbar";
import Intro from "./Intro";


type Props = {
  children?: ReactNode;
  // movies: Movie[];

};
function Layout({ children }: Props) {

  return (
    <>
    
    <Navbar/>
    {children }
    {/* <Intro/> */}
    </>
  );
}

export default Layout;
