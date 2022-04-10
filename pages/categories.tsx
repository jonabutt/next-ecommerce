import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

const Categories: NextPage = () => {
    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;
    if (auth === null) return null;
    return <>
        <Head>
            <title>Categories</title>
        </Head>
        <h2>Categories</h2>

    </>
}

export default Categories;