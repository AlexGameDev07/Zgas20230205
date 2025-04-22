import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import customersMdl from '../models/customersmdl.js';
import employeesMdl from '../models/employeesmdl.js';

import { config } from '../config.js';
import { sendEmail, HTMLRecoveryEmail } from '../utils/mailPasswordRecovery.js';

const passwordRecoveryCtrl = {};

passwordRecoveryCtrl.requestCode = async (req, res) => {
    const { email } = req.body;
    try {
        let userFound;
        let userType;

        userFound = await customersMdl.findOne({ email });
        if (userFound) {
            userType = 'customer';
        }
        else {
            userFound = await employeesMdl.findOne({ email });
            if (userFound) {
                userType = 'employee';
            }
        }

        if (!userFound) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verificationCode = crypto.randomBytes(3).toString('hex');

        const token = jsonwebtoken.sign(
            { email, verificationCode, userType, verified: false }, 
            config.jwt.JWT_SECRET, 
            { expiresIn: '30s' }
        );
    } catch (error) {

    }
}