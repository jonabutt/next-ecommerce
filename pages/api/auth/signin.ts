import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

type ResponseData = {
    success: boolean,
    msg: string
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
        res.json({success:true,msg: "Login Success!"});
    }catch(err: unknown){
        if (typeof err === "string") {
            return res.status(500).json({success:false,msg: err});
        } else if (err instanceof Error) {
            return res.status(500).json({success:false,msg: (err as Error).message});
        }
    }
}