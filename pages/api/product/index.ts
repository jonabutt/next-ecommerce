import type { NextApiRequest, NextApiResponse } from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

type ResponseData = {
    success: boolean,
    msg?: string,
    productCount?: number,
    products?: any
}

export default async function handler ( 
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
    ){

    switch(req.method){
        case "GET":
            await getProducts(req,res)
            break;
    }
}

const getProducts = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>) => {
    try{
        const products = await prisma.product.findMany();
        return res.json({
            success:true,
            productCount: products.length,
            products: products
        });
    }catch(err: unknown){
        if (typeof err === "string") {
            return res.status(500).json({success:false,msg: err});
        } else if (err instanceof Error) {
            return res.status(500).json({success:false,msg: (err as Error).message});
        }
    }
}