import { LockOutlined } from '@mui/icons-material';
import { Avatar, Button, Grid, Link as MUILink, Paper, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';

const Signin: NextPage = () => {

  const paperStyle = { padding:20, display: "flex", flexDirection:"column", alignItems: "center"};
  const avatarStyle = { backgroundColor : "#1bbd7e"};
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
           
            <TextField label="Username" placeholder="Enter Username" fullWidth required/>
            <TextField label="Password" placeholder="Enter Password" type="password" fullWidth required/>
            <Button type="submit" color="primary" fullWidth>Sign IN</Button>
         
             
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
