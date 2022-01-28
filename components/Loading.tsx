import {useContext} from 'react'
import {DataContext} from '../store/GlobalState'
import { Backdrop, CircularProgress } from "@mui/material"

const Loading = () => {
    const {state, dispatch} = useContext(DataContext);
    const { isLoading } = state;
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={()=>{}}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading