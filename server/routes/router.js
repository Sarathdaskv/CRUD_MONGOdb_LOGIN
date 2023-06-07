const express = require('express');
const controller = require('../controller/controller')
const route = express.Router();

route.get('/', (req, res) => {
    let messages={}
    res.render("login",{messages});
});

route.get('/login', (req, res) => {
    //    req.session.isAuth=true;  
    let messages={}   
        res.render('login',{messages});
    

});


route.get('/signup', (req, res) => {
    res.render("signup");
});

route.get('/add-user',controller.sessionChecker, (req, res) => {
    res.render("add_user.ejs");
});


route.get('/logout',controller.sessionChecker,controller.logout)
route.get('/update-user',controller.sessionChecker, controller.updateById);
route.get('/api/users',controller.sessionChecker, controller.find);
route.post('/signup', controller.userSignup);
route.post('/login', controller.loginUser);
//route.post('/home', controller.home);
route.post('/api/users', controller.create)
route.put('/api/users/:id',controller.updateUserData);
route.delete('/api/users/:id',controller.deleteUser)

module.exports = route;