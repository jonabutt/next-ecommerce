import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import {createAccessToken,createRefreshToken,Payload} from '../../../utils/generateToken';
import {User} from '../../../interfaces';

const prisma = new PrismaClient();

type ResponseData = {
    success: boolean,
    msg: string,
    refreshToken?: string,
    accessToken?: string,
    user?: User
}

export default async function handler ( 
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
    ){

    switch(req.method){
        case "POST":
            await login(req,res)
            break;
    }
}

const login = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>) => {
    try{
        const {email,password} =req.body;
     
        // find user in database with same email and password
        const user = await prisma.user.findFirst({where: {
            email: email
          }});
        if(user===null) {
            return res.status(403).json({success:false,msg:"This user doesn't exist!"});
        }
        // check if password matches
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch===false) {
            return res.status(403).json({success:false,msg:"Email or password are incorrect!"});
        }

        const accessToken = createAccessToken({id:user.id});
        const refreshToken = createRefreshToken({id:user.id});

        const returnUser:User = {
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            isRoot: user.isRoot
        };

        res.json({
            success:true,
            msg: "Login Success!",
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: returnUser
        });
    }catch(err: unknown){
        if (typeof err === "string") {
            return res.status(500).json({success:false,msg: err});
        } else if (err instanceof Error) {
            return res.status(500).json({success:false,msg: (err as Error).message});
        }
    }
}