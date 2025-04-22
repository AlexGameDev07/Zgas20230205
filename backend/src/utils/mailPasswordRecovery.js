import nodemailer from 'nodemailer';
import { config } from '../config.js';

/**
 * Configuración del transporter para envío de emails
 */
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.user.EMAIL,
        pass: config.user.PASSWORD
    }
});

/**
 * Envía un email usando nodemailer
 * @param {string} to - Dirección de email del destinatario
 * @param {string} subject - Asunto del email
 * @param {string} text - Contenido en texto plano
 * @param {string} html - Contenido en formato HTML
 * @returns {Promise} Información del email enviado
 * @throws {Error} Si hay un error en el envío
 */
const sendEmail = async (to, subject, text, html) => {
    // Validar parámetros
    if (!to || !subject || (!text && !html)) {
        throw new Error('Missing required email parameters');
    }

    try {
        const info = await transporter.sendMail({
            from: '"Soporte Zgas Alejandro Murcia" <alekeymurcia@gmail.com>',
            to,
            subject,
            text,
            html: html || text // Si no hay HTML, usar el texto plano
        });
        
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

const HTMLRecoveryEmail = (code) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña</title>
        <style>
            body {
                background-color: #0a0a0a;
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 30px;
                background-color: #141414;
                border-radius: 15px;
                box-shadow: 0 0 20px rgba(66, 220, 219, 0.2);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 32px;
                color: #fff;
                text-shadow: 0 0 10px #00f2ff, 0 0 20px #00f2ff;
                margin-bottom: 20px;
            }
            h1 {
                color: #fff;
                font-size: 24px;
                margin-bottom: 20px;
                text-shadow: 0 0 5px rgba(66, 220, 219, 0.5);
            }
            p {
                color: #e0e0e0;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .code-container {
                background-color: #1a1a1a;
                padding: 20px;
                border-radius: 10px;
                border: 1px solid #00f2ff;
                box-shadow: 0 0 15px rgba(0, 242, 255, 0.2);
                text-align: center;
                margin: 30px 0;
            }
            .code {
                font-size: 32px;
                letter-spacing: 5px;
                color: #00f2ff;
                font-weight: bold;
                text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
            }
            .footer {
                text-align: center;
                color: #666;
                font-size: 12px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #333;
            }
            .warning {
                color: #ff4b4b;
                font-size: 12px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">ZGAS</div>
                <h1>Recuperación de Contraseña</h1>
            </div>
            
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Utiliza el siguiente código para completar el proceso:</p>
            
            <div class="code-container">
                <div class="code">${code}</div>
            </div>
            
            <p>Este código expirará en 15 minutos por razones de seguridad. Si no solicitaste este cambio, por favor ignora este mensaje.</p>
            
            <div class="warning">
                * No compartas este código con nadie. Nuestro equipo nunca te pedirá este código.
            </div>
            
            <div class="footer">
                © ${new Date().getFullYear()} ZGAS. Todos los derechos reservados.<br>
                Este es un mensaje automático, por favor no responder.
            </div>
        </div>
    </body>
    </html>
    `;
}

// Verificar la conexión al iniciar
transporter.verify()
    .then(() => console.log('Ready to send emails'))
    .catch(error => console.error('Error with email configuration:', error));

export {sendEmail, HTMLRecoveryEmail};