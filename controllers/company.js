const CompanyModel = require('../models/company');
const bcrypt = require('bcrypt'); 
const path = require('path');
module.exports = {
    create: function(req, res, cb) {
        CompanyModel.findOne({email:req.body.email}, function(err, result) {
            if(err){
                cb(err);
            }
            else{
                if(!result){
                    CompanyModel.create({ email: req.body.email, password: req.body.password }, function (err, result) {
                        if (err) 
                            cb(err);
                        else{
                            CompanyModel.findOne({email:req.body.email}, function(err, CompanyInfo) {
                                if (err)
                                    cb(err);
                                else{
                                    res.json({status: "success", message: "Admin added successfully!!!", data:{id:CompanyInfo._id}});
                                }
                            });  
                        }
                    });
                }
                else{
                    res.json({status: "error", message: "Admin already exists ", data:null});
                }
            }
            
        });
    },
    authenticate: function(req, res, cb) {
        CompanyModel.findOne({email:req.body.email}, function(err, CompanyInfo){
            if (err) 
                cb(err);
            else {
                console.log("the Admin info is",CompanyInfo)
                console.log("the body info is",req.body)
                if(!CompanyInfo){
                    res.json({status: "error", message: "Admin not found", data:null});
                }
                if(CompanyInfo && bcrypt.compareSync(req.body.password, CompanyInfo.password) && CompanyInfo.email == req.body.email) {
                    
                    res.json({status:"success", message: "Admin found!!!", data:{id: CompanyInfo._id, email: CompanyInfo.email}});
                }
                else {
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
            }
        });
    }
}