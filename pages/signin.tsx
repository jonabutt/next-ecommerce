import { ChangeEvent, FormEvent, useState , useContext, useEffect} from 'react'
import { LockOutlined, Router, Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link as MUILink, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {DataContext} from '../store/GlobalState'
import toast from 'react-hot-toast'
import {postData} from '../utils/fetchAPI'
import ActionKind from '../store/Actions'
import Cookie from 'js-cookie'
import { PayloadAuth } from '../interfaces'
import { useRouter } from 'next/router'

interface LoginData {
  username: string;
  password: string;
}


const Signin: NextPage = () => {
  const initialState : LoginData = { username: '', password: ''};
  const [loginData, setLoginData] = useState<LoginData>(initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { state , dispatch } = useContext(DataContext);
  const {auth}= state;
  const {username,password} = loginData;


  const paperStyle = { padding:20, display: "flex", flexDirection:"column", alignItems: "center"};
  const avatarStyle = { backgroundColor : "#1bbd7e"};

  const router = useRouter();

  useEffect(()=>{
    if(auth!==null){
      router.push('/');
    }
  },[auth]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({...loginData,[e.currentTarget.name]:e.currentTarget.value})
  }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: (FormEvent<HTMLFormElement>)) => {
    event.preventDefault();
    dispatch({ type: ActionKind.SET_LOADING, payload: true })
    const res = await postData(
      "auth/signin",
      loginData,
      ''
    )
    // if the api return success true show success message
    if(res.success === true){
      Cookie.set('refreshToken',res.refreshToken,{
        path: 'api/auth/accessToken',
        expires: 7
      });
      localStorage.setItem('firstLogin', 'true');
      // show toast success
      toast.success(res.msg);
      // save the jwt token in global state
      const authPayload: PayloadAuth = {
          token: res.accessToken,
          user: res.user
      };
      dispatch({ type: ActionKind.AUTH, 
          payload: authPayload
      });
    }
    else {
      toast.error(res.msg);
    }

    dispatch({ type: ActionKind.SET_LOADING, payload: false })

  }
  return (
    <>
      <Head>
        <title>Sign in Page</title>
      </Head>
      <Grid sx={{ maxWidth: 'md', margin: "10px auto" }}>
        <Paper elevation={5} style={paperStyle}>
          
            <Avatar style={avatarStyle}>
              <LockOutlined />
            </Avatar>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex' }}}
            >
                Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl  sx={{ m: 1 }} fullWidth variant="outlined" required>
                <InputLabel htmlFor="logindata-username">Username</InputLabel>
                <OutlinedInput 
                    id="logindata-username"
                    onChange={handleChangeInput} 
                    value={username} 
                    name="username"
                    label="Username"
                    placeholder='Enter Username'
                />
              </FormControl>

              <FormControl  sx={{ m: 1 }} fullWidth variant="outlined" required>
                <InputLabel htmlFor="logindata-password">Password</InputLabel>

                <OutlinedInput 
                    id="logindata-password"
                    onChange={handleChangeInput} 
                    value={password} 
                    name="password"
                    type={showPassword? "text":"password"}
                    label="Enter Password"
                    placeholder='Enter Password'
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={()=>setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                  />
              </FormControl>

              <Button type="submit" color="primary" fullWidth>Sign IN</Button>
            </form>        
            <Typography>
              <Link href="/forgotpass" passHref>
                <MUILink>
                  Forgot Password?
                </MUILink>
                
              </Link>
            </Typography>
            <Typography>
              Do you have an account? 
              <Link href="/register" passHref>
                <MUILink>
                  Register
                </MUILink>
              </Link>
            </Typography>
        </Paper>
      </Grid>
    </>
  )
}

export default Signin
