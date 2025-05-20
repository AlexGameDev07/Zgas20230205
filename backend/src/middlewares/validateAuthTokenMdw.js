import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config.js';

export const validateAuthToken = (allowedUserTypes = []) => {
    return (req,res, next)=>{
        try {
            //1- extraer el token de las cookies
            const {authToken} = req.cookies;
            //2- verificar si el token existe
            if(!authToken){
                return res.status(401).json({
                    message: 'No token provided, you must log in'
                });
            }
            //3- Extraer la información del token
            const decoded = jsonwebtoken.verify(authToken, config.jwt.JWT_SECRET);

            //4- Verificar el tipo de usuario si puede ingresar o no
            if(!allowedUserTypes.includes(decoded.userType)){
                return res.status(403).json({
                    message: 'You do not have permission to access this resource'
                });
            }

            next();
        } catch (error) {
            console.log(error);
        }
    }
}