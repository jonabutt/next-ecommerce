import { useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { getData } from '../../utils/fetchAPI';
import { Product } from '@prisma/client';
import { Box } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import ImageItem from '../../components/ImageItem';

type PageProps = {
    product : Product
}

const ProductDetails: NextPage<PageProps> = ({product}) => {
    const [mainImage,setMainImage] = useState(product.images[0]);
    return <>
        <Head>
            Product Details
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
                <Box sx={{ display: 'flex',overflowX: 'auto',flexDirection:'row',flexWrap: 'nowrap',gap:'5px'}}>
                    {
                        product.images.map((imgLink,i)=>(
                            <ImageItem 
                                key={i}
                                src={imgLink} 
                                alt="" 
                                onClick={(imgUrl)=>setMainImage(imgUrl)}
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
                <Typography paragraph={true} variant="body1">
                    {product.description}
                </Typography>
                <Typography paragraph={true} variant="body2">
                    {product.content}
                </Typography>
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

export const getServerSideProps = async({params:{id}}:Params) => {
    const res = await getData(`product/${id}`,'');
    return {
        props: {
            product: res.product as Product
        }, // will be passed to the page component as props
    }
  }
  
export default ProductDetails;