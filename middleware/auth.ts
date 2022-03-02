import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from '../interfaces';

const prisma = new PrismaClient();

export type MiddlewareErrorResponseData = {
    success: boolean,
    msg: string
}

export type MiddlewareSuccessResponseData = {
    id: string,
    roleId: string,
    isRoot: boolean
}

const auth = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData>
) => {
    const token = req.headers.authorization as string;

    if (token === null) {
        return res.status(400)
            .json({ success: false, msg: 'Invalid Authentication' });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;
    if (decodedToken === null) {
        return res.status(400)
            .json({ success: false, msg: 'Invalid Authentication' });
    }

    const user = await prisma.user.findFirst({
        where: {
            id: decodedToken.id
        }
    });

    if (user === null) {
        return res.status(400)
            .json({ success: false, msg: 'Invalid Authentication' });
    }
    const middlewareReturn: MiddlewareSuccessResponseData = {
        id: user.id,
        roleId: user.roleId,
        isRoot: user.isRoot
    }
    return middlewareReturn;
}

export default auth;