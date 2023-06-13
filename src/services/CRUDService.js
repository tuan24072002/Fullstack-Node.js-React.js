import bcrypt from 'bcryptjs';
import db from '../models/index';


const salt = bcrypt.genSaltSync(10);
const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phoneNumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                image: data.image,
                roleId: data.roleid,
                positionId: data.positionid
            })

            resolve('Create user successfully !!!');
        } catch (e) {
            reject(e);
        }
    })
}
const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser
}