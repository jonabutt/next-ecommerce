import { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DataContext } from '../store/GlobalState';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const Users: NextPage = () => {
    const { state, dispatch } = useContext(DataContext);
    const { auth, users } = state;
    if (auth === null) return null;
    return (
        <>
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
                                                <IconButton>
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon color="error" />
                                                </IconButton>
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