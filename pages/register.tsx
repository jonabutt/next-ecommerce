import { Avatar, Button, Link as MUILink, Grid, Paper, TextField, Typography, FormControl, InputLabel, Input, InputAdornment, IconButton, OutlinedInput } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface UserData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
}

const Register: NextPage = () => {
    const initialState : UserData = { name: '', email: '',showPassword:false, password: '', confirmPassword: '',showConfirmPassword:false};
    const [userData, setUserData] = useState<UserData>(initialState);
    var {name,email,password,confirmPassword,showPassword,showConfirmPassword} = userData;
    const paperStyle = { padding:20, display: "flex", flexDirection:"column", alignItems: "center"};
    const avatarStyle = { backgroundColor : "#1bbd7e"};

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData,[e.currentTarget.name]:e.currentTarget.value})
    }

    const handleClickShowPassword = () => {
        setUserData({
          ...userData,
          showPassword: !userData.showPassword,
        });
    };
    
    const handleClickShowConfirmPassword = () => {
        setUserData({
          ...userData,
          showConfirmPassword: !userData.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleSubmit = async (event: (FormEvent<HTMLFormElement>)) => {
        event.preventDefault();

        const res = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ''
            },
            body: JSON.stringify(userData)
        })
    
        const data = await res.json();
        console.log(data);
        console.log(data);
    }

    return (
        <>
        <Head>
            <title>Register Page</title>
        </Head>
        <Grid sx={{ maxWidth: 'md', margin: "10px auto" }}>
            <Paper elevation={5} style={paperStyle}>
                
                <Avatar style={avatarStyle}>
                    <AddIcon />
                </Avatar>
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex' }}}
                    >
                    Register
                </Typography>

                  
                <form onSubmit={handleSubmit}>
                    <FormControl  sx={{ m: 1 }} fullWidth variant="outlined" required>
                        <InputLabel htmlFor="userdata-name">Name</InputLabel>
                        <OutlinedInput 
                            id="userdata-name"
                            onChange={handleChangeInput} 
                            value={name} 
                            name="name"
                            label="Name"
                            placeholder='Enter Name'
                        />
                    </FormControl>

                    <FormControl  sx={{ m: 1 }} fullWidth variant="outlined" required>
                        <InputLabel htmlFor="userdata-email">Email</InputLabel>
                        <OutlinedInput 
                            id="userdata-email"
                            onChange={handleChangeInput} 
                            value={email} 
                            name="email"
                            type="email"
                            label="Email"
                            placeholder='Enter Email'
                        />
                    </FormControl>


                    <FormControl  sx={{ m: 1 }} fullWidth variant="outlined" required>
                        <InputLabel htmlFor="userdata-password">Password</InputLabel>

                        <OutlinedInput 
                            id="userdata-password"
                            onChange={handleChangeInput} 
                            value={password} 
                            name="password"
                            type={showPassword? "text":"password"}
                            label="Password"
                            placeholder='Enter Password'
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    
                    <FormControl  sx={{ m: 1 }} fullWidth variant="outlined" required>
                        <InputLabel htmlFor="userdata-confirmpassword">Confirm Password</InputLabel>

                        <OutlinedInput 
                            id="userdata-confirmpassword"
                            onChange={handleChangeInput} 
                            value={confirmPassword} 
                            name="confirmPassword"
                            type={showConfirmPassword? "text":"password"}
                            label="Confirm Passowrd"
                            placeholder='Enter Password'
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>


                    <Button type="submit" color="primary" fullWidth>Register</Button>
                </form>
                <Typography>
                    Already have an account? 
                    <Link href="/signin" passHref>
                        <MUILink>
                            Login Now
                        </MUILink>
                    </Link>
                </Typography>
            </Paper>
        </Grid>
        </>
    )
}

export default Register
