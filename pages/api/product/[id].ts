import type { NextApiRequest, NextApiResponse } from 'next';
import {PrismaClient, Product} from '@prisma/client';

const prisma = new PrismaClient();

type ResponseData = {
    success: boolean,
    msg?: string,
    product?: Product | null
}

export default async function handler ( 
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
    ){

    switch(req.method){
        case "GET":
            await getProduct(req,res)
            break;
    }
}

const getProduct = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>) => {
    try{
        const id = req.query.id as string;
        const product = await prisma.product.findUnique({
            where:{
                id:id
            }
        });
        if(product===null){
            return res.status(500).json({success:false,msg: "Product not found!"});
        }
        res.json({
            success:true,
            product: product
        });
    }catch(err: unknown){
        if (typeof err === "string") {
            return res.status(500).json({success:false,msg: err});
        } else if (err instanceof Error) {
            return res.status(500).json({success:false,msg: (err as Error).message});
        }
    }
}