const User = require('../model/user')

exports.home =  (req, res) => {
    User.find({username: req.username}, {name: 1, username: 1, email: 1, _id: 0})
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            result: data,
            message: "Success",
          });
        }
      });
      
  };