const User = require ('../models/user');

//save new user to database
module.exports.create = async (req, res) => {
  console.log (req.body);
  if (!req.body) {
    res.status(400).send({message: "The body cannot be empty"})
    return;
  }
  
  const user = new User ({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  })
  
  await User.create(user)
  .then(data => {
    //res.send(data)
    res.redirect ('/');
  }).catch(err => {
    res.status(500).send({message: err.message || "An error occured while trying to create a user"})
  }) 
}


//Find users

module.exports.find = async (req, res) => {
   if(req.query.id){
        const id = req.query.id;

        User.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data);
                    console.log(data);
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        User.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}



//Edit and save existing user
module.exports.edit = async (req, res) => {
/*
  try { 
    const id = req.params.id;
    
    await User.findOneAndReplace(id, {
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      status: req.body.status
    }, {useFindAndModify: false});
    
    //res.redirect (`/edit/${req.params.id}`);
    }
  catch(err) {
    console.log (err);
    res.status(500).send({ message: err.message || "An error occured while updating the user" });
  }
  */
  if(!req.body){
    return res
        .status(400)
        .send({ message : "Data to update can not be empty"})
  }

  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
          }else{
              res.send(data)
          }
      })
      .catch(err =>{
          res.status(500).send({ message : "Error Update user information"})
      })
}

//Delete existing user
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  
  await User.findByIdAndDelete(id)
  .then(data => {
    if (!data) {
      res.status(404).send({ message: "Cannot delete the user with this id." });
    } else {
      res.send({ message: "User deleted successfully" });
      //res.redirect("/")
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "An error occured while deleting the user" });
  })
}

/*
exports.edit = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
*/