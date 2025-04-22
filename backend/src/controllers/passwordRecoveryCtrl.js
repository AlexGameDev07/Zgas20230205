import jsonwebtoken from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import customersMdl from '../models/customersmdl.js';
import employeesMdl from '../models/employeesmdl.js';

import{config} from '../config.js';
import { sendEmail, HTMLRecoveryEmail } from '../utils/mailPasswordRecovery.js';

const passwordRecoveryCtrl = {};

passwordRecoveryCtrl.requestCode = async(req,res) => {
    
}