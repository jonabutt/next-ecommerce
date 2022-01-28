import React, { ReactNode } from 'react'
import { Container } from "@mui/material"
import NavBar from "./NavBar"
import {Toaster} from 'react-hot-toast'
import Loading from './Loading';

type Props = {
    children?: ReactNode
};

const Layout = ({children}: Props) => {
  return (
    <>
      <Loading />
      <NavBar />
      <Toaster/>
      <Container maxWidth="lg">
        {children}
      </Container>
    </>
  )
}

export default Layout
