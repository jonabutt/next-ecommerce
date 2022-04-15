import React, { useContext, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DataContext } from '../store/GlobalState';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link as MUILink, Dialog, Slide, DialogContent, DialogContentText, DialogActions, Button, DialogTitle } from '@mui/material';
import { Box, display } from '@mui/system';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ActionKind, removeUser } from '../store/Actions';
import { deleteData } from '../utils/fetchAPI';
import toast from 'react-hot-toast';
import { UserDTO } from '../interfaces';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const Users: NextPage = () => {
    const { state, dispatch } = useContext(DataContext);
    const { auth, users } = state;
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
    const [userNameToDelete, setUserNameToDelete] = useState<string | null>(null);
    const onDeleteUser = (user: UserDTO) => {
        // show confirm delete modal
        setModalIsOpen(true);
        // save user id to delete in memory
        setUserIdToDelete(user.id);
        // save name to delete in memory
        setUserNameToDelete(user.name);
    }
    const onConfirmDeleteUser = () => {
        if (auth && userIdToDelete) {
            dispatch({ type: ActionKind.SET_LOADING, payload: true });
            // call api to delete user
            deleteData(`/user/${userIdToDelete}`, auth.token)
                .then(res => {
                    // on success of api
                    if (res.success) {
                        toast.success(res.msg);
                        // dispatch method to delete user from memory
                        dispatch(removeUser(users, userIdToDelete));
                    }
                    else {
                        toast.error(res.msg);
                    }
                    dispatch({ type: ActionKind.SET_LOADING, payload: false });
                    // hide modal
                    setModalIsOpen(false);
                });

        }
    }
    if (auth === null) return null;
    return (
        <>
            <Dialog open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                aria-labelledby="modal-modal-remove-user"
                aria-describedby="modal-modal-confirm-delete-user" >
                <DialogTitle>
                    Do you want to delete the user with name &quot;{userNameToDelete}&quot;?
                </DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={() => setModalIsOpen(false)} color="primary">No</Button>
                    <Button variant='contained' onClick={onConfirmDeleteUser} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
            <Head>
                <title>Users</title>
            </Head>
            <Box mt={0.8}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Id
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Email
                                </TableCell>
                                <TableCell>
                                    Admin
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map(u => (
                                    <TableRow key={u.id}>
                                        <TableCell>
                                            {u.id}
                                        </TableCell>
                                        <TableCell>
                                            {u.name}
                                        </TableCell>
                                        <TableCell>
                                            {u.email}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                u.roleId === 'ckzqt1gxo0081psu7ap73rabs' ?
                                                    <CheckIcon color="success" /> :
                                                    <CloseIcon color="error" />
                                            }
                                            {u.isRoot === true ? "Root" : ""}
                                        </TableCell>
                                        <TableCell>
                                            <>
                                                <Link href={`/editUser/${u.id}`} passHref>
                                                    <MUILink variant="body1">
                                                        <IconButton>
                                                            <EditIcon color="primary" />
                                                        </IconButton>
                                                    </MUILink>
                                                </Link>
                                                {
                                                    (auth.user.isRoot && auth.user.email !== u.email) &&
                                                    <IconButton onClick={() => onDeleteUser(u)}>
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                }

                                            </>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>

                    </Table>
                </TableContainer>

            </Box>
        </>
    )
}

export default Users;