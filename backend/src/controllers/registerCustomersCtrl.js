import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

import customersmdl from '../models/customersmdl.js';
import { config } from '../config.js';

const registerCustomersCtrl = [];

const generateToken = (email, verificationCode) => {
    return jsonwebtoken.sign(
        { email, verificationCode },
        config.jwt.JWT_SECRET,
        { expiresIn: "2h" }
    );
};

const sendVerificationEmail = async (email, verificationCode, otherDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.user.EMAIL,
            pass: config.user.PASSWORD
        }
    });

    const mailOptions = {
        from: config.user.EMAIL,
        to: email,
        subject: '¡Verifica tu correo electrónico en Cinemark!',
        html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificación de Correo</title>
                <style>
                    @keyframes glow {
                        0% {
                            box-shadow: 0 0 5px #00f2ff, 0 0 10px #00f2ff, 0 0 20px #00f2ff, 0 0 30px #00f2ff;
                        }
                        50% {
                            box-shadow: 0 0 10px #00f2ff, 0 0 20px #00f2ff, 0 0 40px #00f2ff, 0 0 60px #00f2ff;
                        }
                        100% {
                            box-shadow: 0 0 5px #00f2ff, 0 0 10px #00f2ff, 0 0 20px #00f2ff, 0 0 30px #00f2ff;
                        }
                    }

                    body {
                        background-color: #0a0a0a;
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        color: #e0e0e0;
                    }

                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 30px;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 15px;
                        box-shadow: 0 0 20px rgba(66, 220, 219, 0.2);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    }

                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                    }

                    .logo {
                        font-size: 36px;
                        color: #fff;
                        text-shadow: 0 0 10px #00f2ff, 0 0 20px #00f2ff;
                        margin-bottom: 20px;
                        font-weight: bold;
                    }

                    h1 {
                        color: #fff;
                        font-size: 28px;
                        margin-bottom: 20px;
                        text-shadow: 0 0 5px rgba(66, 220, 219, 0.5);
                    }

                    p {
                        color: #e0e0e0;
                        line-height: 1.6;
                        margin-bottom: 20px;
                    }

                    .code-container {
                        background-color: rgba(0, 0, 0, 0.5);
                        padding: 20px;
                        border-radius: 10px;
                        border: 1px solid #00f2ff;
                        box-shadow: 0 0 15px rgba(0, 242, 255, 0.2);
                        text-align: center;
                        margin: 30px 0;
                    }

                    .code {
                        font-size: 36px;
                        letter-spacing: 5px;
                        color: #00f2ff;
                        font-weight: bold;
                        animation: glow 1.5s infinite;
                    }

                    .button {
                        display: inline-block;
                        padding: 15px 30px;
                        margin-top: 20px;
                        background-color: #00f2ff;
                        color: #0a0a0a;
                        font-size: 16px;
                        font-weight: bold;
                        text-decoration: none;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
                        transition: background-color 0.3s ease, transform 0.3s ease;
                    }

                    .button:hover {
                        background-color: #00c2cc;
                        transform: scale(1.05);
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
                        <div class="logo">Cinemark</div>
                        <h1>¡Verifica tu correo electrónico!</h1>
                    </div>
                    
                    <p>Hola, ${otherDetails.name || 'Usuario'},</p>
                    <p>Gracias por registrarte en Cinemark. Para completar tu registro, utiliza el siguiente código de verificación:</p>
                    
                    <div class="code-container">
                        <div class="code">${verificationCode}</div>
                    </div>
                    
                    <p>Este código es válido por 2 horas. Si no solicitaste este correo, por favor ignóralo.</p>
                    
                    <a href="#" class="button">Verificar mi cuenta</a>
                    
                    <div class="warning">
                        * No compartas este código con nadie. Nuestro equipo nunca te pedirá este código.
                    </div>
                    
                    <div class="footer">
                        © ${new Date().getFullYear()} Cinemark. Todos los derechos reservados.<br>
                        Este es un mensaje automático, por favor no responder.
                    </div>
                </div>
            </body>
            </html>
        `
    };

    return transporter.sendMail(mailOptions);
};

registerCustomersCtrl.register = async (req, res) => {
    try {
        const { email, password, ...otherDetails } = req.body;

        // Check if the customer already exists
        const existingCustomer = await customersmdl.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Customer already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new customer using the spread operator
        const newCustomer = new customersmdl({
            ...otherDetails,
            email,
            password: hashedPassword,
            dui: otherDetails.dui || null,
            isVerified: otherDetails.isVerified || false
        });

        await newCustomer.save();

        // Generate a verification code
        const verificationCode = crypto.randomBytes(3).toString('hex');

        // Generate a JWT token with the verification code
        let token;
        try {
            token = generateToken(email, verificationCode);
            res.cookie('verificationToken', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
        } catch (err) {
            console.error('Error generating token:', err);
            return res.status(500).json({ message: 'Error generating token' });
        }

        // Send verification email
        try {
            await sendVerificationEmail(email, verificationCode, otherDetails);
            return res.status(200).json({ message: 'Verification email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending verification email', error: error.message });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

registerCustomersCtrl.verifyCodeEmail = async (req, res) => {
    const { verificationCode } = req.body;

    try {
        // Verify the JWT token
        const token = req.cookies.verificationToken;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jsonwebtoken.verify(token, config.jwt.JWT_SECRET);
        const { email, verificationCode: storedCode } = decoded;
        
        if (verificationCode !== storedCode) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        const customer = await customersmdl.findOne({ email });
        customer.isVerified = true;
        await customer.save();
        // Clear the cookie after successful verification
        res.clearCookie('verificationToken');

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export default registerCustomersCtrl;