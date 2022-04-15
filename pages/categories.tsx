import { Box, Button, Dialog, DialogActions, DialogTitle, FormControl, IconButton, InputLabel, OutlinedInput, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { NextPage } from 'next'
import Head from 'next/head'
import React,{ useContext, useState,FormEvent} from 'react';
import toast from 'react-hot-toast';
import { ActionKind, removeCategory } from '../store/Actions';
import { DataContext } from '../store/GlobalState';
import { deleteData, postData } from '../utils/fetchAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryDTO } from '../interfaces';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const Categories: NextPage = () => {
    const { state, dispatch } = useContext(DataContext);
    const { auth,categories } = state;
    const [ name, setName ] = useState("");
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ categoryToDelete, setCategoryToDelete ] = useState<CategoryDTO|null>(null);

    const paperStyle = { padding:20, display: "flex", flexDirection:"column" as "column", alignItems: "center"};

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
    const onDeleteCategory = (categoryToDelete: CategoryDTO) =>{
        // show confirm delete modal
        setModalIsOpen(true);
        // save category to delete in memory
        setCategoryToDelete(categoryToDelete);
    }
    const onConfirmDeleteCategory = async () => {
        if(categoryToDelete!==null){
            // show loading backdrop
            dispatch({ type: ActionKind.SET_LOADING, payload: true });
            // post new category to api
            const res = await deleteData(
            `/categories/${categoryToDelete.id}`,
                auth.token
            );
            // check api result if success
            if(res.success === true){
                // remove category from categories in store
                dispatch(removeCategory(categories,categoryToDelete.id));
                // hide delete modal
                setModalIsOpen(false);
                toast.success(res.msg);
            }
            else{
                toast.error(res.msg);
            }
            // hide loading backdrop
            dispatch({ type: ActionKind.SET_LOADING, payload: false });
        }
         
    }
    return <>
        <Head>
            <title>Categories</title>
        </Head>
        {categoryToDelete && 
            <Dialog open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                aria-labelledby="modal-modal-remove-category"
                aria-describedby="modal-modal-confirm-delete-category" >
                <DialogTitle>
                    Do you want to delete the category with name &quot;{categoryToDelete.name}&quot;?
                </DialogTitle>
                <DialogActions>
                    <Button variant='contained' onClick={() => setModalIsOpen(false)} color="primary">No</Button>
                    <Button variant='contained' onClick={onConfirmDeleteCategory} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        }
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
                                        <IconButton onClick={() => onDeleteCategory(c)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>                                                
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