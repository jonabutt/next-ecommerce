import { useState, useContext } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { getData } from '../../utils/fetchAPI';
import { Product } from '@prisma/client';
import { Box } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import ImageItem from '../../components/ImageItem';
import { DataContext } from '../../store/GlobalState';
import { addToCart } from '../../store/Actions';

type PageProps = {
    product: Product
}

const ProductDetails: NextPage<PageProps> = ({ product }) => {
    const [mainImage, setMainImage] = useState(product.images[0]);
    const stockText = product.stockAmount === 0 ? "Out of Stock!" : `In Stock: ${product.stockAmount}`;
    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;
    return <>
        <Head>
            <title>
                Product Details
            </title>
        </Head>
        <Grid container spacing={1.5}>
            <Grid item xs={6}>
                <ImageItem
                    src={mainImage}
                    alt=""
                    width={"100%"}
                    height={"350px"}
                    objectFit="contain"
                    currentImgSelected=""
                />
                <Box sx={{ display: 'flex', overflowX: 'auto', flexDirection: 'row', flexWrap: 'nowrap', gap: '5px' }}>
                    {
                        product.images.map((imgLink, i) => (
                            <ImageItem
                                key={i}
                                src={imgLink}
                                alt=""
                                onClick={(imgUrl) => setMainImage(imgUrl)}
                                width={100}
                                height={100}
                                objectFit="cover"
                                currentImgSelected={mainImage}
                            />
                        ))
                    }
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3" component="h3">
                    {product.name}
                </Typography>
                <Typography color="primary" variant="h5" component="div">
                    &euro;{Number(product.price).toFixed(2)}
                </Typography>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography color="primary">
                            {stockText}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="flex-end">
                        <Typography component="span" color="primary">
                            Sold: {product.soldCount}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography paragraph={true} variant="body2">
                    {product.description}
                </Typography>
                <Typography paragraph={true} variant="body2">
                    {product.content}
                </Typography>
                <Button variant="contained" size="medium" onClick={() => dispatch(addToCart(product, cart))} >
                    <Typography style={{ fontSize: '12px' }}>
                        Buy
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    </>
}

type Props = {
    id: string
}

type Params = {
    params: Props
}

export const getServerSideProps = async ({ params: { id } }: Params) => {
    const res = await getData(`product/${id}`, '');
    return {
        props: {
            product: res.product as Product
        }, // will be passed to the page component as props
    }
}

export default ProductDetails;