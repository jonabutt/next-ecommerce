import { Container } from "@mui/material"
import NavBar from "./NavBar"

interface Props {
    children: React.ReactNode
};

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
      <NavBar />
      <Container maxWidth="lg">
        {children}
      </Container>
    </>
  )
}

export default Layout
