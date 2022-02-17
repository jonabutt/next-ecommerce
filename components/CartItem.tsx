import { useContext } from 'react';
import { Box, Button, Typography,Link as MUILink, IconButton} from "@mui/material";
import Image from "next/image";
import { CartItemType } from "../interfaces";
import { DataContext } from "../store/GlobalState";
import { increaseQuantityCartItem, decreaseQuantityCartItem, removeCartItem } from "../store/Actions";
import Link from 'next/link';
import { Delete } from '@mui/icons-material';


type Props = {
    cartItem: CartItemType
};

const CartItem = ({cartItem}:Props) => {
    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;

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
        <Box sx={{ width: '20px', display: 'flex', margin: 0}}>
            <IconButton
                onClick={()=>dispatch(removeCartItem(cart,cartItem.productId))}
                size="small"
                sx={{ padding: 0, margin: 0}}
            >
                <Delete sx={{ width: 32 }}/>
            </IconButton>
        </Box>
    </Box>
}

export default CartItem;