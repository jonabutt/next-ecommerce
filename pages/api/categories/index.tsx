import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { CategoryDTO } from "../../../interfaces";
import { MiddlewareErrorResponseData, MiddlewareSuccessResponseData } from "../../../middleware/auth";

const prisma = new PrismaClient();

type SuccessResponseData = {
    success: boolean,
    categories: CategoryDTO[]
}
type ErrorResponseData = {
    success: boolean,
    msg: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponseData | ErrorResponseData>
) {
    switch (req.method) {
        case "GET":
            await getCategories(req, res)
            break;
    }
}

const getCategories = async (
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponseData | ErrorResponseData>
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
