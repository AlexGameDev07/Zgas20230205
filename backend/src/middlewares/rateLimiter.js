import rateLimit from "express-rate-limit";

//1- Configurar la librería
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 500, // Limite de 500 peticiones
    message: {
        status: 429,
        message: "Demasiadas peticiones desde esta IP, por favor intente de nuevo más tarde."
    },
    standardHeaders: true, // Devuelve información de limitación en las cabeceras `RateLimit-*`
    legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
})

export default limiter;
