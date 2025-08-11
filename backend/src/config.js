import dotenv from "dotenv";

dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI
    },
    server: {
        PORT: process.env.PORT
    },
    jwt: {
        JWT_SECRET: process.env.JWT_SECRET,
        EXPIRES_IN: process.env.JWT_EXPIRES
    },
    admin:{
        EMAIL: process.env.ADMIN_EMAIL,
        PASSWORD: process.env.ADMIN_PASSWORD
    },
    user:{
        EMAIL: process.env.EMAIL_USER,
        PASSWORD: process.env.EMAIL_USER_PASSWORD
    },
    cloudinary: {
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        CLOUDINARY_URL: process.env.CLOUDINARY_URL
    },
}