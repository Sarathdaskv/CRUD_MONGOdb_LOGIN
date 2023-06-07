
const dataBase = require('../model/mongodb');
const collection = dataBase.collection;
const userData = dataBase.userData;


exports.userSignup = async (req, res) => {
    if (!req.body.email || !req.body.password) {

        return res.redirect('/signup');
    }

    const data = new collection({

        email: req.body.email,
        password: req.body.password

    })

    const checking = await collection.findOne({ email: req.body.email })

    try {
        if (checking) {
            console.log("user details already exists");
            res.redirect('/signup');
        }
        else {
            await collection.insertMany([data]);
            console.log("user created successfully");
            res.redirect('/login');
        }
    }
    catch {
        res.redirect('/signup')
    }



}


exports.loginUser = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        const messages = {
            error: "input field can't be empty"
        }
      return  res.render('login', { messages })

        
    }
    try {

        const check = await collection.findOne({ email: req.body.email });



        if (!check) {
            const messages = {
                error: "Kindly signup before login"
            }
          return  res.render('login', { messages })

            

        }
        if (check.password == req.body.password) {
            req.session.email = req.body.email;
            req.session.password = req.body.password;
            req.session.userId = check._id;
            req.session.isAuth = true;
           
            res.redirect('/api/users')
        }

        else {

            const messages = {
                error: "invalid password"
            }
          return  res.render('login', { messages })
          
        }
    }
    catch (err) {
        const messages = {
            error: "Something went wrong"
        }
      return  res.render('login', { messages })
       
    }
}

exports.create = async (req, res) => {

    try {
        if (!req.body.name || !req.body.email || !req.body.position) {
           
            
            return res.redirect('/add-user');
        }

        const data = new userData({
            userId: req.session.userId,
            name: req.body.name,
            email: req.body.email,
            position: req.body.position

        })
        console.log(data);
        await userData.insertMany([data]);
        return res.redirect('/add-user')
    }
    catch (e) {
        console.log(e);
    }
}


exports.find = async (req, res) => {

    try {
        const data = await userData.find({ userId: req.session.userId });
        res.render("home.ejs", { users: data });

    }
    catch (e) {
        console.log(e);
    }
}

exports.updateById = async (req, res) => {
    try {
        let id = req.query.id;
        let UserDetails = await userData.findOne({ _id: id });
        if (UserDetails) {
            res.render('update_user.ejs', { users: UserDetails })
        }
        else {
            res.send("No data found");
        }

    }
    catch (e) {
        console.log(e);
    }
}

exports.updateUserData = async (req, res) => {
    let id = req.params.id;

    try {
        let updatedData = await userData.updateOne({ _id: id }, { $set: { name: req.body.name, email: req.body.email, position: req.body.position } })
        if (updatedData) {
            res.send("success");
        }
        else {
            res.send("No data to update");
        }
    }
    catch (e) {
        console.log(e);
    }

}

exports.deleteUser = async (req, res) => {
    let id = req.params.id;
    let deleteRequest = await userData.findOne({ _id: id });
    try {
        if (deleteRequest) {
            let dataDeleted = await userData.deleteOne({ _id: id });
            console.log("data deleted");
            res.send("Data deleted successfully");
        }
        else {
            res.send("No data found to delete");
        }
    }
    catch (e) {
        console.log(e);
    }
}

exports.logout = (req, res) => {

    req.session.destroy(function (err) {
        if (err) console.log(err);
        res.status(200).redirect('/login');
    });

}



exports.sessionChecker = async (req, res, next) => {
    if (!req.session.isAuth) {
        res.redirect('/login')
    }
    else {
        next()
    }

}