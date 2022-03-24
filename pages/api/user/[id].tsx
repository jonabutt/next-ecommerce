import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import auth, { MiddlewareErrorResponseData, MiddlewareSuccessResponseData } from '../../../middleware/auth';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData>
) {
    switch (req.method) {
        case "PATCH":
            await updateRole(req, res)
            break;
    }
}

const updateRole = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        // get id from query string
        const userId = req.query.id as string;
        // check if the user is authorized
        const result = await auth(req, res) as MiddlewareSuccessResponseData;
        if (!result.isRoot) {
            res.status(404).json({ success: false, msg: "Authentication is not valid" });
        }
        const { isAdmin }: { isAdmin: boolean } = req.body;
        const updatedRoleId = isAdmin ? "ckzqt1gxo0081psu7ap73rabs" : "ckyrpzgos0014fkvjls11sykk";
        // get all users from db
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                roleId: updatedRoleId
            }
        });
        res.json({ success: true, msg: "User Updated Successfully!" });
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