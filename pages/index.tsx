import { Grid } from '@mui/material';
import { Product } from '@prisma/client';
import type { NextPage } from 'next'
import Head from 'next/head'
import ProductItem from '../components/ProductItem';
import { getData } from '../utils/fetchAPI';

type Props = {
  products: Product[]
}

const Home: NextPage<Props> = ({ products }) => {
  return (
    <>
      <Head>
        <title>
          Home Page
        </title>
      </Head>
      <Grid container spacing={2}>
        {
          products.length === 0
            ? <h2>No Products</h2> :
            products.map(p =>
              <ProductItem
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                description={p.description}
                content={p.content}
                checked={p.checked}
                stockAmount={p.stockAmount}
                soldCount={p.soldCount}
                images={p.images}
                dateCreated={p.dateCreated}
                categoryId={p.categoryId}
              />
            )
        }
      </Grid>

    </>
  )
}

export async function getServerSideProps() {
  const res = await getData(
    `product`,
    ''
  );
  return {
    props: {
      products: res.products as Product[]
    }, // will be passed to the page component as props
  }

}

export default Home;
