import React from 'react'
import { AppBar, Avatar, Box, Button, IconButton,Link as MUILink,  Menu,  MenuItem,  Toolbar, Tooltip, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import { useRouter } from 'next/router';



const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const router = useRouter();

    const isActive = (r:String) => {
        if(r===router.pathname){
            return true;
        }
        return false;
    }

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                {/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton> */}
                <Link href="/" passHref>
                    <MUILink color="inherit" underline="none">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            JB E-Commerce1
                        </Typography>
                    </MUILink>
                </Link>


                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                       <Link href="/cart" passHref>
                            <MUILink color="inherit" underline="none">
                                <MenuItem justify-self="flex-end" onClick={handleCloseNavMenu}>
                                    <ShoppingCartIcon/>
                                    <Typography textAlign="center">Cart</Typography>
                                </MenuItem>
                            </MUILink>
                        </Link>
                        <Link href="/signin" passHref>
                            <MUILink color="inherit" underline="none">
                                <MenuItem selected={true} justify-self="flex-end" onClick={handleCloseNavMenu}>
                                    <PersonIcon/>
                                    <Typography textAlign="center">Sign in</Typography>
                                </MenuItem>
                            </MUILink>
                        </Link>
                    </Menu>
                </Box>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                    JB E-Commerce
                </Typography>
                <Box sx={{ flexGrow: 1,justifyContent:"flex-end", display: { xs: 'none', md: 'flex' } }}>
                    <Link href="/cart" passHref>
                        <MUILink color="inherit" underline="none">
                            <MenuItem sx={{ "&&.Mui-selected": {
                                    backgroundColor: "#001F5E"
                                }}} selected={isActive("/cart")} justify-self="flex-end" onClick={handleCloseNavMenu}>
                                <ShoppingCartIcon/>
                                <Typography textAlign="center">Car11t</Typography>
                            </MenuItem>
                        </MUILink>
                    </Link>
                    <Link href="/signin" passHref>
                        <MUILink color="inherit" underline="none">
                            <MenuItem sx={{ "&&.Mui-selected": {
                                    backgroundColor: "#001F5E"
                                }}} selected={isActive("/signin")} justify-self="flex-end" onClick={handleCloseNavMenu}>
                                <PersonIcon/>
                                <Typography textAlign="center">Sign in</Typography>
                            </MenuItem>
                        </MUILink>
                    </Link>
                </Box>
                {/* <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp"  />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem  onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem  onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box> */}
                {/* <Link href="/">
                    <MUILink color="inherit">JB E-Commerce</MUILink>
                </Link>

                <Link href="/cart">
                    <MUILink color="inherit">Cart</MUILink>
                </Link> */}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
