var express = require('express');
var router = express.Router();
const AdminModel = require("../models/AdminModel");

router.post('/', async function(req,res,next) {
    const {username, password} = req.body;
    console.log("req body =>", req.body);
    try {
        const foundAdmin = await AdminModel.findOne({username: username});
        console.log("found admin =>", foundAdmin);

        if(foundAdmin && password === foundAdmin.password) {
            console.log("Admin är inloggad");
            res.status(200).json({isAdmin: true})
        } else {
            console.log("Användarnamn eller lösenord är fel");
            res.status(401).json({isAdmin: false, message: "Användarnamn eller lösenord är fel"})
        }

    } catch (error) {
        console.log("Något gick fel", error);
    }
})

module.exports = router;