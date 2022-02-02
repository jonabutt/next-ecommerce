import { useState } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { getData } from '../../utils/fetchAPI';
import { Product } from '@prisma/client';

type PageProps = {
    product : Product
}

const ProductDetails: NextPage<PageProps> = ({product}) => {
    return <>
        <Head>
            Product Details
        </Head>
        <div>
            {product.name}
        </div>
        <div>
            {product.description}
        </div>
    </>
}

type Props = {
    id: string
}

type Params = {
    params: Props
}

export const getServerSideProps = async({params:{id}}:Params) => {
    console.log(id);
    const res = await getData(`product/${id}`,'');
    console.log(res);
    console.log("res");
    return {
        props: {
            product: res.product as Product
        }, // will be passed to the page component as props
    }
  }
  
export default ProductDetails;