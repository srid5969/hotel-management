import { jwtSecretKey } from '@/config/app'
import jwt from 'jsonwebtoken'


export async function isAuthenticated(token:string){
    try {
        const verify=await jwt.verify(token,jwtSecretKey)
        return verify;
    } catch (error) {
        return false;
    }
}