import NavBar from "./NavBar"

interface Props {
    children: JSX.Element
};

const Layout: React.FC<Props> = ({children}) => {
  return (
    <>
        <NavBar />
        {children}
    </>
  )
}

export default Layout
