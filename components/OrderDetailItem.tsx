import { Box, Typography } from "@mui/material";
import { OrderDetailDTO } from "../interfaces";
import Image from "next/image";
import { displayMoney } from "../utils/internationalizationUtils";

type Props = {
    orderDetailItem: OrderDetailDTO
};


const OrderDetailItem = ({ orderDetailItem }: Props) => {
    return <Box sx={{
        display: 'flex', flexDirection: 'row', padding: '5px 10px', minHeight: '70px', '& + div': {
            borderTop: '1px solid #ccc'
        }
    }}>
        <Box sx={{ width: '60px', position: 'relative' }}>
            <Image
                src={orderDetailItem.Product.images[0]}
                alt={orderDetailItem.Product.name}
                layout='fill'
                objectFit='contain'
            />
        </Box>
        <Box pl={2.5} sx={{

            display: 'flex',
            flexDirection: 'column',
            flex: '2',
            alignItems: 'flex-start',
            justifyContent: 'center'
        }}>
            {orderDetailItem.Product.name}
        </Box>
        <Box pl={2.5} sx={{

            display: 'flex',
            flexDirection: 'column',
            flex: '3',
            alignItems: 'flex-start',
            justifyContent: 'center'
        }}>
            <Typography>
                {orderDetailItem.quantity} x<> </>
                {displayMoney(orderDetailItem.unitPrice)}<> </>
                = {displayMoney(orderDetailItem.unitPrice * orderDetailItem.quantity)}
            </Typography>

        </Box>

    </Box>
};

export default OrderDetailItem;