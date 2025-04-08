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
        subject: '¡Verifica tu correo electrónico!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                <header style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
                    <h1 style="color: #4CAF50; font-size: 24px;">¡Bienvenido, ${otherDetails.name || 'Usuario'}!</h1>
                    <p style="color: #555; font-size: 16px;">Estamos emocionados de que te unas a nuestra plataforma.</p>
                </header>
                <main style="padding: 20px; text-align: center;">
                    <p style="color: #333; font-size: 16px;">Para completar tu registro, por favor verifica tu correo electrónico utilizando el siguiente código:</p>
                    <div style="margin: 20px 0; padding: 10px; background-color: #e8f5e9; border: 1px solid #4CAF50; border-radius: 5px; display: inline-block; align-self: center; justify-self: center;">
                        <h2 style="color: #4CAF50; font-size: 28px; margin: 0;">${verificationCode}</h2>
                    </div>
                    <p style="color: #555; font-size: 14px;">Este código es válido por 2 horas. Si no solicitaste este correo, por favor ignóralo.</p>
                </main>
                <footer style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #777;">
                    <p>© 2025 Tu Empresa. Todos los derechos reservados.</p>
                    <p style="margin: 0;">¿Necesitas ayuda? <a href="mailto:soporte@tuempresa.com" style="color: #4CAF50; text-decoration: none;">Contáctanos</a></p>
                </footer>
            </div>
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