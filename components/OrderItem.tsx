import { useContext, useState } from 'react';
import { Box, Card, Link as MUILink } from "@mui/material";
import { Order } from '@prisma/client';

import Link from 'next/link';
import { CartItemType } from "../interfaces";
import { DataContext } from "../store/GlobalState";
import { displayDate, displayMoney } from '../utils/internationalizationUtils';

type Props = {
    orderItem: Order
};

const OrderItem = ({ orderItem }: Props) => {
    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return <Box pt={1} pb={1}>
        <Link href={`/order/${orderItem.id}`} passHref>
            <Box sx={{
                display: 'flex',
                p: 1,
                cursor: 'pointer',
                border: 1,
                borderColor: 'grey.400',
                borderRadius: 1,
                "&:hover": {
                    borderColor: 'grey.800'
                }
            }}>
                <Box sx={{ flex: 1 }}>
                    #{orderItem.id}
                </Box>
                <Box sx={{ flex: 1 }}>
                    {displayDate(new Date(orderItem.dateCreated))}
                </Box>
                <Box sx={{ flex: 1 }}>
                    {displayMoney(orderItem.total.toNumber())}
                </Box>
            </Box>
        </Link>
    </Box>
}

export default OrderItem;