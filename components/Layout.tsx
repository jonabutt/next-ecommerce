import { Container } from "@mui/material"
import NavBar from "./NavBar"
import {Toaster} from 'react-hot-toast'

interface Props {
    children: React.ReactNode
};

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <NavBar />
      <Toaster/>
      <Container maxWidth="lg">
        {children}
      </Container>
    </>
  )
}

export default Layout
