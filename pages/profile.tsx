import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid, FormControl, InputLabel, OutlinedInput, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { DataContext } from '../store/GlobalState';
import { ActionKind } from '../store/Actions';
import { validateUpdatePassword } from '../utils/validateForms';
import toast from 'react-hot-toast';

interface ProfileData {
    name: string;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
}

const Profile: NextPage = () => {
    const initialSate: ProfileData = {
        name: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false
    }
    const [profileData, setProfileData] = useState<ProfileData>(initialSate)
    const { name, password, confirmPassword, showPassword, showConfirmPassword }: ProfileData = profileData;
    const { state, dispatch } = useContext(DataContext);

    const handleSubmit = async (event: (FormEvent<HTMLFormElement>)) => {
        event.preventDefault();
        // show loading backdrop
        dispatch({ type: ActionKind.SET_LOADING, payload: true });
        // check if password is filled
        if (password !== '') {
            // show loading backdrop
            dispatch({ type: ActionKind.SET_LOADING, payload: true });
            // validate the passwords
            const errMsg = validateUpdatePassword(password, confirmPassword);
            // if error show modal and remove loading backdrop
            if (errMsg) {
                dispatch({ type: ActionKind.SET_LOADING, payload: false })
                return toast.error(errMsg);
            }
            // update the password using an api call
            updatePassword(password, confirmPassword);
        }

        if (name !== '') {
            // update the name using an api call
            updateProfile(name);
        }
    }

    const updateProfile = (name: string) => {
        // show loading backdrop
        dispatch({ type: ActionKind.SET_LOADING, payload: true });
        // call api to update name
        // remove loading backdrop
        dispatch({ type: ActionKind.SET_LOADING, payload: true });
    }

    const updatePassword = (password: string, confirmPassword: string) => {
        // show loading backdrop
        dispatch({ type: ActionKind.SET_LOADING, payload: true });
        // call api to update password
        // remove loading backdrop
        dispatch({ type: ActionKind.SET_LOADING, payload: true });
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData({ ...profileData, [e.currentTarget.name]: e.currentTarget.value })
    }

    const handleClickShowPassword = () => {
        setProfileData({
            ...profileData,
            showPassword: !profileData.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setProfileData({
            ...profileData,
            showConfirmPassword: !profileData.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (state.auth !== null) {
            setProfileData({ ...profileData, name: state.auth.user.name })
        }

    }, [state.auth?.user])
    if (state.auth == null) return null;
    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <h3>Profile</h3>
                    <form onSubmit={handleSubmit}>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined" required>
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
                        <FormControl disabled sx={{ m: 1 }} fullWidth variant="outlined" required>
                            <InputLabel htmlFor="userdata-email">Email</InputLabel>
                            <OutlinedInput
                                id="userdata-email"
                                onChange={handleChangeInput}
                                value={state.auth.user.email}
                                name="email"
                                type="email"
                                label="Email"
                                placeholder='Enter Email'
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined" required>
                            <InputLabel htmlFor="userdata-password">Password</InputLabel>

                            <OutlinedInput
                                id="userdata-password"
                                onChange={handleChangeInput}
                                value={password}
                                name="password"
                                type={showPassword ? "text" : "password"}
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

                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined" required>
                            <InputLabel htmlFor="userdata-confirmpassword">Confirm Password</InputLabel>

                            <OutlinedInput
                                id="userdata-confirmpassword"
                                onChange={handleChangeInput}
                                value={confirmPassword}
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
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
                        <Button type="submit" color="primary" fullWidth>Update</Button>
                    </form>
                </Grid>
                <Grid item xs={8}>
                    <h3>Orders</h3>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile
