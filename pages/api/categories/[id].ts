import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryDTO } from "../../../interfaces";
import auth, { MiddlewareErrorResponseData, MiddlewareSuccessResponseData } from "../../../middleware/auth";

const prisma = new PrismaClient();

// type SuccessResponseData = {
//     success: boolean,
//     newCategory: CategoryDTO
// }
type ResponseData = {
    success: boolean,
    msg: string
}

type SuccessUpdateResponseData = {
    success: boolean,
    updatedCategory: CategoryDTO,
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | ResponseData>
) {
    switch (req.method) {
        case "PUT":
            await updateCategory(req, res)
            break;
        case "DELETE":
            await deleteCategory(req, res)
            break;
    }
}

const updateCategory = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | SuccessUpdateResponseData| ResponseData>
) => {
    try {
         // check if the user is authorized
         const result = await auth(req, res) as MiddlewareSuccessResponseData;

         // check if user role is admin
        if(result.roleId != "ckzqt1gxo0081psu7ap73rabs"){
            return res.status(404).json({ success: false, msg: "Authentication is not valid" });
        }
        
        const id = req.query.id as string;
        const {name} = req.body;
        // check name if it filled
        if(!name){
            return res.status(404).json({ success: false, msg: "Name can't be left empty." });
        }
        // delete category using id
        await prisma.category.update({
            where:{
                id:id
            },
            data:{
                name:name
            }
        });

        // return success message
        return res.json({ 
            success: true,
            updatedCategory:{
                id,
                name
            },
            msg: "Category was updated successfully!"
        });
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

const deleteCategory = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | ResponseData>
) => {
    try {
         // check if the user is authorized
         const result = await auth(req, res) as MiddlewareSuccessResponseData;

         // check if user role is admin
        if(result.roleId != "ckzqt1gxo0081psu7ap73rabs"){
            return res.status(404).json({ success: false, msg: "Authentication is not valid" });
        }
        
        const id = req.query.id as string;

        // delete category using id
        await prisma.category.delete({
            where:{
                id:id
            }
        });

        // return success message
        return res.json({ 
            success: true,
            msg: "Category was deleted successfully!"
        });
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
