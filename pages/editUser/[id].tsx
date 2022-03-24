import { Box, Button, Checkbox, FormControl, Grid, InputLabel, OutlinedInput } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { UserDTO } from "../../interfaces";
import { ActionKind } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";

const EditUser = () => {
    // get id passed in query string
    const router = useRouter();
    const { id } = router.query;

    const { state, dispatch } = useContext(DataContext);
    const { auth, users } = state;

    const [editUser, setEditUser] = useState<UserDTO | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    useEffect(() => {
        const user = users.find(u => u.id === id);
        if (user) {
            setEditUser(user);
        }
    }, [users])
    const handleSubmit = async (event: (FormEvent<HTMLFormElement>)) => {
        event.preventDefault();
        dispatch({ type: ActionKind.SET_LOADING, payload: true });

        dispatch({ type: ActionKind.SET_LOADING, payload: false });
    }
    if (editUser === null) {
        return "";
    }
    return (
        <>
            <Head>
                <title>Edit User</title>
            </Head>
            <Grid container justifyContent="center">
                <Grid item md={6}>
                    <Box>
                        <h2>Edit User</h2>
                        <form onSubmit={handleSubmit}>
                            <FormControl sx={{ m: 1 }} fullWidth variant="outlined" disabled>
                                <InputLabel htmlFor="userdata-name">Name</InputLabel>
                                <OutlinedInput
                                    id="userdata-name"
                                    defaultValue={editUser.name}
                                    name="email"
                                    type="text"
                                    label="Name"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} fullWidth variant="outlined" disabled>
                                <InputLabel htmlFor="userdata-email">Email</InputLabel>
                                <OutlinedInput
                                    id="userdata-email"
                                    defaultValue={editUser.email}
                                    name="email"
                                    type="email"
                                    label="Email"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                                <InputLabel htmlFor="userdata-isAdmin">Is Admin</InputLabel>
                                <Checkbox
                                    checked={isAdmin}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAdmin(e.target.checked)}
                                />
                            </FormControl>
                            <Button type="submit" color="primary" fullWidth>Update</Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default EditUser;