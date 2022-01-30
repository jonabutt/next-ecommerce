import jwt from 'jsonwebtoken'

export type Payload = {
    id:string
}

export const createAccessToken = (payload:Payload) => {
    const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET as string;
    return jwt.sign(payload,accessTokenSecret,{expiresIn: '15m'})
}

export const createRefreshToken = (payload:Payload) => {
    const accessRefreshToken: string = process.env.REFRESH_TOKEN_SECRET as string;
    return jwt.sign(payload,accessRefreshToken,{expiresIn: '7d'})
}