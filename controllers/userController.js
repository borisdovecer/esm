const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcryptjs');
const passport = require('passport');
const userModel = require('../models/userModel')

exports.get_user_list = async (req, res) => {
    let find = {}
    try {
        let users = await userModel.find(find, data => data)
        res.render('backend/user_list', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'users',
            user: req.user,
            data: users
        })
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_user_update = async (req, res) => {
    const id = new ObjectId(req.params.id)
    let find = { _id: id }
    try {
        let user = await userModel.find(find, data => data)
        res.render('backend/user_update', {
            title: 'Company news :: European Strut & Support Manufacturer',
            description: 'user',
            user: req.user,
            data: user
        })
    } catch (err){
        res.status(500).send(err)
    }
}
exports.post_update_user = async (req, res) => {
    const id = new ObjectId(req.params.id)
    const { role } = req.body
    let find = { _id: id }
    const set = {
        role
    }

    const opet = await userModel.updateOne(find,  set, { upsert: true }  , data =>data)

    try {
        res.status(201).redirect('/admin/users');
    } catch (err){
        res.status(500).send(err)
    }
}

exports.post_delete_user = (req, res) => {
    const id = new ObjectId(req.params.id)
    const find = { _id: id }
    const user = userModel.deleteOne(find,data => data)
    try {
        res.status(201).redirect('/admin/users');
    } catch (err){
        res.status(500).send(err)
    }
}

exports.get_login = (req, res, next) => {
    res.render('login', {title:"", description:""})
}
// Get Create User
exports.get_register = (req, res) => {
    res.render('register',{title:"", description:""})
}
exports.post_login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
    })(req, res, next);
}
exports.post_logout = (req, res) => {
    req.logout();
    res.redirect('/login');

}
exports.post_register = async (req, res) => {
    const { name, email, password, password2 } = req.body;

    userModel.findOne({ email: email }).then(user => {
        if (user) {
            res.redirect('register')
        } else {
            const newUser = new userModel({
                name,
                email,
                password,
                role: "user"
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.redirect('/login');
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
}

