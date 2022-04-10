import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

const Categories: NextPage = () => {
    const { state, dispatch } = useContext(DataContext);
    const { auth,categories } = state;
    if (auth === null) return null;
    return <>
        <Head>
            <title>Categories</title>
        </Head>
        <h2>Categories</h2>
        <Box mt={0.8}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="categories table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Id
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>

                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                categories.map(c => (
                                    <TableRow key={c.id}>
                                        <TableCell>
                                            {c.id}
                                        </TableCell>
                                        <TableCell>
                                            {c.name}
                                        </TableCell>
                                        <TableCell>
                                           
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>

                    </Table>
                </TableContainer>

            </Box>
    </>
}

export default Categories;