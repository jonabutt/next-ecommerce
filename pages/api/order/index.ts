import type { NextApiRequest, NextApiResponse } from 'next';
import auth, { ErrorResponseData, SuccessResponseData } from '../../../middleware/auth';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseData | SuccessResponseData>
) {

    switch (req.method) {
        case "POST":
            await createOrder(req, res)
            break;
    }
}

const createOrder = async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseData | SuccessResponseData>) => {
    try {
        const result = await auth(req, res)
        const { cart, total } = req.body
        console.log(req.body);
        console.log(cart);

        res.json({
            success: true,
            msg: 'Order success! We will contact you to confirm the order.'
        })

    } catch (err) {
        if (typeof err === "string") {
            return res.status(500).json({ success: false, msg: err });
        } else if (err instanceof Error) {
            return res.status(500).json({ success: false, msg: (err as Error).message });
        }
    }
}