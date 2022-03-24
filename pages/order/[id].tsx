import { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import { DataContext } from '../../store/GlobalState';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Button } from '@mui/material';
import { OrderDTO } from '../../interfaces';
import OrderDetailItem from '../../components/OrderDetailItem';
import { Box } from '@mui/system';
import { displayDate, displayMoney } from '../../utils/internationalizationUtils';

const OrderDetails = () => {
    const { state, dispatch } = useContext(DataContext);
    const { orders, auth } = state;
    const router = useRouter();
    const [order, setOrder] = useState<OrderDTO | undefined>(undefined);
    useEffect(() => {
        const order: OrderDTO | undefined = orders.find(o => o.id === router.query.id);
        if (order) {
            console.log(order);
            console.log("order");
            setOrder(order);
        }
    });
    if (auth === null) return null;
    if (!order) return null;
    return (
        <>
            <Head>
                <title>Detail Orders</title>
            </Head>
            <Box m={1.2}>
                <Button variant="outlined" onClick={router.back}>
                    <ArrowBackIcon /> Back
                </Button>
                <h2>Order Details</h2>
                <Box p={1.2}>Order id: {order.id}</Box>
                <Box p={1.2}>Order at: {displayDate(new Date(order.dateCreated))}</Box>
                <Box>
                    <h4>Ordered by</h4>
                    <Box p={1.2}>Name: {order.User.name}</Box>
                    <Box p={1.2}>Email: {order.User.email}</Box>
                </Box>
                {
                    order
                    &&
                    <>
                        <h4>Order Items</h4>
                        {order.orderDetails.map(od =>
                            <OrderDetailItem key={od.id} orderDetailItem={od} />
                        )}
                    </>
                }
                <Box>
                    <h3>Order Total</h3>
                    <Box pl={1.2}>{displayMoney(order.total)}</Box>
                </Box>
            </Box>
        </>
    )
}

export default OrderDetails;