import bcrypt from 'bcryptjs';
import db from '../models/index';
import { where } from 'sequelize';


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
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findAll({
                raw: true
            });
            resolve(user);//like return :))
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
const getUserByID = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                limit: 1,
                where: {
                    id: userId,
                },
                raw: true,
                order: [['createdAt', 'DESC']],
            });
            if (user) {
                resolve(user);//like return :))
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })
}
const updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPasswordFromBcrypt = await hashUserPassword(data.password);

            const updateUser = await db.User.update(
                {
                    firstName: data.firstname,
                    lastName: data.lastname,
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    gender: data.gender,
                    image: data.image,
                    roleId: data.roleid,
                    positionId: data.positionid
                },
                {
                    where: { id: data.id }
                }
            );

            if (updateUser > 0) {
                const allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve("Failed !!!");
            }
        } catch (e) {
            reject(e);
        }
    });
}
const deleteUserByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteUser = await db.User.destroy({
                where: {
                    id: id
                }
            })
            if (deleteUser > 0) {
                resolve("Delete user successfully !!!");
            } else {
                resolve("Failed !!!");
            }
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewUser,
    getAllUser,
    getUserByID,
    updateUserData,
    deleteUserByID
}