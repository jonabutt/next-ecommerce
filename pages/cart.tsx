import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { DataContext } from '../store/GlobalState';
import Image from 'next/image';
import { Box, Button, Grid, Typography } from '@mui/material';
import CartItem from '../components/CartItem';
import { getData, postData } from '../utils/fetchAPI';
import { CartItemType } from '../interfaces';
import { ActionKind } from '../store/Actions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Cart: NextPage = () => {
  const { state, dispatch } = useContext(DataContext);
  const [total, setTotal] = useState<Number>(0);
  const { cart, auth, orders } = state;
  const router = useRouter();

  useEffect(() => {

    // update total on change of cart object
    const getTotal = () => {
      const totalPrice = cart.reduce((prev, currItem) => {
        return prev + (currItem.price.toNumber() * currItem.quantity)
      }, 0);
      setTotal(totalPrice);
    }
    getTotal();
  }, [cart]);
  // this is used on load to update the prices in the cart
  useEffect(() => {
    // get current cart from local storage
    const lcsCart = localStorage.getItem('__jbecommerce__cart');
    if (lcsCart === null) {
      return;
    }
    var cart = JSON.parse(lcsCart) as CartItemType[];
    if (cart.length > 0) {
      const updateCart = async () => {
        // loop all items in cart
        for (const item of cart) {
          // fetch product details from api
          const res = await getData(`product/${item.productId}`);
          // if found change the price of the cart item
          if (res.success === true) {
            item.price = res.product.price;
          }
        }
        dispatch({ type: ActionKind.ADD_CART, payload: cart });
      }
      updateCart();
    }
  }, [dispatch]);
  const handlePayment = async () => {

    // if the user is not logged in redirect
    if (auth === null) {
      return router.push('/signin')
    }

    dispatch({ type: ActionKind.SET_LOADING, payload: true });
    postData('order', { cart, total }, auth.token)
      .then(res => {
        // remove loading backdrop
        dispatch({ type: ActionKind.SET_LOADING, payload: false });
        if (res.success === false) {
          toast.error(res.msg);
        }
        else {
          // reset cart
          dispatch({ type: ActionKind.ADD_CART, payload: [] });
          // add order to order list in the memory
          dispatch({ type: ActionKind.ADD_ORDERS, payload: [...orders, res.orderAdded] });
          toast.success(res.msg);
          // redirect to the order details page
          return router.push(`/order/${res.orderAdded.id}`);
        }


      });
  }
  if (cart.length === 0) {
    return <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Head>
        <title>
          Cart
        </title>
      </Head>
      <h2>No Items in Cart</h2>
      <Image src={"/empty-cart.png"}
        alt="empty cart"
        layout="intrinsic"
        width={500}
        height={394} />
    </Box>
  }
  return (
    <>
      <Head>
        Cart
      </Head>
      <h2>Shopping Cart</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          {
            cart.map(c => <CartItem
              key={c.productId}
              cartItem={c}
            />
            )
          }
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography sx={{ flex: 1 }} variant="h4">Total:</Typography>
            <Typography sx={{ flex: 1 }} variant="h4" color="primary">&euro;{total.toFixed(2)}</Typography>
          </Box>
          <Button onClick={handlePayment} sx={{ justifySelf: 'center' }} variant="contained" size="medium">
            Proceed with payment
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Cart
