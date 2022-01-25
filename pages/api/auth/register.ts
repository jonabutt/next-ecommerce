import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
import { validateRegister } from '../../../utils/validateForms';

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
            await register(req,res)
    }
}

const register = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>) => {
    try{
        const {name,email,password,confirmPassword} =req.body;
        // validate register data
        const errMsg = validateRegister(name,email,password,confirmPassword);
        if(errMsg) return res.status(400).json({success:false,msg: errMsg});
        
        // hash the password using bcrypt
        const passwordHash = await bcrypt.hash(password,11);
        // creating a new user in the database
        const newUser = await prisma.user.create({
            data:{
                roleId:"ckyrpzgos0014fkvjls11sykk",
                name: name, 
                email: email,
                password: passwordHash
            }
        });
        console.log(newUser);
        res.json({success:true,msg:"Register Success!"});
    }catch(err){
        return res.status(500).json({success:false,msg: err.message});
    }
}