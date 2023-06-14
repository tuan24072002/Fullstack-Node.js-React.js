import db from '../models/index';
import CRUDService from '../services/CRUDService';
const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}
const getAboutMe = (req, res) => {
    return res.render('./test/about.ejs');
}
const getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
//Create user
const postCRUD = async (req, res) => {
    const message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('Post CRUD from server');
}
//Show all users
const displayGetCRUD = async (req, res) => {
    const data = await CRUDService.getAllUser();
    return res.render('./display-crud.ejs', {
        dataTable: data
    });
}
//Show user by ID
const getEditERUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserByID(userId);
        return res.render('./edit-crud.ejs', {
            userbyid: userData
        });
    }
    else {
        return res.send("User is not found");
    }

}
//Edit user
const putCRUD = async (req, res) => {
    const data = req.body;
    const allUsers = await CRUDService.updateUserData(data);
    return res.render('./display-crud.ejs', {
        dataTable: allUsers
    });
}
//Delete user
const deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let message = await CRUDService.deleteUserByID(id);
        return res.send(message);
    } else {
        return res.send("User is not found");
    }
}
module.exports = {
    getHomePage,
    getAboutMe,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditERUD,
    putCRUD,
    deleteCRUD
}