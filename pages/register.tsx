import { Avatar, Button, Link as MUILink, Grid, Paper, Typography, FormControl, InputLabel, Input, InputAdornment, IconButton, OutlinedInput } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState, useContext , useEffect} from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validateRegister } from '../utils/validateForms';
import {DataContext} from '../store/GlobalState';
import toast from 'react-hot-toast';
import {postData} from '../utils/fetchAPI';
import ActionKind from '../store/Actions';
import { useRouter } from 'next/router';

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
    const {name,email,password,confirmPassword,showPassword,showConfirmPassword} = userData;
    const paperStyle = { padding:20, display: "flex", flexDirection:"column", alignItems: "center"};
    const avatarStyle = { backgroundColor : "#1bbd7e"};
    const { state , dispatch } = useContext(DataContext);
    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData,[e.currentTarget.name]:e.currentTarget.value})
    }
    
    const { auth } = state;

    const router = useRouter();

    useEffect(()=>{
        if(auth!==null){
          router.push('/');
        }
      },[auth]);
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
        dispatch({ type: ActionKind.SET_LOADING, payload: true })
    
        const errMsg = validateRegister(name,email,password,confirmPassword);
        
        if(errMsg){
            dispatch({ type: ActionKind.SET_LOADING, payload: false })
            return toast.error(errMsg);
        }
        // call the api to register the user
        const res = await postData(
            "auth/register",
            userData,
            ''
        )
        // if the api return success true show success message
        if(res.success === true){
            toast.success(res.msg);
        }
        else {
            toast.error(res.msg);
        }
        dispatch({ type: ActionKind.SET_LOADING, payload: false })

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
