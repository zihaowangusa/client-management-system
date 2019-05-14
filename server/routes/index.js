const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const mongoose = require('mongoose');


module.exports = function() {

  /* Get employee listings */
  router.get('/employee', async (req, res) => {
    try {
      let employee_list = await Employee.find({}).populate('manager','name').exec();
      res.send(employee_list);
    } catch ( err ) {
      return res.status(500).send(err);
    }
  });

  /* Create an employee entry */
  router.post("/employee", async ( req, res ) => {
      let id=mongoose.Types.ObjectId();
      let employee = new Employee({
          _id:id,
         name: req.body.name,
         avatar:req.body.avatar,
         title: req.body.title,
         sex: req.body.sex,
         start_date: req.body.start_date,
         office_phone: req.body.office_phone,
         cell_phone: req.body.cell_phone,
         sms: req.body.sms,
         email: req.body.email,
         manager: mongoose.Types.ObjectId(req.body.manager)
      });
      try{
        let newEmployee = await employee.save();
        res.send({ response: 'success',
                   _id:id});
      } catch (err){
        res.send({ response: err });
      }
  });

  /* Get the listing by employee id */
  router.get('/employee/:id', async ( req, res ) => {
     try {
       let record = await Employee.findOne({ _id: req.query.id }).populate('manager','name').exec();
       res.send(record);
     } catch ( err ) {
       return res.status(500).send(err);
     }
  });

     
  /* Update an employee entry */
  router.put('/employee/:id', async ( req, res ) => {
      try {
        let employee = await Employee.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true });
        res.send({ response: 'success' });
      } catch (err) {
        res.send({ response: err });
      }
  });

  /* Delete an employee entry */
  router.delete('/employee/:id', async (req, res) => {
      try {
        let employee = await Employee.findOneAndRemove({ _id: req.query.id });
        return res.send({ response: 'success' });
      } catch (err) {
        return res.send({ response: err });
      }
  });

  return router;

};