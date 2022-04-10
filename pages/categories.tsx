import { Box, Button, FormControl, InputLabel, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useState,FormEvent} from 'react';
import toast from 'react-hot-toast';
import { ActionKind } from '../store/Actions';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchAPI';


const Categories: NextPage = () => {
    const { state, dispatch } = useContext(DataContext);
    const { auth,categories } = state;
    const [ name, setName ] = useState("");

    const paperStyle = { padding:20, display: "flex", flexDirection:"column", alignItems: "center"};

    if (auth === null) return null;

    const handleSubmit = async (event: (FormEvent<HTMLFormElement>)) => {
        event.preventDefault();
        // show loading backdrop
        dispatch({ type: ActionKind.SET_LOADING, payload: true });
        // post new category to api
        const res = await postData(
            "categories",
            {name:name},
            auth.token
        );
        // check api result if success
        if(res.success === true){
            // add new category to store
            dispatch({type: ActionKind.ADD_CATEGORIES, payload: [...categories, res.newCategory]})
            toast.success(res.msg);
        }
        else{
            toast.error(res.msg);
        }
        // hide load screen backdrop
        dispatch({ type: ActionKind.SET_LOADING, payload: false });
    }
   
    return <>
        <Head>
            <title>Categories</title>
        </Head>
        <h2>Categories</h2>
        <Paper elevation={2} >
            <form onSubmit={handleSubmit} style={paperStyle}>
                <FormControl  sx={{ m: 1 }} fullWidth variant="outlined" required>
                    <InputLabel htmlFor="categorydata-name">Name</InputLabel>
                    <OutlinedInput 
                        id="categorydata-name"
                        onChange={ e => setName(e.currentTarget.value)} 
                        value={name} 
                        name="name"
                        label="Name"
                        placeholder='Enter Category Name'
                    />
                </FormControl>
                <Button type="submit" color="primary" fullWidth>Create Category</Button>

            </form>
        </Paper>
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