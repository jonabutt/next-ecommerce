import React, { useContext } from 'react';
import Link from 'next/link';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Product } from '@prisma/client';
import { DataContext } from '../store/GlobalState';
import { addToCart } from '../store/Actions';

const ProductItem = (product: Product) => {
    const stockText = product.stockAmount === 0 ? "Out of Stock!" : `In Stock: ${product.stockAmount}`;
    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;

    return (
        <Grid item md={2.6}>
            <Card sx={{ minWidth: '210px' }} >
                <CardMedia
                    component="img"
                    height="120"
                    image={product.images[0]}
                    alt="burger"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography component="div" color="primary" variant="body2" >
                            &euro;{Number(product.price).toFixed(2)}
                        </Typography>
                        <Typography component="div" color="primary" variant="body2" >
                            {stockText}
                        </Typography>
                    </Box>

                    <Typography noWrap variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', gap: '4px' }}>
                    <Button disabled={product.stockAmount === 0} variant="contained" size="small" onClick={() => dispatch(addToCart(product, cart))}>
                        <Typography style={{ fontSize: '11px' }}>
                            Add to cart
                        </Typography>
                    </Button>
                    <Link href={`product/${product.id}`} passHref>
                        <Button variant="outlined" size="small" component="a">
                            <Typography style={{ fontSize: '11px', textAlign: 'center' }}>
                                Learn More
                            </Typography>
                        </Button>
                    </Link>

                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductItem;
