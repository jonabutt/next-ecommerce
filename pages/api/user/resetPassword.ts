import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import auth, { MiddlewareErrorResponseData, MiddlewareSuccessResponseData } from '../../../middleware/auth';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type ResponseData = {
    success: boolean,
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | ResponseData>
) {

    switch (req.method) {
        case "PATCH":
            await resetPassword(req, res)
            break;
    }
}

const resetPassword = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | ResponseData>) => {
    try {
        // check if the user is authorized
        const result = await auth(req, res) as MiddlewareSuccessResponseData;
        const { password }: { password: string } = req.body;
        // hash password using bcrypt
        const passwordHash = await bcrypt.hash(password, 11)
        const updateUser = await prisma.user.update({
            where: {
                id: result.id,
            },
            data: {
                password: passwordHash
            },
        });
        res.json({ success: true, msg: "Update Password Success!" })
    }
    catch (err) {
        // show error message if there is an error
        if (typeof err === "string") {
            return res.status(500).json({ success: false, msg: err });
        } else if (err instanceof Error) {
            return res.status(500).json({ success: false, msg: (err as Error).message });
        }
    }
}