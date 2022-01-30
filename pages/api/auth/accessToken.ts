import type { NextApiRequest, NextApiResponse } from 'next';
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JwtPayload, User } from '../../../interfaces';
import { createAccessToken } from '../../../utils/generateToken';

const prisma = new PrismaClient();

type ResponseData = {
    success: boolean,
    msg?: string,
    accessToken?: string,
    user?: User
}

export default async function handler ( 
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
    ){

    switch(req.method){
        case "GET":
            await refreshAccessToken(req,res)
            break;
    }
}

const refreshAccessToken = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>) => {
    try{

        const refreshToken = req.cookies.refreshToken;
        // check if there is refresh token in the cookies
        if(refreshToken===null) {
            return res.status(400).json({success:false,msg: 'Please login now!'});
        }
        
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
        // check if the refresh token sent is valid
        const result = jwt.verify(refreshToken, refreshTokenSecret) as JwtPayload;
        if(result===null){
            return res.status(400).json({success:false,msg: 'Your token is incorrect or has expired!'})
        }

        // check if the user exists by using the id in the jwt
        const user = await prisma.user.findUnique({
            where: {
              id: result.id
            },
        });
        if(user===null){
            return res.status(400).json({success:false,msg: 'User doesn\'t exists!'})
        }
        // creating a new access token
        const accessToken = createAccessToken({id: user.id}as JwtPayload)
        res.json({
            success:true,
            accessToken:accessToken,
            user: {
                name: user.name,
                email: user.email,
                roleId: user.roleId,
                isRoot: user.isRoot
            }
        })
          
    }catch(err: unknown){
        if (typeof err === "string") {
            return res.status(500).json({success:false,msg: err});
        } else if (err instanceof Error) {
            return res.status(500).json({success:false,msg: (err as Error).message});
        }
    }
}