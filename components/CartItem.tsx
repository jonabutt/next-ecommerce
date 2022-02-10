import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { CartItemType } from "../interfaces";

type Props = {
    cart: CartItemType
};

const CartItem = ({cart}:Props) => {
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
                src={cart.images[0]}
                alt={cart.name}
                layout='fill'
                objectFit='contain'
            />
        </Box>
        <Box sx={{ 
            paddingLeft:'5px', 
            display: 'flex', 
            flexDirection: 'column', 
            flexGrow:'1', 
            alignItems: 'flex-start',
            justifyContent: 'center'}}>
            <Typography variant="body1">
                {cart.name}
            </Typography>
            <Typography  color="primary" variant="body1">
                &euro;{Number(cart.price).toFixed(2)}
            </Typography>
        </Box>
    </Box>
}

export default CartItem;