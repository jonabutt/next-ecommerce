import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryDTO } from "../../../interfaces";
import auth, { MiddlewareErrorResponseData, MiddlewareSuccessResponseData } from "../../../middleware/auth";

const prisma = new PrismaClient();

type SuccessGetCategoriesResponseData = {
    success: boolean,
    categories: CategoryDTO[]
}

type SuccessCreateCategoryResponseData = {
    success: boolean,
    msg: string,
    newCategory: CategoryDTO
}
type ErrorResponseData = {
    success: boolean,
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | SuccessCreateCategoryResponseData|SuccessGetCategoriesResponseData | ErrorResponseData>
) {
    switch (req.method) {
        case "POST":
            await createCategory(req, res)
            break;
        case "GET":
            await getCategories(req, res)
            break;
    }
}

const createCategory = async (
    req: NextApiRequest,
    res: NextApiResponse<MiddlewareErrorResponseData | MiddlewareSuccessResponseData | SuccessCreateCategoryResponseData | ErrorResponseData>
) => {
    try {
         // check if the user is authorized
         const result = await auth(req, res) as MiddlewareSuccessResponseData;
         // check if user role is admin
        if(result.roleId != "ckzqt1gxo0081psu7ap73rabs"){
            return res.status(404).json({ success: false, msg: "Authentication is not valid" });
        }
        
        const {name} = req.body;
        // check name if it filled
        if(!name){
            return res.status(404).json({ success: false, msg: "Name can't be left empty." });
        }
        // create a new category using prisma
        const newCategory = await prisma.category.create({
            data:{
                name:name
            }
        });

        // return new category
        return res.json({ 
            success: true, 
            msg: "New category was created successfully.",
            newCategory: {
                id: newCategory.id,
                name: newCategory.name
            }
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

const getCategories = async (
    req: NextApiRequest,
    res: NextApiResponse<SuccessGetCategoriesResponseData | ErrorResponseData>
) => {
    try {
        // get categories from database
        const categories = await prisma.category.findMany();
        // return categories in response
        return res.json({ success: true, categories });
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
