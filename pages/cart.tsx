import { useContext } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { DataContext } from '../store/GlobalState'
import Image from 'next/image'
import { Box } from '@mui/material'
import CartItem from '../components/CartItem'

const Cart: NextPage = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  if(cart.length === 0){
    return  <Box sx={{display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Head>
          Cart
        </Head>
        <h2>No Items in Cart</h2>
        <Image src={"/empty-cart.png"} 
          alt="empty cart"
          layout="intrinsic"
          width={500}
          height={394}/>
      </Box>
  }
  return (
    <>
      <Head>
        Cart
      </Head>
      <h2>Shopping Cart</h2>
      {
        cart.map(c=><CartItem 
            key={c.productId}
            cartItem={c}
          />
        )
      }
    </>
  )
}

export default Cart
