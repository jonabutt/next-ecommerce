import { useContext, useState } from 'react';
import { Box, Button, Typography,Link as MUILink, IconButton, Modal} from "@mui/material";
import Image from "next/image";
import { CartItemType } from "../interfaces";
import { DataContext } from "../store/GlobalState";
import { increaseQuantityCartItem, decreaseQuantityCartItem, removeCartItem } from "../store/Actions";
import Link from 'next/link';
import { Close, Delete } from '@mui/icons-material';

const modalStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%,-50%)',
   width: '400px',
   background: '#ffffff',
   padding: '10px 15px'
};
type Props = {
    cartItem: CartItemType
};

const CartItem = ({cartItem}:Props) => {
    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;
    const [modalIsOpen,setModalIsOpen] = useState<boolean>(false);

    return <Box sx={{ 
        display: 'flex', 
        flexDirection: 'row', 
        padding: '5px 10px', 
        minHeight: '80px',
        '& + div': {
            borderTop: '1px solid #ccc'
        }}}>
        <Box sx={{ width: '60px', position: 'relative' }}>
            <Image 
                src={cartItem.images[0]}
                alt={cartItem.name}
                layout='fill'
                objectFit='contain'
            />
        </Box>
        <Box sx={{ 
            paddingLeft:'5px', 
            display: 'flex', 
            flexDirection: 'column', 
            flex: '2', 
            alignItems: 'flex-start',
            justifyContent: 'center'}}>
            <Link href={`/product/${cartItem.productId}`} passHref>
                <MUILink variant="body1">
                    {cartItem.name}
                </MUILink>
            </Link>
          
            <Typography  color="primary" variant="body1">
                &euro;{Number(cartItem.price).toFixed(2)}
            </Typography>
        </Box>
        <Box sx={{ 
            paddingLeft:'5px', 
            display: 'flex', 
            flexDirection: 'row', 
            flex: '3', 
            alignItems: 'center'}}>
            <Button variant="outlined" disabled={cartItem.quantity===1} onClick={()=>dispatch(decreaseQuantityCartItem(cart,cartItem.productId))}>-</Button>
            <Typography sx={{ padding:"0 10px", width:50, textAlign: "center"}}variant="body2" color="primary">
                {cartItem.quantity}
            </Typography>
            <Button variant="outlined" onClick={()=>dispatch(increaseQuantityCartItem(cart,cartItem.productId))}>+</Button>
        </Box>
      
        {/*  */}
      
        <Box sx={{ width: '20px', display: 'flex', margin: 0}}>
            <IconButton
                onClick={()=>setModalIsOpen(true)}
                size="small"
                sx={{ padding: 0, margin: 0}}
            >
                <Delete sx={{ width: 32 }}/>
            </IconButton>
        </Box>
        <Modal
    
            open={modalIsOpen}
            onClose={()=>setModalIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <IconButton
                    onClick={()=>setModalIsOpen(false)}
                    size="small"
                    sx={{ padding: 0, margin: 0,position:'absolute', top:5, right:5,"&:hover": { color: "#d32f2f" }}}
                >
                    <Close sx={{ width: 20 }}/>
                </IconButton>
                <Typography sx={{textAlign: 'center'}} id="modal-modal-title" variant="h5" component="h2">
                    Remove
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete {cartItem.name} from the cart?
                </Typography>
                <Box sx={{display: 'flex',justifyContent:'flex-end',}}>
                    <Button variant='contained' onClick={()=>setModalIsOpen(false)}>No</Button>
                    <Button sx={{marginLeft:'5px'}} onClick={()=>dispatch(removeCartItem(cart,cartItem.productId))}>Yes</Button>
                </Box>
            </Box>
      </Modal>
    </Box>
}

export default CartItem;