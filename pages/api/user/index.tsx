import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserDTO } from '../../../interfaces';
import auth, { MiddlewareErrorResponseData, MiddlewareSuccessResponseData } from '../../../middleware/auth';

const prisma = new PrismaClient();

type ResponseData = {
    success: boolean,
    msg: string
}

type GetUsersResponseData = {
    success: boolean,
    users: UserDTO[]
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | ResponseData | GetUsersResponseData>
) {
    switch (req.method) {
        case "GET":
            await getUsers(req, res)
            break;
        case "PATCH":
            await updateProfile(req, res)
            break;
    }
}

const getUsers = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | GetUsersResponseData>) => {
    try {
        // check if the user is authorized
        const result = await auth(req, res) as MiddlewareSuccessResponseData;
        // check if role is not admin
        if (result.roleId !== "ckzqt1gxo0081psu7ap73rabs") {
            return res.status(400).json({ success: false, msg: "Authentication is not valid" });
        }
        // get all users from db
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                dateCreated: true,
                isRoot: true,
                roleId: true,
                password: false
            }
        });
        res.json({ success: true, users: users });
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

const updateProfile = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | ResponseData>) => {
    try {
        // check if the user is authorized
        const result = await auth(req, res) as MiddlewareSuccessResponseData;
        const { name }: { name: string } = req.body;
        // udpate user in database
        const updateUser = await prisma.user.update({
            where: {
                id: result.id,
            },
            data: {
                name: name
            }
        });
        res.json({ success: true, msg: "Update Profile Success!" })
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