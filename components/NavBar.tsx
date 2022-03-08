import React, { useContext } from 'react'
import { AppBar, Avatar, Badge, Box, Divider, IconButton, Link as MUILink, ListItemIcon, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState';
import { Logout, ShoppingCart, Person } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { ActionKind } from '../store/Actions';
import Cookie from 'js-cookie';

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(null);

    const [anchorElProfile, setAnchorElProfile] = React.useState<HTMLElement | null>(null);
    const profileIsOpen = Boolean(anchorElProfile);

    const router = useRouter();
    const { state, dispatch } = useContext(DataContext);
    const { auth, cart } = state;

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
    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElProfile(event.currentTarget);
    };
    const handleProfileClose = () => {
        setAnchorElProfile(null);
    };

    const handleLogout = () => {
        // remove cookie and local storage
        Cookie.remove('refreshToken', { path: 'api/auth/accessToken' })
        localStorage.removeItem('firstLogin');
        // reset the userdetails in the Global store
        dispatch({ type: ActionKind.AUTH, payload: null });
        // show toast
        toast.success("Logged out!");
        // redirect to home page
        return router.push('/');
    };

    const isActive = (r: String) => {
        if (r === router.pathname) {
            return true;
        }
        return false;
    }
    const loggedRouter = () => {
        return (
            <>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleProfileClick}
                        size="small"
                        sx={{ ml: 2, padding: 0 }}
                        aria-controls={profileIsOpen ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={profileIsOpen ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>{auth?.user.name[0].toUpperCase()}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorElProfile}
                    id="account-menu"
                    open={profileIsOpen}
                    onClose={handleProfileClose}
                    onClick={handleProfileClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Link href="/profile" passHref>
                        <MUILink color="inherit" underline="none">
                            <MenuItem>
                                <Avatar /> Profile
                            </MenuItem>
                        </MUILink>
                    </Link>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </>



        )
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
                                    <Badge badgeContent={cart.length} color="error">
                                        <ShoppingCart />
                                    </Badge>
                                    <Typography textAlign="center">Cart</Typography>
                                </MenuItem>
                            </MUILink>
                        </Link>
                        <Link href="/signin" passHref>
                            <MUILink color="inherit" underline="none">
                                <MenuItem selected={true} justify-self="flex-end" onClick={handleCloseNavMenu}>
                                    <Person />
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
                <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: { xs: 'none', md: 'flex' } }}>
                    <Link href="/cart" passHref>
                        <MUILink color="inherit" underline="none">
                            <MenuItem sx={{
                                "&&.Mui-selected": {
                                    backgroundColor: "#001F5E"
                                }
                            }} selected={isActive("/cart")} justify-self="flex-end" onClick={handleCloseNavMenu}>
                                <Badge badgeContent={cart.length} color="error">
                                    <ShoppingCart />
                                </Badge>
                                <Typography textAlign="center">Cart</Typography>
                            </MenuItem>
                        </MUILink>
                    </Link>

                    {
                        (auth === null) ?
                            <Link href="/signin" passHref>
                                <MUILink color="inherit" underline="none">
                                    <MenuItem sx={{
                                        "&&.Mui-selected": {
                                            backgroundColor: "#001F5E"
                                        }
                                    }} selected={isActive("/signin")} justify-self="flex-end" onClick={handleCloseNavMenu}>
                                        <Person />
                                        <Typography textAlign="center">Sign in</Typography>
                                    </MenuItem>
                                </MUILink>
                            </Link>
                            :
                            loggedRouter()
                    }

                </Box>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar
